import type { GlossItem, Mission, Scenario } from "@/lib/types";

export const scenarioVi: Record<string, { name: string; description: string }> = {
  s1: { name: "Quán cà phê & Nhà hàng", description: "Gọi đồ uống, gọi món, yêu cầu mang đi và thanh toán." },
  s2: { name: "Taxi & Di chuyển", description: "Nói điểm đến và các yêu cầu cần thiết với tài xế." },
  s3: { name: "Hỏi đường", description: "Hỏi vị trí, khoảng cách và hiểu chỉ dẫn." },
  s4: { name: "Tự giới thiệu", description: "Giới thiệu tên, quốc tịch và nghề nghiệp." },
  s5: { name: "Kết bạn", description: "Thêm WeChat, rủ đi ăn và nói về sở thích." },
  s6: { name: "Giao tiếp công việc", description: "Chào hỏi, nhờ hỗ trợ, hẹn họp và xin nghỉ." },
};

export const missionVi: Record<string, { title: string; objective: string }> = {
  m1: { title: "Gọi một ly latte nóng", objective: "Gọi thành công một ly latte nóng tại quán cà phê." },
  m2: { title: "Gọi đồ uống không đá", objective: "Gọi thành công một ly đồ uống không thêm đá." },
  m3: { title: "Yêu cầu thanh toán", objective: "Yêu cầu nhân viên mang hóa đơn và thanh toán." },
  m4: { title: "Gọi món mang đi", objective: "Gọi món và yêu cầu đóng gói mang đi." },
  m5: { title: "Nói điểm đến với tài xế", objective: "Nói rõ nơi anh muốn đến cho tài xế taxi." },
  m6: { title: "Nhờ tài xế chạy chậm lại", objective: "Lịch sự đề nghị tài xế giảm tốc độ." },
  m7: { title: "Yêu cầu dừng tại đây", objective: "Yêu cầu tài xế dừng đúng vị trí anh cần." },
  m8: { title: "Ga tàu điện ngầm ở đâu?", objective: "Hỏi người đi đường vị trí ga tàu điện ngầm." },
  m9: { title: "Còn bao xa?", objective: "Hỏi khoảng cách và hiểu câu trả lời." },
  m10: { title: "Tôi nên đi hướng nào?", objective: "Hỏi đường và hiểu hướng trái, phải, đi thẳng." },
  m11: { title: "Tự giới thiệu cơ bản", objective: "Tự giới thiệu ngắn gọn bằng tiếng Trung." },
  m12: { title: "Nói mình đến từ đâu", objective: "Nói quốc gia hoặc quê quán bằng tiếng Trung." },
  m13: { title: "Bạn làm nghề gì?", objective: "Mô tả nghề nghiệp của mình bằng tiếng Trung." },
  m14: { title: "Kết bạn WeChat", objective: "Đề nghị thêm WeChat với người mới quen." },
  m15: { title: "Rủ ai đó đi ăn", objective: "Rủ một người cùng đi ăn bằng tiếng Trung." },
  m16: { title: "Trò chuyện về sở thích", objective: "Nói về sở thích và hỏi sở thích của người khác." },
  m17: { title: "Chào hỏi đồng nghiệp", objective: "Chào hỏi và nói chuyện xã giao với đồng nghiệp." },
  m18: { title: "Nhờ đồng nghiệp giúp đỡ", objective: "Lịch sự nhờ đồng nghiệp hỗ trợ một việc." },
  m19: { title: "Hẹn thời gian họp", objective: "Thống nhất thời gian họp với đồng nghiệp." },
  m20: { title: "Xin nghỉ phép", objective: "Xin nghỉ ốm hoặc nghỉ việc riêng với quản lý." },
};

const roleVi: Record<string, string> = {
  "Coffee Shop Barista": "Nhân viên quán cà phê", "Bubble Tea Shop Staff": "Nhân viên quán trà sữa",
  "Restaurant Waiter": "Nhân viên phục vụ nhà hàng", "Restaurant Counter Staff": "Nhân viên quầy nhà hàng",
  "Taxi Driver": "Tài xế taxi", Passerby: "Người đi đường", "Passerby (Helpful Lady)": "Một người đi đường nhiệt tình",
  "New Acquaintance": "Người mới quen", "Chat Partner": "Người trò chuyện cùng", "New Friend": "Người bạn mới",
  "Someone Met at a Party": "Người mới gặp tại buổi tiệc", "Colleague / Friend": "Đồng nghiệp hoặc bạn bè",
  "Language Exchange Partner": "Bạn trao đổi ngôn ngữ", "Chinese Colleague": "Đồng nghiệp người Trung Quốc",
  "Colleague (More Senior)": "Đồng nghiệp có thâm niên hơn", Colleague: "Đồng nghiệp", "Your Manager": "Quản lý của anh",
};

