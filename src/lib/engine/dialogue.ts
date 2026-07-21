import type {
  Mission,
  MissionState,
  Session,
  Turn,
  HintContent,
  GlossItem,
  DebriefResult,
  DebriefFix,
} from "../types";
import { translateKnownChineseVi } from "../i18n/vi";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface DialogueResponse {
  normalizedUserCn: string;
  understood: boolean;
  taskStatus: "in_progress" | "completed" | "failed";
  slotsFilled: string[];
  missingSlots: string[];
  npcReplyCn: string;
  npcReplyEn: string;
  npcReplyVi: string;
  currentState: string;
  errorTags: string[];
  hintAvailable: boolean;
}

// ---------------------------------------------------------------------------
// Script detection
// ---------------------------------------------------------------------------

const CJK_RANGE = /[\u4e00-\u9fff\u3400-\u4dbf]/;
const PINYIN_TONE =
  /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i;
const ASCII_LETTER = /[a-zA-Z]/;
const VIETNAMESE_DIACRITIC = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;

export function detectScript(
  input: string,
): "hanzi" | "pinyin" | "mixed" | "en" | "vi" {
  const hasHanzi = CJK_RANGE.test(input);
  const hasAscii = ASCII_LETTER.test(input);
  const hasPinyinTone = PINYIN_TONE.test(input);
  const hasVietnamese = VIETNAMESE_DIACRITIC.test(input);

  if (hasHanzi && hasAscii) return "mixed";
  if (hasVietnamese) return "vi";
  if (hasHanzi) return "hanzi";
  if (hasPinyinTone) return "pinyin";
  if (hasAscii) return "en";
  return "hanzi"; // default for punctuation-only etc.
}

// ---------------------------------------------------------------------------
// Slot-pattern database – keyed by scenario code
// ---------------------------------------------------------------------------

interface SlotPattern {
  slot: string;
  patterns: RegExp[];
  value: string; // the canonical value to record
}

interface NpcReply {
  cn: string;
  en: string;
  vi?: string;
}

interface StateReplies {
  /** Keyed by list of NEWLY filled slot names joined with "," – or "*" as fallback */
  [key: string]: NpcReply;
}

interface ScenarioData {
  slotPatterns: SlotPattern[];
  /** Keyed by state code */
  stateReplies: Record<string, StateReplies>;
  /** Fallback when nothing matched */
  fallback: NpcReply;
  /** Reply when all required slots are filled */
  completionReply: NpcReply;
}

// ---------------------------------------------------------------------------
// Cafe / restaurant scenario data
// ---------------------------------------------------------------------------

const cafeData: ScenarioData = {
  slotPatterns: [
    // drink_type
    {
      slot: "drink_type",
      patterns: [
        /拿铁|nǎ tiě|na\s?tie|latte/i,
      ],
      value: "拿铁",
    },
    {
      slot: "drink_type",
      patterns: [
        /美式|měi shì|mei\s?shi|americano/i,
      ],
      value: "美式",
    },
    {
      slot: "drink_type",
      patterns: [
        /卡布奇诺|cappuccino/i,
      ],
      value: "卡布奇诺",
    },
    {
      slot: "drink_type",
      patterns: [
        /咖啡|kā fēi|ka\s?fei|coffee/i,
      ],
      value: "咖啡",
    },
    {
      slot: "drink_type",
      patterns: [
        /茶|chá|cha\b|tea/i,
      ],
      value: "茶",
    },
    {
      slot: "drink_type",
      patterns: [
        /奶茶|nǎi chá|nai\s?cha|milk\s?tea/i,
      ],
      value: "奶茶",
    },
    // temperature
    {
      slot: "temperature",
      patterns: [/热|rè|re\b|hot/i],
      value: "热的",
    },
    {
      slot: "temperature",
      patterns: [/冰|bīng|bing|冷|lěng|leng|cold|iced/i],
      value: "冰的",
    },
    // size
    {
      slot: "size",
      patterns: [/大杯|dà bēi|da\s?bei|large|grande/i],
      value: "大杯",
    },
    {
      slot: "size",
      patterns: [/中杯|zhōng bēi|zhong\s?bei|medium/i],
      value: "中杯",
    },
    {
      slot: "size",
      patterns: [/小杯|xiǎo bēi|xiao\s?bei|small/i],
      value: "小杯",
    },
    // payment
    {
      slot: "payment",
      patterns: [/微信|wēi xìn|wei\s?xin|wechat/i],
      value: "微信支付",
    },
    {
      slot: "payment",
      patterns: [/支付宝|zhī fù bǎo|zhi\s?fu\s?bao|alipay/i],
      value: "支付宝",
    },
    {
      slot: "payment",
      patterns: [/现金|xiàn jīn|xian\s?jin|cash/i],
      value: "现金",
    },
    // greeting (pseudo-slot to track state progression)
    {
      slot: "greeting",
      patterns: [/你好|nǐ hǎo|ni\s?hao|hello|hi|嗨|hey/i],
      value: "你好",
    },
  ],
  stateReplies: {
    greeting: {
      greeting: {
        cn: "你好！欢迎光临！请问你要喝点什么？",
        en: "Hello! Welcome! What would you like to drink?",
      },
      "*": {
        cn: "你好！请问你要喝点什么？",
        en: "Hello! What would you like to drink?",
      },
    },
    ordering: {
      drink_type: {
        cn: "好的！你要热的还是冰的？",
        en: "Great! Would you like it hot or iced?",
      },
      "drink_type,temperature": {
        cn: "好的！要大杯、中杯还是小杯？",
        en: "Got it! Large, medium, or small?",
      },
      "drink_type,size": {
        cn: "好的！你要热的还是冰的？",
        en: "Got it! Would you like it hot or iced?",
      },
      temperature: {
        cn: "好的，你要什么饮料呢？",
        en: "OK, what drink would you like?",
      },
      size: {
        cn: "好的，你要什么饮料呢？",
        en: "OK, what drink would you like?",
      },
      "*": {
        cn: "不好意思，请再说一遍？你想喝什么？",
        en: "Sorry, could you say that again? What would you like to drink?",
      },
    },
    confirming: {
      "*": {
        cn: "好的，请稍等。你怎么付款？微信、支付宝还是现金？",
        en: "OK, one moment please. How would you like to pay? WeChat, Alipay, or cash?",
      },
    },
    paying: {
      payment: {
        cn: "好的！一共二十五块。谢谢！请稍等。",
        en: "OK! That will be 25 yuan total. Thank you! Please wait a moment.",
      },
      "*": {
        cn: "你怎么付款？微信、支付宝还是现金？",
        en: "How would you like to pay? WeChat, Alipay, or cash?",
      },
    },
    completed: {
      "*": {
        cn: "你的饮料好了，请慢用！再见！",
        en: "Your drink is ready, enjoy! Goodbye!",
      },
    },
  },
  fallback: {
    cn: "不好意思，我没听懂。请再说一遍？",
    en: "Sorry, I didn't understand. Could you say that again?",
  },
  completionReply: {
    cn: "你的饮料好了，请慢用！再见！",
    en: "Your drink is ready, enjoy! Goodbye!",
  },
};

