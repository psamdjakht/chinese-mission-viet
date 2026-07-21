import type { GlossItem, Mission, Scenario } from "@/lib/types";

type Level = Mission["level"];
type Reply = { cn: string; vi: string; en: string };
type PatternSeed = {
  hanzi: string;
  pinyin: string;
  vi: string;
  en: string;
  chunks: string[];
  glossVi: string[];
  noteVi?: string;
};
type MissionSeed = {
  id: string;
  scenarioId: string;
  code: string;
  title: string;
  titleVi: string;
  titleEn: string;
  objective: string;
  objectiveVi: string;
  objectiveEn: string;
  level: Level;
  minutes: number;
  required: string[];
  optional?: string[];
  patterns: PatternSeed[];
  role: string;
  roleVi: string;
  roleEn: string;
  opening: Reply;
  completion: Reply;
};

const g = (seed: PatternSeed, level: Level): GlossItem => ({
  hanzi: seed.hanzi,
  pinyin: seed.pinyin,
  chunks: seed.chunks,
  gloss: seed.glossVi,
  glossVi: seed.glossVi,
  naturalEn: seed.en,
  naturalVi: seed.vi,
  noteVi: seed.noteVi,
  level,
});

const mission = (seed: MissionSeed): Mission => ({
  id: seed.id,
  scenarioId: seed.scenarioId,
  code: seed.code,
  title: seed.title,
  titleVi: seed.titleVi,
  titleEn: seed.titleEn,
  objective: seed.objective,
  objectiveVi: seed.objectiveVi,
  objectiveEn: seed.objectiveEn,
  level: seed.level,
  estimatedMinutes: seed.minutes,
  requiredSlots: seed.required,
  optionalSlots: seed.optional || [],
  warmupPatterns: seed.patterns.map((pattern) => g(pattern, seed.level)),
  states: [
    { code: "start", name: "开始", nameEn: "Start", allowedNextStates: ["collect"], requiredSlotsInState: [], hintPolicy: { defaultLevel: 0 } },
    { code: "collect", name: "说明需求", nameEn: "Explain Need", allowedNextStates: ["confirm"], requiredSlotsInState: seed.required.slice(0, 1), hintPolicy: { defaultLevel: 1 } },
    { code: "confirm", name: "确认细节", nameEn: "Confirm Details", allowedNextStates: ["complete"], requiredSlotsInState: seed.required, hintPolicy: { defaultLevel: 1 } },
    { code: "complete", name: "完成", nameEn: "Complete", allowedNextStates: [], requiredSlotsInState: [], hintPolicy: { defaultLevel: 0 } },
  ],
  npcPersona: {
    role: seed.role,
    roleVi: seed.roleVi,
    roleEn: seed.roleEn,
    style: "friendly, practical, patient, uses short natural sentences",
    openingLine: seed.opening.cn,
    openingLineVi: seed.opening.vi,
    openingLineEn: seed.opening.en,
  },
  ruleSupport: { completion: seed.completion },
});

const shopping: Mission[] = [
  mission({
    id:"m21",scenarioId:"s7",code:"ask_price_discount",title:"询问价格和优惠",titleVi:"Hỏi giá và chương trình ưu đãi",titleEn:"Ask the Price and Discount",objective:"询问商品价格并了解有没有优惠",objectiveVi:"Hỏi giá sản phẩm và kiểm tra có ưu đãi hay không.",objectiveEn:"Ask the product price and whether a discount is available.",level:"A0",minutes:6,required:["price_query","discount_query"],optional:["quantity"],role:"商店店员",roleVi:"Nhân viên cửa hàng",roleEn:"Shop Assistant",opening:{cn:"你好，需要我帮你介绍一下吗？",vi:"Xin chào, bạn có cần tôi giới thiệu sản phẩm không?",en:"Hello, would you like some help?"},completion:{cn:"这个一百二十块，今天打九折。",vi:"Món này 120 tệ, hôm nay được giảm 10%.",en:"This is 120 yuan and is 10% off today."},patterns:[
      {hanzi:"这个多少钱？",pinyin:"zhè ge duō shao qián?",vi:"Món này bao nhiêu tiền?",en:"How much is this?",chunks:["这个","多少钱"],glossVi:["món này","bao nhiêu tiền"]},
      {hanzi:"有优惠吗？",pinyin:"yǒu yōu huì ma?",vi:"Có ưu đãi không?",en:"Is there a discount?",chunks:["有","优惠","吗"],glossVi:["có","ưu đãi","không"]},
      {hanzi:"买两个便宜一点吗？",pinyin:"mǎi liǎng ge pián yi yì diǎn ma?",vi:"Mua hai món có rẻ hơn một chút không?",en:"Would two be a little cheaper?",chunks:["买两个","便宜一点","吗"],glossVi:["mua hai món","rẻ hơn một chút","không"]},
    ]}),
  mission({
    id:"m22",scenarioId:"s7",code:"try_clothes_size",title:"试衣服和换尺码",titleVi:"Thử quần áo và đổi kích cỡ",titleEn:"Try Clothes and Change Size",objective:"请求试穿并找到合适的尺码",objectiveVi:"Xin thử đồ và hỏi kích cỡ phù hợp hơn.",objectiveEn:"Ask to try on clothes and find the right size.",level:"A1",minutes:7,required:["try_on_request","size_request"],optional:["color_request"],role:"服装店店员",roleVi:"Nhân viên cửa hàng quần áo",roleEn:"Clothing Store Assistant",opening:{cn:"欢迎光临，你想看看哪一件？",vi:"Chào mừng bạn, bạn muốn xem món nào?",en:"Welcome, which item would you like to see?"},completion:{cn:"可以，试衣间在右边。我给你拿大一号。",vi:"Được, phòng thử đồ ở bên phải. Tôi lấy cho bạn cỡ lớn hơn một số.",en:"Sure, the fitting room is on the right. I will get one size larger."},patterns:[
      {hanzi:"我可以试一下吗？",pinyin:"wǒ kě yǐ shì yí xià ma?",vi:"Tôi có thể thử một chút không?",en:"May I try it on?",chunks:["我可以","试一下","吗"],glossVi:["tôi có thể","thử một chút","không"]},
      {hanzi:"有大一号的吗？",pinyin:"yǒu dà yí hào de ma?",vi:"Có cỡ lớn hơn một số không?",en:"Do you have one size larger?",chunks:["有","大一号的","吗"],glossVi:["có","cỡ lớn hơn một số","không"]},
      {hanzi:"这个颜色还有别的吗？",pinyin:"zhè ge yán sè hái yǒu bié de ma?",vi:"Màu này còn màu khác không?",en:"Does this come in another color?",chunks:["这个颜色","还有","别的吗"],glossVi:["màu này","còn có","màu khác không"]},
    ]}),
  mission({
    id:"m23",scenarioId:"s7",code:"pay_and_invoice",title:"付款和开发票",titleVi:"Thanh toán và xin hóa đơn",titleEn:"Pay and Request an Invoice",objective:"选择付款方式并索要发票或收据",objectiveVi:"Chọn cách thanh toán và yêu cầu hóa đơn hoặc biên nhận.",objectiveEn:"Choose a payment method and request an invoice or receipt.",level:"A1",minutes:6,required:["payment_method","receipt_request"],optional:["invoice_title"],role:"收银员",roleVi:"Nhân viên thu ngân",roleEn:"Cashier",opening:{cn:"一共二百八十块，请问怎么付款？",vi:"Tổng cộng 280 tệ, bạn muốn thanh toán thế nào?",en:"The total is 280 yuan. How would you like to pay?"},completion:{cn:"付款成功。这是你的发票，请收好。",vi:"Thanh toán thành công. Đây là hóa đơn của bạn, vui lòng giữ kỹ.",en:"Payment successful. Here is your invoice."},patterns:[
      {hanzi:"我用支付宝付款。",pinyin:"wǒ yòng zhī fù bǎo fù kuǎn",vi:"Tôi thanh toán bằng Alipay.",en:"I will pay with Alipay.",chunks:["我用","支付宝","付款"],glossVi:["tôi dùng","Alipay","thanh toán"]},
      {hanzi:"可以开发票吗？",pinyin:"kě yǐ kāi fā piào ma?",vi:"Có thể xuất hóa đơn không?",en:"Can you issue an invoice?",chunks:["可以","开发票","吗"],glossVi:["có thể","xuất hóa đơn","không"]},
      {hanzi:"请给我一张收据。",pinyin:"qǐng gěi wǒ yì zhāng shōu jù",vi:"Vui lòng cho tôi một biên nhận.",en:"Please give me a receipt.",chunks:["请给我","一张","收据"],glossVi:["vui lòng cho tôi","một tờ","biên nhận"]},
    ]}),
  mission({
    id:"m24",scenarioId:"s7",code:"return_exchange_item",title:"退换商品",titleVi:"Đổi hoặc trả sản phẩm",titleEn:"Return or Exchange an Item",objective:"说明商品问题并提出退货或换货",objectiveVi:"Mô tả vấn đề của sản phẩm và yêu cầu đổi hoặc hoàn tiền.",objectiveEn:"Explain the product problem and request a return or exchange.",level:"A2",minutes:8,required:["return_reason","return_request"],optional:["purchase_proof"],role:"售后服务人员",roleVi:"Nhân viên chăm sóc sau bán hàng",roleEn:"Customer Service Staff",opening:{cn:"你好，请问商品有什么问题？",vi:"Xin chào, sản phẩm có vấn đề gì?",en:"Hello, what is wrong with the item?"},completion:{cn:"可以，请出示小票。我们给你换一个新的。",vi:"Được, vui lòng xuất trình hóa đơn. Chúng tôi sẽ đổi sản phẩm mới cho bạn.",en:"Sure, please show the receipt. We will exchange it for a new one."},patterns:[
      {hanzi:"这个有问题。",pinyin:"zhè ge yǒu wèn tí",vi:"Món này có vấn đề.",en:"There is a problem with this item.",chunks:["这个","有问题"],glossVi:["món này","có vấn đề"]},
      {hanzi:"我想换一个新的。",pinyin:"wǒ xiǎng huàn yí ge xīn de",vi:"Tôi muốn đổi một món mới.",en:"I would like to exchange it for a new one.",chunks:["我想","换一个","新的"],glossVi:["tôi muốn","đổi một món","mới"]},
      {hanzi:"如果不能换，可以退款吗？",pinyin:"rú guǒ bù néng huàn, kě yǐ tuì kuǎn ma?",vi:"Nếu không thể đổi, có thể hoàn tiền không?",en:"If it cannot be exchanged, can I get a refund?",chunks:["如果不能换","可以","退款吗"],glossVi:["nếu không thể đổi","có thể","hoàn tiền không"]},
    ]}),
];

