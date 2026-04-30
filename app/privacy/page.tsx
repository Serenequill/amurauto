import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — АмурАвто",
  description: "Политика обработки персональных данных автошколы АмурАвто в соответствии с законодательством Республики Казахстан.",
};

export default function PrivacyPage() {
  return (
    <main style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-20">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-10 transition-colors"
          style={{ color: "#9CA3AF" }}
        >
          ← Вернуться на главную
        </Link>

        {/* Header */}
        <h1
          className="font-extrabold mb-2"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "#111827", letterSpacing: "-0.02em" }}
        >
          Политика конфиденциальности
        </h1>
        <p className="text-sm mb-10" style={{ color: "#9CA3AF" }}>
          Последнее обновление: 30 апреля 2026 г.
        </p>

        <div className="prose prose-sm max-w-none space-y-8" style={{ color: "#374151", lineHeight: 1.8 }}>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "#111827" }}>1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности (далее — «Политика») регулирует порядок сбора, хранения
              и использования персональных данных пользователей сайта <strong>amurauto.kz</strong>,
              принадлежащего ТОО «АмурАвто» (далее — «Оператор»).
            </p>
            <p className="mt-3">
              Политика разработана в соответствии с Законом Республики Казахстан
              «О персональных данных и их защите» от 21 мая 2013 года № 94-V.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "#111827" }}>2. Какие данные мы собираем</h2>
            <p>При заполнении форм на сайте мы можем запросить:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Имя и фамилию</li>
              <li>Номер мобильного телефона</li>
              <li>Выбранный филиал и формат обучения</li>
              <li>Вопрос или комментарий (по желанию)</li>
            </ul>
            <p className="mt-3">
              Мы <strong>не собираем</strong> платёжные данные, паспортные данные, данные о
              местоположении или иные чувствительные персональные данные через сайт.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "#111827" }}>3. Цели обработки данных</h2>
            <p>Персональные данные используются исключительно для:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Обработки заявки на запись в автошколу</li>
              <li>Обратной связи с потенциальным курсантом</li>
              <li>Направления курсанта к нужному менеджеру филиала</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "#111827" }}>4. Как передаются и хранятся данные</h2>
            <p>
              При отправке формы данные <strong>не сохраняются на серверах сайта</strong> и не
              записываются в базу данных. Заявка формируется в виде сообщения и передаётся
              напрямую менеджеру автошколы через мессенджер <strong>WhatsApp</strong>
              (сервис Meta Platforms, Inc.) по защищённому каналу.
            </p>
            <p className="mt-3">
              Дальнейшее хранение и обработка данных происходят в рамках переписки в WhatsApp
              и внутренней CRM автошколы. Данные не передаются третьим лицам и не используются
              в рекламных целях.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "#111827" }}>5. Права субъекта персональных данных</h2>
            <p>В соответствии с законодательством РК вы вправе:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Получить информацию о том, какие ваши данные обрабатываются</li>
              <li>Потребовать исправления неточных данных</li>
              <li>Потребовать удаления ваших данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
            </ul>
            <p className="mt-3">
              Для реализации своих прав обратитесь к нам по контактам, указанным в разделе 7.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "#111827" }}>6. Cookies и аналитика</h2>
            <p>
              Сайт <strong>не использует</strong> сторонние аналитические сервисы (Google Analytics,
              Яндекс.Метрика и пр.) и не устанавливает рекламные файлы cookie. Технические cookie,
              необходимые для корректной работы сайта, не содержат персональных данных.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "#111827" }}>7. Контактная информация оператора</h2>
            <p>По всем вопросам, связанным с обработкой персональных данных:</p>
            <ul className="list-none mt-2 space-y-1">
              <li><strong>Организация:</strong> ТОО «АмурАвто»</li>
              <li><strong>Город:</strong> г. Алматы, Республика Казахстан</li>
              <li>
                <strong>Телефон:</strong>{" "}
                <a href="tel:87776667096" style={{ color: "#E11D48" }}>8-777-666-70-96</a>
              </li>
              <li>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/77776667096"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#E11D48" }}
                >
                  +7 777 666-70-96
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: "#111827" }}>8. Изменения Политики</h2>
            <p>
              Оператор вправе вносить изменения в настоящую Политику. Актуальная версия всегда
              размещена по адресу <strong>amurauto.kz/privacy</strong>. Продолжение использования
              сайта после изменений означает согласие с обновлённой Политикой.
            </p>
          </section>

        </div>

        {/* Back button bottom */}
        <div className="mt-14 pt-8" style={{ borderTop: "1px solid #F1F5F9" }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all"
            style={{ background: "#F9FAFB", color: "#374151", border: "1px solid #E2E8F0" }}
          >
            ← Вернуться на главную
          </Link>
        </div>

      </div>
    </main>
  );
}
