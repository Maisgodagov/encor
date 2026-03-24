export const siteUrl = "https://encor-krd.ru";
export const siteName = "Энкор";
export const sitePhone = "+7 918 981-64-34";
export const sitePhoneHref = "+79189816434";
export const siteEmail = "info@encor-krd.ru";
export const ogImageUrl = `${siteUrl}/img/hero.png`;

export const seoTitle =
  "Электромонтаж в Краснодаре под ключ: квартиры, дома, новостройки | Энкор";

export const seoDescription =
  "Электромонтаж в Краснодаре под ключ для квартир, частных домов, новостроек и офисов. Проводка, электрощит, штробление, освещение, тёплый пол, монтаж розеток и расчёт стоимости.";

export const seoKeywords = [
  "электромонтаж Краснодар",
  "электромонтаж в Краснодаре",
  "электромонтажные работы Краснодар",
  "электрик Краснодар",
  "услуги электрика Краснодар",
  "электрик на дом Краснодар",
  "электрика под ключ Краснодар",
  "монтаж электрики Краснодар",
  "разводка электрики Краснодар",
  "разводка электрики в квартире Краснодар",
  "электромонтаж в квартире Краснодар",
  "электромонтаж в частном доме Краснодар",
  "электромонтаж в новостройке Краснодар",
  "электромонтаж в офисе Краснодар",
  "замена проводки Краснодар",
  "прокладка проводки Краснодар",
  "прокладка кабеля Краснодар",
  "монтаж кабельных линий Краснодар",
  "штробление стен под проводку Краснодар",
  "проект электрики Краснодар",
  "проект электромонтажа Краснодар",
  "расчёт нагрузок Краснодар",
  "расчет нагрузок Краснодар",
  "сборка электрощита Краснодар",
  "сборка щита Краснодар",
  "монтаж электрощита Краснодар",
  "электрощит под ключ Краснодар",
  "монтаж розеток Краснодар",
  "монтаж выключателей Краснодар",
  "установка розеток и выключателей Краснодар",
  "монтаж установочных коробок Краснодар",
  "установка распределительных коробок Краснодар",
  "монтаж освещения Краснодар",
  "монтаж светильников Краснодар",
  "подключение светильников Краснодар",
  "монтаж тёплого пола Краснодар",
  "монтаж теплого пола Краснодар",
  "электрический теплый пол Краснодар",
  "подключение бытовой техники Краснодар",
  "подключение электроприборов Краснодар",
  "монтаж автоматики Краснодар",
  "подбор автоматов Краснодар",
  "УЗО Краснодар",
  "дифавтомат Краснодар",
  "сварка проводов Краснодар",
  "гильзование проводов Краснодар",
  "соединение проводов в коробках Краснодар",
  "электрика после застройщика Краснодар",
  "переделка электрики Краснодар",
  "ремонт электрики Краснодар",
  "электромонтаж цена Краснодар",
  "стоимость электромонтажа Краснодар",
  "расчёт стоимости электромонтажа Краснодар",
  "расчет стоимости электромонтажа Краснодар",
  "электромонтаж коммерческих объектов Краснодар",
  "электромонтаж частных домов Краснодар",
  "освещение участка Краснодар",
  "антипротечка Краснодар",
];

export const seoServices = [
  "Проектная документация по электромонтажу",
  "Штробление стен под проводку",
  "Устройство проходных отверстий под трассы",
  "Монтаж электроустановки",
  "Монтаж тёплого пола",
  "Оценка мощности оборудования и подбор номиналов автоматики",
  "Сборка электрощитового оборудования",
  "Прокладка кабельно-проводниковой продукции",
  "Установка распределительных коробок",
  "Монтаж установочных коробок",
  "Монтаж осветительного оборудования",
  "Подключение бытовых электроприборов",
  "Подключение и настройка антипротечки",
  "Соединение проводов сваркой и гильзованием",
];

export const seoJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    alternateName: "Энкор Электромонтаж",
    description: seoDescription,
    inLanguage: "ru-RU",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: siteUrl,
    name: seoTitle,
    description: seoDescription,
    inLanguage: "ru-RU",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#electrician`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${siteUrl}/#electrician`,
    name: siteName,
    alternateName: ["Энкор Электромонтаж", "Энкор Краснодар"],
    url: siteUrl,
    description: seoDescription,
    image: [ogImageUrl, `${siteUrl}/img/hero77.png`],
    logo: `${siteUrl}/logo.svg`,
    telephone: sitePhone,
    email: siteEmail,
    priceRange: "$$",
    areaServed: [
      {
        "@type": "City",
        name: "Краснодар",
      },
      {
        "@type": "AdministrativeArea",
        name: "Краснодарский край",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Краснодар",
      addressRegion: "Краснодарский край",
      addressCountry: "RU",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    availableLanguage: ["ru"],
    serviceType: seoServices,
    knowsAbout: seoServices,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: sitePhone,
        email: siteEmail,
        contactType: "customer support",
        areaServed: "RU-KDA",
        availableLanguage: ["ru"],
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/#services`,
    name: "Услуги электромонтажа в Краснодаре",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: seoServices.length,
    itemListElement: seoServices.map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name,
        areaServed: "Краснодар",
        provider: {
          "@id": `${siteUrl}/#electrician`,
        },
      },
    })),
  },
];
