export interface LessonVocabulary {
  hanzi: string;
  pinyin: string;
  vi: string;
}

export interface SentenceFrame {
  hanzi: string;
  pinyin: string;
  vi: string;
  noteVi: string;
}

export interface DialogueTurn {
  speakerVi: string;
  hanzi: string;
  pinyin: string;
  vi: string;
}

export interface CommonMistake {
  wrong: string;
  right: string;
  explanationVi: string;
}

export interface ScenarioLessonGuide {
  scenarioId: string;
  summaryVi: string;
  vocabulary: LessonVocabulary[];
  sentenceFrames: SentenceFrame[];
  dialogue: DialogueTurn[];
  pragmatics: string[];
  commonMistakes: CommonMistake[];
  pronunciationFocus: string[];
}

const guides: ScenarioLessonGuide[] = [
  {
    scenarioId: "s1",
    summaryVi: "Mục tiêu không chỉ là gọi đúng món, mà còn biết xác nhận kích cỡ, nóng/lạnh, đường/đá, mang đi và cách thanh toán một cách tự nhiên.",
    vocabulary: [
      { hanzi: "点单", pinyin: "diǎn dān", vi: "gọi món / đặt món" },
      { hanzi: "一杯", pinyin: "yì bēi", vi: "một ly" },
      { hanzi: "热的", pinyin: "rè de", vi: "loại nóng" },
      { hanzi: "少糖", pinyin: "shǎo táng", vi: "ít đường" },
      { hanzi: "不加冰", pinyin: "bù jiā bīng", vi: "không thêm đá" },
      { hanzi: "打包", pinyin: "dǎ bāo", vi: "đóng gói mang đi" },
      { hanzi: "结账", pinyin: "jié zhàng", vi: "thanh toán" },
      { hanzi: "发票", pinyin: "fā piào", vi: "hóa đơn tài chính" },
    ],
    sentenceFrames: [
      { hanzi: "我要一杯……", pinyin: "wǒ yào yì bēi…", vi: "Tôi muốn một ly…", noteVi: "Khung câu thông dụng nhất khi gọi đồ uống." },
      { hanzi: "请给我一份……", pinyin: "qǐng gěi wǒ yí fèn…", vi: "Vui lòng cho tôi một phần…", noteVi: "Dùng 份 cho suất ăn hoặc món ăn." },
      { hanzi: "……不要太辣 / 少糖 / 不加冰。", pinyin: "… bú yào tài là / shǎo táng / bù jiā bīng", vi: "… đừng quá cay / ít đường / không thêm đá.", noteVi: "Đặt yêu cầu tùy chỉnh sau tên món sẽ tự nhiên hơn." },
      { hanzi: "可以用微信支付吗？", pinyin: "kě yǐ yòng Wēi xìn zhī fù ma?", vi: "Có thể thanh toán bằng WeChat không?", noteVi: "可以……吗 là mẫu hỏi khả năng hoặc xin phép lịch sự." },
    ],
    dialogue: [
      { speakerVi: "Nhân viên", hanzi: "您好，请问要点什么？", pinyin: "nín hǎo, qǐng wèn yào diǎn shén me?", vi: "Xin chào, bạn muốn gọi gì?" },
      { speakerVi: "Bạn", hanzi: "我要一杯热拿铁，少糖。", pinyin: "wǒ yào yì bēi rè ná tiě, shǎo táng", vi: "Tôi muốn một ly latte nóng, ít đường." },
      { speakerVi: "Nhân viên", hanzi: "要大杯还是中杯？", pinyin: "yào dà bēi hái shì zhōng bēi?", vi: "Bạn muốn ly lớn hay ly vừa?" },
      { speakerVi: "Bạn", hanzi: "中杯，带走。", pinyin: "zhōng bēi, dài zǒu", vi: "Ly vừa, mang đi." },
      { speakerVi: "Nhân viên", hanzi: "一共二十八块。", pinyin: "yí gòng èr shí bā kuài", vi: "Tổng cộng 28 tệ." },
      { speakerVi: "Bạn", hanzi: "可以用支付宝吗？", pinyin: "kě yǐ yòng Zhī fù bǎo ma?", vi: "Có thể dùng Alipay không?" },
    ],
    pragmatics: [
      "Trong quán, 我要… không bị xem là thô; thêm 请 hoặc 谢谢 khi muốn lịch sự hơn.",
      "买单 và 结账 đều dùng để yêu cầu thanh toán; 结账 trung tính và dùng rộng hơn.",
      "块 là cách nói khẩu ngữ của 元 khi nói giá tiền.",
    ],
    commonMistakes: [
      { wrong: "一个咖啡", right: "一杯咖啡", explanationVi: "Đồ uống thường dùng lượng từ 杯, không dùng 个." },
      { wrong: "没有冰", right: "不加冰 / 去冰", explanationVi: "没有冰 mô tả tình trạng không có đá; khi đặt món nên nói 不加冰 hoặc 去冰." },
      { wrong: "我要热拿铁一杯", right: "我要一杯热拿铁", explanationVi: "Lượng từ thường đứng trước tên đồ uống: số + lượng từ + danh từ." },
    ],
    pronunciationFocus: [
      "一 đứng trước thanh 1, 2 hoặc 3 thường đọc thành yì: 一杯 yì bēi.",
      "不 đứng trước thanh 4 thường đổi thành bú: 不要 bú yào; nhưng 不加 vẫn đọc bù jiā.",
      "Phân biệt 买 mǎi (mua) và 卖 mài (bán).",
    ],
  },
  {
    scenarioId: "s2",
    summaryVi: "Học cách nói điểm đến, đưa địa chỉ, điều chỉnh tốc độ, chọn vị trí dừng và hỏi thời gian di chuyển với tài xế.",
    vocabulary: [
      { hanzi: "目的地", pinyin: "mù dì dì", vi: "điểm đến" },
      { hanzi: "地址", pinyin: "dì zhǐ", vi: "địa chỉ" },
      { hanzi: "导航", pinyin: "dǎo háng", vi: "dẫn đường / bản đồ chỉ đường" },
      { hanzi: "慢一点", pinyin: "màn yì diǎn", vi: "chậm hơn một chút" },
      { hanzi: "前面", pinyin: "qián miàn", vi: "phía trước" },
      { hanzi: "路口", pinyin: "lù kǒu", vi: "giao lộ" },
      { hanzi: "靠边", pinyin: "kào biān", vi: "tấp vào lề" },
      { hanzi: "停车", pinyin: "tíng chē", vi: "dừng / đỗ xe" },
    ],
    sentenceFrames: [
      { hanzi: "师傅，去……", pinyin: "shī fu, qù…", vi: "Bác tài, đi đến…", noteVi: "师傅 là cách gọi tài xế phổ biến và lịch sự." },
      { hanzi: "麻烦您开慢一点。", pinyin: "má fan nín kāi màn yì diǎn", vi: "Phiền bác chạy chậm hơn một chút.", noteVi: "麻烦您… làm yêu cầu mềm và lịch sự hơn." },
      { hanzi: "请在前面的路口停一下。", pinyin: "qǐng zài qián miàn de lù kǒu tíng yí xià", vi: "Vui lòng dừng ở giao lộ phía trước.", noteVi: "一下 làm mệnh lệnh nhẹ hơn." },
      { hanzi: "大概还要多久？", pinyin: "dà gài hái yào duō jiǔ?", vi: "Khoảng bao lâu nữa thì tới?", noteVi: "还要多久 hỏi thời gian còn lại." },
    ],
    dialogue: [
      { speakerVi: "Tài xế", hanzi: "您好，您去哪儿？", pinyin: "nín hǎo, nín qù nǎr?", vi: "Xin chào, bạn đi đâu?" },
      { speakerVi: "Bạn", hanzi: "师傅，去北京南站。", pinyin: "shī fu, qù Běi jīng Nán zhàn", vi: "Bác tài, cho tôi đến ga Nam Bắc Kinh." },
      { speakerVi: "Tài xế", hanzi: "走高速可以吗？", pinyin: "zǒu gāo sù kě yǐ ma?", vi: "Đi đường cao tốc được không?" },
      { speakerVi: "Bạn", hanzi: "可以。大概多久能到？", pinyin: "kě yǐ. dà gài duō jiǔ néng dào?", vi: "Được. Khoảng bao lâu thì đến?" },
      { speakerVi: "Tài xế", hanzi: "不堵车的话，二十分钟。", pinyin: "bù dǔ chē de huà, èr shí fēn zhōng", vi: "Nếu không kẹt xe thì 20 phút." },
      { speakerVi: "Bạn", hanzi: "好的，到了请告诉我。", pinyin: "hǎo de, dào le qǐng gào su wǒ", vi: "Vâng, khi đến vui lòng báo tôi." },
    ],
    pragmatics: [
      "Khi không phát âm rõ địa chỉ, mở bản đồ và nói 师傅，去这个地址 sẽ thực tế hơn.",
      "靠边停一下 dùng khi muốn tài xế tấp vào lề an toàn, không nên yêu cầu dừng đột ngột.",
      "堵车 nghĩa là kẹt xe; 不堵车的话 là 'nếu không kẹt xe'.",
    ],
    commonMistakes: [
      { wrong: "我到北京站", right: "我要去北京站", explanationVi: "到 mô tả đã đến; khi nói điểm đến nên dùng 去 hoặc 我要去." },
      { wrong: "开车慢", right: "请开慢一点", explanationVi: "慢一点 là cách yêu cầu tự nhiên hơn câu mệnh lệnh cụt." },
      { wrong: "这里停车吧" , right: "请在这里停一下", explanationVi: "Dùng 在 + vị trí + động từ để câu rõ và lịch sự hơn." },
    ],
    pronunciationFocus: [
      "Phân biệt 站 zhàn (ga/trạm) và 转 zhuǎn (rẽ/chuyển).",
      "儿 hóa trong 哪儿 nǎr thường nghe như một âm liền.",
      "师傅 đọc shī fu, âm 傅 thường nhẹ trong khẩu ngữ.",
    ],
  },
  {
    scenarioId: "s3",
    summaryVi: "Tập hỏi vị trí, khoảng cách, thời gian đi bộ và hiểu chuỗi chỉ dẫn gồm đi thẳng, rẽ, qua đường và xác định mốc.",
    vocabulary: [
      { hanzi: "附近", pinyin: "fù jìn", vi: "gần đây" },
      { hanzi: "直走", pinyin: "zhí zǒu", vi: "đi thẳng" },
      { hanzi: "左转", pinyin: "zuǒ zhuǎn", vi: "rẽ trái" },
      { hanzi: "右转", pinyin: "yòu zhuǎn", vi: "rẽ phải" },
      { hanzi: "路口", pinyin: "lù kǒu", vi: "giao lộ" },
      { hanzi: "红绿灯", pinyin: "hóng lǜ dēng", vi: "đèn giao thông" },
      { hanzi: "对面", pinyin: "duì miàn", vi: "đối diện" },
      { hanzi: "旁边", pinyin: "páng biān", vi: "bên cạnh" },
    ],
    sentenceFrames: [
      { hanzi: "请问，……怎么走？", pinyin: "qǐng wèn, … zěn me zǒu?", vi: "Xin hỏi, đi đến… thế nào?", noteVi: "Khung câu hỏi đường thông dụng nhất." },
      { hanzi: "离这里远吗？", pinyin: "lí zhè lǐ yuǎn ma?", vi: "Có xa chỗ này không?", noteVi: "离 dùng để nói khoảng cách giữa hai nơi." },
      { hanzi: "走路要多长时间？", pinyin: "zǒu lù yào duō cháng shí jiān?", vi: "Đi bộ mất bao lâu?", noteVi: "要 + thời gian diễn tả thời lượng cần thiết." },
      { hanzi: "到路口以后往左转。", pinyin: "dào lù kǒu yǐ hòu wǎng zuǒ zhuǎn", vi: "Đến giao lộ rồi rẽ trái.", noteVi: "到……以后 dùng để nối hai bước chỉ đường." },
    ],
    dialogue: [
      { speakerVi: "Bạn", hanzi: "请问，最近的地铁站怎么走？", pinyin: "qǐng wèn, zuì jìn de dì tiě zhàn zěn me zǒu?", vi: "Xin hỏi, đi đến ga tàu điện gần nhất thế nào?" },
      { speakerVi: "Người đi đường", hanzi: "一直往前走，到第二个路口右转。", pinyin: "yì zhí wǎng qián zǒu, dào dì èr ge lù kǒu yòu zhuǎn", vi: "Cứ đi thẳng, đến giao lộ thứ hai thì rẽ phải." },
      { speakerVi: "Bạn", hanzi: "离这里远吗？", pinyin: "lí zhè lǐ yuǎn ma?", vi: "Có xa đây không?" },
      { speakerVi: "Người đi đường", hanzi: "不远，走路大概十分钟。", pinyin: "bù yuǎn, zǒu lù dà gài shí fēn zhōng", vi: "Không xa, đi bộ khoảng 10 phút." },
      { speakerVi: "Bạn", hanzi: "地铁站在路的哪一边？", pinyin: "dì tiě zhàn zài lù de nǎ yì biān?", vi: "Ga tàu điện nằm bên nào của đường?" },
      { speakerVi: "Người đi đường", hanzi: "在银行对面。", pinyin: "zài yín háng duì miàn", vi: "Ở đối diện ngân hàng." },
    ],
    pragmatics: [
      "最近的… nghĩa là '… gần nhất', hữu ích khi không biết tên địa điểm cụ thể.",
      "Người Trung Quốc thường dùng mốc như ngân hàng, cửa hàng tiện lợi hoặc đèn giao thông để chỉ đường.",
      "Nghe chỉ dẫn dài, có thể xác nhận lại: 是第二个路口右转，对吗？",
    ],
    commonMistakes: [
      { wrong: "地铁站哪里？", right: "地铁站在哪里？", explanationVi: "Câu đầy đủ cần 在 để hỏi vị trí." },
      { wrong: "左边转", right: "往左转 / 向左转", explanationVi: "Khi chỉ hướng chuyển động, dùng 往 hoặc 向 trước phương hướng." },
      { wrong: "多少时间？", right: "多长时间？ / 多久？", explanationVi: "Hỏi thời lượng dùng 多长时间 hoặc 多久." },
    ],
    pronunciationFocus: [
      "Phân biệt 左 zuǒ và 走 zǒu; phụ âm đầu khác nhau.",
      "绿 lǜ có âm ü; không đọc thành lu.",
      "一直 yì zhí: 一 đổi thanh thành yì trước thanh 2.",
    ],
  },
  {
    scenarioId: "s4",
    summaryVi: "Xây dựng phần giới thiệu ngắn nhưng đầy đủ: tên, quê quán, nơi ở, nghề nghiệp, thời gian học tiếng Trung và khả năng ngôn ngữ.",
    vocabulary: [
      { hanzi: "名字", pinyin: "míng zi", vi: "tên" },
      { hanzi: "来自", pinyin: "lái zì", vi: "đến từ" },
      { hanzi: "越南", pinyin: "Yuè nán", vi: "Việt Nam" },
      { hanzi: "住在", pinyin: "zhù zài", vi: "sống tại" },
      { hanzi: "工作", pinyin: "gōng zuò", vi: "làm việc" },
      { hanzi: "学习", pinyin: "xué xí", vi: "học" },
      { hanzi: "会说", pinyin: "huì shuō", vi: "biết nói" },
      { hanzi: "刚开始", pinyin: "gāng kāi shǐ", vi: "vừa mới bắt đầu" },
    ],
    sentenceFrames: [
      { hanzi: "我叫……，你可以叫我……", pinyin: "wǒ jiào…, nǐ kě yǐ jiào wǒ…", vi: "Tôi tên là…, bạn có thể gọi tôi là…", noteVi: "Dùng để nói tên chính thức và tên gọi ngắn." },
      { hanzi: "我来自越南，现在住在……", pinyin: "wǒ lái zì Yuè nán, xiàn zài zhù zài…", vi: "Tôi đến từ Việt Nam, hiện sống tại…", noteVi: "来自 trang trọng hơn 从……来." },
      { hanzi: "我在……工作，主要负责……", pinyin: "wǒ zài… gōng zuò, zhǔ yào fù zé…", vi: "Tôi làm việc tại…, chủ yếu phụ trách…", noteVi: "Mẫu mở rộng phù hợp môi trường công việc." },
      { hanzi: "我学中文学了……", pinyin: "wǒ xué Zhōng wén xué le…", vi: "Tôi đã học tiếng Trung được…", noteVi: "Cấu trúc lặp động từ dùng khi có tân ngữ và bổ ngữ thời lượng." },
    ],
    dialogue: [
      { speakerVi: "Người mới quen", hanzi: "你好，我叫小王。你叫什么名字？", pinyin: "nǐ hǎo, wǒ jiào Xiǎo Wáng. nǐ jiào shén me míng zi?", vi: "Xin chào, tôi tên Tiểu Vương. Bạn tên gì?" },
      { speakerVi: "Bạn", hanzi: "我叫林怀灵，你可以叫我阿灵。", pinyin: "wǒ jiào Lín Huái líng, nǐ kě yǐ jiào wǒ Ā Líng", vi: "Tôi tên Lâm Hoài Linh, bạn có thể gọi tôi là A Linh." },
      { speakerVi: "Người mới quen", hanzi: "你从哪里来？", pinyin: "nǐ cóng nǎ lǐ lái?", vi: "Bạn đến từ đâu?" },
      { speakerVi: "Bạn", hanzi: "我来自越南，现在住在胡志明市。", pinyin: "wǒ lái zì Yuè nán, xiàn zài zhù zài Hú Zhì Míng Shì", vi: "Tôi đến từ Việt Nam, hiện sống ở Thành phố Hồ Chí Minh." },
      { speakerVi: "Người mới quen", hanzi: "你做什么工作？", pinyin: "nǐ zuò shén me gōng zuò?", vi: "Bạn làm công việc gì?" },
      { speakerVi: "Bạn", hanzi: "我是会计，平时也学习人工智能。", pinyin: "wǒ shì kuài jì, píng shí yě xué xí rén gōng zhì néng", vi: "Tôi là kế toán, bình thường cũng học trí tuệ nhân tạo." },
    ],
    pragmatics: [
      "Người Trung Quốc thường hỏi tuổi, quê quán hoặc nghề nghiệp khá sớm; bạn có thể trả lời ở mức mình thấy thoải mái.",
      "姓 hỏi họ, 叫什么名字 hỏi tên đầy đủ; đừng nhầm hai câu này.",
      "做……的 là cách khẩu ngữ để nói lĩnh vực: 我是做会计的。",
    ],
    commonMistakes: [
      { wrong: "我是来自越南", right: "我来自越南 / 我是越南人", explanationVi: "Không ghép 是 trực tiếp trước 来自." },
      { wrong: "我工作会计", right: "我是会计 / 我做会计工作", explanationVi: "Nghề nghiệp dùng 是 + nghề hoặc 做 + công việc." },
      { wrong: "我学习中文两年", right: "我学中文学了两年", explanationVi: "Khi diễn tả thời lượng đã học, cần cấu trúc thời lượng phù hợp." },
    ],
    pronunciationFocus: [
      "会计 đọc kuài jì; 计 là thanh 4, không đọc nhẹ.",
      "名字 míng zi: 字 thường đọc nhẹ trong từ này.",
      "中国 Zhōng guó và 中文 Zhōng wén có nghĩa khác nhau: Trung Quốc và tiếng Trung.",
    ],
  },
  {
    scenarioId: "s5",
    summaryVi: "Tập chuyển từ làm quen sang duy trì liên lạc: thêm WeChat, trò chuyện sở thích, rủ gặp và phản hồi lời mời tự nhiên.",
    vocabulary: [
      { hanzi: "微信", pinyin: "Wēi xìn", vi: "WeChat" },
      { hanzi: "二维码", pinyin: "èr wéi mǎ", vi: "mã QR" },
      { hanzi: "有空", pinyin: "yǒu kòng", vi: "rảnh" },
      { hanzi: "一起", pinyin: "yì qǐ", vi: "cùng nhau" },
      { hanzi: "爱好", pinyin: "ài hào", vi: "sở thích" },
      { hanzi: "平时", pinyin: "píng shí", vi: "bình thường" },
      { hanzi: "周末", pinyin: "zhōu mò", vi: "cuối tuần" },
      { hanzi: "联系", pinyin: "lián xì", vi: "liên lạc" },
    ],
    sentenceFrames: [
      { hanzi: "我们加个微信吧。", pinyin: "wǒ men jiā ge Wēi xìn ba", vi: "Chúng ta kết bạn WeChat nhé.", noteVi: "吧 làm lời đề nghị nhẹ và thân thiện." },
      { hanzi: "你平时喜欢做什么？", pinyin: "nǐ píng shí xǐ huan zuò shén me?", vi: "Bình thường bạn thích làm gì?", noteVi: "喜欢 + động từ dùng để nói sở thích hoạt động." },
      { hanzi: "周末有空一起吃饭吗？", pinyin: "zhōu mò yǒu kòng yì qǐ chī fàn ma?", vi: "Cuối tuần rảnh đi ăn cùng nhau không?", noteVi: "Đưa thời gian lên đầu câu giúp câu rõ hơn." },
      { hanzi: "下次有机会我们一起……", pinyin: "xià cì yǒu jī huì wǒ men yì qǐ…", vi: "Lần tới có dịp chúng ta cùng…", noteVi: "Cách kết thúc cuộc trò chuyện và mở cơ hội gặp lại." },
    ],
    dialogue: [
      { speakerVi: "Người mới quen", hanzi: "跟你聊天很开心。", pinyin: "gēn nǐ liáo tiān hěn kāi xīn", vi: "Nói chuyện với bạn rất vui." },
      { speakerVi: "Bạn", hanzi: "我也是。我们加个微信吧。", pinyin: "wǒ yě shì. wǒ men jiā ge Wēi xìn ba", vi: "Tôi cũng vậy. Chúng ta kết bạn WeChat nhé." },
      { speakerVi: "Người mới quen", hanzi: "好啊，你扫我的二维码吧。", pinyin: "hǎo a, nǐ sǎo wǒ de èr wéi mǎ ba", vi: "Được, bạn quét mã QR của tôi nhé." },
      { speakerVi: "Bạn", hanzi: "你周末一般喜欢做什么？", pinyin: "nǐ zhōu mò yì bān xǐ huan zuò shén me?", vi: "Cuối tuần bạn thường thích làm gì?" },
      { speakerVi: "Người mới quen", hanzi: "我喜欢打羽毛球，也喜欢喝咖啡。", pinyin: "wǒ xǐ huan dǎ yǔ máo qiú, yě xǐ huan hē kā fēi", vi: "Tôi thích chơi cầu lông, cũng thích uống cà phê." },
      { speakerVi: "Bạn", hanzi: "那下次一起打球吧！", pinyin: "nà xià cì yì qǐ dǎ qiú ba", vi: "Vậy lần tới cùng chơi nhé!" },
    ],
    pragmatics: [
      "好啊 là phản hồi tích cực và tự nhiên hơn chỉ nói 好 trong giao tiếp thân mật.",
      "我请你 thường hàm ý người nói sẽ trả tiền; nếu chỉ rủ đi ăn, dùng 一起吃饭吧.",
      "Khi mới quen, lời mời có thời gian cụ thể sẽ dễ phản hồi hơn lời mời quá chung chung.",
    ],
    commonMistakes: [
      { wrong: "加你微信", right: "加你的微信 / 我们加个微信吧", explanationVi: "Câu khẩu ngữ có thể lược, nhưng người học nên dùng cấu trúc đầy đủ trước." },
      { wrong: "你喜欢什么爱好？", right: "你有什么爱好？ / 你喜欢做什么？", explanationVi: "Không kết hợp 喜欢 và 爱好 theo cách lặp nghĩa này." },
      { wrong: "我们一起去吃饭吗？" , right: "我们一起去吃饭吧 / 周末一起吃饭吗？", explanationVi: "吧 dùng cho đề nghị; 吗 dùng khi thực sự hỏi ý kiến." },
    ],
    pronunciationFocus: [
      "喜欢 xǐ huan: 欢 thường đọc nhẹ.",
      "一起 yì qǐ: 一 đổi thành thanh 4 trước thanh 3.",
      "二维码 èr wéi mǎ: chú ý âm r trong 二 và thanh 2 của 维.",
    ],
  },
  {
    scenarioId: "s6",
    summaryVi: "Rèn giao tiếp cơ bản nơi làm việc: chào hỏi, nhờ hỗ trợ, xác nhận thời gian họp, xin nghỉ và bàn giao công việc.",
    vocabulary: [
      { hanzi: "同事", pinyin: "tóng shì", vi: "đồng nghiệp" },
      { hanzi: "帮忙", pinyin: "bāng máng", vi: "giúp đỡ" },
      { hanzi: "文件", pinyin: "wén jiàn", vi: "tệp / tài liệu" },
      { hanzi: "会议", pinyin: "huì yì", vi: "cuộc họp" },
      { hanzi: "请假", pinyin: "qǐng jià", vi: "xin nghỉ" },
      { hanzi: "交接", pinyin: "jiāo jiē", vi: "bàn giao" },
      { hanzi: "确认", pinyin: "què rèn", vi: "xác nhận" },
      { hanzi: "方便", pinyin: "fāng biàn", vi: "thuận tiện / rảnh" },
    ],
    sentenceFrames: [
      { hanzi: "麻烦你帮我看一下……", pinyin: "má fan nǐ bāng wǒ kàn yí xià…", vi: "Phiền bạn xem giúp tôi…", noteVi: "Mẫu nhờ hỗ trợ mềm và phù hợp nơi làm việc." },
      { hanzi: "你什么时候方便？", pinyin: "nǐ shén me shí hou fāng biàn?", vi: "Khi nào bạn thuận tiện?", noteVi: "方便 ở đây mang nghĩa có thời gian / tiện sắp xếp." },
      { hanzi: "我想请一天假。", pinyin: "wǒ xiǎng qǐng yì tiān jià", vi: "Tôi muốn xin nghỉ một ngày.", noteVi: "请 + thời lượng + 假 là cấu trúc thông dụng." },
      { hanzi: "我会把工作交接给……", pinyin: "wǒ huì bǎ gōng zuò jiāo jiē gěi…", vi: "Tôi sẽ bàn giao công việc cho…", noteVi: "把 đưa tân ngữ lên trước để nhấn mạnh cách xử lý." },
    ],
    dialogue: [
      { speakerVi: "Bạn", hanzi: "早上好，麻烦你帮我看一下这个文件。", pinyin: "zǎo shang hǎo, má fan nǐ bāng wǒ kàn yí xià zhè ge wén jiàn", vi: "Chào buổi sáng, phiền bạn xem giúp tôi tệp này." },
      { speakerVi: "Đồng nghiệp", hanzi: "可以，哪里有问题？", pinyin: "kě yǐ, nǎ lǐ yǒu wèn tí?", vi: "Được, chỗ nào có vấn đề?" },
      { speakerVi: "Bạn", hanzi: "这两项数据我不太确定。", pinyin: "zhè liǎng xiàng shù jù wǒ bú tài què dìng", vi: "Hai hạng mục dữ liệu này tôi chưa chắc lắm." },
      { speakerVi: "Đồng nghiệp", hanzi: "我下午三点以后有空。", pinyin: "wǒ xià wǔ sān diǎn yǐ hòu yǒu kòng", vi: "Sau 3 giờ chiều tôi rảnh." },
      { speakerVi: "Bạn", hanzi: "那我们三点半在会议室讨论，可以吗？", pinyin: "nà wǒ men sān diǎn bàn zài huì yì shì tǎo lùn, kě yǐ ma?", vi: "Vậy 3 giờ 30 chúng ta trao đổi ở phòng họp được không?" },
      { speakerVi: "Đồng nghiệp", hanzi: "没问题。", pinyin: "méi wèn tí", vi: "Không vấn đề." },
    ],
    pragmatics: [
      "麻烦你… và 能不能请你… phù hợp hơn mệnh lệnh trực tiếp trong môi trường công việc.",
      "吃了吗 có thể là lời chào thân mật, nhưng không phù hợp mọi môi trường công sở trang trọng.",
      "Khi xin nghỉ, nên nói rõ thời gian và kế hoạch bàn giao để câu trả lời đầy đủ hơn.",
    ],
    commonMistakes: [
      { wrong: "你帮助我", right: "你能帮我一下吗？", explanationVi: "帮助 trang trọng hơn; 帮我一下 tự nhiên trong hội thoại." },
      { wrong: "开会在三点", right: "三点开会 / 会议三点开始", explanationVi: "Thời gian thường đứng trước động từ." },
      { wrong: "我要请假一天病", right: "我想请一天病假", explanationVi: "病假 là một từ; thời lượng đứng giữa 请 và 假 hoặc trước 病假." },
    ],
    pronunciationFocus: [
      "数据 có hai cách đọc theo khu vực; phổ thông đại lục thường đọc shù jù.",
      "文件 wén jiàn: phân biệt 问 wèn và 文 wén.",
      "请假 qǐng jià: 假 trong nghĩa nghỉ phép đọc jià, không phải jiǎ.",
    ],
  },
  {
    scenarioId: "s7",
    summaryVi: "Thực hành hỏi giá, so sánh, thử đồ, đổi kích cỡ, thanh toán, lấy hóa đơn và xử lý đổi trả sản phẩm.",
    vocabulary: [
      { hanzi: "多少钱", pinyin: "duō shǎo qián", vi: "bao nhiêu tiền" },
      { hanzi: "打折", pinyin: "dǎ zhé", vi: "giảm giá" },
      { hanzi: "便宜", pinyin: "pián yi", vi: "rẻ" },
      { hanzi: "试穿", pinyin: "shì chuān", vi: "thử quần áo" },
      { hanzi: "尺码", pinyin: "chǐ mǎ", vi: "kích cỡ" },
      { hanzi: "合适", pinyin: "hé shì", vi: "vừa / phù hợp" },
      { hanzi: "发票", pinyin: "fā piào", vi: "hóa đơn tài chính" },
      { hanzi: "退货", pinyin: "tuì huò", vi: "trả hàng" },
    ],
    sentenceFrames: [
      { hanzi: "这个多少钱？", pinyin: "zhè ge duō shǎo qián?", vi: "Cái này bao nhiêu tiền?", noteVi: "Có thể thêm 请问 để lịch sự hơn." },
      { hanzi: "有大一号的吗？", pinyin: "yǒu dà yí hào de ma?", vi: "Có cỡ lớn hơn một số không?", noteVi: "的 thay cho danh từ đã rõ trong ngữ cảnh." },
      { hanzi: "我可以试穿一下吗？", pinyin: "wǒ kě yǐ shì chuān yí xià ma?", vi: "Tôi có thể thử một chút không?", noteVi: "试穿 dùng riêng cho quần áo, giày dép." },
      { hanzi: "我想换一个尺码。", pinyin: "wǒ xiǎng huàn yí ge chǐ mǎ", vi: "Tôi muốn đổi sang một kích cỡ khác.", noteVi: "换 là đổi; 退 là trả lại." },
    ],
    dialogue: [
      { speakerVi: "Bạn", hanzi: "请问，这件衬衫多少钱？", pinyin: "qǐng wèn, zhè jiàn chèn shān duō shǎo qián?", vi: "Xin hỏi, chiếc áo sơ mi này bao nhiêu tiền?" },
      { speakerVi: "Nhân viên", hanzi: "三百二，现在打八折。", pinyin: "sān bǎi èr, xiàn zài dǎ bā zhé", vi: "320 tệ, hiện giảm còn 80%." },
      { speakerVi: "Bạn", hanzi: "我可以试穿一下吗？", pinyin: "wǒ kě yǐ shì chuān yí xià ma?", vi: "Tôi có thể thử không?" },
      { speakerVi: "Nhân viên", hanzi: "可以，试衣间在右边。", pinyin: "kě yǐ, shì yī jiān zài yòu biān", vi: "Được, phòng thử đồ ở bên phải." },
      { speakerVi: "Bạn", hanzi: "这件有点小，有大一号的吗？", pinyin: "zhè jiàn yǒu diǎn xiǎo, yǒu dà yí hào de ma?", vi: "Chiếc này hơi nhỏ, có cỡ lớn hơn một số không?" },
      { speakerVi: "Nhân viên", hanzi: "有，我给您拿。", pinyin: "yǒu, wǒ gěi nín ná", vi: "Có, tôi lấy cho bạn." },
    ],
    pragmatics: [
      "打八折 nghĩa là trả 80% giá gốc, tức giảm 20%; không phải giảm 80%.",
      "件 là lượng từ cho áo/quần và nhiều đồ vật dạng món; 双 dùng cho giày, tất.",
      "Khi đổi trả, nên mang theo 小票 hoặc 发票 tùy chính sách cửa hàng.",
    ],
    commonMistakes: [
      { wrong: "八折是便宜八十 percent", right: "打八折是付原价的百分之八十", explanationVi: "Hệ thống 折 tính phần trăm giá còn phải trả." },
      { wrong: "试一下衣服", right: "试穿一下这件衣服", explanationVi: "试穿 là động từ chính xác khi thử quần áo." },
      { wrong: "换钱", right: "换货 / 换尺码", explanationVi: "换钱 là đổi tiền; đổi hàng dùng 换货 hoặc nói rõ đổi kích cỡ." },
    ],
    pronunciationFocus: [
      "便宜 pián yi: 宜 thường đọc nhẹ.",
      "打折 dǎ zhé: 折 đọc zhé trong nghĩa giảm giá.",
      "尺码 chǐ mǎ: cả hai âm đều thanh 3, âm đầu thường biến đổi nhẹ trong chuỗi nói.",
    ],
  },
  {
    scenarioId: "s8",
    summaryVi: "Hoàn chỉnh quy trình lưu trú từ nhận phòng, hỏi dịch vụ, báo sự cố đến trả phòng và gửi hành lý.",
    vocabulary: [
      { hanzi: "预订", pinyin: "yù dìng", vi: "đặt trước" },
      { hanzi: "入住", pinyin: "rù zhù", vi: "nhận phòng / vào ở" },
      { hanzi: "护照", pinyin: "hù zhào", vi: "hộ chiếu" },
      { hanzi: "房卡", pinyin: "fáng kǎ", vi: "thẻ phòng" },
      { hanzi: "早餐", pinyin: "zǎo cān", vi: "bữa sáng" },
      { hanzi: "无线网", pinyin: "wú xiàn wǎng", vi: "Wi-Fi" },
      { hanzi: "空调", pinyin: "kōng tiáo", vi: "máy điều hòa" },
      { hanzi: "退房", pinyin: "tuì fáng", vi: "trả phòng" },
      { hanzi: "寄存", pinyin: "jì cún", vi: "gửi giữ" },
    ],
    sentenceFrames: [
      { hanzi: "我有预订，名字是……", pinyin: "wǒ yǒu yù dìng, míng zi shì…", vi: "Tôi có đặt phòng, tên là…", noteVi: "Nói tên đặt phòng ngay giúp nhân viên tra cứu nhanh." },
      { hanzi: "请问早餐在哪里？", pinyin: "qǐng wèn zǎo cān zài nǎ lǐ?", vi: "Xin hỏi bữa sáng ở đâu?", noteVi: "Có thể thay 早餐 bằng 电梯, 健身房, 洗衣房." },
      { hanzi: "房间里的空调坏了。", pinyin: "fáng jiān lǐ de kōng tiáo huài le", vi: "Điều hòa trong phòng bị hỏng.", noteVi: "坏了 diễn tả thiết bị đã hỏng hoặc không hoạt động." },
      { hanzi: "退房以后可以寄存行李吗？", pinyin: "tuì fáng yǐ hòu kě yǐ jì cún xíng li ma?", vi: "Sau khi trả phòng có thể gửi hành lý không?", noteVi: "以后 nối sự kiện 'sau khi'." },
    ],
    dialogue: [
      { speakerVi: "Lễ tân", hanzi: "您好，请问有预订吗？", pinyin: "nín hǎo, qǐng wèn yǒu yù dìng ma?", vi: "Xin chào, bạn có đặt trước không?" },
      { speakerVi: "Bạn", hanzi: "有，名字是林怀灵，住三晚。", pinyin: "yǒu, míng zi shì Lín Huái líng, zhù sān wǎn", vi: "Có, tên Lâm Hoài Linh, ở ba đêm." },
      { speakerVi: "Lễ tân", hanzi: "请出示护照。早餐在二楼。", pinyin: "qǐng chū shì hù zhào. zǎo cān zài èr lóu", vi: "Vui lòng xuất trình hộ chiếu. Bữa sáng ở tầng hai." },
      { speakerVi: "Bạn", hanzi: "无线网密码是什么？", pinyin: "wú xiàn wǎng mì mǎ shì shén me?", vi: "Mật khẩu Wi-Fi là gì?" },
      { speakerVi: "Lễ tân", hanzi: "房卡背面有密码。", pinyin: "fáng kǎ bèi miàn yǒu mì mǎ", vi: "Mật khẩu ở mặt sau thẻ phòng." },
      { speakerVi: "Bạn", hanzi: "好的，谢谢。", pinyin: "hǎo de, xiè xie", vi: "Vâng, cảm ơn." },
    ],
    pragmatics: [
      "入住 và 退房 là từ tiêu chuẩn trong khách sạn; 办理入住 nghĩa là làm thủ tục nhận phòng.",
      "楼 chỉ tầng theo cách gọi tiếng Trung; 一楼 là tầng trệt theo hệ thống phổ biến tại Trung Quốc.",
      "Báo sự cố nên nói hiện tượng cụ thể: 空调不制冷, 热水器没有热水.",
    ],
    commonMistakes: [
      { wrong: "我订了房子", right: "我订了房间 / 我有预订", explanationVi: "房子 là căn nhà; phòng khách sạn dùng 房间." },
      { wrong: "早餐几点结束了？", right: "早餐几点结束？", explanationVi: "Hỏi lịch cố định không cần 了." },
      { wrong: "存行李", right: "寄存行李", explanationVi: "寄存 là từ chính xác cho dịch vụ gửi giữ hành lý." },
    ],
    pronunciationFocus: [
      "行李 xíng li: 李 thường đọc nhẹ trong từ này.",
      "空调 kōng tiáo: 空 đọc thanh 1 trong từ chỉ điều hòa.",
      "预订 yù dìng và 预约 yù yuē đều là đặt trước, nhưng ngữ cảnh khác nhau.",
    ],
  },
  {
    scenarioId: "s9",
    summaryVi: "Rèn chuỗi giao tiếp tại sân bay và ga tàu: làm thủ tục, ký gửi, qua an ninh, tìm cửa, xử lý hoãn chuyến và mua vé.",
    vocabulary: [
      { hanzi: "值机", pinyin: "zhí jī", vi: "làm thủ tục chuyến bay" },
      { hanzi: "托运", pinyin: "tuō yùn", vi: "ký gửi" },
      { hanzi: "行李", pinyin: "xíng li", vi: "hành lý" },
      { hanzi: "安检", pinyin: "ān jiǎn", vi: "kiểm tra an ninh" },
      { hanzi: "登机口", pinyin: "dēng jī kǒu", vi: "cửa lên máy bay" },
      { hanzi: "延误", pinyin: "yán wù", vi: "bị hoãn" },
      { hanzi: "车次", pinyin: "chē cì", vi: "số hiệu chuyến tàu" },
      { hanzi: "二等座", pinyin: "èr děng zuò", vi: "ghế hạng hai" },
    ],
    sentenceFrames: [
      { hanzi: "我想办理值机。", pinyin: "wǒ xiǎng bàn lǐ zhí jī", vi: "Tôi muốn làm thủ tục chuyến bay.", noteVi: "办理 là làm thủ tục hành chính/dịch vụ." },
      { hanzi: "这件行李要托运。", pinyin: "zhè jiàn xíng li yào tuō yùn", vi: "Kiện hành lý này cần ký gửi.", noteVi: "件 dùng cho kiện/món hành lý." },
      { hanzi: "这个航班在哪个登机口？", pinyin: "zhè ge háng bān zài nǎ ge dēng jī kǒu?", vi: "Chuyến bay này ở cửa lên máy bay nào?", noteVi: "哪个 hỏi lựa chọn cụ thể trong nhiều cửa." },
      { hanzi: "我要买一张去上海的高铁票。", pinyin: "wǒ yào mǎi yì zhāng qù Shàng hǎi de gāo tiě piào", vi: "Tôi muốn mua một vé tàu cao tốc đi Thượng Hải.", noteVi: "张 là lượng từ cho vé và giấy phẳng." },
    ],
    dialogue: [
      { speakerVi: "Nhân viên", hanzi: "您好，请出示护照和机票。", pinyin: "nín hǎo, qǐng chū shì hù zhào hé jī piào", vi: "Xin chào, vui lòng xuất trình hộ chiếu và vé máy bay." },
      { speakerVi: "Bạn", hanzi: "好的。这件行李要托运。", pinyin: "hǎo de. zhè jiàn xíng li yào tuō yùn", vi: "Vâng. Kiện hành lý này cần ký gửi." },
      { speakerVi: "Nhân viên", hanzi: "请把行李放在传送带上。", pinyin: "qǐng bǎ xíng li fàng zài chuán sòng dài shàng", vi: "Vui lòng đặt hành lý lên băng chuyền." },
      { speakerVi: "Bạn", hanzi: "我的航班在哪个登机口？", pinyin: "wǒ de háng bān zài nǎ ge dēng jī kǒu?", vi: "Chuyến bay của tôi ở cửa nào?" },
      { speakerVi: "Nhân viên", hanzi: "二十六号登机口，九点开始登机。", pinyin: "èr shí liù hào dēng jī kǒu, jiǔ diǎn kāi shǐ dēng jī", vi: "Cửa số 26, bắt đầu lên máy bay lúc 9 giờ." },
      { speakerVi: "Bạn", hanzi: "请问航班准时吗？", pinyin: "qǐng wèn háng bān zhǔn shí ma?", vi: "Xin hỏi chuyến bay có đúng giờ không?" },
    ],
    pragmatics: [
      "登机 là lên máy bay; 上车 dùng cho tàu/xe; không dùng lẫn.",
      "高铁票 thường gắn với thông tin ga đi, ga đến, ngày giờ và hạng ghế.",
      "Qua an ninh, các động từ thường nghe: 拿出来, 放进去, 打开, 脱下来.",
    ],
    commonMistakes: [
      { wrong: "我的飞机延迟", right: "我的航班延误了", explanationVi: "航班 là chuyến bay; 延误 là cách nói tiêu chuẩn về hoãn chuyến." },
      { wrong: "一个行李", right: "一件行李 / 一件行李箱", explanationVi: "Hành lý thường dùng 件; vali cụ thể có thể dùng 个行李箱." },
      { wrong: "上飞机口", right: "登机口", explanationVi: "Cửa lên máy bay là từ cố định 登机口." },
    ],
    pronunciationFocus: [
      "值机 zhí jī: phân biệt 值 zhí và 直 zhí cùng âm nhưng khác chữ.",
      "延误 yán wù: cả hai âm cần rõ, không nuốt âm n cuối của yán.",
      "行李 xíng li: 行 đọc xíng trong từ này, không đọc háng.",
    ],
  },
  {
    scenarioId: "s10",
    summaryVi: "Tập mô tả triệu chứng theo cấu trúc rõ ràng: triệu chứng gì, kéo dài bao lâu, mức độ, dị ứng và yêu cầu thuốc hoặc hỗ trợ khẩn cấp.",
    vocabulary: [
      { hanzi: "发烧", pinyin: "fā shāo", vi: "sốt" },
      { hanzi: "咳嗽", pinyin: "ké sou", vi: "ho" },
      { hanzi: "头疼", pinyin: "tóu téng", vi: "đau đầu" },
      { hanzi: "过敏", pinyin: "guò mǐn", vi: "dị ứng" },
      { hanzi: "症状", pinyin: "zhèng zhuàng", vi: "triệu chứng" },
      { hanzi: "挂号", pinyin: "guà hào", vi: "đăng ký khám" },
      { hanzi: "药", pinyin: "yào", vi: "thuốc" },
      { hanzi: "剂量", pinyin: "jì liàng", vi: "liều lượng" },
      { hanzi: "救护车", pinyin: "jiù hù chē", vi: "xe cứu thương" },
    ],
    sentenceFrames: [
      { hanzi: "我发烧了，还有点咳嗽。", pinyin: "wǒ fā shāo le, hái yǒu diǎn ké sou", vi: "Tôi bị sốt và còn hơi ho.", noteVi: "了 đánh dấu tình trạng mới xuất hiện hoặc thay đổi." },
      { hanzi: "这种情况已经三天了。", pinyin: "zhè zhǒng qíng kuàng yǐ jīng sān tiān le", vi: "Tình trạng này đã ba ngày rồi.", noteVi: "已经 + thời lượng + 了 diễn tả kéo dài đến hiện tại." },
      { hanzi: "我对青霉素过敏。", pinyin: "wǒ duì qīng méi sù guò mǐn", vi: "Tôi dị ứng penicillin.", noteVi: "对 + chất + 过敏 là cấu trúc quan trọng về an toàn." },
      { hanzi: "这个药一天吃几次？", pinyin: "zhè ge yào yì tiān chī jǐ cì?", vi: "Thuốc này một ngày uống mấy lần?", noteVi: "吃药 là cách nói thông dụng cho uống thuốc." },
    ],
    dialogue: [
      { speakerVi: "Bác sĩ", hanzi: "哪里不舒服？", pinyin: "nǎ lǐ bù shū fu?", vi: "Bạn khó chịu ở đâu?" },
      { speakerVi: "Bạn", hanzi: "我发烧了，头也很疼。", pinyin: "wǒ fā shāo le, tóu yě hěn téng", vi: "Tôi bị sốt, đầu cũng đau nhiều." },
      { speakerVi: "Bác sĩ", hanzi: "多长时间了？", pinyin: "duō cháng shí jiān le?", vi: "Được bao lâu rồi?" },
      { speakerVi: "Bạn", hanzi: "从昨天晚上开始。", pinyin: "cóng zuó tiān wǎn shang kāi shǐ", vi: "Bắt đầu từ tối hôm qua." },
      { speakerVi: "Bác sĩ", hanzi: "你对什么药过敏吗？", pinyin: "nǐ duì shén me yào guò mǐn ma?", vi: "Bạn có dị ứng thuốc gì không?" },
      { speakerVi: "Bạn", hanzi: "我对青霉素过敏。", pinyin: "wǒ duì qīng méi sù guò mǐn", vi: "Tôi dị ứng penicillin." },
    ],
    pragmatics: [
      "Trong tình huống y tế thật, ưu tiên nói ngắn, rõ, cung cấp dị ứng và bệnh nền quan trọng.",
      "疼 và 痛 đều chỉ đau; 疼 phổ biến trong khẩu ngữ, 痛 thường thấy trong thuật ngữ hoặc mô tả chính thức.",
      "Ứng dụng chỉ hỗ trợ ngôn ngữ, không thay thế tư vấn hay chẩn đoán y tế.",
    ],
    commonMistakes: [
      { wrong: "我有发烧", right: "我发烧了 / 我有点发烧", explanationVi: "发烧 thường dùng như động từ hoặc tính trạng, không cần 有 trong câu cơ bản." },
      { wrong: "我过敏青霉素", right: "我对青霉素过敏", explanationVi: "Cần giới từ 对 trước tác nhân gây dị ứng." },
      { wrong: "药怎么喝？", right: "这个药怎么吃？", explanationVi: "Khẩu ngữ tiếng Trung dùng 吃药 ngay cả với nhiều loại thuốc uống." },
    ],
    pronunciationFocus: [
      "咳嗽 ké sou: 嗽 thường đọc nhẹ.",
      "疼 téng và 等 děng khác phụ âm đầu và thanh điệu.",
      "救护车 jiù hù chē: giữ rõ ba âm để tránh nghe nhầm khi khẩn cấp.",
    ],
  },
  {
    scenarioId: "s11",
    summaryVi: "Học cách mua SIM, chọn gói dữ liệu, nạp tiền, kiểm tra số dư và xử lý lỗi Wi-Fi hoặc tín hiệu mạng.",
    vocabulary: [
      { hanzi: "手机卡", pinyin: "shǒu jī kǎ", vi: "SIM điện thoại" },
      { hanzi: "流量", pinyin: "liú liàng", vi: "dung lượng dữ liệu" },
      { hanzi: "套餐", pinyin: "tào cān", vi: "gói cước" },
      { hanzi: "充值", pinyin: "chōng zhí", vi: "nạp tiền" },
      { hanzi: "余额", pinyin: "yú é", vi: "số dư" },
      { hanzi: "密码", pinyin: "mì mǎ", vi: "mật khẩu" },
      { hanzi: "连接", pinyin: "lián jiē", vi: "kết nối" },
      { hanzi: "信号", pinyin: "xìn hào", vi: "tín hiệu" },
    ],
    sentenceFrames: [
      { hanzi: "我想办一张手机卡。", pinyin: "wǒ xiǎng bàn yì zhāng shǒu jī kǎ", vi: "Tôi muốn đăng ký một SIM điện thoại.", noteVi: "办 dùng cho làm/đăng ký dịch vụ." },
      { hanzi: "这个套餐每月有多少流量？", pinyin: "zhè ge tào cān měi yuè yǒu duō shǎo liú liàng?", vi: "Gói này mỗi tháng có bao nhiêu dữ liệu?", noteVi: "每月 nghĩa là mỗi tháng." },
      { hanzi: "请帮我充一百块话费。", pinyin: "qǐng bāng wǒ chōng yì bǎi kuài huà fèi", vi: "Vui lòng nạp giúp tôi 100 tệ tiền điện thoại.", noteVi: "话费 là số dư dùng cho dịch vụ điện thoại." },
      { hanzi: "为什么连不上无线网？", pinyin: "wèi shén me lián bú shàng wú xiàn wǎng?", vi: "Tại sao không kết nối được Wi-Fi?", noteVi: "V + 不上 diễn tả không đạt được kết quả kết nối." },
    ],
    dialogue: [
      { speakerVi: "Nhân viên", hanzi: "您好，想办理什么业务？", pinyin: "nín hǎo, xiǎng bàn lǐ shén me yè wù?", vi: "Xin chào, bạn muốn làm dịch vụ gì?" },
      { speakerVi: "Bạn", hanzi: "我想办一张手机卡，主要用流量。", pinyin: "wǒ xiǎng bàn yì zhāng shǒu jī kǎ, zhǔ yào yòng liú liàng", vi: "Tôi muốn đăng ký một SIM, chủ yếu dùng dữ liệu." },
      { speakerVi: "Nhân viên", hanzi: "这个套餐每月有五十个G。", pinyin: "zhè ge tào cān měi yuè yǒu wǔ shí ge G", vi: "Gói này mỗi tháng có 50 GB." },
      { speakerVi: "Bạn", hanzi: "可以打国际电话吗？", pinyin: "kě yǐ dǎ guó jì diàn huà ma?", vi: "Có thể gọi quốc tế không?" },
      { speakerVi: "Nhân viên", hanzi: "可以，但是要另外收费。", pinyin: "kě yǐ, dàn shì yào lìng wài shōu fèi", vi: "Có, nhưng sẽ tính phí riêng." },
      { speakerVi: "Bạn", hanzi: "好的，我办这个套餐。", pinyin: "hǎo de, wǒ bàn zhè ge tào cān", vi: "Được, tôi đăng ký gói này." },
    ],
    pragmatics: [
      "流量 trong ngữ cảnh điện thoại là dữ liệu di động, không phải lưu lượng giao thông.",
      "实名制 có nghĩa SIM phải đăng ký bằng giấy tờ thật; khách nước ngoài thường cần hộ chiếu.",
      "连不上 mô tả không kết nối được; 没信号 mô tả không có tín hiệu.",
    ],
    commonMistakes: [
      { wrong: "买一个SIM", right: "办一张手机卡", explanationVi: "Trong dịch vụ viễn thông, 办一张手机卡 tự nhiên hơn." },
      { wrong: "多少网络？", right: "多少流量？", explanationVi: "Hỏi dung lượng dữ liệu dùng 流量." },
      { wrong: "我不能连接", right: "我连不上 / 连接不上", explanationVi: "Khi lỗi kết nối thực tế, bổ ngữ kết quả 上 tự nhiên hơn." },
    ],
    pronunciationFocus: [
      "流量 liú liàng: hai chữ cùng vần gần nhau nhưng khác thanh 2 và 4.",
      "充值 chōng zhí: chú ý âm đầu ch của 充 và zh của 值.",
      "余额 yú é: tách rõ hai âm, tránh đọc dính thành một âm.",
    ],
  },
  {
    scenarioId: "s12",
    summaryVi: "Bao quát các tình huống sống hằng ngày: tìm hàng trong siêu thị, nhận giao hàng và mô tả sự cố nhà ở để yêu cầu sửa chữa.",
    vocabulary: [
      { hanzi: "货架", pinyin: "huò jià", vi: "kệ hàng" },
      { hanzi: "快递", pinyin: "kuài dì", vi: "bưu kiện / chuyển phát" },
      { hanzi: "外卖", pinyin: "wài mài", vi: "đồ ăn giao tận nơi" },
      { hanzi: "门口", pinyin: "mén kǒu", vi: "cửa ra vào" },
      { hanzi: "联系", pinyin: "lián xì", vi: "liên hệ" },
      { hanzi: "漏水", pinyin: "lòu shuǐ", vi: "rò rỉ nước" },
      { hanzi: "停电", pinyin: "tíng diàn", vi: "mất điện" },
      { hanzi: "维修", pinyin: "wéi xiū", vi: "sửa chữa" },
      { hanzi: "空调", pinyin: "kōng tiáo", vi: "điều hòa" },
    ],
    sentenceFrames: [
      { hanzi: "请问，……在哪一排？", pinyin: "qǐng wèn, … zài nǎ yì pái?", vi: "Xin hỏi, … ở dãy nào?", noteVi: "排 dùng cho dãy/khu kệ trong siêu thị." },
      { hanzi: "请放在门口，我马上下来。", pinyin: "qǐng fàng zài mén kǒu, wǒ mǎ shàng xià lái", vi: "Vui lòng đặt ở cửa, tôi xuống ngay.", noteVi: "下来 diễn tả đi xuống về phía người nói/điểm tham chiếu." },
      { hanzi: "厨房的水管漏水了。", pinyin: "chú fáng de shuǐ guǎn lòu shuǐ le", vi: "Ống nước trong bếp bị rò rồi.", noteVi: "Nói rõ vị trí + thiết bị + hiện tượng." },
      { hanzi: "请问什么时候能来维修？", pinyin: "qǐng wèn shén me shí hou néng lái wéi xiū?", vi: "Xin hỏi khi nào có thể đến sửa?", noteVi: "能来维修 hỏi thời gian có thể bố trí kỹ thuật." },
    ],
    dialogue: [
      { speakerVi: "Bạn", hanzi: "您好，我家的空调不制冷。", pinyin: "nín hǎo, wǒ jiā de kōng tiáo bù zhì lěng", vi: "Xin chào, điều hòa nhà tôi không làm lạnh." },
      { speakerVi: "Nhân viên", hanzi: "什么时候开始有这个问题？", pinyin: "shén me shí hou kāi shǐ yǒu zhè ge wèn tí?", vi: "Vấn đề này bắt đầu từ khi nào?" },
      { speakerVi: "Bạn", hanzi: "从昨天晚上开始。", pinyin: "cóng zuó tiān wǎn shang kāi shǐ", vi: "Bắt đầu từ tối qua." },
      { speakerVi: "Nhân viên", hanzi: "今天下午两点可以上门检查。", pinyin: "jīn tiān xià wǔ liǎng diǎn kě yǐ shàng mén jiǎn chá", vi: "Hai giờ chiều nay có thể đến tận nhà kiểm tra." },
      { speakerVi: "Bạn", hanzi: "好的，请提前给我打电话。", pinyin: "hǎo de, qǐng tí qián gěi wǒ dǎ diàn huà", vi: "Được, vui lòng gọi trước cho tôi." },
      { speakerVi: "Nhân viên", hanzi: "没问题。", pinyin: "méi wèn tí", vi: "Không vấn đề." },
    ],
    pragmatics: [
      "外卖 thường chỉ đồ ăn giao; 快递 thường chỉ bưu kiện/hàng chuyển phát.",
      "上门 nghĩa là đến tận nhà để cung cấp dịch vụ.",
      "Báo sửa chữa hiệu quả nên gồm: vị trí, thiết bị, hiện tượng, thời điểm bắt đầu và thời gian có thể tiếp nhận.",
    ],
    commonMistakes: [
      { wrong: "空调不冷", right: "空调不制冷 / 空调不凉", explanationVi: "不制冷 chính xác hơn khi nói thiết bị không làm lạnh." },
      { wrong: "快递放门", right: "请把快递放在门口", explanationVi: "Cần 在 trước vị trí; 把 giúp câu yêu cầu rõ hơn." },
      { wrong: "什么时候修理来？", right: "什么时候能来维修？", explanationVi: "Trật tự tự nhiên là thời gian + 能来 + động từ." },
    ],
    pronunciationFocus: [
      "快递 kuài dì và 外卖 wài mài có vần gần nhau, cần giữ đúng phụ âm đầu.",
      "维修 wéi xiū: 维 thanh 2, 修 thanh 1.",
      "漏水 lòu shuǐ: phân biệt lòu và lóu (tầng/lầu).",
    ],
  },
  {
    scenarioId: "s13",
    summaryVi: "Nâng chất lượng ứng xử xã hội: mời, xác nhận lịch, từ chối lịch sự, đề xuất thời gian khác, xin lỗi và gỡ hiểu lầm.",
    vocabulary: [
      { hanzi: "邀请", pinyin: "yāo qǐng", vi: "mời" },
      { hanzi: "改时间", pinyin: "gǎi shí jiān", vi: "đổi thời gian" },
      { hanzi: "临时", pinyin: "lín shí", vi: "đột xuất" },
      { hanzi: "不好意思", pinyin: "bù hǎo yì si", vi: "xin lỗi / ngại quá" },
      { hanzi: "下次", pinyin: "xià cì", vi: "lần sau" },
      { hanzi: "误会", pinyin: "wù huì", vi: "hiểu lầm" },
      { hanzi: "解释", pinyin: "jiě shì", vi: "giải thích" },
      { hanzi: "方便", pinyin: "fāng biàn", vi: "thuận tiện" },
    ],
    sentenceFrames: [
      { hanzi: "周末一起去……怎么样？", pinyin: "zhōu mò yì qǐ qù… zěn me yàng?", vi: "Cuối tuần cùng đi… thì sao?", noteVi: "怎么样 dùng để xin ý kiến về đề xuất." },
      { hanzi: "不好意思，我临时有事。", pinyin: "bù hǎo yì si, wǒ lín shí yǒu shì", vi: "Xin lỗi, tôi có việc đột xuất.", noteVi: "Cách từ chối ngắn và lịch sự." },
      { hanzi: "我们改到星期天，可以吗？", pinyin: "wǒ men gǎi dào xīng qī tiān, kě yǐ ma?", vi: "Chúng ta đổi sang Chủ nhật được không?", noteVi: "改到 + thời gian mới." },
      { hanzi: "你别误会，我不是那个意思。", pinyin: "nǐ bié wù huì, wǒ bú shì nà ge yì si", vi: "Bạn đừng hiểu lầm, tôi không có ý đó.", noteVi: "别 + động từ là lời khuyên hoặc yêu cầu không làm gì." },
    ],
    dialogue: [
      { speakerVi: "Bạn", hanzi: "这个周末一起去看电影怎么样？", pinyin: "zhè ge zhōu mò yì qǐ qù kàn diàn yǐng zěn me yàng?", vi: "Cuối tuần này cùng đi xem phim thì sao?" },
      { speakerVi: "Bạn bè", hanzi: "不好意思，星期六我临时有事。", pinyin: "bù hǎo yì si, xīng qī liù wǒ lín shí yǒu shì", vi: "Xin lỗi, thứ Bảy tôi có việc đột xuất." },
      { speakerVi: "Bạn", hanzi: "没关系。星期天下午方便吗？", pinyin: "méi guān xi. xīng qī tiān xià wǔ fāng biàn ma?", vi: "Không sao. Chiều Chủ nhật có tiện không?" },
      { speakerVi: "Bạn bè", hanzi: "可以，三点以后都有空。", pinyin: "kě yǐ, sān diǎn yǐ hòu dōu yǒu kòng", vi: "Được, sau 3 giờ đều rảnh." },
      { speakerVi: "Bạn", hanzi: "那我们四点在电影院门口见。", pinyin: "nà wǒ men sì diǎn zài diàn yǐng yuàn mén kǒu jiàn", vi: "Vậy 4 giờ gặp ở cửa rạp phim." },
      { speakerVi: "Bạn bè", hanzi: "好，到时候见。", pinyin: "hǎo, dào shí hou jiàn", vi: "Được, hẹn gặp lúc đó." },
    ],
    pragmatics: [
      "Từ chối tốt nên có ba phần: xin lỗi, lý do ngắn, đề xuất thời gian khác.",
      "没关系 đáp lại lời xin lỗi; 没事儿 thân mật hơn và thường nghe ở miền Bắc.",
      "不是那个意思 dùng để làm rõ ý định, nhưng nên bổ sung ý thật của mình để tránh mơ hồ.",
    ],
    commonMistakes: [
      { wrong: "我拒绝你", right: "不好意思，我那天有事", explanationVi: "拒绝 quá trực diện trong tình huống xã hội thông thường." },
      { wrong: "改星期天", right: "改到星期天", explanationVi: "Dùng 到 để chỉ chuyển sang mốc thời gian mới." },
      { wrong: "你误会不要", right: "你别误会", explanationVi: "Mệnh lệnh phủ định dùng 别 + động từ." },
    ],
    pronunciationFocus: [
      "意思 yì si: 思 thường đọc nhẹ.",
      "关系 guān xi: 系 thường đọc nhẹ trong 没关系.",
      "解释 jiě shì: chú ý thanh 3 rồi thanh 4.",
    ],
  },
  {
    scenarioId: "s14",
    summaryVi: "Phát triển năng lực làm việc thực tế: báo cáo tiến độ có cấu trúc, xác nhận đầu ra, nêu rủi ro và thương lượng thời hạn dựa trên ưu tiên.",
    vocabulary: [
      { hanzi: "进度", pinyin: "jìn dù", vi: "tiến độ" },
      { hanzi: "完成", pinyin: "wán chéng", vi: "hoàn thành" },
      { hanzi: "问题", pinyin: "wèn tí", vi: "vấn đề" },
      { hanzi: "数据", pinyin: "shù jù", vi: "dữ liệu" },
      { hanzi: "交付", pinyin: "jiāo fù", vi: "bàn giao / giao nộp" },
      { hanzi: "格式", pinyin: "gé shì", vi: "định dạng" },
      { hanzi: "优先级", pinyin: "yōu xiān jí", vi: "mức độ ưu tiên" },
      { hanzi: "截止时间", pinyin: "jié zhǐ shí jiān", vi: "thời hạn chót" },
      { hanzi: "风险", pinyin: "fēng xiǎn", vi: "rủi ro" },
    ],
    sentenceFrames: [
      { hanzi: "目前已经完成了……", pinyin: "mù qián yǐ jīng wán chéng le…", vi: "Hiện tại đã hoàn thành…", noteVi: "Mở đầu báo cáo bằng phần đã hoàn thành." },
      { hanzi: "现在有一个……问题，可能会影响……", pinyin: "xiàn zài yǒu yí ge… wèn tí, kě néng huì yǐng xiǎng…", vi: "Hiện có một vấn đề…, có thể ảnh hưởng…", noteVi: "Nêu vấn đề và tác động, không chỉ nêu khó khăn." },
      { hanzi: "最终需要交付什么格式的文件？", pinyin: "zuì zhōng xū yào jiāo fù shén me gé shì de wén jiàn?", vi: "Cuối cùng cần bàn giao tệp định dạng gì?", noteVi: "Dùng để xác nhận đầu ra trước khi làm sâu." },
      { hanzi: "我建议把截止时间调整到……", pinyin: "wǒ jiàn yì bǎ jié zhǐ shí jiān tiáo zhěng dào…", vi: "Tôi đề xuất điều chỉnh thời hạn sang…", noteVi: "Đề xuất nên đi kèm lý do và kế hoạch ưu tiên." },
    ],
    dialogue: [
      { speakerVi: "Quản lý", hanzi: "这个项目现在进展怎么样？", pinyin: "zhè ge xiàng mù xiàn zài jìn zhǎn zěn me yàng?", vi: "Dự án này hiện tiến triển thế nào?" },
      { speakerVi: "Bạn", hanzi: "数据整理已经完成了百分之八十。", pinyin: "shù jù zhěng lǐ yǐ jīng wán chéng le bǎi fēn zhī bā shí", vi: "Việc tổng hợp dữ liệu đã hoàn thành 80%." },
      { speakerVi: "Quản lý", hanzi: "目前有什么风险？", pinyin: "mù qián yǒu shén me fēng xiǎn?", vi: "Hiện có rủi ro gì?" },
      { speakerVi: "Bạn", hanzi: "两份原始数据不一致，可能影响最终结果。", pinyin: "liǎng fèn yuán shǐ shù jù bù yí zhì, kě néng yǐng xiǎng zuì zhōng jié guǒ", vi: "Hai nguồn dữ liệu gốc không nhất quán, có thể ảnh hưởng kết quả cuối." },
      { speakerVi: "Quản lý", hanzi: "你建议怎么处理？", pinyin: "nǐ jiàn yì zěn me chǔ lǐ?", vi: "Bạn đề xuất xử lý thế nào?" },
      { speakerVi: "Bạn", hanzi: "我建议先确认付款数据，其他部分明天下午完成。", pinyin: "wǒ jiàn yì xiān què rèn fù kuǎn shù jù, qí tā bù fen míng tiān xià wǔ wán chéng", vi: "Tôi đề xuất xác nhận dữ liệu thanh toán trước, các phần khác hoàn thành chiều mai." },
    ],
    pragmatics: [
      "Báo cáo tốt theo thứ tự: đã hoàn thành → vấn đề → tác động → bước tiếp theo → thời hạn.",
      "协商 không phải chỉ xin lùi hạn; cần đưa phương án, ưu tiên và cam kết mới.",
      "请确认… là cách yêu cầu xác nhận bằng văn bản hoặc trong cuộc họp mà vẫn lịch sự.",
    ],
    commonMistakes: [
      { wrong: "工作做了八十", right: "工作完成了百分之八十", explanationVi: "Tỷ lệ cần dùng 百分之 + số." },
      { wrong: "问题影响结果可能", right: "问题可能会影响结果", explanationVi: "Phó từ khả năng đứng trước 会 + động từ." },
      { wrong: "截止日在星期五", right: "截止时间是星期五 / 星期五截止", explanationVi: "截止时间 là cụm phổ biến hơn 截止日 trong giao tiếp công việc thông thường." },
    ],
    pronunciationFocus: [
      "进度 jìn dù và 进展 jìn zhǎn đều chỉ tiến triển nhưng cách dùng khác nhau.",
      "截止 jié zhǐ: 截 thanh 2, 止 thanh 3.",
      "优先级 yōu xiān jí: giữ rõ ba âm khi nói trong cuộc họp.",
    ],
  },
  {
    scenarioId: "s15",
    summaryVi: "Ưu tiên truyền đạt nhanh và chính xác khi mất đồ hoặc lạc người: vật/người nào, đặc điểm, thời gian, địa điểm cuối cùng và cách liên hệ.",
    vocabulary: [
      { hanzi: "丢了", pinyin: "diū le", vi: "bị mất" },
      { hanzi: "落在", pinyin: "là zài", vi: "để quên tại" },
      { hanzi: "特征", pinyin: "tè zhēng", vi: "đặc điểm nhận dạng" },
      { hanzi: "最后看到", pinyin: "zuì hòu kàn dào", vi: "nhìn thấy lần cuối" },
      { hanzi: "联系方式", pinyin: "lián xì fāng shì", vi: "thông tin liên hệ" },
      { hanzi: "广播", pinyin: "guǎng bō", vi: "phát thông báo" },
      { hanzi: "保安", pinyin: "bǎo ān", vi: "bảo vệ" },
      { hanzi: "报警", pinyin: "bào jǐng", vi: "báo cảnh sát" },
      { hanzi: "紧急", pinyin: "jǐn jí", vi: "khẩn cấp" },
    ],
    sentenceFrames: [
      { hanzi: "我的手机丢了。", pinyin: "wǒ de shǒu jī diū le", vi: "Điện thoại của tôi bị mất.", noteVi: "Nói vật bị mất trước, sau đó bổ sung nơi và thời gian." },
      { hanzi: "我可能落在出租车上了。", pinyin: "wǒ kě néng là zài chū zū chē shàng le", vi: "Có thể tôi để quên trên taxi.", noteVi: "落在 nhấn mạnh để quên đồ ở một nơi." },
      { hanzi: "他穿蓝色上衣，背黑色书包。", pinyin: "tā chuān lán sè shàng yī, bēi hēi sè shū bāo", vi: "Người đó mặc áo xanh và đeo ba lô đen.", noteVi: "Mô tả quần áo, chiều cao, độ tuổi và vật mang theo." },
      { hanzi: "请马上广播并联系保安。", pinyin: "qǐng mǎ shàng guǎng bō bìng lián xì bǎo ān", vi: "Vui lòng phát thông báo và liên hệ bảo vệ ngay.", noteVi: "马上 thể hiện mức độ khẩn cấp." },
    ],
    dialogue: [
      { speakerVi: "Bảo vệ", hanzi: "请别着急，发生什么事了？", pinyin: "qǐng bié zháo jí, fā shēng shén me shì le?", vi: "Bạn đừng quá lo, đã xảy ra chuyện gì?" },
      { speakerVi: "Bạn", hanzi: "我的孩子走失了。", pinyin: "wǒ de hái zi zǒu shī le", vi: "Con tôi bị lạc." },
      { speakerVi: "Bảo vệ", hanzi: "他有什么特征？最后在哪里看到他？", pinyin: "tā yǒu shén me tè zhēng? zuì hòu zài nǎ lǐ kàn dào tā?", vi: "Bé có đặc điểm gì? Lần cuối bạn thấy bé ở đâu?" },
      { speakerVi: "Bạn", hanzi: "他五岁，穿黄色上衣。我们最后在二楼看到他。", pinyin: "tā wǔ suì, chuān huáng sè shàng yī. wǒ men zuì hòu zài èr lóu kàn dào tā", vi: "Bé 5 tuổi, mặc áo vàng. Lần cuối chúng tôi thấy bé ở tầng hai." },
      { speakerVi: "Bảo vệ", hanzi: "我们马上广播，请留下电话号码。", pinyin: "wǒ men mǎ shàng guǎng bō, qǐng liú xià diàn huà hào mǎ", vi: "Chúng tôi sẽ phát thông báo ngay, vui lòng để lại số điện thoại." },
      { speakerVi: "Bạn", hanzi: "好的，这是我的号码。", pinyin: "hǎo de, zhè shì wǒ de hào mǎ", vi: "Vâng, đây là số của tôi." },
    ],
    pragmatics: [
      "Trong khẩn cấp, ưu tiên câu ngắn và thông tin có thể hành động; không cố nói câu quá dài.",
      "走失 thường dùng khi người bị lạc/mất liên lạc; 丢了 dùng phổ biến cho đồ vật.",
      "Nếu có nguy hiểm tức thời, gọi số khẩn cấp địa phương thay vì chỉ dựa vào hội thoại mẫu.",
    ],
    commonMistakes: [
      { wrong: "我的孩子丢了", right: "我的孩子走失了", explanationVi: "Với người bị lạc, 走失 trang trọng và phù hợp hơn 丢了." },
      { wrong: "我忘记手机在车", right: "我可能把手机落在车上了", explanationVi: "落在 + nơi diễn tả để quên đồ ở đâu tự nhiên hơn." },
      { wrong: "他衣服蓝色", right: "他穿蓝色上衣", explanationVi: "Mô tả quần áo dùng 穿 + loại/màu quần áo." },
    ],
    pronunciationFocus: [
      "着急 zháo jí: 着 đọc zháo trong nghĩa lo lắng, không đọc zhe.",
      "走失 zǒu shī và 丢失 diū shī đều có 失 nhưng ngữ cảnh khác nhau.",
      "报警 bào jǐng: phân biệt 报 bào và 保 bǎo trong 保安.",
    ],
  },
];