const hotel: Mission[] = [
  mission({id:"m25",scenarioId:"s8",code:"hotel_check_in",title:"办理酒店入住",titleVi:"Làm thủ tục nhận phòng khách sạn",titleEn:"Check In at a Hotel",objective:"用预订姓名和护照办理入住",objectiveVi:"Dùng tên đặt phòng và hộ chiếu để làm thủ tục nhận phòng.",objectiveEn:"Check in using the reservation name and passport.",level:"A0",minutes:7,required:["reservation_name","passport"],optional:["nights"],role:"酒店前台",roleVi:"Nhân viên lễ tân khách sạn",roleEn:"Hotel Receptionist",opening:{cn:"你好，欢迎光临。请问有预订吗？",vi:"Xin chào, chào mừng bạn. Bạn có đặt phòng trước không?",en:"Hello, welcome. Do you have a reservation?"},completion:{cn:"入住办好了。你的房间是八零六，电梯在左边。",vi:"Thủ tục đã xong. Phòng của bạn là 806, thang máy ở bên trái.",en:"Check-in is complete. Your room is 806 and the elevator is on the left."},patterns:[
    {hanzi:"我有预订，名字是林先生。",pinyin:"wǒ yǒu yù dìng, míng zi shì Lín xiān sheng",vi:"Tôi có đặt phòng, tên là ông Lâm.",en:"I have a reservation under Mr. Lin.",chunks:["我有预订","名字是","林先生"],glossVi:["tôi có đặt phòng","tên là","ông Lâm"]},
    {hanzi:"这是我的护照。",pinyin:"zhè shì wǒ de hù zhào",vi:"Đây là hộ chiếu của tôi.",en:"Here is my passport.",chunks:["这是","我的","护照"],glossVi:["đây là","của tôi","hộ chiếu"]},
    {hanzi:"我住三晚。",pinyin:"wǒ zhù sān wǎn",vi:"Tôi ở ba đêm.",en:"I am staying for three nights.",chunks:["我住","三晚"],glossVi:["tôi ở","ba đêm"]},
  ]}),
  mission({id:"m26",scenarioId:"s8",code:"ask_hotel_services",title:"询问无线网和早餐",titleVi:"Hỏi Wi-Fi và bữa sáng",titleEn:"Ask About Wi-Fi and Breakfast",objective:"询问无线网密码和早餐时间地点",objectiveVi:"Hỏi mật khẩu Wi-Fi, thời gian và địa điểm ăn sáng.",objectiveEn:"Ask for the Wi-Fi password and breakfast time and location.",level:"A1",minutes:6,required:["wifi_query","breakfast_query"],optional:["checkout_time"],role:"酒店前台",roleVi:"Nhân viên lễ tân khách sạn",roleEn:"Hotel Receptionist",opening:{cn:"你好，还有什么可以帮你？",vi:"Xin chào, tôi còn có thể giúp gì cho bạn?",en:"Hello, how else can I help you?"},completion:{cn:"无线网密码在房卡上。早餐七点到十点，在二楼。",vi:"Mật khẩu Wi-Fi nằm trên thẻ phòng. Bữa sáng từ 7 giờ đến 10 giờ ở tầng hai.",en:"The Wi-Fi password is on the room card. Breakfast is from 7 to 10 on the second floor."},patterns:[
    {hanzi:"请问无线网密码是什么？",pinyin:"qǐng wèn wú xiàn wǎng mì mǎ shì shén me?",vi:"Xin hỏi mật khẩu Wi-Fi là gì?",en:"What is the Wi-Fi password?",chunks:["请问","无线网密码","是什么"],glossVi:["xin hỏi","mật khẩu Wi-Fi","là gì"]},
    {hanzi:"早餐几点开始？",pinyin:"zǎo cān jǐ diǎn kāi shǐ?",vi:"Bữa sáng bắt đầu lúc mấy giờ?",en:"What time does breakfast start?",chunks:["早餐","几点","开始"],glossVi:["bữa sáng","mấy giờ","bắt đầu"]},
    {hanzi:"早餐在几楼？",pinyin:"zǎo cān zài jǐ lóu?",vi:"Bữa sáng ở tầng mấy?",en:"Which floor is breakfast on?",chunks:["早餐","在","几楼"],glossVi:["bữa sáng","ở","tầng mấy"]},
  ]}),
  mission({id:"m27",scenarioId:"s8",code:"report_room_problem",title:"报告房间问题",titleVi:"Báo sự cố trong phòng",titleEn:"Report a Room Problem",objective:"说明空调或热水问题并请求维修",objectiveVi:"Báo vấn đề về điều hòa hoặc nước nóng và yêu cầu xử lý.",objectiveEn:"Report an air-conditioning or hot-water problem and request service.",level:"A1",minutes:7,required:["room_problem","repair_request"],optional:["room_number"],role:"酒店客服",roleVi:"Nhân viên dịch vụ khách sạn",roleEn:"Hotel Service Desk",opening:{cn:"您好，前台。请问有什么问题？",vi:"Xin chào, đây là lễ tân. Bạn gặp vấn đề gì?",en:"Hello, front desk. What seems to be the problem?"},completion:{cn:"很抱歉，我们马上派人去检查。",vi:"Rất xin lỗi, chúng tôi sẽ cử người lên kiểm tra ngay.",en:"We are sorry. We will send someone to check immediately."},patterns:[
    {hanzi:"房间的空调不工作。",pinyin:"fáng jiān de kōng tiáo bù gōng zuò",vi:"Điều hòa trong phòng không hoạt động.",en:"The air conditioner in the room is not working.",chunks:["房间的空调","不工作"],glossVi:["điều hòa trong phòng","không hoạt động"]},
    {hanzi:"浴室没有热水。",pinyin:"yù shì méi yǒu rè shuǐ",vi:"Phòng tắm không có nước nóng.",en:"There is no hot water in the bathroom.",chunks:["浴室","没有","热水"],glossVi:["phòng tắm","không có","nước nóng"]},
    {hanzi:"请派人来看一下。",pinyin:"qǐng pài rén lái kàn yí xià",vi:"Vui lòng cử người đến kiểm tra.",en:"Please send someone to take a look.",chunks:["请派人","来看一下"],glossVi:["vui lòng cử người","đến kiểm tra"]},
  ]}),
  mission({id:"m28",scenarioId:"s8",code:"hotel_checkout_luggage",title:"退房和寄存行李",titleVi:"Trả phòng và gửi hành lý",titleEn:"Check Out and Store Luggage",objective:"办理退房并请求暂时寄存行李",objectiveVi:"Làm thủ tục trả phòng và nhờ giữ hành lý tạm thời.",objectiveEn:"Check out and ask the hotel to store luggage temporarily.",level:"A2",minutes:7,required:["checkout_request","luggage_storage"],optional:["pickup_time"],role:"酒店前台",roleVi:"Nhân viên lễ tân khách sạn",roleEn:"Hotel Receptionist",opening:{cn:"早上好，请问要退房吗？",vi:"Chào buổi sáng, bạn muốn trả phòng phải không?",en:"Good morning. Are you checking out?"},completion:{cn:"退房完成。行李可以免费寄存到晚上六点。",vi:"Đã trả phòng xong. Hành lý có thể gửi miễn phí đến 6 giờ tối.",en:"Check-out is complete. Luggage can be stored free until 6 p.m."},patterns:[
    {hanzi:"我要退房。",pinyin:"wǒ yào tuì fáng",vi:"Tôi muốn trả phòng.",en:"I would like to check out.",chunks:["我要","退房"],glossVi:["tôi muốn","trả phòng"]},
    {hanzi:"可以寄存行李吗？",pinyin:"kě yǐ jì cún xíng li ma?",vi:"Có thể gửi hành lý không?",en:"Can I store my luggage?",chunks:["可以","寄存行李","吗"],glossVi:["có thể","gửi hành lý","không"]},
    {hanzi:"我下午五点来取。",pinyin:"wǒ xià wǔ wǔ diǎn lái qǔ",vi:"Tôi sẽ quay lại lấy lúc 5 giờ chiều.",en:"I will pick it up at 5 p.m.",chunks:["我","下午五点","来取"],glossVi:["tôi","5 giờ chiều","đến lấy"]},
  ]}),
];

