import React from "react";

// ══════════ UI HELPERS ══════════
const PT=["None","Ultrarib Panel","PRB Panel","Standing Seam"];
const GS={all:["29ga","26ga","24ga"],prb:["26ga","24ga"],ss:["26ga"]};
const CL=["Color-TBD","N/A","White","Ivory","Tan","Brown","Black","Charcoal","Red","Blue","Green","Galvalume"];
const CH={Galvalume:"#c0c8d0",White:"#f5f5f5",Ivory:"#fffff0",Tan:"#d2b48c",Brown:"#8B4513",Black:"#222",Charcoal:"#444",Red:"#cc2222",Blue:"#2255cc",Green:"#228833","N/A":"#eee","Color-TBD":"#ddd"};
function gG(t){if(t==="Standing Seam")return GS.ss;if(t==="PRB Panel")return GS.prb;if(!t||t==="None")return[];return GS.all}

function Sel({value,onChange,options,placeholder,disabled,style}){
  return <select className="fs" value={value||""} onChange={e=>onChange(e.target.value)} disabled={disabled} style={style}>
    {placeholder&&<option value="">{placeholder}</option>}
    {options.map(o=>typeof o==="string"?<option key={o} value={o}>{o}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
}
function Inp({type,value,onChange,min,max,placeholder,disabled,style}){
  return <input className="fi" type={type||"text"} value={value??""}
    onChange={e=>onChange(type==="number"?(e.target.value===""?"":parseFloat(e.target.value)):e.target.value)}
    min={min} max={max} placeholder={placeholder} disabled={disabled} style={style}/>
}
function Tgl({checked,onChange,label}){
  return <div className="toggle-row"><span className="toggle-label">{label}</span>
    <label className="tgl"><input type="checkbox" checked={!!checked} onChange={e=>onChange(e.target.checked)}/><span className="tgl-track"/><span className="tgl-thumb"/></label>
  </div>
}
function ColorSel({value,onChange,label}){
  return <div className="fg"><label className="fl">{label}</label><div className="color-row">
    <div className="cdot" style={{background:CH[value]||"#eee"}}/><Sel value={value} onChange={onChange} options={CL}/>
  </div></div>
}
function FS({title,children}){return <div className="form-section"><div className="section-title">{title}</div>{children}</div>}
function FG({label,span,children}){return <div className={`fg${span?` s${span}`:""}`}><label className="fl">{label}</label>{children}</div>}

// ══════════ SECTION MAP ══════════
const SMAP={"POLE BARN STRUCTURE":["Posts","Trusses","Lumber","Roof Panels","Trim","Hardware","Concrete"],"ENCLOSED COMPONENTS":["Wall Panels","Openings","Wall Framing"],"GABLE DRESS KIT":["Gable Dress Kit"],"APRON DRESS KIT":["Apron Dress Kit"],"LEAN-TO":["Lean-To"]};

const PRESETS=[
  {label:"30×40×12 Open",values:{building_width:30,building_length:40,eave_height:12,roof_style:"Gable",roof_pitch:4,post_type:"6x6",post_spacing:10,barn_type:"Open Pole Barn"}},
  {label:"40×60×14 Enclosed",values:{building_width:40,building_length:60,eave_height:14,roof_style:"Gable",roof_pitch:3,post_type:"8x8",post_spacing:12,barn_type:"Enclosed",siding_type:"Ultrarib Panel",gauge:"29ga",wall_color:"Tan",framing_type:"T-Framed",entry_door_qty:2,window_qty:4,rollup_door_qty:1,rollup_door_size:"10x12"}},
  {label:"50×72×14 (Gismonde)",values:{building_width:50,building_length:72,eave_height:14,roof_style:"Gable",roof_pitch:3,post_type:"8x8",post_spacing:12,barn_type:"Enclosed",siding_type:"Ultrarib Panel",gauge:"26ga",wall_color:"White",framing_type:"Stud Framed",entry_door_qty:2,window_qty:4,rollup_door_qty:2,rollup_door_size:"10x12"}},
  {label:"24×36 Single Slope",values:{building_width:24,building_length:36,eave_height:10,roof_style:"Single Slope",roof_pitch:1,post_type:"6x6",post_spacing:12,barn_type:"Open Pole Barn"}},
  {label:"44×40×13 (Goostree)",values:{building_width:44,building_length:40,eave_height:13,roof_style:"Gable",roof_pitch:3,post_type:"8x8",post_spacing:10,barn_type:"Enclosed",siding_type:"Ultrarib Panel",gauge:"26ga",wall_color:"Tan",framing_type:"Stud Framed",entry_door_qty:2,window_qty:6,window_size:"3040"}},
];

const HEADER_PRESETS=["None","10'","12'","16'","20'","24'","30'","36'","40'"];

const DEF={barn_type:"Open Pole Barn",engineered:"Not Engineered",building_class:"Agricultural",building_width:30,building_length:40,eave_height:12,roof_style:"Gable",roof_pitch:4,post_type:"6x6",post_spacing:10,truss_spacing:10,roof_panel_type:"Ultrarib Panel",roof_panel_gauge:"29ga",roof_color:"Galvalume",roof_purlins:"2x6",roof_sheathing:"none",roof_screws:'Woodgrip 1.5"',gable_overhang:"18",eave_overhang:"12",framing_type:"T-Framed",siding_type:"None",gauge:"",wall_color:"",entry_door_qty:0,entry_door_size:"3x6-8",window_qty:0,window_size:"3030",rollup_door_qty:0,rollup_door_size:"10x10",rollup_doors:"[]",rake_trim:false,rake_trim_color:"",fascia_trim:false,fascia_trim_color:"",drip_edge_trim:false,drip_edge_trim_color:"",concrete_slab:"None",concrete_thickness:4,lean_to_enabled:"None",lean_to_width:12,lean_to_length:40,lean_to_purlins:"2x6",lean_to_post_type:"6x6",lean_to_panel_type:"None",lean_to_panel_gauge:"29ga",lean_to_panel_color:"Galvalume",lean_to_rake_trim:false,lean_to_fascia_trim:false,lean_to_drip_edge:false,lean_to_trim_color:"",header_truss_left:"None",header_truss_right:"None",header_truss_center:"None",header_truss_qty_left:0,header_truss_qty_right:0,header_truss_qty_center:0,header_truss_left_custom:"",header_truss_right_custom:"",header_truss_center_custom:"",gable_dress_kit:false,gable_dress_qty:2,gable_dress_panel_type:"None",gable_dress_panel_gauge:"29ga",gable_dress_panel_color:"Galvalume",gable_dress_jtrim_color:"",gable_dress_corner_trim_color:"",gable_dress_drop_front:20,gable_dress_drop_rear:20,apron_dress_kit:false,apron_dress_qty:2,apron_dress_panel_type:"None",apron_dress_panel_gauge:"29ga",apron_dress_panel_color:"Galvalume",apron_dress_jtrim_color:"",apron_dress_corner_trim_color:"",apron_dress_drop_left:20,apron_dress_drop_right:20,wind_exposure:"Risk 1",customer_name:"",customer_address:"",customer_city:"",customer_state:"FL",customer_zip:"",delivery_miles:0,markup_pct:20,metal_panel_delivery:135,delivery_rate_per_mile:4,fl_sales_tax_pct:7.5};


export { PT, GS, CL, CH, gG, Sel, Inp, Tgl, ColorSel, FS, FG };
