import { useState } from 'react';
export const money = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n) || 0);
export const today = () => new Date().toLocaleDateString('en-CA');
export const uid = () => crypto.randomUUID();
const KEY = 'ammis-grocery-v1';
const empty = { products: [], orders: [], ledger: [], openingBalance: 0 };
export function useInventory() {
  const [data, setData] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY)) || empty; } catch { return empty; } });
  const [error, setError] = useState('');
  function commit(next) { try { localStorage.setItem(KEY, JSON.stringify(next)); setData(next); setError(''); return true; } catch { setError('Your browser could not save this change. Free up storage or enable local storage, then try again.'); return false; } }
  const saveProduct = product => commit({ ...data, products: data.products.some(p => p.id === product.id) ? data.products.map(p => p.id === product.id ? product : p) : [...data.products, product] });
  const deleteProduct = id => { if (data.orders.some(o => o.productId === id)) { setError('This product is used by an order. Keep it so your order history stays accurate.'); return; } commit({ ...data, products: data.products.filter(p => p.id !== id) }); };
  const addOrder = order => commit({ ...data, orders: [...data.orders, { ...order, status: 'Pending', id: uid() }] });
  function completeOrder(id) {
    const order = data.orders.find(o => o.id === id); if (!order || order.status !== 'Pending') return;
    const product = data.products.find(p => p.id === order.productId);
    if (!product) { setError('The product no longer exists.'); return; }
    if (order.type === 'Customer' && product.stock < order.quantity) { setError('Not enough stock to fulfill this order. Receive more stock first.'); return; }
    const total = Math.round(order.quantity * order.price * 100) / 100;
    commit({ ...data, products: data.products.map(p => p.id === product.id ? { ...p, stock: Math.round((p.stock + (order.type === 'Supplier' ? order.quantity : -order.quantity)) * 1000) / 1000 } : p), orders: data.orders.map(o => o.id === id ? { ...o, status: order.type === 'Supplier' ? 'Received' : 'Fulfilled', completedDate: today() } : o), ledger: [...data.ledger, { id: uid(), orderId: id, date: today(), category: order.type === 'Supplier' ? 'Stock purchase' : 'Sales', description: `${order.type} order · ${product.name}`, moneyIn: order.type === 'Customer' ? total : 0, moneyOut: order.type === 'Supplier' ? total : 0 }] });
  }
  const cancelOrder = id => commit({ ...data, orders: data.orders.map(o => o.id === id && o.status === 'Pending' ? { ...o, status: 'Cancelled' } : o) });
  const saveEntry = entry => commit({ ...data, ledger: [...data.ledger, { ...entry, id: uid() }] });
  const deleteEntry = id => commit({ ...data, ledger: data.ledger.filter(e => e.id !== id || e.orderId) });
  return { data, error, clearError: () => setError(''), saveProduct, deleteProduct, addOrder, completeOrder, cancelOrder, saveEntry, deleteEntry, openingBalance: n => commit({ ...data, openingBalance: n }) };
}
export function downloadText(name, text, type = 'text/plain') { const url = URL.createObjectURL(new Blob([text], { type })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
export function exportCSV(name, headers, rows) { const esc = v => `"${String(v ?? '').replace(/"/g, '""').replace(/^[=+@-]/, "'$&")}"`; downloadText(name, [headers, ...rows].map(row => row.map(esc).join(',')).join('\r\n'), 'text/csv'); }