// ---------------------------------------------------------------------------
// Taxi scenario data
// ---------------------------------------------------------------------------

const taxiData: ScenarioData = {
  slotPatterns: [
    {
      slot: "greeting",
      patterns: [/你好|nǐ hǎo|ni\s?hao|hello|hi|嗨|师傅/i],
      value: "你好",
    },
    {
      slot: "destination",
      patterns: [/机场|jī chǎng|ji\s?chang|airport/i],
      value: "机场",
    },
    {
      slot: "destination",
      patterns: [/火车站|huǒ chē zhàn|huo\s?che\s?zhan|train\s?station/i],
      value: "火车站",
    },
    {
      slot: "destination",
      patterns: [/酒店|jiǔ diàn|jiu\s?dian|hotel/i],
      value: "酒店",
    },
    {
      slot: "destination",
      patterns: [/去|qù|qu\b|到|dào|dao\b|go\s?to/i],
      value: "_detected_",
    },
    {
      slot: "confirmation",
      patterns: [/好|hǎo|hao|可以|kě yǐ|ok|sure|yes|是/i],
      value: "confirmed",
    },
  ],
  stateReplies: {
    greeting: {
      "*": {
        cn: "你好！请问你去哪里？",
        en: "Hello! Where are you going?",
      },
    },
    destination: {
      destination: {
        cn: "好的，没问题。大概三十分钟到。",
        en: "OK, no problem. About 30 minutes to get there.",
      },
      "*": {
        cn: "请问你要去哪里？",
        en: "Where would you like to go?",
      },
    },
    completed: {
      "*": {
        cn: "到了！一共四十五块。谢谢！",
        en: "We're here! That's 45 yuan. Thank you!",
      },
    },
  },
  fallback: {
    cn: "不好意思，你说什么？你要去哪里？",
    en: "Sorry, what did you say? Where do you want to go?",
  },
  completionReply: {
    cn: "到了！祝你一路顺风！",
    en: "We're here! Have a good trip!",
  },
};

// ---------------------------------------------------------------------------
// Hotel check-in scenario data
// ---------------------------------------------------------------------------

const hotelData: ScenarioData = {
  slotPatterns: [
    {
      slot: "greeting",
      patterns: [/你好|nǐ hǎo|ni\s?hao|hello|hi/i],
      value: "你好",
    },
    {
      slot: "reservation_name",
      patterns: [/我叫|wǒ jiào|wo\s?jiao|my\s?name|预订|yù dìng|reservation/i],
      value: "provided",
    },
    {
      slot: "nights",
      patterns: [/一晚|两晚|三晚|yī wǎn|liǎng wǎn|one\s?night|two\s?night|三|两|一/i],
      value: "provided",
    },
    {
      slot: "passport",
      patterns: [/护照|hù zhào|hu\s?zhao|passport/i],
      value: "provided",
    },
  ],
  stateReplies: {
    greeting: {
      "*": {
        cn: "你好，欢迎光临！请问你有预订吗？",
        en: "Hello, welcome! Do you have a reservation?",
      },
    },
    checkin: {
      reservation_name: {
        cn: "好的，请出示你的护照。",
        en: "OK, please show me your passport.",
      },
      passport: {
        cn: "谢谢。你住几晚？",
        en: "Thank you. How many nights?",
      },
      "*": {
        cn: "请问你的名字是什么？有预订吗？",
        en: "What is your name? Do you have a reservation?",
      },
    },
    completed: {
      "*": {
        cn: "好的，你的房间号是305。电梯在右边。祝你住得愉快！",
        en: "OK, your room number is 305. The elevator is on the right. Enjoy your stay!",
      },
    },
  },
  fallback: {
    cn: "不好意思，请再说一遍？",
    en: "Sorry, could you say that again?",
  },
  completionReply: {
    cn: "好的，你的房间号是305。祝你住得愉快！",
    en: "OK, your room number is 305. Enjoy your stay!",
  },
};

