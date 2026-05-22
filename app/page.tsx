"use client";

import { useState } from "react";

const botLink = "https://t.me/Japan_Logistics";

type Lang = "RU" | "UZ" | "KG" | "EN";

const content = {
  RU: {
    nav: ["Инструкция", "Магазины", "Поддержка"],
    bot: "Вернуться в бот",
    badge: "Информационная страница для клиентов",
    title: "Инструкция по использованию Telegram-бота Japan Logistics",
    subtitle:
      "Здесь вы узнаете, как зарегистрироваться, оформить заказ из японских магазинов, оплатить выкуп, отслеживать статус и связаться с поддержкой.",
    cards: [
      ["01", "Инструкция по боту", "Регистрация, заказ, оплата и отслеживание статуса."],
      ["02", "Регистрация на японские сайты", "Uniqlo, Amazon Japan, Rakuten и другие магазины."],
      ["03", "Вопросы / Поддержка", "Комиссия, сроки доставки, оплата и контакты админов."],
    ],
    sections: [
      {
        id: "bot",
        number: "01",
        title: "Инструкция по использованию бота",
        items: [
          ["Регистрация", "Нажмите кнопку регистрации в Telegram-боте. Заполните имя, телефон, страну доставки и адрес. После регистрации вы получите личный ID клиента."],
          ["Создание заказа", "Выберите магазин, вставьте ссылку товара, укажите размер, цвет, количество и подтвердите заказ."],
          ["Оплата", "Администратор отправит расчет: цена товара, комиссия за выкуп, доставка по Японии и итоговая сумма."],
          ["Статус заказа", "В личном кабинете можно видеть этапы: новый заказ, ожидает оплаты, куплено, на складе, отправлено, доставлено."],
        ],
      },
      {
        id: "shops",
        number: "02",
        title: "Регистрация на японские сайты",
        items: [
          ["Uniqlo Japan", "Используйте данные склада Japan Logistics. В адресе обязательно указывайте ваш клиентский ID."],
          ["Amazon Japan", "Можно отправлять ссылки товаров в бот. Если нужна покупка от нашей компании, администратор сделает выкуп."],
          ["Rakuten / Yahoo", "Проверяйте доставку по Японии. Если сайт не принимает иностранную карту, мы можем помочь с выкупом."],
        ],
      },
      {
        id: "support",
        number: "03",
        title: "Вопросы и поддержка",
        items: [
          ["Комиссия", "Комиссия зависит от страны клиента, стоимости товара и типа заказа."],
          ["Сроки доставки", "Сроки зависят от страны, авиарейсов, таможни и загруженности склада."],
          ["Оплата", "После расчета администратор отправит реквизиты или QR-код для оплаты."],
          ["Контакты", "Для срочных вопросов используйте Telegram, WhatsApp или Instagram Japan Logistics."],
        ],
      },
    ],
    video: "Видео-инструкция",
    videoText: "Здесь позже будет видео с YouTube / Vimeo / Cloudflare Stream.",
    footer: "Japan → Uzbekistan / Kyrgyzstan / Kazakhstan / Russia",
  },

  UZ: {
    nav: ["Yo‘riqnoma", "Do‘konlar", "Yordam"],
    bot: "Botga qaytish",
    badge: "Mijozlar uchun ma’lumot sahifasi",
    title: "Japan Logistics Telegram-botidan foydalanish yo‘riqnomasi",
    subtitle:
      "Bu yerda ro‘yxatdan o‘tish, yapon do‘konlaridan buyurtma berish, to‘lov qilish, buyurtma holatini kuzatish va admin bilan bog‘lanishni o‘rganasiz.",
    cards: [
      ["01", "Bot yo‘riqnomasi", "Ro‘yxatdan o‘tish, buyurtma, to‘lov va statusni kuzatish."],
      ["02", "Yapon saytlarida ro‘yxatdan o‘tish", "Uniqlo, Amazon Japan, Rakuten va boshqa do‘konlar."],
      ["03", "Savollar / Yordam", "Komissiya, yetkazish muddati, to‘lov va admin kontaktlari."],
    ],
    sections: [
      {
        id: "bot",
        number: "01",
        title: "Botdan foydalanish yo‘riqnomasi",
        items: [
          ["Ro‘yxatdan o‘tish", "Telegram-botda ro‘yxatdan o‘tish tugmasini bosing. Ism, telefon, mamlakat va manzilni kiriting. Sizga mijoz ID beriladi."],
          ["Buyurtma yaratish", "Do‘konni tanlang, mahsulot havolasini kiriting, o‘lcham, rang va sonini yozing."],
          ["To‘lov", "Admin mahsulot narxi, xarid komissiyasi, Yaponiya ichki yetkazish va umumiy summani yuboradi."],
          ["Buyurtma statusi", "Shaxsiy kabinetda yangi buyurtma, to‘lov kutilmoqda, sotib olindi, omborda, yuborildi, yetkazildi statuslarini ko‘rasiz."],
        ],
      },
      {
        id: "shops",
        number: "02",
        title: "Yapon saytlarida ro‘yxatdan o‘tish",
        items: [
          ["Uniqlo Japan", "Japan Logistics ombor ma’lumotlaridan foydalaning. Manzilda mijoz ID ni albatta yozing."],
          ["Amazon Japan", "Mahsulot havolasini botga yuborishingiz mumkin. Kerak bo‘lsa, xaridni biz amalga oshiramiz."],
          ["Rakuten / Yahoo", "Yaponiya ichida yetkazish shartlarini tekshiring. Agar karta qabul qilinmasa, biz yordam beramiz."],
        ],
      },
      {
        id: "support",
        number: "03",
        title: "Savollar va yordam",
        items: [
          ["Komissiya", "Komissiya mijoz mamlakati, mahsulot narxi va buyurtma turiga qarab hisoblanadi."],
          ["Yetkazish muddati", "Muddati mamlakat, aviareyslar, bojxona va ombor yuklamasiga bog‘liq."],
          ["To‘lov", "Hisob-kitobdan keyin admin rekvizit yoki QR-kod yuboradi."],
          ["Kontaktlar", "Shoshilinch savollar uchun Telegram, WhatsApp yoki Instagram orqali bog‘laning."],
        ],
      },
    ],
    video: "Video yo‘riqnoma",
    videoText: "Bu yerda keyin YouTube / Vimeo / Cloudflare Stream videosi joylanadi.",
    footer: "Yaponiya → O‘zbekiston / Qirg‘iziston / Qozog‘iston / Rossiya",
  },

  KG: {
    nav: ["Нускама", "Дүкөндөр", "Колдоо"],
    bot: "Ботко кайтуу",
    badge: "Кардарлар үчүн маалымат баракчасы",
    title: "Japan Logistics Telegram-ботун колдонуу боюнча нускама",
    subtitle:
      "Бул жерде катталуу, япон дүкөндөрүнөн заказ берүү, төлөм кылуу, статусту текшерүү жана админ менен байланышуу түшүндүрүлөт.",
    cards: [
      ["01", "Бот боюнча нускама", "Катталуу, заказ, төлөм жана статусту көзөмөлдөө."],
      ["02", "Япон сайттарына катталуу", "Uniqlo, Amazon Japan, Rakuten жана башка дүкөндөр."],
      ["03", "Суроолор / Колдоо", "Комиссия, жеткирүү мөөнөтү, төлөм жана админ контакттары."],
    ],
    sections: [
      {
        id: "bot",
        number: "01",
        title: "Ботту колдонуу боюнча нускама",
        items: [
          ["Катталуу", "Telegram-боттон катталуу баскычын басыңыз. Атыңызды, телефонуңузду, өлкөңүздү жана дарегиңизди жазыңыз. Сизге кардар ID берилет."],
          ["Заказ түзүү", "Дүкөндү тандап, товар шилтемесин, өлчөмүн, түсүн жана санын киргизиңиз."],
          ["Төлөм", "Админ товар баасын, сатып алуу комиссиясын, Япония ичиндеги жеткирүүнү жана жалпы сумманы жөнөтөт."],
          ["Заказ статусу", "Жеке кабинеттен жаңы заказ, төлөм күтүлүүдө, сатып алынды, складда, жөнөтүлдү, жеткирилди деген этаптарды көрөсүз."],
        ],
      },
      {
        id: "shops",
        number: "02",
        title: "Япон сайттарына катталуу",
        items: [
          ["Uniqlo Japan", "Japan Logistics склад дарегин колдонуңуз. Даректе кардар ID сөзсүз көрсөтүлүшү керек."],
          ["Amazon Japan", "Товар шилтемесин ботко жөнөтсөңүз болот. Керек болсо сатып алууну биз жасайбыз."],
          ["Rakuten / Yahoo", "Япония ичиндеги жеткирүү шарттарын текшериңиз. Эгер карта өтпөсө, биз жардам беребиз."],
        ],
      },
      {
        id: "support",
        number: "03",
        title: "Суроолор жана колдоо",
        items: [
          ["Комиссия", "Комиссия кардардын өлкөсүнө, товар баасына жана заказ түрүнө жараша эсептелет."],
          ["Жеткирүү мөөнөтү", "Мөөнөт өлкөгө, авиакаттамга, бажыга жана складдын жүктөмүнө жараша болот."],
          ["Төлөм", "Эсеп чыккандан кийин админ реквизит же QR-код жөнөтөт."],
          ["Контакттар", "Шашылыш суроолор үчүн Telegram, WhatsApp же Instagram аркылуу байланышыңыз."],
        ],
      },
    ],
    video: "Видео нускама",
    videoText: "Бул жерге кийин YouTube / Vimeo / Cloudflare Stream видеосу коюлат.",
    footer: "Япония → Өзбекстан / Кыргызстан / Казакстан / Россия",
  },

  EN: {
    nav: ["Guide", "Stores", "Support"],
    bot: "Back to bot",
    badge: "Information page for clients",
    title: "How to use the Japan Logistics Telegram bot",
    subtitle:
      "Here you can learn how to register, place orders from Japanese online stores, pay for purchase service, track order status and contact support.",
    cards: [
      ["01", "Bot instructions", "Registration, ordering, payment and status tracking."],
      ["02", "Japanese store registration", "Uniqlo, Amazon Japan, Rakuten and other stores."],
      ["03", "FAQ / Support", "Commission, delivery time, payment and admin contacts."],
    ],
    sections: [
      {
        id: "bot",
        number: "01",
        title: "Bot usage instructions",
        items: [
          ["Registration", "Press the registration button in the Telegram bot. Fill in your name, phone number, delivery country and address. You will receive your client ID."],
          ["Creating an order", "Choose a store, paste the product link, select size, color, quantity and confirm the order."],
          ["Payment", "The admin will send a calculation: product price, purchase commission, domestic delivery in Japan and total amount."],
          ["Order status", "In your personal cabinet, you can track statuses: new order, waiting for payment, purchased, at warehouse, shipped and delivered."],
        ],
      },
      {
        id: "shops",
        number: "02",
        title: "Registration on Japanese websites",
        items: [
          ["Uniqlo Japan", "Use the Japan Logistics warehouse information. Always include your client ID in the address."],
          ["Amazon Japan", "You can send product links to the bot. If needed, our company can purchase the goods for you."],
          ["Rakuten / Yahoo", "Check domestic delivery conditions in Japan. If the website does not accept your card, we can help with purchase service."],
        ],
      },
      {
        id: "support",
        number: "03",
        title: "Questions and support",
        items: [
          ["Commission", "The commission depends on the client country, product price and order type."],
          ["Delivery time", "Delivery time depends on the country, flights, customs and warehouse workload."],
          ["Payment", "After calculation, the admin will send payment details or a QR code."],
          ["Contacts", "For urgent questions, contact Japan Logistics via Telegram, WhatsApp or Instagram."],
        ],
      },
    ],
    video: "Video guide",
    videoText: "A YouTube / Vimeo / Cloudflare Stream video will be placed here later.",
    footer: "Japan → Uzbekistan / Kyrgyzstan / Kazakhstan / Russia",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("RU");
  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-950">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-white shadow-lg shadow-red-200">
              <span className="text-sm font-black">JL</span>
            </div>
            <div>
              <div className="text-lg font-black tracking-tight">Japan Logistics</div>
              <div className="text-xs font-medium text-zinc-500">Guide Platform</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-bold text-zinc-700 md:flex">
            <a href="#bot" className="hover:text-red-700">{t.nav[0]}</a>
            <a href="#shops" className="hover:text-red-700">{t.nav[1]}</a>
            <a href="#support" className="hover:text-red-700">{t.nav[2]}</a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-1 md:flex">
              {(["RU", "UZ", "KG", "EN"] as Lang[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setLang(item)}
                  className={`rounded-xl px-3 py-2 text-xs font-black transition ${
                    lang === item
                      ? "bg-red-700 text-white shadow"
                      : "text-zinc-500 hover:bg-white hover:text-zinc-900"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <a
              href={botLink}
              className="rounded-2xl bg-red-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-200 hover:bg-red-800"
            >
              {t.bot}
            </a>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto border-t border-zinc-100 px-5 py-3 md:hidden">
          {(["RU", "UZ", "KG", "EN"] as Lang[]).map((item) => (
            <button
              key={item}
              onClick={() => setLang(item)}
              className={`rounded-xl px-4 py-2 text-sm font-black ${
                lang === item ? "bg-red-700 text-white" : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      <section className="relative overflow-hidden px-5 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#fee2e2,transparent_35%),linear-gradient(to_bottom,#fff,transparent)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-black text-red-700 shadow-sm">
              {t.badge}
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-7xl">
              {t.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">
              {t.subtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {t.cards.map((card) => (
              <a
                key={card[0]}
                href={card[0] === "01" ? "#bot" : card[0] === "02" ? "#shops" : "#support"}
                className="group rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-xl shadow-zinc-200/60 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl font-black text-red-700 group-hover:bg-red-700 group-hover:text-white">
                  {card[0]}
                </div>
                <h2 className="mt-6 text-2xl font-black tracking-tight">{card[1]}</h2>
                <p className="mt-3 leading-7 text-zinc-600">{card[2]}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {t.sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={index % 2 === 1 ? "bg-white px-5 py-20" : "px-5 py-20"}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <div className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-red-700">
                Block {section.number}
              </div>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                {section.title}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {section.items.map((item) => (
                <div
                  key={item[0]}
                  className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm transition hover:shadow-xl"
                >
                  <h3 className="text-2xl font-black tracking-tight">{item[0]}</h3>
                  <p className="mt-4 leading-8 text-zinc-600">{item[1]}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
              <div className="text-2xl font-black">{t.video}</div>
              <p className="mt-3 text-zinc-500">{t.videoText}</p>
            </div>

            <div className="mt-8">
              <a
                href={botLink}
                className="inline-flex rounded-2xl bg-red-700 px-7 py-4 font-black text-white shadow-lg shadow-red-200 hover:bg-red-800"
              >
                {t.bot}
              </a>
            </div>
          </div>
        </section>
      ))}

      <footer className="border-t border-zinc-200 bg-white px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="text-xl font-black">Japan Logistics</div>
            <div className="mt-1 text-zinc-500">{t.footer}</div>
          </div>

          <a href={botLink} className="font-black text-red-700">
            {t.bot} →
          </a>
        </div>
      </footer>
    </main>
  );
}