const slotVi: Record<string, string> = {
  drink_type:"Loại đồ uống",temperature:"Nóng hoặc lạnh",size:"Kích cỡ",sugar:"Lượng đường",takeaway:"Tại chỗ hoặc mang đi",
  ice_preference:"Yêu cầu về đá",sugar_level:"Mức đường",payment_request:"Yêu cầu thanh toán",payment_method:"Phương thức thanh toán",
  split_bill:"Chia hóa đơn",food_item:"Món ăn",takeaway_request:"Yêu cầu đóng gói",spice_level:"Mức độ cay",quantity:"Số lượng",
  destination:"Điểm đến",address:"Địa chỉ",route_preference:"Yêu cầu về lộ trình",speed_request:"Yêu cầu giảm tốc độ",reason:"Lý do",
  stop_request:"Yêu cầu dừng xe",stop_location:"Vị trí dừng",location_query:"Địa điểm cần hỏi",direction_query:"Cách đi",
  distance_query:"Khoảng cách",time_query:"Thời gian đi",direction_choice:"Hướng cần đi",greeting:"Lời chào",name:"Tên",
  nickname:"Tên gọi",country:"Quốc gia",time_in_china:"Thời gian ở Trung Quốc",occupation:"Nghề nghiệp",workplace:"Nơi làm việc",
  wechat_request:"Đề nghị thêm WeChat",wechat_method:"Cách thêm WeChat",invitation:"Lời mời",time:"Thời gian",
  food_preference:"Món muốn ăn",hobby:"Sở thích",other_hobby:"Sở thích của người kia",small_talk:"Câu chuyện xã giao",
  help_request:"Việc cần hỗ trợ",meeting_request:"Đề nghị họp",meeting_time:"Thời gian họp",meeting_location:"Địa điểm hoặc hình thức họp",
  leave_request:"Yêu cầu xin nghỉ",leave_duration:"Thời gian nghỉ",handover:"Bàn giao công việc",
};

