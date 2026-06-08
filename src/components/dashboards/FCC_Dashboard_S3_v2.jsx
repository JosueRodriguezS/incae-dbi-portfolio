import { useState } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ReferenceLine, ReferenceArea, ResponsiveContainer } from "recharts";

const C = {
  blue:"#1A8FD1", orange:"#E69F00", sky:"#56B4E9", teal:"#009E8A",
  amber:"#F0C040", verm:"#D55E00", purple:"#CC79A7", gray:"#8FA0AF",
  bg:"#0B1520", card:"#111D2C", text:"#E2E8F0", muted:"#7E93A7", dim:"#3D526A",
  grid:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.08)",
  inv:"#8FA0AF", cons:"#56B4E9", mig:"#1A8FD1", opt:"#003D70",
};

const TS = [
  {p:"2013-Q3",ph:"inv", eng:2.45,res:8.83,sent:1.83,lead:2.32,tran:2.97,comm:2.77,itOm:84.3,train:0.33,tool:2.28,ca:3.6, intra:0,   scrum:0,   feed:9.1, ideas:0.07,col:2.67,read:2.23},
  {p:"2013-Q4",ph:"inv", eng:2.96,res:8.24,sent:2.04,lead:3.11,tran:3.58,comm:3.24,itOm:85.5,train:0.40,tool:2.62,ca:3.6, intra:0,   scrum:7.3, feed:16.4,ideas:0.07,col:2.91,read:2.70},
  {p:"2014-Q1",ph:"cons",eng:3.34,res:7.93,sent:3.98,lead:4.33,tran:3.89,comm:3.51,itOm:80.2,train:1.95,tool:3.35,ca:5.5, intra:14.5,scrum:21.8,feed:21.8,ideas:0.22,col:3.29,read:3.06},
  {p:"2014-Q2",ph:"cons",eng:3.99,res:7.60,sent:5.04,lead:5.37,tran:4.01,comm:3.90,itOm:79.1,train:2.33,tool:3.62,ca:10.9,intra:5.5, scrum:14.5,feed:34.5,ideas:0.16,col:3.62,read:3.45},
  {p:"2014-Q3",ph:"mig", eng:4.28,res:7.24,sent:5.22,lead:5.61,tran:4.54,comm:4.36,itOm:63.6,train:3.80,tool:3.69,ca:14.5,intra:16.4,scrum:20.0,feed:25.5,ideas:0.35,col:4.11,read:3.86},
  {p:"2014-Q4",ph:"mig", eng:4.82,res:6.68,sent:6.11,lead:6.06,tran:5.00,comm:4.64,itOm:64.6,train:4.27,tool:4.53,ca:16.4,intra:16.4,scrum:27.3,feed:47.3,ideas:0.56,col:4.46,read:4.32},
  {p:"2015-Q1",ph:"mig", eng:5.45,res:6.33,sent:6.61,lead:6.46,tran:5.63,comm:5.05,itOm:66.2,train:5.27,tool:4.89,ca:18.2,intra:12.7,scrum:25.5,feed:36.4,ideas:1.27,col:5.08,read:4.69},
  {p:"2015-Q2",ph:"mig", eng:5.73,res:5.95,sent:6.75,lead:6.54,tran:5.88,comm:5.37,itOm:63.5,train:5.22,tool:5.75,ca:20.0,intra:20.0,scrum:30.9,feed:49.1,ideas:1.27,col:5.14,read:5.01},
  {p:"2015-Q3",ph:"mig", eng:6.12,res:5.70,sent:7.43,lead:7.05,tran:6.15,comm:5.81,itOm:48.5,train:5.98,tool:5.80,ca:27.3,intra:23.6,scrum:36.4,feed:45.5,ideas:1.26,col:5.74,read:5.31},
  {p:"2015-Q4",ph:"mig", eng:6.58,res:4.77,sent:7.91,lead:7.52,tran:6.74,comm:6.40,itOm:50.2,train:5.56,tool:6.09,ca:25.5,intra:20.0,scrum:43.6,feed:50.9,ideas:1.26,col:6.01,read:6.21},
  {p:"2016-Q1",ph:"opt", eng:6.95,res:4.59,sent:8.21,lead:7.66,tran:7.25,comm:6.51,itOm:45.2,train:5.60,tool:6.79,ca:29.1,intra:18.2,scrum:49.1,feed:61.8,ideas:1.07,col:6.54,read:6.36},
];

const AGG = [
  {name:"Inventario",  key:"inv",  ca:3.6, intra:0,   scrum:3.6, feed:12.8,train:0.37,tool:2.45},
  {name:"Consolidación",key:"cons",ca:8.2, intra:10.0,scrum:18.2,feed:28.2,train:2.14,tool:3.49},
  {name:"Migración",   key:"mig",  ca:20.3,intra:18.2,scrum:30.6,feed:42.4,train:5.02,tool:5.12},
  {name:"Optimización",key:"opt",  ca:29.1,intra:18.2,scrum:49.1,feed:61.8,train:5.60,tool:6.79},
];

const RDL = [{m:"Liderazgo",bl:2.32,fi:7.66},{m:"Transparencia",bl:2.97,fi:7.25},{m:"Comunicación",bl:2.77,fi:6.51},{m:"Preparación",bl:2.23,fi:6.36},{m:"Colaboración",bl:2.67,fi:6.54}];

const PM = {
  inv: {label:"Inventario",   c:C.inv,  bg:"rgba(143,160,175,0.08)"},
  cons:{label:"Consolidación",c:C.cons, bg:"rgba(86,180,233,0.07)"},
  mig: {label:"Migración",    c:C.mig,  bg:"rgba(26,143,209,0.07)"},
  opt: {label:"Optimización", c:C.opt,  bg:"rgba(0,61,112,0.12)"},
};

const TABS = [
  {id:"overview",label:"Resumen General"},
  {id:"c1",label:"C-1 · Cultura & Agentes"},
  {id:"c2",label:"C-2 · Compromiso & Cambio"},
  {id:"c3",label:"C-3 · Liderazgo Digital"},
  {id:"c4",label:"C-4 · Capacidades"},
];

