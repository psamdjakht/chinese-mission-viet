interface ChatMessage{role:"system"|"user"|"assistant";content:string}
interface AIResponse{content:string}
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
export async function callAI(systemPrompt:string,userMessage:string):Promise<AIResponse>{
 const apiKey=process.env.AI_API_KEY;const baseUrl=(process.env.AI_BASE_URL||"https://api.openai.com/v1").replace(/\/$/,"");const model=process.env.AI_MODEL||"gpt-4o-mini";
 if(!apiKey||apiKey==="your-api-key-here")throw new Error("AI_API_KEY not configured");
 let last="";for(let attempt=0;attempt<2;attempt++){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),25000);try{const messages:ChatMessage[]=[{role:"system",content:systemPrompt},{role:"user",content:userMessage}];const response=await fetch(`${baseUrl}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${apiKey}`},signal:controller.signal,body:JSON.stringify({model,messages,temperature:.55,max_tokens:1400,response_format:{type:"json_object"}})});if(!response.ok){last=await response.text();throw new Error(`AI API ${response.status}: ${last.slice(0,300)}`)}const data=await response.json();const content=data.choices?.[0]?.message?.content;if(!content)throw new Error("AI trả về nội dung rỗng");return{content}}catch(e){last=e instanceof Error?e.message:String(e);if(attempt===0)await sleep(350)}finally{clearTimeout(timer)}}throw new Error(last||"AI request failed")
}
export function parseJSON<T>(raw:string):T{let c=raw.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");const first=c.indexOf("{");const last=c.lastIndexOf("}");if(first>=0&&last>first)c=c.slice(first,last+1);try{return JSON.parse(c) as T}catch{const repaired=c.replace(/,\s*([}\]])/g,"$1");try{return JSON.parse(repaired) as T}catch{throw new Error(`Không phân tích được JSON từ AI: ${c.slice(0,160)}`)}}}
export function isAIConfigured(){const k=process.env.AI_API_KEY;return Boolean(k&&k!=="your-api-key-here")}
