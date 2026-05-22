"use client";

import { useState } from "react";

type Lang = "RU" | "UZ" | "KG" | "EN";

const BOT_LINK = "https://t.me/Japan_Logistics";

const STORES = [
  { id: "uniqlo",  name: "Uniqlo",          abbr: "UQ", url: "https://www.uniqlo.com/jp/",     color: "#E40101" },
  { id: "gu",      name: "GU",              abbr: "GU", url: "https://www.gu-global.com/jp/",  color: "#222222" },
  { id: "amazon",  name: "Amazon Japan",    abbr: "AZ", url: "https://www.amazon.co.jp/",      color: "#FF9900" },
  { id: "rakuten", name: "Rakuten",         abbr: "R",  url: "https://www.rakuten.co.jp/",     color: "#BF0000" },
  { id: "yahoo",   name: "Yahoo! Shopping", abbr: "Y!", url: "https://shopping.yahoo.co.jp/", color: "#FF0033" },
  { id: "mercari", name: "Mercari",         abbr: "M",  url: "https://www.mercari.com/jp/",    color: "#E83830" },
  { id: "kakaku",  name: "Kakaku.com",      abbr: "K",  url: "https://kakaku.com/",            color: "#0070C0" },
] as const;

type StoreId = (typeof STORES)[number]["id"];

interface GuideStep   { icon: string; title: string; desc: string; }
interface StoreInfo   { id: StoreId; desc: string; features: string[]; }
interface FaqItem     { q: string; a: string; }
interface ContactItem { platform: string; handle: string; url: string; desc: string; abbr: string; }
interface VideoItem   { title: string; desc: string; }

interface LangContent {
  nav: [string, string, string, string];
  botBtn: string;
  hero: { badge: string; title: string; subtitle: string; };
  guide: { title: string; subtitle: string; steps: GuideStep[]; };
  videos: { title: string; subtitle: string; placeholder: string; items: VideoItem[]; };
  stores: { title: string; subtitle: string; openBtn: string; items: StoreInfo[]; };
  faq: { title: string; subtitle: string; items: FaqItem[]; };
  contacts: { title: string; subtitle: string; botCta: string; items: ContactItem[]; };
  footer: string;
}