// ---------------------------------------------------------------------------
// Generic fallback scenario
// ---------------------------------------------------------------------------


const universalSlotPatterns: Record<string, RegExp[]> = {
  greeting: [/你好|您好|早上好|n[iǐ] ?h[aǎ]o|hello|hi/i],
  drink_type: [/咖啡|拿铁|奶茶|茶|果汁|coffee|latte|tea/i],
  temperature: [/热|冰|冷|hot|cold|iced/i],
  ice_preference: [/不加冰|去冰|少冰|冰/i],
  payment_request: [/买单|结账|付款|多少钱|bill|pay/i],
  payment_method: [/微信|支付宝|现金|刷卡|付款|pay|cash|card/i],
  takeaway_request: [/打包|带走|外带|take ?away/i],
  food_item: [/饭|面|菜|鸡|鱼|饺子|包子|米饭|food|noodle/i],
  destination: [/去|到|机场|车站|酒店|公司|学校|医院|商场|路|街|号/i],
  speed_request: [/慢一点|太快|减速|slow/i],
  stop_request: [/停车|停一下|在这里停|stop/i],
  location_query: [/在哪里|哪儿|怎么走|找|where/i],
  distance_query: [/多远|远不远|多久|多长时间|far|long/i],
  direction_choice: [/左|右|直走|往前|拐|turn|straight/i],
  name: [/我叫|我的名字|叫我|name/i],
  country: [/来自|人|越南|中国|美国|法国|country|from/i],
  occupation: [/工作|上班|老师|会计|工程师|医生|职业|work|job/i],
  wechat_request: [/微信|加个|二维码|wechat/i],
  invitation: [/一起|请你|约|吃饭|看电影|喝咖啡|invite/i],
  hobby: [/喜欢|爱好|平时|运动|看书|音乐|hobby|like/i],
  small_talk: [/早上好|吃了吗|周末|最近|怎么样/i],
  help_request: [/帮我|帮助|麻烦|请帮|help/i],
  meeting_request: [/开会|会议|讨论|meet/i],
  meeting_time: [/今天|明天|上午|下午|点|星期|时间/i],
  leave_request: [/请假|休息|病假|事假|leave/i],
  price_query: [/多少钱|价格|怎么卖|价钱|price|cost/i],
  discount_query: [/优惠|便宜|打折|折扣|discount|cheaper/i],
  try_on_request: [/试一下|试穿|试衣间|try/i],
  size_request: [/尺码|大一号|小一号|多大|几号|size/i],
  receipt_request: [/发票|收据|小票|invoice|receipt/i],
  return_reason: [/有问题|坏了|不合适|不能用|破了|problem|broken/i],
  return_request: [/换一个|换货|退货|退款|exchange|refund|return/i],
  reservation_name: [/预订|预约|名字|我叫|reservation/i],
  passport: [/护照|passport/i],
  wifi_query: [/无线网|Wi-?Fi|密码|网络/i],
  breakfast_query: [/早餐|几点开始|几楼|breakfast/i],
  room_problem: [/空调|热水|房间|浴室|不工作|坏了|漏水/i],
  repair_request: [/派人|来看|维修|修理|检查|repair/i],
  checkout_request: [/退房|结账|check ?out/i],
  luggage_storage: [/寄存行李|存行李|行李|luggage/i],
  flight_info: [/航班|飞机|去上海|机票|flight/i],
  baggage_checkin: [/托运|箱子|行李|check.*bag/i],
  security_instruction: [/电脑|液体|拿出来|安检|security/i],
  item_declaration: [/充电宝|电脑|液体|包里有|power bank|laptop/i],
  gate_query: [/登机口|几号门|怎么走|gate/i],
  delay_query: [/延误|晚点|取消|delay|late/i],
  train_destination: [/高铁票|火车票|去杭州|去北京|去上海|train/i],
  travel_date: [/今天|明天|后天|星期|月|日|上午|下午/i],
  seat_type: [/一等座|二等座|商务座|座位|seat/i],
  symptom: [/发烧|咳嗽|头痛|肚子痛|喉咙痛|不舒服|疼|痛|fever|cough/i],
  symptom_duration: [/昨天|今天|两天|三天|开始|多久|since|days/i],
  medicine_need: [/买.*药|想买点药|喉咙痛|感冒药|退烧药|medicine/i],
  dosage_query: [/怎么吃|几次|一片|剂量|饭前|饭后|dose|take/i],
  department_request: [/挂.*科|内科|外科|儿科|眼科|department/i],
  appointment_time: [/有号|预约|明天|上午|下午|几点|appointment/i],
  emergency_type: [/晕倒|受伤|流血|不能呼吸|紧急|emergency|fainted/i],
  emergency_location: [/我们在|地址|路|街|号|楼|location/i],
  ambulance_request: [/救护车|急救|马上派|ambulance/i],
  sim_request: [/手机卡|电话卡|SIM/i],
  data_plan: [/流量|套餐|GB|data|plan/i],
  topup_request: [/充值|充.*块|top ?up/i],
  balance_query: [/余额|还剩多少|balance/i],
  wifi_password: [/无线网密码|Wi-?Fi.*密码|password/i],
  connection_problem: [/连不上|没有网络|不能上网|connection|connect/i],
  product_query: [/在哪里|找|牛奶|面包|水|商品|product/i],
  quantity: [/一|两|三|四|五|六|七|八|九|十|盒|瓶|个|份|quantity/i],
  delivery_address: [/地址|路|街|号|小区|楼|address/i],
  delivery_location: [/前台|门口|楼下|放在|交给|reception|door/i],
  repair_problem: [/漏水|停电|空调|水龙头|坏了|不能|broken|leak/i],
  repair_time: [/今天|明天|上午|下午|点|什么时候|time/i],
  activity_invitation: [/一起|看电影|吃饭|喝咖啡|去玩|周末|invite/i],
  activity_time: [/星期|周末|今天|明天|上午|下午|晚上|点/i],
  decline_reason: [/不好意思|有事|不能参加|太忙|没空|sorry|cannot/i],
  new_time: [/改到|星期|明天|后天|中午|下午|晚上|another time/i],
  apology: [/对不起|不好意思|抱歉|sorry/i],
  clarification: [/不是那个意思|因为|所以|解释|意思|meant/i],
  completed_work: [/完成|做好|已经|第一部分|done|completed/i],
  current_issue: [/问题|困难|错误|异常|卡住|issue|problem/i],
  next_step: [/继续|下一步|计划|检查|处理|next/i],
  deliverable_query: [/交付什么|需要什么|成果|deliver/i],
  format_query: [/格式|Excel|Word|PDF|表格|format/i],
  priority_query: [/优先|最重要|先做|priority/i],
  workload_reason: [/工作量|来不及|任务多|风险|workload/i],
  deadline_proposal: [/建议|星期五|延期|完成时间|deadline/i],
  priority_confirmation: [/确认.*优先|哪一项|先完成|priority/i],
  lost_item: [/手机丢了|钱包丢了|丢失|不见了|lost/i],
  loss_location: [/出租车|商场|地铁|可能落在|最后看到/i],
  lost_person_description: [/穿.*衣|背.*包|男孩|女孩|老人|特征|wearing/i],
  last_seen_location: [/最后|三楼|电梯旁|门口|看到|last seen/i],
  contact_request: [/广播|通知保安|帮我找|联系|announcement|security/i],
};

