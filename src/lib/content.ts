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
      title: 'Портретная съёмка',
      price: 'от 5 000 ₽',
      duration: '1-2 часа',
      description: 'Индивидуальная или семейная фотосессия в студии или на природе',
      icon: 'User',
    },
    {
      id: '2',
      title: 'Свадебная съёмка',
      price: 'от 25 000 ₽',
      duration: 'весь день',
      description: 'Полное сопровождение торжества, от сборов до банкета',
      icon: 'Heart',
    },
    {
      id: '3',
      title: 'Предметная съёмка',
      price: 'от 3 000 ₽',
      duration: '1-3 часа',
      description: 'Фотографии товаров для каталогов и интернет-магазинов',
      icon: 'Package',
    },
    {
      id: '4',
      title: 'Аренда студии',
      price: 'от 1 500 ₽/час',
      duration: 'от 1 часа',
      description: 'Профессиональная студия с освещением и реквизитом',
      icon: 'Camera',
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
    address: 'г. Москва, Шелихова 9к1',
    phone: '+7 (980) 865-42-80',
    email: 'info@fstudio.ru',
    hours: 'Ежедневно с 10:00 до 22:00',
  },
  hero: {
    badge: 'Креативная фотостудия',
    title: 'Создаём искусство из мгновений',
    subtitle: 'Профессиональная фотосъёмка и аренда студии с креативным подходом к каждому кадру',
  },
  about: {
    description: 'F.STUDIO by MARIA MOROZOVA — это креативное пространство, где рождаются уникальные визуальные истории. Мы создали студию мечты для фотографов и моделей с профессиональным оборудованием и нестандартным подходом к каждой съёмке.',
    stats: {
      years: '5+',
      shoots: '1000+',
      satisfaction: '98%',
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
