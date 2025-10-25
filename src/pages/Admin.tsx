import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { loadContent, saveContent, defaultContent, SiteContent, Service, Review, BlogPost, PortfolioImage } from '@/lib/content';
import { toast } from 'sonner';

const Admin = () => {
  const [content, setContent] = useState<SiteContent>(loadContent());
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingImage, setEditingImage] = useState<PortfolioImage | null>(null);

  const handleSave = () => {
    saveContent(content);
    toast.success('Изменения сохранены!');
  };

  const handleReset = () => {
    if (confirm('Сбросить все изменения к начальным настройкам?')) {
      setContent(defaultContent);
      saveContent(defaultContent);
      toast.success('Настройки сброшены');
    }
  };

  const updateServices = (services: Service[]) => {
    setContent({ ...content, services });
  };

  const updateReviews = (reviews: Review[]) => {
    setContent({ ...content, reviews });
  };

  const updateBlogPosts = (blogPosts: BlogPost[]) => {
    setContent({ ...content, blogPosts });
  };

  const updatePortfolio = (portfolioImages: PortfolioImage[]) => {
    setContent({ ...content, portfolioImages });
  };

  const deleteService = (id: string) => {
    updateServices(content.services.filter(s => s.id !== id));
    toast.success('Услуга удалена');
  };

  const deleteReview = (id: string) => {
    updateReviews(content.reviews.filter(r => r.id !== id));
    toast.success('Отзыв удалён');
  };

  const deletePost = (id: string) => {
    updateBlogPosts(content.blogPosts.filter(p => p.id !== id));
    toast.success('Статья удалена');
  };

  const deleteImage = (id: string) => {
    updatePortfolio(content.portfolioImages.filter(i => i.id !== id));
    toast.success('Изображение удалено');
  };

  const saveService = (service: Service) => {
    const existing = content.services.find(s => s.id === service.id);
    if (existing) {
      updateServices(content.services.map(s => s.id === service.id ? service : s));
    } else {
      updateServices([...content.services, { ...service, id: Date.now().toString() }]);
    }
    setEditingService(null);
    toast.success('Услуга сохранена');
  };

  const saveReview = (review: Review) => {
    const existing = content.reviews.find(r => r.id === review.id);
    if (existing) {
      updateReviews(content.reviews.map(r => r.id === review.id ? review : r));
    } else {
      updateReviews([...content.reviews, { ...review, id: Date.now().toString() }]);
    }
    setEditingReview(null);
    toast.success('Отзыв сохранён');
  };

  const saveBlogPost = (post: BlogPost) => {
    const existing = content.blogPosts.find(p => p.id === post.id);
    if (existing) {
      updateBlogPosts(content.blogPosts.map(p => p.id === post.id ? post : p));
    } else {
      updateBlogPosts([...content.blogPosts, { ...post, id: Date.now().toString() }]);
    }
    setEditingPost(null);
    toast.success('Статья сохранена');
  };

  const savePortfolioImage = (image: PortfolioImage) => {
    const existing = content.portfolioImages.find(i => i.id === image.id);
    if (existing) {
      updatePortfolio(content.portfolioImages.map(i => i.id === image.id ? image : i));
    } else {
      updatePortfolio([...content.portfolioImages, { ...image, id: Date.now().toString() }]);
    }
    setEditingImage(null);
    toast.success('Изображение сохранено');
  };

  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-heading mb-2">Панель управления</h1>
            <p className="text-muted-foreground">Редактируйте контент сайта</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset}>
              <Icon name="RotateCcw" size={18} className="mr-2" />
              Сбросить
            </Button>
            <Button onClick={handleSave}>
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить изменения
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="hero">Главная</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            <TabsTrigger value="blog">Блог</TabsTrigger>
            <TabsTrigger value="about">О студии</TabsTrigger>
            <TabsTrigger value="contacts">Контакты</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Главный экран</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Бейдж</label>
                  <Input
                    value={content.hero.badge}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Заголовок</label>
                  <Input
                    value={content.hero.title}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Подзаголовок</label>
                  <Textarea
                    value={content.hero.subtitle}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Услуги ({content.services.length})</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingService({ id: '', title: '', price: '', duration: '', description: '', icon: 'Camera' })}>
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить услугу
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingService?.id ? 'Редактировать' : 'Новая'} услуга</DialogTitle>
                    </DialogHeader>
                    {editingService && (
                      <div className="space-y-4">
                        <Input
                          placeholder="Название"
                          value={editingService.title}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        />
                        <Input
                          placeholder="Цена (от 5 000 ₽)"
                          value={editingService.price}
                          onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                        />
                        <Input
                          placeholder="Длительность (1-2 часа)"
                          value={editingService.duration}
                          onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                        />
                        <Textarea
                          placeholder="Описание"
                          value={editingService.description}
                          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                          rows={3}
                        />
                        <Input
                          placeholder="Иконка (Camera, User, Heart, Package)"
                          value={editingService.icon}
                          onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                        />
                        <Button onClick={() => saveService(editingService)} className="w-full">
                          Сохранить
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-3">
                {content.services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.price} • {service.duration}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingService(service)}>
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteService(service.id)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Портфолио ({content.portfolioImages.length})</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingImage({ id: '', url: '', category: 'all', title: '' })}>
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить фото
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingImage?.id ? 'Редактировать' : 'Новое'} изображение</DialogTitle>
                    </DialogHeader>
                    {editingImage && (
                      <div className="space-y-4">
                        <Input
                          placeholder="URL изображения"
                          value={editingImage.url}
                          onChange={(e) => setEditingImage({ ...editingImage, url: e.target.value })}
                        />
                        <Input
                          placeholder="Название"
                          value={editingImage.title}
                          onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                        />
                        <select
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                          value={editingImage.category}
                          onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value as any })}
                        >
                          <option value="all">Все категории</option>
                          <option value="portrait">Портреты</option>
                          <option value="wedding">Свадьбы</option>
                          <option value="product">Предметка</option>
                        </select>
                        <Button onClick={() => savePortfolioImage(editingImage)} className="w-full">
                          Сохранить
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {content.portfolioImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img src={image.url} alt={image.title} className="w-full h-48 object-cover rounded-lg" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button variant="secondary" size="sm" onClick={() => setEditingImage(image)}>
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => deleteImage(image.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                      <p className="text-sm mt-2">{image.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Отзывы ({content.reviews.length})</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingReview({ id: '', name: '', text: '', rating: 5 })}>
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить отзыв
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingReview?.id ? 'Редактировать' : 'Новый'} отзыв</DialogTitle>
                    </DialogHeader>
                    {editingReview && (
                      <div className="space-y-4">
                        <Input
                          placeholder="Имя клиента"
                          value={editingReview.name}
                          onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                        />
                        <Textarea
                          placeholder="Текст отзыва"
                          value={editingReview.text}
                          onChange={(e) => setEditingReview({ ...editingReview, text: e.target.value })}
                          rows={4}
                        />
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          placeholder="Рейтинг (1-5)"
                          value={editingReview.rating}
                          onChange={(e) => setEditingReview({ ...editingReview, rating: parseInt(e.target.value) })}
                        />
                        <Button onClick={() => saveReview(editingReview)} className="w-full">
                          Сохранить
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-3">
                {content.reviews.map((review) => (
                  <div key={review.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-muted-foreground italic">"{review.text}"</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" className="text-primary fill-primary" size={16} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingReview(review)}>
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteReview(review.id)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Статьи блога ({content.blogPosts.length})</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingPost({ id: '', title: '', date: '', excerpt: '', image: '' })}>
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить статью
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingPost?.id ? 'Редактировать' : 'Новая'} статья</DialogTitle>
                    </DialogHeader>
                    {editingPost && (
                      <div className="space-y-4">
                        <Input
                          placeholder="Заголовок"
                          value={editingPost.title}
                          onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        />
                        <Input
                          placeholder="Дата (15 октября 2025)"
                          value={editingPost.date}
                          onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                        />
                        <Textarea
                          placeholder="Краткое описание"
                          value={editingPost.excerpt}
                          onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                          rows={3}
                        />
                        <Input
                          placeholder="URL изображения"
                          value={editingPost.image}
                          onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                        />
                        <Button onClick={() => saveBlogPost(editingPost)} className="w-full">
                          Сохранить
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-3">
                {content.blogPosts.map((post) => (
                  <div key={post.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex gap-4 flex-1">
                      <img src={post.image} alt={post.title} className="w-24 h-24 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                        <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deletePost(post.id)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>О студии</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Описание</label>
                  <Textarea
                    value={content.about.description}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, description: e.target.value } })}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Лет опыта</label>
                    <Input
                      value={content.about.stats.years}
                      onChange={(e) => setContent({ ...content, about: { ...content.about, stats: { ...content.about.stats, years: e.target.value } } })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Съёмок</label>
                    <Input
                      value={content.about.stats.shoots}
                      onChange={(e) => setContent({ ...content, about: { ...content.about, stats: { ...content.about.stats, shoots: e.target.value } } })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Довольных клиентов</label>
                    <Input
                      value={content.about.stats.satisfaction}
                      onChange={(e) => setContent({ ...content, about: { ...content.about, stats: { ...content.about.stats, satisfaction: e.target.value } } })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Адрес</label>
                  <Input
                    value={content.contacts.address}
                    onChange={(e) => setContent({ ...content, contacts: { ...content.contacts, address: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Телефон</label>
                  <Input
                    value={content.contacts.phone}
                    onChange={(e) => setContent({ ...content, contacts: { ...content.contacts, phone: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    value={content.contacts.email}
                    onChange={(e) => setContent({ ...content, contacts: { ...content.contacts, email: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Режим работы</label>
                  <Input
                    value={content.contacts.hours}
                    onChange={(e) => setContent({ ...content, contacts: { ...content.contacts, hours: e.target.value } })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
