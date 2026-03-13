import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { calcAdj, calcTC, calcRoofSF, parseOH, getWarnings, generateBOM, selectPostLength, autoPostSpacing, getRecPitch, calcDeliveryMiles, calcConcBags } from "./utils/calcEngine.js";
import { lsGet, LS_KEYS } from "./utils/dataStore.jsx";
import { SMAP, PRESETS, HEADER_PRESETS, DEF } from "./utils/constants.js";
import { initSeedData } from "./utils/seedData.js";
import { PT, gG, CL, CH, Sel, Inp, Tgl, ColorSel, FS, FG } from "./components/UIHelpers.jsx";
import ManagementPage from "./pages/ManagementPage.jsx";

// ══════════ MAIN APP ══════════
function App(){
  const[page,setPage]=useState("estimator");
  const[est,setEst]=useState({...DEF});
  const[tab,setTab]=useState("bom");
  const[calcingMiles,setCalcingMiles]=useState(false);
  const milesTimerRef=useRef(null);
  const u=useCallback((f,v)=>{setEst(p=>{const n={...p,[f]:v};
    if(f==="building_length"){const sp=autoPostSpacing(v);n.post_spacing=sp;n.truss_spacing=sp}
    if(f==="roof_style"&&v==="Single Slope")n.roof_pitch=1;
    if(f==="building_width"&&n.roof_style==="Gable")n.roof_pitch=getRecPitch(v,"Gable");
    if(f==="delivery_miles"||f==="delivery_rate_per_mile")n.mileage_delivery_flat=undefined;
    return n})},[]);
  const pricingData=useMemo(()=>lsGet(LS_KEYS.pricing),[page]);
  const bom=useMemo(()=>(!est.building_width||!est.building_length||!est.eave_height)?[]:generateBOM(est,pricingData),[est,pricingData]);
  const warn=useMemo(()=>getWarnings(est),[est]);
  const grouped=useMemo(()=>{const g={};bom.forEach(ln=>{let sec="POLE BARN STRUCTURE";for(const[s,c]of Object.entries(SMAP)){if(c.includes(ln.category)){sec=s;break}}if(!g[sec])g[sec]={};if(!g[sec][ln.category])g[sec][ln.category]=[];g[sec][ln.category].push(ln)});return g},[bom]);
  const pc=useMemo(()=>calcAdj(est),[est]);
  const tc=useMemo(()=>calcTC(est.building_length||0,est.post_spacing||8),[est]);
  const rSF=useMemo(()=>calcRoofSF(est.building_width||0,est.building_length||0,est.roof_pitch||4,est.roof_style||"Gable",parseOH(est.gable_overhang),parseOH(est.eave_overhang)),[est]);

  // Auto-calculate delivery miles when address fields change
  useEffect(()=>{
    const{customer_address:addr,customer_city:city,customer_state:state,customer_zip:zip}=est;
    if(milesTimerRef.current)clearTimeout(milesTimerRef.current);
    if(!zip&&!city)return;
    milesTimerRef.current=setTimeout(async()=>{
      setCalcingMiles(true);
      const m=await calcDeliveryMiles(addr,city,state,zip);
      if(m!==null)u("delivery_miles",m);
      setCalcingMiles(false);
    },600);
    return()=>{if(milesTimerRef.current)clearTimeout(milesTimerRef.current)};
  },[est.customer_address,est.customer_city,est.customer_state,est.customer_zip]);

  // Header helper with preset + custom
  function HeaderField({label,sizeField,qtyField,customField}){
    const isCustom=est[sizeField]==="Custom";
    return <div className="fg"><label className="fl">{label}</label>
      <div style={{display:"flex",gap:4}}>
        <Sel value={est[sizeField]} onChange={v=>{u(sizeField,v);if(v==="None")u(qtyField,0);else if((est[qtyField]||0)===0)u(qtyField,1)}} options={[...HEADER_PRESETS,{value:"Custom",label:"Custom..."}]} style={{flex:1}}/>
        {isCustom&&<Inp type="number" value={est[customField]} onChange={v=>u(customField,v)} placeholder="ft" style={{width:60}}/>}
        {est[sizeField]!=="None"&&<Inp type="number" value={est[qtyField]} onChange={v=>u(qtyField,v||0)} min={0} max={10} placeholder="Qty" style={{width:50}}/>}
      </div>
    </div>
  }

  return <div>
    <header className="app-header">
      <div style={{flex:1}}>
        <h1>Florida Pole Barn Kits Estimator Tool</h1>
        <div className="subtitle">Material Takeoff & BOM Generator — v2.2</div>
      </div>
      <nav className="top-nav">
        <button className={`top-nav-btn${page==="estimator"?" active":""}`} onClick={()=>setPage("estimator")}>📐 Estimator</button>
        <button className={`top-nav-btn${page==="management"?" active":""}`} onClick={()=>setPage("management")}>⚙️ Management</button>
      </nav>
    </header>
    {page==="management"?<ManagementPage/>:
    <div className="app-layout">
      {/* ═══ SIDEBAR ═══ */}
      <div className="sidebar">
        <div className="form-section" style={{background:"var(--accent-bg)"}}>
          <div className="section-title">Quick Presets</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {PRESETS.map((p,i)=><button key={i} className="preset-btn" onClick={()=>setEst({...DEF,...p.values})}>{p.label}</button>)}
          </div>
        </div>

        <FS title="Building Type"><div className="form-grid c3">
          <FG label="Barn Type"><Sel value={est.barn_type} onChange={v=>u("barn_type",v)} options={["Open Pole Barn","Enclosed"]}/></FG>
          <FG label="Engineering"><Sel value={est.engineered} onChange={v=>u("engineered",v)} options={["Not Engineered","Engineered"]}/></FG>
          <FG label="Building Class"><Sel value={est.building_class} onChange={v=>u("building_class",v)} options={[{value:"Agricultural",label:"Agricultural (DIY)"},{value:"Permitted",label:"Permitted (Engineered)"}]}/></FG>
        </div></FS>

        <FS title="Core Dimensions"><div className="form-grid c3">
          <FG label="Width (ft)"><Inp type="number" value={est.building_width} onChange={v=>u("building_width",v)} min={8} max={50}/></FG>
          <FG label="Length (ft)"><Inp type="number" value={est.building_length} onChange={v=>u("building_length",v)} min={8}/></FG>
          <FG label="Eave Height (ft)"><Inp type="number" value={est.eave_height} onChange={v=>u("eave_height",v)} min={8} max={20}/></FG>
        </div></FS>

        <FS title="Roof"><div className="form-grid">
          <FG label="Style"><Sel value={est.roof_style} onChange={v=>u("roof_style",v)} options={["Gable","Single Slope"]}/></FG>
          <FG label="Pitch (x/12)"><Inp type="number" value={est.roof_pitch} onChange={v=>u("roof_pitch",v)} min={0} max={12}/></FG>
          <FG label="Panel Type"><Sel value={est.roof_panel_type} onChange={v=>u("roof_panel_type",v)} options={PT}/></FG>
          <FG label="Gauge"><Sel value={est.roof_panel_gauge} onChange={v=>u("roof_panel_gauge",v)} options={gG(est.roof_panel_type)} disabled={!est.roof_panel_type||est.roof_panel_type==="None"}/></FG>
          <FG label="Color"><ColorSel label="" value={est.roof_color} onChange={v=>u("roof_color",v)}/></FG>
          <FG label="Purlins"><Sel value={est.roof_purlins} onChange={v=>u("roof_purlins",v)} options={["2x6","2x8","2x6PT","2x8PT"]}/></FG>
          <FG label="Screws"><Sel value={est.roof_screws} onChange={v=>u("roof_screws",v)} options={['#10 Pancake 1.5"','Woodgrip 1.5"']}/></FG>
          <FG label="Sheathing"><Sel value={est.roof_sheathing} onChange={v=>u("roof_sheathing",v)} options={["none","5/8 Zip+Tape","19/32 OSB"]}/></FG>
          <FG label="Gable Overhang"><Sel value={est.gable_overhang} onChange={v=>u("gable_overhang",v)} options={[{value:"None",label:"None"},{value:"18",label:'18"'},{value:"24",label:'24"'}]}/></FG>
          <FG label="Eave Overhang"><Sel value={est.eave_overhang} onChange={v=>u("eave_overhang",v)} options={[{value:"None",label:"None"},{value:"12",label:'12"'},{value:"24",label:'24"'}]}/></FG>
        </div></FS>

        <FS title="Structure"><div className="form-grid c3">
          <FG label="Post Spacing"><Sel value={String(est.post_spacing)} onChange={v=>{u("post_spacing",parseInt(v));u("truss_spacing",parseInt(v))}} options={[{value:"8",label:"8ft"},{value:"10",label:"10ft"},{value:"12",label:"12ft"},{value:"14",label:"14ft"}]}/></FG>
          <FG label="Post Type"><Sel value={est.post_type} onChange={v=>u("post_type",v)} options={["6x6","8x8"]}/></FG>
          <FG label="Wind Exposure"><Sel value={est.wind_exposure} onChange={v=>u("wind_exposure",v)} options={["Risk 1","Risk 2"]}/></FG>
        </div></FS>

        <FS title="Trim Options">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div><Tgl label="Rake Trim" checked={est.rake_trim} onChange={v=>u("rake_trim",v)}/></div>
            {est.rake_trim&&<ColorSel label="Rake Color" value={est.rake_trim_color} onChange={v=>u("rake_trim_color",v)}/>}
            <div><Tgl label="Fascia Trim" checked={est.fascia_trim} onChange={v=>u("fascia_trim",v)}/></div>
            {est.fascia_trim&&<ColorSel label="Fascia Color" value={est.fascia_trim_color} onChange={v=>u("fascia_trim_color",v)}/>}
            <div><Tgl label="Drip Edge" checked={est.drip_edge_trim} onChange={v=>u("drip_edge_trim",v)}/></div>
            {est.drip_edge_trim&&<ColorSel label="Drip Color" value={est.drip_edge_trim_color} onChange={v=>u("drip_edge_trim_color",v)}/>}
          </div>
        </FS>

        {est.barn_type==="Enclosed"&&<FS title="Enclosure">
          <div className="form-grid">
            <FG label="Framing"><Sel value={est.framing_type} onChange={v=>u("framing_type",v)} options={["T-Framed","Stud Framed"]}/></FG>
            <FG label="Siding"><Sel value={est.siding_type||"None"} onChange={v=>u("siding_type",v)} options={PT}/></FG>
            <FG label="Gauge"><Sel value={est.gauge} onChange={v=>u("gauge",v)} options={gG(est.siding_type)} disabled={!est.siding_type||est.siding_type==="None"}/></FG>
            <ColorSel label="Wall Color" value={est.wall_color} onChange={v=>u("wall_color",v)}/>
          </div>
          <div className="sub-title">Openings</div>
          <div className="form-grid c4">
            <FG label="Entry Doors"><Inp type="number" value={est.entry_door_qty} onChange={v=>u("entry_door_qty",v||0)} min={0}/></FG>
            <FG label="Size"><Sel value={est.entry_door_size} onChange={v=>u("entry_door_size",v)} options={["3x6-8","3x7-0","4x7-0"]}/></FG>
            <FG label="Windows"><Inp type="number" value={est.window_qty} onChange={v=>u("window_qty",v||0)} min={0}/></FG>
            <FG label="Size"><Sel value={est.window_size} onChange={v=>u("window_size",v)} options={["3030","3040","3050"]}/></FG>
          </div>
          <div className="form-grid" style={{marginTop:6}}>
            <FG label="Roll-Up Doors"><Inp type="number" value={est.rollup_door_qty} onChange={v=>u("rollup_door_qty",v||0)} min={0}/></FG>
            <FG label="RUD Size"><Sel value={est.rollup_door_size} onChange={v=>u("rollup_door_size",v)} options={["8x8","8x10","10x10","10x12","12x12","12x14"]}/></FG>
          </div>
        </FS>}

        <FS title="Header Trusses"><div className="form-grid c1">
          <HeaderField label="Left End" sizeField="header_truss_left" qtyField="header_truss_qty_left" customField="header_truss_left_custom"/>
          <HeaderField label="Right End" sizeField="header_truss_right" qtyField="header_truss_qty_right" customField="header_truss_right_custom"/>
          <HeaderField label="Center Bays" sizeField="header_truss_center" qtyField="header_truss_qty_center" customField="header_truss_center_custom"/>
        </div></FS>

        <FS title="Gable Dress Kit">
          <Tgl label="Enable Gable Dress Kit" checked={est.gable_dress_kit} onChange={v=>u("gable_dress_kit",v)}/>
          {est.gable_dress_kit&&<div style={{marginTop:8}}>
            <div className="form-grid">
              <FG label="Qty (ends)"><Inp type="number" value={est.gable_dress_qty} onChange={v=>u("gable_dress_qty",v||2)} min={1} max={2}/></FG>
              <FG label="Panel Type"><Sel value={est.gable_dress_panel_type} onChange={v=>u("gable_dress_panel_type",v)} options={PT}/></FG>
              <FG label="Gauge"><Sel value={est.gable_dress_panel_gauge} onChange={v=>u("gable_dress_panel_gauge",v)} options={gG(est.gable_dress_panel_type)}/></FG>
              <ColorSel label="Panel Color" value={est.gable_dress_panel_color} onChange={v=>u("gable_dress_panel_color",v)}/>
            </div>
            <div className="sub-title">Drop Height from Top of Post (inches)</div>
            <div className="form-grid">
              <FG label="Front Gable Drop"><div style={{display:"flex",alignItems:"center",gap:4}}>
                <Inp type="number" value={est.gable_dress_drop_front} onChange={v=>u("gable_dress_drop_front",v||20)} min={6} max={60}/>
                <span style={{fontSize:11,color:"var(--text-muted)",whiteSpace:"nowrap"}}>{((est.gable_dress_drop_front||20)/12).toFixed(2)}ft</span>
              </div></FG>
              {(est.gable_dress_qty||2)>=2&&<FG label="Rear Gable Drop"><div style={{display:"flex",alignItems:"center",gap:4}}>
                <Inp type="number" value={est.gable_dress_drop_rear} onChange={v=>u("gable_dress_drop_rear",v||20)} min={6} max={60}/>
                <span style={{fontSize:11,color:"var(--text-muted)",whiteSpace:"nowrap"}}>{((est.gable_dress_drop_rear||20)/12).toFixed(2)}ft</span>
              </div></FG>}
            </div>
            <div className="form-grid" style={{marginTop:8}}>
              <ColorSel label="J-Trim Color" value={est.gable_dress_jtrim_color} onChange={v=>u("gable_dress_jtrim_color",v)}/>
              <ColorSel label="Corner Trim Color" value={est.gable_dress_corner_trim_color} onChange={v=>u("gable_dress_corner_trim_color",v)}/>
            </div>
          </div>}
        </FS>

        <FS title="Apron Dress Kit">
          <Tgl label="Enable Apron Dress Kit" checked={est.apron_dress_kit} onChange={v=>u("apron_dress_kit",v)}/>
          {est.apron_dress_kit&&<div style={{marginTop:8}}>
            <div className="form-grid">
              <FG label="Qty (sides)"><Inp type="number" value={est.apron_dress_qty} onChange={v=>u("apron_dress_qty",v||2)} min={1} max={2}/></FG>
              <FG label="Panel Type"><Sel value={est.apron_dress_panel_type} onChange={v=>u("apron_dress_panel_type",v)} options={PT}/></FG>
              <FG label="Gauge"><Sel value={est.apron_dress_panel_gauge} onChange={v=>u("apron_dress_panel_gauge",v)} options={gG(est.apron_dress_panel_type)}/></FG>
              <ColorSel label="Panel Color" value={est.apron_dress_panel_color} onChange={v=>u("apron_dress_panel_color",v)}/>
            </div>
            <div className="sub-title">Drop Height from Top of Post (inches)</div>
            <div className="form-grid">
              <FG label="Left Eave Drop"><div style={{display:"flex",alignItems:"center",gap:4}}>
                <Inp type="number" value={est.apron_dress_drop_left} onChange={v=>u("apron_dress_drop_left",v||20)} min={6} max={60}/>
                <span style={{fontSize:11,color:"var(--text-muted)",whiteSpace:"nowrap"}}>{((est.apron_dress_drop_left||20)/12).toFixed(2)}ft</span>
              </div></FG>
              {(est.apron_dress_qty||2)>=2&&<FG label="Right Eave Drop"><div style={{display:"flex",alignItems:"center",gap:4}}>
                <Inp type="number" value={est.apron_dress_drop_right} onChange={v=>u("apron_dress_drop_right",v||20)} min={6} max={60}/>
                <span style={{fontSize:11,color:"var(--text-muted)",whiteSpace:"nowrap"}}>{((est.apron_dress_drop_right||20)/12).toFixed(2)}ft</span>
              </div></FG>}
            </div>
            <div className="form-grid" style={{marginTop:8}}>
              <ColorSel label="J-Trim Color" value={est.apron_dress_jtrim_color} onChange={v=>u("apron_dress_jtrim_color",v)}/>
              <ColorSel label="Corner Trim Color" value={est.apron_dress_corner_trim_color} onChange={v=>u("apron_dress_corner_trim_color",v)}/>
            </div>
          </div>}
        </FS>

        <FS title="Bagged Concrete">
          {(()=>{
            const _pc2=calcAdj(est);const _bClass=est.building_class||"Agricultural";
            const _conc=calcConcBags(_pc2.adjusted,est.building_width||0,_bClass);
            return <div style={{background:_bClass==="Permitted"?"#fef3c7":"var(--accent-bg)",border:"1px solid "+(_bClass==="Permitted"?"#fbbf24":"var(--accent-bg2)"),borderRadius:6,padding:"8px 12px",marginBottom:10,fontSize:12}}>
              <div style={{fontWeight:700,marginBottom:4}}>{_bClass==="Permitted"?"📋 Permitted Build":"🌾 Agricultural Build"}</div>
              {_bClass==="Permitted"
                ?<div><span style={{color:"var(--text-muted)"}}>18 bags × 80lb per post (engineered footing spec)</span><br/><b>{_pc2.adjusted} posts × 18 = {_conc.bags} bags total</b></div>
                :<div><span style={{color:"var(--text-muted)"}}>DIY Backwoods spec: {est.building_width<=24?"18\" dia / 320 lbs":est.building_width<=36?"20\" dia / 480 lbs":"24\" dia / 640 lbs"} per post = {_conc.bagsPerPost} bags</span><br/><b>{_pc2.adjusted} posts × {_conc.bagsPerPost} = {_conc.bags} bags total</b></div>
              }
            </div>
          })()}
          <div className="form-grid">
            <FG label="Concrete Slab"><Sel value={est.concrete_slab} onChange={v=>u("concrete_slab",v)} options={["None","Included"]}/></FG>
            {est.concrete_slab==="Included"&&<FG label="Thickness (in)"><Inp type="number" value={est.concrete_thickness} onChange={v=>u("concrete_thickness",v)} min={4} max={8}/></FG>}
          </div>
        </FS>

        <FS title="Lean-To"><div className="form-grid">
          <FG label="Lean-To" span={2}><Sel value={est.lean_to_enabled} onChange={v=>u("lean_to_enabled",v)} options={["None","Left Side","Right Side","Both Sides"]}/></FG>
          {est.lean_to_enabled&&est.lean_to_enabled!=="None"&&<>
            <FG label="LT Width"><Inp type="number" value={est.lean_to_width} onChange={v=>u("lean_to_width",v)} min={6} max={28}/></FG>
            <FG label="LT Length"><Inp type="number" value={est.lean_to_length} onChange={v=>u("lean_to_length",v)} min={8}/></FG>
            <FG label="LT Post Type"><Sel value={est.lean_to_post_type} onChange={v=>u("lean_to_post_type",v)} options={["6x6","8x8"]}/></FG>
            <FG label="LT Purlins"><Sel value={est.lean_to_purlins} onChange={v=>u("lean_to_purlins",v)} options={["2x6","2x8"]}/></FG>
            <FG label="LT Panel Type"><Sel value={est.lean_to_panel_type} onChange={v=>u("lean_to_panel_type",v)} options={PT}/></FG>
            <FG label="LT Panel Gauge"><Sel value={est.lean_to_panel_gauge} onChange={v=>u("lean_to_panel_gauge",v)} options={gG(est.lean_to_panel_type)}/></FG>
            <ColorSel label="LT Panel Color" value={est.lean_to_panel_color} onChange={v=>u("lean_to_panel_color",v)}/>
            <div className="fg s2">
              <div className="sub-title">Lean-To Trim</div>
              <Tgl label="Rake Trim" checked={est.lean_to_rake_trim} onChange={v=>u("lean_to_rake_trim",v)}/>
              <Tgl label="Fascia Trim" checked={est.lean_to_fascia_trim} onChange={v=>u("lean_to_fascia_trim",v)}/>
              <Tgl label="Drip Edge" checked={est.lean_to_drip_edge} onChange={v=>u("lean_to_drip_edge",v)}/>
              {(est.lean_to_rake_trim||est.lean_to_fascia_trim||est.lean_to_drip_edge)&&
                <ColorSel label="LT Trim Color" value={est.lean_to_trim_color} onChange={v=>u("lean_to_trim_color",v)}/>}
            </div>
          </>}
        </div></FS>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="main-content">
        {warn.length>0&&warn.map((w,i)=><div key={i} className="warn-banner">⚠ {w}</div>)}
        <div className="summary-grid">
          <div className="sc"><div className="lb">Building</div><div className="vl">{est.building_width}×{est.building_length}</div><div className="dt">{est.roof_style} {est.roof_pitch}/12 • {est.eave_height}ft eave</div></div>
          <div className="sc"><div className="lb">Posts</div><div className="vl">{pc.adjusted}</div><div className="dt">{est.post_type} × {selectPostLength(est.eave_height)}ft @ {est.post_spacing}ft</div></div>
          <div className="sc"><div className="lb">Trusses</div><div className="vl">{tc}</div><div className="dt">{est.building_width}' {est.roof_style} {est.roof_pitch}:12</div></div>
          <div className="sc"><div className="lb">Roof Area</div><div className="vl">{rSF.toLocaleString()}</div><div className="dt">SF (with overhangs)</div></div>
          <div className="sc"><div className="lb">BOM Lines</div><div className="vl">{bom.length}</div><div className="dt">{est.barn_type}{est.lean_to_enabled&&est.lean_to_enabled!=="None"?" + Lean-To":""}</div></div>
        </div>
        <div className="tab-bar">
          <button className={`tab-btn ${tab==="bom"?"active":""}`} onClick={()=>setTab("bom")}>Bill of Materials</button>
          <button className={`tab-btn ${tab==="estimate"?"active":""}`} onClick={()=>setTab("estimate")}>💰 Estimate</button>
          <button className={`tab-btn ${tab==="notes"?"active":""}`} onClick={()=>setTab("notes")}>Calculation Notes</button>
        </div>
        {tab==="bom"&&(bom.length===0?<div className="empty"><div className="icon">🏗️</div><h3>Enter building dimensions</h3><p>Fill in width, length, and eave height to generate a material takeoff.</p></div>:
          Object.entries(SMAP).map(([sec,cats])=>{const sd=grouped[sec];if(!sd)return null;
            return <div className="bom-card" key={sec}><div className="bom-sec-hdr">{sec}</div>
              {cats.map(cat=>{const cl=sd[cat];if(!cl||!cl.length)return null;
                return <div key={cat}><div className="bom-cat-hdr">{cat}</div>
                  <table className="bt"><thead><tr><th style={{width:"32%"}}>Product</th><th style={{width:"8%",textAlign:"right"}}>Qty</th><th style={{width:"6%"}}>Unit</th><th style={{width:"8%",textAlign:"right"}}>Unit $</th><th style={{width:"10%",textAlign:"right"}}>Ext $</th><th>Notes / Panel Details</th></tr></thead>
                  <tbody>{cl.map((ln,i)=><tr key={i}>
                    <td><span className="pn">{ln.component_name}</span></td>
                    <td className="qty">{ln.quantity}</td>
                    <td>{ln.unit}</td>
                    <td className="cost" style={{fontSize:11}}>{ln.unit_cost>0?"$"+ln.unit_cost.toFixed(2):""}</td>
                    <td className="cost" style={{fontWeight:ln.extended_cost>0?600:400}}>{ln.extended_cost>0?"$"+ln.extended_cost.toFixed(2):""}</td>
                    <td><div className="nt">{ln.notes}</div>
                      {ln.panelDetails&&<div className="panel-detail">
                        <span>📐 Panel Len: <b>{ln.panelDetails.panelLengthFt}ft</b></span>
                        <span>📦 Panels: <b>{ln.panelDetails.panelCount}</b></span>
                        <span>LF: {ln.panelDetails.baseLF}</span>
                        <span>SF: {ln.panelDetails.totalSF}</span>
                      </div>}
                    </td></tr>)}</tbody></table></div>})}</div>})
        )}
        {tab==="estimate"&&(()=>{
          const subtotal=bom.reduce((s,ln)=>s+ln.extended_cost,0);
          const markupPct=est.markup_pct||20;const markup=Math.round(subtotal*(markupPct/100)*100)/100;
          const afterMarkup=subtotal+markup;
          const taxPct=est.fl_sales_tax_pct||7.5;const tax=Math.round(afterMarkup*(taxPct/100)*100)/100;
          const miles=est.delivery_miles||0;const dRate=est.delivery_rate_per_mile||4;
          const hasPanels=bom.some(ln=>ln.category==="Roof Panels"||ln.category==="Wall Panels"||ln.category==="Gable Dress Kit"||ln.category==="Apron Dress Kit"||(ln.category==="Lean-To"&&ln.unit==="SF"));
          const metalDel=hasPanels?(est.metal_panel_delivery||135):0;
          const computedMileageDel=miles>0?Math.round(miles*dRate*100)/100:0;
          const mileageDel=est.mileage_delivery_flat!=null?est.mileage_delivery_flat:computedMileageDel;
          const totalDelivery=metalDel+mileageDel;
          const grandTotal=Math.round((afterMarkup+tax+totalDelivery)*100)/100;
          const fmt=n=>"$"+Number(n||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
          const pricedLines=bom.filter(ln=>ln.unit_cost>0).length;const unpricedLines=bom.length-pricedLines;
          // Group by category for summary
          const catTotals={};bom.forEach(ln=>{catTotals[ln.category]=(catTotals[ln.category]||0)+ln.extended_cost});
          return <div>
            {/* Customer & Delivery Info Bar */}
            <div className="bom-card" style={{marginBottom:16}}>
              <div className="bom-sec-hdr">CUSTOMER & DELIVERY</div>
              <div style={{padding:16}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:12}}>
                  <div className="fg"><label className="fl">Customer Name</label><input className="fi" value={est.customer_name} onChange={e=>u("customer_name",e.target.value)}/></div>
                  <div className="fg"><label className="fl">Delivery Address</label><input className="fi" value={est.customer_address} onChange={e=>u("customer_address",e.target.value)} placeholder="Street address"/></div>
                  <div className="fg"><label className="fl">City</label><input className="fi" value={est.customer_city} onChange={e=>u("customer_city",e.target.value)}/></div>
                  <div className="fg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                    <div><label className="fl">State</label><input className="fi" value={est.customer_state} onChange={e=>u("customer_state",e.target.value)}/></div>
                    <div><label className="fl">ZIP</label><input className="fi" value={est.customer_zip} onChange={e=>u("customer_zip",e.target.value)}/></div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"auto 120px 120px 140px 140px 1fr",gap:10,alignItems:"end"}}>
                  <div className="fg"><label className="fl">Delivery Miles</label>
                    <div style={{display:"flex",gap:4}}>
                      <input className="fi" type="number" min="0" value={est.delivery_miles} onChange={e=>u("delivery_miles",parseFloat(e.target.value)||0)} style={{width:80}}/>
                      {calcingMiles
                        ?<span style={{height:34,display:"flex",alignItems:"center",fontSize:11,color:"var(--text-muted)",whiteSpace:"nowrap"}}>⏳ Calculating...</span>
                        :est.delivery_miles>0
                          ?<span style={{height:34,display:"flex",alignItems:"center",fontSize:11,color:"var(--accent)",fontWeight:600,whiteSpace:"nowrap"}}>📍 {est.delivery_miles} mi</span>
                          :<span style={{height:34,display:"flex",alignItems:"center",fontSize:11,color:"var(--text-muted)",whiteSpace:"nowrap"}}>📍 Enter address</span>
                      }
                    </div>
                  </div>
                  <div className="fg"><label className="fl">$/Mile</label><input className="fi" type="number" step="0.5" min="0" value={est.delivery_rate_per_mile} onChange={e=>u("delivery_rate_per_mile",parseFloat(e.target.value)||4)}/></div>
                  <div className="fg"><label className="fl">Panel Delivery $</label><input className="fi" type="number" step="5" min="0" value={est.metal_panel_delivery} onChange={e=>u("metal_panel_delivery",parseFloat(e.target.value)||135)}/></div>
                  <div className="fg"><label className="fl">Markup %</label><input className="fi" type="number" step="1" min="0" max="100" value={est.markup_pct} onChange={e=>u("markup_pct",parseFloat(e.target.value)||20)}/></div>
                  <div className="fg"><label className="fl">FL Tax %</label><input className="fi" type="number" step="0.1" min="0" value={est.fl_sales_tax_pct} onChange={e=>u("fl_sales_tax_pct",parseFloat(e.target.value)||7.5)}/></div>
                  <div style={{fontSize:10,color:"var(--text-muted)",paddingBottom:8,lineHeight:1.4}}>
                    📍 From: 19112 Causey Rd<br/>Minneola, FL 34715<br/>
                    {miles>0&&<span style={{color:"var(--accent)",fontWeight:600}}>≈ {miles} miles → {fmt(mileageDel)}</span>}
                  </div>
                </div>
              </div>
            </div>
            {unpricedLines>0&&<div className="warn-banner" style={{marginBottom:12}}>⚠ {unpricedLines} of {bom.length} line items have no pricing. Go to Management → Pricing to add unit costs.</div>}
            {/* Category Breakdown */}
            <div className="bom-card" style={{marginBottom:16}}>
              <div className="bom-sec-hdr">PRICED LINE ITEMS</div>
              <table className="bt"><thead><tr><th>Product</th><th>Category</th><th style={{textAlign:"right"}}>Qty</th><th>Unit</th><th style={{textAlign:"right"}}>Unit Cost</th><th style={{textAlign:"right"}}>Ext. Cost</th></tr></thead>
              <tbody>{bom.map((ln,i)=><tr key={i} style={ln.unit_cost===0?{opacity:.5}:{}}>
                <td><span className="pn">{ln.component_name}</span></td>
                <td><span className={`mgmt-badge cat-${ln.category}`} style={{fontSize:9}}>{ln.category}</span></td>
                <td className="qty">{ln.quantity}</td><td>{ln.unit}</td>
                <td className="cost">{ln.unit_cost>0?fmt(ln.unit_cost):<span style={{color:"var(--error)",fontSize:10}}>NOT SET</span>}</td>
                <td className="cost" style={{fontWeight:600}}>{ln.unit_cost>0?fmt(ln.extended_cost):"—"}</td>
              </tr>)}</tbody></table>
            </div>
            {/* Category Summary */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div className="bom-card">
                <div className="bom-sec-hdr">COST BY CATEGORY</div>
                <div style={{padding:12}}>
                  {Object.entries(catTotals).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).map(([cat,total])=>
                    <div key={cat} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #f0ede8",fontSize:13}}>
                      <span><span className={`mgmt-badge cat-${cat}`} style={{fontSize:9,marginRight:6}}>{cat}</span></span>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:500}}>{fmt(total)}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Grand Total Card */}
              <div style={{background:"var(--surface)",border:"2px solid var(--accent)",borderRadius:"var(--radius)",padding:20,boxShadow:"var(--shadow-md)"}}>
                <div style={{fontSize:12,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--accent)",marginBottom:16}}>Estimate Summary</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",fontSize:13,color:"var(--text-muted)"}}>
                  <span>Material Subtotal</span><span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:500,color:"var(--text)"}}>{fmt(subtotal)}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",fontSize:13,color:"var(--text-muted)"}}>
                  <span style={{display:"flex",alignItems:"center",gap:4}}>Markup <input type="number" className="fi" style={{width:52,height:24,fontSize:12,padding:"0 4px",textAlign:"center",display:"inline-block"}} value={est.markup_pct} onChange={e=>u("markup_pct",parseFloat(e.target.value)||0)} min={0} max={100} step={1}/>%</span>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:500,color:"var(--text)"}}>{fmt(markup)}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",fontSize:13,borderBottom:"1px solid var(--border)",color:"var(--text-muted)"}}>
                  <span>After Markup</span><span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:600,color:"var(--text)"}}>{fmt(afterMarkup)}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",fontSize:13,color:"var(--text-muted)"}}>
                  <span>FL Sales Tax ({taxPct}%)</span><span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:500,color:"var(--text)"}}>{fmt(tax)}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",fontSize:13,color:"var(--text-muted)"}}>
                  <span>Metal Panel Delivery (flat)</span>
                  <span style={{display:"flex",alignItems:"center",gap:3}}>$<input type="number" className="fi" style={{width:60,height:24,fontSize:12,padding:"0 4px",textAlign:"right",display:"inline-block"}} value={est.metal_panel_delivery} onChange={e=>u("metal_panel_delivery",parseFloat(e.target.value)||0)} min={0} step={5}/></span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",fontSize:13,borderBottom:"1px solid var(--border)",color:"var(--text-muted)"}}>
                  <span style={{display:"flex",alignItems:"center",gap:4}}>Mileage: <input type="number" className="fi" style={{width:50,height:24,fontSize:12,padding:"0 4px",textAlign:"center",display:"inline-block"}} value={est.delivery_miles} onChange={e=>u("delivery_miles",parseFloat(e.target.value)||0)} min={0}/> mi × $<input type="number" className="fi" style={{width:46,height:24,fontSize:12,padding:"0 4px",textAlign:"center",display:"inline-block"}} value={est.delivery_rate_per_mile} onChange={e=>u("delivery_rate_per_mile",parseFloat(e.target.value)||0)} min={0} step={0.5}/>/mi</span>
                  <span style={{display:"flex",alignItems:"center",gap:3}}>$<input type="number" className="fi" style={{width:70,height:24,fontSize:12,padding:"0 4px",textAlign:"right",display:"inline-block",fontFamily:"'JetBrains Mono',monospace",fontWeight:500}} value={mileageDel} onChange={e=>u("mileage_delivery_flat",parseFloat(e.target.value)||0)} min={0} step={5}/></span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",padding:"14px 0 0",fontSize:22,fontWeight:700,color:"var(--accent)"}}>
                  <span>GRAND TOTAL</span><span style={{fontFamily:"'JetBrains Mono',monospace"}}>{fmt(grandTotal)}</span>
                </div>
                {est.customer_name&&<div style={{marginTop:12,padding:"8px 0",borderTop:"1px dashed var(--border)",fontSize:12,color:"var(--text-muted)"}}>
                  Prepared for: <b style={{color:"var(--text)"}}>{est.customer_name}</b>
                  {est.customer_city&&<span> — {est.customer_city}, {est.customer_state} {est.customer_zip}</span>}
                </div>}
              </div>
            </div>
          </div>
        })()}
        {tab==="notes"&&<div className="bom-card"><div className="bom-sec-hdr">CALCULATION AUDIT TRAIL</div>
          <div style={{padding:16}}><table className="bt"><thead><tr><th>Line Item</th><th>Formula / Notes</th><th style={{textAlign:"right"}}>Result</th></tr></thead>
          <tbody>{bom.map((ln,i)=><tr key={i}><td><span className="pn">{ln.component_name}</span><div className="nt">{ln.category}</div></td><td><div className="nt">{ln.notes}</div>{ln.panelDetails&&<div className="nt" style={{marginTop:4}}>Panel Length: {ln.panelDetails.panelLengthFt}ft | Count: {ln.panelDetails.panelCount} | LF: {ln.panelDetails.baseLF}</div>}</td><td className="qty">{ln.quantity} {ln.unit}</td></tr>)}</tbody></table></div></div>}
      </div>
    </div>}
  </div>
}




export default App;