const airportTrain: Mission[] = [
  mission({id:"m29",scenarioId:"s9",code:"airport_checkin",title:"机场值机和托运行李",titleVi:"Làm thủ tục chuyến bay và ký gửi hành lý",titleEn:"Airport Check-in and Baggage",objective:"确认航班并办理行李托运",objectiveVi:"Xác nhận chuyến bay và làm thủ tục ký gửi hành lý.",objectiveEn:"Confirm the flight and check in baggage.",level:"A1",minutes:8,required:["flight_info","baggage_checkin"],optional:["seat_preference"],role:"航空公司值机员",roleVi:"Nhân viên quầy làm thủ tục hàng không",roleEn:"Airline Check-in Agent",opening:{cn:"您好，请出示护照和机票。",vi:"Xin chào, vui lòng xuất trình hộ chiếu và vé máy bay.",en:"Hello, please show your passport and ticket."},completion:{cn:"手续办好了。这是登机牌，行李已经托运。",vi:"Thủ tục đã xong. Đây là thẻ lên máy bay, hành lý đã được ký gửi.",en:"Check-in is complete. Here is your boarding pass and your baggage is checked."},patterns:[
    {hanzi:"我坐今天去上海的航班。",pinyin:"wǒ zuò jīn tiān qù Shàng hǎi de háng bān",vi:"Tôi đi chuyến bay hôm nay đến Thượng Hải.",en:"I am on today's flight to Shanghai.",chunks:["我坐","今天去上海的","航班"],glossVi:["tôi đi","hôm nay đến Thượng Hải","chuyến bay"]},
    {hanzi:"这个箱子要托运。",pinyin:"zhè ge xiāng zi yào tuō yùn",vi:"Vali này cần ký gửi.",en:"This suitcase needs to be checked.",chunks:["这个箱子","要","托运"],glossVi:["vali này","cần","ký gửi"]},
    {hanzi:"可以安排靠窗的座位吗？",pinyin:"kě yǐ ān pái kào chuāng de zuò wèi ma?",vi:"Có thể xếp cho tôi ghế gần cửa sổ không?",en:"Could I have a window seat?",chunks:["可以安排","靠窗的座位","吗"],glossVi:["có thể sắp xếp","ghế gần cửa sổ","không"]},
  ]}),
  mission({id:"m30",scenarioId:"s9",code:"airport_security",title:"通过机场安检",titleVi:"Qua cửa kiểm tra an ninh sân bay",titleEn:"Pass Airport Security",objective:"听懂安检要求并说明随身物品",objectiveVi:"Hiểu yêu cầu kiểm tra và giải thích đồ mang theo.",objectiveEn:"Understand security instructions and explain carry-on items.",level:"A1",minutes:7,required:["security_instruction","item_declaration"],optional:["liquid_question"],role:"安检人员",roleVi:"Nhân viên an ninh sân bay",roleEn:"Security Officer",opening:{cn:"请把电脑和液体拿出来。",vi:"Vui lòng lấy máy tính và chất lỏng ra ngoài.",en:"Please take out your laptop and liquids."},completion:{cn:"好的，没有问题。请拿好东西继续往前走。",vi:"Được, không có vấn đề. Vui lòng lấy đồ và đi tiếp.",en:"All clear. Please take your belongings and proceed."},patterns:[
    {hanzi:"电脑要单独拿出来吗？",pinyin:"diàn nǎo yào dān dú ná chū lái ma?",vi:"Máy tính có cần lấy riêng ra không?",en:"Does the laptop need to be taken out separately?",chunks:["电脑","要单独","拿出来吗"],glossVi:["máy tính","cần riêng","lấy ra không"]},
    {hanzi:"我包里有充电宝。",pinyin:"wǒ bāo lǐ yǒu chōng diàn bǎo",vi:"Trong túi tôi có pin sạc dự phòng.",en:"I have a power bank in my bag.",chunks:["我包里","有","充电宝"],glossVi:["trong túi tôi","có","pin sạc dự phòng"]},
    {hanzi:"这瓶水可以带进去吗？",pinyin:"zhè píng shuǐ kě yǐ dài jìn qù ma?",vi:"Chai nước này có thể mang vào không?",en:"Can I take this bottle of water inside?",chunks:["这瓶水","可以","带进去吗"],glossVi:["chai nước này","có thể","mang vào không"]},
  ]}),
  mission({id:"m31",scenarioId:"s9",code:"find_gate_delay",title:"找登机口和确认延误",titleVi:"Tìm cửa lên máy bay và xác nhận hoãn chuyến",titleEn:"Find the Gate and Confirm a Delay",objective:"询问登机口并确认航班是否延误",objectiveVi:"Hỏi vị trí cửa lên máy bay và xác nhận chuyến bay có bị hoãn không.",objectiveEn:"Ask for the gate location and confirm whether the flight is delayed.",level:"A1",minutes:7,required:["gate_query","delay_query"],optional:["boarding_time"],role:"机场服务人员",roleVi:"Nhân viên hỗ trợ sân bay",roleEn:"Airport Information Staff",opening:{cn:"你好，请问需要什么帮助？",vi:"Xin chào, bạn cần hỗ trợ gì?",en:"Hello, how can I help?"},completion:{cn:"你的登机口是二十五号，航班延误四十分钟。",vi:"Cửa lên máy bay của bạn là số 25, chuyến bay bị hoãn 40 phút.",en:"Your gate is 25 and the flight is delayed by 40 minutes."},patterns:[
    {hanzi:"请问二十五号登机口怎么走？",pinyin:"qǐng wèn èr shí wǔ hào dēng jī kǒu zěn me zǒu?",vi:"Xin hỏi đi đến cửa lên máy bay số 25 thế nào?",en:"How do I get to gate 25?",chunks:["请问","二十五号登机口","怎么走"],glossVi:["xin hỏi","cửa lên máy bay số 25","đi thế nào"]},
    {hanzi:"这个航班延误了吗？",pinyin:"zhè ge háng bān yán wù le ma?",vi:"Chuyến bay này có bị hoãn không?",en:"Is this flight delayed?",chunks:["这个航班","延误了","吗"],glossVi:["chuyến bay này","bị hoãn","không"]},
    {hanzi:"几点开始登机？",pinyin:"jǐ diǎn kāi shǐ dēng jī?",vi:"Mấy giờ bắt đầu lên máy bay?",en:"What time does boarding begin?",chunks:["几点","开始","登机"],glossVi:["mấy giờ","bắt đầu","lên máy bay"]},
  ]}),
  mission({id:"m32",scenarioId:"s9",code:"buy_train_ticket",title:"购买高铁票",titleVi:"Mua vé tàu cao tốc",titleEn:"Buy a High-speed Train Ticket",objective:"说明目的地日期并选择座位",objectiveVi:"Nói điểm đến, ngày đi và chọn loại ghế khi mua vé tàu.",objectiveEn:"State the destination and date and choose a seat when buying a train ticket.",level:"A2",minutes:8,required:["train_destination","travel_date","seat_type"],optional:["departure_time"],role:"火车站售票员",roleVi:"Nhân viên bán vé tàu",roleEn:"Train Ticket Clerk",opening:{cn:"你好，请问去哪里，哪一天？",vi:"Xin chào, bạn đi đâu và ngày nào?",en:"Hello, where are you going and on which date?"},completion:{cn:"有一张明天上午九点去杭州的二等座。",vi:"Có một vé ghế hạng hai đi Hàng Châu lúc 9 giờ sáng mai.",en:"There is a second-class ticket to Hangzhou at 9 a.m. tomorrow."},patterns:[
    {hanzi:"我要一张去杭州的高铁票。",pinyin:"wǒ yào yì zhāng qù Háng zhōu de gāo tiě piào",vi:"Tôi muốn một vé tàu cao tốc đi Hàng Châu.",en:"I would like a high-speed train ticket to Hangzhou.",chunks:["我要一张","去杭州的","高铁票"],glossVi:["tôi muốn một vé","đi Hàng Châu","tàu cao tốc"]},
    {hanzi:"明天上午出发。",pinyin:"míng tiān shàng wǔ chū fā",vi:"Khởi hành vào sáng mai.",en:"Depart tomorrow morning.",chunks:["明天上午","出发"],glossVi:["sáng mai","khởi hành"]},
    {hanzi:"我要二等座。",pinyin:"wǒ yào èr děng zuò",vi:"Tôi muốn ghế hạng hai.",en:"I would like a second-class seat.",chunks:["我要","二等座"],glossVi:["tôi muốn","ghế hạng hai"]},
  ]}),
];

