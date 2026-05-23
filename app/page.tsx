"use client";

import { useState } from "react";

type Lang = "RU" | "UZ" | "KG" | "KZ";

const BOT_LINK = "https://t.me/Japan_Logistics_bot";
const NAV_IDS = ["registration", "shops", "faq", "commission"] as const;
const RATES: Record<Lang, number> = { KG: 0.05, KZ: 0.08, UZ: 0.10, RU: 0.14 };

function GuideImg({ src, alt, placeholder }: { src: string; alt: string; placeholder: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="w-full rounded-2xl bg-zinc-100 border-2 border-dashed border-zinc-300 flex items-center justify-center py-16">
        <span className="text-zinc-400 text-sm font-medium">{placeholder}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setErr(true)} className="w-full rounded-2xl shadow-sm" />;
}

function BotBtn({ label }: { label: string }) {
  return (
    <a href={BOT_LINK} target="_blank" rel="noopener noreferrer"
      className="inline-flex rounded-2xl bg-red-700 px-6 py-3 font-black text-white shadow-lg shadow-red-200 hover:bg-red-800 transition-colors">
      {label}
    </a>
  );
}

function VideoBlock({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle,#3f0000,#000)] flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white shadow-2xl">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
      <div className="absolute bottom-3 left-4 text-xs font-bold text-white/40">{placeholder}</div>
    </div>
  );
}

interface FaqItem { q: string; lines: string[]; isList?: boolean; note?: string; hasWarning?: boolean; }
interface StoreItem { name: string; url: string; linkText: string; }

interface LC {
  nav: [string, string, string, string];
  botBtn: string;
  welcome: string;
  navCards: { title: string; subtitle: string }[];
  reg: {
    title: string; s11title: string; s11text: string;
    s12title: string; s12fields: string[];
    s13title: string; s13items: string[];
    s14title: string; s14warning: string;
    imgPlaceholder: string;
  };
  shops: { title: string; videoPlaceholder: string; items: StoreItem[]; };
  faq: { title: string; items: FaqItem[]; };
  commission: {
    title: string; tableTitle: string;
    countryNames: Record<Lang, string>;
    tableNote: string; calcTitle: string;
    calcCountryLabel: string; calcPriceLabel: string;
    calcDeliveryLabel: string; calcCodLabel: string;
    calcBtn: string; calcResultLabel: string;
    calcOptions: { value: Lang; label: string }[];
    supportTitle: string; closing: string;
  };
  footer: string;
}