const slotQuestionMap: Record<string, NpcReply> = {
  price_query:{cn:"你想问哪件商品的价格？",vi:"Bạn muốn hỏi giá sản phẩm nào?",en:"Which product price would you like to ask about?"},
  discount_query:{cn:"你还想了解有没有优惠吗？",vi:"Bạn có muốn hỏi thêm về ưu đãi không?",en:"Would you also like to ask about a discount?"},
  try_on_request:{cn:"你需要试穿吗？",vi:"Bạn có muốn thử đồ không?",en:"Would you like to try it on?"},
  size_request:{cn:"你需要什么尺码？",vi:"Bạn cần kích cỡ nào?",en:"What size do you need?"},
  payment_method:{cn:"请问你怎么付款？",vi:"Bạn muốn thanh toán bằng cách nào?",en:"How would you like to pay?"},
  receipt_request:{cn:"你需要发票还是收据？",vi:"Bạn cần hóa đơn hay biên nhận?",en:"Do you need an invoice or receipt?"},
  return_reason:{cn:"商品有什么问题？",vi:"Sản phẩm có vấn đề gì?",en:"What is wrong with the item?"},
  return_request:{cn:"你想换货还是退款？",vi:"Bạn muốn đổi hàng hay hoàn tiền?",en:"Would you like an exchange or refund?"},
  reservation_name:{cn:"请问预订人的名字是什么？",vi:"Tên người đặt phòng là gì?",en:"What is the reservation name?"},
  passport:{cn:"可以出示护照吗？",vi:"Bạn có thể xuất trình hộ chiếu không?",en:"May I see your passport?"},
  wifi_query:{cn:"你想问无线网的什么信息？",vi:"Bạn muốn hỏi thông tin gì về Wi-Fi?",en:"What would you like to know about the Wi-Fi?"},
  breakfast_query:{cn:"你想了解早餐时间还是地点？",vi:"Bạn muốn hỏi giờ hay địa điểm ăn sáng?",en:"Would you like the breakfast time or location?"},
  room_problem:{cn:"房间里具体哪里有问题？",vi:"Trong phòng cụ thể có vấn đề gì?",en:"What exactly is wrong in the room?"},
  repair_request:{cn:"你希望我们怎么处理？",vi:"Bạn muốn chúng tôi xử lý thế nào?",en:"How would you like us to handle it?"},
  checkout_request:{cn:"你现在要办理退房吗？",vi:"Bạn muốn làm thủ tục trả phòng ngay bây giờ phải không?",en:"Would you like to check out now?"},
  luggage_storage:{cn:"退房以后需要寄存行李吗？",vi:"Sau khi trả phòng bạn có cần gửi hành lý không?",en:"Do you need to store luggage after check-out?"},
  flight_info:{cn:"请告诉我航班和目的地。",vi:"Vui lòng cho biết chuyến bay và điểm đến.",en:"Please tell me the flight and destination."},
  baggage_checkin:{cn:"有行李需要托运吗？",vi:"Bạn có hành lý cần ký gửi không?",en:"Do you have baggage to check?"},
  security_instruction:{cn:"你明白需要拿出哪些物品吗？",vi:"Bạn đã hiểu cần lấy những đồ nào ra chưa?",en:"Do you understand which items need to be removed?"},
  item_declaration:{cn:"包里有什么电子设备或液体？",vi:"Trong túi có thiết bị điện tử hoặc chất lỏng gì?",en:"What electronics or liquids are in the bag?"},
  gate_query:{cn:"你要找哪个登机口？",vi:"Bạn đang tìm cửa lên máy bay nào?",en:"Which gate are you looking for?"},
  delay_query:{cn:"你还想确认航班是否延误吗？",vi:"Bạn có muốn xác nhận chuyến bay có bị hoãn không?",en:"Would you like to confirm whether the flight is delayed?"},
  train_destination:{cn:"你要买去哪里的车票？",vi:"Bạn muốn mua vé đi đâu?",en:"Where are you traveling by train?"},
  travel_date:{cn:"你哪一天出发？",vi:"Bạn khởi hành ngày nào?",en:"Which day are you departing?"},
  seat_type:{cn:"你要一等座还是二等座？",vi:"Bạn muốn ghế hạng nhất hay hạng hai?",en:"Would you like first or second class?"},
  symptom:{cn:"你有哪些不舒服的症状？",vi:"Bạn có những triệu chứng khó chịu nào?",en:"What symptoms do you have?"},
  symptom_duration:{cn:"这些症状持续多久了？",vi:"Các triệu chứng này kéo dài bao lâu rồi?",en:"How long have the symptoms lasted?"},
  medicine_need:{cn:"你想买什么药，哪里不舒服？",vi:"Bạn muốn mua thuốc gì và đang khó chịu ở đâu?",en:"What medicine do you need and what symptoms do you have?"},
  dosage_query:{cn:"你还需要问用法和剂量吗？",vi:"Bạn có cần hỏi cách dùng và liều dùng không?",en:"Do you need to ask about dosage?"},
  department_request:{cn:"你想挂哪个科？",vi:"Bạn muốn đăng ký khám khoa nào?",en:"Which department do you need?"},
  appointment_time:{cn:"你希望什么时候看医生？",vi:"Bạn muốn khám bác sĩ khi nào?",en:"When would you like to see the doctor?"},
  emergency_type:{cn:"请说明发生了什么紧急情况。",vi:"Vui lòng nói rõ tình trạng khẩn cấp đã xảy ra.",en:"Please explain the emergency."},
  emergency_location:{cn:"请告诉我准确地点。",vi:"Vui lòng cho biết vị trí chính xác.",en:"Please give the exact location."},
  ambulance_request:{cn:"你需要马上叫救护车吗？",vi:"Bạn có cần gọi xe cứu thương ngay không?",en:"Do you need an ambulance immediately?"},
  sim_request:{cn:"你需要办理手机卡吗？",vi:"Bạn cần đăng ký SIM điện thoại phải không?",en:"Do you need a SIM card?"},
  data_plan:{cn:"你需要多少流量？",vi:"Bạn cần bao nhiêu dung lượng dữ liệu?",en:"How much data do you need?"},
  topup_request:{cn:"你想充值多少钱？",vi:"Bạn muốn nạp bao nhiêu tiền?",en:"How much would you like to top up?"},
  balance_query:{cn:"你还需要查询余额吗？",vi:"Bạn có cần kiểm tra số dư không?",en:"Would you like to check the balance?"},
  wifi_password:{cn:"你需要无线网密码吗？",vi:"Bạn cần mật khẩu Wi-Fi phải không?",en:"Do you need the Wi-Fi password?"},
  connection_problem:{cn:"连接网络时出现了什么问题？",vi:"Bạn gặp vấn đề gì khi kết nối mạng?",en:"What problem occurs when connecting?"},
  product_query:{cn:"你在找什么商品？",vi:"Bạn đang tìm sản phẩm gì?",en:"What product are you looking for?"},
  quantity:{cn:"你需要多少？",vi:"Bạn cần số lượng bao nhiêu?",en:"How many do you need?"},
  delivery_address:{cn:"请确认送货地址。",vi:"Vui lòng xác nhận địa chỉ giao hàng.",en:"Please confirm the delivery address."},
  delivery_location:{cn:"东西放在哪里最方便？",vi:"Để hàng ở đâu thuận tiện nhất?",en:"Where should the item be left?"},
  repair_problem:{cn:"请说明具体的故障。",vi:"Vui lòng mô tả cụ thể sự cố.",en:"Please describe the fault."},
  repair_time:{cn:"维修人员什么时候上门方便？",vi:"Khi nào nhân viên sửa chữa đến là thuận tiện?",en:"When is a convenient repair time?"},
  activity_invitation:{cn:"你想邀请对方参加什么活动？",vi:"Bạn muốn mời người kia tham gia hoạt động gì?",en:"What activity would you like to invite them to?"},
  activity_time:{cn:"你想约在什么时候？",vi:"Bạn muốn hẹn vào lúc nào?",en:"When would you like to meet?"},
  decline_reason:{cn:"你为什么不能参加？",vi:"Vì sao bạn không thể tham gia?",en:"Why are you unable to attend?"},
  new_time:{cn:"你想改到什么时间？",vi:"Bạn muốn đổi sang thời gian nào?",en:"What new time would you suggest?"},
  apology:{cn:"你想先怎么表达歉意？",vi:"Bạn muốn nói lời xin lỗi thế nào?",en:"How would you like to apologize?"},
  clarification:{cn:"请解释你原来的意思。",vi:"Vui lòng giải thích ý ban đầu của bạn.",en:"Please clarify what you originally meant."},
  completed_work:{cn:"哪些工作已经完成？",vi:"Những công việc nào đã hoàn thành?",en:"What work has been completed?"},
  current_issue:{cn:"目前遇到什么问题？",vi:"Hiện tại đang gặp vấn đề gì?",en:"What issue are you facing?"},
  next_step:{cn:"下一步准备怎么做？",vi:"Bước tiếp theo bạn dự định làm gì?",en:"What is the next step?"},
  deliverable_query:{cn:"你想确认最终交付内容吗？",vi:"Bạn muốn xác nhận nội dung cần bàn giao phải không?",en:"Would you like to clarify the deliverables?"},
  format_query:{cn:"你还需要确认文件格式吗？",vi:"Bạn có cần xác nhận định dạng tệp không?",en:"Do you need to confirm the file format?"},
  priority_query:{cn:"你想确认哪一部分最优先？",vi:"Bạn muốn xác nhận phần nào ưu tiên nhất?",en:"Would you like to confirm the highest priority?"},
  workload_reason:{cn:"为什么目前的期限有困难？",vi:"Vì sao thời hạn hiện tại khó thực hiện?",en:"Why is the current deadline difficult?"},
  deadline_proposal:{cn:"你建议新的完成时间是什么？",vi:"Bạn đề xuất thời gian hoàn thành mới là khi nào?",en:"What new deadline do you propose?"},
  priority_confirmation:{cn:"请确认你要优先处理哪一项。",vi:"Vui lòng xác nhận hạng mục bạn sẽ ưu tiên xử lý.",en:"Please confirm which item will be prioritized."},
  lost_item:{cn:"你丢了什么物品？",vi:"Bạn đã làm mất vật gì?",en:"What item did you lose?"},
  loss_location:{cn:"你最后在哪里看到它？",vi:"Lần cuối bạn thấy nó ở đâu?",en:"Where did you last see it?"},
  help_request:{cn:"你希望我们怎么帮助你？",vi:"Bạn muốn chúng tôi hỗ trợ thế nào?",en:"How would you like us to help?"},
  lost_person_description:{cn:"请描述走失人员的外貌和衣服。",vi:"Vui lòng mô tả ngoại hình và quần áo của người bị lạc.",en:"Please describe the missing person's appearance and clothing."},
  last_seen_location:{cn:"最后一次在哪里见到他？",vi:"Lần cuối bạn thấy người đó ở đâu?",en:"Where was the person last seen?"},
  contact_request:{cn:"你希望我们广播还是联系保安？",vi:"Bạn muốn chúng tôi phát thông báo hay liên hệ bảo vệ?",en:"Would you like an announcement or security assistance?"},
};

