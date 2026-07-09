// Весь текст приглашения собран здесь, чтобы менять формулировки
// и ссылки (карта, RSVP) без правки вёрстки.

import { responsiveImage, type ResponsiveImageData } from "../lib/images";

export type ScheduleItem = {
  time: string;
  label: string;
};

export type DressCodeColor = {
  hex: string;
};

export type DressCodeImage = ResponsiveImageData & {
  caption?: string;
};

export type Photo = ResponsiveImageData;

// TODO: заменить на реальную ссылку на отель-клуб «Раздолье» на карте.
export const mapUrl =
  "https://yandex.ru/maps/?text=Отель-клуб Раздолье Екатеринбург";

const contentImageSizes = "(max-width: 640px) 90vw, 640px";
const dressCodeImageSizes = "(max-width: 640px) 20vw, 96px";

export const photos = {
  hero: responsiveImage(
    "illustrations/couple-garden-walk",
    "Иллюстрация пары на прогулке по садовой аллее",
    contentImageSizes,
  ),
  collage: [
    responsiveImage(
      "photos/detail-rings",
      "Обручальные кольца на льне",
      contentImageSizes,
    ),
    responsiveImage(
      "photos/nature-garden",
      "Сад в тёплом вечернем свете",
      contentImageSizes,
    ),
    responsiveImage(
      "photos/table-setting",
      "Банкетный стол с натуральным декором",
      contentImageSizes,
    ),
  ],
  venue: responsiveImage(
    "photos/venue-countryside",
    "Загородный клуб в окружении сада",
    contentImageSizes,
  ),
  divider: responsiveImage(
    "photos/evening-atmosphere",
    "Тёплый вечерний пейзаж за городом",
    "100vw",
  ),
  schedule: responsiveImage(
    "photos/nature-garden",
    "Сад в тёплом вечернем свете",
    contentImageSizes,
  ),
  wishes: responsiveImage(
    "illustrations/couple-garden-walk",
    "Иллюстрация пары на прогулке по садовой аллее",
    contentImageSizes,
  ),
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
    { time: "17:30", label: "поздравления" },
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
  baseName: string,
  alt: string,
  caption?: string,
): DressCodeImage => ({
  ...responsiveImage(`examples/${baseName}`, alt, dressCodeImageSizes),
  ...(caption ? { caption } : {}),
});

export const dressCode: {
  title: string;
  intro: string;
  palette: DressCodeColor[];
  references: { label: string; items: DressCodeImage[] };
  textures: { label: string; items: DressCodeImage[] };
  stopList: { label: string; items: DressCodeImage[]; note: string };
} = {
  title: "Дресс-код",
  intro:
    "Будем рады, если в образах вы поддержите тёплую природную палитру вечера.",
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
          `woman_example_${i + 1}`,
          `Пример женского образа ${i + 1}`,
        ),
      ),
      ...Array.from({ length: 5 }, (_, i) =>
        dressCodeImage(
          `man_example_${i + 1}`,
          `Пример мужского образа ${i + 1}`,
        ),
      ),
    ],
  },
  textures: {
    label: "Текстуры",
    items: Array.from({ length: 4 }, (_, i) =>
      dressCodeImage(`texture_${i + 1}`, `Пример текстуры ${i + 1}`),
    ),
  },
  stopList: {
    label: "Стоп-лист",
    items: [
      dressCodeImage(
        "stop_1",
        "Синий и холодные тона",
        "синий и холодные тона",
      ),
      dressCodeImage("stop_2", "Чёрный", "чёрный (можно в деталях)"),
      dressCodeImage("stop_3", "Очень яркие оттенки", "очень яркие оттенки"),
      dressCodeImage("stop_4", "Принты", "принты (кроме классики)"),
      dressCodeImage("stop_5", "Глиттер и пайетки", "глиттер и пайетки"),
    ],
    note:
      "Просим избегать синий и холодные тона, чёрный (можно в деталях), очень яркие оттенки, принты (кроме классики), глиттер и пайетки.",
  },
};

export const wishes = {
  title: "Пожелания",
  paragraphs: [
    "Пожалуйста, не дарите цветы.",
    "Мы будем благодарны, если вместо букетов вы сохраните это внимание для тёплых слов.",
    "Если вы захотите сделать подарок, будем рады вкладу в наши семейные планы в денежном эквиваленте.",
  ],
};

export const rsvp = {
  title: "Подтвердите присутствие до 30 августа",
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
    hints: {
      requiredLegend: "обязательное поле",
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