const health: Mission[] = [
  mission({id:"m33",scenarioId:"s10",code:"describe_symptoms",title:"描述感冒症状",titleVi:"Mô tả triệu chứng cảm cúm",titleEn:"Describe Cold Symptoms",objective:"说明发烧咳嗽等症状和持续时间",objectiveVi:"Mô tả sốt, ho và thời gian xuất hiện triệu chứng.",objectiveEn:"Describe fever, cough, and how long the symptoms have lasted.",level:"A1",minutes:8,required:["symptom","symptom_duration"],optional:["temperature_reading"],role:"医生",roleVi:"Bác sĩ",roleEn:"Doctor",opening:{cn:"你好，哪里不舒服？",vi:"Xin chào, bạn khó chịu ở đâu?",en:"Hello, what seems to be wrong?"},completion:{cn:"你可能感冒了。我先给你检查一下。",vi:"Bạn có thể bị cảm. Tôi sẽ kiểm tra cho bạn trước.",en:"You may have a cold. Let me examine you first."},patterns:[
    {hanzi:"我发烧，而且一直咳嗽。",pinyin:"wǒ fā shāo, ér qiě yì zhí ké sou",vi:"Tôi bị sốt và ho liên tục.",en:"I have a fever and keep coughing.",chunks:["我发烧","而且","一直咳嗽"],glossVi:["tôi bị sốt","và","ho liên tục"]},
    {hanzi:"从昨天晚上开始的。",pinyin:"cóng zuó tiān wǎn shang kāi shǐ de",vi:"Bắt đầu từ tối hôm qua.",en:"It started last night.",chunks:["从昨天晚上","开始的"],glossVi:["từ tối hôm qua","bắt đầu"]},
    {hanzi:"体温是三十八度。",pinyin:"tǐ wēn shì sān shí bā dù",vi:"Nhiệt độ cơ thể là 38 độ.",en:"My temperature is 38 degrees.",chunks:["体温是","三十八度"],glossVi:["nhiệt độ là","38 độ"]},
  ]}),
  mission({id:"m34",scenarioId:"s10",code:"buy_medicine",title:"在药店买药",titleVi:"Mua thuốc tại nhà thuốc",titleEn:"Buy Medicine at a Pharmacy",objective:"说明症状并询问用法和剂量",objectiveVi:"Nói triệu chứng và hỏi cách dùng, liều dùng của thuốc.",objectiveEn:"Explain symptoms and ask about dosage and directions.",level:"A1",minutes:7,required:["medicine_need","dosage_query"],optional:["allergy_info"],role:"药店店员",roleVi:"Dược sĩ hoặc nhân viên nhà thuốc",roleEn:"Pharmacist",opening:{cn:"你好，需要买什么药？",vi:"Xin chào, bạn cần mua thuốc gì?",en:"Hello, what medicine do you need?"},completion:{cn:"这个药一天三次，每次一片，饭后吃。",vi:"Thuốc này uống ngày ba lần, mỗi lần một viên, sau bữa ăn.",en:"Take one tablet three times a day after meals."},patterns:[
    {hanzi:"我喉咙痛，想买点药。",pinyin:"wǒ hóu lóng tòng, xiǎng mǎi diǎn yào",vi:"Tôi đau họng và muốn mua thuốc.",en:"I have a sore throat and would like some medicine.",chunks:["我喉咙痛","想买点药"],glossVi:["tôi đau họng","muốn mua thuốc"]},
    {hanzi:"这个药怎么吃？",pinyin:"zhè ge yào zěn me chī?",vi:"Thuốc này dùng thế nào?",en:"How do I take this medicine?",chunks:["这个药","怎么吃"],glossVi:["thuốc này","uống thế nào"]},
    {hanzi:"一天吃几次？",pinyin:"yì tiān chī jǐ cì?",vi:"Một ngày uống mấy lần?",en:"How many times a day?",chunks:["一天","吃几次"],glossVi:["một ngày","uống mấy lần"]},
  ]}),
  mission({id:"m35",scenarioId:"s10",code:"hospital_registration",title:"医院挂号和预约",titleVi:"Đăng ký khám và đặt lịch bệnh viện",titleEn:"Register and Book a Hospital Visit",objective:"选择科室并预约看诊时间",objectiveVi:"Chọn khoa khám và đặt thời gian khám phù hợp.",objectiveEn:"Choose a department and book an appointment time.",level:"A2",minutes:8,required:["department_request","appointment_time"],optional:["insurance_question"],role:"医院挂号员",roleVi:"Nhân viên đăng ký bệnh viện",roleEn:"Hospital Registration Clerk",opening:{cn:"你好，请问要挂哪个科？",vi:"Xin chào, bạn muốn đăng ký khám khoa nào?",en:"Hello, which department do you need?"},completion:{cn:"已经帮你挂了内科，明天上午十点。",vi:"Tôi đã đăng ký khoa nội cho bạn vào 10 giờ sáng mai.",en:"You are booked for internal medicine at 10 a.m. tomorrow."},patterns:[
    {hanzi:"我想挂内科。",pinyin:"wǒ xiǎng guà nèi kē",vi:"Tôi muốn đăng ký khoa nội.",en:"I would like internal medicine.",chunks:["我想挂","内科"],glossVi:["tôi muốn đăng ký","khoa nội"]},
    {hanzi:"明天上午有号吗？",pinyin:"míng tiān shàng wǔ yǒu hào ma?",vi:"Sáng mai còn lịch khám không?",en:"Is there an appointment tomorrow morning?",chunks:["明天上午","有号吗"],glossVi:["sáng mai","còn lịch không"]},
    {hanzi:"可以用医疗保险吗？",pinyin:"kě yǐ yòng yī liáo bǎo xiǎn ma?",vi:"Có thể dùng bảo hiểm y tế không?",en:"Can I use medical insurance?",chunks:["可以用","医疗保险","吗"],glossVi:["có thể dùng","bảo hiểm y tế","không"]},
  ]}),
  mission({id:"m36",scenarioId:"s10",code:"call_emergency",title:"紧急求助和叫救护车",titleVi:"Gọi trợ giúp khẩn cấp và xe cứu thương",titleEn:"Call for Emergency Help",objective:"说明紧急情况地点并请求救护车",objectiveVi:"Nói rõ tình trạng khẩn cấp, vị trí và yêu cầu xe cứu thương.",objectiveEn:"Explain the emergency and location and request an ambulance.",level:"A2",minutes:8,required:["emergency_type","emergency_location","ambulance_request"],optional:["patient_condition"],role:"急救接线员",roleVi:"Nhân viên tổng đài cấp cứu",roleEn:"Emergency Dispatcher",opening:{cn:"这里是急救中心，请问发生了什么？",vi:"Đây là trung tâm cấp cứu, đã xảy ra chuyện gì?",en:"Emergency center. What happened?"},completion:{cn:"救护车已经出发，请保持电话畅通。",vi:"Xe cứu thương đã xuất phát, vui lòng giữ điện thoại liên lạc được.",en:"The ambulance is on the way. Please keep your phone available."},patterns:[
    {hanzi:"有人突然晕倒了。",pinyin:"yǒu rén tū rán yūn dǎo le",vi:"Có người đột nhiên ngất xỉu.",en:"Someone suddenly fainted.",chunks:["有人","突然","晕倒了"],glossVi:["có người","đột nhiên","ngất xỉu"]},
    {hanzi:"我们在人民路二十号。",pinyin:"wǒ men zài Rén mín lù èr shí hào",vi:"Chúng tôi ở số 20 đường Nhân Dân.",en:"We are at 20 Renmin Road.",chunks:["我们在","人民路二十号"],glossVi:["chúng tôi ở","số 20 đường Nhân Dân"]},
    {hanzi:"请马上派救护车。",pinyin:"qǐng mǎ shàng pài jiù hù chē",vi:"Vui lòng cử xe cứu thương đến ngay.",en:"Please send an ambulance immediately.",chunks:["请马上","派救护车"],glossVi:["vui lòng ngay lập tức","cử xe cứu thương"]},
  ]}),
];