const naturalVi: Record<string, string> = {
  "我要一杯热拿铁":"Tôi muốn một ly latte nóng.","请给我一杯咖啡":"Vui lòng cho tôi một ly cà phê.","热的":"Loại nóng.",
  "不加冰":"Không thêm đá.","我要一杯柠檬茶，不加冰":"Tôi muốn một ly trà chanh, không thêm đá.","去冰":"Bỏ đá / không đá.",
  "买单":"Cho tôi thanh toán.","请问多少钱？":"Xin hỏi bao nhiêu tiền?","可以微信支付吗？":"Có thể thanh toán bằng WeChat không?",
  "打包":"Đóng gói mang đi.","我要带走":"Tôi muốn mang đi.","一份宫保鸡丁，打包":"Một phần gà Cung Bảo, đóng gói mang đi.",
  "不要太辣":"Đừng cay quá.","我要去天安门":"Tôi muốn đến Thiên An Môn.","师傅，去这个地方":"Bác tài, đi đến chỗ này.",
  "请去地铁站":"Vui lòng đi đến ga tàu điện ngầm.","师傅，请开慢一点":"Bác tài, vui lòng chạy chậm lại một chút.","太快了":"Nhanh quá.",
  "慢一点，好吗？":"Chậm lại một chút được không?","师傅，在这里停":"Bác tài, dừng ở đây.","前面路口停一下":"Vui lòng dừng ở giao lộ phía trước.",
  "到了，谢谢":"Đến rồi, cảm ơn.","请问地铁站在哪里？":"Xin hỏi ga tàu điện ngầm ở đâu?","怎么走？":"Đi như thế nào?", "谢谢你":"Cảm ơn bạn.",
  "还有多远？":"Còn bao xa?","走路要多长时间？":"Đi bộ mất bao lâu?","远不远？":"Có xa không?","往左走还是往右走？":"Đi bên trái hay bên phải?",
  "一直走":"Đi thẳng.","在红绿灯那里左拐":"Rẽ trái tại đèn giao thông.","你好，我叫……":"Xin chào, tôi tên là…","很高兴认识你":"Rất vui được gặp bạn.",
  "你可以叫我……":"Bạn có thể gọi tôi là…","我是美国人":"Tôi là người Mỹ.","我从法国来":"Tôi đến từ Pháp.","我来中国三个月了":"Tôi đã đến Trung Quốc được ba tháng.",
  "我是老师":"Tôi là giáo viên.","我在一家公司上班":"Tôi làm việc tại một công ty.","我做IT的":"Tôi làm trong ngành công nghệ thông tin.",
  "我们加个微信吧":"Chúng ta kết bạn WeChat nhé.","你的微信号是多少？":"Tài khoản WeChat của bạn là gì?","扫一下我的二维码":"Quét mã QR của tôi nhé.",
  "一起吃饭吧":"Cùng đi ăn nhé.","明天晚上有空吗？":"Tối mai bạn có rảnh không?","你想吃什么？":"Bạn muốn ăn gì?","我请你":"Tôi mời.",
  "我喜欢跑步":"Tôi thích chạy bộ.","你平时喜欢做什么？":"Bình thường bạn thích làm gì?","我也喜欢！":"Tôi cũng thích!","早上好":"Chào buổi sáng.",
  "吃了吗？":"Ăn cơm chưa?","周末过得怎么样？":"Cuối tuần của bạn thế nào?","你能帮我一下吗？":"Bạn có thể giúp tôi một chút không?","麻烦你了":"Làm phiền bạn rồi.",
  "这个我不太懂":"Chỗ này tôi chưa hiểu lắm.","我们约个时间开会吧":"Chúng ta hẹn thời gian họp nhé.","你明天下午有空吗？":"Chiều mai bạn có rảnh không?",
  "大概需要半个小时":"Khoảng nửa giờ.","在会议室还是线上？":"Họp tại phòng họp hay trực tuyến?","我今天身体不舒服，想请个假":"Hôm nay tôi không khỏe, tôi muốn xin nghỉ.",
  "我需要请一天病假":"Tôi cần xin nghỉ bệnh một ngày.","我的工作可以交给小李":"Công việc của tôi có thể bàn giao cho Tiểu Lý.",
  "你好！欢迎光临！请问你要喝点什么？":"Xin chào! Anh muốn uống gì?","你好！请问你要喝点什么？":"Xin chào! Anh muốn uống gì?",
  "好的！你要热的还是冰的？":"Được! Anh muốn nóng hay lạnh?","好的！要大杯、中杯还是小杯？":"Được! Anh muốn ly lớn, vừa hay nhỏ?",
  "好的，你要什么饮料呢？":"Được, anh muốn loại đồ uống nào?","不好意思，请再说一遍？你想喝什么？":"Xin lỗi, anh nói lại được không? Anh muốn uống gì?",
  "好的，请稍等。你怎么付款？微信、支付宝还是现金？":"Được, vui lòng chờ. Anh thanh toán bằng WeChat, Alipay hay tiền mặt?",
  "好的！一共二十五块。谢谢！请稍等。":"Tổng cộng 25 tệ. Cảm ơn anh, vui lòng chờ.","你怎么付款？微信、支付宝还是现金？":"Anh thanh toán bằng WeChat, Alipay hay tiền mặt?",
  "你的饮料好了，请慢用！再见！":"Đồ uống xong rồi, mời anh dùng! Tạm biệt!","不好意思，我没听懂。请再说一遍？":"Xin lỗi, tôi chưa hiểu. Anh nói lại được không?",
  "你好！请问你去哪里？":"Xin chào! Anh muốn đi đâu?","好的，没问题。大概三十分钟到。":"Được, khoảng 30 phút sẽ đến.","请问你要去哪里？":"Xin hỏi anh muốn đi đâu?",
  "到了！一共四十五块。谢谢！":"Đến rồi! Tổng cộng 45 tệ. Cảm ơn anh!","不好意思，你说什么？你要去哪里？":"Xin lỗi, anh muốn đi đâu?", "到了！祝你一路顺风！":"Đến rồi! Chúc anh thượng lộ bình an!",
  "你好，欢迎光临！请问你有预订吗？":"Xin chào! Anh có đặt phòng trước không?","好的，请出示你的护照。":"Vui lòng xuất trình hộ chiếu.","谢谢。你住几晚？":"Cảm ơn. Anh ở mấy đêm?",
  "请问你的名字是什么？有预订吗？":"Xin hỏi anh tên gì? Anh có đặt trước không?","好的，你的房间号是305。电梯在右边。祝你住得愉快！":"Phòng 305. Thang máy bên phải. Chúc anh ở vui vẻ!",
  "不好意思，请再说一遍？":"Xin lỗi, anh nói lại được không?","好的，你的房间号是305。祝你住得愉快！":"Phòng của anh là 305. Chúc anh ở vui vẻ!",
  "你好！有什么可以帮你的？":"Xin chào! Tôi có thể giúp gì cho anh?","好的，没问题！再见！":"Được, không vấn đề! Tạm biệt!","请再说一遍？":"Anh vui lòng nói lại được không?",
};

