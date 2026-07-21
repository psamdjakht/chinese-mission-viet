export interface ExtendedKnowledgeTerm {
  hanzi: string;
  pinyin: string;
  vi: string;
  noteVi: string;
}

export interface ExtendedKnowledgePattern {
  hanzi: string;
  pinyin: string;
  vi: string;
  usageVi: string;
}

export interface ExtendedKnowledgeExample {
  contextVi: string;
  hanzi: string;
  pinyin: string;
  vi: string;
}

export interface ExtendedKnowledgePitfall {
  wrong: string;
  right: string;
  explanationVi: string;
}

export interface ExtendedKnowledgeDrill {
  promptVi: string;
  answerHanzi: string;
  answerPinyin: string;
  answerVi: string;
}

export interface ExtendedKnowledgePack {
  id: string;
  icon: string;
  titleVi: string;
  titleCn: string;
  level: "A0–A1" | "A1" | "A1–A2" | "A2";
  summaryVi: string;
  objectives: string[];
  terms: ExtendedKnowledgeTerm[];
  patterns: ExtendedKnowledgePattern[];
  examples: ExtendedKnowledgeExample[];
  pitfalls: ExtendedKnowledgePitfall[];
  drills: ExtendedKnowledgeDrill[];
}

export const extendedKnowledgePacks: ExtendedKnowledgePack[] = [
  {
    id: "k16",
    icon: "🎵",
    titleVi: "Thanh điệu, biến điệu và nhịp câu",
    titleCn: "声调、变调和语流",
    level: "A0–A1",
    summaryVi:
      "Chuyên đề giúp bạn giữ đúng thanh điệu trong cụm từ thật, xử lý biến điệu của 一, 不 và chuỗi thanh 3, đồng thời nói theo nhịp câu thay vì đọc rời từng chữ.",
    objectives: [
      "Nhận biết và bắt chước bốn thanh cơ bản cùng thanh nhẹ.",
      "Dùng đúng biến điệu của 一 và 不 trong các cụm giao tiếp thường gặp.",
      "Xử lý chuỗi hai hoặc ba âm tiết thanh 3 mà không đọc từng âm quá nặng.",
      "Ngắt câu theo cụm nghĩa để người nghe dễ hiểu hơn.",
    ],
    terms: [
      { hanzi: "第一声", pinyin: "dì yī shēng", vi: "thanh 1", noteVi: "Cao và tương đối bằng; tránh hạ giọng ở cuối." },
      { hanzi: "第二声", pinyin: "dì èr shēng", vi: "thanh 2", noteVi: "Đi từ trung lên cao; giống ngữ điệu hỏi lại ngắn." },
      { hanzi: "第三声", pinyin: "dì sān shēng", vi: "thanh 3", noteVi: "Trong câu thường chỉ hạ thấp, không cần uốn đầy đủ xuống rồi lên." },
      { hanzi: "第四声", pinyin: "dì sì shēng", vi: "thanh 4", noteVi: "Rơi nhanh và dứt khoát; không kéo dài." },
      { hanzi: "轻声", pinyin: "qīng shēng", vi: "thanh nhẹ", noteVi: "Ngắn, nhẹ và phụ thuộc thanh đứng trước; ví dụ 朋友 péngyou." },
      { hanzi: "变调", pinyin: "biàn diào", vi: "biến điệu", noteVi: "Thanh thay đổi khi đứng cạnh một thanh khác để nói tự nhiên hơn." },
      { hanzi: "语流", pinyin: "yǔ liú", vi: "dòng lời nói", noteVi: "Cách âm tiết nối với nhau trong câu thật, không đọc tách rời." },
      { hanzi: "停顿", pinyin: "tíng dùn", vi: "ngắt nghỉ", noteVi: "Nên ngắt ở ranh giới cụm nghĩa, không ngắt giữa lượng từ và danh từ." },
    ],
    patterns: [
      { hanzi: "一 + thanh 1/2/3 → yì", pinyin: "yī + shēng diào yī/èr/sān → yì", vi: "一 đổi thành yì trước thanh 1, 2 hoặc 3", usageVi: "Ví dụ: 一杯 yì bēi, 一年 yì nián, 一起 yì qǐ." },
      { hanzi: "一 + thanh 4 → yí", pinyin: "yī + dì sì shēng → yí", vi: "一 đổi thành yí trước thanh 4", usageVi: "Ví dụ: 一个 yí ge, 一样 yí yàng, 一共 yí gòng." },
      { hanzi: "不 + thanh 4 → bú", pinyin: "bù + dì sì shēng → bú", vi: "不 đổi thành bú trước thanh 4", usageVi: "Ví dụ: 不要 bú yào, 不会 bú huì, 不错 bú cuò." },
      { hanzi: "3 + 3 → 2 + 3", pinyin: "sān shēng + sān shēng → èr shēng + sān shēng", vi: "Hai thanh 3 liền nhau: âm đầu đọc gần thanh 2", usageVi: "Ví dụ: 你好 ní hǎo, 可以 ké yǐ, 很好 hén hǎo." },
    ],
    examples: [
      { contextVi: "Gọi một ly cà phê", hanzi: "我要一杯咖啡。", pinyin: "wǒ yào yì bēi kā fēi", vi: "Tôi muốn một ly cà phê." },
      { contextVi: "Từ chối một cách nhẹ", hanzi: "不好意思，我不会。", pinyin: "bù hǎo yì si, wǒ bú huì", vi: "Xin lỗi, tôi không biết làm." },
      { contextVi: "Xác nhận điều tích cực", hanzi: "这个办法很好。", pinyin: "zhè ge bàn fǎ hén hǎo", vi: "Cách này rất tốt." },
      { contextVi: "Ngắt theo cụm nghĩa", hanzi: "到了以后 / 请给我打电话。", pinyin: "dào le yǐ hòu / qǐng gěi wǒ dǎ diàn huà", vi: "Sau khi đến / vui lòng gọi cho tôi." },
      { contextVi: "Nói câu dài theo ba cụm", hanzi: "如果今天来不及 / 我们就改到明天 / 可以吗？", pinyin: "rú guǒ jīn tiān lái bu jí / wǒ men jiù gǎi dào míng tiān / kě yǐ ma", vi: "Nếu hôm nay không kịp / chúng ta chuyển sang ngày mai / được không?" },
    ],
    pitfalls: [
      { wrong: "一杯 yī bēi", right: "一杯 yì bēi", explanationVi: "一 đứng trước thanh 1 của 杯 nên đổi thành yì." },
      { wrong: "不要 bù yào", right: "不要 bú yào", explanationVi: "不 đứng trước thanh 4 của 要 nên đổi thành bú." },
      { wrong: "你好 nǐ hǎo đọc hai thanh 3 đầy đủ", right: "你好 ní hǎo", explanationVi: "Trong chuỗi 3 + 3, âm đầu chuyển gần thanh 2 để câu trôi chảy." },
    ],
    drills: [
      { promptVi: "Nói: Tôi muốn một phần cơm.", answerHanzi: "我要一份米饭。", answerPinyin: "wǒ yào yí fèn mǐ fàn", answerVi: "Tôi muốn một phần cơm." },
      { promptVi: "Nói: Không cần, cảm ơn.", answerHanzi: "不用，谢谢。", answerPinyin: "bú yòng, xiè xie", answerVi: "Không cần, cảm ơn." },
      { promptVi: "Nói: Có thể chậm hơn một chút không?", answerHanzi: "可以慢一点吗？", answerPinyin: "ké yǐ màn yì diǎn ma", answerVi: "Có thể chậm hơn một chút không?" },
      { promptVi: "Ngắt câu hợp lý: Sau khi họp xong, tôi sẽ gửi tệp cho bạn.", answerHanzi: "开完会以后 / 我会把文件发给你。", answerPinyin: "kāi wán huì yǐ hòu / wǒ huì bǎ wén jiàn fā gěi nǐ", answerVi: "Sau khi họp xong / tôi sẽ gửi tệp cho bạn." },
    ],
  },
  {
    id: "k17",
    icon: "🔢",
    titleVi: "Số lượng, lượng từ và cách nói giá tiền",
    titleCn: "数量、量词和价格表达",
    level: "A0–A1",
    summaryVi:
      "Chuyên đề chuẩn hóa cách dùng số + lượng từ + danh từ, cách hỏi số lượng, đọc giá tiền, số phòng, số điện thoại và các con số dễ gây nhầm trong giao tiếp.",
    objectives: [
      "Chọn lượng từ phổ biến phù hợp với người, đồ vật, đồ uống, suất ăn và tài liệu.",
      "Phân biệt 二 và 两 trong số đếm và cụm danh từ.",
      "Hỏi và xác nhận giá, số lượng, số phòng, số điện thoại một cách rõ ràng.",
      "Đọc số theo từng chữ số khi cần tránh nhầm lẫn.",
    ],
    terms: [
      { hanzi: "个", pinyin: "gè", vi: "lượng từ thông dụng", noteVi: "Dùng rộng nhưng không thay thế mọi lượng từ chuyên biệt." },
      { hanzi: "杯", pinyin: "bēi", vi: "ly/cốc", noteVi: "Dùng cho đồ uống: 一杯茶, 两杯咖啡." },
      { hanzi: "份", pinyin: "fèn", vi: "phần/suất/bản", noteVi: "Dùng cho suất ăn hoặc một bản tài liệu." },
      { hanzi: "张", pinyin: "zhāng", vi: "tờ, tấm, vé", noteVi: "Dùng cho vé, giấy, bàn và vật phẳng." },
      { hanzi: "件", pinyin: "jiàn", vi: "chiếc/món/việc", noteVi: "Dùng cho quần áo, hành lý hoặc sự việc." },
      { hanzi: "位", pinyin: "wèi", vi: "vị/người", noteVi: "Lượng từ lịch sự cho người, khách hoặc chuyên gia." },
      { hanzi: "两", pinyin: "liǎng", vi: "hai", noteVi: "Thường đứng trước lượng từ: 两个人, 两杯茶." },
      { hanzi: "块", pinyin: "kuài", vi: "đồng/tệ trong khẩu ngữ", noteVi: "Cách nói khẩu ngữ của 元 khi nói giá." },
    ],
    patterns: [
      { hanzi: "số + lượng từ + danh từ", pinyin: "shù zì + liàng cí + míng cí", vi: "Cấu trúc số lượng cơ bản", usageVi: "Ví dụ: 三张票, 两位客人, 一份报告." },
      { hanzi: "一共多少钱？", pinyin: "yí gòng duō shao qián", vi: "Tổng cộng bao nhiêu tiền?", usageVi: "Dùng khi muốn xác nhận tổng tiền sau khi chọn nhiều món." },
      { hanzi: "我要两个 / 两杯 / 三份……", pinyin: "wǒ yào liǎng ge / liǎng bēi / sān fèn…", vi: "Tôi muốn hai… / hai ly… / ba phần…", usageVi: "Chọn lượng từ theo loại danh từ, không mặc định dùng 个." },
      { hanzi: "请再确认一下号码。", pinyin: "qǐng zài què rèn yí xià hào mǎ", vi: "Vui lòng xác nhận lại số.", usageVi: "Hữu ích với số phòng, số điện thoại, chuyến bay hoặc mã đặt chỗ." },
    ],
    examples: [
      { contextVi: "Đặt hai ly trà", hanzi: "我要两杯绿茶。", pinyin: "wǒ yào liǎng bēi lǜ chá", vi: "Tôi muốn hai ly trà xanh." },
      { contextVi: "Mua ba vé", hanzi: "请给我三张票。", pinyin: "qǐng gěi wǒ sān zhāng piào", vi: "Vui lòng cho tôi ba vé." },
      { contextVi: "Nói số phòng", hanzi: "我的房间号是八零六。", pinyin: "wǒ de fáng jiān hào shì bā líng liù", vi: "Số phòng của tôi là 806." },
      { contextVi: "Đọc số điện thoại rõ ràng", hanzi: "我的手机号是一三八，五零六二，七九一一。", pinyin: "wǒ de shǒu jī hào shì yāo sān bā, wǔ líng liù èr, qī jiǔ yāo yāo", vi: "Số điện thoại của tôi là 138 5062 7911." },
      { contextVi: "Xác nhận giá từng món", hanzi: "这个二十五块，那个三十八块，对吗？", pinyin: "zhè ge èr shí wǔ kuài, nà ge sān shí bā kuài, duì ma", vi: "Cái này 25 tệ, cái kia 38 tệ, đúng không?" },
    ],
    pitfalls: [
      { wrong: "二个人", right: "两个人", explanationVi: "Trước lượng từ, 两 thường tự nhiên hơn 二." },
      { wrong: "三个咖啡", right: "三杯咖啡", explanationVi: "Đồ uống dùng lượng từ 杯." },
      { wrong: "八百零六 đọc liền khi nói số phòng", right: "八零六", explanationVi: "Số phòng và mã thường đọc từng chữ số để tránh nhầm." },
    ],
    drills: [
      { promptVi: "Nói: Cho tôi hai phần mì và một ly nước.", answerHanzi: "请给我两份面和一杯水。", answerPinyin: "qǐng gěi wǒ liǎng fèn miàn hé yì bēi shuǐ", answerVi: "Vui lòng cho tôi hai phần mì và một ly nước." },
      { promptVi: "Nói: Tổng cộng bao nhiêu tiền?", answerHanzi: "一共多少钱？", answerPinyin: "yí gòng duō shao qián", answerVi: "Tổng cộng bao nhiêu tiền?" },
      { promptVi: "Nói: Tôi cần bốn bản tài liệu.", answerHanzi: "我需要四份文件。", answerPinyin: "wǒ xū yào sì fèn wén jiàn", answerVi: "Tôi cần bốn bản tài liệu." },
      { promptVi: "Nói rõ số phòng 1207.", answerHanzi: "房间号是一二零七。", answerPinyin: "fáng jiān hào shì yāo èr líng qī", answerVi: "Số phòng là 1207." },
    ],
  },
  {
    id: "k18",
    icon: "⏱️",
    titleVi: "Thời gian, trạng thái và trợ từ 了、过、在",
    titleCn: "时间、状态和体貌助词",
    level: "A1–A2",
    summaryVi:
      "Chuyên đề giúp bạn phân biệt việc đã hoàn thành, trải nghiệm từng có, hành động đang diễn ra và trạng thái mới thay đổi — những điểm thường bị dịch máy móc từ tiếng Việt.",
    objectives: [
      "Dùng 了 sau động từ để nói hành động đã hoàn thành trong ngữ cảnh phù hợp.",
      "Dùng câu cuối 了 để báo trạng thái mới hoặc sự thay đổi.",
      "Dùng 过 để nói kinh nghiệm từng trải qua, không phải một lần cụ thể.",
      "Dùng 在/正在 và 还没 để nói việc đang làm hoặc chưa hoàn thành.",
    ],
    terms: [
      { hanzi: "了", pinyin: "le", vi: "trợ từ hoàn thành/thay đổi", noteVi: "Có hai chức năng lớn: sau động từ và ở cuối câu." },
      { hanzi: "过", pinyin: "guo", vi: "đã từng", noteVi: "Nói kinh nghiệm trong quá khứ, không nhấn mạnh lần cụ thể." },
      { hanzi: "正在", pinyin: "zhèng zài", vi: "đang", noteVi: "Nhấn mạnh hành động đang diễn ra ngay lúc nói." },
      { hanzi: "还没", pinyin: "hái méi", vi: "vẫn chưa", noteVi: "Phủ định việc chưa hoàn thành; thường không dùng 了 sau động từ." },
      { hanzi: "已经", pinyin: "yǐ jīng", vi: "đã rồi", noteVi: "Thường đi với 了 để nhấn mạnh việc đã xảy ra." },
      { hanzi: "刚才", pinyin: "gāng cái", vi: "vừa nãy", noteVi: "Mốc thời gian ngắn trước hiện tại." },
      { hanzi: "马上", pinyin: "mǎ shàng", vi: "ngay/lập tức", noteVi: "Nói hành động sắp xảy ra trong thời gian rất ngắn." },
      { hanzi: "一直", pinyin: "yì zhí", vi: "liên tục/từ trước đến nay", noteVi: "Diễn tả hành động hoặc trạng thái kéo dài." },
    ],
    patterns: [
      { hanzi: "主语 + 动词 + 了 + 宾语", pinyin: "zhǔ yǔ + dòng cí + le + bīn yǔ", vi: "Chủ ngữ + động từ + 了 + tân ngữ", usageVi: "Dùng khi một hành động cụ thể đã hoàn thành và có liên quan đến hiện tại." },
      { hanzi: "主语 + 动词 + 过 + 宾语", pinyin: "zhǔ yǔ + dòng cí + guo + bīn yǔ", vi: "Chủ ngữ + đã từng + động từ", usageVi: "Dùng cho trải nghiệm: 我去过北京。" },
      { hanzi: "主语 + 正在 + 动词 + 呢", pinyin: "zhǔ yǔ + zhèng zài + dòng cí + ne", vi: "Chủ ngữ đang làm…", usageVi: "呢 có thể đặt cuối câu để làm rõ trạng thái đang diễn ra." },
      { hanzi: "还没 + 动词", pinyin: "hái méi + dòng cí", vi: "vẫn chưa làm…", usageVi: "Không thêm 了 vào động từ trong câu phủ định chưa hoàn thành." },
    ],
    examples: [
      { contextVi: "Báo đã gửi tệp", hanzi: "我已经把文件发给你了。", pinyin: "wǒ yǐ jīng bǎ wén jiàn fā gěi nǐ le", vi: "Tôi đã gửi tệp cho bạn rồi." },
      { contextVi: "Nói kinh nghiệm", hanzi: "我去过上海，但是没去过北京。", pinyin: "wǒ qù guo Shàng hǎi, dàn shì méi qù guo Běi jīng", vi: "Tôi từng đi Thượng Hải nhưng chưa từng đi Bắc Kinh." },
      { contextVi: "Đang xử lý công việc", hanzi: "我正在检查数据呢。", pinyin: "wǒ zhèng zài jiǎn chá shù jù ne", vi: "Tôi đang kiểm tra dữ liệu." },
      { contextVi: "Chưa hoàn thành", hanzi: "报告还没写完。", pinyin: "bào gào hái méi xiě wán", vi: "Báo cáo vẫn chưa viết xong." },
      { contextVi: "Trạng thái mới thay đổi", hanzi: "下雨了，我们坐地铁吧。", pinyin: "xià yǔ le, wǒ men zuò dì tiě ba", vi: "Trời mưa rồi, chúng ta đi tàu điện nhé." },
    ],
    pitfalls: [
      { wrong: "我没吃了饭", right: "我没吃饭 / 我还没吃饭", explanationVi: "Câu phủ định bằng 没 thường không dùng 了 sau động từ." },
      { wrong: "我昨天去过北京", right: "我昨天去了北京", explanationVi: "Có mốc thời gian cụ thể 'hôm qua', nên dùng 了 cho sự kiện cụ thể; 过 thiên về kinh nghiệm." },
      { wrong: "我在已经做", right: "我已经做了 / 我正在做", explanationVi: "已经 nói đã hoàn thành; 正在 nói đang diễn ra. Không trộn hai trạng thái trái ngược." },
    ],
    drills: [
      { promptVi: "Nói: Tôi đã đặt phòng rồi.", answerHanzi: "我已经订房了。", answerPinyin: "wǒ yǐ jīng dìng fáng le", answerVi: "Tôi đã đặt phòng rồi." },
      { promptVi: "Nói: Tôi từng học tiếng Trung.", answerHanzi: "我学过中文。", answerPinyin: "wǒ xué guo Zhōng wén", answerVi: "Tôi từng học tiếng Trung." },
      { promptVi: "Nói: Tôi đang đợi taxi.", answerHanzi: "我正在等出租车。", answerPinyin: "wǒ zhèng zài děng chū zū chē", answerVi: "Tôi đang đợi taxi." },
      { promptVi: "Nói: Tôi vẫn chưa nhận được email.", answerHanzi: "我还没收到邮件。", answerPinyin: "wǒ hái méi shōu dào yóu jiàn", answerVi: "Tôi vẫn chưa nhận được email." },
    ],
  },
  {
    id: "k19",
    icon: "🔗",
    titleVi: "Nối ý: nguyên nhân, điều kiện, đối lập và trình tự",
    titleCn: "原因、条件、转折和顺序",
    level: "A1–A2",
    summaryVi:
      "Chuyên đề giúp bạn chuyển từ câu đơn sang lời nói có logic: giải thích lý do, nêu điều kiện, đối lập hai ý và kể các bước theo thứ tự mà vẫn giữ câu gọn, tự nhiên.",
    objectives: [
      "Dùng 因为…所以… để nêu lý do và kết quả rõ ràng.",
      "Dùng 如果…就… để đề xuất phương án theo điều kiện.",
      "Dùng 虽然…但是… để diễn đạt sự đối lập.",
      "Dùng 先…然后…最后… để mô tả quy trình hoặc kế hoạch.",
    ],
    terms: [
      { hanzi: "因为", pinyin: "yīn wèi", vi: "bởi vì", noteVi: "Đưa ra nguyên nhân; có thể bỏ 所以 trong khẩu ngữ nếu ý đã rõ." },
      { hanzi: "所以", pinyin: "suǒ yǐ", vi: "cho nên", noteVi: "Đưa ra kết quả hoặc hệ quả." },
      { hanzi: "如果", pinyin: "rú guǒ", vi: "nếu", noteVi: "Mở điều kiện có khả năng xảy ra." },
      { hanzi: "就", pinyin: "jiù", vi: "thì/liền", noteVi: "Thường đứng trước kết quả của điều kiện." },
      { hanzi: "虽然", pinyin: "suī rán", vi: "mặc dù", noteVi: "Mở ý nhượng bộ." },
      { hanzi: "但是", pinyin: "dàn shì", vi: "nhưng", noteVi: "Đưa ra ý chính đối lập sau 虽然." },
      { hanzi: "然后", pinyin: "rán hòu", vi: "sau đó", noteVi: "Nối bước tiếp theo trong quy trình." },
      { hanzi: "最后", pinyin: "zuì hòu", vi: "cuối cùng", noteVi: "Đưa bước kết thúc hoặc kết luận." },
    ],
    patterns: [
      { hanzi: "因为 A，所以 B。", pinyin: "yīn wèi A, suǒ yǐ B", vi: "Bởi vì A nên B.", usageVi: "Dùng khi người nghe cần biết lý do của quyết định hoặc sự cố." },
      { hanzi: "如果 A，就 B。", pinyin: "rú guǒ A, jiù B", vi: "Nếu A thì B.", usageVi: "Dùng khi đề xuất kế hoạch dự phòng hoặc điều kiện thực hiện." },
      { hanzi: "虽然 A，但是 B。", pinyin: "suī rán A, dàn shì B", vi: "Mặc dù A nhưng B.", usageVi: "Ý sau 但是 thường là thông tin chính muốn nhấn mạnh." },
      { hanzi: "先 A，然后 B，最后 C。", pinyin: "xiān A, rán hòu B, zuì hòu C", vi: "Trước tiên A, sau đó B, cuối cùng C.", usageVi: "Phù hợp chỉ đường, hướng dẫn thao tác và báo cáo quy trình." },
    ],
    examples: [
      { contextVi: "Giải thích đến muộn", hanzi: "因为路上堵车，所以我迟到了。", pinyin: "yīn wèi lù shang dǔ chē, suǒ yǐ wǒ chí dào le", vi: "Vì đường kẹt xe nên tôi đến muộn." },
      { contextVi: "Đề xuất phương án dự phòng", hanzi: "如果今天来不及，我们就明天继续。", pinyin: "rú guǒ jīn tiān lái bu jí, wǒ men jiù míng tiān jì xù", vi: "Nếu hôm nay không kịp, chúng ta tiếp tục vào ngày mai." },
      { contextVi: "Nhận xét cân bằng", hanzi: "虽然这个方案比较贵，但是更安全。", pinyin: "suī rán zhè ge fāng àn bǐ jiào guì, dàn shì gèng ān quán", vi: "Mặc dù phương án này khá đắt nhưng an toàn hơn." },
      { contextVi: "Chỉ quy trình nhận phòng", hanzi: "先出示护照，然后填写表格，最后领取房卡。", pinyin: "xiān chū shì hù zhào, rán hòu tián xiě biǎo gé, zuì hòu lǐng qǔ fáng kǎ", vi: "Trước tiên xuất trình hộ chiếu, sau đó điền biểu mẫu, cuối cùng nhận thẻ phòng." },
      { contextVi: "Nói lý do ngắn trong công việc", hanzi: "数据还没确认，所以我暂时不能提交。", pinyin: "shù jù hái méi què rèn, suǒ yǐ wǒ zàn shí bù néng tí jiāo", vi: "Dữ liệu chưa được xác nhận nên tạm thời tôi chưa thể nộp." },
    ],
    pitfalls: [
      { wrong: "因为下雨，但是我没去", right: "因为下雨，所以我没去", explanationVi: "因为 nối nguyên nhân với 所以, không nối trực tiếp với 但是." },
      { wrong: "如果你有时间，所以给我打电话", right: "如果你有时间，就给我打电话", explanationVi: "Mẫu điều kiện dùng 如果…就…." },
      { wrong: "先我去银行，然后买东西", right: "我先去银行，然后买东西", explanationVi: "先 thường đặt sau chủ ngữ và trước động từ." },
    ],
    drills: [
      { promptVi: "Nói: Vì tôi bị sốt nên hôm nay tôi xin nghỉ.", answerHanzi: "因为我发烧了，所以今天想请假。", answerPinyin: "yīn wèi wǒ fā shāo le, suǒ yǐ jīn tiān xiǎng qǐng jià", answerVi: "Vì tôi bị sốt nên hôm nay tôi muốn xin nghỉ." },
      { promptVi: "Nói: Nếu không có phòng, hãy giúp tôi tìm khách sạn khác.", answerHanzi: "如果没有房间，请帮我找别的酒店。", answerPinyin: "rú guǒ méi yǒu fáng jiān, qǐng bāng wǒ zhǎo bié de jiǔ diàn", answerVi: "Nếu không có phòng, vui lòng giúp tôi tìm khách sạn khác." },
      { promptVi: "Nói: Mặc dù hơi xa nhưng đi tàu điện rất tiện.", answerHanzi: "虽然有点远，但是坐地铁很方便。", answerPinyin: "suī rán yǒu diǎn yuǎn, dàn shì zuò dì tiě hěn fāng biàn", answerVi: "Mặc dù hơi xa nhưng đi tàu điện rất tiện." },
      { promptVi: "Nói ba bước: kiểm tra, sửa, rồi gửi.", answerHanzi: "先检查，然后修改，最后发送。", answerPinyin: "xiān jiǎn chá, rán hòu xiū gǎi, zuì hòu fā sòng", answerVi: "Trước tiên kiểm tra, sau đó sửa, cuối cùng gửi." },
    ],
  },
  {
    id: "k20",
    icon: "🛟",
    titleVi: "Xử lý khi không nghe kịp và xác nhận thông tin",
    titleCn: "听不懂时的沟通修复",
    level: "A1–A2",
    summaryVi:
      "Chuyên đề rèn kỹ năng duy trì hội thoại khi bạn không nghe rõ: xin lặp lại, yêu cầu nói chậm, hỏi nghĩa từ khóa, nhắc lại để xác nhận và sửa hiểu lầm mà không làm cuộc nói chuyện bị dừng.",
    objectives: [
      "Xin người đối diện lặp lại hoặc nói chậm hơn một cách lịch sự.",
      "Xác định chính xác phần chưa hiểu thay vì chỉ nói 我不懂.",
      "Nhắc lại số, thời gian, địa điểm và yêu cầu để kiểm tra hiểu đúng.",
      "Sửa hiểu lầm bằng câu trung tính, không đổ lỗi cho người đối diện.",
    ],
    terms: [
      { hanzi: "再说一遍", pinyin: "zài shuō yí biàn", vi: "nói lại một lần", noteVi: "Cụm cốt lõi khi chưa nghe rõ toàn câu." },
      { hanzi: "慢一点", pinyin: "màn yì diǎn", vi: "chậm hơn một chút", noteVi: "Có thể thêm 请 hoặc 麻烦您 để lịch sự hơn." },
      { hanzi: "听清楚", pinyin: "tīng qīng chu", vi: "nghe rõ", noteVi: "没听清楚 nghĩa là không nghe rõ âm thanh, khác 没听懂 là không hiểu nghĩa." },
      { hanzi: "听懂", pinyin: "tīng dǒng", vi: "nghe hiểu", noteVi: "Dùng khi đã nghe âm nhưng chưa hiểu nội dung." },
      { hanzi: "确认", pinyin: "què rèn", vi: "xác nhận", noteVi: "Dùng trong công việc, đặt chỗ, thanh toán và lịch hẹn." },
      { hanzi: "您的意思是", pinyin: "nín de yì si shì", vi: "ý của bạn là…", noteVi: "Mẫu nhắc lại để kiểm tra cách hiểu." },
      { hanzi: "对吗", pinyin: "duì ma", vi: "đúng không", noteVi: "Đặt cuối câu nhắc lại để xin xác nhận." },
      { hanzi: "不是……而是……", pinyin: "bú shì… ér shì…", vi: "không phải… mà là…", noteVi: "Dùng để sửa thông tin bị hiểu nhầm." },
    ],
    patterns: [
      { hanzi: "不好意思，请再说一遍。", pinyin: "bù hǎo yì si, qǐng zài shuō yí biàn", vi: "Xin lỗi, vui lòng nói lại một lần.", usageVi: "Dùng khi chưa nghe rõ cả câu." },
      { hanzi: "麻烦您说慢一点。", pinyin: "má fan nín shuō màn yì diǎn", vi: "Phiền bạn nói chậm hơn một chút.", usageVi: "Lịch sự và tự nhiên hơn mệnh lệnh 说慢点." },
      { hanzi: "您说的……是什么意思？", pinyin: "nín shuō de… shì shén me yì si", vi: "Từ/cụm… bạn vừa nói có nghĩa là gì?", usageVi: "Dùng khi chỉ vướng một từ khóa, không cần yêu cầu lặp lại toàn câu." },
      { hanzi: "您的意思是……，对吗？", pinyin: "nín de yì si shì…, duì ma", vi: "Ý của bạn là…, đúng không?", usageVi: "Mẫu xác nhận an toàn cho số tiền, thời gian, yêu cầu và phương án." },
    ],
    examples: [
      { contextVi: "Không nghe rõ số tiền", hanzi: "不好意思，我没听清楚。是八十还是十八？", pinyin: "bù hǎo yì si, wǒ méi tīng qīng chu. shì bā shí hái shì shí bā", vi: "Xin lỗi, tôi chưa nghe rõ. Là 80 hay 18?" },
      { contextVi: "Không hiểu một từ", hanzi: "您说的“押金”是什么意思？", pinyin: "nín shuō de ‘yā jīn’ shì shén me yì si", vi: "Từ 'tiền đặt cọc' bạn vừa nói có nghĩa là gì?" },
      { contextVi: "Xác nhận lịch", hanzi: "您的意思是会议改到星期五下午三点，对吗？", pinyin: "nín de yì si shì huì yì gǎi dào xīng qī wǔ xià wǔ sān diǎn, duì ma", vi: "Ý của bạn là cuộc họp chuyển sang 3 giờ chiều thứ Sáu, đúng không?" },
      { contextVi: "Sửa địa điểm", hanzi: "不是北京站，而是北京南站。", pinyin: "bú shì Běi jīng zhàn, ér shì Běi jīng Nán zhàn", vi: "Không phải ga Bắc Kinh mà là ga Nam Bắc Kinh." },
      { contextVi: "Yêu cầu chia nhỏ thông tin", hanzi: "请一步一步告诉我。", pinyin: "qǐng yí bù yí bù gào su wǒ", vi: "Vui lòng nói cho tôi từng bước một." },
    ],
    pitfalls: [
      { wrong: "我不懂", right: "我没听清楚 / 我没听懂这句话", explanationVi: "Nói rõ bạn không nghe rõ âm hay không hiểu nghĩa sẽ giúp người đối diện hỗ trợ đúng hơn." },
      { wrong: "再说", right: "请再说一遍", explanationVi: "再说 đứng một mình dễ cụt; thêm 请 và 一遍 để lịch sự, rõ yêu cầu." },
      { wrong: "你说错了", right: "不好意思，我理解的是……，对吗？", explanationVi: "Cách trung tính giảm đối đầu và cho phép hai bên cùng kiểm tra thông tin." },
    ],
    drills: [
      { promptVi: "Xin người đối diện nói lại một lần.", answerHanzi: "不好意思，请再说一遍。", answerPinyin: "bù hǎo yì si, qǐng zài shuō yí biàn", answerVi: "Xin lỗi, vui lòng nói lại một lần." },
      { promptVi: "Hỏi xem người ta nói 15 hay 50.", answerHanzi: "是十五还是五十？", answerPinyin: "shì shí wǔ hái shì wǔ shí", answerVi: "Là 15 hay 50?" },
      { promptVi: "Xác nhận: cần nộp trước 5 giờ chiều mai.", answerHanzi: "您的意思是明天下午五点以前提交，对吗？", answerPinyin: "nín de yì si shì míng tiān xià wǔ wǔ diǎn yǐ qián tí jiāo, duì ma", answerVi: "Ý của bạn là nộp trước 5 giờ chiều mai, đúng không?" },
      { promptVi: "Sửa lại: không phải tầng 2 mà là tầng 12.", answerHanzi: "不是二楼，而是十二楼。", answerPinyin: "bú shì èr lóu, ér shì shí èr lóu", answerVi: "Không phải tầng 2 mà là tầng 12." },
    ],
  },
];

export function getExtendedKnowledgePack(id: string): ExtendedKnowledgePack | undefined {
  return extendedKnowledgePacks.find((pack) => pack.id === id);
}