const phoneInternet: Mission[] = [
  mission({id:"m37",scenarioId:"s11",code:"buy_sim_plan",title:"购买手机卡和流量套餐",titleVi:"Mua SIM và gói dữ liệu",titleEn:"Buy a SIM Card and Data Plan",objective:"购买手机卡并选择合适的流量套餐",objectiveVi:"Mua SIM điện thoại và chọn gói dữ liệu phù hợp.",objectiveEn:"Buy a SIM card and choose a suitable data plan.",level:"A1",minutes:7,required:["sim_request","data_plan"],optional:["validity_period"],role:"营业厅店员",roleVi:"Nhân viên cửa hàng viễn thông",roleEn:"Mobile Store Staff",opening:{cn:"你好，想办理什么业务？",vi:"Xin chào, bạn muốn đăng ký dịch vụ gì?",en:"Hello, what service would you like?"},completion:{cn:"这张卡每月有五十GB流量，可以用三十天。",vi:"SIM này có 50 GB dữ liệu mỗi tháng và dùng được 30 ngày.",en:"This SIM includes 50 GB per month and is valid for 30 days."},patterns:[
    {hanzi:"我想买一张手机卡。",pinyin:"wǒ xiǎng mǎi yì zhāng shǒu jī kǎ",vi:"Tôi muốn mua một SIM điện thoại.",en:"I would like to buy a SIM card.",chunks:["我想买","一张","手机卡"],glossVi:["tôi muốn mua","một chiếc","SIM điện thoại"]},
    {hanzi:"我需要流量多一点的套餐。",pinyin:"wǒ xū yào liú liàng duō yì diǎn de tào cān",vi:"Tôi cần gói có nhiều dữ liệu hơn một chút.",en:"I need a plan with more data.",chunks:["我需要","流量多一点的","套餐"],glossVi:["tôi cần","nhiều dữ liệu hơn","gói cước"]},
    {hanzi:"这个套餐可以用多久？",pinyin:"zhè ge tào cān kě yǐ yòng duō jiǔ?",vi:"Gói này dùng được bao lâu?",en:"How long is this plan valid?",chunks:["这个套餐","可以用","多久"],glossVi:["gói này","có thể dùng","bao lâu"]},
  ]}),
  mission({id:"m38",scenarioId:"s11",code:"topup_balance",title:"充值和查询余额",titleVi:"Nạp tiền và kiểm tra số dư",titleEn:"Top Up and Check Balance",objective:"给手机充值并查询余额和流量",objectiveVi:"Nạp tiền điện thoại và kiểm tra số dư, dung lượng còn lại.",objectiveEn:"Top up a phone and check the balance and remaining data.",level:"A1",minutes:6,required:["topup_request","balance_query"],optional:["data_balance"],role:"营业厅店员",roleVi:"Nhân viên cửa hàng viễn thông",roleEn:"Mobile Store Staff",opening:{cn:"你好，需要充值吗？",vi:"Xin chào, bạn cần nạp tiền phải không?",en:"Hello, do you need to top up?"},completion:{cn:"已经充值一百块，余额是一百二十八块。",vi:"Đã nạp 100 tệ, số dư hiện là 128 tệ.",en:"100 yuan has been added. Your balance is now 128 yuan."},patterns:[
    {hanzi:"请帮我充值一百块。",pinyin:"qǐng bāng wǒ chōng zhí yì bǎi kuài",vi:"Vui lòng giúp tôi nạp 100 tệ.",en:"Please top up 100 yuan for me.",chunks:["请帮我","充值","一百块"],glossVi:["vui lòng giúp tôi","nạp tiền","100 tệ"]},
    {hanzi:"我的余额还有多少？",pinyin:"wǒ de yú é hái yǒu duō shao?",vi:"Số dư của tôi còn bao nhiêu?",en:"How much balance do I have left?",chunks:["我的余额","还有","多少"],glossVi:["số dư của tôi","còn","bao nhiêu"]},
    {hanzi:"还剩多少流量？",pinyin:"hái shèng duō shao liú liàng?",vi:"Còn lại bao nhiêu dữ liệu?",en:"How much data is left?",chunks:["还剩","多少","流量"],glossVi:["còn lại","bao nhiêu","dữ liệu"]},
  ]}),
  mission({id:"m39",scenarioId:"s11",code:"wifi_connection",title:"询问无线网和解决连接问题",titleVi:"Hỏi Wi-Fi và xử lý lỗi kết nối",titleEn:"Ask for Wi-Fi and Fix a Connection Problem",objective:"获取密码并说明无法连接的问题",objectiveVi:"Xin mật khẩu Wi-Fi và báo lỗi không thể kết nối.",objectiveEn:"Get the Wi-Fi password and explain a connection problem.",level:"A1",minutes:7,required:["wifi_password","connection_problem"],optional:["network_name"],role:"场所工作人员",roleVi:"Nhân viên tại địa điểm",roleEn:"Venue Staff",opening:{cn:"你好，有什么可以帮你的？",vi:"Xin chào, tôi có thể giúp gì cho bạn?",en:"Hello, how can I help you?"},completion:{cn:"网络名称是Guest，密码是八个八。请重新连接。",vi:"Tên mạng là Guest, mật khẩu là tám số 8. Bạn hãy kết nối lại.",en:"The network is Guest and the password is eight eights. Please reconnect."},patterns:[
    {hanzi:"请问这里有无线网吗？",pinyin:"qǐng wèn zhè lǐ yǒu wú xiàn wǎng ma?",vi:"Xin hỏi ở đây có Wi-Fi không?",en:"Is there Wi-Fi here?",chunks:["请问","这里有","无线网吗"],glossVi:["xin hỏi","ở đây có","Wi-Fi không"]},
    {hanzi:"无线网密码是什么？",pinyin:"wú xiàn wǎng mì mǎ shì shén me?",vi:"Mật khẩu Wi-Fi là gì?",en:"What is the Wi-Fi password?",chunks:["无线网密码","是什么"],glossVi:["mật khẩu Wi-Fi","là gì"]},
    {hanzi:"我连不上网络。",pinyin:"wǒ lián bu shàng wǎng luò",vi:"Tôi không kết nối được mạng.",en:"I cannot connect to the network.",chunks:["我","连不上","网络"],glossVi:["tôi","không kết nối được","mạng"]},
  ]}),
];