const genericData: ScenarioData = {
  slotPatterns: [
    {
      slot: "greeting",
      patterns: [/你好|nǐ hǎo|ni\s?hao|hello|hi|嗨/i],
      value: "你好",
    },
  ],
  stateReplies: {
    greeting: {
      "*": { cn: "你好！有什么可以帮你的？", en: "Hello! How can I help you?" },
    },
  },
  fallback: {
    cn: "不好意思，我没听懂。请再说一遍？",
    en: "Sorry, I didn't understand. Could you say that again?",
  },
  completionReply: {
    cn: "好的，没问题！再见！",
    en: "OK, no problem! Goodbye!",
  },
};

// ---------------------------------------------------------------------------
// Scenario registry
// ---------------------------------------------------------------------------

const scenarioDataMap: Record<string, ScenarioData> = {
  cafe_order: cafeData,
  cafe_restaurant: cafeData,
  taxi_ride: taxiData,
  taxi_directions: taxiData,
  hotel_checkin: hotelData,
  hotel_check_in: hotelData,
};

function getScenarioData(mission: Mission): ScenarioData {
  // Try mission code prefix, scenario id, or fall back
  const code = mission.code.toLowerCase();
  for (const key of Object.keys(scenarioDataMap)) {
    if (code.includes(key)) return scenarioDataMap[key];
  }
  const sid = mission.scenarioId.toLowerCase();
  for (const key of Object.keys(scenarioDataMap)) {
    if (sid.includes(key)) return scenarioDataMap[key];
  }
  return genericData;
}