const content: Record<Lang, LangContent> = {
  RU: {
    nav: ["Инструкция", "Магазины", "FAQ", "Контакты"],
    botBtn: "Вернуться в бот",
    hero: {
      badge: "База знаний для клиентов",
      title: "Japan Logistics\nHelp Center",
      subtitle: "Полное руководство по Telegram-боту: регистрация, заказы из Японии, оплата и отслеживание доставки.",
    },
    guide: {
      title: "Инструкция по боту",
      subtitle: "От регистрации до получения заказа — 5 простых шагов",
      steps: [
        { icon: "01", title: "Регистрация",       desc: "Нажмите «Регистрация» в боте. Введите имя, номер телефона, страну и адрес доставки. Займёт не более 2 минут." },
        { icon: "02", title: "Получение Client ID", desc: "После регистрации вы получите уникальный Client ID. Используйте его в поле адреса при заказе на японских сайтах." },
        { icon: "03", title: "Создание заказа",   desc: "Найдите товар, скопируйте ссылку и отправьте в бот. Укажите размер, цвет и количество — администратор рассчитает стоимость." },
        { icon: "04", title: "Оплата",            desc: "Получите расчёт: цена товара + комиссия + доставка по Японии. Переведите сумму и прикрепите скриншот чека." },
        { icon: "05", title: "Отслеживание",      desc: "Следите за статусом в личном кабинете: новый → ожидает оплаты → оплачен → покупается → куплен → завершён." },
      ],
    },
    videos: {
      title: "Видео-инструкции",
      subtitle: "Подробные видео по каждому шагу",
      placeholder: "Видео будет добавлено",
      items: [
        { title: "Регистрация в боте",        desc: "Пошагово: от нажатия /start до получения Client ID" },
        { title: "Как создать заказ",         desc: "От ссылки на товар до подтверждения администратором" },
        { title: "Оплата и отслеживание",     desc: "Как оплатить, прикрепить чек и следить за статусом" },
      ],
    },
    stores: {
      title: "Японские магазины",
      subtitle: "Популярные онлайн-магазины для заказа через Japan Logistics",
      openBtn: "Открыть магазин",
      items: [
        { id: "uniqlo",  desc: "Японская сеть одежды. Качественные базовые вещи по доступным ценам.",                          features: ["Базовый гардероб", "Тепло-технологии", "Сезонные коллекции"] },
        { id: "gu",      desc: "Молодёжный бренд от группы Uniqlo. Тренды сезона по низким ценам.",                           features: ["Модные тренды", "Доступные цены", "Широкий ассортимент"] },
        { id: "amazon",  desc: "Крупнейший маркетплейс Японии. Электроника, косметика, одежда и многое другое.",               features: ["Быстрая доставка", "Официальные бренды", "Огромный выбор"] },
        { id: "rakuten", desc: "Популярная торговая площадка с тысячами магазинов и частыми акциями.",                         features: ["Акции и купоны", "Много продавцов", "Баллы лояльности"] },
        { id: "yahoo",   desc: "Yahoo! Shopping — большой маркетплейс с аукционами и выгодными ценами.",                      features: ["Аукционы", "Кэшбэк PayPay", "Эксклюзивные товары"] },
        { id: "mercari", desc: "Японский C2C сервис. Новые и б/у товары от частных продавцов по низким ценам.",               features: ["Б/у товары", "Низкие цены", "Уникальные находки"] },
        { id: "kakaku",  desc: "Сервис сравнения цен. Найдите самую выгодную цену на любой товар в Японии.",                  features: ["Сравнение цен", "Рейтинги товаров", "Отзывы покупателей"] },
      ],
    },
    faq: {
      title: "Часто задаваемые вопросы",
      subtitle: "Ответы на самые популярные вопросы",
      items: [
        { q: "Сколько стоит доставка?",              a: "Доставка по Японии до склада — от 500 JPY. Международная доставка рассчитывается по фактическому или объёмному весу (берётся больший). Итоговая стоимость зависит от страны назначения и размера посылки." },
        { q: "Как рассчитывается объёмный вес?",     a: "Объёмный вес = (длина × ширина × высота в см) ÷ 5000. Если объёмный вес превышает фактический, расчёт ведётся по объёмному. Рекомендуем уточнять у администратора перед заказом крупных товаров." },
        { q: "Какие способы оплаты принимаются?",    a: "Принимаем USDT (TRC20, ERC20), наличные в офисе, банковский перевод. Реквизиты пришлёт администратор после подтверждения заказа. Оплату необходимо подтвердить скриншотом чека." },
        { q: "Сколько времени занимает доставка?",   a: "Обычно 10–25 рабочих дней: 3–7 дней на покупку товара в Японии, плюс 7–18 дней на международную доставку. Сроки могут варьироваться в зависимости от загруженности таможни." },
        { q: "Что означают статусы заказа?",         a: "«Новый» — заявка принята. «Ожидает оплаты» — администратор рассчитал стоимость. «Оплачен» — платёж получен. «Покупается» — администратор оформляет покупку. «Куплен» — товар едет на склад. «Завершён» — доставлен вам." },
        { q: "Могу ли я отменить заказ?",            a: "Отмена возможна до статуса «Покупается». После начала покупки отмена не гарантируется. Напишите администратору в боте — он рассмотрит запрос." },
      ],
    },
    contacts: {
      title: "Контакты",
      subtitle: "Выберите удобный канал для связи",
      botCta: "Написать в Telegram-бот",
      items: [
        { platform: "Telegram",  handle: "@Japan_Logistics",  url: BOT_LINK,                                    desc: "Основной канал поддержки",    abbr: "TG" },
        { platform: "Instagram", handle: "@japan.logistics",  url: "https://instagram.com/japan.logistics",     desc: "Новости, акции, обновления",  abbr: "IG" },
        { platform: "WhatsApp",  handle: "Japan Logistics",   url: "https://wa.me/",                            desc: "Для срочных вопросов",        abbr: "WA" },
      ],
    },
    footer: "Япония → Узбекистан / Кыргызстан / Казахстан / Россия",
  },

  UZ: {
    nav: ["Yo'riqnoma", "Do'konlar", "FAQ", "Kontaktlar"],
    botBtn: "Botga qaytish",
    hero: {
      badge: "Mijozlar uchun bilim bazasi",
      title: "Japan Logistics\nHelp Center",
      subtitle: "Telegram-botdan foydalanish bo'yicha to'liq qo'llanma: ro'yxatdan o'tish, buyurtma, to'lov va yetkazish.",
    },
    guide: {
      title: "Bot bo'yicha yo'riqnoma",
      subtitle: "Ro'yxatdan buyurtma olishgacha — 5 oddiy qadam",
      steps: [
        { icon: "01", title: "Ro'yxatdan o'tish",  desc: "Botdagi «Ro'yxatdan o'tish» tugmasini bosing. Ism, telefon, mamlakat va manzilni kiriting. 2 daqiqadan oshmaydi." },
        { icon: "02", title: "Client ID olish",    desc: "Ro'yxatdan o'tgach noyob Client ID beriladi. Uni yapon saytlarida buyurtma berishda manzil maydoniga kiriting." },
        { icon: "03", title: "Buyurtma yaratish",  desc: "Mahsulotni toping, havolasini nusxa olib botga yuboring. O'lcham, rang va sonni ko'rsating — admin narxni hisoblaydi." },
        { icon: "04", title: "To'lov",             desc: "Hisob-kitob oling: mahsulot narxi + komissiya + Yaponiya ichida yetkazish. Summa o'tkazib, chek skrinshot yuklang." },
        { icon: "05", title: "Kuzatish",           desc: "Shaxsiy kabinetda statusni kuzating: yangi → to'lov kutilmoqda → to'landi → sotib olinmoqda → sotib olindi → tugatildi." },
      ],
    },
    videos: {
      title: "Video yo'riqnomalar",
      subtitle: "Har bir qadam bo'yicha batafsil videolar",
      placeholder: "Video tez orada qo'shiladi",
      items: [
        { title: "Botda ro'yxatdan o'tish",  desc: "/start bosishdan Client ID olishgacha bosqichma-bosqich" },
        { title: "Buyurtma yaratish",        desc: "Mahsulot havolasidan admin tasdig'igacha" },
        { title: "To'lov va kuzatish",       desc: "To'lash, chek yuklash va status kuzatish" },
      ],
    },
    stores: {
      title: "Yapon do'konlar",
      subtitle: "Japan Logistics orqali buyurtma uchun mashhur onlayn do'konlar",
      openBtn: "Do'konni ochish",
      items: [
        { id: "uniqlo",  desc: "Yapon kiyim tarmog'i. Sifatli asosiy kiyimlar qulay narxlarda.",                              features: ["Asosiy garderob", "Isitish texnologiyasi", "Mavsumiy kolleksiyalar"] },
        { id: "gu",      desc: "Uniqlo guruhidan yoshlar brendi. Mavsumiy trendlar arzon narxlarda.",                          features: ["Zamonaviy trendlar", "Arzon narxlar", "Keng assortiment"] },
        { id: "amazon",  desc: "Yaponiyaning eng yirik marketpleysi. Elektronika, kosmetika, kiyim va boshqalar.",             features: ["Tez yetkazish", "Rasmiy brendlar", "Keng tanlov"] },
        { id: "rakuten", desc: "Minglab do'konlar va tez-tez aksiyalar bo'lgan mashhur savdo maydoni.",                        features: ["Aksiyalar va kuponlar", "Ko'p sotuvchilar", "Sadoqat ballari"] },
        { id: "yahoo",   desc: "Yahoo! Shopping — auktsionlar va qulay narxlar bilan yirik marketpleys.",                     features: ["Auktsionlar", "PayPay cashback", "Eksklyuziv tovarlar"] },
        { id: "mercari", desc: "Yaponiya C2C xizmati. Shaxsiy sotuvchilardan yangi va ishlatilgan tovarlar.",                 features: ["Ishlatilgan tovarlar", "Past narxlar", "Noyob topilmalar"] },
        { id: "kakaku",  desc: "Narx solishtirish xizmati. Yaponiyada istalgan tovar uchun eng yaxshi narxni toping.",        features: ["Narq solishtirish", "Tovar reytinglari", "Xaridorlar sharhlari"] },
      ],
    },
    faq: {
      title: "Ko'p so'raladigan savollar",
      subtitle: "Eng mashhur savollarga javoblar",
      items: [
        { q: "Yetkazish qancha turadi?",              a: "Yaponiya ichida omborga yetkazish — 500 JPYdan. Xalqaro yetkazish haqiqiy yoki hajmiy og'irlik (kattasi olinadi) bo'yicha hisoblanadi. Yakuniy narx mamlakat va paket o'lchamiga bog'liq." },
        { q: "Hajmiy og'irlik qanday hisoblanadi?",   a: "Hajmiy og'irlik = (uzunlik × kenglik × balandlik sm) ÷ 5000. Hajmiy og'irlik haqiqiydan katta bo'lsa, u bo'yicha hisoblanadi. Katta tovarlar uchun adminga so'rang." },
        { q: "Qanday to'lov usullari qabul qilinadi?", a: "USDT (TRC20, ERC20), ofisda naqd pul, bank o'tkazmasi qabul qilinadi. Buyurtma tasdig'idan so'ng admin rekvizit yuboradi. To'lovni chek skrinshoti bilan tasdiqlash kerak." },
        { q: "Yetkazish qancha vaqt oladi?",          a: "Odatda 10–25 ish kuni: Yaponiyada tovar sotib olish 3–7 kun + xalqaro yetkazish 7–18 kun. Muddatlar bojxona yuklamasiga qarab o'zgarishi mumkin." },
        { q: "Buyurtma statuslari nima anglatadi?",   a: "«Yangi» — ariza qabul qilindi. «To'lov kutilmoqda» — admin narxni hisobladi. «To'landi» — to'lov qabul qilindi. «Sotib olinmoqda» — admin buyurtma bermoqda. «Sotib olindi» — tovar omborga ketmoqda. «Tugatildi» — yetkazildi." },
        { q: "Buyurtmani bekor qila olamanmi?",       a: "«Sotib olinmoqda» statusigacha bekor qilish mumkin. Xarid boshlangandan keyin bekor qilish kafolatlanmaydi. Botda adminga yozing — u so'rovni ko'rib chiqadi." },
      ],
    },
    contacts: {
      title: "Kontaktlar",
      subtitle: "Qulay kanal orqali biz bilan bog'laning",
      botCta: "Telegram-botga yozish",
      items: [
        { platform: "Telegram",  handle: "@Japan_Logistics",  url: BOT_LINK,                                 desc: "Asosiy qo'llab-quvvatlash kanali",  abbr: "TG" },
        { platform: "Instagram", handle: "@japan.logistics",  url: "https://instagram.com/japan.logistics",  desc: "Yangiliklar, aksiyalar",            abbr: "IG" },
        { platform: "WhatsApp",  handle: "Japan Logistics",   url: "https://wa.me/",                         desc: "Shoshilinch savollar uchun",         abbr: "WA" },
      ],
    },
    footer: "Yaponiya → O'zbekiston / Qirg'iziston / Qozog'iston / Rossiya",
  },

  KG: {
    nav: ["Нускама", "Дүкөндөр", "FAQ", "Байланыш"],
    botBtn: "Ботко кайтуу",
    hero: {
      badge: "Кардарлар үчүн маалымат базасы",
      title: "Japan Logistics\nHelp Center",
      subtitle: "Telegram-ботту колдонуу боюнча толук колдонмо: катталуу, заказ, төлөм жана жеткирүү.",
    },
    guide: {
      title: "Бот боюнча нускама",
      subtitle: "Каттоодон заказды алуугакандай — 5 жөнөкөй кадам",
      steps: [
        { icon: "01", title: "Катталуу",          desc: "Боттогу «Катталуу» баскычын басыңыз. Атыңызды, телефонуңузду, өлкөңүздү жана дарегиңизди жазыңыз. 2 мүнөттөн ашпайт." },
        { icon: "02", title: "Client ID алуу",    desc: "Катталгандан кийин уникалдуу Client ID берилет. Аны японский сайттарда заказ берүүдө дарек талаасына жазыңыз." },
        { icon: "03", title: "Заказ түзүү",       desc: "Товарды табып, шилтемесин ботко жөнөтүңүз. Өлчөмүн, түсүн жана санын айтыңыз — админ баасын эсептейт." },
        { icon: "04", title: "Төлөм",             desc: "Эсеп алыңыз: товар баасы + комиссия + Японийядагы жеткирүү. Сумманы которуп, чек скриншотун жүктөңүз." },
        { icon: "05", title: "Байкоо",            desc: "Жеке кабинеттен статусту байкаңыз: жаңы → төлөм күтүлүүдө → төлөндү → сатып алынууда → сатылды → аяктады." },
      ],
    },
    videos: {
      title: "Видео нускамалар",
      subtitle: "Ар бир кадам боюнча толук видеолор",
      placeholder: "Видео жакында кошулат",
      items: [
        { title: "Ботто катталуу",          desc: "/start баскычтан Client ID алуугакандай кадамдуу видео" },
        { title: "Заказ кантип түзүү",      desc: "Товар шилтемесинен админ тастыгына чейин" },
        { title: "Төлөм жана байкоо",       desc: "Кантип төлөп, чек жүктөп, статусту байкоо" },
      ],
    },
    stores: {
      title: "Японский дүкөндөр",
      subtitle: "Japan Logistics аркылуу заказ берүүгө ылайыктуу белгилүү онлайн дүкөндөр",
      openBtn: "Дүкөндү ачуу",
      items: [
        { id: "uniqlo",  desc: "Японский кийим тармагы. Жакшы сапаттагы жөнөкөй кийимдер арзан баада.",                      features: ["Негизги гардероб", "Жылытуу технологиясы", "Мезгилдик коллекциялар"] },
        { id: "gu",      desc: "Uniqlo тобунун жаштар бренди. Тренддүү кийимдер арзан баада.",                                features: ["Заманбап тренддер", "Арзан баалар", "Кеңири ассортимент"] },
        { id: "amazon",  desc: "Японийянын эң ири маркетплейси. Электроника, косметика, кийим жана башкалар.",                features: ["Тез жеткирүү", "Расмий брендер", "Кеңири тандоо"] },
        { id: "rakuten", desc: "Миңдеген дүкөндөр жана жыш акциялары бар белгилүү соода аянтчасы.",                           features: ["Акциялар жана купондор", "Көп саатучулар", "Берилгендик баллдары"] },
        { id: "yahoo",   desc: "Yahoo! Shopping — аукциондор жана ыңгайлуу баалары бар ири маркетплейс.",                    features: ["Аукциондор", "PayPay кэшбэк", "Эксклюзивдүү товарлар"] },
        { id: "mercari", desc: "Японийя C2C кызматы. Жеке саатучулардан жаңы жана колдонулган товарлар.",                    features: ["Колдонулган товарлар", "Арзан баалар", "Уникалдуу табылгалар"] },
        { id: "kakaku",  desc: "Баа салыштыруу кызматы. Японийядагы каалаган товардын эң жакшы баасын тааныңыз.",            features: ["Баа салыштыруу", "Товар рейтингдери", "Сатып алуучу пикирлери"] },
      ],
    },
    faq: {
      title: "Көп берилүүчү суроолор",
      subtitle: "Эң популярдуу суроолорго жооптор",
      items: [
        { q: "Жеткирүү канча турат?",              a: "Японийяда складга чейин — 500 JPYдан. Эл аралык жеткирүү чыныгы же көлөм салмак (чоңу алынат) боюнча эсептелет. Акыркы баасы өлкөгө жана посылканын өлчөмүнө жараша болот." },
        { q: "Көлөм салмак кантип эсептелет?",     a: "Көлөм салмак = (узундук × туурасы × бийиктиги см) ÷ 5000. Көлөм салмак чыныгыдан чоң болсо, ал боюнча эсептелет. Чоң товарлар үчүн админден сураныз." },
        { q: "Кандай төлөм жолдору кабыл алынат?", a: "USDT (TRC20, ERC20), офисте нак акча, банк которуу кабыл алынат. Заказ тастыкталгандан кийин админ реквизит жөнөтөт. Төлөмдү чек скриншоту менен тастыктоо керек." },
        { q: "Жеткирүү канча убакыт алат?",        a: "Адатта 10–25 жумуш күн: Японийяда товар сатып алуу 3–7 күн + эл аралык жеткирүү 7–18 күн. Мөөнөттөр бажыхананын жүктөмүнө жараша өзгөрүшү мүмкүн." },
        { q: "Заказдын статустары эмнени билдирет?", a: "«Жаңы» — арыз кабыл алынды. «Төлөм күтүлүүдө» — админ баасын эсептеди. «Төлөндү» — төлөм кабыл алынды. «Сатып алынууда» — админ буйруртат. «Сатылды» — товар складга жолдо. «Аяктады» — жеткирилди." },
        { q: "Заказды жокко чыгара аламбы?",       a: "«Сатып алынууда» статусуна чейин жокко чыгарса болот. Сатып алуу башталгандан кийин кепилдик берилбейт. Ботто админге жазыңыз — ал өтүнүчтү карайт." },
      ],
    },
    contacts: {
      title: "Байланыш",
      subtitle: "Ыңгайлуу каналды тандаңыз",
      botCta: "Telegram-ботко жазуу",
      items: [
        { platform: "Telegram",  handle: "@Japan_Logistics",  url: BOT_LINK,                                 desc: "Негизги колдоо каналы",         abbr: "TG" },
        { platform: "Instagram", handle: "@japan.logistics",  url: "https://instagram.com/japan.logistics",  desc: "Жаңылыктар жана акциялар",      abbr: "IG" },
        { platform: "WhatsApp",  handle: "Japan Logistics",   url: "https://wa.me/",                         desc: "Шашылыш суроолор үчүн",         abbr: "WA" },
      ],
    },
    footer: "Япония → Өзбекстан / Кыргызстан / Казакстан / Россия",
  },

  EN: {
    nav: ["Guide", "Stores", "FAQ", "Contacts"],
    botBtn: "Back to bot",
    hero: {
      badge: "Customer knowledge base",
      title: "Japan Logistics\nHelp Center",
      subtitle: "Complete guide to the Telegram bot: registration, orders from Japan, payment and delivery tracking.",
    },
    guide: {
      title: "Bot Instructions",
      subtitle: "From registration to delivery — 5 simple steps",
      steps: [
        { icon: "01", title: "Registration",        desc: "Press 'Register' in the bot. Enter your name, phone number, country and delivery address. Takes less than 2 minutes." },
        { icon: "02", title: "Getting Client ID",   desc: "After registration you receive a unique Client ID. Use it in the address field when ordering on Japanese websites." },
        { icon: "03", title: "Creating an Order",   desc: "Find the product, copy the link and send it to the bot. Specify size, color and quantity — the admin will calculate the cost." },
        { icon: "04", title: "Payment",             desc: "Receive a quote: product price + commission + domestic delivery in Japan. Transfer the amount and attach a screenshot of the receipt." },
        { icon: "05", title: "Tracking",            desc: "Track your order status: new → awaiting payment → paid → purchasing → purchased → completed." },
      ],
    },
    videos: {
      title: "Video Guides",
      subtitle: "Detailed videos for each step",
      placeholder: "Video coming soon",
      items: [
        { title: "Bot Registration",        desc: "Step-by-step from /start to receiving your Client ID" },
        { title: "How to Place an Order",   desc: "From product link to admin confirmation" },
        { title: "Payment & Tracking",      desc: "How to pay, attach receipt and track your order status" },
      ],
    },
    stores: {
      title: "Japanese Stores",
      subtitle: "Popular online stores to order via Japan Logistics",
      openBtn: "Open store",
      items: [
        { id: "uniqlo",  desc: "Japanese clothing chain. Quality basics at accessible prices.",                              features: ["Wardrobe basics", "Heat technology", "Seasonal collections"] },
        { id: "gu",      desc: "Youth brand by Uniqlo Group. Trendy items at low prices.",                                   features: ["Fashion trends", "Affordable prices", "Wide range"] },
        { id: "amazon",  desc: "Japan's largest marketplace. Electronics, cosmetics, clothing and much more.",               features: ["Fast delivery", "Official brands", "Huge selection"] },
        { id: "rakuten", desc: "Popular marketplace with thousands of stores and frequent sales.",                           features: ["Sales & coupons", "Many sellers", "Loyalty points"] },
        { id: "yahoo",   desc: "Yahoo! Shopping — large marketplace with auctions and great prices.",                       features: ["Auctions", "PayPay cashback", "Exclusive items"] },
        { id: "mercari", desc: "Japan's C2C service. New and used items from private sellers at low prices.",               features: ["Used goods", "Low prices", "Unique finds"] },
        { id: "kakaku",  desc: "Price comparison service. Find the best price on any product in Japan.",                    features: ["Price comparison", "Product ratings", "Buyer reviews"] },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Answers to the most popular questions",
      items: [
        { q: "How much does delivery cost?",              a: "Domestic delivery in Japan to warehouse — from 500 JPY. International delivery is calculated by actual or volumetric weight (whichever is greater). Final cost depends on destination country and package size." },
        { q: "How is volumetric weight calculated?",      a: "Volumetric weight = (length × width × height in cm) ÷ 5000. If volumetric weight exceeds actual, it is used for calculation. Recommend checking with the admin before ordering large items." },
        { q: "What payment methods are accepted?",        a: "USDT (TRC20, ERC20), cash at office, bank transfer. The admin will send payment details after order confirmation. Payment must be confirmed with a receipt screenshot." },
        { q: "How long does delivery take?",              a: "Typically 10–25 business days: 3–7 days to purchase the item in Japan, plus 7–18 days for international delivery. Times may vary depending on customs workload." },
        { q: "What do order statuses mean?",              a: "'New' — request received. 'Awaiting payment' — admin calculated cost. 'Paid' — payment received. 'Purchasing' — admin is placing order. 'Purchased' — item heading to warehouse. 'Completed' — delivered to you." },
        { q: "Can I cancel my order?",                   a: "Cancellation is possible before 'Purchasing' status. After purchasing begins, cancellation is not guaranteed. Write to the admin in the bot — they will review your request." },
      ],
    },
    contacts: {
      title: "Contacts",
      subtitle: "Choose a convenient channel to reach us",
      botCta: "Message Telegram Bot",
      items: [
        { platform: "Telegram",  handle: "@Japan_Logistics",  url: BOT_LINK,                                 desc: "Main support channel",       abbr: "TG" },
        { platform: "Instagram", handle: "@japan.logistics",  url: "https://instagram.com/japan.logistics",  desc: "News, deals, updates",       abbr: "IG" },
        { platform: "WhatsApp",  handle: "Japan Logistics",   url: "https://wa.me/",                         desc: "For urgent questions",       abbr: "WA" },
      ],
    },
    footer: "Japan → Uzbekistan / Kyrgyzstan / Kazakhstan / Russia",
  },
};

const NAV_IDS = ["guide", "stores", "faq", "contacts"] as const;

export default function Home() {
  const [lang, setLang]       = useState<Lang>("RU");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = content[lang];

  const storeMap = Object.fromEntries(
    t.stores.items.map((s) => [s.id, s])
  ) as Record<StoreId, StoreInfo>;

  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-950">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-700 text-white shadow-lg shadow-red-200">
              <span className="text-sm font-black">JL</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-black tracking-tight leading-none">Japan Logistics</div>
              <div className="text-xs font-medium text-zinc-500 mt-0.5">Help Center</div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 text-sm font-bold text-zinc-600 lg:flex">
            {t.nav.map((label, i) => (
              <a key={i} href={`#${NAV_IDS[i]}`} className="hover:text-red-700 transition-colors">
                {label}
              </a>
            ))}
          </nav>

          {/* Lang switcher + CTA */}
          <div className="flex items-center gap-2">
            <div className="hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-1 sm:flex">
              {(["RU", "UZ", "KG", "EN"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-black transition ${
                    lang === l
                      ? "bg-red-700 text-white shadow"
                      : "text-zinc-500 hover:bg-white hover:text-zinc-900"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href={BOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-red-700 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-red-200 hover:bg-red-800 transition-colors whitespace-nowrap"
            >
              {t.botBtn}
            </a>
          </div>
        </div>

        {/* Mobile lang + nav row */}
        <div className="flex items-center gap-2 overflow-x-auto border-t border-zinc-100 px-5 py-2.5 sm:hidden">
          {(["RU", "UZ", "KG", "EN"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-black transition ${
                lang === l ? "bg-red-700 text-white" : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {l}
            </button>
          ))}
          <div className="mx-2 h-4 w-px bg-zinc-200 shrink-0" />
          {t.nav.map((label, i) => (
            <a
              key={i}
              href={`#${NAV_IDS[i]}`}
              className="shrink-0 text-xs font-bold text-zinc-500 hover:text-red-700 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#fee2e2_0%,transparent_50%),linear-gradient(to_bottom,#ffffff,transparent_80%)]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,#fff7f0,transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-black text-red-700 shadow-sm mb-8">
            {t.hero.badge}
          </div>

          <h1 className="text-5xl font-black leading-[1.02] tracking-tight md:text-8xl whitespace-pre-line">
            {t.hero.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={BOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-red-700 px-7 py-4 font-black text-white shadow-xl shadow-red-200/60 hover:bg-red-800 transition-colors"
            >
              {t.botBtn} →
            </a>
            <a
              href="#guide"
              className="rounded-2xl border-2 border-zinc-200 bg-white px-7 py-4 font-black text-zinc-700 hover:border-red-200 hover:text-red-700 transition-colors"
            >
              {t.nav[0]}
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              ["4", t.nav[3] === "Contacts" ? "Countries" : t.nav[3] === "Контакты" ? "Страны" : t.nav[3] === "Kontaktlar" ? "Mamlakatlar" : "Өлкөлөр"],
              ["7", t.nav[1]],
              ["5", t.nav[0] === "Guide" ? "Steps" : t.nav[0] === "Инструкция" ? "Шагов" : t.nav[0] === "Yo'riqnoma" ? "Qadamlar" : "Кадамдар"],
              ["24/7", "Support"],
            ].map(([num, label]) => (
              <div key={num} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="text-3xl font-black text-red-700">{num}</div>
                <div className="mt-1 text-sm font-bold text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guide ────────────────────────────────────────────────────── */}
      <section id="guide" className="bg-white px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-red-700">01</div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{t.guide.title}</h2>
            <p className="mt-4 text-zinc-500 text-lg">{t.guide.subtitle}</p>
          </div>

          <div className="relative">
            {/* connecting line (desktop) */}
            <div className="absolute left-7 top-10 bottom-10 w-px bg-red-100 hidden md:block" />

            <div className="space-y-6">
              {t.guide.steps.map((step, i) => (
                <div key={step.icon} className="relative flex gap-6 md:gap-8">
                  {/* number circle */}
                  <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-black text-lg shadow-lg transition ${
                    i === 0 ? "bg-red-700 text-white shadow-red-200" : "bg-white border-2 border-red-100 text-red-700"
                  }`}>
                    {step.icon}
                  </div>
                  {/* content */}
                  <div className="flex-1 rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <h3 className="text-xl font-black tracking-tight">{step.title}</h3>
                    <p className="mt-2 leading-7 text-zinc-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <a
              href={BOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-2xl bg-red-700 px-7 py-4 font-black text-white shadow-lg shadow-red-200 hover:bg-red-800 transition-colors"
            >
              {t.botBtn}
            </a>
          </div>
        </div>
      </section>

      {/* ── Videos ───────────────────────────────────────────────────── */}
      <section id="videos" className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-red-700">02</div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{t.videos.title}</h2>
            <p className="mt-4 text-zinc-500 text-lg">{t.videos.subtitle}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.videos.items.map((video, i) => (
              <div key={i} className="group rounded-[2rem] border border-zinc-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                {/* video placeholder */}
                <div className="relative aspect-video bg-zinc-900 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,#3f0000,#000)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white shadow-2xl group-hover:scale-110 transition-transform">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-4 text-xs font-black text-white/50">
                    {t.videos.placeholder}
                  </div>
                  <div className="absolute top-3 left-3 rounded-full bg-red-700 px-2.5 py-1 text-xs font-black text-white">
                    0{i + 1}
                  </div>
                </div>
                {/* card body */}
                <div className="p-6">
                  <h3 className="text-lg font-black tracking-tight">{video.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{video.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stores ───────────────────────────────────────────────────── */}
      <section id="stores" className="bg-white px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-red-700">03</div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{t.stores.title}</h2>
            <p className="mt-4 text-zinc-500 text-lg">{t.stores.subtitle}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {STORES.map((store) => {
              const info = storeMap[store.id];
              return (
                <div
                  key={store.id}
                  className="group rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col"
                >
                  {/* store logo */}
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-white font-black text-sm shadow-lg mb-5"
                    style={{ backgroundColor: store.color }}
                  >
                    {store.abbr}
                  </div>

                  <h3 className="text-lg font-black tracking-tight">{store.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500 flex-1">{info.desc}</p>

                  {/* feature chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {info.features.map((f) => (
                      <span key={f} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-600">
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* open button */}
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-black text-zinc-700 transition group-hover:border-red-200 group-hover:bg-red-50 group-hover:text-red-700"
                  >
                    {t.stores.openBtn}
                    <span className="ml-2">→</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-red-700">04</div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{t.faq.title}</h2>
            <p className="mt-4 text-zinc-500 text-lg">{t.faq.subtitle}</p>
          </div>

          <div className="space-y-3">
            {t.faq.items.map((item, i) => (
              <div
                key={i}
                className={`rounded-[1.5rem] border transition-all overflow-hidden ${
                  openFaq === i ? "border-red-200 bg-white shadow-lg" : "border-zinc-200 bg-white hover:border-zinc-300"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-black text-base md:text-lg">{item.q}</span>
                  <span className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                    openFaq === i ? "bg-red-700 text-white rotate-45" : "bg-zinc-100 text-zinc-500"
                  }`}>
                    +
                  </span>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96" : "max-h-0"}`}>
                  <p className="px-6 pb-6 leading-7 text-zinc-600">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contacts ─────────────────────────────────────────────────── */}
      <section id="contacts" className="bg-white px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-red-700">05</div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{t.contacts.title}</h2>
            <p className="mt-4 text-zinc-500 text-lg">{t.contacts.subtitle}</p>
          </div>

          {/* Main CTA */}
          <a
            href={BOT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-10 flex items-center justify-between rounded-[2rem] bg-red-700 px-8 py-7 text-white shadow-2xl shadow-red-200 hover:bg-red-800 transition-colors"
          >
            <div>
              <div className="text-2xl font-black md:text-3xl">{t.contacts.botCta}</div>
              <div className="mt-1 text-red-200 font-medium">@Japan_Logistics</div>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black">
              TG
            </div>
          </a>

          {/* Contact cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {t.contacts.items.map((c) => (
              <a
                key={c.platform}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-red-200"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-sm font-black text-zinc-700 group-hover:bg-red-700 group-hover:text-white transition-colors">
                  {c.abbr}
                </div>
                <div>
                  <div className="font-black text-lg">{c.platform}</div>
                  <div className="text-sm text-zinc-500">{c.desc}</div>
                  <div className="mt-1 text-sm font-bold text-red-700">{c.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-200 bg-[#fafafa] px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-700 text-white">
                <span className="text-xs font-black">JL</span>
              </div>
              <span className="text-lg font-black">Japan Logistics</span>
            </div>
            <div className="text-zinc-500 text-sm">{t.footer}</div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="hidden rounded-2xl border border-zinc-200 bg-white p-1 flex gap-0">
              {(["RU", "UZ", "KG", "EN"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-black transition ${
                    lang === l ? "bg-red-700 text-white" : "text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a href={BOT_LINK} target="_blank" rel="noopener noreferrer" className="font-black text-red-700 hover:text-red-800 transition-colors">
              {t.botBtn} →
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