const dailyLife: Mission[] = [
  mission({id:"m40",scenarioId:"s12",code:"supermarket_find_product",title:"在超市找商品",titleVi:"Tìm sản phẩm trong siêu thị",titleEn:"Find a Product in a Supermarket",objective:"询问商品位置并确认数量或规格",objectiveVi:"Hỏi vị trí sản phẩm và xác nhận số lượng hoặc quy cách.",objectiveEn:"Ask where a product is and confirm its quantity or size.",level:"A0",minutes:6,required:["product_query","quantity"],optional:["brand_preference"],role:"超市工作人员",roleVi:"Nhân viên siêu thị",roleEn:"Supermarket Staff",opening:{cn:"你好，需要找什么东西？",vi:"Xin chào, bạn đang tìm sản phẩm gì?",en:"Hello, what are you looking for?"},completion:{cn:"牛奶在第三排。这个包装有六盒。",vi:"Sữa ở dãy thứ ba. Gói này có sáu hộp.",en:"Milk is in aisle three. This pack contains six cartons."},patterns:[
    {hanzi:"请问牛奶在哪里？",pinyin:"qǐng wèn niú nǎi zài nǎ lǐ?",vi:"Xin hỏi sữa ở đâu?",en:"Where is the milk?",chunks:["请问","牛奶","在哪里"],glossVi:["xin hỏi","sữa","ở đâu"]},
    {hanzi:"我要六盒。",pinyin:"wǒ yào liù hé",vi:"Tôi muốn sáu hộp.",en:"I would like six cartons.",chunks:["我要","六盒"],glossVi:["tôi muốn","sáu hộp"]},
    {hanzi:"有小包装的吗？",pinyin:"yǒu xiǎo bāo zhuāng de ma?",vi:"Có gói nhỏ không?",en:"Do you have a smaller package?",chunks:["有","小包装的","吗"],glossVi:["có","loại gói nhỏ","không"]},
  ]}),
  mission({id:"m41",scenarioId:"s12",code:"receive_delivery",title:"接收外卖和快递",titleVi:"Nhận đồ ăn giao tận nơi và bưu kiện",titleEn:"Receive Food Delivery and Parcels",objective:"确认地址并和配送员约定交付地点",objectiveVi:"Xác nhận địa chỉ và thống nhất vị trí nhận hàng với người giao.",objectiveEn:"Confirm the address and arrange a delivery location.",level:"A1",minutes:7,required:["delivery_address","delivery_location"],optional:["contact_instruction"],role:"配送员",roleVi:"Nhân viên giao hàng",roleEn:"Delivery Driver",opening:{cn:"你好，你的外卖到了。你在哪里？",vi:"Xin chào, đơn hàng của bạn đã đến. Bạn đang ở đâu?",en:"Hello, your delivery has arrived. Where are you?"},completion:{cn:"好的，我把东西放在一楼前台。",vi:"Được, tôi sẽ để hàng tại quầy lễ tân tầng một.",en:"Okay, I will leave it at the first-floor reception desk."},patterns:[
    {hanzi:"地址是幸福路十八号。",pinyin:"dì zhǐ shì Xìng fú lù shí bā hào",vi:"Địa chỉ là số 18 đường Hạnh Phúc.",en:"The address is 18 Xingfu Road.",chunks:["地址是","幸福路十八号"],glossVi:["địa chỉ là","số 18 đường Hạnh Phúc"]},
    {hanzi:"请放在一楼前台。",pinyin:"qǐng fàng zài yì lóu qián tái",vi:"Vui lòng để tại quầy lễ tân tầng một.",en:"Please leave it at the first-floor reception desk.",chunks:["请放在","一楼前台"],glossVi:["vui lòng để tại","quầy lễ tân tầng một"]},
    {hanzi:"到了请给我打电话。",pinyin:"dào le qǐng gěi wǒ dǎ diàn huà",vi:"Khi đến vui lòng gọi điện cho tôi.",en:"Please call me when you arrive.",chunks:["到了","请给我","打电话"],glossVi:["khi đến","vui lòng cho tôi","gọi điện"]},
  ]}),
  mission({id:"m42",scenarioId:"s12",code:"home_repair",title:"报修水电和空调",titleVi:"Báo sửa điện, nước hoặc điều hòa",titleEn:"Request a Home Repair",objective:"说明故障并预约上门维修时间",objectiveVi:"Mô tả sự cố và hẹn thời gian nhân viên đến sửa.",objectiveEn:"Describe a fault and schedule an on-site repair.",level:"A2",minutes:8,required:["repair_problem","repair_time"],optional:["home_address"],role:"物业维修人员",roleVi:"Nhân viên bảo trì tòa nhà",roleEn:"Maintenance Staff",opening:{cn:"你好，物业维修。请问哪里坏了？",vi:"Xin chào, bộ phận bảo trì đây. Thiết bị nào bị hỏng?",en:"Hello, maintenance. What is broken?"},completion:{cn:"知道了。师傅明天下午两点上门检查。",vi:"Đã rõ. Thợ sẽ đến kiểm tra lúc 2 giờ chiều mai.",en:"Understood. A technician will come tomorrow at 2 p.m."},patterns:[
    {hanzi:"厨房的水龙头一直漏水。",pinyin:"chú fáng de shuǐ lóng tóu yì zhí lòu shuǐ",vi:"Vòi nước trong bếp bị rò liên tục.",en:"The kitchen faucet keeps leaking.",chunks:["厨房的水龙头","一直","漏水"],glossVi:["vòi nước trong bếp","liên tục","rò nước"]},
    {hanzi:"空调不能制冷。",pinyin:"kōng tiáo bù néng zhì lěng",vi:"Điều hòa không làm lạnh được.",en:"The air conditioner cannot cool.",chunks:["空调","不能","制冷"],glossVi:["điều hòa","không thể","làm lạnh"]},
    {hanzi:"明天下午可以来吗？",pinyin:"míng tiān xià wǔ kě yǐ lái ma?",vi:"Chiều mai có thể đến không?",en:"Can you come tomorrow afternoon?",chunks:["明天下午","可以来","吗"],glossVi:["chiều mai","có thể đến","không"]},
  ]}),
];

const socialPlans: Mission[] = [
  mission({id:"m43",scenarioId:"s13",code:"invite_weekend",title:"邀请朋友周末活动",titleVi:"Mời bạn bè đi chơi cuối tuần",titleEn:"Invite a Friend for the Weekend",objective:"提出活动邀请并约定时间地点",objectiveVi:"Đưa ra lời mời và thống nhất thời gian, địa điểm.",objectiveEn:"Make an invitation and agree on a time and place.",level:"A1",minutes:7,required:["activity_invitation","activity_time"],optional:["meeting_place"],role:"朋友",roleVi:"Người bạn",roleEn:"Friend",opening:{cn:"周末有什么计划？",vi:"Cuối tuần bạn có kế hoạch gì?",en:"What are your plans for the weekend?"},completion:{cn:"好啊！星期六下午三点在地铁站见。",vi:"Được! Hẹn gặp lúc 3 giờ chiều thứ Bảy tại ga tàu điện ngầm.",en:"Great! See you at the subway station at 3 p.m. Saturday."},patterns:[
    {hanzi:"周末一起去看电影吧。",pinyin:"zhōu mò yì qǐ qù kàn diàn yǐng ba",vi:"Cuối tuần cùng đi xem phim nhé.",en:"Let us go to a movie this weekend.",chunks:["周末","一起去","看电影吧"],glossVi:["cuối tuần","cùng đi","xem phim nhé"]},
    {hanzi:"星期六下午有空吗？",pinyin:"xīng qī liù xià wǔ yǒu kòng ma?",vi:"Chiều thứ Bảy bạn có rảnh không?",en:"Are you free Saturday afternoon?",chunks:["星期六下午","有空吗"],glossVi:["chiều thứ Bảy","có rảnh không"]},
    {hanzi:"我们在地铁站见。",pinyin:"wǒ men zài dì tiě zhàn jiàn",vi:"Chúng ta gặp nhau tại ga tàu điện ngầm.",en:"Let us meet at the subway station.",chunks:["我们","在地铁站","见"],glossVi:["chúng ta","tại ga tàu điện ngầm","gặp nhau"]},
  ]}),
  mission({id:"m44",scenarioId:"s13",code:"decline_reschedule",title:"礼貌拒绝和改时间",titleVi:"Từ chối lịch sự và đổi lịch",titleEn:"Decline Politely and Reschedule",objective:"礼貌说明不能参加并提出新的时间",objectiveVi:"Lịch sự nói không thể tham gia và đề xuất thời gian khác.",objectiveEn:"Politely explain that you cannot attend and suggest another time.",level:"A2",minutes:7,required:["decline_reason","new_time"],optional:["apology"],role:"朋友",roleVi:"Người bạn",roleEn:"Friend",opening:{cn:"明天晚上一起吃饭怎么样？",vi:"Tối mai cùng đi ăn nhé?",en:"How about dinner tomorrow evening?"},completion:{cn:"没关系，那我们改到星期天中午。",vi:"Không sao, vậy chúng ta đổi sang trưa Chủ nhật.",en:"No problem. Let us move it to Sunday noon."},patterns:[
    {hanzi:"不好意思，明天我有事。",pinyin:"bù hǎo yì si, míng tiān wǒ yǒu shì",vi:"Xin lỗi, ngày mai tôi có việc.",en:"Sorry, I have something to do tomorrow.",chunks:["不好意思","明天","我有事"],glossVi:["xin lỗi","ngày mai","tôi có việc"]},
    {hanzi:"我可能不能参加。",pinyin:"wǒ kě néng bù néng cān jiā",vi:"Có thể tôi không tham gia được.",en:"I may not be able to attend.",chunks:["我可能","不能参加"],glossVi:["có thể tôi","không tham gia được"]},
    {hanzi:"星期天中午可以吗？",pinyin:"xīng qī tiān zhōng wǔ kě yǐ ma?",vi:"Trưa Chủ nhật có được không?",en:"Would Sunday noon work?",chunks:["星期天中午","可以吗"],glossVi:["trưa Chủ nhật","có được không"]},
  ]}),
  mission({id:"m45",scenarioId:"s13",code:"apologize_misunderstanding",title:"道歉和解释误会",titleVi:"Xin lỗi và giải thích hiểu lầm",titleEn:"Apologize and Explain a Misunderstanding",objective:"为误会道歉并清楚说明原来的意思",objectiveVi:"Xin lỗi vì hiểu lầm và giải thích rõ ý định ban đầu.",objectiveEn:"Apologize for a misunderstanding and clarify the original meaning.",level:"A2",minutes:8,required:["apology","clarification"],optional:["reconciliation"],role:"朋友或同事",roleVi:"Bạn bè hoặc đồng nghiệp",roleEn:"Friend or Colleague",opening:{cn:"你昨天为什么没有回复我的消息？",vi:"Tại sao hôm qua bạn không trả lời tin nhắn của tôi?",en:"Why did you not reply to my message yesterday?"},completion:{cn:"我明白了，没关系。谢谢你解释清楚。",vi:"Tôi hiểu rồi, không sao. Cảm ơn bạn đã giải thích rõ.",en:"I understand. No problem, and thank you for explaining."},patterns:[
    {hanzi:"对不起，让你误会了。",pinyin:"duì bu qǐ, ràng nǐ wù huì le",vi:"Xin lỗi, tôi đã khiến bạn hiểu lầm.",en:"Sorry, I caused a misunderstanding.",chunks:["对不起","让你","误会了"],glossVi:["xin lỗi","khiến bạn","hiểu lầm"]},
    {hanzi:"我不是那个意思。",pinyin:"wǒ bú shì nà ge yì si",vi:"Tôi không có ý đó.",en:"That is not what I meant.",chunks:["我不是","那个意思"],glossVi:["tôi không phải","ý đó"]},
    {hanzi:"我昨天太忙，所以没看到消息。",pinyin:"wǒ zuó tiān tài máng, suǒ yǐ méi kàn dào xiāo xi",vi:"Hôm qua tôi quá bận nên không thấy tin nhắn.",en:"I was too busy yesterday, so I did not see the message.",chunks:["我昨天太忙","所以","没看到消息"],glossVi:["hôm qua tôi quá bận","vì vậy","không thấy tin nhắn"]},
  ]}),
];

