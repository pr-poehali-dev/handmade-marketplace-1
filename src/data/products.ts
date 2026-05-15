export type Product = {
  id: number;
  category: string;
  price: number;
  oldPrice: number | null;
  name: string;
  seller: string;
  sellerAvatar?: string;
  sellerSince?: string;
  sellerSales?: number;
  rating: number;
  reviews: number;
  tag: string | null;
  image: string;
  images?: string[];
  description?: string;
  specs?: { label: string; value: string }[];
  reviewsList?: { author: string; rating: number; text: string; date: string }[];
};

const IMG = {
  sweater: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/322aaa6e-9763-4236-b767-c46f290d8e74.jpg",
  earrings: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/845b801c-8cae-4250-8e1c-b99b60d7c199.jpg",
  watercolor: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/35573792-a627-4c12-afc3-ab7cffa629a0.jpg",
  moccasins: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/9afcf1c6-4db2-4dbe-ad75-52bace8878f7.jpg",
  ukulele: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/2c659765-75f6-464f-89a5-d0af806e48cc.jpg",
  bracelet: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/a8ae37bc-d802-497c-8fba-35f65daa36fd.jpg",
  coat: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/ab251117-9715-4e6d-abd4-043b6d991e32.jpg",
  oilpainting: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/3d06f46d-1fb0-4003-b74a-9ab5929e3ede.jpg",
};