const glossVi: Record<string,string> = {
  "I want":"tôi muốn","one cup":"một ly",hot:"nóng",latte:"latte",please:"vui lòng","give me":"cho tôi",coffee:"cà phê","hot one":"loại nóng",
  not:"không",add:"thêm",ice:"đá","lemon tea":"trà chanh","no ice":"không đá","remove ice":"bỏ đá","pay the bill":"thanh toán","may I ask":"xin hỏi",
  "how much":"bao nhiêu",money:"tiền",can:"có thể",WeChat:"WeChat",pay:"thanh toán","?":"?","pack up / takeaway":"đóng gói / mang đi","take away":"mang đi",
  "one portion":"một phần","Kung Pao Chicken":"gà Cung Bảo",takeaway:"mang đi","don't want":"không muốn",too:"quá",spicy:"cay","to go to":"đi đến",Tiananmen:"Thiên An Môn",
  driver:"bác tài","go to":"đi đến",this:"này",place:"địa điểm","subway station":"ga tàu điện ngầm",drive:"lái xe","a bit slower":"chậm hơn một chút",fast:"nhanh",
  "(emphasis)":"(nhấn mạnh)","okay?":"được không?",at:"ở",here:"đây",stop:"dừng",ahead:"phía trước",intersection:"giao lộ","stop for a moment":"dừng một chút",
  arrived:"đến rồi","thank you":"cảm ơn","excuse me":"xin hỏi / làm phiền","is at":"ở",where:"đâu",how:"như thế nào","walk/go":"đi",thank:"cảm ơn",you:"bạn",
  "still have":"còn","how far":"bao xa",walk:"đi bộ",need:"cần","how long":"bao lâu",time:"thời gian",far:"xa","go left":"đi trái",or:"hay","go right":"đi phải",
  straight:"thẳng",go:"đi","traffic light":"đèn giao thông",there:"đó","turn left":"rẽ trái",hello:"xin chào",I:"tôi","am called":"tên là",very:"rất",happy:"vui",
  meet:"gặp",call:"gọi",me:"tôi",am:"là",America:"Mỹ",person:"người",from:"từ",France:"Pháp",come:"đến",China:"Trung Quốc","three months":"ba tháng",
  "(already)":"(đã rồi)",teacher:"giáo viên","a company":"một công ty",work:"làm việc",do:"làm",IT:"công nghệ thông tin","(marker)":"(trợ từ)",we:"chúng ta",
  "add a":"thêm / kết bạn","(suggestion)":"(đề nghị)",your:"của bạn","WeChat ID":"tài khoản WeChat",is:"là",what:"gì",scan:"quét",my:"của tôi","QR code":"mã QR",
  together:"cùng nhau",eat:"ăn",tomorrow:"ngày mai",evening:"buổi tối",free:"rảnh",want:"muốn",treat:"mời / trả tiền",like:"thích",running:"chạy bộ",usually:"thường",
  also:"cũng",morning:"buổi sáng",good:"tốt",eaten:"ăn rồi",weekend:"cuối tuần",spent:"trải qua",help:"giúp","a moment":"một chút",trouble:"làm phiền",
  "not really":"không lắm",understand:"hiểu","set a":"hẹn một","have meeting":"họp",afternoon:"buổi chiều",roughly:"khoảng","half a":"nửa",hour:"giờ",
  "meeting room":"phòng họp",online:"trực tuyến",today:"hôm nay",body:"cơ thể","not comfortable":"không khỏe","take leave":"xin nghỉ",request:"xin / yêu cầu",
  "one day":"một ngày","sick leave":"nghỉ bệnh","hand over to":"bàn giao cho","Xiao Li":"Tiểu Lý",
};