const KPIS = [
  {key:"eng",label:"Compromiso",color:C.blue,u:"/10"},
  {key:"res",label:"Resistencia",color:C.orange,u:"/10"},
  {key:"sent",label:"Sentimiento",color:C.sky,u:"/10"},
  {key:"lead",label:"Liderazgo",color:C.teal,u:"/10"},
  {key:"itOm",label:"IT O&M",color:C.purple,u:"%"},
  {key:"ca",label:"Change Agents",color:C.blue,u:"%"},
  {key:"ideas",label:"Ideas/persona",color:C.amber,u:""},
];

const ax = {tick:{fill:C.muted,fontSize:9},axisLine:{stroke:C.grid},tickLine:false};

const PB = ({p="all"}) => (
  <>
    {[{k:"inv",x1:"2013-Q3",x2:"2013-Q4"},{k:"cons",x1:"2014-Q1",x2:"2014-Q2"},{k:"mig",x1:"2014-Q3",x2:"2015-Q4"},{k:"opt",x1:"2016-Q1",x2:"2016-Q1"}]
      .map(({k,x1,x2}) => (
        <ReferenceArea key={k} x1={x1} x2={x2}
          fill={p==="all"||p===k ? PM[k].bg : "rgba(0,0,0,0.2)"}
          stroke={p===k ? PM[k].c : "none"} strokeWidth={p===k?1:0} strokeOpacity={0.4}
          ifOverflow="extendDomain"/>
      ))}
  </>
);

const mkDot = (color, p="all", sq=false) => ({cx,cy,index}) => {
  const active = p==="all" || TS[index]?.ph===p;
  const r = active ? 4 : 1.5;
  const fill = active ? color : "rgba(148,163,184,0.12)";
  if (sq) return <rect key={index} x={cx-r} y={cy-r} width={r*2} height={r*2} fill={fill}/>;
  return <circle key={index} cx={cx} cy={cy} r={r} fill={fill}/>;
};

const lOp = (p) => p==="all" ? 1 : 0.12;

const PL = ({p="all"}) => (
  <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:6,alignItems:"center"}}>
    <span style={{fontSize:8,color:C.dim}}>FASES:</span>
    {Object.entries(PM).map(([k,m]) => (
      <div key={k} style={{display:"flex",alignItems:"center",gap:4,fontSize:9,color:p==="all"||p===k?m.c:C.dim,opacity:p==="all"||p===k?1:0.35,transition:"all .15s"}}>
        <div style={{width:7,height:7,borderRadius:1,background:p==="all"||p===k?m.c:C.dim}}/>{m.label}
      </div>
    ))}
    {p!=="all" && <span style={{fontSize:9,color:PM[p]?.c,fontWeight:700,background:`${PM[p]?.c}18`,padding:"1px 7px",borderRadius:8}}>● {PM[p]?.label}</span>}
  </div>
);

const cellFill = (key, base, p) => p==="all"||key===p ? base : "rgba(100,116,139,0.15)";

