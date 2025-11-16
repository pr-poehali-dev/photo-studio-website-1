export interface Service {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  icon: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface PortfolioImage {
  id: string;
  url: string;
  category: 'portrait' | 'wedding' | 'product' | 'all';
  title: string;
}

export interface SiteContent {
  services: Service[];
  reviews: Review[];
  blogPosts: BlogPost[];
  portfolioImages: PortfolioImage[];
  contacts: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  about: {
    description: string;
    stats: {
      years: string;
      shoots: string;
      satisfaction: string;
    };
  };
}

const STORAGE_KEY = 'fstudio_content';

export const defaultContent: SiteContent = {
  services: [
    {
      id: '1',
      title: 'Выездные фотосессии',
      price: 'от 5 000 ₽',
      duration: '1-3 часа',
      description: 'Уникальные кадры на природе, в городе или в любимых местах. Создам атмосферу и поймаю ваши искренние эмоции',
      icon: 'MapPin',
    },
    {
      id: '2',
      title: 'Фотосессии в студии',
      price: 'от 4 000 ₽',
      duration: '1-2 часа',
      description: 'Профессиональный свет, уютная атмосфера и полный контроль над результатом. Идеально для портретов и креативных образов',
      icon: 'Camera',
    },
    {
      id: '3',
      title: 'Обработка фотографий',
      price: 'от 100 ₽/фото',
      duration: '3-7 дней',
      description: 'Профессиональная ретушь, цветокоррекция и художественная обработка. Превращу хорошие снимки в шедевры',
      icon: 'Wand2',
    },
    {
      id: '4',
      title: 'Фото на документы',
      price: 'от 500 ₽',
      duration: '15 минут',
      description: 'Быстро, качественно и по всем стандартам. Электронный вариант сразу + печать',
      icon: 'FileText',
    },
    {
      id: '5',
      title: 'Свадьбы и особенные события',
      price: 'от 25 000 ₽',
      duration: 'полный день',
      description: 'Запечатлю каждую эмоцию вашего важного дня. От сборов до последнего танца — ни один момент не останется незамеченным',
      icon: 'Heart',
    },
    {
      id: '6',
      title: 'Детские фотосессии',
      price: 'от 3 500 ₽',
      duration: '1-2 часа',
      description: 'Нежные и искренние кадры вашего малыша. Умею находить подход к детям и ловить самые трогательные моменты',
      icon: 'Baby',
    },
    {
      id: '7',
      title: 'Дни рождения и праздники',
      price: 'от 6 000 ₽',
      duration: '2-4 часа',
      description: 'Живые эмоции, смех, радость — сохраню атмосферу вашего праздника в ярких репортажных кадрах',
      icon: 'PartyPopper',
    },
    {
      id: '8',
      title: 'Фотограф на мероприятия',
      price: 'от 8 000 ₽',
      duration: '2-6 часов',
      description: 'Корпоративы, выставки, детские сады, концерты — профессиональная репортажная съёмка любых событий',
      icon: 'Users',
    },
  ],
  reviews: [
    {
      id: '1',
      name: 'Анна Петрова',
      text: 'Невероятная атмосфера и профессионализм! Фотографии превзошли все ожидания.',
      rating: 5,
    },
    {
      id: '2',
      name: 'Дмитрий Соколов',
      text: 'Отличная студия с современным оборудованием. Рекомендую!',
      rating: 5,
    },
    {
      id: '3',
      name: 'Мария Иванова',
      text: 'Спасибо за чудесную свадебную фотосессию! Каждый кадр - произведение искусства.',
      rating: 5,
    },
  ],
  blogPosts: [
    {
      id: '1',
      title: 'Как подготовиться к фотосессии',
      date: '15 октября 2025',
      excerpt: 'Советы по выбору образа, макияжу и позированию для идеальных снимков',
      image: 'https://cdn.poehali.dev/projects/a71b4c95-c282-44f4-a183-ded68c7bf58b/files/ac59771a-5f60-4817-a899-b59d54a72e04.jpg',
    },
    {
      id: '2',
      title: 'Тренды фотографии 2025',
      date: '10 октября 2025',
      excerpt: 'Актуальные стили и приёмы в современной фотографии',
      image: 'https://cdn.poehali.dev/projects/a71b4c95-c282-44f4-a183-ded68c7bf58b/files/a9ca06e9-77ad-4c36-89ef-3831023abaca.jpg',
    },
  ],
  portfolioImages: [
    {
      id: '1',
      url: 'https://cdn.poehali.dev/projects/a71b4c95-c282-44f4-a183-ded68c7bf58b/files/ac59771a-5f60-4817-a899-b59d54a72e04.jpg',
      category: 'portrait',
      title: 'Портретная съёмка',
    },
    {
      id: '2',
      url: 'https://cdn.poehali.dev/projects/a71b4c95-c282-44f4-a183-ded68c7bf58b/files/a9ca06e9-77ad-4c36-89ef-3831023abaca.jpg',
      category: 'product',
      title: 'Студия',
    },
    {
      id: '3',
      url: 'https://cdn.poehali.dev/projects/a71b4c95-c282-44f4-a183-ded68c7bf58b/files/cfa0f17f-4195-49e8-976a-b5785d15a273.jpg',
      category: 'wedding',
      title: 'Свадебная фотосессия',
    },
  ],
  contacts: {
    address: 'г. Москва (выезд в любую точку города)',
    phone: '+7 (980) 865-42-80',
    email: 'maria.morozova.photo@gmail.com',
    hours: 'Ежедневно с 9:00 до 21:00',
  },
  hero: {
    badge: '✨ Фотограф Мария Морозова',
    title: 'Превращаю мгновения в искусство',
    subtitle: 'Ловлю эмоции, создаю истории и дарю фотографии, которые вы будете пересматривать снова и снова. Каждый кадр — это часть вашей жизни, запечатлённая с душой',
  },
  about: {
    description: 'Привет! Я Мария Морозова — фотограф с душой художника и сердцем перфекциониста. Для меня фотография — это не просто нажатие на кнопку, это возможность остановить время и подарить вам частичку волшебства. Я работаю со светом, эмоциями и атмосферой, чтобы каждый снимок рассказывал вашу уникальную историю. Доверьтесь мне — и получите не просто фотографии, а воспоминания, которые будут греть душу годами.',
    stats: {
      years: '7+',
      shoots: '2000+',
      satisfaction: '100%',
    },
  },
};

export const loadContent = (): SiteContent => {
  if (typeof window === 'undefined') return defaultContent;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultContent;
    }
  }
  return defaultContent;
};

export const saveContent = (content: SiteContent): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
};