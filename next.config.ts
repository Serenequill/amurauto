import type { NextConfig } from "next";

const securityHeaders = [
  // Запрет встраивания сайта в iframe (защита от кликджекинга)
  { key: "X-Frame-Options", value: "DENY" },
  // Браузер не угадывает тип файла — только то, что сервер объявил
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Только HTTPS, 2 года, включая поддомены
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Не отправлять Referer сторонним сайтам
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Запрет опасных браузерных API без явного разрешения
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Content Security Policy — разрешаем только нужные источники
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Скрипты: свой домен + Vercel analytics + inline (Next.js требует)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
      // Стили: свой домен + inline (Tailwind/Framer Motion)
      "style-src 'self' 'unsafe-inline'",
      // Картинки: свой домен + data: URI + внешние CDN если есть
      "img-src 'self' data: blob: https:",
      // Шрифты: свой домен
      "font-src 'self' data:",
      // Фреймы: только 2GIS для карты
      "frame-src 'self' https://yandex.ru https://2gis.kz https://maps.2gis.com",
      // Соединения: WhatsApp API, Vercel
      "connect-src 'self' https://wa.me https://api.whatsapp.com https://vitals.vercel-insights.com https://vercel.live",
      // Медиа: свой домен
      "media-src 'self'",
      // Объекты: запрещены полностью
      "object-src 'none'",
      // Base URI: только свой домен
      "base-uri 'self'",
      // Форма: только свой домен
      "form-action 'self'",
      // Upgrade небезопасных запросов до HTTPS
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Применяем ко всем страницам
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Сжатие ответов
  compress: true,

  // Строгий режим React (находит потенциальные проблемы в разработке)
  reactStrictMode: true,

  // Оптимизация изображений — форматы следующего поколения
  images: {
    formats: ["image/avif", "image/webp"],
    // Кэш изображений 60 дней
    minimumCacheTTL: 5184000,
  },

  // Убираем заголовок X-Powered-By: Next.js (не раскрываем технологии)
  poweredByHeader: false,
};

export default nextConfig;
