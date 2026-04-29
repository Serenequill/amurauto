import { Car, BookOpen, Trophy, Clock } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Теоретический курс",
    description:
      "Занятия в просторных светлых кондиционируемых классах. Преподаватели высшей категории. Уникальная тестовая программа для сдачи ПДД.",
  },
  {
    icon: Car,
    title: "Практическое обучение",
    description:
      "Специально оборудованные учебные автомобили в отличном техническом состоянии. 15 машин — самый большой автопарк в Алматы.",
  },
  {
    icon: Trophy,
    title: "Сертифицированные инструкторы",
    description:
      "Трое инструкторов прошли обучение у австрийских специалистов. Авторские публикации по вождению: парковка, ночное вождение и др.",
  },
  {
    icon: Clock,
    title: "2.5 месяца — полный курс",
    description:
      "Занятия по 1.5 часа. Автодром + город. Гибкий график обучения, удобное расписание.",
  },
];

export default function Courses() {
  return (
    <section id="courses" className="py-24 bg-[#0A0A0A] relative overflow-hidden grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 text-sm font-semibold uppercase tracking-widest">
            Обучение
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white">
            Категория <span className="gradient-text">B</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            Полный курс: теория + практика на автодроме и в городских условиях
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-6 hover:border-red-700/50 hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 bg-red-700/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-700/20 group-hover:glow-red-sm transition-all">
                <f.icon size={24} className="text-red-600" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-12 bg-gradient-to-r from-red-600/10 to-red-700/5 border border-red-700/20 rounded-2xl p-8 text-center">
          <p className="text-white text-xl font-bold mb-2">
            100% сдача экзамена по ПДД
          </p>
          <p className="text-gray-400">
            Наша уникальная тестовая программа не имеет аналогов — каждый курсант успешно сдаёт экзамен.
          </p>
        </div>
      </div>
    </section>
  );
}