const workPractical: Mission[] = [
  mission({id:"m46",scenarioId:"s14",code:"report_progress",title:"汇报工作进度",titleVi:"Báo cáo tiến độ công việc",titleEn:"Report Work Progress",objective:"说明已完成内容问题和下一步计划",objectiveVi:"Nêu phần đã hoàn thành, vấn đề đang gặp và kế hoạch tiếp theo.",objectiveEn:"Explain completed work, current issues, and the next plan.",level:"A1",minutes:8,required:["completed_work","current_issue","next_step"],optional:["completion_percent"],role:"项目经理",roleVi:"Quản lý dự án",roleEn:"Project Manager",opening:{cn:"请简单汇报一下目前的进度。",vi:"Vui lòng báo cáo ngắn gọn tiến độ hiện tại.",en:"Please briefly report the current progress."},completion:{cn:"好的，进度清楚了。请按计划继续，有问题及时告诉我。",vi:"Được, tiến độ đã rõ. Hãy tiếp tục theo kế hoạch và báo ngay nếu có vấn đề.",en:"Good, the progress is clear. Continue as planned and report issues promptly."},patterns:[
    {hanzi:"第一部分已经完成了。",pinyin:"dì yī bù fen yǐ jīng wán chéng le",vi:"Phần thứ nhất đã hoàn thành.",en:"The first part has been completed.",chunks:["第一部分","已经","完成了"],glossVi:["phần thứ nhất","đã","hoàn thành"]},
    {hanzi:"现在有一个数据问题。",pinyin:"xiàn zài yǒu yí ge shù jù wèn tí",vi:"Hiện tại có một vấn đề về dữ liệu.",en:"There is currently a data issue.",chunks:["现在","有一个","数据问题"],glossVi:["hiện tại","có một","vấn đề dữ liệu"]},
    {hanzi:"我今天会继续检查。",pinyin:"wǒ jīn tiān huì jì xù jiǎn chá",vi:"Hôm nay tôi sẽ tiếp tục kiểm tra.",en:"I will continue checking today.",chunks:["我今天","会继续","检查"],glossVi:["hôm nay tôi","sẽ tiếp tục","kiểm tra"]},
  ]}),
  mission({id:"m47",scenarioId:"s14",code:"clarify_task",title:"确认任务要求",titleVi:"Xác nhận yêu cầu công việc",titleEn:"Clarify Task Requirements",objective:"确认交付内容格式和优先级",objectiveVi:"Xác nhận nội dung cần bàn giao, định dạng và mức độ ưu tiên.",objectiveEn:"Clarify deliverables, format, and priority.",level:"A2",minutes:8,required:["deliverable_query","format_query","priority_query"],optional:["example_request"],role:"主管",roleVi:"Người phụ trách",roleEn:"Supervisor",opening:{cn:"这个任务请你今天开始处理。",vi:"Bạn hãy bắt đầu xử lý công việc này hôm nay.",en:"Please start working on this task today."},completion:{cn:"需要一份Excel明细和一页总结，先处理异常数据。",vi:"Cần một bảng chi tiết Excel và một trang tóm tắt; ưu tiên xử lý dữ liệu bất thường trước.",en:"We need an Excel detail file and a one-page summary. Handle abnormal data first."},patterns:[
    {hanzi:"最终需要交付什么？",pinyin:"zuì zhōng xū yào jiāo fù shén me?",vi:"Cuối cùng cần bàn giao những gì?",en:"What needs to be delivered in the end?",chunks:["最终","需要交付","什么"],glossVi:["cuối cùng","cần bàn giao","gì"]},
    {hanzi:"文件要用什么格式？",pinyin:"wén jiàn yào yòng shén me gé shì?",vi:"Tệp cần dùng định dạng gì?",en:"What format should the file use?",chunks:["文件","要用","什么格式"],glossVi:["tệp","cần dùng","định dạng gì"]},
    {hanzi:"哪一部分最优先？",pinyin:"nǎ yí bù fen zuì yōu xiān?",vi:"Phần nào được ưu tiên nhất?",en:"Which part has the highest priority?",chunks:["哪一部分","最优先"],glossVi:["phần nào","ưu tiên nhất"]},
  ]}),
  mission({id:"m48",scenarioId:"s14",code:"negotiate_deadline",title:"协商截止时间和优先级",titleVi:"Thương lượng thời hạn và thứ tự ưu tiên",titleEn:"Negotiate a Deadline and Priorities",objective:"说明工作量风险并提出可行的新期限",objectiveVi:"Nói rõ khối lượng, rủi ro và đề xuất thời hạn khả thi hơn.",objectiveEn:"Explain workload and risks and propose a feasible deadline.",level:"A2",minutes:9,required:["workload_reason","deadline_proposal","priority_confirmation"],optional:["resource_request"],role:"经理",roleVi:"Quản lý",roleEn:"Manager",opening:{cn:"这个任务明天下午能完成吗？",vi:"Công việc này có thể hoàn thành vào chiều mai không?",en:"Can this task be completed by tomorrow afternoon?"},completion:{cn:"可以，改到星期五。你先完成付款数据，其他部分随后处理。",vi:"Được, chuyển sang thứ Sáu. Bạn ưu tiên hoàn thành dữ liệu thanh toán trước, các phần khác xử lý sau.",en:"Okay, move it to Friday. Complete the payment data first and handle the rest afterward."},patterns:[
    {hanzi:"目前的工作量比较大。",pinyin:"mù qián de gōng zuò liàng bǐ jiào dà",vi:"Khối lượng công việc hiện tại khá lớn.",en:"The current workload is quite heavy.",chunks:["目前的","工作量","比较大"],glossVi:["hiện tại","khối lượng công việc","khá lớn"]},
    {hanzi:"我建议星期五完成。",pinyin:"wǒ jiàn yì xīng qī wǔ wán chéng",vi:"Tôi đề xuất hoàn thành vào thứ Sáu.",en:"I suggest completing it on Friday.",chunks:["我建议","星期五","完成"],glossVi:["tôi đề xuất","thứ Sáu","hoàn thành"]},
    {hanzi:"请确认哪一项最重要。",pinyin:"qǐng què rèn nǎ yí xiàng zuì zhòng yào",vi:"Vui lòng xác nhận hạng mục nào quan trọng nhất.",en:"Please confirm which item is most important.",chunks:["请确认","哪一项","最重要"],glossVi:["vui lòng xác nhận","hạng mục nào","quan trọng nhất"]},
  ]}),
];

