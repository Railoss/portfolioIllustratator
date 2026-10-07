(()=>{
    const assets={
  "hero": "assets/hero-winter-panel.png",
  "winterFront": "assets/winter25a_back.png",
  "winterBack": "assets/winter25a_front.png",
  "springFront": "assets/hanami_front.png",
  "springBack": "assets/hanami_back.png",
  "bankNight": "assets/sber-night-final.png",
  "bankSpring": "assets/sber-sakura-final.png",
  "panel": "assets/proofs/panel-source-hi.svg",
  "panelProof": "assets/proofs/panel-proof-1.svg",
  "merchOne": "assets/proofs/hanami-print-1-cropped.svg",
  "merchTwo": "assets/proofs/hanami-print-2-cropped.svg",
  "merchProof": "assets/proofs/hanami-merch-proof.svg",
  "worldOne": "assets/world-cuisines-1.png",
  "worldTwo": "assets/world-cuisines-2.png",
  "worldThree": "assets/world-cuisines-3.png",
  "worldFour": "assets/world-cuisines-4.png",
  "stickerOne": "assets/autumn-sticker-1.png",
  "stickerTwo": "assets/autumn-sticker-2.png",
  "stickerThree": "assets/autumn-sticker-3.png",
  "winterProof": "assets/proofs/winter-menu-live-exact.svg",
  "springProof": "assets/proofs/spring-menu-live.svg",
  "bankProofOne": "assets/proofs/sber-live-1.svg",
  "bankProofTwo": "assets/proofs/sber-live-2.svg",
  "worldProofOne": "assets/proofs/world-live-1.svg",
  "worldProofTwo": "assets/proofs/world-live-2.svg",
  "stickerProof": "assets/proofs/halloween-sticker-live.svg",
  "halloweenSticker": "assets/halloween-pack-1.png"
};
    const projects={
      menus:{title:'Сезонные меню',label:'J’PAN / Сезонные кампании',description:'Обложки и крупные иллюстрации для сезонных меню. Парные композиции: передняя и задняя стороны образуют одну визуальную историю.',client:'J’PAN',role:'Иллюстрация обложек',format:'Печатное меню',images:[['winterFront','Winter 2025 — первая сторона'],['winterBack','Winter 2025 — вторая сторона'],['springFront','Hanami — первая сторона'],['springBack','Hanami — вторая сторона']]},
      bank:{title:'J’PAN × СберПрайм',label:'Иллюстрация / Банковские карты',description:'Два финальных дизайна для лимитированных дебетовых карт: ночная улица и сад с сакурой. Оба дизайна были выпущены.',client:'J’PAN × СберПрайм',role:'Две финальные иллюстрации',format:'Банковские карты',images:[['bankNight','Ночная улица'],['bankSpring','Сад и сакура']]},
      panel:{title:'История на всю стену',label:'J’PAN / Интерьер',description:'Иллюстрация для крупноформатного панно в J’PAN на Чаянова, 22с4. Сцена становится частью ресторанного пространства.',client:'J’PAN',role:'Иллюстрация',format:'Интерьерное панно',wide:true,images:[['panel','Исходная иллюстрация для панно']],proof:{image:'panelProof',text:'Панно в интерьере J’PAN. Материал взят из опубликованного кейса.',url:'https://t.me/jpan_bistro/1533'}},
      merch:{title:'Hanami',label:'J’PAN / Фестивальный мерч',description:'Два иллюстративных принта для фестивального мерча Hanami.',client:'J’PAN',role:'Иллюстрация принтов',format:'Мерч',images:[['merchOne','Hanami — принт 1'],['merchTwo','Hanami — принт 2']],proof:{image:'merchProof',text:'Фестивальный мерч с готовыми принтами. Материал из текущего портфолио.',url:'https://www.instagram.com/reel/Cqm26mFvVLe/'}},
      series:{title:'World Cuisines',label:'J’PAN / Серийная иллюстрация',description:'Серия иллюстраций-марок для оформления подачи и съёмок. Разные сюжеты объединены общей стилистикой и форматом.',client:'J’PAN',role:'Серия иллюстраций',format:'Иллюстрации-марки',images:[['worldOne','World Cuisines — 1'],['worldTwo','World Cuisines — 2'],['worldThree','World Cuisines — 3'],['worldFour','World Cuisines — 4']]},
      stickers:{title:'Маленькие персонажи',label:'J’PAN / Малый формат',description:'Осенний набор стикеров. Персонажи и детали адаптированы для небольшого печатного формата.',client:'J’PAN',role:'Иллюстрации',format:'Стикеры',images:[['stickerOne','Осенний стикер 1'],['stickerTwo','Осенний стикер 2'],['stickerThree','Осенний стикер 3']]}
    };
    projects.menus.proof={text:'Сезонные меню в публикациях J’PAN: зимняя обложка и весенний Hanami.',images:[['winterProof','Зимнее меню — публикация J’PAN'],['springProof','Hanami — публикация J’PAN']],links:[['Зимнее меню · Telegram','https://t.me/jpan_bistro/4542'],['Hanami · Telegram','https://t.me/jpan_bistro/1567']]};
    projects.bank.proof={text:'Публикации J’PAN с выпущенными картами и готовыми иллюстрациями.',images:[['bankProofTwo','Кампании J’PAN × СберПрайм в публикации бренда'],['bankProofOne','Публикация с картами в использовании']],links:[['Публикация · VK','https://vk.ru/wall-41978256_94825'],['Публикация · Facebook','https://www.facebook.com/jpan.bistro/posts/1280555507421337/']]};
    projects.panel.proof={text:'Готовое панно в интерьере J’PAN.',images:[['panelProof','Панно в ресторанном пространстве']],links:[['Панно · Telegram','https://t.me/jpan_bistro/1533'],['Ещё одна публикация · Telegram','https://t.me/jpan_bistro/5065']]};
    projects.merch.proof={text:'Фестивальный мерч Hanami с готовыми принтами.',images:[['merchProof','Готовый мерч Hanami']],links:[['Мерч Hanami · Instagram','https://www.instagram.com/reel/Cqm26mFvVLe/']]};
    projects.series.proof={text:'Иллюстрации-марки в ресторанной подаче и съёмках готовых блюд.',images:[['worldProofOne','World Cuisines — иллюстрации в подаче'],['worldProofTwo','World Cuisines — фотография готовой подачи']],links:[['World Cuisines · Telegram','https://t.me/jpan_bistro/2047']]};
    projects.stickers.description='Сезонные наборы стикеров. Персонажи и детали адаптированы для небольшого печатного формата.';
    projects.stickers.images.push(['halloweenSticker','Хэллоуинский стикер — персонаж из публикации']);
    projects.stickers.proof={text:'Публикация J’PAN с хэллоуинским стикером. Осенний набор представлен ниже вместе с иллюстрацией этого персонажа.',images:[['stickerProof','Хэллоуинский стикер — публикация J’PAN']],links:[['Стикер · Telegram','https://t.me/jpan_bistro/735']]};
    projects.bank.client='J’PAN';
    projects.bank.label='J’PAN / Коллаборация со СберПрайм';
    projects.bank.description='Две финальные иллюстрации для лимитированных дебетовых карт в коллаборации J’PAN со СберПрайм: ночная улица и сад с сакурой. Оба дизайна были выпущены.';
    projects.menus.media=[['winterFront','Winter 2025 — первая сторона'],['winterProof','Зимнее меню в публикации J’PAN',0,true],['springFront','Hanami — первая сторона'],['springProof','Hanami в публикации J’PAN',1,true],['winterBack','Winter 2025 — вторая сторона'],['springBack','Hanami — вторая сторона']];
    projects.bank.media=[...projects.bank.images,['bankProofTwo','Выпущенные карты — публикация J’PAN',0,true],['bankProofOne','Карты в использовании — публикация J’PAN',1,true]];
    projects.panel.media=[['panelProof','Готовое панно в интерьере J’PAN',0,true],...projects.panel.images];
    projects.merch.media=[...projects.merch.images,['merchProof','Мерч Hanami с готовыми принтами',0,true,true]];
    projects.series.media=[...projects.series.images,['worldProofOne','Марки в ресторанной подаче',0,true],['worldProofTwo','Иллюстрации в съёмке готовых блюд',0,true]];
    projects.stickers.media=[...projects.stickers.images,['stickerProof','Хэллоуинский стикер в публикации J’PAN',0,true,true]];

    window.PORTFOLIO_DATA={assets,projects};
})();
