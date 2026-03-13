import React, { useState, useEffect } from "react";
import { LS_KEYS, lsGet, lsSet, genId, MGMT_CATS, CAT_ICONS, UNITS, autoCategory, Modal, exportCSV, parseCSV } from "../utils/dataStore.jsx";

export function ComponentsTab(){
  const[items,setItems]=useState(()=>lsGet(LS_KEYS.components));
  const[search,setSearch]=useState("");const[catFilter,setCatFilter]=useState("All");
  const[modal,setModal]=useState(false);const[editing,setEditing]=useState(null);
  const[form,setForm]=useState({name:"",category:"Posts",unit:"Each",description:"",active:true});
  const save=()=>{lsSet(LS_KEYS.components,items)};
  useEffect(()=>{save()},[items]);
  const filtered=items.filter(c=>(catFilter==="All"||c.category===catFilter)&&(!search||c.name.toLowerCase().includes(search.toLowerCase())));
  const openNew=()=>{setEditing(null);setForm({name:"",category:"Posts",unit:"Each",description:"",active:true});setModal(true)};
  const openEdit=c=>{setEditing(c);setForm({...c});setModal(true)};
  const submit=()=>{if(!form.name.trim())return;
    if(editing){setItems(prev=>prev.map(c=>c.id===editing.id?{...c,...form}:c))}
    else{setItems(prev=>[...prev,{...form,id:genId(),created:new Date().toISOString()}])}
    setModal(false)};
  const remove=id=>{if(confirm("Delete this component?"))setItems(prev=>prev.filter(c=>c.id!==id))};
  const handleImport=()=>{const inp=document.createElement("input");inp.type="file";inp.accept=".csv";
    inp.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{
      const parsed=parseCSV(ev.target.result);
      const mapped=parsed.map(p=>({...p,id:genId(),category:p.category||autoCategory(p.name),unit:p.unit||"Each",active:true}));
      setItems(prev=>[...prev,...mapped])};r.readAsText(f)};inp.click()};
  const catCounts={};items.forEach(c=>{catCounts[c.category]=(catCounts[c.category]||0)+1});
  return <div>
    <div className="stat-cards">
      <div className="stat-card"><div className="stat-label">Total Components</div><div className="stat-value">{items.length}</div></div>
      <div className="stat-card"><div className="stat-label">Active</div><div className="stat-value">{items.filter(c=>c.active!==false).length}</div></div>
      <div className="stat-card"><div className="stat-label">Categories</div><div className="stat-value">{Object.keys(catCounts).length}</div></div>
    </div>
    <div className="mgmt-header">
      <div className="mgmt-toolbar">
        <input className="mgmt-search" placeholder="Search components..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <button className="mgmt-btn" onClick={handleImport}>📥 Import CSV</button>
        <button className="mgmt-btn" onClick={()=>exportCSV(items,"components.csv")}>📤 Export</button>
        <button className="mgmt-btn primary" onClick={openNew}>＋ Add Component</button>
      </div>
    </div>
    <div className="filter-pills">
      <span className={`filter-pill${catFilter==="All"?" active":""}`} onClick={()=>setCatFilter("All")}>All ({items.length})</span>
      {MGMT_CATS.map(c=><span key={c} className={`filter-pill${catFilter===c?" active":""}`} onClick={()=>setCatFilter(c)}>{CAT_ICONS[c]||""} {c} ({catCounts[c]||0})</span>)}
    </div>
    {filtered.length===0?<div className="empty-mgmt"><div style={{fontSize:36}}>📦</div><h3>No components found</h3><p>Add components or import a CSV file to get started.</p></div>:
    <div className="tbl-wrap"><table className="mgmt-table"><thead><tr><th>Name</th><th>Category</th><th>Unit</th><th>Description</th><th>Status</th><th style={{width:90}}>Actions</th></tr></thead>
    <tbody>{filtered.map(c=><tr key={c.id}><td style={{fontWeight:500}}>{c.name}</td><td><span className={`mgmt-badge cat-${c.category}`}>{c.category}</span></td>
      <td>{c.unit}</td><td style={{color:"var(--text-muted)",fontSize:11}}>{c.description||"—"}</td>
      <td>{c.active!==false?<span style={{color:"var(--success)"}}>● Active</span>:<span style={{color:"var(--text-light)"}}>○ Inactive</span>}</td>
      <td><button className="mgmt-btn sm" onClick={()=>openEdit(c)}>✏️</button> <button className="mgmt-btn sm danger" onClick={()=>remove(c.id)}>🗑</button></td>
    </tr>)}</tbody></table></div>}
    <Modal open={modal} onClose={()=>setModal(false)} title={editing?"Edit Component":"Add Component"}
      footer={<><button className="mgmt-btn" onClick={()=>setModal(false)}>Cancel</button><button className="mgmt-btn primary" onClick={submit}>Save</button></>}>
      <div style={{display:"grid",gap:12}}>
        <div className="fg"><label className="fl">Name *</label><input className="fi" value={form.name} onChange={e=>{const v=e.target.value;setForm(p=>({...p,name:v,category:p.category||autoCategory(v)}))}}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div className="fg"><label className="fl">Category</label><select className="fs" value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))}>{MGMT_CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div className="fg"><label className="fl">Unit</label><select className="fs" value={form.unit} onChange={e=>setForm(p=>({...p,unit:e.target.value}))}>{UNITS.map(u2=><option key={u2} value={u2}>{u2}</option>)}</select></div>
        </div>
        <div className="fg"><label className="fl">Description</label><input className="fi" value={form.description||""} onChange={e=>setForm(p=>({...p,description:e.target.value}))}/></div>
        <div className="toggle-row"><span className="toggle-label">Active</span><label className="tgl"><input type="checkbox" checked={form.active!==false} onChange={e=>setForm(p=>({...p,active:e.target.checked}))}/><span className="tgl-track"/><span className="tgl-thumb"/></label></div>
      </div>
    </Modal>
  </div>
}

