import { ZIP_COORDS } from "./zipCoords.js";

// Origin: 19112 Causey Road, Minneola, FL 34715
export const ORIGIN_LAT=28.5744;
export const ORIGIN_LNG=-81.7463;

// Haversine distance in miles
export function haversine(lat1,lon1,lat2,lon2){
  const R=3958.8;
  const dLat=(lat2-lat1)*Math.PI/180;const dLon=(lon2-lon1)*Math.PI/180;
  const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
}

// Florida ZIP code → lat/lng lookup (covers major FL ZIPs + surrounding states)

// Geocode: try ZIP lookup first (instant, no API), then Nominatim API as fallback
export async function geocodeAddress(addr,city,state,zip){
  // 1. ZIP lookup (instant)
  const z=(zip||"").trim().slice(0,5);
  if(z.length===5&&ZIP_COORDS[z])return{lat:ZIP_COORDS[z][0],lng:ZIP_COORDS[z][1]};
  // 2. Try Nominatim API as fallback
  const parts=[addr,city,state,zip].filter(Boolean).join(", ");
  if(!parts||parts.length<5)return null;
  try{
    const q=encodeURIComponent(parts);
    const res=await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=us`,{headers:{"User-Agent":"FPB-Estimator/1.0"}});
    if(!res.ok)throw new Error("fetch failed");
    const data=await res.json();
    if(data&&data.length>0)return{lat:parseFloat(data[0].lat),lng:parseFloat(data[0].lon)};
    // Fallback: city+state+zip only
    const q2=encodeURIComponent([city,state,zip].filter(Boolean).join(", "));
    const res2=await fetch(`https://nominatim.openstreetmap.org/search?q=${q2}&format=json&limit=1&countrycodes=us`,{headers:{"User-Agent":"FPB-Estimator/1.0"}});
    if(res2.ok){const d2=await res2.json();if(d2&&d2.length>0)return{lat:parseFloat(d2[0].lat),lng:parseFloat(d2[0].lon)}}
    return null
  }catch{return null}
}

// Calculate driving-estimate miles (straight-line × 1.3 road factor)
export async function calcDeliveryMiles(addr,city,state,zip){
  const geo=await geocodeAddress(addr,city,state,zip);
  if(!geo)return null;
  const straight=haversine(ORIGIN_LAT,ORIGIN_LNG,geo.lat,geo.lng);
  return Math.round(straight*1.3);
}

