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

export const PRODUCTS: Product[] = [
  {
    id: 1, category: "clothing", price: 4200, oldPrice: 5500,
    name: "Свитер ручной вязки «Зима»",
    seller: "Маша Кузнецова", sellerSince: "2019", sellerSales: 312, rating: 4.9, reviews: 128,
    tag: "Хит продаж",
    image: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/163e4b8b-0b74-49be-a5b7-b28aeeb582ef.jpg",
    images: [
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/163e4b8b-0b74-49be-a5b7-b28aeeb582ef.jpg",
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/1bb3829b-49f0-4473-b5de-8fcaa21af363.jpg",
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/a934ea07-4a5f-4d82-9371-72ce316b1ab2.jpg",
    ],
    description: "Тёплый свитер из 100% мериносовой шерсти, связанный вручную. Уникальный узор «скандинавская снежинка» — каждое изделие создаётся индивидуально. Подходит для повседневной носки и путешествий. Не требует специального ухода — достаточно бережной стирки вручную или в режиме «деликатный».",
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
    image: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/1bb3829b-49f0-4473-b5de-8fcaa21af363.jpg",
    images: [
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/1bb3829b-49f0-4473-b5de-8fcaa21af363.jpg",
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/163e4b8b-0b74-49be-a5b7-b28aeeb582ef.jpg",
    ],
    description: "Изящные серьги в форме полумесяца из стерлингового серебра 925 пробы. Ручная работа с использованием техники зернения. Лёгкие и удобные для ежедневной носки. Поставляются в красивой подарочной коробочке.",
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
    image: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/a934ea07-4a5f-4d82-9371-72ce316b1ab2.jpg",
    images: [
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/a934ea07-4a5f-4d82-9371-72ce316b1ab2.jpg",
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/163e4b8b-0b74-49be-a5b7-b28aeeb582ef.jpg",
    ],
    description: "Оригинальная акварельная картина, написанная с натуры во время пленэра в Карелии. Передаёт мягкий утренний свет, пробивающийся сквозь кроны деревьев. Работа выполнена на профессиональной бумаге 300 г/м² Arches. Поставляется с сертификатом подлинности и паспарту.",
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
    image: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/163e4b8b-0b74-49be-a5b7-b28aeeb582ef.jpg",
    images: [
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/163e4b8b-0b74-49be-a5b7-b28aeeb582ef.jpg",
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/a934ea07-4a5f-4d82-9371-72ce316b1ab2.jpg",
    ],
    description: "Классические мокасины ручной работы из натуральной телячьей кожи. Подошва из натурального каучука, удобная колодка для длительной носки. Каждая пара шьётся индивидуально под ваш размер. Идеальны для города и загородных прогулок.",
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
    image: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/a934ea07-4a5f-4d82-9371-72ce316b1ab2.jpg",
    images: [
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/a934ea07-4a5f-4d82-9371-72ce316b1ab2.jpg",
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/1bb3829b-49f0-4473-b5de-8fcaa21af363.jpg",
    ],
    description: "Ручная работа мастера с 15-летним стажем. Дека из цельного кедра, обечайки и задняя дека — красное дерево (махагони). Ладовое покрытие из перламутра. Инструмент прошёл профессиональную настройку, поставляется с чехлом и набором запасных струн.",
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
    image: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/1bb3829b-49f0-4473-b5de-8fcaa21af363.jpg",
    images: [
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/1bb3829b-49f0-4473-b5de-8fcaa21af363.jpg",
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/a934ea07-4a5f-4d82-9371-72ce316b1ab2.jpg",
    ],
    description: "Браслет из натуральных полудрагоценных камней: лабрадорит, лунный камень и горный хрусталь. Нанизаны на прочную эластичную нить. Каждый камень отобран вручную за красоту и качество. Размер универсальный, подходит для запястья 15–19 см.",
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
    image: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/163e4b8b-0b74-49be-a5b7-b28aeeb582ef.jpg",
    images: [
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/163e4b8b-0b74-49be-a5b7-b28aeeb582ef.jpg",
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/1bb3829b-49f0-4473-b5de-8fcaa21af363.jpg",
    ],
    description: "Лаконичное пальто прямого кроя из итальянской шерсти с кашемиром. Пошито вручную с тщательной обработкой каждого шва. Подкладка из натурального шёлка. Идеально для делового и повседневного образа. Возможен пошив по индивидуальным меркам.",
    specs: [
      { label: "Состав", value: "80% шерсть, 20% кашемир" },
      { label: "Подкладка", value: "Натуральный шёлк" },
      { label: "Размеры", value: "XS–XL, возможен пошив на заказ" },
      { label: "Цвет", value: "Графит, кэмел, чёрный" },
      { label: "Уход", value: "Химчистка" },
    ],
    reviewsList: [
      { author: "Юля Ф.", rating: 5, text: "Ношу уже третий сезон. Качество безупречное, форма не теряется.", date: "2 мая 2026" },
    ],
  },
  {
    id: 8, category: "paintings", price: 8900, oldPrice: null,
    name: "Маслом «Морской закат»",
    seller: "Владимир Захаров", sellerSince: "2015", sellerSales: 76, rating: 5.0, reviews: 17,
    tag: "Новинка",
    image: "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/a934ea07-4a5f-4d82-9371-72ce316b1ab2.jpg",
    images: [
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/a934ea07-4a5f-4d82-9371-72ce316b1ab2.jpg",
      "https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/163e4b8b-0b74-49be-a5b7-b28aeeb582ef.jpg",
    ],
    description: "Картина маслом, написанная на холсте во время поездки на Чёрное море. Насыщенные закатные тона — от золотого до глубокого пурпура. Работа выполнена на льняном холсте на подрамнике, покрыта лаком для долговечности. Готова к подвеске без дополнительного обрамления.",
    specs: [
      { label: "Техника", value: "Масло на холсте" },
      { label: "Размер", value: "60 × 80 см" },
      { label: "Холст", value: "Лён, подрамник сосна" },
      { label: "Год", value: "2026" },
      { label: "Покрытие", value: "Лак для масляной живописи" },
    ],
    reviewsList: [
      { author: "Алексей Г.", rating: 5, text: "Живая, энергичная картина. Каждый раз нахожу в ней что-то новое.", date: "11 мая 2026" },
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