// ══════════ PRICING TAB ══════════
export function PricingTab(){
  const[items,setItems]=useState(()=>lsGet(LS_KEYS.pricing));
  const[search,setSearch]=useState("");const[catFilter,setCatFilter]=useState("All");
  const[modal,setModal]=useState(false);const[editing,setEditing]=useState(null);
  const[form,setForm]=useState({component_name:"",category:"Posts",unit:"Each",price_per_unit:0,supplier:"",sku:"",effective_date:new Date().toISOString().split("T")[0],panel_type:"",gauge:"",finish_variant:"",active:true});
  useEffect(()=>{lsSet(LS_KEYS.pricing,items)},[items]);
  const filtered=items.filter(p=>(catFilter==="All"||p.category===catFilter)&&(!search||p.component_name.toLowerCase().includes(search.toLowerCase())||p.sku?.toLowerCase().includes(search.toLowerCase())||p.supplier?.toLowerCase().includes(search.toLowerCase())));
  const openNew=()=>{setEditing(null);setForm({component_name:"",category:"Posts",unit:"Each",price_per_unit:0,supplier:"",sku:"",effective_date:new Date().toISOString().split("T")[0],panel_type:"",gauge:"",finish_variant:"",active:true});setModal(true)};
  const openEdit=p=>{setEditing(p);setForm({...p});setModal(true)};
  const submit=()=>{if(!form.component_name.trim())return;
    if(editing){setItems(prev=>prev.map(p=>p.id===editing.id?{...p,...form}:p))}
    else{setItems(prev=>[...prev,{...form,id:genId(),created:new Date().toISOString()}])}
    setModal(false)};
  const remove=id=>{if(confirm("Delete this pricing record?"))setItems(prev=>prev.filter(p=>p.id!==id))};
  const handleImport=()=>{const inp=document.createElement("input");inp.type="file";inp.accept=".csv";
    inp.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{
      const parsed=parseCSV(ev.target.result);
      const mapped=parsed.map(p=>({...p,id:genId(),category:p.category||autoCategory(p.component_name),unit:p.unit||"Each",price_per_unit:Number(p.price_per_unit)||0,active:true}));
      setItems(prev=>[...prev,...mapped])};r.readAsText(f)};inp.click()};
  const totalValue=items.reduce((s,p)=>s+(Number(p.price_per_unit)||0),0);
  const catCounts={};items.forEach(p=>{catCounts[p.category]=(catCounts[p.category]||0)+1});
  const fmt=n=>"$"+Number(n||0).toFixed(2);
  return <div>
    <div className="stat-cards">
      <div className="stat-card"><div className="stat-label">Pricing Records</div><div className="stat-value">{items.length}</div></div>
      <div className="stat-card"><div className="stat-label">Avg Unit Price</div><div className="stat-value">{items.length?fmt(totalValue/items.length):"$0"}</div></div>
      <div className="stat-card"><div className="stat-label">Suppliers</div><div className="stat-value">{new Set(items.map(p=>p.supplier).filter(Boolean)).size}</div></div>
    </div>
    <div className="mgmt-header"><div className="mgmt-toolbar">
      <input className="mgmt-search" placeholder="Search name, SKU, supplier..." value={search} onChange={e=>setSearch(e.target.value)}/>
      <button className="mgmt-btn" onClick={handleImport}>📥 Import CSV</button>
      <button className="mgmt-btn" onClick={()=>exportCSV(items,"pricing.csv")}>📤 Export</button>
      <button className="mgmt-btn primary" onClick={openNew}>＋ Add Pricing</button>
    </div></div>
    <div className="filter-pills">
      <span className={`filter-pill${catFilter==="All"?" active":""}`} onClick={()=>setCatFilter("All")}>All ({items.length})</span>
      {MGMT_CATS.map(c=><span key={c} className={`filter-pill${catFilter===c?" active":""}`} onClick={()=>setCatFilter(c)}>{c} ({catCounts[c]||0})</span>)}
    </div>
    {filtered.length===0?<div className="empty-mgmt"><div style={{fontSize:36}}>💲</div><h3>No pricing records</h3><p>Add pricing or import from CSV.</p></div>:
    <div className="tbl-wrap"><table className="mgmt-table"><thead><tr><th>Product Name</th><th>Category</th><th>SKU</th><th>Supplier</th><th style={{textAlign:"right"}}>Unit Price</th><th>Unit</th><th>Eff. Date</th><th style={{width:90}}>Actions</th></tr></thead>
    <tbody>{filtered.map(p=><tr key={p.id}><td style={{fontWeight:500}}>{p.component_name}{p.gauge?<span style={{color:"var(--text-muted)",fontSize:10,marginLeft:4}}>{p.gauge}</span>:null}{p.finish_variant?<span style={{color:"var(--text-muted)",fontSize:10,marginLeft:4}}>{p.finish_variant}</span>:null}</td>
      <td><span className={`mgmt-badge cat-${p.category}`}>{p.category}</span></td>
      <td className="mono" style={{color:"var(--text-muted)"}}>{p.sku||"—"}</td>
      <td style={{fontSize:11}}>{p.supplier||"—"}</td>
      <td className="cost">{fmt(p.price_per_unit)}</td><td>{p.unit}</td>
      <td style={{fontSize:11,color:"var(--text-muted)"}}>{p.effective_date||"—"}</td>
      <td><button className="mgmt-btn sm" onClick={()=>openEdit(p)}>✏️</button> <button className="mgmt-btn sm danger" onClick={()=>remove(p.id)}>🗑</button></td>
    </tr>)}</tbody></table></div>}
    <Modal open={modal} onClose={()=>setModal(false)} title={editing?"Edit Pricing":"Add Pricing"}
      footer={<><button className="mgmt-btn" onClick={()=>setModal(false)}>Cancel</button><button className="mgmt-btn primary" onClick={submit}>Save</button></>}>
      <div style={{display:"grid",gap:12}}>
        <div className="fg"><label className="fl">Product Name *</label><input className="fi" value={form.component_name} onChange={e=>{const v=e.target.value;setForm(p=>({...p,component_name:v,category:p.category||autoCategory(v)}))}}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <div className="fg"><label className="fl">Category</label><select className="fs" value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))}>{MGMT_CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div className="fg"><label className="fl">Unit Price ($)</label><input className="fi" type="number" step="0.01" min="0" value={form.price_per_unit} onChange={e=>setForm(p=>({...p,price_per_unit:parseFloat(e.target.value)||0}))}/></div>
          <div className="fg"><label className="fl">Unit</label><select className="fs" value={form.unit} onChange={e=>setForm(p=>({...p,unit:e.target.value}))}>{UNITS.map(u2=><option key={u2} value={u2}>{u2}</option>)}</select></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div className="fg"><label className="fl">Supplier</label><input className="fi" value={form.supplier||""} onChange={e=>setForm(p=>({...p,supplier:e.target.value}))}/></div>
          <div className="fg"><label className="fl">SKU</label><input className="fi" value={form.sku||""} onChange={e=>setForm(p=>({...p,sku:e.target.value}))}/></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <div className="fg"><label className="fl">Panel Type</label><input className="fi" value={form.panel_type||""} placeholder="e.g. Ultrarib" onChange={e=>setForm(p=>({...p,panel_type:e.target.value}))}/></div>
          <div className="fg"><label className="fl">Gauge</label><input className="fi" value={form.gauge||""} placeholder="e.g. 29ga" onChange={e=>setForm(p=>({...p,gauge:e.target.value}))}/></div>
          <div className="fg"><label className="fl">Finish</label><input className="fi" value={form.finish_variant||""} placeholder="Color/Galvalume" onChange={e=>setForm(p=>({...p,finish_variant:e.target.value}))}/></div>
        </div>
        <div className="fg"><label className="fl">Effective Date</label><input className="fi" type="date" value={form.effective_date||""} onChange={e=>setForm(p=>({...p,effective_date:e.target.value}))}/></div>
      </div>
    </Modal>
  </div>
}

