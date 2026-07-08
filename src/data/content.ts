// Весь текст приглашения собран здесь, чтобы менять формулировки
// и ссылки (карта, RSVP) без правки вёрстки.

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export type ScheduleItem = {
  time: string;
  label: string;
};

export type DressCodeColor = {
  hex: string;
};

export type DressCodeImage = {
  src: string;
  alt: string;
  caption?: string;
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
    src: asset("/illustrations/couple-garden-walk.png"),
    alt: "Иллюстрация пары на прогулке по садовой аллее",
  },
  collage: [
    {
      src: asset("/photos/detail-rings.jpg"),
      alt: "Обручальные кольца на льне",
    },
    {
      src: asset("/photos/nature-garden.jpg"),
      alt: "Сад в тёплом вечернем свете",
    },
    {
      src: asset("/photos/table-setting.jpg"),
      alt: "Банкетный стол с натуральным декором",
    },
  ],
  venue: {
    src: asset("/photos/venue-countryside.jpg"),
    alt: "Загородный клуб в окружении сада",
  },
  divider: {
    src: asset("/photos/evening-atmosphere.jpg"),
    alt: "Тёплый вечерний пейзаж за городом",
  },
  schedule: {
    src: asset("/photos/nature-garden.jpg"),
    alt: "Сад в тёплом вечернем свете",
  },
  wishes: {
    src: asset("/illustrations/couple-garden-walk.png"),
    alt: "Иллюстрация пары на прогулке по садовой аллее",
  },
} as const;

export const hero = {
  eyebrow: "Праздничный вечер",
  subtitle: "в честь нашего бракосочетания",
  names: ["Ярослав", "Анастасия"],
  date: "19 сентября 2026",
  meeting: "Встреча гостей в 16:30",
  greeting: ["Приглашаем вас на праздник в честь нашего бракосочетания"],
};

export const venue = {
  title: "Место проведения",
  name: "Отель-клуб «Раздолье»",
  description:
    "Праздничный вечер пройдёт за городом, в спокойной и уютной атмосфере.",
  mapButtonLabel: "Открыть на карте",
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
    "Для гостей будет организован автобус из Екатеринбурга и обратно.",
  departureTime: "15:00",
  meetingPoint: "гаражный комплекс «Парков»",
  address: "г. Екатеринбург, ул. Восточная, 51",
  note: "Пожалуйста, сообщите при подтверждении, поедете ли вы на автобусе или доберётесь самостоятельно.",
};

const dressCodeImage = (
  filename: string,
  alt: string,
  caption?: string,
): DressCodeImage => ({
  src: asset(`/examples/${filename}`),
  alt,
  ...(caption ? { caption } : {}),
});

export const dressCode: {
  title: string;
  intro: string;
  palette: DressCodeColor[];
  references: { label: string; items: DressCodeImage[] };
  textures: { label: string; items: DressCodeImage[] };
  stopList: { label: string; items: DressCodeImage[] };
} = {
  title: "Дресс-код",
  intro:
    "Будем рады, если в образах вы поддержите тёплую природную палитру вечера:",
  palette: [
    { hex: "#5B3D36" },
    { hex: "#ECD4C4" },
    { hex: "#A95E52" },
    { hex: "#770002" },
    { hex: "#6A6641" },
    { hex: "#B6B0AF" },
    { hex: "#BFC186" },
    { hex: "#E7B3B2" },
    { hex: "#C6916F" },
  ],
  references: {
    label: "Референсы",
    items: [
      ...Array.from({ length: 5 }, (_, i) =>
        dressCodeImage(
          `woman_example_${i + 1}.png`,
          `Пример женского образа ${i + 1}`,
        ),
      ),
      ...Array.from({ length: 5 }, (_, i) =>
        dressCodeImage(
          `man_example_${i + 1}.png`,
          `Пример мужского образа ${i + 1}`,
        ),
      ),
    ],
  },
  textures: {
    label: "Текстуры",
    items: Array.from({ length: 4 }, (_, i) =>
      dressCodeImage(`texture_${i + 1}.png`, `Пример текстуры ${i + 1}`),
    ),
  },
  stopList: {
    label: "Стоп-лист",
    items: [
      dressCodeImage(
        "stop_1.png",
        "Синий и холодные тона",
        "синий и холодные тона",
      ),
      dressCodeImage("stop_2.png", "Чёрный", "чёрный (можно в деталях)"),
      dressCodeImage(
        "stop_3.png",
        "Очень яркие оттенки",
        "очень яркие оттенки",
      ),
      dressCodeImage("stop_4.png", "Принты", "принты (кроме классики)"),
      dressCodeImage("stop_5.png", "Глиттер и пайетки", "глиттер и пайетки"),
    ],
  },
};

export const wishes = {
  title: "Пожелания",
  paragraphs: [
    "Пожалуйста, не дарите цветы.",
    "Мы будем благодарны, если вместо букетов вы сохраните это внимание для тёплых слов.",
    "Если вы захотите сделать подарок, будем рады вкладу в наши семейные планы.",
  ],
};

export const rsvp = {
  title: "Подтвердите присутствие",
  deadline: "30 августа",
  checklist: [
    "будете ли вы на праздничном вечере;",
    "поедете ли вы на автобусе;",
    "или доберётесь самостоятельно.",
  ],
  buttonLabel: "Подтвердить присутствие",
  form: {
    title: "Подтверждение присутствия",
    submitLabel: "Отправить",
    submittingLabel: "Отправляем…",
    successTitle: "Спасибо!",
    successMessageAttending:
      "Мы получили ваш ответ и будем рады встретиться с вами на праздничном вечере.",
    successMessageDeclined:
      "Мы получили ваш ответ. Нам очень жаль, что вы не сможете быть с нами, но мы ценим, что вы сообщили.",
    fields: {
      fullName: "Имя и фамилия",
      attending: "Будете ли вы на праздничном вечере?",
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
      { value: "bus" as const, label: "Поеду на автобусе из Екатеринбурга" },
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