const Tip = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  const notes = {"2014-Q1":"1/3 optimista — caso FCC","2015-Q3":"55h continuas · >80% entusiasmo","2016-Q1":"45.2% O&M · 29.1% change agents"};
  return (
    <div style={{background:"#1A2D42",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",fontSize:11,maxWidth:240,boxShadow:"0 8px 24px rgba(0,0,0,0.5)"}}>
      <div style={{color:C.muted,fontWeight:700,marginBottom:5,fontSize:10}}>{label}</div>
      {payload.map((e,i) => (
        <div key={i} style={{display:"flex",gap:6,alignItems:"center",marginBottom:3}}>
          <div style={{width:7,height:7,borderRadius:1,background:e.stroke||e.color,flexShrink:0}}/>
          <span style={{color:C.muted,flex:1}}>{e.name}</span>
          <strong style={{color:C.text,fontFamily:"monospace"}}>{typeof e.value==="number"?e.value.toFixed(2):e.value}</strong>
        </div>
      ))}
      {notes[label] && <div style={{marginTop:7,paddingTop:7,borderTop:`1px solid ${C.border}`,fontSize:9,color:C.amber}}>💡 {notes[label]}</div>}
    </div>
  );
};

const Card = ({okr,label,value,unit,change,dir,target,tl,accent,pct,changeFmt,statusNote,sub}) => {
  const v = parseFloat(value);
  const ok = dir==="up"?v>=target:v<=target;
  const near = dir==="up"?v>=target*0.9:v<=target*1.12;
  const [sc,si,st] = ok?[C.teal,"✓","En objetivo"]:near?[C.amber,"~","Cerca"]:[C.verm,"!","Bajo target"];
  const chg = (dir==="up")===(change>0)?C.teal:C.verm;
  return (
    <div style={{background:C.card,borderRadius:10,padding:"12px 14px",borderTop:`3px solid ${accent}`,minWidth:0}}>
      <div style={{fontSize:9,color:accent,fontWeight:700,letterSpacing:"0.08em",marginBottom:3}}>{okr}</div>
      <div style={{fontSize:11,color:C.muted,marginBottom:6,lineHeight:1.3,minHeight:28}}>{label}</div>
      <div style={{fontFamily:"monospace",fontSize:22,fontWeight:700,color:C.text,lineHeight:1,marginBottom:2}}>
        {value}<span style={{fontSize:11,color:C.muted,fontWeight:400,marginLeft:2}}>{unit}</span>
      </div>
      {changeFmt
        ? <div style={{fontSize:10,color:C.teal,marginBottom:6,fontWeight:600}}>{changeFmt}</div>
        : <div style={{fontSize:10,color:chg,marginBottom:6,fontWeight:600}}>{dir==="up"?"↑":"↓"} {Math.abs(change)}% <span style={{color:C.dim,fontWeight:400}}>vs. baseline</span></div>
      }
      <div style={{background:"rgba(255,255,255,0.07)",borderRadius:3,height:3,marginBottom:7,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${Math.min(100,pct)}%`,background:accent,borderRadius:3}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{background:`${sc}22`,color:sc,padding:"2px 6px",borderRadius:8,fontSize:9,fontWeight:700}}>{si} {st}</span>
        <span style={{fontSize:9,color:C.dim}}>{tl}</span>
      </div>
      {statusNote && <div style={{fontSize:9,color:C.amber,marginTop:3,lineHeight:1.4,fontStyle:"italic"}}>{statusNote}</div>}
      {sub && <div style={{fontSize:9,color:C.dim,marginTop:3,lineHeight:1.4}}>{sub}</div>}
    </div>
  );
};

const Panel = ({title,subtitle,children,tag,tagC}) => (
  <div style={{background:C.card,borderRadius:10,padding:"14px 14px 11px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11}}>
      <div style={{flex:1,paddingRight:8}}>
        <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:2,lineHeight:1.3}}>{title}</div>
        {subtitle && <div style={{fontSize:10,color:C.muted,lineHeight:1.5}}>{subtitle}</div>}
      </div>
      {tag && <span style={{background:`${tagC}20`,color:tagC,padding:"2px 8px",borderRadius:10,fontSize:9,fontWeight:700,flexShrink:0}}>{tag}</span>}
    </div>
    {children}
  </div>
);

const Insight = ({icon,accent,text}) => (
  <div style={{background:`${accent}10`,border:`1px solid ${accent}28`,borderRadius:8,padding:"9px 13px",marginBottom:11,display:"flex",gap:9,alignItems:"flex-start"}}>
    <span style={{fontSize:15,flexShrink:0}}>{icon}</span>
    <div style={{fontSize:11,color:`${accent}dd`,lineHeight:1.7}}>{text}</div>
  </div>
);

const Divider = ({label}) => (
  <div style={{display:"flex",alignItems:"center",gap:12,margin:"13px 0 9px"}}>
    <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.07)"}}/>
    {label && <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",color:"rgba(255,255,255,0.2)",flexShrink:0}}>{label}</span>}
    <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.07)"}}/>
  </div>
);

const LegRow = ({items}) => (
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:7}}>
    {items.map(({c,l,dash,sq})=>(
      <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:C.muted}}>
        {dash ? <svg width="14" height="7"><line x1="0" y1="3.5" x2="14" y2="3.5" stroke={c} strokeWidth="2" strokeDasharray="4 2"/></svg>
              : <div style={{width:9,height:9,borderRadius:sq?2:"50%",background:c}}/>}
        {l}
      </div>
    ))}
  </div>
);

const computeIdx = r => {
  const s = [r.eng/10,r.sent/10,(10-r.res)/10,r.lead/10,r.tran/10,r.comm/10,(100-r.itOm)/100,r.ca/100,r.scrum/100,Math.min(r.train/5.6,1),r.tool/10];
  return Math.round(s.reduce((a,b)=>a+b,0)/s.length*100);
};

function TabOverview({phase,kpiKey,setKpiKey}) {
  const last = TS[10];
  const idx = computeIdx(last);
  const idxS = TS.map(r=>({p:r.p,v:computeIdx(r)}));
  const kpi = KPIS.find(k=>k.key===kpiKey)||KPIS[0];
  const kpiData = TS.map(r=>({p:r.p,v:r[kpiKey]}));

  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#0D1B2A,#132540)",borderRadius:10,padding:"16px 20px",marginBottom:11,border:`1px solid ${C.border}`,display:"flex",gap:20,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{flexShrink:0}}>
          <div style={{fontSize:9,color:C.sky,fontWeight:700,letterSpacing:"0.09em",marginBottom:3}}>ÍNDICE CULTURAL COMPUESTO</div>
          <div style={{fontFamily:"monospace",fontSize:52,fontWeight:800,color:C.text,lineHeight:1}}>
            {idx}<span style={{fontSize:18,color:C.muted,fontWeight:400}}>/100</span>
          </div>
          <div style={{fontSize:11,color:C.teal,marginTop:3,fontWeight:600}}>+{idx-computeIdx(TS[0])} pts vs. 2013-Q3</div>
        </div>
        <div style={{flex:1,minWidth:200}}>
          <div style={{fontSize:10,color:C.muted,marginBottom:5}}>11 trimestres · Promedio normalizado de 11 KPIs · 605 observaciones</div>
          <ResponsiveContainer width="100%" height={55}>
            <AreaChart data={idxS} margin={{top:2,right:2,left:2,bottom:2}}>
              <defs><linearGradient id="ig" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.sky} stopOpacity={0.4}/><stop offset="95%" stopColor={C.sky} stopOpacity={0}/></linearGradient></defs>
              <Area dataKey="v" stroke={C.sky} fill="url(#ig)" strokeWidth={2} dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.dim,marginTop:2}}>
            <span>2013-Q3: {computeIdx(TS[0])}</span><span>2015-Q3: {computeIdx(TS[8])}</span><span>2016-Q1: {idx}</span>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,flexShrink:0}}>
          {[{l:"Empleados",v:"55"},{l:"Trimestres",v:"11"},{l:"Obs.",v:"605"},{l:"Variables",v:"34"}].map(({l,v})=>(
            <div key={l} style={{textAlign:"center",background:"rgba(255,255,255,0.04)",borderRadius:6,padding:"5px 10px"}}>
              <div style={{fontFamily:"monospace",fontSize:17,fontWeight:700,color:C.sky}}>{v}</div>
              <div style={{fontSize:9,color:C.muted}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider label="INDICADORES POR OKR — ESTADO ACTUAL 2016-Q1"/>

      {[
        {label:"OKR C-1 · Cultura & Agentes",ac:C.blue,cards:[
          {okr:"C-1.1",label:"Change Agents",value:"29.1",unit:"%",change:708,dir:"up",target:25,tl:"≥25%",pct:100,sub:"Lección L4 del caso FCC"},
          {okr:"C-1.2",label:"Intrapreneurs",value:"18.2",unit:"%",change:0,dir:"up",target:15,tl:"≥15%",pct:100,changeFmt:"↑ +18.2 pp (era 0%)",sub:"Baseline=0 en 2013-Q3"},
          {okr:"C-1.3",label:"Ideas/persona",value:"1.07",unit:"",change:1370,dir:"up",target:1,tl:"≥1 idea",pct:100},
        ]},
        {label:"OKR C-2 · Compromiso & Cambio",ac:C.sky,cards:[
          {okr:"C-2.1",label:"Compromiso empleados",value:"6.95",unit:"/10",change:183,dir:"up",target:7,tl:"≥7.0",pct:69.5,statusNote:"6.947 — tendencia ascendente sostenida 11 trimestres"},
          {okr:"C-2.2",label:"Sentimiento cultural",value:"8.21",unit:"/10",change:349,dir:"up",target:8,tl:"≥8.0",pct:82.1},
          {okr:"C-2.3",label:"Resistencia al cambio",value:"4.59",unit:"/10",change:48,dir:"down",target:5,tl:"≤5.0",pct:90.2},
        ]},
        {label:"OKR C-3 · Liderazgo Digital",ac:C.teal,cards:[
          {okr:"C-3.1",label:"Confianza liderazgo",value:"7.66",unit:"/10",change:230,dir:"up",target:7,tl:"≥7.0",pct:100},
          {okr:"C-3.2",label:"Transparencia percibida",value:"7.25",unit:"/10",change:144,dir:"up",target:7,tl:"≥7.0",pct:100},
          {okr:"C-3.3",label:"Comunicación efectiva",value:"6.51",unit:"/10",change:135,dir:"up",target:6.5,tl:"≥6.5",pct:100},
        ]},
        {label:"OKR C-4 · Capacidades Digitales",ac:C.purple,cards:[
          {okr:"C-4.1",label:"Formación digital",value:"5.60",unit:"hrs",change:1613,dir:"up",target:5,tl:"≥5 hrs",pct:100},
          {okr:"C-4.2",label:"Adopción Scrum",value:"49.1",unit:"%",change:0,dir:"up",target:45,tl:"≥45%",pct:100,changeFmt:"↑ +49.1 pp (era 0%)",sub:"Baseline=0 en 2013-Q3"},
          {okr:"C-4.4",label:"IT O&M Budget",value:"45.2",unit:"%",change:47,dir:"down",target:50,tl:"≤50%",pct:90.4},
        ]},
      ].map(({label,ac,cards},i) => (
        <div key={label}>
          {i>0 && <div style={{height:"1px",background:"rgba(255,255,255,0.06)",margin:"9px 0 11px"}}/>}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7,paddingLeft:2}}>
            <div style={{width:3,height:13,borderRadius:2,background:ac}}/>
            <span style={{fontSize:10,fontWeight:700,color:ac,letterSpacing:"0.07em"}}>{label}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {cards.map(c => <Card key={c.okr} {...c} accent={ac}/>)}
          </div>
        </div>
      ))}

      <Divider label="EXPLORAR KPIs EN EL TIEMPO"/>

      <Panel title="Explorar cualquier KPI en el tiempo" subtitle="Selecciona un indicador · El filtro de fase resalta los trimestres correspondientes">
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:9}}>
          {KPIS.map(k => (
            <button key={k.key} onClick={()=>setKpiKey(k.key)} aria-pressed={kpiKey===k.key}
              style={{padding:"3px 11px",borderRadius:14,fontSize:10,cursor:"pointer",border:`1px solid ${kpiKey===k.key?k.color:C.border}`,background:kpiKey===k.key?`${k.color}20`:"transparent",color:kpiKey===k.key?k.color:C.muted,fontWeight:kpiKey===k.key?700:400,fontFamily:"inherit",transition:"all .12s"}}>
              {k.label}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={175}>
          <LineChart data={kpiData} margin={{top:4,right:28,left:-8,bottom:22}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid}/>
            <PB p={phase}/>
            <XAxis dataKey="p" {...ax} interval={1} angle={-30} textAnchor="end" height={28} tick={{fill:C.muted,fontSize:8}}/>
            <YAxis {...ax} domain={["auto","auto"]}/>
            <Tooltip content={<Tip/>}/>
            <Line dataKey="v" name={kpi.label} stroke={kpi.color} strokeWidth={2.5}
              strokeOpacity={lOp(phase)} dot={mkDot(kpi.color,phase)} activeDot={{r:5,fill:kpi.color}}/>
          </LineChart>
        </ResponsiveContainer>
        <PL p={phase}/>
      </Panel>

      <div style={{background:"rgba(86,180,233,0.05)",border:`1px solid rgba(86,180,233,0.12)`,borderRadius:8,padding:"8px 13px",marginTop:9,display:"flex",gap:8,alignItems:"flex-start"}}>
        <span style={{color:C.sky,flexShrink:0}}>↗</span>
        <div style={{fontSize:10,color:C.dim,lineHeight:1.7}}>
          <strong style={{color:C.muted}}>Aplicabilidad:</strong> Las 5 lecciones del caso FCC (L1–L5) son el marco replicable — los datos de 605 observaciones son su evidencia empírica.
          <span style={{color:C.sky}}> Los OKRs C-1 a C-4 son el puente entre la narrativa del caso y las métricas accionables.</span>
        </div>
      </div>
    </div>
  );
}

function TabC1({phase}) {
  const cf = (k,b) => cellFill(k,b,phase);
  return (
    <div>
      <Insight icon="⬆" accent={C.blue} text={<><strong>Lección L4:</strong> El CIO asignó intraemprendedores por oficina, creó tablones para publicar problemas y actuó como «chaleco antibalas» para proteger a quienes experimentaban. Change agents: 3.6% → 29.1% (+708%). Ideas/persona: 0.07 → 1.07 (×15.3). La cultura no cambió por decreto — cambió por diseño.</>}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:11}}>
        <Panel title="Change Agents e Intrapreneurs por Fase" subtitle="Barras horizontales desde 0 · Colores secuenciales por fase · Reglas #3 #12 #15 #18">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={AGG} layout="vertical" margin={{top:4,right:40,left:6,bottom:2}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false}/>
              <XAxis type="number" {...ax} tickFormatter={v=>v+"%"} domain={[0,35]}/>
              <YAxis type="category" dataKey="name" {...ax} width={84}/>
              <Tooltip content={<Tip/>}/>
              <Bar dataKey="ca" name="Change Agents %" radius={[0,3,3,0]} maxBarSize={18} label={{position:"right",fontSize:9,fill:C.muted,formatter:v=>v+"%"}}>
                {AGG.map(e=><Cell key={e.key} fill={cf(e.key,PM[e.key].c)}/>)}
              </Bar>
              <Bar dataKey="intra" name="Intrapreneurs %" radius={[0,3,3,0]} maxBarSize={18} label={{position:"right",fontSize:9,fill:C.muted,formatter:v=>v+"%"}}>
                {AGG.map(e=><Cell key={e.key} fill={cf(e.key,PM[e.key].c+"99")}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <LegRow items={[{c:C.mig,l:"Change Agents",sq:true},{c:C.mig+"99",l:"Intrapreneurs",sq:true}]}/>
        </Panel>
        <Panel title="Ideas de Innovación por Persona" subtitle="De 0.07 → 1.07 (×15.3) · Fase activa resaltada · OKR C-1.3">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={TS} margin={{top:4,right:26,left:-8,bottom:2}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid}/>
              <PB p={phase}/>
              <XAxis dataKey="p" {...ax} interval={2}/>
              <YAxis {...ax} domain={[0,1.4]}/>
              <Tooltip content={<Tip/>}/>
              <ReferenceLine y={1} stroke={C.teal} strokeDasharray="5 4" strokeWidth={1.2} label={{value:"Objetivo ≥1",position:"insideTopRight",fontSize:8,fill:C.teal}}/>
              <defs><linearGradient id="ig2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.amber} stopOpacity={0.28}/><stop offset="95%" stopColor={C.amber} stopOpacity={0.02}/></linearGradient></defs>
              <Area dataKey="ideas" name="Ideas/persona" stroke={C.amber} fill="url(#ig2)" strokeWidth={2.5} strokeOpacity={lOp(phase)} dot={mkDot(C.amber,phase)} activeDot={{r:5}}/>
            </AreaChart>
          </ResponsiveContainer>
          <PL p={phase}/>
        </Panel>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
        {[{l:"Change Agents final",v:"29.1%",s:"vs. 3.6% baseline (+708%)",c:C.blue},{l:"Ideas/persona final",v:"1.07",s:"vs. 0.07 baseline (×15.3)",c:C.amber},{l:"Intrapreneurs pico",v:"23.6%",s:"2015-Q3 — migración de servidores",c:C.sky}].map(({l,v,s,c})=>(
          <div key={l} style={{background:C.card,borderRadius:8,padding:"11px 13px",borderLeft:`3px solid ${c}`}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{l}</div>
            <div style={{fontFamily:"monospace",fontSize:22,fontWeight:700,color:C.text}}>{v}</div>
            <div style={{fontSize:9,color:C.dim,marginTop:3}}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabC2({phase}) {
  return (
    <div>
      <Insight icon="⟲" accent={C.sky} text={<><strong>Punto de inflexión 2015-Q3:</strong> Por primera vez, el compromiso (6.12) supera la resistencia (5.70) — ratio E/R = 1.07. El equipo trabajó 55 horas continuas; el CIO comunicó en tiempo real y el sentimiento cultural pasó de 1.83 a 7.43: los datos validan la narrativa cualitativa del caso con precisión trimestral.</>}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:11}}>
        <Panel title="Compromiso vs Resistencia — /10" subtitle="Sin doble eje · Color + patrón · Fase activa resaltada" tag="C-2.1·C-2.3" tagC={C.blue}>
          <ResponsiveContainer width="100%" height={205}>
            <LineChart data={TS} margin={{top:4,right:28,left:-8,bottom:2}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid}/>
              <PB p={phase}/>
              <XAxis dataKey="p" {...ax} interval={2}/>
              <YAxis domain={[1,10]} {...ax}/>
              <Tooltip content={<Tip/>}/>
              <ReferenceLine x="2015-Q3" stroke={C.amber} strokeDasharray="4 3" strokeWidth={1.5} label={{value:"E>R Inflexión",position:"insideTopRight",fontSize:8,fill:C.amber}}/>
              <Line dataKey="eng" name="Compromiso" stroke={C.blue} strokeWidth={2.5} strokeOpacity={lOp(phase)} dot={mkDot(C.blue,phase)} activeDot={{r:5,fill:C.blue}}/>
              <Line dataKey="res" name="Resistencia" stroke={C.orange} strokeWidth={2.5} strokeOpacity={lOp(phase)} dot={mkDot(C.orange,phase,true)} activeDot={{r:5,fill:C.orange}} strokeDasharray="7 3"/>
            </LineChart>
          </ResponsiveContainer>
          <LegRow items={[{c:C.blue,l:"Compromiso ●"},{c:C.orange,l:"Resistencia ■",dash:true}]}/>
          <PL p={phase}/>
        </Panel>
        <Panel title="Sentimiento Cultural — 1.83 → 8.21 (+349%)" subtitle="Hitos del caso FCC anotados directamente · H6" tag="C-2.2" tagC={C.sky}>
          <ResponsiveContainer width="100%" height={205}>
            <AreaChart data={TS} margin={{top:4,right:28,left:-8,bottom:2}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid}/>
              <PB p={phase}/>
              <XAxis dataKey="p" {...ax} interval={2}/>
              <YAxis domain={[0,10]} {...ax}/>
              <Tooltip content={<Tip/>}/>
              <ReferenceLine x="2014-Q1" stroke={C.orange} strokeDasharray="4 3" strokeWidth={1.2} label={{value:"1/3 optimista",position:"insideTopRight",fontSize:8,fill:C.orange}}/>
              <ReferenceLine x="2015-Q3" stroke={C.teal} strokeDasharray="4 3" strokeWidth={1.2} label={{value:">80% entusiasmo",position:"insideTopLeft",fontSize:8,fill:C.teal}}/>
              <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.sky} stopOpacity={0.32}/><stop offset="95%" stopColor={C.sky} stopOpacity={0.02}/></linearGradient></defs>
              <Area dataKey="sent" name="Sentimiento" stroke={C.sky} fill="url(#sg)" strokeWidth={2.5} strokeOpacity={lOp(phase)} dot={mkDot(C.sky,phase)} activeDot={{r:5}}/>
            </AreaChart>
          </ResponsiveContainer>
          <PL p={phase}/>
        </Panel>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9}}>
        {[{l:"Engagement 2014-Q1",v:"3.34",s:"«1/3 optimista» validado",c:C.blue},{l:"Resistance 2015-Q3",v:"5.70",s:"Primera vez E/R > 1",c:C.orange},{l:"Sentiment 2015-Q3",v:"7.43",s:">80% entusiasmo confirmado",c:C.sky},{l:"Resistance final",v:"4.59",s:"↓ 48% desde baseline 8.83",c:C.teal}].map(({l,v,s,c})=>(
          <div key={l} style={{background:C.card,borderRadius:8,padding:"10px 12px",borderLeft:`3px solid ${c}`}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{l}</div>
            <div style={{fontFamily:"monospace",fontSize:20,fontWeight:700,color:C.text}}>{v}</div>
            <div style={{fontSize:9,color:C.dim,marginTop:3}}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const RadarTick = ({payload,x,y,textAnchor}) => {
  if(!payload?.value) return null;
  const d = RDL.find(r=>r.m===payload.value);
  return (
    <g>
      <text x={x} y={y-2} textAnchor={textAnchor} fill={C.muted} fontSize={9} fontWeight={600}>{payload.value}</text>
      <text x={x} y={y+11} textAnchor={textAnchor} fontSize={8}>
        <tspan fill="#64748b">{d?.bl}</tspan><tspan fill={C.dim}> → </tspan><tspan fill="#00C8B0" fontWeight="700">{d?.fi}</tspan>
      </text>
    </g>
  );
};

function TabC3({phase}) {
  const rd = RDL.map(d=>({m:d.m,baseline:d.bl,resultado:d.fi}));
  return (
    <div>
      <Insight icon="◈" accent={C.teal} text={<><strong>Lección L3:</strong> El Dr. Bray pasó los primeros 4 meses reuniéndose con las 18 oficinas para construir confianza hacia arriba y hacia abajo. Las 5 dimensiones del liderazgo mejoraron en paralelo — ninguna dimensión se puede mover sin las demás.</>}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:11}}>
        <Panel title="5 Dimensiones del Liderazgo" subtitle="Inventario 2013 vs Optimización 2016 · Ticks: baseline → resultado">
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart cx="50%" cy="50%" outerRadius="62%" data={rd} margin={{top:12,right:20,left:20,bottom:12}}>
              <PolarGrid stroke="rgba(255,255,255,0.12)" gridType="polygon"/>
              <PolarAngleAxis dataKey="m" tick={<RadarTick/>}/>
              <PolarRadiusAxis domain={[0,10]} tickCount={4} tick={{fill:"rgba(255,255,255,0.15)",fontSize:7}} axisLine={false} tickLine={false}/>
              <Radar name="Inventario 2013" dataKey="baseline" stroke="#64748b" strokeWidth={2} strokeDasharray="5 3" fill="rgba(100,116,139,0.07)" dot={{r:3,fill:"#64748b"}}/>
              <Radar name="Optimización 2016" dataKey="resultado" stroke="#00C8B0" strokeWidth={2.5} fill="rgba(0,200,176,0.13)" dot={{r:4,fill:"#00C8B0"}}/>
            </RadarChart>
          </ResponsiveContainer>
          <div style={{marginTop:6,paddingTop:9,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
            {rd.map(d => {
              const delta = Math.round((d.resultado-d.baseline)/d.baseline*100);
              return (
                <div key={d.m} style={{marginBottom:6}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
                    <span style={{fontSize:10,color:C.muted,minWidth:90}}>{d.m}</span>
                    <span style={{fontSize:9,fontFamily:"monospace",display:"flex",gap:3,alignItems:"center"}}>
                      <span style={{color:"#64748b"}}>{d.baseline}</span><span style={{color:C.dim}}>→</span>
                      <span style={{color:"#00C8B0",fontWeight:700}}>{d.resultado}</span>
                      <span style={{color:C.teal,fontSize:8,marginLeft:2}}>+{delta}%</span>
                    </span>
                  </div>
                  <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.06)",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:0,left:0,height:"100%",width:`${d.baseline/10*100}%`,background:"rgba(100,116,139,0.4)",borderRadius:2}}/>
                    <div style={{position:"absolute",top:0,left:0,height:"100%",width:`${d.resultado/10*100}%`,background:"rgba(0,200,176,0.6)",borderRadius:2}}/>
                  </div>
                </div>
              );
            })}
          </div>
          <LegRow items={[{c:"#64748b",l:"Inventario 2013",dash:true},{c:"#00C8B0",l:"Optimización 2016"}]}/>
        </Panel>
        <Panel title="3 KPIs de Liderazgo — Evolución Paralela" subtitle="Misma escala /10 · Sin doble eje · Fase activa resaltada">
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={TS} margin={{top:4,right:26,left:-8,bottom:2}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid}/>
              <PB p={phase}/>
              <XAxis dataKey="p" {...ax} interval={2}/>
              <YAxis domain={[1,10]} {...ax}/>
              <Tooltip content={<Tip/>}/>
              <ReferenceLine y={7} stroke={C.teal} strokeDasharray="5 3" strokeWidth={1} label={{value:"Target ≥7",position:"insideTopRight",fontSize:8,fill:C.teal}}/>
              <Line dataKey="lead" name="Confianza" stroke={C.teal} strokeWidth={2} strokeOpacity={lOp(phase)} dot={mkDot(C.teal,phase)} activeDot={{r:4}}/>
              <Line dataKey="tran" name="Transparencia" stroke={C.sky} strokeWidth={2} strokeOpacity={lOp(phase)} dot={mkDot(C.sky,phase)} strokeDasharray="6 3" activeDot={{r:4}}/>
              <Line dataKey="comm" name="Comunicación" stroke={C.purple} strokeWidth={2} strokeOpacity={lOp(phase)} dot={mkDot(C.purple,phase)} strokeDasharray="2 3" activeDot={{r:4}}/>
            </LineChart>
          </ResponsiveContainer>
          <LegRow items={[{c:C.teal,l:"Confianza"},{c:C.sky,l:"Transparencia",dash:true},{c:C.purple,l:"Comunicación",dash:true}]}/>
          <PL p={phase}/>
        </Panel>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
        {[{l:"Liderazgo 2013→2016",v:"2.32→7.66",s:"+230% — confianza como precondición",c:C.teal},{l:"Transparencia 2013→2016",v:"2.97→7.25",s:"+144% — blog + 110K seguidores Twitter",c:C.sky},{l:"Comunicación 2013→2016",v:"2.77→6.51",s:"+135% — ✓ objetivo ≥6.5 alcanzado",c:C.purple}].map(({l,v,s,c})=>(
          <div key={l} style={{background:C.card,borderRadius:8,padding:"10px 12px",borderLeft:`3px solid ${c}`}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{l}</div>
            <div style={{fontFamily:"monospace",fontSize:15,fontWeight:700,color:C.text}}>{v}</div>
            <div style={{fontSize:9,color:C.dim,marginTop:3}}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabC4({phase}) {
  const cf = (k,b) => cellFill(k,b,phase);
  return (
    <div>
      <Insight icon="◆" accent={C.purple} text={<><strong>Lecciones L1 + L2:</strong> Transformación técnica (IT O&M: 85.5%→45.2%) y formación humana (0.33→5.6 hrs/trimestre, +1,613%) ocurrieron en paralelo. Los quick wins liberaron capital político: CHC en Zendesk costó $450K vs $3.2M internamente. El 49.1% de adopción Scrum al final lo confirma.</>}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:11}}>
        <Panel title="IT O&M Budget — Del Legado a la Innovación" subtitle="Escala adaptativa 40–90% · Objetivo <50% · Fase activa resaltada">
          <ResponsiveContainer width="100%" height={195}>
            <LineChart data={TS} margin={{top:4,right:28,left:-4,bottom:2}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid}/>
              <PB p={phase}/>
              <XAxis dataKey="p" {...ax} interval={2}/>
              <YAxis domain={[40,90]} {...ax} tickFormatter={v=>v+"%"}/>
              <Tooltip content={<Tip/>}/>
              <ReferenceLine y={50} stroke={C.teal} strokeDasharray="6 4" strokeWidth={1.5} label={{value:"Objetivo <50%",position:"insideTopRight",fontSize:8,fill:C.teal}}/>
              <Line dataKey="itOm" name="IT O&M Budget" stroke={C.purple} strokeWidth={2.5} strokeOpacity={lOp(phase)} dot={mkDot(C.purple,phase)} activeDot={{r:5}}/>
            </LineChart>
          </ResponsiveContainer>
          <LegRow items={[{c:C.purple,l:"IT O&M %"},{c:C.teal,l:"Objetivo <50%",dash:true}]}/>
          <PL p={phase}/>
        </Panel>
        <Panel title="Prácticas Ágiles por Fase" subtitle="Barras horizontales (Regla #18) · Desde 0 (Regla #3) · Fase activa resaltada">
          <ResponsiveContainer width="100%" height={195}>
            <BarChart data={AGG} layout="vertical" margin={{top:4,right:42,left:6,bottom:2}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false}/>
              <XAxis type="number" {...ax} tickFormatter={v=>v+"%"} domain={[0,70]}/>
              <YAxis type="category" dataKey="name" {...ax} width={84}/>
              <Tooltip content={<Tip/>}/>
              <Bar dataKey="scrum" name="Scrum %" radius={[0,3,3,0]} maxBarSize={17} label={{position:"right",fontSize:9,fill:C.muted,formatter:v=>v+"%"}}>
                {AGG.map(e=><Cell key={e.key} fill={cf(e.key,C.blue)}/>)}
              </Bar>
              <Bar dataKey="feed" name="Feedback %" radius={[0,3,3,0]} maxBarSize={17} label={{position:"right",fontSize:9,fill:C.muted,formatter:v=>v+"%"}}>
                {AGG.map(e=><Cell key={e.key} fill={cf(e.key,C.teal)}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <LegRow items={[{c:C.blue,l:"Scrum %",sq:true},{c:C.teal,l:"Feedback %",sq:true}]}/>
        </Panel>
      </div>
      <Panel title="Formación Digital y Adopción de Herramientas por Fase" subtitle="Barras desde 0 · Colores secuenciales · Comparación entre fases">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={AGG} margin={{top:4,right:8,left:-8,bottom:2}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false}/>
              <XAxis dataKey="name" {...ax} tick={{fill:C.muted,fontSize:9}}/>
              <YAxis {...ax} tickFormatter={v=>v+"h"} domain={[0,6]}/>
              <Tooltip content={<Tip/>}/>
              <Bar dataKey="train" name="Formación (hrs)" radius={[3,3,0,0]} maxBarSize={30} label={{position:"top",fontSize:9,fill:C.muted,formatter:v=>v}}>
                {AGG.map(e=><Cell key={e.key} fill={cf(e.key,PM[e.key].c)}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={AGG} margin={{top:4,right:8,left:-8,bottom:2}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false}/>
              <XAxis dataKey="name" {...ax} tick={{fill:C.muted,fontSize:9}}/>
              <YAxis {...ax} domain={[0,8]}/>
              <Tooltip content={<Tip/>}/>
              <Bar dataKey="tool" name="Tool Adoption (/10)" radius={[3,3,0,0]} maxBarSize={30} label={{position:"top",fontSize:9,fill:C.muted,formatter:v=>v}}>
                {AGG.map(e=><Cell key={e.key} fill={cf(e.key,PM[e.key].c)}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{fontSize:9,color:C.dim,marginTop:6}}>Izq: Horas de formación digital · Der: Digital Tool Adoption Score (/10)</div>
      </Panel>
    </div>
  );
}

export default function FCCDashboard() {
  const [tab,setTab] = useState("overview");
  const [phase,setPhase] = useState("all");
  const [kpiKey,setKpiKey] = useState("eng");

  const TC = {overview:"#60A5FA",c1:C.blue,c2:C.sky,c3:C.teal,c4:C.purple};

  return (
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",color:C.text,boxSizing:"border-box"}}>

      <div style={{background:"#0D1B2A",padding:"12px 22px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:8,color:C.sky,fontWeight:700,letterSpacing:"0.12em",marginBottom:3,opacity:0.8}}>INCAE DBI · SEMANA 3 · EQUIPO 12 · PIVOTE 2</div>
            <div style={{fontSize:17,fontWeight:800,color:C.text,letterSpacing:"-0.01em",marginBottom:2}}>Cultura & Liderazgo Digital — FCC IT Modernization</div>
            <div style={{fontSize:10,color:C.muted}}>Desouza et al. (2019) · Barahona & Murillo (2024) Nota 31454_S · <span style={{color:C.dim}}>605 obs · 55 empleados · 11 trimestres · 4 fases</span></div>
          </div>
          <div style={{display:"flex",gap:6,alignSelf:"flex-end",flexWrap:"wrap"}}>
            {[{l:"Pivote",v:"#2"},{l:"OKRs",v:"C1→C4"},{l:"Caso",v:"FCC 2019"}].map(({l,v})=>(
              <div key={l} style={{background:"rgba(255,255,255,0.05)",border:`1px solid ${C.border}`,borderRadius:6,padding:"3px 9px",textAlign:"center"}}>
                <div style={{fontSize:8,color:C.dim}}>{l}</div>
                <div style={{fontSize:10,color:C.muted,fontWeight:600}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{background:"#060D15",borderBottom:"1px solid rgba(255,255,255,0.1)",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"stretch",padding:"0 22px",flexWrap:"wrap"}}>
          <nav style={{display:"flex",gap:1,alignItems:"stretch"}}>
            {TABS.map(t => {
              const a = tab===t.id;
              const tc = TC[t.id];
              return (
                <button key={t.id} onClick={()=>setTab(t.id)} aria-selected={a}
                  style={{display:"flex",alignItems:"center",gap:5,padding:"10px 14px",fontSize:11,fontWeight:a?700:400,cursor:"pointer",fontFamily:"inherit",border:"none",borderBottom:a?`2px solid ${tc}`:"2px solid transparent",borderTop:"2px solid transparent",background:a?`${tc}10`:"transparent",color:a?tc:"rgba(255,255,255,0.28)",transition:"all .15s",whiteSpace:"nowrap"}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background:a?tc:"rgba(255,255,255,0.1)",flexShrink:0,transition:"all .15s"}}/>
                  {t.label}
                </button>
              );
            })}
          </nav>
          <div style={{display:"flex",gap:5,alignItems:"center",padding:"8px 0"}}>
            <span style={{fontSize:8,color:C.dim,fontWeight:700,letterSpacing:"0.06em"}}>FASE</span>
            {[{label:"Todas",key:"all",c:C.sky},...Object.entries(PM).map(([k,m])=>({label:m.label,key:k,c:m.c}))].map(f => {
              const a = phase===f.key;
              return (
                <button key={f.key} onClick={()=>setPhase(f.key)} aria-pressed={a}
                  style={{padding:"3px 9px",borderRadius:11,fontSize:9,cursor:"pointer",border:`1px solid ${a?f.c:"rgba(255,255,255,0.08)"}`,background:a?`${f.c}22`:"transparent",color:a?f.c:"rgba(255,255,255,0.28)",fontWeight:a?700:400,fontFamily:"inherit",transition:"all .12s"}}>
                  {f.label}
                </button>
              );
            })}
            {phase!=="all" && <button onClick={()=>setPhase("all")} style={{padding:"3px 8px",borderRadius:11,fontSize:9,cursor:"pointer",border:`1px solid ${C.border}`,background:"transparent",color:C.dim,fontFamily:"inherit"}}>↺</button>}
          </div>
        </div>
      </div>

      <div style={{padding:"15px 22px 22px"}}>
        {tab==="overview" && <TabOverview phase={phase} kpiKey={kpiKey} setKpiKey={setKpiKey}/>}
        {tab==="c1" && <TabC1 phase={phase}/>}
        {tab==="c2" && <TabC2 phase={phase}/>}
        {tab==="c3" && <TabC3 phase={phase}/>}
        {tab==="c4" && <TabC4 phase={phase}/>}
      </div>

      <div style={{borderTop:`1px solid ${C.border}`,padding:"10px 22px",fontSize:9,color:C.dim,lineHeight:1.8,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        <div><strong style={{color:C.muted}}>Datos:</strong> FCC_Digital_Culture_Leadership_Dataset.csv · 605 obs · 55 empleados · 11 trimestres · 34 variables</div>
        <div><strong style={{color:C.muted}}>Referencias:</strong> Desouza, K.C. et al. (2019) Springer · Barahona & Murillo (2024) Nota 31454_S INCAE</div>
        <div><strong style={{color:C.muted}}>Diseño:</strong> Paleta Okabe-Ito (2002) · Nielsen H1-H10 · Bakusevych Reglas #3-#18 · WCAG AA</div>
      </div>
    </div>
  );
}