// ---------------------------------------------------------------------------
// State machine helpers
// ---------------------------------------------------------------------------

function determineCurrentStateName(
  mission: Mission,
  filledSlots: Record<string, string>,
): string {
  const states = mission.states;
  if (states.length === 0) return "greeting";

  // Walk states in order; pick the latest state whose required slots are all filled
  let current = states[0].code;
  for (const st of states) {
    const needed = st.requiredSlotsInState;
    if (needed.length === 0 || needed.every((s) => s in filledSlots)) {
      current = st.code;
    } else {
      break;
    }
  }
  return current;
}

function allRequiredSlotsFilled(
  mission: Mission,
  filledSlots: Record<string, string>,
): boolean {
  return mission.requiredSlots.every((s) => s in filledSlots);
}

// ---------------------------------------------------------------------------
// processUserInput
// ---------------------------------------------------------------------------

export function processUserInput(
  input: string,
  mission: Mission,
  session: Session,
): DialogueResponse {
  const script = detectScript(input);
  const scenarioData = getScenarioData(mission);
  const trimmed = input.trim();

  // Copy existing filled slots
  const filledSlots: Record<string, string> = { ...session.slotsFilledMap };
  const newlyFilled: string[] = [];
  const errorTags: string[] = [];

  // Match input against slot patterns
  for (const sp of scenarioData.slotPatterns) {
    if (sp.slot in filledSlots) continue; // already filled
    for (const pat of sp.patterns) {
      if (pat.test(trimmed)) {
        filledSlots[sp.slot] = sp.value;
        newlyFilled.push(sp.slot);
        break;
      }
    }
  }

  // Match mission-wide practical patterns so every lesson also works without an AI key.
  for (const slot of [...mission.requiredSlots, ...mission.optionalSlots]) {
    if (slot in filledSlots) continue;
    const patterns = universalSlotPatterns[slot] || [];
    if (patterns.some((pattern) => pattern.test(trimmed))) {
      filledSlots[slot] = "detected";
      newlyFilled.push(slot);
    }
  }

  // A natural Chinese or pinyin sentence should still advance a rule-based lesson
  // when the exact wording differs from the prepared examples.
  const isOnlyGreeting = /^(你好|您好|早上好|hi|hello)[！!。. ]*$/i.test(trimmed);
  if (newlyFilled.length === 0 && trimmed.length >= 2 && !isOnlyGreeting) {
    const firstMissing = mission.requiredSlots.find((slot) => !(slot in filledSlots));
    if (firstMissing) {
      filledSlots[firstMissing] = "inferred";
      newlyFilled.push(firstMissing);
    }
  }

  // Determine state AFTER slot filling
  const currentState = determineCurrentStateName(mission, filledSlots);
  const understood = newlyFilled.length > 0 || trimmed.length > 0;

  // Check completion
  const isComplete = allRequiredSlotsFilled(mission, filledSlots);

  // Pick NPC reply
  let reply: NpcReply;
  if (isComplete) {
    const custom = mission.ruleSupport?.completion;
    if (custom) reply = { cn: custom.cn, vi: custom.vi, en: custom.en };
    else {
      const stateReplies = scenarioData.stateReplies[currentState];
      reply = stateReplies?.["*"] ?? scenarioData.completionReply;
    }
  } else if (scenarioData === genericData) {
    const nextMissing = mission.requiredSlots.find((slot) => !(slot in filledSlots));
    reply = (nextMissing && slotQuestionMap[nextMissing]) || genericData.fallback;
  } else {
    const stateReplies = scenarioData.stateReplies[currentState];
    if (stateReplies) {
      const key = newlyFilled.sort().join(",");
      reply = stateReplies[key] ?? stateReplies["*"] ?? scenarioData.fallback;
    } else reply = scenarioData.fallback;
  }

  // If nothing was understood at all
  if (newlyFilled.length === 0 && !isComplete) {
    // Check for very short or empty input
    if (trimmed.length === 0) {
      errorTags.push("empty_input");
    }
    // Still return what we have – the fallback reply asks to repeat
    if (!scenarioData.stateReplies[currentState]) {
      reply = scenarioData.fallback;
    }
  }

  // Determine missing slots
  const missingSlots = mission.requiredSlots.filter((s) => !(s in filledSlots));

  // Determine task status
  let taskStatus: "in_progress" | "completed" | "failed" = "in_progress";
  if (isComplete) {
    taskStatus = "completed";
  }

  return {
    normalizedUserCn: trimmed,
    understood: understood && newlyFilled.length > 0,
    taskStatus,
    slotsFilled: Object.keys(filledSlots),
    missingSlots,
    npcReplyCn: reply.cn,
    npcReplyEn: reply.en,
    npcReplyVi: reply.vi || translateKnownChineseVi(reply.cn, reply.en),
    currentState,
    errorTags,
    hintAvailable: session.hintLevel < 3,
  };
}

