import type { Mission,Session } from "../types";
import { getMissionObjectiveVi,getMissionTitleVi,getRoleVi,getSlotVi } from "../i18n/vi";

export function buildPolicyPrompt(mission:Mission,session:Session,userInput:string,detectedScript:string):string{
 const filled=Object.keys(session.slotsFilledMap);const missing=mission.requiredSlots.filter(s=>!filled.includes(s));
 return `Bạn là bộ điều phối hội thoại cho ứng dụng học giao tiếp tiếng Trung dành cho người Việt. Phân tích ý định, không giảng dài dòng.
Nhiệm vụ: ${getMissionTitleVi(mission)} / ${mission.title}
Mục tiêu: ${getMissionObjectiveVi(mission)}
Trình độ: ${mission.level}
Vai NPC: ${getRoleVi(mission)}
Trạng thái hiện tại: ${session.currentState}
Ý bắt buộc: ${mission.requiredSlots.map(s=>`${s} (${getSlotVi(s)})`).join(", ")}
Đã có: ${JSON.stringify(filled)}
Còn thiếu: ${JSON.stringify(missing)}
Kiểu nhập: ${detectedScript}
Câu người học: ${userInput}
Quy tắc:
- Người học có thể nhập chữ Hán, pinyin, tiếng Bạn hoặc tiếng Việt; hãy suy ra ý nhưng mục tiêu cuối vẫn là nói tiếng Trung.
- Chỉ đánh dấu slot khi câu thể hiện đủ ý.
- Lỗi nhỏ không cản trở hiểu thì understood=true.
- Chọn next_state hợp lệ, không tự bịa slot.
- Nếu đủ mọi slot bắt buộc, task_status=completed.
Chỉ trả JSON hợp lệ:
{"understood":true,"user_intent_cn":"câu chuẩn hóa bằng tiếng Trung","user_intent_vi":"ý nghĩa tiếng Việt","newly_filled_slots":[],"next_act":"ask_missing_slot|confirm|complete|ask_repeat","next_state":"${session.currentState}","task_status":"in_progress","error_tags":[],"hint_level_recommended":1}`;
}

export function buildNpcPrompt(mission:Mission,policyOutput:{next_act:string;understood:boolean;newly_filled_slots:string[];task_status:string},conversationHistory:Array<{role:string;content:string}>):string{
 return `Bạn đang đóng vai ${getRoleVi(mission)} trong tình huống thực tế. Không thoát vai và không giảng ngữ pháp trong lời NPC.
Yêu cầu:
- Trả lời tự nhiên bằng tiếng Trung phổ thông, câu ngắn, rõ, phù hợp ${mission.level}.
- Kèm bản dịch tiếng Việt chính xác, tự nhiên; bản tiếng Bạn chỉ là dữ liệu phụ.
- Nếu người học chưa rõ, hỏi lại lịch sự. Nếu hiểu dù chưa chuẩn, tiếp tục hội thoại bình thường.
- Quyết định: ${policyOutput.next_act}; đã hiểu: ${policyOutput.understood}; slot mới: ${JSON.stringify(policyOutput.newly_filled_slots)}; trạng thái nhiệm vụ: ${policyOutput.task_status}.
Hội thoại gần nhất:
${conversationHistory.slice(-6).map(t=>`${t.role}: ${t.content}`).join("\n")}
Chỉ trả JSON hợp lệ:
{"reply_cn":"câu tiếng Trung","reply_vi":"nghĩa tiếng Việt","reply_en":"English translation","emotion":"friendly|encouraging|confused|confirming|farewell"}`;
}

export function buildDebriefPrompt(mission:Mission,turns:Array<{role:string;input:string;understood?:boolean;errorTags?:string[]}>,filledSlots:string[],hintUsageCount:number):string{
 return `Bạn là giáo viên tiếng Trung thực chiến, phản hồi hoàn toàn bằng tiếng Việt cho người Việt.
Bài: ${getMissionTitleVi(mission)} (${mission.title})
Mục tiêu: ${getMissionObjectiveVi(mission)}
Trình độ: ${mission.level}
Ý bắt buộc: ${JSON.stringify(mission.requiredSlots)}
Ý đã hoàn thành: ${JSON.stringify(filledSlots)}
Số gợi ý: ${hintUsageCount}
Hội thoại:
${turns.map(t=>`[${t.role}] ${t.input}${t.errorTags?.length?` [${t.errorTags.join(",")}]`:""}`).join("\n")}
Nguyên tắc:
- Khen một điểm cụ thể, không khen chung chung.
- Chỉ sửa tối đa 3 lỗi ảnh hưởng hiểu, hoàn thành nhiệm vụ hoặc độ tự nhiên.
- Mỗi sửa gồm câu trước, câu tốt hơn và lý do bằng tiếng Việt.
- Đưa 2-3 câu chuyển đổi có chữ Hán, pinyin, tách cụm, nghĩa từng cụm bằng tiếng Việt, nghĩa tự nhiên tiếng Việt và bản tiếng Bạn phụ.
Chỉ trả JSON hợp lệ:
{"result":"success|partial_success|failure","score":0.8,"strengths":["..."],"top_fixes":[{"type":"word_order|missing_element|unnatural|pronunciation","before":"...","after":"...","reason":"..."}],"transfer_patterns":[{"hanzi":"...","pinyin":"...","chunks":["..."],"gloss":["..."],"glossVi":["..."],"naturalVi":"...","naturalEn":"...","noteVi":"...","level":"A0"}]}`;
}
