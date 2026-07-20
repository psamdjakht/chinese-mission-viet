"use client";
import { useCallback,useEffect,useState } from "react";
export interface LearningSettings{showPinyin:boolean;showTranslation:boolean;showWordGloss:boolean;showEnglish:boolean;autoplayVoice:boolean;speechRate:number;repeatCount:number}
export const defaults:LearningSettings={showPinyin:true,showTranslation:true,showWordGloss:true,showEnglish:false,autoplayVoice:true,speechRate:.82,repeatCount:3};
const KEY="chinese-mission-settings";
export function readSettings(){if(typeof window==="undefined")return defaults;try{return{...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")} }catch{return defaults}}
export function saveSettings(v:LearningSettings){localStorage.setItem(KEY,JSON.stringify(v));window.dispatchEvent(new CustomEvent("cm-settings",{detail:v}))}
export function useLearningSettings(){const[settings,setState]=useState(defaults);useEffect(()=>{setState(readSettings());const h=(e:Event)=>setState((e as CustomEvent<LearningSettings>).detail||readSettings());window.addEventListener("cm-settings",h);return()=>window.removeEventListener("cm-settings",h)},[]);const updateSettings=useCallback((p:Partial<LearningSettings>)=>setState(c=>{const n={...c,...p};saveSettings(n);return n}),[]);return{settings,updateSettings}}