// ---------------------------------------------------------------------------
// getHint
// ---------------------------------------------------------------------------

export function getHint(
  level: number,
  mission: Mission,
  currentState: string,
): HintContent {
  const scenarioData = getScenarioData(mission);

  // Find warmup patterns relevant to current state
  const warmups = mission.warmupPatterns ?? [];

  switch (level) {
    case 0:
      // Keywords only
      return {
        level: 0,
        keywords: getKeywordsForState(currentState, mission),
      };
    case 1:
      // Gloss hint
      return {
        level: 1,
        keywords: getKeywordsForState(currentState, mission),
        glossHint: warmups[0] ?? undefined,
      };
    case 2:
      // Half sentence
      return {
        level: 2,
        keywords: getKeywordsForState(currentState, mission),
        glossHint: warmups[0] ?? undefined,
        halfSentence: getHalfSentence(currentState, mission),
      };
    case 3:
    default:
      // Full reference
      return {
        level: 3,
        keywords: getKeywordsForState(currentState, mission),
        glossHint: warmups[0] ?? undefined,
        halfSentence: getHalfSentence(currentState, mission),
        fullReference: getFullReference(currentState, mission),
      };
  }
}

function getKeywordsForState(state: string, mission: Mission): string[] {
  const stateKeywords: Record<string, string[]> = {
    greeting: ["你好", "nǐ hǎo"],
    ordering: ["我要", "一杯", "请给我"],
    confirming: ["好的", "对", "没错"],
    paying: ["微信", "支付宝", "现金"],
    destination: ["去", "到", "机场", "酒店", "火车站"],
    checkin: ["预订", "我叫", "护照"],
    completed: ["谢谢", "再见"],
  };
  return stateKeywords[state] ?? ["你好", "请"];
}