const noteVi: Record<string,string> = {
  "Use when the barista asks about temperature":"Dùng khi nhân viên hỏi anh muốn nóng hay lạnh.","Common shorthand used at drink shops":"Cách nói ngắn thường gặp tại quán đồ uống.",
  "WeChat Pay is extremely common in China":"WeChat Pay rất phổ biến tại Trung Quốc.","师傅 (shī fu) is the common way to address a taxi driver":"师傅 (shīfu) là cách xưng hô thông dụng với tài xế.",
  "A-not-A question pattern, very common in spoken Chinese":"Mẫu câu hỏi A-không-A rất phổ biến trong khẩu ngữ.","Casual way to describe your field":"Cách nói thân mật để giới thiệu lĩnh vực nghề nghiệp.",
  "QR code scanning is the most common way to add WeChat contacts":"Quét mã QR là cách phổ biến nhất để thêm WeChat.","Offering to pay is a common social gesture in China":"Chủ động mời trả tiền là phép xã giao thường gặp.",
  "A very common casual greeting in Chinese, not a literal question about food":"Câu chào thân mật, không nhất thiết hỏi thật về ăn uống.","Polite phrase used when asking for help":"Cách nói lịch sự khi nhờ giúp đỡ.",
};

const openingVi: Record<string,string> = {
  "Hi! What would you like to order?":"Xin chào! Anh muốn gọi món gì?","Welcome! What would you like to drink?":"Chào mừng anh! Anh muốn uống gì?",
  "Hello, can I help you with anything?":"Xin chào, tôi có thể giúp gì cho anh?","Hi, eating here or takeaway?":"Anh dùng tại chỗ hay mang đi?","Where to?":"Anh đi đâu?",
  "In a hurry, right? I'll take a shortcut!":"Anh đang vội phải không? Tôi đi đường tắt nhé!","Almost there, right?":"Sắp đến rồi phải không?","Hm? What did you say?":"Hả? Anh vừa nói gì?",
  "Hi, what place are you looking for?":"Anh đang tìm địa điểm nào?","Are you lost? Where are you going?":"Anh bị lạc à? Anh muốn đi đâu?",
  "Hello! My name is Xiao Ming. What's your name?":"Xin chào! Tôi tên Tiểu Minh. Anh tên gì?","Where are you from?":"Anh đến từ đâu?","What do you do in China?":"Anh làm công việc gì ở Trung Quốc?",
  "It's been great chatting with you! By the way...":"Nói chuyện với anh rất vui! À mà…","I've been so busy lately, haven't had a proper meal.":"Dạo này tôi bận quá, chưa có bữa ăn tử tế.",
  "What do you like to do in your free time?":"Lúc rảnh anh thích làm gì?","Morning!":"Chào buổi sáng!","What's up? What do you need?":"Có chuyện gì vậy? Anh cần gì?",
  "You're looking for me? What's up?":"Anh tìm tôi à? Có việc gì vậy?","Good morning. What's wrong? You don't look well.":"Chào buổi sáng. Trông anh không khỏe, có chuyện gì vậy?",
};

export const getScenarioNameVi=(s:Pick<Scenario,"id"|"nameEn">)=>scenarioVi[s.id]?.name||s.nameEn;
export const getMissionTitleVi=(m:Pick<Mission,"id"|"titleEn">)=>missionVi[m.id]?.title||m.titleEn;
export const getMissionObjectiveVi=(m:Pick<Mission,"id"|"objectiveEn">)=>missionVi[m.id]?.objective||m.objectiveEn;
export const getRoleVi=(m:Pick<Mission,"npcPersona">)=>m.npcPersona.roleVi||roleVi[m.npcPersona.roleEn]||m.npcPersona.roleEn;
export const getOpeningVi=(m:Pick<Mission,"npcPersona">)=>m.npcPersona.openingLineVi||openingVi[m.npcPersona.openingLineEn]||m.npcPersona.openingLineEn;
export const getNaturalVi=(g:Pick<GlossItem,"hanzi"|"naturalVi"|"naturalEn">)=>g.naturalVi||naturalVi[g.hanzi]||g.naturalEn;
export const getGlossVi=(g:Pick<GlossItem,"gloss"|"glossVi">)=>g.glossVi||g.gloss.map(x=>glossVi[x]||x);
export const getNoteVi=(g:Pick<GlossItem,"note"|"noteVi">)=>g.noteVi||(g.note?noteVi[g.note]||g.note:undefined);
export const getSlotVi=(slot:string)=>slotVi[slot]||slot.replace(/_/g," ");
export const getStyleVi=(_style:string)=>"Thân thiện, kiên nhẫn và sử dụng câu ngắn, rõ ràng";
export const translateKnownChineseVi=(text:string,fallback="")=>naturalVi[text.trim()]||openingVi[text.trim()]||fallback;