export function autoPostSpacing(L){if(!L||L<=0)return 8;if(L%12===0)return 12;if(L%10===0)return 10;return 8}
export function selectPostLength(h){const r=(h||0)+4;return[14,16,18,20,24].find(s=>s>=r)??24}
export function getRecPitch(w,rs){if(rs==="Single Slope")return 1;return w>=31?3:4}
export function calcPostCount(l,sp){if(!l||!sp)return 0;return(Math.ceil(l/sp)+1)*2}
export function calcAdj(est){
  const base=calcPostCount(est.building_length||0,est.post_spacing||8);
  const sp=est.post_spacing||8,bl=est.building_length||0;
  const rm=(hv,q)=>{if(!hv||hv==="None"||!q)return 0;const ft=parseInt(String(hv).match(/(\d+)/)?.[1]||0);return ft<=0?0:Math.max(Math.ceil(Math.min(ft,bl)/sp)-1,0)*q};
  const removed=rm(est.header_truss_left,est.header_truss_qty_left||1)+rm(est.header_truss_right,est.header_truss_qty_right||1)+rm(est.header_truss_center,est.header_truss_qty_center||0);
  return{base,removed,adjusted:Math.max(base-removed,0)}
}
export function calcTC(l,sp){return Math.ceil((l||0)/(sp||8))+1}
// Concrete bags: Permitted = 18 bags per post (flat), Agricultural = DIY table by width
export function calcConcBags(pc,w,buildingClass){
  if(buildingClass==="Permitted"){
    // Permitted/engineered: 18 × 80lb bags per post per engineered footing specs
    return{bags:18*pc,bagsPerPost:18,dia:"per plan",depth:"per plan",lbsPerPost:18*80,mode:"Permitted"}
  }
  // Agricultural (DIY Backwoods specs):
  // 10'-24' = 18" dia, 320 lbs/post = 4 bags
  // 25'-36' = 20" dia, 480 lbs/post = 6 bags  
  // 37'-50' = 24" dia, 640 lbs/post = 8 bags
  let d,dep=36,lbs;
  if(w<=24){d=18;lbs=320}else if(w<=36){d=20;lbs=480}else if(w<=50){d=24;lbs=640}else{d=18;lbs=320}
  const bagsPerPost=Math.ceil(lbs/80);
  return{bags:bagsPerPost*pc,bagsPerPost,dia:d,depth:dep,lbsPerPost:lbs,mode:"Agricultural"}
}
// Lean-to concrete: same logic with lean-to width table
// Agricultural: 6'-20' = 18" dia / 320 lbs (4 bags), 21'-28' = 24" dia / 640 lbs (8 bags)
// Permitted: 18 bags per post
export function calcLTConcBags(ltPC,ltW,buildingClass){
  if(buildingClass==="Permitted"){
    return{bags:18*ltPC,bagsPerPost:18,lbsPerPost:18*80,mode:"Permitted"}
  }
  const ltLbs=ltW<=20?320:640;
  const bpp=Math.ceil(ltLbs/80);
  return{bags:bpp*ltPC,bagsPerPost:bpp,lbsPerPost:ltLbs,mode:"Agricultural"}
}
export function calcRoofSF(w,l,p,rs,goIn,eoIn){
  const GO=(goIn||0)/12,EO=(eoIn||0)/12,EL=(l||0)+2*GO,EW=(w||0)+2*EO;
  const sf=Math.sqrt(1+Math.pow((p||0)/12,2));
  return Math.round((rs==="Single Slope"?EL*EW*sf:2*EL*(EW/2)*sf)*100)/100
}
export function parseOH(v){if(!v)return 0;const s=String(v).trim().toLowerCase();if(s==="none"||s==="0")return 0;const m=s.match(/^([\d.]+)/);return m?parseFloat(m[1]):0}
export function getWarnings(est){
  const w=[];const bw=est.building_width||0,p=est.roof_pitch||0,rs=est.roof_style,pt=est.post_type||"6x6";
  if(rs==="Single Slope"&&bw>28)w.push(`Single slope limited to 28' wide. Current: ${bw}'`);
  if(est.engineered!=="Not Engineered"){
    if(rs==="Gable"){if(bw>=8&&bw<=30&&p!==4)w.push(`Plan recommends 4/12 for ${bw}ft. Current: ${p}/12`);else if(bw>=31&&bw<=50&&p!==3)w.push(`Plan recommends 3/12 for ${bw}ft. Current: ${p}/12`)}
    else if(rs==="Single Slope"&&p!==1)w.push(`Plan recommends 1/12 for SS. Current: ${p}/12`);
    if(bw>=10&&bw<=32&&pt!=="6x6")w.push(`Plan recommends 6x6 for ${bw}ft. Current: ${pt}`);
    else if(bw>=33&&bw<=50&&pt!=="8x8")w.push(`Plan recommends 8x8 for ${bw}ft. Current: ${pt}`);
  }
  return w
}

// Panel detail helper: computes panel length and count for any panel context
export function calcPanelDetails(totalSF, panelLengthFt){
  const baseLF=Math.round(totalSF/3);
  const panelCount=panelLengthFt>0?Math.ceil(baseLF/panelLengthFt):0;
  return{totalSF,baseLF,panelLengthFt:Math.round(panelLengthFt*100)/100,panelCount}
}