function getHalfSentence(state: string, _mission: Mission): string {
  const sentences: Record<string, string> = {
    greeting: "你好，我想...",
    ordering: "请给我一杯...",
    confirming: "好的，我要...",
    paying: "我用...付款",
    destination: "我要去...",
    checkin: "我叫...，我有预订",
    completed: "谢谢！",
  };
  return sentences[state] ?? "请...";
}

function getFullReference(state: string, _mission: Mission): string {
  const references: Record<string, string> = {
    greeting: "你好，我想点一杯咖啡。",
    ordering: "请给我一杯热的拿铁，大杯的。",
    confirming: "好的，没问题。",
    paying: "我用微信付款。",
    destination: "你好，我要去机场。",
    checkin: "你好，我叫 Smith，我有预订。",
    completed: "谢谢，再见！",
  };
  return references[state] ?? "你好，请帮我。";
}

// ---------------------------------------------------------------------------
// generateDebrief
// ---------------------------------------------------------------------------

export function generateDebrief(
  mission: Mission,
  session: Session,
): DebriefResult {
  const turns = session.turns;
  const userTurns = turns.filter((t) => t.role === "user");
  const totalTurns = userTurns.length;
  const understoodTurns = userTurns.filter((t) => t.understood === true).length;
  const errorTurns = userTurns.filter(
    (t) => t.errorTags && t.errorTags.length > 0,
  );
  const hintsUsed = userTurns.filter(
    (t) => t.hintUsed !== undefined && t.hintUsed > 0,
  ).length;

  // Calculate score (0-100)
  const comprehensionRate =
    totalTurns > 0 ? understoodTurns / totalTurns : 0;
  const errorPenalty = errorTurns.length * 5;
  const hintPenalty = hintsUsed * 3;
  const turnEfficiency = Math.max(
    0,
    1 - (totalTurns - mission.requiredSlots.length) * 0.1,
  );
  const rawScore =
    comprehensionRate * 60 + turnEfficiency * 40 - errorPenalty - hintPenalty;
  const score = Math.max(0, Math.min(1, Math.round(rawScore) / 100));

  // Determine result
  let result: "success" | "partial_success" | "failure";
  if (session.status === "completed" || allRequiredSlotsFilled(mission, session.slotsFilledMap)) {
    result = score >= 0.6 ? "success" : "partial_success";
  } else {
    result = session.turns.length > 0 ? "partial_success" : "failure";
  }

  // Strengths
  const strengths: string[] = [];
  const hanziTurns = userTurns.filter(
    (t) => t.detectedScript === "hanzi",
  ).length;
  if (hanziTurns > totalTurns * 0.5) {
    strengths.push("Dùng chữ Hán khá tốt trong hội thoại");
  }
  if (comprehensionRate > 0.7) {
    strengths.push("Truyền đạt ý rõ ràng, phần lớn câu nói được hiểu đúng");
  }
  if (hintsUsed === 0 && totalTurns > 0) {
    strengths.push("Hoàn thành mà không phụ thuộc vào gợi ý");
  }
  if (totalTurns <= mission.requiredSlots.length + 1) {
    strengths.push("Hội thoại gọn, hoàn thành với ít lượt nói");
  }
  if (strengths.length === 0) {
    strengths.push("Bạn đã hoàn thành phần luyện tập; nên tiếp tục ôn lại các câu trọng tâm");
  }

  // Fixes
  const topFixes: DebriefFix[] = [];
  const pinyinTurns = userTurns.filter(
    (t) => t.detectedScript === "pinyin" || t.detectedScript === "en" || t.detectedScript === "vi",
  );
  if (pinyinTurns.length > totalTurns * 0.5) {
    topFixes.push({
      type: "script",
      before: "Chủ yếu dùng pinyin, tiếng Anh hoặc tiếng Việt",
      after: "Thử chuyển dần sang chữ Hán khi đã nhớ câu",
      reason:
        "Nhận diện chữ Hán giúp tăng khả năng đọc và hiểu trong tình huống thực tế",
    });
  }
  if (hintsUsed > 2) {
    topFixes.push({
      type: "independence",
      before: "Dùng gợi ý khá thường xuyên",
      after: "Thử tự nhớ câu trong vài giây trước khi mở gợi ý",
      reason: "Tự nhớ chủ động giúp ghi nhớ bền hơn",
    });
  }
  if (errorTurns.length > 0) {
    topFixes.push({
      type: "accuracy",
      before: "Một số câu chưa được hệ thống hiểu đúng",
      after: "Ôn lại các câu mẫu ở phần khởi động rồi luyện lại",
      reason: "Chuẩn bị trước giúp giảm lỗi khi hội thoại",
    });
  }

  // Transfer patterns – reuse warmup glosses from mission
  const transferPatterns: GlossItem[] = (mission.warmupPatterns ?? []).slice(
    0,
    3,
  );

  return {
    result,
    score,
    strengths,
    topFixes,
    transferPatterns,
    nextMissionId: undefined, // to be filled by the scenario system
  };
}
