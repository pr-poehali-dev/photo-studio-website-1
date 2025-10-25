import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [activeSection, setActiveSection] = useState('home');

  const portfolioImages = [
    'https://cdn.poehali.dev/projects/a71b4c95-c282-44f4-a183-ded68c7bf58b/files/ac59771a-5f60-4817-a899-b59d54a72e04.jpg',
    'https://cdn.poehali.dev/projects/a71b4c95-c282-44f4-a183-ded68c7bf58b/files/a9ca06e9-77ad-4c36-89ef-3831023abaca.jpg',
    'https://cdn.poehali.dev/projects/a71b4c95-c282-44f4-a183-ded68c7bf58b/files/cfa0f17f-4195-49e8-976a-b5785d15a273.jpg',
  ];

  const services = [
    {
      title: 'Портретная съёмка',
      price: 'от 5 000 ₽',
      duration: '1-2 часа',
      description: 'Индивидуальная или семейная фотосессия в студии или на природе',
      icon: 'User',
    },
    {
      title: 'Свадебная съёмка',
      price: 'от 25 000 ₽',
      duration: 'весь день',
      description: 'Полное сопровождение торжества, от сборов до банкета',
      icon: 'Heart',
    },
    {
      title: 'Предметная съёмка',
      price: 'от 3 000 ₽',
      duration: '1-3 часа',
      description: 'Фотографии товаров для каталогов и интернет-магазинов',
      icon: 'Package',
    },
    {
      title: 'Аренда студии',
      price: 'от 1 500 ₽/час',
      duration: 'от 1 часа',
      description: 'Профессиональная студия с освещением и реквизитом',
      icon: 'Camera',
    },
  ];

  const timeSlots = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  const reviews = [
    {
      name: 'Анна Петрова',
      text: 'Невероятная атмосфера и профессионализм! Фотографии превзошли все ожидания.',
      rating: 5,
    },
    {
      name: 'Дмитрий Соколов',
      text: 'Отличная студия с современным оборудованием. Рекомендую!',
      rating: 5,
    },
    {
      name: 'Мария Иванова',
      text: 'Спасибо за чудесную свадебную фотосессию! Каждый кадр - произведение искусства.',
      rating: 5,
    },
  ];

  const blogPosts = [
    {
      title: 'Как подготовиться к фотосессии',
      date: '15 октября 2024',
      excerpt: 'Советы по выбору образа, макияжу и позированию для идеальных снимков',
      image: portfolioImages[0],
    },
    {
      title: 'Тренды фотографии 2024',
      date: '10 октября 2024',
      excerpt: 'Актуальные стили и приёмы в современной фотографии',
      image: portfolioImages[1],
    },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Studio By Maria Morozova
            </h1>
            <div className="hidden md:flex items-center gap-6">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'portfolio', label: 'Портфолио' },
                { id: 'services', label: 'Услуги' },
                { id: 'about', label: 'О нас' },
                { id: 'prices', label: 'Цены' },
                { id: 'reviews', label: 'Отзывы' },
                { id: 'blog', label: 'Блог' },
                { id: 'contacts', label: 'Контакты' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-foreground/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  Записаться
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading">Онлайн-бронирование</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h3 className="font-semibold mb-3">Выберите дату</h3>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-lg border"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Выберите время</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'default' : 'outline'}
                          onClick={() => setSelectedTime(time)}
                          className="w-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-6 space-y-3">
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      />
                      <input
                        type="tel"
                        placeholder="Телефон"
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      />
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Подтвердить бронирование
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-accent text-accent-foreground">Креативная фотостудия</Badge>
              <h2 className="text-6xl md:text-7xl font-bold font-heading leading-tight">
                Создаём{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  искусство
                </span>{' '}
                из мгновений
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Профессиональная фотосъёмка и аренда студии с креативным подходом к каждому кадру
              </p>
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                      Записаться на съёмку
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('portfolio')} className="text-lg px-8">
                  Портфолио
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
              <img
                src={portfolioImages[0]}
                alt="Hero"
                className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl font-bold font-heading mb-4">Портфолио</h2>
            <p className="text-xl text-muted-foreground">Наши лучшие работы</p>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="portrait">Портреты</TabsTrigger>
              <TabsTrigger value="wedding">Свадьбы</TabsTrigger>
              <TabsTrigger value="product">Предметка</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="grid md:grid-cols-3 gap-6">
              {portfolioImages.map((img, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl cursor-pointer animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <img
                    src={img}
                    alt={`Portfolio ${idx + 1}`}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-semibold mb-2">Проект {idx + 1}</h3>
                      <p className="text-sm">Портретная съёмка</p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="portrait" className="grid md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-2xl">
                <img src={portfolioImages[0]} alt="Portrait" className="w-full h-96 object-cover" />
              </div>
            </TabsContent>
            <TabsContent value="wedding" className="grid md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-2xl">
                <img src={portfolioImages[2]} alt="Wedding" className="w-full h-96 object-cover" />
              </div>
            </TabsContent>
            <TabsContent value="product" className="grid md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-2xl">
                <img src={portfolioImages[1]} alt="Product" className="w-full h-96 object-cover" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold font-heading mb-4">Услуги</h2>
            <p className="text-xl text-muted-foreground">Что мы предлагаем</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name={service.icon as any} className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold font-heading">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <span className="text-sm text-muted-foreground">{service.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img
              src={portfolioImages[1]}
              alt="Studio"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover animate-scale-in"
            />
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl font-bold font-heading">О студии</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Studio By Maria Morozova — это креативное пространство, где рождаются уникальные визуальные истории. 
                Мы создали студию мечты для фотографов и моделей с профессиональным оборудованием и 
                нестандартным подходом к каждой съёмке.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                  <div className="text-sm text-muted-foreground">съёмок</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">довольных клиентов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="prices" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold font-heading mb-4">Цены</h2>
            <p className="text-xl text-muted-foreground">Прозрачные тарифы без скрытых платежей</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Базовый', price: '5 000', features: ['1 час съёмки', '20 обработанных фото', 'Студия в подарок', 'Онлайн-галерея'] },
              { name: 'Стандарт', price: '12 000', features: ['3 часа съёмки', '50 обработанных фото', 'Студия в подарок', 'Онлайн-галерея', 'Смена образов', '2 локации'], popular: true },
              { name: 'Премиум', price: '25 000', features: ['Весь день', '100+ обработанных фото', 'Студия в подарок', 'Онлайн-галерея', 'Визажист', 'Неограниченно образов'] },
            ].map((plan, idx) => (
              <Card key={idx} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : ''} animate-scale-in`} style={{ animationDelay: `${idx * 0.1}s` }}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-6">Популярный</Badge>
                  </div>
                )}
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-heading mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground">₽</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Icon name="Check" className="text-primary" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                        Выбрать пакет
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold font-heading mb-4">Отзывы</h2>
            <p className="text-xl text-muted-foreground">Что говорят наши клиенты</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-primary fill-primary" size={20} />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{review.name}</div>
                      <div className="text-sm text-muted-foreground">Клиент студии</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold font-heading mb-4">Блог</h2>
            <p className="text-xl text-muted-foreground">Полезные статьи о фотографии</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <CardContent className="p-6 space-y-3">
                  <div className="text-sm text-muted-foreground">{post.date}</div>
                  <h3 className="text-2xl font-bold font-heading group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Читать далее →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold font-heading mb-4">Контакты</h2>
            <p className="text-xl text-muted-foreground">Свяжитесь с нами</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Адрес</h3>
                  <p className="text-muted-foreground">г. Москва, Шелихова 9к1</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Телефон</h3>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">info@lensstudio.ru</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Режим работы</h3>
                  <p className="text-muted-foreground">Ежедневно с 10:00 до 22:00</p>
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold font-heading">Напишите нам</h3>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                />
                <textarea
                  placeholder="Сообщение"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                ></textarea>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Отправить
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Studio By Maria Morozova
              </h3>
              <p className="text-muted-foreground">Создаём искусство из мгновений</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Youtube" size={20} />
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
            © 2024 Studio By Maria Morozova. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;