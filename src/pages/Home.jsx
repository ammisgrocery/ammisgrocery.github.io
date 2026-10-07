import React, { useState } from 'react';
import { HardDrive, X } from 'lucide-react';
import Brand from '@/components/grocery/Brand';
import Overview from '@/components/grocery/Overview';
import Inventory from '@/components/grocery/Inventory';
import Orders from '@/components/grocery/Orders';
import FutureSummary from '@/components/grocery/FutureSummary';
import { useInventory } from '@/components/grocery/store';
import '@/components/grocery/grocery.css';
const tabs = [{ id: 'home', label: 'Home' }, { id: 'inventory', label: 'Inventory' }, { id: 'orders', label: 'Orders' }, { id: 'summary', label: 'Future summary' }];
export default function Home() {
  const [page, setPage] = useState('home');
  const store = useInventory();
  function navigate(id) { setPage(id); store.clearError(); window.scrollTo({ top: 0, behavior: 'instant' }); }
  return <div className="grocery-app"><header className="grocery-header"><button className="brand-button" onClick={() => navigate('home')} aria-label="Ammi’s Grocery home"><Brand /></button><nav className="main-nav" aria-label="Main navigation">{tabs.map(t => <button key={t.id} className={page === t.id ? 'active' : ''} aria-current={page === t.id ? 'page' : undefined} onClick={() => navigate(t.id)}>{t.label}</button>)}</nav><span className="local-badge"><HardDrive size={13} /> Local workspace</span></header><main className="grocery-main">{store.error && <div className="app-error" role="alert">{store.error}<button onClick={store.clearError} aria-label="Dismiss error"><X size={17} /></button></div>}{page === 'home' && <Overview data={store.data} navigate={navigate} />}{page === 'inventory' && <Inventory store={store} />}{page === 'orders' && <Orders store={store} navigate={navigate} />}{page === 'summary' && <FutureSummary store={store} />}</main><footer className="grocery-footer"><span>© {new Date().getFullYear()} Ammi’s Grocery & Halal Meat · Newark, Delaware</span><span>Saved on this browser. No login. No cloud sync.</span></footer></div>;
}