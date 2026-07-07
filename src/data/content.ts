// Весь текст приглашения собран здесь, чтобы менять формулировки
// и ссылки (карта, RSVP) без правки вёрстки.

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export type ScheduleItem = {
  time: string;
  label: string;
};

export type DressCodeColor = {
  name: string;
  hex: string;
};

// TODO: заменить на реальную ссылку на отель-клуб «Раздолье» на карте.
export const mapUrl =
  "https://yandex.ru/maps/?text=Отель-клуб Раздолье Екатеринбург";

export type Photo = {
  src: string;
  alt: string;
};

export const photos = {
  hero: {
    src: asset('/photos/couple-hero.jpg'),
    alt: 'Пара на природе в тёплом вечернем свете',
  },
  collage: [
    { src: asset('/photos/detail-rings.jpg'), alt: 'Обручальные кольца на льне' },
    { src: asset('/photos/nature-garden.jpg'), alt: 'Сад в тёплом вечернем свете' },
    {
      src: asset('/photos/table-setting.jpg'),
      alt: 'Банкетный стол с натуральным декором',
    },
  ],
  venue: {
    src: asset('/photos/venue-countryside.jpg'),
    alt: 'Загородный клуб в окружении сада',
  },
  divider: {
    src: asset('/photos/evening-atmosphere.jpg'),
    alt: 'Тёплый вечерний пейзаж за городом',
  },
  schedule: {
    src: asset('/photos/nature-garden.jpg'),
    alt: 'Сад в тёплом вечернем свете',
  },
  dressCode: [
    {
      src: asset('/illustrations/outfit-warm-palette.png'),
      alt: 'Иллюстрация тёплой природной палитры',
    },
    {
      src: asset('/illustrations/table-natural-decor.png'),
      alt: 'Иллюстрация банкетного стола с натуральным декором',
    },
  ],
  wishes: {
    src: asset('/illustrations/couple-garden-walk.png'),
    alt: 'Иллюстрация пары на прогулке по садовой аллее',
  },
} as const;

export const hero = {
  eyebrow: "Праздничный вечер",
  subtitle: "в честь нашего бракосочетания",
  names: ["Ярослав", "Анастасия"],
  date: "19 сентября 2026",
  meeting: "Встреча гостей в 16:30",
  greeting: ["Приглашаем вас на праздник в честь нашего бракосочетания"],
};

export const venue = {
  title: "Место проведения",
  name: "Отель-клуб «Раздолье»",
  description:
    "Праздничный вечер пройдёт за городом, в спокойной и уютной атмосфере.",
  mapButtonLabel: "Открыть на карте",
};

export const schedule: { title: string; items: ScheduleItem[] } = {
  title: "Программа вечера",
  items: [
    { time: "16:30", label: "встреча гостей" },
    { time: "17:00", label: "начало праздничного вечера" },
    { time: "17:30", label: "поздравления и подарки" },
    { time: "18:00", label: "банкет" },
    { time: "22:30", label: "торт" },
    { time: "23:00", label: "завершение вечера" },
  ],
};

export const transfer = {
  title: "Трансфер",
  description:
    "Для гостей будет организован автобус из Екатеринбурга и обратно.",
  departureTime: "15:00",
  meetingPoint: "гаражный комплекс «Парков»",
  address: "г. Екатеринбург, ул. Восточная, 51",
  note: "Пожалуйста, сообщите при подтверждении, поедете ли вы на автобусе или доберётесь самостоятельно.",
};

export const dressCode: {
  title: string;
  intro: string;
  palette: DressCodeColor[];
  avoidNote: string;
} = {
  title: "Дресс-код по желанию",
  intro:
    "Будем рады, если в образах вы поддержите тёплую природную палитру вечера:",
  palette: [
    { name: "бежевый", hex: "#D9CBB4" },
    { name: "шоколадный", hex: "#5B3A29" },
    { name: "шалфейный", hex: "#9CAA8C" },
    { name: "оливковый", hex: "#7C7B4A" },
    { name: "пыльно-розовый", hex: "#D8B4AC" },
    { name: "терракотовый", hex: "#B5654B" },
    { name: "винный", hex: "#5C3A3A" },
  ],
  avoidNote:
    "Просим по возможности избегать холодных синих оттенков, полностью чёрных образов, слишком ярких цветов, активных принтов, глиттера и пайеток.",
};

export const wishes = {
  title: "Пожелания",
  paragraphs: [
    "Пожалуйста, не дарите цветы.",
    "Мы будем благодарны, если вместо букетов вы сохраните это внимание для тёплых слов.",
    "Если вы захотите сделать подарок, будем рады вкладу в наши семейные планы.",
  ],
};

export const rsvp = {
  title: "Подтвердите присутствие",
  deadline: "30 августа",
  checklist: [
    "будете ли вы на праздничном вечере;",
    "поедете ли вы на автобусе;",
    "или доберётесь самостоятельно.",
  ],
  buttonLabel: "Подтвердить присутствие",
  form: {
    title: "Подтверждение присутствия",
    submitLabel: "Отправить",
    submittingLabel: "Отправляем…",
    successTitle: "Спасибо!",
    successMessageAttending:
      "Мы получили ваш ответ и будем рады встретиться с вами на праздничном вечере.",
    successMessageDeclined:
      "Мы получили ваш ответ. Нам очень жаль, что вы не сможете быть с нами, но мы ценим, что вы сообщили.",
    fields: {
      fullName: "Имя и фамилия",
      attending: "Будете ли вы на праздничном вечере?",
      transfer: "Как планируете добраться?",
      phone: "Телефон для связи",
      comment: "Комментарий",
    },
    placeholders: {
      fullName: "Иван Иванов",
      phone: "+7 (999) 000-00-00",
      comment: "Аллергии, пожелания или уточнения",
    },
    attendingOptions: [
      { value: "yes" as const, label: "Да, буду на праздничном вечере" },
      { value: "no" as const, label: "К сожалению, не смогу прийти" },
    ],
    transferOptions: [
      { value: "bus" as const, label: "Поеду на автобусе из Екатеринбурга" },
      { value: "self" as const, label: "Доберусь самостоятельно" },
    ],
    errors: {
      fullName: "Пожалуйста, укажите имя и фамилию",
      fullNameTooShort: "Имя слишком короткое",
      fullNameTooLong: "Имя не должно превышать 100 символов",
      fullNameInvalid: "Используйте только буквы, пробелы и дефис",
      attending: "Пожалуйста, выберите, сможете ли вы прийти",
      transfer: "Пожалуйста, укажите, как планируете добраться",
      phoneInvalid: "Проверьте формат телефона",
      phoneTooLong: "Телефон не должен превышать 30 символов",
      commentTooLong: "Комментарий не должен превышать 500 символов",
      submit: "Не удалось отправить ответ. Попробуйте ещё раз чуть позже.",
    },
  },
};
