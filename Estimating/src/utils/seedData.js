import { LS_KEYS, lsGet, lsSet, genId } from "./dataStore.jsx";

export const SEED_PRICING=[
  // TRUSSES
  {component_name:"16' Gable 4:12 1\"x1.5\" Chords",category:"Trusses",unit:"Each",price_per_unit:160,panel_type:"",gauge:"",finish_variant:""},
  {component_name:"20' Gable 4:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:200},
  {component_name:"24' Gable 4:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:240},
  {component_name:"26' Gable 4:12 1.5\"x1/8\" Chords",category:"Trusses",unit:"Each",price_per_unit:260},
  {component_name:"28' Gable 4:12 1.5\"x1/8\" Chords",category:"Trusses",unit:"Each",price_per_unit:280},
  {component_name:"30' Gable 4:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:350},
  {component_name:"36' Gable 3:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:415},
  {component_name:"40' Gable 3:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:460},
  {component_name:"50' Gable 3:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:650},
  {component_name:"10' Lean-to 1:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:110},
  {component_name:"12' Lean-to 1:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:135},
  {component_name:"14' Lean-to 1:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:155},
  {component_name:"16' Lean-to 1:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:175},
  {component_name:"18' Lean-to 1:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:200},
  {component_name:"20' Lean-to 1:12 2x3/16\" Chords",category:"Trusses",unit:"Each",price_per_unit:220},
  {component_name:"24' Lean-to 1:12 2x1/4\" Chords",category:"Trusses",unit:"Each",price_per_unit:285},
  // POSTS
  {component_name:"6x6x16",category:"Posts",unit:"Each",price_per_unit:42.38},
  {component_name:"6x6x18",category:"Posts",unit:"Each",price_per_unit:52.27},
  {component_name:"6x6x20",category:"Posts",unit:"Each",price_per_unit:61.10},
  {component_name:"6x6x24",category:"Posts",unit:"Each",price_per_unit:0},
  {component_name:"8x8x16",category:"Posts",unit:"Each",price_per_unit:93.13},
  {component_name:"8x8x18",category:"Posts",unit:"Each",price_per_unit:110.40},
  {component_name:"8x8x20",category:"Posts",unit:"Each",price_per_unit:134.08},
  {component_name:"8x8x24",category:"Posts",unit:"Each",price_per_unit:0},
  // PANELS
  {component_name:"Ultra Rib 29ga Galvalume",category:"Panels",unit:"SF",price_per_unit:0.66,panel_type:"Ultrarib Panel",gauge:"29ga",finish_variant:"Galvalume"},
  {component_name:"Ultra Rib 29ga Color",category:"Panels",unit:"SF",price_per_unit:0.91,panel_type:"Ultrarib Panel",gauge:"29ga",finish_variant:"Color"},
  {component_name:"Ultra Rib 26ga Galvalume",category:"Panels",unit:"SF",price_per_unit:0.79,panel_type:"Ultrarib Panel",gauge:"26ga",finish_variant:"Galvalume"},
  {component_name:"Ultra Rib 26ga Color",category:"Panels",unit:"SF",price_per_unit:1.16,panel_type:"Ultrarib Panel",gauge:"26ga",finish_variant:"Color"},
  {component_name:"PBR 26ga Galvalume",category:"Panels",unit:"SF",price_per_unit:0.79,panel_type:"PRB Panel",gauge:"26ga",finish_variant:"Galvalume"},
  {component_name:"PBR 26ga Color",category:"Panels",unit:"SF",price_per_unit:1.16,panel_type:"PRB Panel",gauge:"26ga",finish_variant:"Color"},
  // LUMBER
  {component_name:"#1 2x6x10 SYP",category:"Lumber",unit:"Each",price_per_unit:5.95},
  {component_name:"#1 2x6x12 SYP",category:"Lumber",unit:"Each",price_per_unit:7.10},
  {component_name:"#1 2x6x14 SYP",category:"Lumber",unit:"Each",price_per_unit:8.25},
  {component_name:"1x6x12PT Fascia",category:"Lumber",unit:"Each",price_per_unit:9.64},
  {component_name:"1x6x10 PT",category:"Lumber",unit:"Each",price_per_unit:0},
  {component_name:"2x8x10 PT",category:"Lumber",unit:"Each",price_per_unit:0},
  {component_name:"2x8x12 PT",category:"Lumber",unit:"Each",price_per_unit:0},
  {component_name:"2x8x14 PT",category:"Lumber",unit:"Each",price_per_unit:0},
  // TRIM — Ridge Cap
  {component_name:"29ga Galvalume Ridge Cap 10'",category:"Trim",unit:"Each",price_per_unit:11.96,gauge:"29ga",finish_variant:"Galvalume"},
  {component_name:"29ga Color Ridge Cap 10'",category:"Trim",unit:"Each",price_per_unit:13.01,gauge:"29ga",finish_variant:"Color"},
  {component_name:"26ga Galvalume Ridge Cap 10'",category:"Trim",unit:"Each",price_per_unit:13.89,gauge:"26ga",finish_variant:"Galvalume"},
  {component_name:"26ga Color Ridge Cap 10'",category:"Trim",unit:"Each",price_per_unit:15.39,gauge:"26ga",finish_variant:"Color"},
  // TRIM — Gable Rake
  {component_name:"29ga Galvalume Gable Rake Trim 2\"-10'",category:"Trim",unit:"Each",price_per_unit:7.90,gauge:"29ga",finish_variant:"Galvalume"},
  {component_name:"29ga Color Gable Rake Trim 2\"-10'",category:"Trim",unit:"Each",price_per_unit:8.82,gauge:"29ga",finish_variant:"Color"},
  {component_name:"26ga Galvalume Gable Rake Trim 2\"-10'",category:"Trim",unit:"Each",price_per_unit:8.60,gauge:"26ga",finish_variant:"Galvalume"},
  {component_name:"26ga Color Gable Rake Trim 2\"-10'",category:"Trim",unit:"Each",price_per_unit:9.86,gauge:"26ga",finish_variant:"Color"},
  // TRIM — Fascia
  {component_name:"29ga Galvalume Fascia Trim",category:"Trim",unit:"Each",price_per_unit:0,gauge:"29ga",finish_variant:"Galvalume"},
  {component_name:"29ga Color Fascia Trim",category:"Trim",unit:"Each",price_per_unit:0,gauge:"29ga",finish_variant:"Color"},
  {component_name:"26ga Galvalume Fascia Trim",category:"Trim",unit:"Each",price_per_unit:0,gauge:"26ga",finish_variant:"Galvalume"},
  {component_name:"26ga Color Fascia Trim",category:"Trim",unit:"Each",price_per_unit:0,gauge:"26ga",finish_variant:"Color"},
  // TRIM — Drip Edge
  {component_name:"29ga Galvalume Drip Edge",category:"Trim",unit:"Each",price_per_unit:6.10,gauge:"29ga",finish_variant:"Galvalume"},
  {component_name:"29ga Color Drip Edge",category:"Trim",unit:"Each",price_per_unit:6.58,gauge:"29ga",finish_variant:"Color"},
  {component_name:"26ga Galvalume Drip Edge",category:"Trim",unit:"Each",price_per_unit:6.82,gauge:"26ga",finish_variant:"Galvalume"},
  {component_name:"26ga Color Drip Edge",category:"Trim",unit:"Each",price_per_unit:8.06,gauge:"26ga",finish_variant:"Color"},
  // TRIM — J-Trim
  {component_name:"29ga Galv J-Trim",category:"Trim",unit:"Each",price_per_unit:6.87,gauge:"29ga",finish_variant:"Galvalume"},
  {component_name:"29ga Color J-Trim",category:"Trim",unit:"Each",price_per_unit:8.67,gauge:"29ga",finish_variant:"Color"},
  {component_name:"26ga Galv J-Trim",category:"Trim",unit:"Each",price_per_unit:7.93,gauge:"26ga",finish_variant:"Galvalume"},
  {component_name:"26ga Color J-Trim",category:"Trim",unit:"Each",price_per_unit:7.33,gauge:"26ga",finish_variant:"Color"},
  // TRIM — Corner Trim
  {component_name:"29ga Galv Corner Trim",category:"Trim",unit:"Each",price_per_unit:13.52,gauge:"29ga",finish_variant:"Galvalume"},
  {component_name:"29ga Color Corner Trim",category:"Trim",unit:"Each",price_per_unit:15.80,gauge:"29ga",finish_variant:"Color"},
  {component_name:"26ga Galv Corner Trim",category:"Trim",unit:"Each",price_per_unit:17.38,gauge:"26ga",finish_variant:"Galvalume"},
  {component_name:"26ga Color Corner Trim",category:"Trim",unit:"Each",price_per_unit:18.40,gauge:"26ga",finish_variant:"Color"},
  // FASTENERS
  {component_name:'1/2" x 7" Galvanized Carriage Bolts',category:"Fasteners",unit:"Each",price_per_unit:0.84},
  {component_name:'1/2" x 10" Galvanized Carriage Bolts',category:"Fasteners",unit:"Each",price_per_unit:1.15},
  {component_name:'5/8" x 2" Galv Hex Bolts',category:"Fasteners",unit:"Each",price_per_unit:0.44},
  {component_name:'1/2" Zinc Washers',category:"Fasteners",unit:"Each",price_per_unit:0.05},
  {component_name:'5/8 Zinc Washers',category:"Fasteners",unit:"Each",price_per_unit:0.05},
  {component_name:'1/2" Zinc Hex Nuts',category:"Fasteners",unit:"Each",price_per_unit:0.12},
  {component_name:'5/8" Hex Nuts',category:"Fasteners",unit:"Each",price_per_unit:0.46},
  {component_name:'16" #5 Rebar',category:"Fasteners",unit:"Each",price_per_unit:1.33},
  {component_name:'1/2" x 7" Lag Bolts Galvanized',category:"Fasteners",unit:"Each",price_per_unit:1.90},
  {component_name:'Woodgrip 1.5" Fasteners',category:"Fasteners",unit:"250ct",price_per_unit:16.52},
  {component_name:'Woodzac 1.5" Fasteners',category:"Fasteners",unit:"250ct",price_per_unit:35.25},
  {component_name:'#10 Pancake 1.5" Fasteners',category:"Fasteners",unit:"250ct",price_per_unit:17.52},
];

// Seed BOM rules from the audited engine
export const SEED_RULES=[
  {rule_name:"Posts",category:"Posts",component_name:"{postType}x{postLength}",applies_when:"Always",quantity_formula:"(ceil(length / postSpacing) + 1) × 2 − headerRemovals",notes:"Adjusted for header truss removals",active:true,priority:1},
  {rule_name:"Roof Trusses",category:"Trusses",component_name:"{width}' {roofStyle} {pitch}:12",applies_when:"Always",quantity_formula:"ceil(length / trussSpacing) + 1",notes:"1 truss per post position",active:true,priority:2},
  {rule_name:"Roof Purlins (Internal)",category:"Lumber",component_name:"{purlinType}x{postSpacing}",applies_when:"internalBays > 0",quantity_formula:"internalBays × purlinRowsPerBay × 1.05",notes:"2x6 SYP @ 24\" O.C., 5% waste",active:true,priority:6},
  {rule_name:"Roof Purlins (End Bay)",category:"Lumber",component_name:"{purlinType}x{postSpacing+2}",applies_when:"endBays > 0",quantity_formula:"endBays × purlinRowsPerBay × 1.05",notes:"End bays use longer boards for overhang framing",active:true,priority:6},
  {rule_name:"Roof Panels",category:"Panels",component_name:"{panelType} {gauge} {variant}",applies_when:"roofPanelType !== None",quantity_formula:"roofArea (SF with overhangs)",notes:"Panel length = halfRun × slopeFactor",active:true,priority:4},
  {rule_name:"Wall Panels (Eave)",category:"Panels",component_name:"{sidingType} {gauge} {variant}",applies_when:"isEnclosed",quantity_formula:"length × eaveHeight × 2",notes:"Panel length = eaveHeight + 1\"",active:true,priority:8},
  {rule_name:"Wall Panels (Gable)",category:"Panels",component_name:"{sidingType} {gauge} {variant}",applies_when:"isEnclosed",quantity_formula:"(width × height + width × gableRise / 2) × 2",notes:"Max panel length = height + gableRise + 1\"",active:true,priority:8},
  {rule_name:"Truss Peak Hardware",category:"Fasteners",component_name:"5/8\" Hex Bolts",applies_when:"Always",quantity_formula:"trussCount × (width ≥ 32 ? 4 : 3)",notes:"Per Ceed Civil truss detail tables",active:true,priority:22},
  {rule_name:"Post Carriage Bolts",category:"Fasteners",component_name:"1/2\" Carriage Bolts",applies_when:"Always",quantity_formula:"postCount × 3",notes:"3 per truss-to-post connection",active:true,priority:21},
  {rule_name:"Concrete (Agricultural)",category:"Concrete",component_name:"80lb Bag",applies_when:"buildingClass === Agricultural",quantity_formula:"postCount × bagsPerPost (4/6/8 by width)",notes:"DIY: 10-24'→4bags, 25-36'→6bags, 37-50'→8bags",active:true,priority:19},
  {rule_name:"Concrete (Permitted)",category:"Concrete",component_name:"80lb Bag",applies_when:"buildingClass === Permitted",quantity_formula:"postCount × 18",notes:"Permitted footing spec: 18 bags per post",active:true,priority:19},
  {rule_name:"Bookshelf Bracing",category:"Lumber",component_name:"2x6x12 SYP",applies_when:"isEnclosed && framingType === T-Framed",quantity_formula:"totalBraces / 10 × 1.10",notes:"1 brace per girt per bay, 10 cuts per board",active:true,priority:10},
  {rule_name:"Wall Studs",category:"Lumber",component_name:"2x6x{eaveHeight}",applies_when:"isEnclosed && framingType === Stud Framed",quantity_formula:"eaveStuds + gableStuds + openingStuds",notes:"24\" O.C. + 4 per window/entry, 10 per roll-up",active:true,priority:10},
  {rule_name:"Fascia Board",category:"Lumber",component_name:"1x6x14PT Fascia",applies_when:"roofStyle === Gable",quantity_formula:"ceil(totalRakeLF / 14), rounded to even",notes:"14ft boards per DIY plans",active:true,priority:12},
];

// Derive components from pricing (unique product catalog)
export const SEED_COMPONENTS=SEED_PRICING.map(p=>({name:p.component_name,category:p.category,unit:p.unit,description:"",active:true}));

// Initialize localStorage with seed data if empty
export function initSeedData(){
  if(lsGet(LS_KEYS.pricing).length===0){
    lsSet(LS_KEYS.pricing,SEED_PRICING.map(p=>({...p,id:genId(),supplier:"",sku:"",effective_date:"2026-03-13",created:new Date().toISOString()})));
  }
  if(lsGet(LS_KEYS.components).length===0){
    lsSet(LS_KEYS.components,SEED_COMPONENTS.map(c=>({...c,id:genId(),created:new Date().toISOString()})));
  }
  if(lsGet(LS_KEYS.rules).length===0){
    lsSet(LS_KEYS.rules,SEED_RULES.map(r=>({...r,id:genId(),created:new Date().toISOString()})));
  }
}
initSeedData();