const content: Record<Lang, LC> = {
  RU: {
    nav: ["Регистрация", "Магазины", "FAQ", "Комиссия"],
    botBtn: "Вернуться в бот",
    welcome: "Добро пожаловать в руководство по использованию Telegram-бота компании Japan Logistics (отдел продаж). Пройдите инструкцию пошагово.",
    navCards: [
      { title: "Регистрация и инструкция", subtitle: "Пошаговое руководство по боту" },
      { title: "Обзор магазинов", subtitle: "Uniqlo, Amazon, Rakuten" },
      { title: "Вопросы и ответы", subtitle: "Часто задаваемые вопросы" },
      { title: "Комиссия и поддержка", subtitle: "Тарифы и контакты" },
    ],
    reg: {
      title: "Регистрация и инструкция",
      s11title: "1.1 Старт и выбор языка", s11text: "Нажмите старт и выберите язык",
      s12title: "1.2 Регистрация",
      s12fields: ["ФИО","Страна (куда доставить товар)","Номер телефона получателя в стране доставки","Номер WhatsApp","Электронная почта","Telegram (@username или ссылка)","Точный адрес получателя","Пароль (минимум 8 неповторяющихся символов, пример: Qwer1202)"],
      s13title: "1.3 Обзор интерфейса бота",
      s13items: ["Ваш ID в клиентской базе","Покупки и количество за каждый месяц","Новый заказ — оформить предварительный заказ","Мои заказы — статусы и история","Бухгалтерия — отчёты по заказам (суммы, количество, отменённые) за год/месяц/неделю/день","Профиль — изменение данных (имя, контакты, адрес)","Предзаказ — добавить товары для заказа позже"],
      s14title: "1.4 Видео-инструкция",
      s14warning: "Ссылки, артикул (код товара на японских сайтах), размер и цвет товара указывайте точно как на японском сайте. При неправильном заполнении заказ может быть отменён.",
      imgPlaceholder: "Изображение будет добавлено",
    },
    shops: {
      title: "Обзор магазинов", videoPlaceholder: "Видео будет добавлено",
      items: [
        { name: "Uniqlo Japan", url: "https://www.uniqlo.com/jp/", linkText: "Открыть Uniqlo" },
        { name: "Amazon Japan", url: "https://www.amazon.co.jp/", linkText: "Открыть Amazon" },
        { name: "Rakuten Ichiba", url: "https://ichiba.rakuten.co.jp/", linkText: "Открыть Rakuten" },
      ],
    },
    faq: {
      title: "Вопросы и ответы",
      items: [
        { q: "Можно ли заказывать БАДы, витамины, косметику, дорогие бренды?", lines: ["Да. Наши логисты доставляют товары под ключ с растаможкой. Вам остаётся только получить груз по прибытии в ваш город."] },
        { q: "Есть ли ограничения по весу, габаритам и стоимости?", lines: ["Нет, кроме базовых ограничений авиаперевозки и расчёта крупногабаритного груза."] },
        { q: "Как осуществляется оплата?", lines: ["Оплата на внутренний счёт в вашей стране.", "⚠️ Внимание! Не производите оплату вне нашей платформы. Принимать оплату могут только официальные администраторы из наших официальных соцсетей (уточняйте у поддержки)."], hasWarning: true },
        { q: "В каких случаях товар не подлежит возврату?", lines: ["После оплаты заказа","При неправильно указанных данных заказа клиентом","При незначительных повреждениях при транспортировке","При задержке логистики или таможни менее 45 дней"], isList: true },
        { q: "Страховка", lines: ["Утеря товара — возврат средств в течение 10 рабочих дней после подтверждения факта утери","Повреждение содержимого товара — 100% возврат","Повреждение товара на 40–50% — частичный возврат пропорционально повреждению","Задержка логистики/таможни более 45 дней — возврат средств"], isList: true, note: "Подобные ситуации крайне редки — мы работаем давно и дорожим репутацией." },
      ],
    },
    commission: {
      title: "Комиссия и поддержка", tableTitle: "Таблица комиссий",
      countryNames: { KG: "Кыргызстан", KZ: "Казахстан", UZ: "Узбекистан", RU: "Россия" },
      tableNote: "от стоимости товара на сайте с учётом внутренней доставки до склада в Токио и комиссии за наложенный платёж",
      calcTitle: "Калькулятор комиссии",
      calcCountryLabel: "Страна", calcPriceLabel: "Стоимость товара на сайте (¥)",
      calcDeliveryLabel: "Стоимость доставки до склада в Токио (¥)",
      calcCodLabel: "Наложенный платёж (фиксировано)", calcBtn: "Рассчитать", calcResultLabel: "Итог",
      calcOptions: [{ value: "KG", label: "Кыргызстан (5%)" },{ value: "KZ", label: "Казахстан (8%)" },{ value: "UZ", label: "Узбекистан (10%)" },{ value: "RU", label: "Россия (14%)" }],
      supportTitle: "Поддержка",
      closing: "Желаем успешного сотрудничества и удачных покупок!",
    },
    footer: "Япония → Узбекистан / Кыргызстан / Казахстан / Россия",
  },

  UZ: {
    nav: ["Ro'yxatdan o'tish", "Do'konlar", "FAQ", "Komissiya"],
    botBtn: "Botga qaytish",
    welcome: "Japan Logistics kompaniyasining Telegram-boti bo'yicha qo'llanmaga xush kelibsiz (sotish bo'limi). Ko'rsatmalarni bosqichma-bosqich bajaring.",
    navCards: [
      { title: "Ro'yxatdan o'tish va ko'rsatma", subtitle: "Botdan foydalanish bo'yicha qo'llanma" },
      { title: "Do'konlarga sharh", subtitle: "Uniqlo, Amazon, Rakuten" },
      { title: "Savol va javoblar", subtitle: "Ko'p so'raladigan savollar" },
      { title: "Komissiya va qo'llab-quvvatlash", subtitle: "Tariflar va kontaktlar" },
    ],
    reg: {
      title: "Ro'yxatdan o'tish va ko'rsatma",
      s11title: "1.1 Start va til tanlash", s11text: "Start tugmasini bosing va tilni tanlang",
      s12title: "1.2 Ro'yxatdan o'tish",
      s12fields: ["To'liq ism","Mamlakat (tovar yetkaziladigan joy)","Yetkazish mamlakatidagi qabul qiluvchining telefon raqami","WhatsApp raqami","Elektron pochta","Telegram (@username yoki havola)","Qabul qiluvchining aniq manzili","Parol (kamida 8 ta takrorlanmaydigan belgi, masalan: Qwer1202)"],
      s13title: "1.3 Bot interfeysiga sharh",
      s13items: ["Mijozlar bazasidagi sizning ID'ingiz","Har oyda xaridlar va miqdori","Yangi buyurtma — dastlabki buyurtma berish","Mening buyurtmalarim — statuslar va tarix","Buxgalteriya — buyurtmalar hisoboti (summalar, miqdor, bekor qilinganlar) yil/oy/hafta/kun","Profil — ma'lumotlarni o'zgartirish (ism, kontaktlar, manzil)","Oldindan buyurtma — keyinroq buyurtma berish uchun tovarlar qo'shish"],
      s14title: "1.4 Video ko'rsatma",
      s14warning: "Havolalar, artikul (yapon saytlaridagi tovar kodi), o'lcham va rang yapon saytidagi kabi aniq ko'rsatilsin. Noto'g'ri to'ldirish buyurtmaning bekor qilinishiga olib kelishi mumkin.",
      imgPlaceholder: "Rasm keyinroq qo'shiladi",
    },
    shops: {
      title: "Do'konlarga sharh", videoPlaceholder: "Video keyinroq qo'shiladi",
      items: [
        { name: "Uniqlo Japan", url: "https://www.uniqlo.com/jp/", linkText: "Uniqlo'ni ochish" },
        { name: "Amazon Japan", url: "https://www.amazon.co.jp/", linkText: "Amazon'ni ochish" },
        { name: "Rakuten Ichiba", url: "https://ichiba.rakuten.co.jp/", linkText: "Rakuten'ni ochish" },
      ],
    },
    faq: {
      title: "Savol va javoblar",
      items: [
        { q: "BADlar, vitaminlar, kosmetika, qimmatbaho brendlarni buyurtma qilish mumkinmi?", lines: ["Ha. Logistlarimiz bojxona tozalash bilan tovarlarni kalit ostida yetkazib beradi. Siz faqat shahringizga kelganida yuklarni qabul qilishingiz kerak."] },
        { q: "Og'irlik, o'lcham va narx bo'yicha cheklovlar bormi?", lines: ["Yo'q, aviayuk tashishning asosiy cheklovlari va yirik o'lchamli yuklarni hisoblashdan tashqari."] },
        { q: "To'lov qanday amalga oshiriladi?", lines: ["Mamlakatingizdagi ichki hisob raqamiga to'lov.","⚠️ Diqqat! Platformamizdan tashqarida to'lov qilmang. To'lovni faqat rasmiy ijtimoiy tarmoqlarimizdan rasmiy adminlar qabul qilishi mumkin (qo'llab-quvvatlash xizmatiga so'rang)."], hasWarning: true },
        { q: "Tovar qaysi hollarda qaytarilmaydi?", lines: ["Buyurtma uchun to'lovdan so'ng","Xaridor tomonidan noto'g'ri ko'rsatilgan buyurtma ma'lumotlari bilan","Tashish paytida kichik shikastlanish bilan","45 kundan kam logistika yoki bojxona kechikishi bilan"], isList: true },
        { q: "Sug'urta", lines: ["Tovar yo'qolishi — yo'qolish faktini tasdiqlagandan keyin 10 ish kuni ichida mablag' qaytarish","Tovar mazmunining shikastlanishi — 100% qaytarish","Tovarning 40–50% shikastlanishi — shikastlanishga mutanosib qisman qaytarish","45 kundan ortiq logistika/bojxona kechikishi — mablag' qaytarish"], isList: true, note: "Bunday holatlar juda kam uchraydi — biz uzoq vaqtdan beri ishlaymiz va obro'yimizni qadrlaymiz." },
      ],
    },
    commission: {
      title: "Komissiya va qo'llab-quvvatlash", tableTitle: "Komissiya jadvali",
      countryNames: { KG: "Qirg'iziston", KZ: "Qozog'iston", UZ: "O'zbekiston", RU: "Rossiya" },
      tableNote: "saytdagi tovar narxidan Tokiodagi omborga ichki yetkazish va to'lov komissiyasi hisobga olingan holda",
      calcTitle: "Komissiya kalkulyatori",
      calcCountryLabel: "Mamlakat", calcPriceLabel: "Saytdagi tovar narxi (¥)",
      calcDeliveryLabel: "Tokio omboriga yetkazish narxi (¥)",
      calcCodLabel: "Naqd to'lov (belgilangan)", calcBtn: "Hisoblash", calcResultLabel: "Jami",
      calcOptions: [{ value: "KG", label: "Qirg'iziston (5%)" },{ value: "KZ", label: "Qozog'iston (8%)" },{ value: "UZ", label: "O'zbekiston (10%)" },{ value: "RU", label: "Rossiya (14%)" }],
      supportTitle: "Qo'llab-quvvatlash",
      closing: "Muvaffaqiyatli hamkorlik va yaxshi xaridlar tilaymiz!",
    },
    footer: "Yaponiya → O'zbekiston / Qirg'iziston / Qozog'iston / Rossiya",
  },

  KG: {
    nav: ["Каттоо", "Дүкөндөр", "FAQ", "Комиссия"],
    botBtn: "Ботко кайтуу",
    welcome: "Japan Logistics компаниясынын Telegram-боту боюнча колдонмого кош келиңиз (сатуу бөлүмү). Нускаманы кадам сайын аткарыңыз.",
    navCards: [
      { title: "Каттоо жана нускама", subtitle: "Бот боюнча кадамдуу колдонмо" },
      { title: "Дүкөндөргө чолосу", subtitle: "Uniqlo, Amazon, Rakuten" },
      { title: "Суроолор жана жооптор", subtitle: "Көп берилүүчү суроолор" },
      { title: "Комиссия жана колдоо", subtitle: "Тарифтер жана байланыш" },
    ],
    reg: {
      title: "Каттоо жана нускама",
      s11title: "1.1 Старт жана тил тандоо", s11text: "Старт баскычын басып, тил тандаңыз",
      s12title: "1.2 Каттоо",
      s12fields: ["Толук аты-жөнү","Өлкө (товар жеткирилүүчү жер)","Жеткирүү өлкөсүндөгү алуучунун телефон номери","WhatsApp номери","Электрондук почта","Telegram (@username же шилтеме)","Алуучунун так дареги","Сырсөз (кеминде 8 кайталанбаган символ, мисалы: Qwer1202)"],
      s13title: "1.3 Бот интерфейсине чолосу",
      s13items: ["Кардарлар базасындагы сиздин ID'иңиз","Ар айдагы сатып алуулар жана сан","Жаңы заказ — алдын ала заказ берүү","Менин заказдарым — статустар жана тарых","Бухгалтерия — заказдар боюнча отчёт (суммалар, сан, жокко чыгарылгандар) жыл/ай/апта/күн","Профиль — маалыматтарды өзгөртүү (аты, байланыш, дарек)","Алдын ала заказ — кийинчерек заказ берүү үчүн товарлар кошуу"],
      s14title: "1.4 Видео нускама",
      s14warning: "Шилтемелерди, артикулду (японский сайттардагы товардын коду), өлчөмдү жана түстү японский сайттагыдай так жазыңыз. Туура эмес толтурулса, заказ жокко чыгарылышы мүмкүн.",
      imgPlaceholder: "Сүрөт кийинчерек кошулат",
    },
    shops: {
      title: "Дүкөндөргө чолосу", videoPlaceholder: "Видео кийинчерек кошулат",
      items: [
        { name: "Uniqlo Japan", url: "https://www.uniqlo.com/jp/", linkText: "Uniqlo ачуу" },
        { name: "Amazon Japan", url: "https://www.amazon.co.jp/", linkText: "Amazon ачуу" },
        { name: "Rakuten Ichiba", url: "https://ichiba.rakuten.co.jp/", linkText: "Rakuten ачуу" },
      ],
    },
    faq: {
      title: "Суроолор жана жооптор",
      items: [
        { q: "БАД, витаминдер, косметика, кымбат брендтерди заказдаса болобу?", lines: ["Ооба. Биздин логисттер товарларды бажы тазалоо менен ачкыч астында жеткиришет. Сизге шаарыңызга жеткенде гана жүктү алып калуу керек."] },
        { q: "Салмак, габарит жана баа боюнча чектөөлөр барбы?", lines: ["Жок, авиатасымалдоонун негизги чектөөлөрүнөн жана чоң габариттүү жүктүн эсебинен башка."] },
        { q: "Төлөм кантип жүргүзүлөт?", lines: ["Өлкөңүздөгү ички эсепке төлөм.","⚠️ Эскертүү! Биздин платформадан тышкары төлөм жасабаңыз. Төлөмдү биздин расмий социалдык тармактардагы расмий администраторлор гана кабыл ала алат (колдоо кызматынан сураңыз)."], hasWarning: true },
        { q: "Товар кайсы учурларда кайтарылбайт?", lines: ["Заказды оплатагандан кийин","Кардар тарабынан туура эмес көрсөтүлгөн заказ маалыматтарында","Ташуу учурундагы майда жаракаттарда","45 күндөн аз логистика же бажыхана кечигүүсүндө"], isList: true },
        { q: "Камсыздандыруу", lines: ["Товар жоголуусу — жоголуу фактысы тастыкталгандан кийин 10 жумуш күнү ичинде акча кайтаруу","Товардын мазмунунун бузулушу — 100% кайтаруу","Товардын 40–50% бузулушу — бузулушка пропорционалдуу жарым-жартылай кайтаруу","45 күндөн ашык логистика/бажыхана кечигүүсү — акча кайтаруу"], isList: true, note: "Мындай жагдайлар өтө сейрек кездешет — биз көп жылдан бери иштейбиз жана беделибизди баалайбыз." },
      ],
    },
    commission: {
      title: "Комиссия жана колдоо", tableTitle: "Комиссия таблицасы",
      countryNames: { KG: "Кыргызстан", KZ: "Казакстан", UZ: "Өзбекстан", RU: "Россия" },
      tableNote: "сайттагы товардын баасынан Токиодогу складга ички жеткирүү жана нак төлөм комиссиясы эске алынган",
      calcTitle: "Комиссия калькулятору",
      calcCountryLabel: "Өлкө", calcPriceLabel: "Сайттагы товардын баасы (¥)",
      calcDeliveryLabel: "Токио складына жеткирүү баасы (¥)",
      calcCodLabel: "Нак төлөм (белгиленген)", calcBtn: "Эсептөө", calcResultLabel: "Жыйынтык",
      calcOptions: [{ value: "KG", label: "Кыргызстан (5%)" },{ value: "KZ", label: "Казакстан (8%)" },{ value: "UZ", label: "Өзбекстан (10%)" },{ value: "RU", label: "Россия (14%)" }],
      supportTitle: "Колдоо",
      closing: "Ийгиликтүү кызматташтык жана жакшы сатып алуулар каалайбыз!",
    },
    footer: "Япония → Өзбекстан / Кыргызстан / Казакстан / Россия",
  },

  KZ: {
    nav: ["Тіркеу", "Дүкендер", "FAQ", "Комиссия"],
    botBtn: "Ботқа оралу",
    welcome: "Japan Logistics компаниясының Telegram-боты бойынша нұсқаулыққа қош келдіңіз (сату бөлімі). Нұсқаулықты қадамдық орындаңыз.",
    navCards: [
      { title: "Тіркеу және нұсқаулық", subtitle: "Ботты пайдалану бойынша нұсқаулық" },
      { title: "Дүкендерге шолу", subtitle: "Uniqlo, Amazon, Rakuten" },
      { title: "Сұрақтар мен жауаптар", subtitle: "Жиі қойылатын сұрақтар" },
      { title: "Комиссия және қолдау", subtitle: "Тарифтер мен байланыс" },
    ],
    reg: {
      title: "Тіркеу және нұсқаулық",
      s11title: "1.1 Старт және тіл таңдау", s11text: "Старт түймесін басып, тілді таңдаңыз",
      s12title: "1.2 Тіркеу",
      s12fields: ["Толық аты-жөні","Ел (тауар жеткізілетін жер)","Жеткізу еліндегі алушының телефон нөмірі","WhatsApp нөмірі","Электрондық пошта","Telegram (@username немесе сілтеме)","Алушының нақты мекенжайы","Құпиясөз (кемінде 8 қайталанбайтын таңба, мысалы: Qwer1202)"],
      s13title: "1.3 Бот интерфейсіне шолу",
      s13items: ["Клиенттер базасындағы сіздің ID'іңіз","Әр айдағы сатып алулар мен саны","Жаңа тапсырыс — алдын ала тапсырыс беру","Менің тапсырыстарым — мәртебелер мен тарих","Бухгалтерия — тапсырыстар есебі (соммалар, саны, бас тартылғандар) жыл/ай/апта/күн","Профиль — деректерді өзгерту (аты, байланыс, мекенжай)","Алдын ала тапсырыс — кейінірек тапсырыс беру үшін тауарлар қосу"],
      s14title: "1.4 Бейне нұсқаулық",
      s14warning: "Сілтемелерді, артикулді (жапон сайттарындағы тауар коды), өлшемді және түсті жапон сайтындағыдай дәл жазыңыз. Дұрыс толтырылмаса, тапсырыс бас тартылуы мүмкін.",
      imgPlaceholder: "Сурет кейінірек қосылады",
    },
    shops: {
      title: "Дүкендерге шолу", videoPlaceholder: "Бейне кейінірек қосылады",
      items: [
        { name: "Uniqlo Japan", url: "https://www.uniqlo.com/jp/", linkText: "Uniqlo ашу" },
        { name: "Amazon Japan", url: "https://www.amazon.co.jp/", linkText: "Amazon ашу" },
        { name: "Rakuten Ichiba", url: "https://ichiba.rakuten.co.jp/", linkText: "Rakuten ашу" },
      ],
    },
    faq: {
      title: "Сұрақтар мен жауаптар",
      items: [
        { q: "БАД, дәрумендер, косметика, қымбат брендтер тапсырыс беруге болады ма?", lines: ["Иә. Логистеріміз тауарларды кедендік тазалаумен бірге кілт астында жеткізеді. Сізге тек қалаңызға жеткенде жүкті алу қалады."] },
        { q: "Салмақ, өлшем және баға бойынша шектеулер бар ма?", lines: ["Жоқ, авиатасымалдаудың негізгі шектеулерінен және ірі габаритті жүкті есептеуден басқа."] },
        { q: "Төлем қалай жүзеге асырылады?", lines: ["Еліңіздегі ішкі шотқа төлем.","⚠️ Назар аударыңыз! Платформамыздан тыс төлем жасамаңыз. Төлемді тек ресми әлеуметтік желілерімізден ресми администраторлар ғана қабылдай алады (қолдауға сұраңыз)."], hasWarning: true },
        { q: "Тауар қай жағдайларда қайтарылмайды?", lines: ["Тапсырыс төленгеннен кейін","Клиент дұрыс көрсетпеген тапсырыс деректерімен","Тасымалдау кезіндегі шамалы зақымдануда","45 күннен аз логистика немесе кедендік кешігуде"], isList: true },
        { q: "Сақтандыру", lines: ["Тауар жоғалуы — жоғалу фактысы расталғаннан кейін 10 жұмыс күні ішінде қаражат қайтару","Тауар мазмұнының зақымдануы — 100% қайтару","Тауардың 40–50% зақымдануы — зақымдануға пропорционалды ішінара қайтару","45 күннен астам логистика/кедендік кешігу — қаражат қайтару"], isList: true, note: "Мұндай жағдайлар өте сирек кездеседі — біз ұзақ жылдан бері жұмыс істейміз және беделімізді бағалаймыз." },
      ],
    },
    commission: {
      title: "Комиссия және қолдау", tableTitle: "Комиссия кестесі",
      countryNames: { KG: "Қырғызстан", KZ: "Қазақстан", UZ: "Өзбекстан", RU: "Ресей" },
      tableNote: "сайттағы тауар бағасынан Токиодағы қоймаға ішкі жеткізу және жеткізу комиссиясы ескерілген",
      calcTitle: "Комиссия калькуляторы",
      calcCountryLabel: "Ел", calcPriceLabel: "Сайттағы тауар бағасы (¥)",
      calcDeliveryLabel: "Токио қоймасына жеткізу бағасы (¥)",
      calcCodLabel: "Жеткізу төлемі (белгіленген)", calcBtn: "Есептеу", calcResultLabel: "Жиыны",
      calcOptions: [{ value: "KG", label: "Қырғызстан (5%)" },{ value: "KZ", label: "Қазақстан (8%)" },{ value: "UZ", label: "Өзбекстан (10%)" },{ value: "RU", label: "Ресей (14%)" }],
      supportTitle: "Қолдау",
      closing: "Табысты ынтымақтастық және жақсы сатып алулар тілейміз!",
    },
    footer: "Жапония → Өзбекстан / Қырғызстан / Қазақстан / Ресей",
  },
};