// ══════════ BOM GENERATOR ══════════
export function generateBOM(est,pricingData){
  const w=est.building_width||0,l=est.building_length||0,h=est.eave_height||0;
  const pitch=est.roof_pitch||4,rs=est.roof_style||"Gable";
  const psp=est.post_spacing||8,isEncl=est.barn_type!=="Open Pole Barn";
  const bClass=est.building_class||"Agricultural";
  const goIn=parseOH(est.gable_overhang!=="None"?est.gable_overhang:0);
  const eoIn=parseOH(est.eave_overhang!=="None"?est.eave_overhang:0);
  const roofSF=calcRoofSF(w,l,pitch,rs,goIn,eoIn);
  const slopeFactor=Math.sqrt(1+Math.pow(pitch/12,2));
  const lines=[];
  // Pricing lookup: fuzzy match component_name from pricing table
  const pr=pricingData||[];
  function findPrice(name,cat){
    const n=(name||"").toLowerCase();
    // Exact match first
    let m=pr.find(p=>p.component_name&&p.component_name.toLowerCase()===n);
    if(m)return m.price_per_unit||0;
    // Partial match on keywords
    m=pr.find(p=>p.component_name&&p.category===cat&&n.includes(p.component_name.toLowerCase()));
    if(m)return m.price_per_unit||0;
    m=pr.find(p=>p.component_name&&p.component_name.toLowerCase().includes(n.split(" ")[0]));
    if(m)return m.price_per_unit||0;
    return 0
  }
  const add=(cat,name,qty,unit,notes,pd)=>{if(qty>0){const uc=findPrice(name,cat);const q=Math.ceil(qty);lines.push({category:cat,component_name:name,quantity:q,unit:unit||"Each",notes:notes||"",panelDetails:pd||null,unit_cost:uc,extended_cost:Math.round(q*uc*100)/100})}};

  // POSTS
  const pc=calcAdj(est);const postType=est.post_type||"6x6";const postLen=selectPostLength(h);
  add("Posts",`${postType}x${postLen}`,pc.adjusted,"Each",`${pc.adjusted} posts @ ${psp}ft${pc.removed>0?` (${pc.removed} removed for headers)`:""}`);

  // TRUSSES
  const tc=calcTC(l,psp);
  add("Trusses",`${w}' ${rs} ${pitch}:12`,tc,"Each",`${tc} trusses @ ${psp}ft`);

  // HEADERS
  [{s:est.header_truss_left,q:est.header_truss_qty_left||0,lb:"Left"},{s:est.header_truss_right,q:est.header_truss_qty_right||0,lb:"Right"},{s:est.header_truss_center,q:est.header_truss_qty_center||0,lb:"Center"}]
    .forEach(h=>{if(h.s&&h.s!=="None"&&h.q>0)add("Trusses",`${h.s} Header Truss`,h.q,"Each",`Header ${h.lb}`)});

  // ROOF PURLINS (separated from girts)
  const purlinType=est.roof_purlins||"2x6";
  const slopeRun=rs==="Gable"?w/2:w;const slopes=rs==="Gable"?2:1;
  const purlinRows=Math.ceil(slopeRun/2)*slopes;
  const totalBays=l>0&&psp>0?Math.round(l/psp):0;
  const endB=Math.min(totalBays,2),intB=Math.max(totalBays-2,0);
  const endBSp=psp+2;
  if(intB>0)add("Lumber",`${purlinType}x${psp}`,Math.ceil(intB*purlinRows*1.05),"Each",`Roof purlins: ${intB} int bays × ${purlinRows} rows`);
  if(endB>0)add("Lumber",`${purlinType}x${endBSp}`,Math.ceil(endB*purlinRows*1.05),"Each",`Roof purlins: ${endB} end bays × ${purlinRows} rows`);

  // ROOF PANELS with panel details
  const rpt=est.roof_panel_type||"";
  if(rpt&&rpt!=="None"){
    const variant=(est.roof_color||"").toLowerCase()==="galvalume"?"Galvalume":"Color";
    const eoFt=eoIn/12;
    const halfRun=(rs==="Gable"?(w/2)+eoFt:w+eoFt);
    const panelLenFt=Math.round(halfRun*slopeFactor*100)/100;
    const pd=calcPanelDetails(Math.ceil(roofSF),panelLenFt);
    add("Roof Panels",`${rpt} ${est.roof_panel_gauge||"29ga"} ${variant}`,Math.ceil(roofSF),"SF",`Roof: ${roofSF} SF`,pd);
  }

  // SCREWS
  if(rpt&&rpt!=="None"){
    const pIntQ=intB*purlinRows,pEndQ=endB*purlinRows;
    const rLF=(pIntQ*psp)+(pEndQ*endBSp);const bc=pIntQ+pEndQ;
    const ts=Math.ceil((rLF/3)*5+bc*4);const bags=Math.ceil(ts/250)+1;
    add("Roof Panels",est.roof_screws||"Roof Screws",bags,"Bag",`${ts} screws → ${bags} bags`);
  }

  // SHEATHING
  if(est.roof_sheathing&&est.roof_sheathing!=="none")add("Lumber",est.roof_sheathing,Math.ceil(roofSF/32),"Sheet",`${Math.round(roofSF)} SF`);

  // RIDGE CAP
  if(rs==="Gable"&&rpt&&rpt!=="None"){const goFt=goIn/12;add("Trim","Ridge Cap 10'",Math.ceil((l+goFt*2)/10),"Each",`EffLen=${(l+goFt*2).toFixed(1)}ft`)}

  // WALL PANELS with panel details
  if(isEncl&&est.siding_type&&est.siding_type!=="None"){
    const wv=(est.wall_color||"").toLowerCase()==="galvalume"?"Galvalume":"Color";
    // Eave walls
    const ewSF=l*h*2;const ewPanelLen=h+(1/12);
    const ewPD=calcPanelDetails(Math.ceil(ewSF),ewPanelLen);
    add("Wall Panels",`${est.siding_type} ${est.gauge||"29ga"} ${wv} (Eave)`,Math.ceil(ewSF),"SF",`Eave walls: ${Math.round(ewSF)} SF`,ewPD);
    // Gable walls
    const pf=pitch/12;const gR=(w/2)*pf;const gwSF=Math.ceil(((w*h)+(w*gR/2))*2);
    const gwMaxLen=h+gR+(1/12);
    const gwPD=calcPanelDetails(gwSF,gwMaxLen);
    add("Wall Panels",`${est.siding_type} ${est.gauge||"29ga"} ${wv} (Gable)`,gwSF,"SF",`Gable walls: ${gwSF} SF`,gwPD);
  }

  // OPENINGS
  if(isEncl){
    if((est.entry_door_qty||0)>0)add("Openings",`Entry Door ${est.entry_door_size||"3x6-8"}`,est.entry_door_qty,"Each","");
    if((est.window_qty||0)>0)add("Openings",`Window ${est.window_size||"3030"}`,est.window_qty,"Each","");
    let rus=[];try{rus=JSON.parse(est.rollup_doors||'[]')}catch{}
    if(rus.length===0&&(est.rollup_door_qty||0)>0)rus=[{size:est.rollup_door_size,qty:est.rollup_door_qty}];
    rus.forEach(d=>{if(d.qty>0)add("Openings",`Roll-Up Door ${d.size}`,d.qty,"Each","")});
  }

  // WALL FRAMING
  if(isEncl){
    const ft=est.framing_type||"T-Framed";const per=2*(w+l);const pf=pitch/12;const gR=(w/2)*pf;
    if(ft==="T-Framed"){
      const swR=Math.ceil(h/3),bays=Math.ceil(l/psp);
      add("Wall Framing",`2x6x${psp} (SW Girts)`,Math.ceil(swR*bays*2*1.05),"Each",`${swR}×${bays}×2 walls`);
      const gPC=Math.ceil(w/psp)+1,gB=gPC-1,belR=Math.ceil(h/3);
      let abG=0;for(let r=1;r<=Math.ceil(gR/3);r++){const rh=r*3;if(rh>gR)break;const red=pf>0?(rh*2)/pf:0;const rw=Math.max(0,w-red);if(rw<=0)break;abG+=Math.ceil(rw/psp)*2}
      add("Wall Framing",`2x6x${psp} (Gable Girts)`,Math.ceil((belR*gB*2+abG)*1.05),"Each",`Below:${belR}×${gB}×2 + Above:${abG}`);
      add("Wall Framing","2x6x12 (Top Plate SYP)",Math.ceil(Math.ceil(per/12)*1.05),"Each",`${per}ft`);
      add("Wall Framing","2x6x12PT (Bottom Plate)",Math.ceil(Math.ceil(per/12)*1.05),"Each",`${per}ft PT`);
      const totBr=swR*bays*2+(belR*gB*2+abG);
      add("Wall Framing","2x6x12 (Bookshelf Bracing)",Math.ceil(Math.ceil(totBr/10)*1.1),"Each",`${totBr} braces`);
    }else{
      const eS=Math.ceil(l/2)*2,gS=Math.ceil(w/2)*2;
      let oS=(est.window_qty||0)*4+(est.entry_door_qty||0)*4;
      let rd=[];try{rd=JSON.parse(est.rollup_doors||'[]')}catch{}
      if(rd.length===0&&(est.rollup_door_qty||0)>0)rd=[{qty:est.rollup_door_qty}];
      oS+=rd.reduce((s,d)=>s+(d.qty||0)*10,0);
      add("Wall Framing",`2x6x${Math.ceil(h)} (Studs)`,eS+gS+oS,"Each",`@ 24" O.C.: E${eS}+G${gS}+O${oS}`);
      const gR2=Math.ceil(h/3),eB=Math.ceil(l/psp);
      add("Wall Framing",`2x6x${psp} (Eave Girts)`,gR2*eB*2,"Each",`${gR2}×${eB}×2 walls`);
      add("Wall Framing","2x6x12 (Top Plate SYP)",Math.ceil(per/12),"Each",`${per}ft`);
      add("Wall Framing","2x6x12PT (Bottom Plate)",Math.ceil(per/12),"Each",`${per}ft PT`);
    }
  }

  // TRIM with colors
  if(rpt&&rpt!=="None"){
    if(est.rake_trim&&rs==="Gable"){
      const eo=eoIn/12;const sf2=Math.sqrt(1+Math.pow(pitch/12,2));const wLF=(w*2+eo*2)*sf2;
      add("Trim",`Rake Trim 10' ${est.rake_trim_color?`(${est.rake_trim_color})`:""}`,Math.ceil(wLF/10),"Each",`${wLF.toFixed(1)} LF`);
    }
    if(est.fascia_trim){
      const go=goIn/12,eo=eoIn/12;const sf2=Math.sqrt(1+Math.pow(pitch/12,2));
      const tLF=(l*2+go*2)+(w*2+eo*2)*sf2;
      add("Trim",`Fascia Trim 10' ${est.fascia_trim_color?`(${est.fascia_trim_color})`:""}`,Math.ceil(tLF/10),"Each",`${tLF.toFixed(1)} LF`);
    }
    if(est.drip_edge_trim){
      const go=goIn/12;const tLF=(l+go*2)*2;
      add("Trim",`Drip Edge 10' ${est.drip_edge_trim_color?`(${est.drip_edge_trim_color})`:""}`,Math.ceil(tLF/10),"Each",`${tLF.toFixed(1)} LF`);
    }
  }

  // FASCIA BOARD
  if(rs==="Gable"){
    const goFt=goIn>0?goIn/12:1.5;const hr=(w/2)+goFt;const tLF=hr*slopeFactor*4;
    const boards=Math.ceil(tLF/14);
    add("Lumber","1x6x14PT Fascia",boards%2!==0?boards+1:boards,"Each",`${tLF.toFixed(1)} LF rake`);
  }

  // GABLE DRESS KIT — per-side drop heights from top of post
  if(est.gable_dress_kit&&est.gable_dress_panel_type&&est.gable_dress_panel_type!=="None"){
    const gdQty=est.gable_dress_qty||2;
    const gdDropFront=(est.gable_dress_drop_front||20)/12; // inches → feet
    const gdDropRear=(est.gable_dress_drop_rear||20)/12;
    const gdRise=(w/2)*(pitch/12);
    const gdVar=(est.gable_dress_panel_color||"").toLowerCase()==="galvalume"?"Galvalume":"Color";
    // Calculate SF per end using its own drop height
    const frontTriSF=(w*gdRise)/2;const frontBandSF=w*gdDropFront;const frontEndSF=frontTriSF+frontBandSF;
    const rearTriSF=(w*gdRise)/2;const rearBandSF=w*gdDropRear;const rearEndSF=rearTriSF+rearBandSF;
    let gdTotalSF=0;
    if(gdQty>=1)gdTotalSF+=frontEndSF;
    if(gdQty>=2)gdTotalSF+=rearEndSF;
    gdTotalSF=Math.round(gdTotalSF*100)/100;
    // Panel length = max of front/rear (rise + drop) for ordering
    const frontPanelLen=gdRise+gdDropFront;const rearPanelLen=gdRise+gdDropRear;
    const gdMaxPanelLen=Math.round(Math.max(frontPanelLen,rearPanelLen)*100)/100;
    const gdPD=calcPanelDetails(gdTotalSF,gdMaxPanelLen);
    const dropNote=gdQty>=2?`Front:${(gdDropFront*12).toFixed(0)}" Rear:${(gdDropRear*12).toFixed(0)}"`:`Drop:${(gdDropFront*12).toFixed(0)}"`;
    add("Gable Dress Kit",`${est.gable_dress_panel_type} ${est.gable_dress_panel_gauge||"29ga"} ${gdVar}`,Math.ceil(gdTotalSF),"SF",`${gdQty} end(s) | ${dropNote} | Front:${frontEndSF.toFixed(0)}SF${gdQty>=2?` Rear:${rearEndSF.toFixed(0)}SF`:""}`,gdPD);
    // J-Trim
    if(est.gable_dress_jtrim_color){
      const sf2=Math.sqrt(1+Math.pow(pitch/12,2));
      add("Gable Dress Kit",`J-Trim 10' (${est.gable_dress_jtrim_color})`,Math.ceil(w*sf2*gdQty/10),"Each",`${(w*sf2).toFixed(1)} LF/end × ${gdQty}`);
    }
    // Corner Trim
    if(est.gable_dress_corner_trim_color)add("Gable Dress Kit",`Corner Trim 10' (${est.gable_dress_corner_trim_color})`,1,"Each","1 pc");
    // Lumber — use average drop for framing estimate
    const avgDrop=(gdDropFront+(gdQty>=2?gdDropRear:gdDropFront))/Math.min(gdQty,2);
    const sf3=Math.sqrt(1+Math.pow(pitch/12,2));const slopeLenFt=(w/2)*sf3;
    const dLegCount=Math.ceil(w/2)+1;const dLegAvg=gdRise+avgDrop;
    const faceRuns=w>=40?3:2;const tLF2=(dLegCount*dLegAvg+(slopeLenFt*2)*faceRuns)*gdQty;
    add("Gable Dress Kit","2x6x12 (GD Framing)",Math.ceil(Math.ceil(tLF2/12)*1.05),"Each",`DLegs:${dLegCount}×${gdQty}, FRuns:${faceRuns}, AvgDrop:${(avgDrop*12).toFixed(0)}"`);
    // Screws
    const gdScr=Math.ceil(gdTotalSF*1.5);const gdBags=Math.ceil(gdScr/250)+1;
    add("Gable Dress Kit",est.roof_screws||"Roof Screws",gdBags,"Bag",`${gdScr} screws`);
  }

  // APRON DRESS KIT — per-side drop heights from top of post
  if(est.apron_dress_kit&&est.apron_dress_panel_type&&est.apron_dress_panel_type!=="None"){
    const adQty=est.apron_dress_qty||2;
    const adDropLeft=(est.apron_dress_drop_left||20)/12; // inches → feet
    const adDropRight=(est.apron_dress_drop_right||20)/12;
    // Calculate SF per side using its own drop height
    const leftSF=l*adDropLeft;const rightSF=l*adDropRight;
    let adTotalSF=0;
    if(adQty>=1)adTotalSF+=leftSF;
    if(adQty>=2)adTotalSF+=rightSF;
    adTotalSF=Math.round(adTotalSF*100)/100;
    // Panel length = max drop height for ordering
    const adMaxDrop=Math.max(adDropLeft,adQty>=2?adDropRight:adDropLeft);
    const adPanelLen=Math.round(adMaxDrop*100)/100;
    const adPD=calcPanelDetails(adTotalSF,adPanelLen);
    const adVar=(est.apron_dress_panel_color||"").toLowerCase()==="galvalume"?"Galvalume":"Color";
    const adDropNote=adQty>=2?`Left:${(adDropLeft*12).toFixed(0)}" Right:${(adDropRight*12).toFixed(0)}"`:`Drop:${(adDropLeft*12).toFixed(0)}"`;
    add("Apron Dress Kit",`${est.apron_dress_panel_type} ${est.apron_dress_panel_gauge||"29ga"} ${adVar}`,Math.ceil(adTotalSF),"SF",`${adQty} side(s) | ${adDropNote} | ${l}ft length${adQty>=2?` | L:${leftSF.toFixed(0)}SF R:${rightSF.toFixed(0)}SF`:""}`,adPD);
    if(est.apron_dress_jtrim_color)add("Apron Dress Kit",`J-Trim 10' (${est.apron_dress_jtrim_color})`,Math.ceil(l*adQty/10),"Each",`${l*adQty} LF`);
    if(est.apron_dress_corner_trim_color)add("Apron Dress Kit",`Corner Trim 10' (${est.apron_dress_corner_trim_color})`,1,"Each","1 pc");
    // Lumber — use average drop for framing
    const avgAdDrop=(adDropLeft+(adQty>=2?adDropRight:adDropLeft))/Math.min(adQty,2);
    const adRows=Math.max(2,Math.ceil(avgAdDrop/2)+1);const adLF=l*adQty*adRows;
    add("Apron Dress Kit","2x6x12 (Apron Framing)",Math.ceil(Math.ceil(adLF/12)*1.05),"Each",`${adRows} rows × ${l*adQty}ft, AvgDrop:${(avgAdDrop*12).toFixed(0)}"`);
    const adScr=Math.ceil(adTotalSF*1.5);const adBags=Math.ceil(adScr/250)+1;
    add("Apron Dress Kit",est.roof_screws||"Roof Screws",adBags,"Bag",`${adScr} screws`);
  }

  // CONCRETE — BAGGED (Post Footings)
  const conc=calcConcBags(pc.adjusted,w,bClass);
  if(bClass==="Permitted"){
    add("Concrete",`Concrete 80lb Bag (${conc.mode})`,conc.bags,"Each",`${pc.adjusted} posts × ${conc.bagsPerPost} bags/post (Permitted — 18 bags per post)`);
  }else{
    add("Concrete",`Concrete 80lb Bag (${conc.mode})`,conc.bags,"Each",`${pc.adjusted} posts × ${conc.bagsPerPost} bags/post (${conc.lbsPerPost}lbs, ${conc.dia}" dia × ${conc.depth}" deep)`);
  }
  if(est.concrete_slab==="Included"){const sf2=est.concrete_slab_sqft||(w*l);add("Concrete","Concrete Slab",Math.ceil(sf2*((est.concrete_thickness||4)/12)/27),"CY",`${w}×${l}, ${est.concrete_thickness||4}in`)}

  // HARDWARE
  const is8=postType.includes("8x8");const peakB=w>=32?4:3;
  add("Hardware",is8?'1/2"x10" Carriage Bolts':'1/2"x7" Carriage Bolts',pc.adjusted*3+1,"Each",`${pc.adjusted}×3`);
  add("Hardware",'1/2" Zinc Washers',pc.adjusted*3+1,"Each","");
  add("Hardware",'1/2" Zinc Hex Nuts',pc.adjusted*3+1,"Each","");
  add("Hardware",'16" #5 Rebar',pc.adjusted*2+1,"Each",`${pc.adjusted}×2`);
  add("Hardware",`5/8"x1.5" Hex Bolts`,tc*peakB+1,"Each",`${tc}×${peakB} peak`);
  add("Hardware",'5/8" Zinc Washers',tc*peakB+1,"Each","");
  add("Hardware",'5/8" Hex Nuts',tc*peakB+1,"Each","");

  // LEAN-TO
  if(est.lean_to_enabled&&est.lean_to_enabled!=="None"){
    const ltS=est.lean_to_enabled==="Both Sides"?2:1;
    const ltW=est.lean_to_width||10,ltL=est.lean_to_length||l,ltPSp=psp;
    const ltPT=est.lean_to_post_type||(ltW>=21?"8x8":"6x6");
    const ltPC=(Math.ceil(ltL/ltPSp)+1)*ltS;const ltTC=ltPC;
    add("Lean-To",`${ltPT}x${selectPostLength(h)} Posts`,ltPC,"Each",`${ltS} side(s), ${ltPSp}ft`);
    add("Lean-To",`${ltW}' SS 1:12 Truss`,ltTC,"Each",`${ltS} side(s)`);
    // LT Purlins
    const ltPR=Math.ceil(ltW/2);const ltTB=ltPSp>0?Math.round(ltL/ltPSp):0;
    const ltEB=Math.min(ltTB,2),ltIB=Math.max(ltTB-2,0);
    if(ltIB>0)add("Lean-To",`${est.lean_to_purlins||"2x6"}x${ltPSp} Purlins`,Math.ceil(ltIB*ltPR*ltS*1.05),"Each",`${ltIB} int × ${ltPR} rows`);
    if(ltEB>0)add("Lean-To",`${est.lean_to_purlins||"2x6"}x${ltPSp+2} Purlins`,Math.ceil(ltEB*ltPR*ltS*1.05),"Each",`${ltEB} end × ${ltPR} rows`);
    // LT Panels
    if(est.lean_to_panel_type&&est.lean_to_panel_type!=="None"){
      const ltSF2=Math.sqrt(1+Math.pow(1/12,2));
      const ltGO=1.5,ltEO=1.0;
      const ltEffL=ltL+ltGO*2,ltEffW=ltW+ltEO;
      const ltPanelSF=Math.round(ltEffL*ltEffW*ltSF2*ltS*100)/100;
      const ltPanelLen=Math.round((ltW+1)*ltSF2*100)/100;
      const ltPD=calcPanelDetails(ltPanelSF,ltPanelLen);
      const ltVar=(est.lean_to_panel_color||"").toLowerCase()==="galvalume"?"Galvalume":"Color";
      add("Lean-To",`${est.lean_to_panel_type} ${est.lean_to_panel_gauge||"29ga"} ${ltVar}`,Math.ceil(ltPanelSF),"SF",`LT Roof: ${ltPanelSF} SF`,ltPD);
    }
    // LT Trim
    if(est.lean_to_rake_trim){
      const ltEffL=ltL+3;// 18" each end
      add("Lean-To",`Rake Trim 10' ${est.lean_to_trim_color?`(${est.lean_to_trim_color})`:""}`,Math.ceil(ltEffL*ltS/10),"Each",`${(ltEffL*ltS).toFixed(0)} LF`);
    }
    if(est.lean_to_fascia_trim){
      add("Lean-To",`Fascia Trim 10' ${est.lean_to_trim_color?`(${est.lean_to_trim_color})`:""}`,Math.ceil(ltL*ltS/10),"Each",`${ltL*ltS} LF`);
    }
    if(est.lean_to_drip_edge){
      const ltEffL2=ltL+3;
      add("Lean-To",`Drip Edge 10' ${est.lean_to_trim_color?`(${est.lean_to_trim_color})`:""}`,Math.ceil(ltEffL2*ltS/10),"Each",`${(ltEffL2*ltS).toFixed(0)} LF`);
    }
    // LT Concrete
    const ltConc=calcLTConcBags(ltPC,ltW,bClass);
    if(bClass==="Permitted"){
      add("Lean-To",`Concrete 80lb Bag (${ltConc.mode})`,ltConc.bags,"Each",`${ltPC} LT posts × ${ltConc.bagsPerPost} bags/post (Permitted)`);
    }else{
      add("Lean-To",`Concrete 80lb Bag (${ltConc.mode})`,ltConc.bags,"Each",`${ltPC} LT posts × ${ltConc.bagsPerPost} bags/post (${ltConc.lbsPerPost}lbs)`);
    }
    // LT Hardware
    add("Lean-To",'1/2" Carriage Bolts (LT)',ltTC*3+1,"Each",`${ltTC}×3`);
    add("Lean-To",'16" #5 Rebar (LT)',ltPC*2+1,"Each",`${ltPC}×2`);
  }

  return lines;
}