export const PRODUCTS: Product[] = [
  {
    id: 1, category: "clothing", price: 4200, oldPrice: 5500,
    name: "Свитер ручной вязки «Зима»",
    seller: "Маша Кузнецова", sellerSince: "2019", sellerSales: 312, rating: 4.9, reviews: 128,
    tag: "Хит продаж",
    image: IMG.sweater,
    images: [IMG.sweater, IMG.coat, IMG.moccasins],
    description: "Этот свитер — как объятия в снегопад. Каждая петля вывязана вручную из 100% мериносовой шерсти: невесомой, невероятно мягкой и тёплой даже в сильный мороз. Скандинавский узор «снежинка» на каждом изделии уникален — два одинаковых просто не существует. Вы получаете не просто одежду, а вещь с историей, которую будете носить годами и передадите по наследству.",
    specs: [
      { label: "Материал", value: "100% мериносовая шерсть" },
      { label: "Размеры", value: "XS, S, M, L, XL" },
      { label: "Цвет", value: "Молочный, серый, терракот" },
      { label: "Время изготовления", value: "7–10 дней" },
      { label: "Уход", value: "Ручная стирка 30°C" },
    ],
    reviewsList: [
      { author: "Ольга М.", rating: 5, text: "Невероятно мягкий и тёплый! Носить одно удовольствие, получила много комплиментов.", date: "12 апр 2026" },
      { author: "Катя Р.", rating: 5, text: "Заказала на подарок маме — она в восторге. Качество на высоте, упаковка красивая.", date: "3 мар 2026" },
      { author: "Настя В.", rating: 4, text: "Всё понравилось, немного дольше ждала, но результат стоит того!", date: "18 фев 2026" },
    ],
  },
  {
    id: 2, category: "jewelry", price: 1800, oldPrice: null,
    name: "Серьги серебро «Луна»",
    seller: "Анна Орлова", sellerSince: "2021", sellerSales: 187, rating: 5.0, reviews: 74,
    tag: "Новинка",
    image: IMG.earrings,
    images: [IMG.earrings, IMG.bracelet],
    description: "Луна — вечный символ красоты и загадки. Эти серьги в форме тонкого полумесяца сделаны из серебра 925 пробы с применением старинной техники зернения: каждая точка нанесена вручную под увеличительным стеклом. Весят меньше пяти граммов — вы забудете, что они надеты, но окружающие точно заметят. Идеальный подарок себе или любимой.",
    specs: [
      { label: "Металл", value: "Серебро 925" },
      { label: "Длина", value: "3,5 см" },
      { label: "Вес", value: "4,2 г" },
      { label: "Застёжка", value: "Французская булавка" },
    ],
    reviewsList: [
      { author: "Лиза Т.", rating: 5, text: "Просто шедевр! Очень аккуратная работа, серебро приятного оттенка.", date: "28 апр 2026" },
      { author: "Дарья К.", rating: 5, text: "Дочь в восторге от подарка. Красивая упаковка, быстрая доставка.", date: "10 апр 2026" },
    ],
  },
  {
    id: 3, category: "paintings", price: 12000, oldPrice: 15000,
    name: "Акварель «Утро в лесу»",
    seller: "Игорь Белов", sellerSince: "2017", sellerSales: 94, rating: 4.8, reviews: 42,
    tag: null,
    image: IMG.watercolor,
    images: [IMG.watercolor, IMG.oilpainting],
    description: "Представьте: раннее утро в карельском лесу, запах хвои, тишина и золотой свет, пробивающийся сквозь сосны. Именно это мгновение поймал художник во время пленэра и перенёс на профессиональную бумагу Arches 300 г/м². Акварель живёт — она светится изнутри и меняется в зависимости от освещения комнаты. Работа единственная в своём роде, с сертификатом подлинности.",
    specs: [
      { label: "Техника", value: "Акварель" },
      { label: "Размер", value: "40 × 50 см" },
      { label: "Бумага", value: "Arches 300 г/м²" },
      { label: "Год", value: "2025" },
      { label: "Оформление", value: "Паспарту в комплекте" },
    ],
    reviewsList: [
      { author: "Михаил С.", rating: 5, text: "Повесил в гостиной — теперь это центр притяжения для всех гостей. Работа живая.", date: "5 мая 2026" },
      { author: "Ирина Н.", rating: 4, text: "Красивая картина, цвета чуть отличаются от фото, но в живую ещё лучше!", date: "22 апр 2026" },
    ],
  },
  {
    id: 4, category: "shoes", price: 7500, oldPrice: null,
    name: "Мокасины кожаные ручной работы",
    seller: "Дмитрий Смирнов", sellerSince: "2018", sellerSales: 221, rating: 4.7, reviews: 56,
    tag: null,
    image: IMG.moccasins,
    images: [IMG.moccasins, IMG.coat],
    description: "Обувь, которую шьют руками — это другой уровень. Телячья кожа отборного дубления со временем принимает форму именно вашей стопы и становится только лучше. Каждый шов прошит вощёной нитью вручную — такой не расходится даже через годы носки. Подошва из натурального каучука пружинит и не скользит. Вы скажете этим мокасинам «да» однажды — и будете носить их вечно.",
    specs: [
      { label: "Материал", value: "Натуральная телячья кожа" },
      { label: "Подошва", value: "Натуральный каучук" },
      { label: "Размеры", value: "36–45 (по запросу)" },
      { label: "Цвет", value: "Коньяк, чёрный, тёмно-коричневый" },
      { label: "Изготовление", value: "14–21 день" },
    ],
    reviewsList: [
      { author: "Антон Б.", rating: 5, text: "Ношу второй год, кожа только становится лучше. Отличная работа!", date: "1 мая 2026" },
      { author: "Тимур К.", rating: 4, text: "Очень удобные, немного разнашивались первую неделю. Качество отличное.", date: "14 мар 2026" },
    ],
  },
  {
    id: 5, category: "instruments", price: 18500, oldPrice: 22000,
    name: "Укулеле soprano «Тропики»",
    seller: "Сергей Лебедев", sellerSince: "2020", sellerSales: 58, rating: 4.9, reviews: 31,
    tag: "Скидка",
    image: IMG.ukulele,
    images: [IMG.ukulele, IMG.watercolor],
    description: "Возьмите в руки — и почувствуете разницу сразу. Дека из цельного кедра даёт тот самый живой, чуть медовый звук, который невозможно получить на фабричном инструменте. Обечайки из красного дерева (махагони) добавляют теплоты и глубины. Мастер с 15-летним стажем лично настроил каждую струну перед отправкой. Укулеле для тех, кто хочет играть — а не просто держать инструмент на стене.",
    specs: [
      { label: "Масштаб", value: "Soprano (345 мм)" },
      { label: "Дека", value: "Цельный кедр" },
      { label: "Обечайки", value: "Красное дерево" },
      { label: "Гриф", value: "Орех" },
      { label: "Струны", value: "Aquila Nylgut" },
    ],
    reviewsList: [
      { author: "Света О.", rating: 5, text: "Звук невероятный, мягкий и тёплый. Мастер очень внимательный — подсказал как ухаживать.", date: "9 мая 2026" },
      { author: "Роман Д.", rating: 5, text: "Купил как подарок жене — она теперь играет каждый вечер. Спасибо!", date: "30 апр 2026" },
    ],
  },
  {
    id: 6, category: "jewelry", price: 3200, oldPrice: null,
    name: "Браслет из натуральных камней",
    seller: "Наталья Соколова", sellerSince: "2022", sellerSales: 145, rating: 4.6, reviews: 89,
    tag: null,
    image: IMG.bracelet,
    images: [IMG.bracelet, IMG.earrings],
    description: "Лабрадорит играет синим пламенем при повороте запястья. Лунный камень светится как маленькая луна. Горный хрусталь чист как горный воздух. Три камня, отобранных вручную за игру света и энергетику — нанизаны на прочную хирургическую нить. Браслет, который замечают все. Его одевают утром и снимают только на ночь.",
    specs: [
      { label: "Камни", value: "Лабрадорит, лунный камень, хрусталь" },
      { label: "Фурнитура", value: "Нержавеющая сталь, позолота" },
      { label: "Диаметр бусин", value: "8 мм" },
      { label: "Размер", value: "Универсальный (15–19 см)" },
    ],
    reviewsList: [
      { author: "Вера Л.", rating: 5, text: "Браслет очень красивый, камни переливаются на свету. Буду заказывать ещё!", date: "7 мая 2026" },
      { author: "Полина М.", rating: 4, text: "Хороший браслет, немного туговат для широкого запястья.", date: "25 апр 2026" },
    ],
  },
  {
    id: 7, category: "clothing", price: 5800, oldPrice: 7200,
    name: "Пальто шерстяное «Городской»",
    seller: "Елена Попова", sellerSince: "2016", sellerSales: 408, rating: 4.8, reviews: 63,
    tag: "Скидка",
    image: IMG.coat,
    images: [IMG.coat, IMG.sweater],
    description: "Пальто, в котором не нужно выбирать между стилем и теплом. Итальянская шерсть с кашемиром держит тепло при −15°C и при этом выглядит безупречно на деловой встрече. Прямой крой универсален: работает с джинсами, с платьем, с костюмом. Шёлковая подкладка приятна на коже. Каждый шов обработан вручную — потому что Елена шьёт только так.",
    specs: [
      { label: "Состав", value: "80% шерсть, 20% кашемир" },
      { label: "Подкладка", value: "Натуральный шёлк" },
      { label: "Размеры", value: "XS–XL, возможен пошив на заказ" },
      { label: "Цвет", value: "Графит, кэмел, чёрный" },
      { label: "Уход", value: "Химчистка" },
    ],
    reviewsList: [
      { author: "Юля Ф.", rating: 5, text: "Ношу уже третий сезон. Качество безупречное, форма не теряется.", date: "2 мая 2026" },
      { author: "Марина Д.", rating: 5, text: "Заказала в графите — это просто идеальный цвет. Все спрашивают где купила.", date: "15 апр 2026" },
    ],
  },
  {
    id: 8, category: "paintings", price: 8900, oldPrice: null,
    name: "Маслом «Морской закат»",
    seller: "Владимир Захаров", sellerSince: "2015", sellerSales: 76, rating: 5.0, reviews: 17,
    tag: "Новинка",
    image: IMG.oilpainting,
    images: [IMG.oilpainting, IMG.watercolor],
    description: "Черноморский закат — это не просто красиво, это физически ощутимо. Художник поймал тот редкий момент, когда небо горит золотом, а море становится тёмно-пурпурным. Масло нанесено мастихином — фактура видна на расстоянии, картина живёт объёмом. Льняной холст на сосновом подрамнике, покрытый лаком — простоит сто лет без реставрации. Меняет любой интерьер с первого взгляда.",
    specs: [
      { label: "Техника", value: "Масло, мастихин" },
      { label: "Размер", value: "60 × 80 см" },
      { label: "Холст", value: "Лён, подрамник сосна" },
      { label: "Год", value: "2026" },
      { label: "Покрытие", value: "Лак для масляной живописи" },
    ],
    reviewsList: [
      { author: "Алексей Г.", rating: 5, text: "Живая, энергичная картина. Каждый раз нахожу в ней что-то новое.", date: "11 мая 2026" },
      { author: "Наташа С.", rating: 5, text: "Повесила напротив дивана — первое что вижу каждое утро. Настроение сразу лучше!", date: "8 мая 2026" },
    ],
  },
];

export const CATEGORIES = [
  { id: "all", label: "Всё", icon: "LayoutGrid" },
  { id: "clothing", label: "Одежда", icon: "Shirt" },
  { id: "shoes", label: "Обувь", icon: "Footprints" },
  { id: "jewelry", label: "Украшения", icon: "Gem" },
  { id: "paintings", label: "Картины", icon: "Palette" },
  { id: "instruments", label: "Инструменты", icon: "Music" },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Сначала дешевле" },
  { value: "price_desc", label: "Сначала дороже" },
  { value: "new", label: "Новинки" },
];