export default function Home() {
  const [lang, setLang]       = useState<Lang>("RU");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcCountry, setCalcCountry] = useState<Lang>("RU");
  const [calcPrice, setCalcPrice]     = useState("");
  const [calcDelivery, setCalcDelivery] = useState("");
  const [calcResult, setCalcResult]   = useState<number | null>(null);
  const t = content[lang];

  function calculate() {
    const price    = parseFloat(calcPrice)    || 0;
    const delivery = parseFloat(calcDelivery) || 0;
    const total    = (price + delivery + 330) * (1 + RATES[calcCountry]);
    setCalcResult(Math.round(total));
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-950">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-700 text-white shadow-lg shadow-red-200">
              <span className="text-sm font-black">JL</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-black tracking-tight leading-none">Japan Logistics</div>
              <div className="text-xs font-medium text-zinc-500 mt-0.5">Help Center</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-1 sm:flex">
              {(["RU","UZ","KG","KZ"] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-black transition ${lang===l ? "bg-red-700 text-white shadow" : "text-zinc-500 hover:bg-white hover:text-zinc-900"}`}>
                  {l}
                </button>
              ))}
            </div>
            <a href={BOT_LINK} target="_blank" rel="noopener noreferrer"
              className="rounded-2xl bg-red-700 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-red-200 hover:bg-red-800 transition-colors whitespace-nowrap">
              {t.botBtn}
            </a>
          </div>
        </div>
        {/* mobile lang row */}
        <div className="flex gap-2 overflow-x-auto border-t border-zinc-100 px-5 py-2.5 sm:hidden">
          {(["RU","UZ","KG","KZ"] as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-black transition ${lang===l ? "bg-red-700 text-white" : "bg-zinc-100 text-zinc-600"}`}>
              {l}
            </button>
          ))}
        </div>
      </header>

      {/* Welcome */}
      <section className="relative overflow-hidden bg-white px-5 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#fee2e2_0%,transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl">
          <div className="inline-flex rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-black text-red-700 shadow-sm mb-6">
            Japan Logistics — Help Center
          </div>
          <p className="max-w-3xl text-xl md:text-2xl font-medium leading-8 text-zinc-700">{t.welcome}</p>

          {/* 4 nav cards */}
          <div className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-4">
            {t.navCards.map((card, i) => (
              <a key={i} href={`#${NAV_IDS[i]}`}
                className="group rounded-[1.5rem] border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-red-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-red-700 group-hover:bg-red-700 group-hover:text-white transition-colors mb-4">
                  0{i+1}
                </div>
                <div className="font-black text-sm leading-tight">{card.title}</div>
                <div className="mt-1 text-xs text-zinc-500">{card.subtitle}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1 — Registration */}
      <section id="registration" className="px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <div className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-red-700">01</div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{t.reg.title}</h2>
          </div>

          {/* 1.1 */}
          <div className="mb-10 rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-black mb-4">{t.reg.s11title}</h3>
            <p className="text-zinc-600 mb-6">{t.reg.s11text}</p>
            <GuideImg src="img/1111.jpg" alt="Step 1.1" placeholder={t.reg.imgPlaceholder} />
          </div>

          {/* 1.2 */}
          <div className="mb-10 rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-black mb-4">{t.reg.s12title}</h3>
            <ol className="space-y-2 mb-6">
              {t.reg.s12fields.map((f, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-700 text-white text-xs font-black mt-0.5">{i+1}</span>
                  <span className="text-zinc-700">{f}</span>
                </li>
              ))}
            </ol>
            <GuideImg src="img/121.jpg" alt="Registration" placeholder={t.reg.imgPlaceholder} />
            <div className="mt-6"><BotBtn label={t.botBtn} /></div>
          </div>

          {/* 1.3 */}
          <div className="mb-10 rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-black mb-4">{t.reg.s13title}</h3>
            <ol className="space-y-2 mb-6">
              {t.reg.s13items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 text-xs font-black mt-0.5">{i+1}</span>
                  <span className="text-zinc-700">{item}</span>
                </li>
              ))}
            </ol>
            <GuideImg src="img/131.jpg" alt="Bot interface" placeholder={t.reg.imgPlaceholder} />
            <div className="mt-6"><BotBtn label={t.botBtn} /></div>
          </div>

          {/* 1.4 */}
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-black mb-4">{t.reg.s14title}</h3>
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-amber-900 font-medium leading-7">⚠️ {t.reg.s14warning}</p>
            </div>
            <VideoBlock placeholder={t.shops.videoPlaceholder} />
            <div className="mt-6"><BotBtn label={t.botBtn} /></div>
          </div>
        </div>
      </section>

      {/* Section 2 — Shops */}
      <section id="shops" className="bg-white px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <div className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-red-700">02</div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{t.shops.title}</h2>
          </div>

          <div className="space-y-8">
            {t.shops.items.map((store) => (
              <div key={store.name} className="rounded-[2rem] border border-zinc-200 bg-[#fafafa] p-7 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-black">{store.name}</h3>
                  <a href={store.url} target="_blank" rel="noopener noreferrer"
                    className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-black text-zinc-700 hover:border-red-200 hover:text-red-700 transition-colors">
                    {store.linkText} →
                  </a>
                </div>
                <VideoBlock placeholder={t.shops.videoPlaceholder} />
              </div>
            ))}
          </div>

          <div className="mt-10"><BotBtn label={t.botBtn} /></div>
        </div>
      </section>

      {/* Section 3 — FAQ */}
      <section id="faq" className="px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <div className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-red-700">03</div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{t.faq.title}</h2>
          </div>

          <div className="space-y-3">
            {t.faq.items.map((item, i) => (
              <div key={i} className={`rounded-[1.5rem] border overflow-hidden transition-all ${openFaq===i ? "border-red-200 bg-white shadow-lg" : "border-zinc-200 bg-white"}`}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-black text-base">{item.q}</span>
                  <span className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-lg font-black transition-all ${openFaq===i ? "bg-red-700 text-white rotate-45" : "bg-zinc-100 text-zinc-500"}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq===i ? "max-h-[600px]" : "max-h-0"}`}>
                  <div className="px-6 pb-6 space-y-3">
                    {item.isList ? (
                      <ol className="space-y-2">
                        {item.lines.map((line, j) => (
                          <li key={j} className="flex gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 text-xs font-black mt-0.5">{j+1}</span>
                            <span className="text-zinc-600 leading-6">{line}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      item.lines.map((line, j) => (
                        <p key={j} className={`leading-7 ${item.hasWarning && j===1 ? "rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-900 font-medium text-sm" : "text-zinc-600"}`}>{line}</p>
                      ))
                    )}
                    {item.note && <p className="mt-3 text-sm text-zinc-400 italic">{item.note}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Commission */}
      <section id="commission" className="bg-white px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <div className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-red-700">04</div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{t.commission.title}</h2>
          </div>

          {/* Table */}
          <div className="mb-10 rounded-[2rem] border border-zinc-200 overflow-hidden shadow-sm">
            <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200">
              <h3 className="font-black text-lg">{t.commission.tableTitle}</h3>
            </div>
            <table className="w-full">
              <tbody>
                {(["KG","KZ","UZ","RU"] as Lang[]).map((c, i) => (
                  <tr key={c} className={i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}>
                    <td className="px-6 py-4 font-bold">{t.commission.countryNames[c]}</td>
                    <td className="px-6 py-4 text-right font-black text-red-700 text-xl">{Math.round(RATES[c]*100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-100">
              <p className="text-xs text-zinc-500 italic">* {t.commission.tableNote}</p>
            </div>
          </div>

          {/* Calculator */}
          <div className="mb-10 rounded-[2rem] border border-zinc-200 bg-[#fafafa] p-7 shadow-sm">
            <h3 className="font-black text-xl mb-6">{t.commission.calcTitle}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-zinc-600 mb-1">{t.commission.calcCountryLabel}</label>
                <select value={calcCountry} onChange={e => { setCalcCountry(e.target.value as Lang); setCalcResult(null); }}
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 font-bold text-zinc-800 focus:outline-none focus:border-red-300">
                  {t.commission.calcOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-600 mb-1">{t.commission.calcPriceLabel}</label>
                <input type="number" value={calcPrice} onChange={e => { setCalcPrice(e.target.value); setCalcResult(null); }} placeholder="¥ 0"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 font-bold text-zinc-800 focus:outline-none focus:border-red-300" />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-600 mb-1">{t.commission.calcDeliveryLabel}</label>
                <input type="number" value={calcDelivery} onChange={e => { setCalcDelivery(e.target.value); setCalcResult(null); }} placeholder="¥ 0"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 font-bold text-zinc-800 focus:outline-none focus:border-red-300" />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-600 mb-1">{t.commission.calcCodLabel}</label>
                <div className="w-full rounded-2xl border border-zinc-100 bg-zinc-100 px-4 py-3 font-bold text-zinc-500">¥ 330</div>
              </div>
              <button onClick={calculate}
                className="w-full rounded-2xl bg-red-700 py-4 font-black text-white shadow-lg shadow-red-200 hover:bg-red-800 transition-colors">
                {t.commission.calcBtn}
              </button>
              {calcResult !== null && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-center">
                  <div className="text-sm font-bold text-red-600 mb-1">{t.commission.calcResultLabel}</div>
                  <div className="text-4xl font-black text-red-700">¥ {calcResult.toLocaleString()}</div>
                </div>
              )}
            </div>
          </div>

          {/* Support */}
          <div className="mb-10 rounded-[2rem] border border-zinc-200 bg-[#fafafa] p-7 shadow-sm">
            <h3 className="font-black text-xl mb-6">{t.commission.supportTitle}</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Telegram", href: "https://t.me/japanlogistics", abbr: "TG" },
                { label: "WhatsApp", href: "https://wa.me/817090344425", abbr: "WA" },
                { label: "Email", href: "mailto:japanlogistics.to@gmail.com", abbr: "@" },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 hover:border-red-200 hover:shadow-lg transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 font-black text-zinc-700 group-hover:bg-red-700 group-hover:text-white transition-colors">
                    {c.abbr}
                  </div>
                  <span className="font-black">{c.label}</span>
                </a>
              ))}
            </div>
          </div>

          <p className="text-center text-lg font-bold text-zinc-600 mb-8">{t.commission.closing}</p>
          <div className="text-center"><BotBtn label={t.botBtn} /></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-[#fafafa] px-5 py-10">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-700 text-white">
              <span className="text-xs font-black">JL</span>
            </div>
            <div>
              <div className="font-black">Japan Logistics</div>
              <div className="text-sm text-zinc-500">{t.footer}</div>
            </div>
          </div>
          <a href={BOT_LINK} target="_blank" rel="noopener noreferrer" className="font-black text-red-700 hover:text-red-800 transition-colors">
            {t.botBtn} →
          </a>
        </div>
      </footer>
    </main>
  );
}
