window.PORTFOLIO = {
  profile: {
    name: "Сергей",
    role: "Коммерческий векторный иллюстратор",
    lead: "Иллюстрации для брендов, сезонных кампаний и физических носителей.",
    about: "Работаю по ТЗ: собираю композицию, стилизую референсы, создаю сцены и серии и адаптирую иллюстрацию под конкретный формат. Основная часть представленных работ сделана для J’Pan.",
    contacts: []
  },
  projects: [
    {
      id: "covers",
      index: "01",
      label: "J’Pan · сезонные кампании",
      title: "Обложки и большие сцены",
      text: "Передняя и задняя части обложек, сезонные сюжеты и крупноформатные иллюстрации.",
      layout: "covers",
      pairs: [
        {
          title: "Winter 2025",
          images: [
            ["assets/winter25a_back.png", "Winter 2025 · front"],
            ["assets/winter25a_front.png", "Winter 2025 · back"]
          ]
        },
        {
          title: "Hanami · Весна",
          images: [
            ["assets/hanami_front.png", "Hanami · front"],
            ["assets/hanami_back.png", "Hanami · back"]
          ]
        },
        {
          title: "Summer",
          images: [
            ["assets/summer_back.png", "Summer · front"],
            ["assets/summer_front.png", "Summer · back"]
          ]
        },
        {
          title: "Winter 2023",
          images: [
            ["assets/winter23_front.png", "Winter 2023 · front"],
            ["assets/winter23_back.png", "Winter 2023 · back"]
          ]
        },
        {
          title: "Спешл зимний",
          images: [
            ["assets/winter25b_front.png", "Спешл зимний · front"],
            ["assets/winter25b_back.png", "Спешл зимний · back"]
          ]
        },
        {
          title: "Весна",
          images: [
            ["assets/winter_spring_front.png", "Весна · front"],
            ["assets/winter_spring_back.png", "Весна · back"]
          ]
        },
        {
          title: "Halloween · одностороннее спешл-меню",
          images: [
            ["assets/halloween-cover-original.jpg", "Halloween"]
          ]
        }
      ]
    },
    {
      id: "sber",
      index: "02",
      label: "J’Pan × Сбер Прайм",
      title: "Банковские карты",
      text: "Финальные иллюстрации и дополнительные концепты для банковских карт J’Pan × Сбер Прайм.",
      layout: "sber",
      images: [
        ["assets/sber-night-final.png", "Ночная улица"],
        ["assets/sber-sakura-final.png", "Сад и сакура"]
      ],
      conceptsTitle: "Дополнительные концепты",
      concepts: [
        ["assets/sber-concept-bistro.png", "J’Pan Bistro"],
        ["assets/sber-concept-japan.png", "Японский коллаж"],
        ["assets/sber-concept-shiba-food.png", "Сиба и блюдо"]
      ]
    },
    {
      id: "series",
      index: "03",
      label: "J’Pan · серии",
      title: "Серийные иллюстрации",
      text: "Разные сюжеты внутри единого визуального языка.",
      layout: "series",
      groups: [
        {
          title: "World Cuisines",
          images: [
            ["assets/world-cuisines-1.png", ""],
            ["assets/world-cuisines-2.png", ""],
            ["assets/world-cuisines-3.png", ""],
            ["assets/world-cuisines-4.png", ""]
          ]
        },
        {
          title: "Sailor Moon",
          images: [
            ["assets/sailor-moon-1.png", ""],
            ["assets/sailor-moon-2.png", ""],
            ["assets/sailor-moon-3.png", ""],
            ["assets/sailor-moon-4.png", ""]
          ]
        }
      ]
    },
    {
      id: "small",
      index: "04",
      label: "J’Pan · малый формат",
      title: "Наборы стикеров",
      text: "Серии стикеров для J’Pan, рассчитанные на небольшой формат и быстрое считывание.",
      layout: "small",
      groups: [
        {
          title: "Autumn",
          images: [
            ["assets/autumn-sticker-1.png", ""],
            ["assets/autumn-sticker-2.png", ""],
            ["assets/autumn-sticker-3.png", ""]
          ]
        },
        {
          title: "Autumn Pack",
          images: [
            ["assets/autumn-pack-1.png", ""],
            ["assets/autumn-pack-2.png", ""],
            ["assets/autumn-pack-3.png", ""]
          ]
        },
        {
          title: "Halloween",
          images: [
            ["assets/halloween-pack-1.png", ""],
            ["assets/halloween-pack-2.png", ""],
            ["assets/halloween-pack-3.png", ""]
          ]
        },
        {
          title: "14 February",
          images: [
            ["assets/valentine-1.png", ""],
            ["assets/valentine-2.png", ""],
            ["assets/valentine-3.png", ""]
          ]
        }
      ]
    },
    {
      id: "selected",
      index: "05",
      label: "Selected work",
      title: "Другие работы",
      text: "Отдельные коммерческие иллюстрации для J’Pan, не входящие в серии выше.",
      layout: "selected",
      images: [
        ["assets/hero-winter-panel.png", "Winter panel"],
        ["assets/dragon.png", "Dragon"],
        ["assets/wonka.png", "Wonka"],
        ["assets/postcard.png", "Postcard"],
        ["assets/nye.png", "New Year"]
      ]
    }
  ]
};