const safety: Mission[] = [
  mission({id:"m49",scenarioId:"s15",code:"report_lost_item",title:"报告手机或钱包丢失",titleVi:"Báo mất điện thoại hoặc ví",titleEn:"Report a Lost Phone or Wallet",objective:"描述丢失物品时间地点并请求帮助",objectiveVi:"Mô tả vật bị mất, thời gian, địa điểm và yêu cầu hỗ trợ.",objectiveEn:"Describe the lost item, time, and place and request help.",level:"A2",minutes:8,required:["lost_item","loss_location","help_request"],optional:["item_description"],role:"警务人员",roleVi:"Nhân viên công an hoặc bảo vệ",roleEn:"Police or Security Officer",opening:{cn:"你好，请问你丢了什么东西？",vi:"Xin chào, bạn đã làm mất đồ gì?",en:"Hello, what did you lose?"},completion:{cn:"我们已经登记了。请留下联系方式，有消息会通知你。",vi:"Chúng tôi đã ghi nhận. Vui lòng để lại thông tin liên hệ; khi có tin sẽ báo cho bạn.",en:"We have registered the report. Leave your contact information and we will notify you."},patterns:[
    {hanzi:"我的手机丢了。",pinyin:"wǒ de shǒu jī diū le",vi:"Điện thoại của tôi bị mất.",en:"I lost my phone.",chunks:["我的手机","丢了"],glossVi:["điện thoại của tôi","bị mất"]},
    {hanzi:"我可能落在出租车上了。",pinyin:"wǒ kě néng là zài chū zū chē shàng le",vi:"Có thể tôi để quên trên taxi.",en:"I may have left it in a taxi.",chunks:["我可能","落在","出租车上了"],glossVi:["có thể tôi","để quên","trên taxi"]},
    {hanzi:"请帮我登记一下。",pinyin:"qǐng bāng wǒ dēng jì yí xià",vi:"Vui lòng giúp tôi ghi nhận sự việc.",en:"Please help me file a report.",chunks:["请帮我","登记一下"],glossVi:["vui lòng giúp tôi","ghi nhận"]},
  ]}),
  mission({id:"m50",scenarioId:"s15",code:"find_lost_person",title:"寻找走失的家人",titleVi:"Tìm người thân bị lạc",titleEn:"Find a Missing Family Member",objective:"描述走失人员特征并请求广播或联系保安",objectiveVi:"Mô tả đặc điểm người bị lạc và nhờ phát thông báo hoặc liên hệ bảo vệ.",objectiveEn:"Describe the missing person and request an announcement or security assistance.",level:"A2",minutes:9,required:["lost_person_description","last_seen_location","contact_request"],optional:["contact_number"],role:"商场服务台人员",roleVi:"Nhân viên quầy dịch vụ hoặc bảo vệ",roleEn:"Service Desk or Security Staff",opening:{cn:"请别着急。走失的人有什么特征？",vi:"Bạn đừng quá lo. Người bị lạc có đặc điểm gì?",en:"Please stay calm. What does the missing person look like?"},completion:{cn:"我们马上广播并通知保安。请你在服务台等候。",vi:"Chúng tôi sẽ phát thông báo và báo bảo vệ ngay. Bạn vui lòng chờ tại quầy dịch vụ.",en:"We will make an announcement and notify security. Please wait at the service desk."},patterns:[
    {hanzi:"我的家人走失了。",pinyin:"wǒ de jiā rén zǒu shī le",vi:"Người thân của tôi bị lạc.",en:"My family member is missing.",chunks:["我的家人","走失了"],glossVi:["người thân của tôi","bị lạc"]},
    {hanzi:"他穿蓝色上衣，背黑色书包。",pinyin:"tā chuān lán sè shàng yī, bēi hēi sè shū bāo",vi:"Người đó mặc áo xanh và đeo ba lô đen.",en:"He is wearing a blue top and carrying a black backpack.",chunks:["他穿","蓝色上衣","背黑色书包"],glossVi:["người đó mặc","áo xanh","đeo ba lô đen"]},
    {hanzi:"我们最后在三楼电梯旁见到他。",pinyin:"wǒ men zuì hòu zài sān lóu diàn tī páng jiàn dào tā",vi:"Lần cuối chúng tôi thấy người đó ở cạnh thang máy tầng ba.",en:"We last saw him by the elevator on the third floor.",chunks:["我们最后","在三楼电梯旁","见到他"],glossVi:["lần cuối chúng tôi","cạnh thang máy tầng ba","thấy người đó"]},
    {hanzi:"请马上广播并联系保安。",pinyin:"qǐng mǎ shàng guǎng bō bìng lián xì bǎo ān",vi:"Vui lòng phát thông báo và liên hệ bảo vệ ngay.",en:"Please make an announcement and contact security immediately.",chunks:["请马上","广播","并联系保安"],glossVi:["vui lòng ngay lập tức","phát thông báo","và liên hệ bảo vệ"]},
  ]}),
];

export const extraScenarios: Scenario[] = [
  {id:"s7",code:"shopping_payment",name:"购物与付款",nameVi:"Mua sắm và thanh toán",nameEn:"Shopping & Payment",category:"survival",description:"询价、试衣、付款和退换商品",descriptionVi:"Hỏi giá, thử đồ, thanh toán và đổi trả sản phẩm.",descriptionEn:"Ask prices, try clothes, pay, and return items.",icon:"🛍️",missions:shopping},
  {id:"s8",code:"hotel_stay",name:"酒店住宿",nameVi:"Khách sạn và lưu trú",nameEn:"Hotel Stay",category:"travel",description:"入住、酒店服务、报修和退房",descriptionVi:"Nhận phòng, hỏi dịch vụ, báo sự cố và trả phòng.",descriptionEn:"Check in, use hotel services, report problems, and check out.",icon:"🏨",missions:hotel},
  {id:"s9",code:"airport_train",name:"机场与高铁",nameVi:"Sân bay và tàu cao tốc",nameEn:"Airport & High-speed Train",category:"travel",description:"值机、安检、登机和购买高铁票",descriptionVi:"Làm thủ tục, qua an ninh, lên máy bay và mua vé tàu.",descriptionEn:"Check in, pass security, board flights, and buy train tickets.",icon:"🛫",missions:airportTrain},
  {id:"s10",code:"health_pharmacy",name:"看病与买药",nameVi:"Khám bệnh và mua thuốc",nameEn:"Health & Pharmacy",category:"survival",description:"描述症状、买药、挂号和紧急求助",descriptionVi:"Mô tả triệu chứng, mua thuốc, đăng ký khám và gọi cấp cứu.",descriptionEn:"Describe symptoms, buy medicine, register, and request emergency help.",icon:"🏥",missions:health},
  {id:"s11",code:"phone_internet",name:"手机与网络",nameVi:"Điện thoại và Internet",nameEn:"Phone & Internet",category:"survival",description:"购买手机卡、充值和连接无线网",descriptionVi:"Mua SIM, nạp tiền và xử lý kết nối Wi-Fi.",descriptionEn:"Buy a SIM, top up, and connect to Wi-Fi.",icon:"📱",missions:phoneInternet},
  {id:"s12",code:"daily_home",name:"日常生活与住家",nameVi:"Sinh hoạt hằng ngày và nhà ở",nameEn:"Daily Life & Home",category:"survival",description:"超市购物、收快递和报修",descriptionVi:"Mua hàng siêu thị, nhận giao hàng và báo sửa chữa.",descriptionEn:"Shop at supermarkets, receive deliveries, and request repairs.",icon:"🏠",missions:dailyLife},
  {id:"s13",code:"social_plans",name:"社交安排",nameVi:"Hẹn gặp và ứng xử xã hội",nameEn:"Social Plans",category:"social",description:"邀请、改时间、道歉和解释",descriptionVi:"Mời gặp, đổi lịch, xin lỗi và giải thích hiểu lầm.",descriptionEn:"Invite, reschedule, apologize, and clarify misunderstandings.",icon:"🗓️",missions:socialPlans},
  {id:"s14",code:"work_practical",name:"实用职场沟通",nameVi:"Giao tiếp công việc thực tế",nameEn:"Practical Workplace Chinese",category:"work",description:"汇报进度、确认要求和协商期限",descriptionVi:"Báo cáo tiến độ, xác nhận yêu cầu và thương lượng thời hạn.",descriptionEn:"Report progress, clarify requirements, and negotiate deadlines.",icon:"📊",missions:workPractical},
  {id:"s15",code:"safety_emergency",name:"安全与求助",nameVi:"An toàn và tìm trợ giúp",nameEn:"Safety & Assistance",category:"travel",description:"报告失物和寻找走失人员",descriptionVi:"Báo mất đồ và tìm người thân bị lạc.",descriptionEn:"Report lost items and find a missing person.",icon:"🆘",missions:safety},
];
