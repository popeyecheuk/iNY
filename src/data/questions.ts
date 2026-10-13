export interface QuestionItem {
  id: number;
  en: string;
  zh_tw: string;
  cantonese: string;
  function: 'Ne' | 'Ni' | 'Se' | 'Si' | 'Te' | 'Ti' | 'Fe' | 'Fi';
}

export const QUESTIONS_DATA: QuestionItem[] = [
  {
    id: 1,
    en: "I find it difficult to focus on only one thing for an extended period.",
    zh_tw: "很難長時間只專注在同一件事情上。",
    cantonese: "好難長時間淨係專心做同一件嘢。",
    function: "Ne"
  },
  {
    id: 2,
    en: "I tend to stick to a stable and consistent daily routine.",
    zh_tw: "習慣維持規律且穩定的日常生活作息。",
    cantonese: "習慣跟返一套固定又規律嘅生活作息。",
    function: "Si"
  },
  {
    id: 3,
    en: "I intuitively know an answer or outcome without being able to explain why.",
    zh_tw: "能憑直覺感知到答案，卻往往難以用言語解釋推導過程。",
    cantonese: "憑直覺就知個答案係點，但好難用說話解釋返點解會知。",
    function: "Ni"
  },
  {
    id: 4,
    en: "I often feel like one of the few genuinely kind and sincere people left.",
    zh_tw: "有時會覺得自己是少數依然堅持真心善良的人。",
    cantonese: "成日覺得自己係少數仲會真心對人善良嘅人。",
    function: "Fi"
  },
  {
    id: 5,
    en: "I have a keen eye for aesthetics, sensory pleasures, and comfortable surroundings.",
    zh_tw: "追求生活品味與美感，懂得享受環境帶來的感官舒適。",
    cantonese: "好講求生活品味同美感，好懂得享受舒服嘅環境同感官體驗。",
    function: "Se"
  },
  {
    id: 6,
    en: "I frequently daydream about fanciful ideas and unreal scenarios.",
    zh_tw: "經常陷入天馬行空的幻想，思考與現實無關的事物。",
    cantonese: "成日會發白日夢，諗埋一啲同現實完全冇關嘅古怪嘢。",
    function: "Ne"
  },
  {
    id: 7,
    en: "When solving problems, I prefer thorough logical analysis over hasty speed.",
    zh_tw: "解決問題時，寧可多花時間推演周全，也不願草率求快。",
    cantonese: "解決問題嗰陣，寧願花多啲時間推敲到滴水不漏，都唔想為咗求快而草草了事。",
    function: "Ti"
  },
  {
    id: 8,
    en: "I am consistently driven by clear, measurable goals and milestones.",
    zh_tw: "習慣為自己設定明確具體的目標，並全力按部就班執行。",
    cantonese: "習慣幫自己定下好清楚嘅目標同進度，跟住一步步去衝。",
    function: "Te"
  },
  {
    id: 9,
    en: "I trust verifiable facts and empirical data far more than subjective intuition.",
    zh_tw: "比起主觀直覺，我更信任客觀事實與實質數據。",
    cantonese: "比起直覺，我信實質數據同真憑實據多好多。",
    function: "Te"
  },
  {
    id: 10,
    en: "I find it frustrating to communicate with people who lack sound logic.",
    zh_tw: "很難與思考缺乏邏輯或邏輯不一致的人溝通。",
    cantonese: "好難同啲講嘢冇邏輯或者思路混亂嘅人溝通。",
    function: "Ti"
  },
  {
    id: 11,
    en: "Others sometimes perceive me as aloof, stubborn, or self-centered.",
    zh_tw: "有時會被他人認為過於自我、執著或不夠圓融。",
    cantonese: "有時會俾人覺得我太過自我中心，甚至有啲固執。",
    function: "Fi"
  },
  {
    id: 12,
    en: "In conversations, my thoughts branch out and I easily drift off-topic.",
    zh_tw: "聊天時容易思維發散，不知不覺就跳到其他不相關的話題。",
    cantonese: "同人傾傾下偈好容易會思緒飛咗去第二度，越講越偏離原本個主題。",
    function: "Ne"
  },
  {
    id: 13,
    en: "I prioritize strict logical consistency over emotional comfort in most situations.",
    zh_tw: "在多數情況下，我堅持邏輯的嚴密與客觀，大於情感上的安慰。",
    cantonese: "大部份情況下，我講求邏輯要嚴密合理，多過照顧人哋面子或者情緒。",
    function: "Ti"
  },
  {
    id: 14,
    en: "I naturally and deeply empathize with the hardships of others.",
    zh_tw: "很容易對他人的痛苦與困境感同身受並心生憐憫。",
    cantonese: "好容易對人哋嘅遭遇同辛苦感同身受，忍唔住戥人難過。",
    function: "Fe"
  },
  {
    id: 15,
    en: "I automatically compare current situations with vivid past experiences.",
    zh_tw: "習慣以過往的經驗與記憶，作為衡量眼前狀況的參照基準。",
    cantonese: "習慣拿返以前嘅舊經驗同回憶，嚟對比眼前發生緊嘅事。",
    function: "Si"
  },
  {
    id: 16,
    en: "I am direct and blunt, stating facts without sugarcoating.",
    zh_tw: "說話開門見山、就事論事，不太會拐彎抹角或刻意修飾。",
    cantonese: "講嘢好爽快直截了當，有嗰句講嗰句，唔會兜圈或者特登包裝。",
    function: "Te"
  },
  {
    id: 17,
    en: "I am driven to optimize workflows and eliminate systemic inefficiencies.",
    zh_tw: "熱衷於優化流程與調配資源，以極大化整體運作效率。",
    cantonese: "好鍾意執靚啲工作流程，減省多餘步驟嚟將效率推到最高。",
    function: "Te"
  },
  {
    id: 18,
    en: "I construct internal mental frameworks to systematically understand how things work.",
    zh_tw: "習慣在腦中建構精密架構，從底層原理去理解事物如何運作。",
    cantonese: "會喺腦入面建立一套底層邏輯框架，去搞清楚事物背後點樣運作。",
    function: "Ti"
  },
  {
    id: 19,
    en: "I prefer withdrawing from the crowd to solve complex problems independently.",
    zh_tw: "面對複雜難題時，偏好抽離人群、獨立安靜地深入思考。",
    cantonese: "遇到複雜難題嗰陣，偏向自己靜靜地行開一邊，獨立拆解問題。",
    function: "Ti"
  },
  {
    id: 20,
    en: "I excel at linking disparate concepts together to reveal unexpected patterns.",
    zh_tw: "擅長將看似無關的概念串聯在一起，從中發現全新的規律。",
    cantonese: "好擅長將八竿子打唔著嘅概念串連埋一齊，搵出意想不到嘅規律。",
    function: "Ne"
  },
  {
    id: 21,
    en: "I place great weight on established precedents and verifiable historical details.",
    zh_tw: "非常重視既往的成功案例、傳統慣例與具體細節。",
    cantonese: "好睇重以往有冇先例可循，對過往經驗同細節要求好嚴格。",
    function: "Si"
  },
  {
    id: 22,
    en: "I am cautious about adopting unproven changes and prefer time-tested methods.",
    zh_tw: "面對未經檢驗的變動時較為抗拒，容易被他人認為過於保守守舊。",
    cantonese: "對未經證實嘅新搞作好有戒心，容易俾人覺得太保守或者唔願變通。",
    function: "Si"
  },
  {
    id: 23,
    en: "I like bouncing ideas off others to reach shared understanding and consensus.",
    zh_tw: "喜歡透過與他人對話與思想碰撞，逐步梳理思路並凝聚群體共識。",
    cantonese: "鍾意同人討論交流，集思廣益之後先至得出大家認同嘅結論。",
    function: "Fe"
  },
  {
    id: 24,
    en: "I take charge instinctively to establish structure before chaos sets in.",
    zh_tw: "習慣主導大局，在局面陷入混亂之前先一步建立秩序與分工。",
    cantonese: "習慣控制大局，趁場面仲未混亂之前，就安排好晒分工同規矩。",
    function: "Te"
  },
  {
    id: 25,
    en: "I am acutely tuned in to internal bodily sensations and physical needs.",
    zh_tw: "對飢餓、疲倦或緊繃等身體內在狀態非常敏銳，並會即時調整。",
    cantonese: "對自己個身體狀態好敏感，一覺得攰、肚餓或者唔舒服就會即刻處理。",
    function: "Si"
  },
  {
    id: 26,
    en: "I need considerable time to digest incoming information that conflicts with my logical model.",
    zh_tw: "當新資訊與既有的認知體系產生矛盾時，我需要充裕時間逐步拆解消化。",
    cantonese: "當新資訊同自己舊有嘅理解衝突嗰陣，我需要時間慢慢消化同重新理順。",
    function: "Ti"
  },
  {
    id: 27,
    en: "I initiate many exciting new projects, but struggle to follow through to completion.",
    zh_tw: "常常興致勃勃開啟許多新計畫，卻往往三分鐘熱度、很難貫徹到底。",
    cantonese: "成日興致勃勃開咗好多新 Plan，但好少可以由頭到尾堅持做完。",
    function: "Ne"
  },
  {
    id: 28,
    en: "I find genuine enjoyment in categorizing, organizing, and structuring things.",
    zh_tw: "純粹覺得整理檔案、分類事物或制定清單是一件很有成就感的事。",
    cantonese: "單純覺得幫啲嘢分類、整整理理同排好次序，係一件好治癒好有滿足感嘅事。",
    function: "Te"
  },
  {
    id: 29,
    en: "In crisis or emergencies, I am usually the first to react decisively.",
    zh_tw: "面對突發意外時，我通常是現場第一個迅速回過神並付諸行動的人。",
    cantonese: "遇到突發緊急情況嗰陣，我通常係全場第一個反應過嚟而且即刻郁手做嘢嘅人。",
    function: "Se"
  },
  {
    id: 30,
    en: "I am instinctively drawn to unconventional, avant-garde, and eccentric ideas.",
    zh_tw: "容易被標新立異、打破常規且不落窠臼的新奇想法深深吸引。",
    cantonese: "好容易被啲標奇立異、唔按常理出牌嘅新諗法吸引住。",
    function: "Ne"
  },
  {
    id: 31,
    en: "I easily read subtle social cues and body language to guide group dynamics.",
    zh_tw: "善於察言觀色與解讀微表情，並能自然地順應氛圍引導對話走向。",
    cantonese: "好識睇人眉頭眼額同身體語言，識得順住個氣氛嚟帶動大家講嘢。",
    function: "Fe"
  },
  {
    id: 32,
    en: "I frequently overextend myself helping others at the expense of my own needs.",
    zh_tw: "常常因為熱心照顧或配合他人，而不知不覺犧牲了自己真正的需求。",
    cantonese: "成日顧住幫人或者配合其他人，幫到連自己原本嘅需要都擺咗喺一邊。",
    function: "Fe"
  },
  {
    id: 33,
    en: "I cite authoritative external evidence and verified metrics to substantiate my claims.",
    zh_tw: "論證時習慣引用權威資料、研究數據或客觀憑據來支持觀點。",
    cantonese: "同人討論嗰陣，習慣搬出權威數據同客觀證據嚟支持自己個說法。",
    function: "Te"
  },
  {
    id: 34,
    en: "My head is in the clouds so often that people perceive me as absent-minded.",
    zh_tw: "常因腦中思緒過於發散，而給人粗心大意、心不在焉或神經大條的印象。",
    cantonese: "因為腦入面諗太多無謂嘢，成日俾人一種大頭蝦、心不在焉甚至大條筋嘅感覺。",
    function: "Ne"
  },
  {
    id: 35,
    en: "I effortlessly synthesize scattered details into an overarching macro vision.",
    zh_tw: "能輕易穿透紛亂繁雜的表象細節，準確掌握長遠大局與核心走向。",
    cantonese: "好容易喺一堆亂七八糟嘅細節入面，一眼睇穿個大局同未來走向。",
    function: "Ni"
  },
  {
    id: 36,
    en: "I easily get fixated on minor discrepancies and microscopic imperfections.",
    zh_tw: "容易對微小的細節紕漏或不一致之處耿耿於懷，甚至反覆挑剔。",
    cantonese: "好容易俾啲極之微小嘅瑕疵或者唔對路嘅細節責住，忍唔住執著咬住唔放。",
    function: "Si"
  },
  {
    id: 37,
    en: "I have a natural social charisma that puts people at ease and wins rapport.",
    zh_tw: "具備天生的社交親和力與說服力，容易贏得他人的信任與好感。",
    cantonese: "自帶社交親和力，好容易同人熟絡，令人覺得舒服而且討人喜歡。",
    function: "Fe"
  },
  {
    id: 38,
    en: "I actively ensure that nobody in a social group feels alienated or excluded.",
    zh_tw: "格外在乎群體氛圍，會主動照顧落單的人，不讓任何人感到被冷落。",
    cantonese: "好重視團體氣氛，見到有人坐埋一邊會主動拉埋佢傾，唔想漏低任何一個人。",
    function: "Fe"
  },
  {
    id: 39,
    en: "I immerse myself fully in the sensory immediacy of the present moment.",
    zh_tw: "能全然沉浸於此時此刻的感官體驗，不沉溺於過去，也不過度焦慮未來。",
    cantonese: "完全投入喺眼下呢一刻，好好感受當下嘅體驗，唔會成日執著過去或者為將來焦慮。",
    function: "Se"
  },
  {
    id: 40,
    en: "I frequently experience periods of intense melancholy, brooding, or emotional discontent.",
    zh_tw: "容易陷入內心深處的情緒低落、傷感沉思或對現實的鬱結不滿。",
    cantonese: "有時會無端端陷入好深嘅emo、感傷或者對現實睇唔順眼嘅負面情緒。",
    function: "Fi"
  },
  {
    id: 41,
    en: "I express my authentic beliefs unapologetically, refusing to wear a social mask.",
    zh_tw: "行事真誠坦蕩，堅持展現最真實的自我，不屑為了社交需要戴上面具。",
    cantonese: "做人好真，會坦白表達自己真正嘅諗法，好抗拒為咗應酬而戴假面具。",
    function: "Fi"
  },
  {
    id: 42,
    en: "I naturally exude a vibrant, noticeable presence in social gatherings.",
    zh_tw: "在社交場合中散發強烈的生命力與自信，存在感極為鮮明。",
    cantonese: "喺社交聚會入面往往好有氣場同存在感，好容易成為焦點。",
    function: "Se"
  },
  {
    id: 43,
    en: "I feel deeply wounded when my heartfelt goodwill and efforts go unacknowledged.",
    zh_tw: "當自己掏心掏肺的付出被他人忽視或視為理所當然時，內心會十分受傷。",
    cantonese: "當自己真心實意嘅付出俾人忽視，或者當成理所當然嗰陣，心入面會好委屈好傷心。",
    function: "Fe"
  },
  {
    id: 44,
    en: "I crave thrilling sensations, physical challenges, and high-adrenaline adventures.",
    zh_tw: "渴望追求新鮮強烈的感官刺激，熱衷於充滿挑戰性與冒險感的體驗。",
    cantonese: "好渴望試啲新鮮、刺激同埋有挑戰性嘅體驗，鍾意追求感官快感。",
    function: "Se"
  },
  {
    id: 45,
    en: "To me, practical bottom-line results matter far more than rigid procedures.",
    zh_tw: "只要最終結果切實達成，中間的手段與流程可以隨機應變。",
    cantonese: "只要最後目標搞得掂，中間用咩方法都可以靈活變通，唔使死跟程序。",
    function: "Te"
  },
  {
    id: 46,
    en: "I have an intuitive radar for unvoiced emotional distress in those around me.",
    zh_tw: "能敏銳察覺身邊人未說出口的情緒波動與心理脆弱點。",
    cantonese: "好靈敏咁睇得出身邊人表面冇講出口、但心入面其實好唔開心嘅細微情緒。",
    function: "Fe"
  },
  {
    id: 47,
    en: "I notice immediate shifts in my physical environment faster than most people.",
    zh_tw: "對周遭實體環境的微小光影、聲音或物件移動具有極度敏銳的感知力。",
    cantonese: "對身邊環境嘅聲音、光線或者擺設變動特別敏感，一眼就察覺到唔同。",
    function: "Se"
  },
  {
    id: 48,
    en: "I naturally think in metaphors, symbols, and multidimensional abstractions.",
    zh_tw: "習慣使用隱喻、象徵與深層意象，來理解與表達抽象哲理。",
    cantonese: "習慣用打比喻、象徵同深層意境，嚟理解同表達一啲好抽象嘅哲理。",
    function: "Ni"
  },
  {
    id: 49,
    en: "I delve into subjects deeply for the pure intellectual joy of understanding them.",
    zh_tw: "鑽研一門學問純粹是出於好奇與求知樂趣，不帶功利目的。",
    cantonese: "深入鑽研一件事純粹係因為自己想搞清楚同覺得好玩，完全唔係為咗功利目的。",
    function: "Ti"
  },
  {
    id: 50,
    en: "My communication style is crisp, practical, and straight to the point.",
    zh_tw: "日常溝通風格乾脆俐落、開門見山，不喜歡無意義的客套寒暄。",
    cantonese: "平時講嘢好爽快乾脆，習慣直入主題，唔鍾意無謂嘅寒暄廢話。",
    function: "Te"
  },
  {
    id: 51,
    en: "I see so many viable paths forward that making a final choice paralyzes me.",
    zh_tw: "因為看見太多潛在的可能性與選項，反而陷入猶豫不決的選擇障礙。",
    cantonese: "因為睇到太多唔同嘅可能性同出路，反而諗到頭大、好難下定決心揀一個。",
    function: "Ne"
  },
  {
    id: 52,
    en: "I will never compromise my core internal values just to fit in or gain approval.",
    zh_tw: "堅守個人的核心道德底線，絕不為了迎合群體或博取認同而妥協。",
    cantonese: "心中有自己嘅道德底線，絕唔會為咗迎合大家或者討好人哋而違背良心。",
    function: "Fi"
  },
  {
    id: 53,
    en: "I love using intuitive analogies from daily life to elucidate complex ideas.",
    zh_tw: "善於用生動貼切的日常生活類比，幫助他人迅速理解複雜新概念。",
    cantonese: "好鍾意拿日常生活嘅貼地例子做比喻，等其他人好快聽得明啲抽象概念。",
    function: "Ne"
  },
  {
    id: 54,
    en: "I resist conforming to conventional social expectations and arbitrary norms.",
    zh_tw: "天生排斥教條式的社會常規與傳統標籤，不願被迫扮演既定角色。",
    cantonese: "好反感盲目去跟傳統規矩同社會框架，好抗拒被定型做某種角色。",
    function: "Fi"
  },
  {
    id: 55,
    en: "I possess an innate sense of spatial orientation and rarely lose my bearings.",
    zh_tw: "天生具備出色的空間感與方向感，在陌生環境中幾乎不會迷路。",
    cantonese: "方向感同空間感天生好好，去到陌生地方都好少會迷路。",
    function: "Se"
  },
  {
    id: 56,
    en: "In debates, I am fiercely driven to dismantle faulty logic and win.",
    zh_tw: "在辯論與爭執中勝負欲極強，會全力運用嚴密邏輯捍衛立場擊破謬誤。",
    cantonese: "同人拗交嗰陣好有勝負欲，一定會用嚴密邏輯拆穿對方漏洞直到拗贏為止。",
    function: "Te"
  },
  {
    id: 57,
    en: "I hold a deep respect for traditions, established rituals, and solemn commitments.",
    zh_tw: "非常重視社會秩序、既有制度、傳統習俗與自身應盡的承諾與義務。",
    cantonese: "好重視規矩、傳統禮節同埋承諾，覺得每個人都應該守本份。",
    function: "Si"
  },
  {
    id: 58,
    en: "I prefer retreating into my rich inner world of visions rather than facing mundane reality.",
    zh_tw: "相較於平淡枯燥的現實生活，更喜歡沉浸在內心深邃而宏大的理想世界中。",
    cantonese: "比起平淡枯燥嘅現實生活，我更鍾意沉醉喺自己內心個深奧世界入面。",
    function: "Ni"
  },
  {
    id: 59,
    en: "My choices are anchored by an unshakeable, deeply personal moral compass.",
    zh_tw: "內心擁有一套神聖且堅定不移的道德準則，做決定時完全依從本心。",
    cantonese: "心入面有一套堅定不移嘅道德準則，做任何決定都必定要對得住自己良心。",
    function: "Fi"
  },
  {
    id: 60,
    en: "I feel antsy, restless, and empty whenever I don't have a concrete objective to chase.",
    zh_tw: "一旦手頭沒有明確的目標或任務可推進，便會感到焦躁不安與虛度光陰。",
    cantonese: "一冇明確目標去衝或者冇嘢做嗰陣，成個人就會好囉囉攣、好焦慮。",
    function: "Te"
  },
  {
    id: 61,
    en: "I sometimes act on visceral impulses without weighing downstream consequences.",
    zh_tw: "有時會純憑當下的衝動快速採取行動，未曾深思可能帶來的長遠後果。",
    cantonese: "有時做嘢太過憑一時衝動，未諗清楚後果就即刻去咗做先。",
    function: "Se"
  },
  {
    id: 62,
    en: "I rely on proven, time-tested practices rather than gambling on unvetted novelties.",
    zh_tw: "處理事務傾向依循經實踐檢驗的可靠做法，不願冒險嘗試未知的偏方。",
    cantonese: "做事傾向跟返以往驗證過有效嘅老辦法，唔會隨便去搏一啲未試過嘅新做法。",
    function: "Si"
  },
  {
    id: 63,
    en: "I feel deeply energized and fulfilled when a team achieves genuine unity.",
    zh_tw: "當團隊成員目標一致、心靈契合並達成高度共識時，能從中獲得巨大的力量。",
    cantonese: "當成個團隊同心協力、達成高度共識嗰陣，我會覺得特別有衝勁同歸屬感。",
    function: "Fe"
  },
  {
    id: 64,
    en: "I frequently experience sudden cognitive epiphanies that turn out remarkably accurate.",
    zh_tw: "腦海中經常冷不防冒出強烈的頓悟或預感，且事後往往證明相當準確。",
    cantonese: "腦入面成日突然有靈光一閃嘅頓悟或者預感，而且事後通常都好準。",
    function: "Ni"
  },
  {
    id: 65,
    en: "I go out of my way to de-escalate tensions and maintain emotional harmony in the room.",
    zh_tw: "見到群體氣氛緊張時，會主動擔任調解人，盡力化解衝突維持和睦。",
    cantonese: "一見到氣氛有火藥味，就會主動出面打圓場，唔想搞到大家撕破塊面。",
    function: "Fe"
  },
  {
    id: 66,
    en: "I offer true warmth and empathy only after I deeply resonate with someone's inner world.",
    zh_tw: "只有在心靈層面真正理解並認同對方的本質後，才會展現深層的關懷。",
    cantonese: "要等到我真係完全感同身受同認同對方之後，我先會付出最深層嘅真心關懷。",
    function: "Fi"
  },
  {
    id: 67,
    en: "To me, uncovering objective foundational truth is far more important than winning arguments.",
    zh_tw: "認為釐清事物的底層真相，遠比在爭辯中爭取面子或輸贏重要得多。",
    cantonese: "對我嚟講，查明事實嘅底層真相，遠比爭拗輸贏或者保住面子重要得多。",
    function: "Ti"
  },
  {
    id: 68,
    en: "I fully absorb and relish tangible physical experiences just as they unfold.",
    zh_tw: "全心全意地去體會並享受當前環境帶來的真實聲色與生活滋味。",
    cantonese: "好識全心投入去享受眼前發生緊嘅一切，細味生活嘅真實質感。",
    function: "Se"
  },
  {
    id: 69,
    en: "In my efforts to be considerate and polite, others sometimes misinterpret me as insincere.",
    zh_tw: "有時因為過度注重社交禮數與維護面子，反而容易被他人誤解為客套或虛偽。",
    cantonese: "有時因為太過客氣同想顧全大局，反而俾人誤會我好假、唔夠真心。",
    function: "Fe"
  },
  {
    id: 70,
    en: "I spontaneously calibrate my internal logical frameworks whenever conflicting facts emerge.",
    zh_tw: "當發現新的客觀矛盾時，會主動且嚴格地重新修正自己既有的邏輯架構。",
    cantonese: "一旦發現新證據同自己想法有矛盾，我會主動推倒重來，重新修正套邏輯。",
    function: "Ti"
  },
  {
    id: 71,
    en: "My mind sparks effortlessly with a non-stop cascade of fresh, creative options.",
    zh_tw: "思路極為活躍敏捷，能在短時間內源源不絕拋出大量新穎點子。",
    cantonese: "腦筋轉得好快，隨時都可以拋出一大堆天馬行空嘅新諗法。",
    function: "Ne"
  },
  {
    id: 72,
    en: "I am endlessly captivated by deep symbolism, archetypal patterns, and metaphysical riddles.",
    zh_tw: "對象徵意涵、哲學隱喻與未知的宇宙奧祕懷有長久的著迷。",
    cantonese: "對符號象徵、哲學隱喻同埋未知嘅深層謎團有一種莫名嘅著迷。",
    function: "Ni"
  },
  {
    id: 73,
    en: "Sudden deviations from my established routines make me distinctly uncomfortable.",
    zh_tw: "日常生活節奏若突然遭到不可預期的打亂，會讓我感到強烈的不適應。",
    cantonese: "平時生活作息或者既定流程如果突然被打破，我會覺得好唔自在同煩躁。",
    function: "Si"
  },
  {
    id: 74,
    en: "Quirky, bizarre, and unrelated ideas pop spontaneously into my head mid-conversation.",
    zh_tw: "腦海中經常毫無預兆地冒出稀奇古怪、看似跳躍不相關的奇特念頭。",
    cantonese: "傾緊偈嗰陣，腦入面成日突然爆出啲無厘頭、唔啦更又得意嘅諗法。",
    function: "Ne"
  },
  {
    id: 75,
    en: "Faced with an ambiguous and uncharted future, I tend to feel deep anticipatory anxiety.",
    zh_tw: "面對充滿不確定性與缺乏經驗參照的未來，容易感到焦慮與缺乏安全感。",
    cantonese: "面對完全冇底、充滿未知嘅將來嗰陣，我會好容易覺得不安同焦慮。",
    function: "Si"
  },
  {
    id: 76,
    en: "Because I push hard for efficiency, others may perceive me as overbearing or bossy.",
    zh_tw: "因為極度講求成效與執行力，有時容易給人強勢、主導慾強或愛發號施令的壓迫感。",
    cantonese: "因為做事太過追求效率同推進度，有時會俾人覺得我好強勢、好霸道同愛指揮人。",
    function: "Te"
  },
  {
    id: 77,
    en: "I am willing to take calculated physical or practical risks to seize immediate opportunities.",
    zh_tw: "為了抓住眼前的絕佳良機，我敢於承擔風險並果斷放手一搏。",
    cantonese: "為咗把握眼前嘅黃金機會，我敢於冒險搏一鋪，唔會猶豫不決。",
    function: "Se"
  },
  {
    id: 78,
    en: "I prioritize rigorous, unsparing truth even if it stings interpersonal sensibilities.",
    zh_tw: "認為嚴密求真重於一切，即使這意味著會戳破謊言或傷害他人脆弱的情感。",
    cantonese: "堅持追查真相，就算講真話會令場面尷尬或者傷到人哋自尊心，都絕唔妥協。",
    function: "Ti"
  },
  {
    id: 79,
    en: "I spot microscopic discrepancies and shifts in habitual patterns almost instantly.",
    zh_tw: "能在一瞬間察覺事物是否與平時有異，對細節的偏差具有天生雷達。",
    cantonese: "一眼就可以睇得出件嘢同平時有咩唔同，對細節偏差敏銳到極點。",
    function: "Si"
  },
  {
    id: 80,
    en: "I carefully modulate my phrasing and demeanor to respect etiquette and others' dignity.",
    zh_tw: "說話處事非常講究分寸與體面，極力避免讓對方感到難堪或下不了台。",
    cantonese: "講嘢好有分寸同禮貌，好識替人留體面，絕唔會令人當眾落唔到台。",
    function: "Fe"
  },
  {
    id: 81,
    en: "My passion flares brightly for new pursuits, but fades quickly once novelty wears off.",
    zh_tw: "對新事物容易一頭熱，但一旦新鮮感消退，熱情便會迅速降溫並轉移目標。",
    cantonese: "對新嘢成日三分鐘熱度，啱啱開始嗰陣好興奮，新鮮感一過就好快冇晒癮。",
    function: "Ne"
  },
  {
    id: 82,
    en: "I never take premises for granted, instinctively interrogating the underlying assumptions.",
    zh_tw: "從不盲信現成結論，習慣先批判性檢驗其底層假設與推論邏輯是否站得住腳。",
    cantonese: "人哋講咩我都唔會即刻信晒，必定會先質疑個前提同邏輯到底通唔通。",
    function: "Ti"
  },
  {
    id: 83,
    en: "I naturally look past superficial events to contemplate the overarching metaphysical meaning.",
    zh_tw: "習慣看穿事物表象，探究事件背後更深層的哲學涵義與宿命因果。",
    cantonese: "習慣睇穿事物表面，去思考事件背後更深層嘅哲理、象徵同因果關係。",
    function: "Ni"
  },
  {
    id: 84,
    en: "I hold unambiguous, black-and-white standards regarding what is morally acceptable to me.",
    zh_tw: "在核心道德與個人價值上界限分明，對於對與錯有著清晰不妥協的標準。",
    cantonese: "喺道德原則同做人底線上面黑白分明，對與錯之間冇灰色地帶可以妥協。",
    function: "Fi"
  },
  {
    id: 85,
    en: "I often feel that my deepest insights and conceptual visions are fundamentally misunderstood.",
    zh_tw: "常覺得自己內心最深邃的洞察與遠景，很難找到真正能理解並共鳴的人。",
    cantonese: "成日覺得自己心入面最深嘅洞察同睇法，好難搵到一個真正聽得明嘅知音。",
    function: "Ni"
  },
  {
    id: 86,
    en: "I view the world as an interconnected, open-ended tapestry of infinite possibilities.",
    zh_tw: "將世界視為一個充滿無限潛力、隨時可以重塑與開拓的奇妙網絡。",
    cantonese: "將整個世界睇成一個充滿無限可能嘅遊樂場，永遠有新出路等待發掘。",
    function: "Ne"
  },
  {
    id: 87,
    en: "I absorb sensory input directly and realistically without over-intellectualizing it.",
    zh_tw: "直觀接收外界感官刺激，享受事物的本來面目，而不做過多主觀過濾或過度解讀。",
    cantonese: "直接感受現實世界嘅聲色美味，有嗰樣就體驗嗰樣，唔會過度解讀或者諗多咗。",
    function: "Se"
  },
  {
    id: 88,
    en: "I place great trust in flashes of intuition that bubble up from my subconscious.",
    zh_tw: "深信來自潛意識深處的直覺與靈感，即便當下無法提出具體理由。",
    cantonese: "好相信嚟自潛意識嗰種突如其來嘅直覺預感，好多時事後真係好準。",
    function: "Ni"
  },
  {
    id: 89,
    en: "I instinctively sugarcoat constructive criticism to shield the recipient's feelings.",
    zh_tw: "提出批評或建議時會刻意修飾措辭，盡量包裝得柔和體貼，以免傷及對方自尊。",
    cantonese: "俾意見或者批評人嗰陣，會特登包裝得好婉轉溫柔，好驚會傷到對方自尊心。",
    function: "Fe"
  },
  {
    id: 90,
    en: "I experience intense revulsion toward pretense, inauthenticity, and manipulative charm.",
    zh_tw: "對於虛情假意、逢場作戲或矯揉造作的態度，內心會產生強烈的反感與排斥。",
    cantonese: "極度反感虛偽、造作同扮好人嘅態度，見到假惺惺嘅人會由心底覺得抗拒。",
    function: "Fi"
  },
  {
    id: 91,
    en: "I pride myself on being grounded, practical, and relentlessly realistic.",
    zh_tw: "為人務實貼地、腳踏實地，只聚焦於現實中真正可行、立竿見影的解決方案。",
    cantonese: "為人好務實貼地，做事腳踏實地，淨係在乎現實環境入面行唔行得通。",
    function: "Se"
  },
  {
    id: 92,
    en: "I struggle to find words that adequately capture the intricate visions inside my mind.",
    zh_tw: "常覺得自己腦中宏大複雜的願景與意象，很難用有限的語言精準轉譯給他人。",
    cantonese: "覺得自己腦海入面嗰套複雜龐大嘅願景，好難用普通言語完全講得出嚟。",
    function: "Ni"
  },
  {
    id: 93,
    en: "I have an eerie knack for foreseeing how unfolding events will eventually culminate.",
    zh_tw: "對事態長遠的發展趨勢與最終結局，常有不可思議的預見力且屢屢應驗。",
    cantonese: "對事情將來嘅發展走勢同最終結局，往往有一種好神準嘅預知能力。",
    function: "Ni"
  },
  {
    id: 94,
    en: "I excel at stripping away superficial fluff to reveal the foundational core logic.",
    zh_tw: "擅長剝除表象的干擾雜訊，層層向下穿透，直至提煉出最底層的純粹邏輯。",
    cantonese: "好擅長撥開表面嘅多餘雜音，一層層拆解到底，搵出最核心嘅底層邏輯。",
    function: "Ti"
  },
  {
    id: 95,
    en: "I fiercely celebrate individuality and take pride in marching to my own drum.",
    zh_tw: "極其珍視個人的獨立性與獨特性，並為自己的與眾不同感到坦然與自豪。",
    cantonese: "好珍惜自己嘅個人特色，就算同身邊人完全唔同，都為自己嘅獨特感到自豪。",
    function: "Fi"
  },
  {
    id: 96,
    en: "When my inviolable core values are challenged, I will stand my ground against all odds.",
    zh_tw: "一旦自身的內在信念或神聖價值遭到質疑，我會展現堅不可摧的意志捍衛到底。",
    cantonese: "只要踩到我心底嘅核心底線，就算面對全世界嘅壓力，我都會堅持到底誓死捍衛。",
    function: "Fi"
  }
];
