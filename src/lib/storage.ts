"use client";
const PREFIX="chinese-mission",ACT=`${PREFIX}-activity`;
export interface BackupPayload{app:"Chinese Mission Việt";version:2;exportedAt:string;data:Record<string,string>}
const day=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
export function recordStudyActivity(){let a:{dates:string[]}={dates:[]};try{a=JSON.parse(localStorage.getItem(ACT)||'{"dates":[]}')}catch{};localStorage.setItem(ACT,JSON.stringify({dates:Array.from(new Set([...(a.dates||[]),day()])),lastStudyAt:new Date().toISOString()}))}
export function getStudyStreak(){let ds:string[]=[];try{ds=JSON.parse(localStorage.getItem(ACT)||'{"dates":[]}').dates||[]}catch{return 0};const s=new Set(ds);let d=new Date();if(!s.has(day(d)))d.setDate(d.getDate()-1);let n=0;while(s.has(day(d))){n++;d.setDate(d.getDate()-1)}return n}
export function collectLocalData():BackupPayload{const data:Record<string,string>={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith(PREFIX))data[k]=localStorage.getItem(k)||""}return{app:"Chinese Mission Việt",version:2,exportedAt:new Date().toISOString(),data}}
export function restoreLocalData(p:BackupPayload){if(p?.app!=="Chinese Mission Việt"||!p.data)throw new Error("Tệp sao lưu không đúng định dạng.");Object.entries(p.data).forEach(([k,v])=>{if(k.startsWith(PREFIX))localStorage.setItem(k,v)})}
export function downloadBackup(){const b=new Blob([JSON.stringify(collectLocalData(),null,2)],{type:"application/json"}),u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download=`chinese-mission-viet-${day()}.json`;a.click();URL.revokeObjectURL(u)}