// ══════════ INVENTORY TAB ══════════
export function InventoryTab(){
  const[items,setItems]=useState(()=>lsGet(LS_KEYS.inventory));
  const[search,setSearch]=useState("");const[catFilter,setCatFilter]=useState("All");
  const[modal,setModal]=useState(false);const[editing,setEditing]=useState(null);
  const[form,setForm]=useState({product_name:"",category:"Posts",on_hand:0,reserved:0,reorder_point:0,unit:"Each",location:"",last_counted:"",notes:""});
  useEffect(()=>{lsSet(LS_KEYS.inventory,items)},[items]);
  const filtered=items.filter(i2=>(catFilter==="All"||i2.category===catFilter)&&(!search||i2.product_name.toLowerCase().includes(search.toLowerCase())));
  const openNew=()=>{setEditing(null);setForm({product_name:"",category:"Posts",on_hand:0,reserved:0,reorder_point:0,unit:"Each",location:"",last_counted:"",notes:""});setModal(true)};
  const openEdit=i2=>{setEditing(i2);setForm({...i2});setModal(true)};
  const submit=()=>{if(!form.product_name.trim())return;
    if(editing){setItems(prev=>prev.map(i2=>i2.id===editing.id?{...i2,...form}:i2))}
    else{setItems(prev=>[...prev,{...form,id:genId(),created:new Date().toISOString()}])}
    setModal(false)};
  const remove=id=>{if(confirm("Delete?"))setItems(prev=>prev.filter(i2=>i2.id!==id))};
  const handleImport=()=>{const inp=document.createElement("input");inp.type="file";inp.accept=".csv";
    inp.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{
      const parsed=parseCSV(ev.target.result);
      const mapped=parsed.map(p=>({...p,id:genId(),category:p.category||autoCategory(p.product_name),on_hand:Number(p.on_hand)||0,reserved:Number(p.reserved)||0,reorder_point:Number(p.reorder_point)||0,unit:p.unit||"Each"}));
      setItems(prev=>[...prev,...mapped])};r.readAsText(f)};inp.click()};
  const lowStock=items.filter(i2=>(i2.on_hand-i2.reserved)<=(i2.reorder_point||0)&&i2.on_hand>0);
  const outOfStock=items.filter(i2=>i2.on_hand<=0);
  return <div>
    <div className="stat-cards">
      <div className="stat-card"><div className="stat-label">Total SKUs</div><div className="stat-value">{items.length}</div></div>
      <div className="stat-card"><div className="stat-label">Low Stock</div><div className="stat-value" style={{color:lowStock.length?"var(--warning)":"var(--success)"}}>{lowStock.length}</div></div>
      <div className="stat-card"><div className="stat-label">Out of Stock</div><div className="stat-value" style={{color:outOfStock.length?"var(--error)":"var(--success)"}}>{outOfStock.length}</div></div>
    </div>
    <div className="mgmt-header"><div className="mgmt-toolbar">
      <input className="mgmt-search" placeholder="Search inventory..." value={search} onChange={e=>setSearch(e.target.value)}/>
      <button className="mgmt-btn" onClick={handleImport}>📥 Import CSV</button>
      <button className="mgmt-btn" onClick={()=>exportCSV(items,"inventory.csv")}>📤 Export</button>
      <button className="mgmt-btn primary" onClick={openNew}>＋ Add Item</button>
    </div></div>
    <div className="filter-pills">
      <span className={`filter-pill${catFilter==="All"?" active":""}`} onClick={()=>setCatFilter("All")}>All ({items.length})</span>
      <span className={`filter-pill${catFilter==="low"?" active":""}`} onClick={()=>setCatFilter("low")} style={{borderColor:lowStock.length?"#f59e0b":""}}>⚠ Low ({lowStock.length})</span>
      {MGMT_CATS.map(c=>{const cnt=items.filter(i2=>i2.category===c).length;return cnt?<span key={c} className={`filter-pill${catFilter===c?" active":""}`} onClick={()=>setCatFilter(c)}>{c} ({cnt})</span>:null})}
    </div>
    {(catFilter==="low"?lowStock:filtered).length===0?<div className="empty-mgmt"><div style={{fontSize:36}}>📋</div><h3>No inventory items</h3><p>Add items or import from CSV.</p></div>:
    <div className="tbl-wrap"><table className="mgmt-table"><thead><tr><th>Product</th><th>Category</th><th style={{textAlign:"right"}}>On Hand</th><th style={{textAlign:"right"}}>Reserved</th><th style={{textAlign:"right"}}>Available</th><th style={{textAlign:"right"}}>Reorder Pt</th><th>Location</th><th>Last Count</th><th style={{width:90}}>Actions</th></tr></thead>
    <tbody>{(catFilter==="low"?lowStock:filtered).map(i2=>{const avail=(i2.on_hand||0)-(i2.reserved||0);const isLow=avail<=(i2.reorder_point||0);
      return <tr key={i2.id} style={isLow?{background:"#fef3c7"}:{}}><td style={{fontWeight:500}}>{i2.product_name}</td>
      <td><span className={`mgmt-badge cat-${i2.category}`}>{i2.category}</span></td>
      <td className="cost">{i2.on_hand}</td><td className="cost">{i2.reserved||0}</td>
      <td className="cost" style={{color:avail<=0?"var(--error)":isLow?"var(--warning)":"var(--success)",fontWeight:600}}>{avail}</td>
      <td className="cost">{i2.reorder_point||0}</td>
      <td style={{fontSize:11,color:"var(--text-muted)"}}>{i2.location||"—"}</td>
      <td style={{fontSize:11,color:"var(--text-muted)"}}>{i2.last_counted||"—"}</td>
      <td><button className="mgmt-btn sm" onClick={()=>openEdit(i2)}>✏️</button> <button className="mgmt-btn sm danger" onClick={()=>remove(i2.id)}>🗑</button></td>
    </tr>})}</tbody></table></div>}
    <Modal open={modal} onClose={()=>setModal(false)} title={editing?"Edit Inventory":"Add Inventory Item"}
      footer={<><button className="mgmt-btn" onClick={()=>setModal(false)}>Cancel</button><button className="mgmt-btn primary" onClick={submit}>Save</button></>}>
      <div style={{display:"grid",gap:12}}>
        <div className="fg"><label className="fl">Product Name *</label><input className="fi" value={form.product_name} onChange={e=>{const v=e.target.value;setForm(p=>({...p,product_name:v,category:p.category||autoCategory(v)}))}}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div className="fg"><label className="fl">Category</label><select className="fs" value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))}>{MGMT_CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div className="fg"><label className="fl">Unit</label><select className="fs" value={form.unit} onChange={e=>setForm(p=>({...p,unit:e.target.value}))}>{UNITS.map(u2=><option key={u2} value={u2}>{u2}</option>)}</select></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <div className="fg"><label className="fl">On Hand</label><input className="fi" type="number" min="0" value={form.on_hand} onChange={e=>setForm(p=>({...p,on_hand:parseInt(e.target.value)||0}))}/></div>
          <div className="fg"><label className="fl">Reserved</label><input className="fi" type="number" min="0" value={form.reserved} onChange={e=>setForm(p=>({...p,reserved:parseInt(e.target.value)||0}))}/></div>
          <div className="fg"><label className="fl">Reorder Point</label><input className="fi" type="number" min="0" value={form.reorder_point} onChange={e=>setForm(p=>({...p,reorder_point:parseInt(e.target.value)||0}))}/></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div className="fg"><label className="fl">Location</label><input className="fi" value={form.location||""} placeholder="e.g. Bay 3, Rack A" onChange={e=>setForm(p=>({...p,location:e.target.value}))}/></div>
          <div className="fg"><label className="fl">Last Counted</label><input className="fi" type="date" value={form.last_counted||""} onChange={e=>setForm(p=>({...p,last_counted:e.target.value}))}/></div>
        </div>
        <div className="fg"><label className="fl">Notes</label><input className="fi" value={form.notes||""} onChange={e=>setForm(p=>({...p,notes:e.target.value}))}/></div>
      </div>
    </Modal>
  </div>
}

