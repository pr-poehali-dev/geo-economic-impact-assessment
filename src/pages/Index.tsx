import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Project {
  id: number;
  name: string;
  country: string;
  type: string;
  impact: 'positive' | 'negative' | 'mixed';
  economic: number;
  environmental: number;
  social: number;
  description: string;
  conclusion: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Норильский горно-металлургический комбинат',
    country: 'Россия',
    type: 'Добыча полезных ископаемых',
    impact: 'negative',
    economic: 85,
    environmental: 15,
    social: 45,
    description: 'Крупнейший производитель никеля и палладия. Значительный вклад в экономику региона, но серьёзное загрязнение воздуха и почвы тяжёлыми металлами.',
    conclusion: 'Необходима модернизация очистных сооружений и внедрение зелёных технологий для снижения выбросов SO₂ на 75%.'
  },
  {
    id: 2,
    name: 'Байкальский целлюлозно-бумажный комбинат',
    country: 'Россия',
    type: 'Промышленность',
    impact: 'negative',
    economic: 60,
    environmental: 20,
    social: 40,
    description: 'Закрыт в 2013 году из-за загрязнения озера Байкал. Пример конфликта между экономическим развитием и сохранением уникальной экосистемы.',
    conclusion: 'Рекомендуется развитие экотуризма и научно-исследовательской деятельности как альтернативных источников дохода для региона.'
  },
  {
    id: 3,
    name: 'Ветропарк Адыгеи',
    country: 'Россия',
    type: 'Возобновляемая энергетика',
    impact: 'positive',
    economic: 70,
    environmental: 90,
    social: 65,
    description: 'Первый крупный ветропарк на юге России. Мощность 150 МВт, обеспечивает чистой энергией 200 тысяч домохозяйств.',
    conclusion: 'Успешная модель для тиражирования. Рекомендуется увеличение мощности до 300 МВт к 2030 году.'
  },
  {
    id: 4,
    name: 'Проект "Ямал СПГ"',
    country: 'Россия',
    type: 'Газодобыча',
    impact: 'mixed',
    economic: 95,
    environmental: 55,
    social: 50,
    description: 'Крупнейший завод по производству сжиженного природного газа. Высокая экономическая эффективность, но риски для арктической экосистемы.',
    conclusion: 'Необходим постоянный экологический мониторинг и компенсационные меры для коренных народов Севера.'
  },
  {
    id: 5,
    name: 'Проект "Три ущелья" (Китай)',
    country: 'Китай',
    type: 'Гидроэнергетика',
    impact: 'mixed',
    economic: 92,
    environmental: 40,
    social: 35,
    description: 'Крупнейшая ГЭС в мире. Переселение 1,3 млн человек, изменение экосистемы реки Янцзы, но производство 98,8 млрд кВт·ч в год.',
    conclusion: 'Требуется программа восстановления биоразнообразия и социальной адаптации переселённых жителей.'
  }
];

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const countryMatch = selectedCountry === 'all' || project.country === selectedCountry;
    const typeMatch = selectedType === 'all' || project.type === selectedType;
    return countryMatch && typeMatch;
  });

  const countries = Array.from(new Set(projects.map(p => p.country)));
  const types = Array.from(new Set(projects.map(p => p.type)));

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'bg-secondary text-white';
      case 'negative': return 'bg-accent text-white';
      case 'mixed': return 'bg-yellow-500 text-white';
      default: return 'bg-muted';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'positive': return 'Положительное';
      case 'negative': return 'Отрицательное';
      case 'mixed': return 'Смешанное';
      default: return impact;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Globe" size={40} className="text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Экология и Экономика</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Анализ влияния экономических проектов на окружающую среду. 
            Оценка различных точек зрения и выработка рекомендаций.
          </p>
        </header>

        <Tabs defaultValue="library" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Icon name="BookOpen" size={18} />
              Библиотека проектов
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <Icon name="TrendingUp" size={18} />
              Результаты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Filter" size={24} />
                  Фильтры
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-medium mb-2 block">Страна</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все страны" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все страны</SelectItem>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-medium mb-2 block">Тип проекта</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все типы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все типы</SelectItem>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredProjects.map(project => (
                <Card key={project.id} className="hover-scale transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Icon name="MapPin" size={16} />
                          {project.country} • {project.type}
                        </CardDescription>
                      </div>
                      <Badge className={getImpactColor(project.impact)}>
                        {getImpactLabel(project.impact)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Icon name="TrendingUp" size={16} className="text-primary" />
                            Экономический эффект
                          </span>
                          <span className="font-semibold">{project.economic}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${project.economic}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Icon name="Leaf" size={16} className="text-secondary" />
                            Экологическая безопасность
                          </span>
                          <span className="font-semibold">{project.environmental}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-secondary rounded-full transition-all"
                            style={{ width: `${project.environmental}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Icon name="Users" size={16} className="text-accent" />
                            Социальное влияние
                          </span>
                          <span className="font-semibold">{project.social}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full transition-all"
                            style={{ width: `${project.social}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" size={24} />
                  Общая статистика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-primary/10 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {Math.round(projects.reduce((acc, p) => acc + p.economic, 0) / projects.length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Средний экономический эффект</div>
                  </div>
                  <div className="text-center p-6 bg-secondary/10 rounded-lg">
                    <div className="text-4xl font-bold text-secondary mb-2">
                      {Math.round(projects.reduce((acc, p) => acc + p.environmental, 0) / projects.length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Средняя экологичность</div>
                  </div>
                  <div className="text-center p-6 bg-accent/10 rounded-lg">
                    <div className="text-4xl font-bold text-accent mb-2">
                      {Math.round(projects.reduce((acc, p) => acc + p.social, 0) / projects.length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Социальное влияние</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={24} />
                  Выводы и рекомендации
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {filteredProjects.map(project => (
                  <div key={project.id} className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Icon name="Lightbulb" size={18} className="text-primary" />
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.conclusion}
                    </p>
                  </div>
                ))}

                <div className="mt-8 p-6 bg-muted/50 rounded-lg space-y-4">
                  <h3 className="font-bold text-xl flex items-center gap-2">
                    <Icon name="Target" size={22} className="text-primary" />
                    Общие рекомендации
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Внедрение системы экологического мониторинга в режиме реального времени для всех крупных промышленных объектов</span>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Обязательная оценка воздействия на окружающую среду (ОВОС) для проектов с инвестициями свыше 100 млн рублей</span>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Стимулирование перехода к возобновляемым источникам энергии через налоговые льготы и субсидии</span>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Создание компенсационных механизмов для местного населения в регионах с высокой промышленной нагрузкой</span>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Развитие международного сотрудничества в области передачи экологически чистых технологий</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