export const missionChallenges: Record<string, string> = {
  m1: "Gọi một ly latte nóng, chọn kích cỡ, mức đường và nói rõ mang đi hay dùng tại chỗ.",
  m2: "Gọi một đồ uống không đá, sau đó đổi sang ít đá khi nhân viên nói không thể bỏ đá hoàn toàn.",
  m3: "Yêu cầu thanh toán, hỏi tổng tiền, chọn phương thức thanh toán và xin hóa đơn.",
  m4: "Gọi hai món mang đi, nêu mức cay và xác nhận thời gian chờ.",
  m5: "Nói điểm đến bằng tên và địa chỉ, hỏi thời gian dự kiến và yêu cầu báo khi đến.",
  m6: "Lịch sự yêu cầu chạy chậm, nêu lý do và xác nhận tài xế đã hiểu.",
  m7: "Yêu cầu dừng ở vị trí an toàn phía trước thay vì nói 'dừng ngay'.",
  m8: "Hỏi ga tàu điện gần nhất và nhắc lại chỉ dẫn để xác nhận.",
  m9: "Hỏi khoảng cách, thời gian đi bộ và phương tiện nào nhanh hơn.",
  m10: "Hiểu một chuỗi chỉ dẫn gồm đi thẳng, rẽ và một mốc địa điểm.",
  m11: "Giới thiệu tên đầy đủ, tên gọi ngắn và một câu chào kết thúc tự nhiên.",
  m12: "Nói quốc gia, thành phố đang sống và thời gian đã ở đó.",
  m13: "Nói nghề nghiệp, nơi làm việc và một nhiệm vụ chính trong công việc.",
  m14: "Đề nghị thêm WeChat, chọn quét QR và xác nhận đã nhận lời mời.",
  m15: "Mời đi ăn với thời gian cụ thể, hỏi món yêu thích và thống nhất địa điểm.",
  m16: "Nói hai sở thích, hỏi lại người đối diện và tìm một điểm chung.",
  m17: "Chào đồng nghiệp, hỏi thăm ngắn và chuyển sang nội dung công việc.",
  m18: "Nhờ hỗ trợ một tệp, nói rõ chỗ chưa hiểu và hẹn thời gian trao đổi.",
  m19: "Đề xuất hai khung giờ họp và xác nhận họp trực tiếp hay trực tuyến.",
  m20: "Xin nghỉ, nói thời lượng, lý do ngắn và kế hoạch bàn giao.",
  m21: "Hỏi giá, hỏi giảm giá và so sánh hai sản phẩm trước khi quyết định.",
  m22: "Yêu cầu thử đồ, đổi cỡ và mô tả vì sao chưa vừa.",
  m23: "Thanh toán, chọn phương thức và yêu cầu loại hóa đơn phù hợp.",
  m24: "Trình bày lý do đổi trả, xuất trình biên nhận và đề xuất đổi hoặc hoàn tiền.",
  m25: "Nhận phòng bằng tên đặt chỗ, xuất trình hộ chiếu và xác nhận số đêm.",
  m26: "Hỏi mật khẩu Wi-Fi, giờ ăn sáng và vị trí nhà hàng.",
  m27: "Báo một sự cố phòng, mô tả hiện tượng và hỏi thời gian sửa.",
  m28: "Trả phòng, hỏi phí phát sinh và gửi hành lý đến một giờ cụ thể.",
  m29: "Làm thủ tục, ký gửi hành lý và hỏi giới hạn khối lượng.",
  m30: "Hiểu ba chỉ dẫn an ninh và hỏi lại khi chưa nghe rõ.",
  m31: "Tìm cửa lên máy bay, hỏi giờ bắt đầu lên máy bay và tình trạng hoãn.",
  m32: "Mua vé tàu với ngày, giờ, điểm đến và loại ghế cụ thể.",
  m33: "Mô tả ba triệu chứng, thời gian bắt đầu và mức độ nặng nhẹ.",
  m34: "Mua thuốc, nói dị ứng và hỏi liều dùng, thời điểm dùng.",
  m35: "Đăng ký đúng khoa, đề xuất thời gian khám và hỏi cần mang giấy tờ gì.",
  m36: "Nói loại khẩn cấp, vị trí chính xác và yêu cầu xe cứu thương.",
  m37: "Chọn SIM dựa trên dung lượng, thời hạn và khả năng gọi quốc tế.",
  m38: "Nạp tiền, xác nhận số tiền và hỏi cách kiểm tra số dư.",
  m39: "Hỏi mật khẩu, mô tả lỗi kết nối và yêu cầu khởi động lại mạng.",
  m40: "Tìm hai sản phẩm, hỏi dãy kệ và xác nhận còn hàng hay không.",
  m41: "Xác nhận địa chỉ giao hàng, vị trí đặt đồ và cách liên hệ khi tới.",
  m42: "Mô tả vị trí, thiết bị hỏng, thời điểm xảy ra và hẹn lịch sửa.",
  m43: "Mời một hoạt động cuối tuần, nêu thời gian và phương án dự phòng.",
  m44: "Từ chối lịch sự, đưa lý do ngắn và đề xuất một thời gian khác.",
  m45: "Xin lỗi, giải thích hiểu lầm và xác nhận lại ý định thật.",
  m46: "Báo cáo theo 5 bước: đã làm, tỷ lệ, vấn đề, tác động và việc tiếp theo.",
  m47: "Xác nhận đầu ra, định dạng, ví dụ tham khảo và mức độ ưu tiên.",
  m48: "Nêu khối lượng và rủi ro, đề xuất hạn mới và cam kết phần ưu tiên.",
  m49: "Báo mất đồ, mô tả đặc điểm, nơi có thể để quên và để lại liên hệ.",
  m50: "Mô tả người bị lạc, nơi nhìn thấy cuối cùng và yêu cầu phát thông báo ngay.",
};

export function getLessonGuide(scenarioId: string): ScenarioLessonGuide | undefined {
  return guides.find((guide) => guide.scenarioId === scenarioId);
}

export function getMissionChallenge(missionId: string): string {
  return missionChallenges[missionId] || "Hoàn thành nhiệm vụ mà không nhìn pinyin và chủ động hỏi thêm một câu mở rộng.";
}