// ══════════ BOM RULES TAB ══════════
export function BOMRulesTab(){
  const[items,setItems]=useState(()=>lsGet(LS_KEYS.rules));
  const[search,setSearch]=useState("");const[catFilter,setCatFilter]=useState("All");
  const[modal,setModal]=useState(false);const[editing,setEditing]=useState(null);
  const[form,setForm]=useState({rule_name:"",category:"Posts",component_name:"",applies_when:"",quantity_formula:"",notes:"",active:true,priority:0});
  useEffect(()=>{lsSet(LS_KEYS.rules,items)},[items]);
  const filtered=items.filter(r=>(catFilter==="All"||r.category===catFilter)&&(!search||r.rule_name.toLowerCase().includes(search.toLowerCase())||r.component_name?.toLowerCase().includes(search.toLowerCase())));
  const openNew=()=>{setEditing(null);setForm({rule_name:"",category:"Posts",component_name:"",applies_when:"",quantity_formula:"",notes:"",active:true,priority:0});setModal(true)};
  const openEdit=r=>{setEditing(r);setForm({...r});setModal(true)};
  const submit=()=>{if(!form.rule_name.trim())return;
    if(editing){setItems(prev=>prev.map(r=>r.id===editing.id?{...r,...form}:r))}
    else{setItems(prev=>[...prev,{...form,id:genId(),created:new Date().toISOString()}])}
    setModal(false)};
  const remove=id=>{if(confirm("Delete this rule?"))setItems(prev=>prev.filter(r=>r.id!==id))};
  const handleImport=()=>{const inp=document.createElement("input");inp.type="file";inp.accept=".csv";
    inp.onchange=e=>{const f=e.target.files[0];if(!f)return;const r2=new FileReader();r2.onload=ev=>{
      const parsed=parseCSV(ev.target.result);setItems(prev=>[...prev,...parsed.map(p=>({...p,id:genId(),active:true,priority:Number(p.priority)||0}))])};r2.readAsText(f)};inp.click()};
  return <div>
    <div className="stat-cards">
      <div className="stat-card"><div className="stat-label">Total Rules</div><div className="stat-value">{items.length}</div></div>
      <div className="stat-card"><div className="stat-label">Active</div><div className="stat-value">{items.filter(r=>r.active!==false).length}</div></div>
      <div className="stat-card"><div className="stat-label">Categories</div><div className="stat-value">{new Set(items.map(r=>r.category)).size}</div></div>
    </div>
    <div className="mgmt-header"><div className="mgmt-toolbar">
      <input className="mgmt-search" placeholder="Search rules..." value={search} onChange={e=>setSearch(e.target.value)}/>
      <button className="mgmt-btn" onClick={handleImport}>📥 Import CSV</button>
      <button className="mgmt-btn" onClick={()=>exportCSV(items,"bom_rules.csv")}>📤 Export</button>
      <button className="mgmt-btn primary" onClick={openNew}>＋ Add Rule</button>
    </div></div>
    <div className="filter-pills">
      <span className={`filter-pill${catFilter==="All"?" active":""}`} onClick={()=>setCatFilter("All")}>All ({items.length})</span>
      {MGMT_CATS.map(c=>{const cnt=items.filter(r=>r.category===c).length;return cnt?<span key={c} className={`filter-pill${catFilter===c?" active":""}`} onClick={()=>setCatFilter(c)}>{c} ({cnt})</span>:null})}
    </div>
    {filtered.length===0?<div className="empty-mgmt"><div style={{fontSize:36}}>📏</div><h3>No BOM rules</h3><p>Add rules to define how components map to estimates.</p></div>:
    <div className="tbl-wrap"><table className="mgmt-table"><thead><tr><th style={{width:30}}>#</th><th>Rule Name</th><th>Category</th><th>Component</th><th>Applies When</th><th>Qty Formula</th><th>Status</th><th style={{width:90}}>Actions</th></tr></thead>
    <tbody>{filtered.sort((a,b)=>(a.priority||0)-(b.priority||0)).map(r=><tr key={r.id}>
      <td className="mono" style={{color:"var(--text-light)"}}>{r.priority||0}</td>
      <td style={{fontWeight:500}}>{r.rule_name}</td>
      <td><span className={`mgmt-badge cat-${r.category}`}>{r.category}</span></td>
      <td style={{fontSize:11}}>{r.component_name||"—"}</td>
      <td style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:"var(--text-muted)"}}>{r.applies_when||"Always"}</td>
      <td style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:"var(--accent)"}}>{r.quantity_formula||"—"}</td>
      <td>{r.active!==false?<span style={{color:"var(--success)"}}>● On</span>:<span style={{color:"var(--text-light)"}}>○ Off</span>}</td>
      <td><button className="mgmt-btn sm" onClick={()=>openEdit(r)}>✏️</button> <button className="mgmt-btn sm danger" onClick={()=>remove(r.id)}>🗑</button></td>
    </tr>)}</tbody></table></div>}
    <Modal open={modal} onClose={()=>setModal(false)} title={editing?"Edit BOM Rule":"Add BOM Rule"}
      footer={<><button className="mgmt-btn" onClick={()=>setModal(false)}>Cancel</button><button className="mgmt-btn primary" onClick={submit}>Save</button></>}>
      <div style={{display:"grid",gap:12}}>
        <div className="fg"><label className="fl">Rule Name *</label><input className="fi" value={form.rule_name} onChange={e=>setForm(p=>({...p,rule_name:e.target.value}))}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <div className="fg"><label className="fl">Category</label><select className="fs" value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))}>{MGMT_CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div className="fg"><label className="fl">Component Name</label><input className="fi" value={form.component_name||""} placeholder="Product to map" onChange={e=>setForm(p=>({...p,component_name:e.target.value}))}/></div>
          <div className="fg"><label className="fl">Priority</label><input className="fi" type="number" min="0" value={form.priority} onChange={e=>setForm(p=>({...p,priority:parseInt(e.target.value)||0}))}/></div>
        </div>
        <div className="fg"><label className="fl">Applies When</label><input className="fi" value={form.applies_when||""} placeholder='e.g. width >= 33, barn_type === "Enclosed"' onChange={e=>setForm(p=>({...p,applies_when:e.target.value}))}/></div>
        <div className="fg"><label className="fl">Quantity Formula</label><input className="fi" value={form.quantity_formula||""} placeholder="e.g. ceil(length / post_spacing) + 1" onChange={e=>setForm(p=>({...p,quantity_formula:e.target.value}))}/></div>
        <div className="fg"><label className="fl">Notes</label><input className="fi" value={form.notes||""} onChange={e=>setForm(p=>({...p,notes:e.target.value}))}/></div>
        <div className="toggle-row"><span className="toggle-label">Active</span><label className="tgl"><input type="checkbox" checked={form.active!==false} onChange={e=>setForm(p=>({...p,active:e.target.checked}))}/><span className="tgl-track"/><span className="tgl-thumb"/></label></div>
      </div>
    </Modal>
  </div>
}

// ══════════ MANAGEMENT PAGE WRAPPER ══════════
export function ManagementPage(){
  const[subTab,setSubTab]=useState("components");
  const resetSeed=()=>{if(confirm("This will replace ALL data with the original 75 product catalog. Continue?")){
    localStorage.removeItem(LS_KEYS.pricing);localStorage.removeItem(LS_KEYS.components);localStorage.removeItem(LS_KEYS.rules);localStorage.removeItem(LS_KEYS.inventory);
    initSeedData();window.location.reload()}};
  return <div className="mgmt-page">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
      <div className="tab-bar" style={{marginBottom:0,flex:1}}>
        <button className={`tab-btn${subTab==="components"?" active":""}`} onClick={()=>setSubTab("components")}>🪵 Components</button>
        <button className={`tab-btn${subTab==="pricing"?" active":""}`} onClick={()=>setSubTab("pricing")}>💲 Pricing</button>
        <button className={`tab-btn${subTab==="inventory"?" active":""}`} onClick={()=>setSubTab("inventory")}>📦 Inventory</button>
        <button className={`tab-btn${subTab==="rules"?" active":""}`} onClick={()=>setSubTab("rules")}>📏 BOM Rules</button>
      </div>
      <button className="mgmt-btn sm danger" onClick={resetSeed} style={{marginLeft:12,whiteSpace:"nowrap"}}>🔄 Reset to Defaults</button>
    </div>
    {subTab==="components"&&<ComponentsTab/>}
    {subTab==="pricing"&&<PricingTab/>}
    {subTab==="inventory"&&<InventoryTab/>}
    {subTab==="rules"&&<BOMRulesTab/>}
  </div>
}


export default ManagementPage;
