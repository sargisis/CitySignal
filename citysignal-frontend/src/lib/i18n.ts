import { Locale } from './types';

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.report': 'Report Issue',
    'nav.track': 'Track Report',
    'nav.explore': 'Explore Map',

    // Hero
    'hero.title': 'Report. Track. Resolve.',
    'hero.subtitle': 'The unified platform for reporting urban issues in Armenia. Your voice matters — make your city better.',
    'hero.cta.report': 'Report an Issue',
    'hero.cta.track': 'Track Your Report',

    // Stats
    'stats.reported': 'Issues Reported',
    'stats.resolved': 'Issues Resolved',
    'stats.avgTime': 'Avg. Response Time',
    'stats.departments': 'Departments',
    'stats.hours': 'hours',

    // Categories
    'categories.title': 'What would you like to report?',
    'categories.subtitle': 'Select a category that best describes the issue',

    // Report form
    'report.title': 'Report an Issue',
    'report.step.category': 'Category',
    'report.step.location': 'Location',
    'report.step.details': 'Details',
    'report.step.contact': 'Contact',
    'report.step.confirm': 'Confirm',
    'report.location.title': 'Pin the location',
    'report.location.subtitle': 'Tap on the map or use your current location',
    'report.location.detect': 'Use My Location',
    'report.details.title': 'Describe the issue',
    'report.details.description': 'Description',
    'report.details.placeholder': 'Please describe the issue in detail...',
    'report.details.photos': 'Add Photos (optional)',
    'report.details.dragdrop': 'Drag & drop or click to upload',
    'report.contact.title': 'Contact Info (optional)',
    'report.contact.subtitle': 'To receive status updates',
    'report.contact.phone': 'Phone Number',
    'report.contact.email': 'Email Address',
    'report.confirm.title': 'Review Your Report',
    'report.confirm.submit': 'Submit Report',
    'report.success.title': 'Report Submitted!',
    'report.success.tracking': 'Your Tracking ID',
    'report.success.copy': 'Copy ID',
    'report.success.message': 'Your report has been submitted successfully. You can track its status using the tracking ID above.',
    'report.next': 'Next',
    'report.back': 'Back',

    // Track
    'track.title': 'Track Your Report',
    'track.subtitle': 'Enter your tracking ID to check the status',
    'track.placeholder': 'e.g. CS-2026-A1B2C',
    'track.search': 'Search',
    'track.notfound': 'No report found with this tracking ID',

    // Status
    'status.submitted': 'Submitted',
    'status.under_review': 'Under Review',
    'status.in_progress': 'In Progress',
    'status.resolved': 'Resolved',
    'status.closed': 'Closed',

    // Explore
    'explore.title': 'Explore Reported Issues',
    'explore.filter.all': 'All Categories',
    'explore.filter.status': 'Status',
    'explore.issues': 'issues',

    // Footer
    'footer.tagline': 'Making Armenian cities better, one report at a time.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Try Again',

    // Recent
    'recent.title': 'Recent Reports',
    'recent.subtitle': 'Latest issues reported by citizens',
    'recent.viewAll': 'View All on Map',

    // How it works
    'how.title': 'How It Works',
    'how.step1.title': 'Report',
    'how.step1.desc': 'Select a category, describe the issue, and pin its location on the map.',
    'how.step2.title': 'Route',
    'how.step2.desc': 'Your report is automatically sent to the right government department.',
    'how.step3.title': 'Track',
    'how.step3.desc': 'Follow real-time status updates from submission to resolution.',
    'how.step4.title': 'Resolve',
    'how.step4.desc': 'The department addresses the issue and marks it complete.',
  },

  hy: {
    // Header
    'nav.home': 'Գլխավոր',
    'nav.report': 'Հաղորդել խնդիր',
    'nav.track': 'Հետևել հայտին',
    'nav.explore': 'Քարտեզ',

    // Hero
    'hero.title': 'Հաղորդիր։ Հետևիր։ Լուծիր։',
    'hero.subtitle': 'Հայաստանի քաղաքային խնդիրների հաղորդման միասնական հարթակ։ Ձեր ձայնը կարևոր է — դարձրեք ձեր քաղաքն ավելի լավ։',
    'hero.cta.report': 'Հաղորդել խնդիր',
    'hero.cta.track': 'Հետևել հայտին',

    // Stats
    'stats.reported': 'Հաղորդված խնդիրներ',
    'stats.resolved': 'Լուծված խնդիրներ',
    'stats.avgTime': 'Արձագանքման միջ. ժամ',
    'stats.departments': 'Բաժիններ',
    'stats.hours': 'ժամ',

    // Categories
    'categories.title': 'Ի՞նչ եք ցանկանում հաղորդել',
    'categories.subtitle': 'Ընտրեք խնդրին համապատասխան կատեգորիան',

    // Report form
    'report.title': 'Հաղորդել խնդիր',
    'report.step.category': 'Կատեգորիա',
    'report.step.location': 'Գտնվելու վայր',
    'report.step.details': 'Մանրամասներ',
    'report.step.contact': 'Կոնտակտ',
    'report.step.confirm': 'Հաստատում',
    'report.location.title': 'Նշեք գտնվելու վայրը',
    'report.location.subtitle': 'Հպեք քարտեզին կամ օգտագործեք ձեր ընթացիկ գտնվելու վայրը',
    'report.location.detect': 'Օգտագործել իմ տեղը',
    'report.details.title': 'Նկարագրեք խնդիրը',
    'report.details.description': 'Նկարագրություն',
    'report.details.placeholder': 'Խնդրում ենք մանրամասն նկարագրել խնդիրը...',
    'report.details.photos': 'Ավելացնել լուսանկարներ (կամընտիր)',
    'report.details.dragdrop': 'Քաշեք և գցեք կամ սեղմեք՝ վերբեռնելու համար',
    'report.contact.title': 'Կոնտակտային տվյալներ (կամընտիր)',
    'report.contact.subtitle': 'Կարգավիճակի թարմացումներ ստանալու համար',
    'report.contact.phone': 'Հեռախոսի համար',
    'report.contact.email': 'Էլ. փոստ',
    'report.confirm.title': 'Ստուգեք ձեր հայտը',
    'report.confirm.submit': 'Ուղարկել հայտը',
    'report.success.title': 'Հայտն ուղարկված է։',
    'report.success.tracking': 'Ձեր հետագծման ID',
    'report.success.copy': 'Պատճենել ID-ն',
    'report.success.message': 'Ձեր հայտը հաջողությամբ ուղարկվել է։ Կարող եք հետևել դրա կարգավիճակին վերևի հետագծման ID-ի միջոցով։',
    'report.next': 'Հաջորդ',
    'report.back': 'Նախորդ',

    // Track
    'track.title': 'Հետևել ձեր հայտին',
    'track.subtitle': 'Մուտքագրեք հետագծման ID-ն՝ կարգավիճակը ստուգելու համար',
    'track.placeholder': 'օր.՝ CS-2026-A1B2C',
    'track.search': 'Որոնել',
    'track.notfound': 'Այս հետագծման ID-ով հայտ չի գտնվել',

    // Status
    'status.submitted': 'Ուղարկված',
    'status.under_review': 'Դիտարկման փուլում',
    'status.in_progress': 'Ընթացքի մեջ',
    'status.resolved': 'Լուծված',
    'status.closed': 'Փակված',

    // Explore
    'explore.title': 'Դիտել հաղորդված խնդիրները',
    'explore.filter.all': 'Բոլոր կատեգորիաները',
    'explore.filter.status': 'Կարգավիճակ',
    'explore.issues': 'խնդիր',

    // Footer
    'footer.tagline': 'Հայաստանի քաղաքները դարձնում ենք ավելի լավ՝ մեկ հայտ առ մեկ։',
    'footer.links': 'Արագ հղումներ',
    'footer.contact': 'Կոնտակտ',
    'footer.rights': 'Բոլոր իրավունքները պաշտպանված են։',

    // Common
    'common.loading': 'Բեռնվում է...',
    'common.error': 'Սխալ է տեղի ունեցել',
    'common.retry': 'Կրկին փորձել',

    // Recent
    'recent.title': 'Վերջին հայտերը',
    'recent.subtitle': 'Քաղաքացիների կողմից վերջերս հաղորդված խնդիրները',
    'recent.viewAll': 'Տեսնել բոլորը քարտեզի վրա',

    // How it works
    'how.title': 'Ինչպե՞ս է աշխատում',
    'how.step1.title': 'Հաղորդեք',
    'how.step1.desc': 'Ընտրեք կատեգորիա, նկարագրեք խնդիրը և նշեք տեղը քարտեզի վրա։',
    'how.step2.title': 'Ուղղորդում',
    'how.step2.desc': 'Ձեր հայտն ավտոմատ կերպով ուղարկվում է պատասխանատու պետական բաժին։',
    'how.step3.title': 'Հետևեք',
    'how.step3.desc': 'Հետևեք կարգավիճակի փոփոխություններին՝ ուղարկումից մինչև լուծում։',
    'how.step4.title': 'Լուծում',
    'how.step4.desc': 'Բաժինը վերացնում է խնդիրը և նշում այն որպես կատարված։',
  },

  ru: {
    // Header
    'nav.home': 'Главная',
    'nav.report': 'Сообщить о проблеме',
    'nav.track': 'Отследить заявку',
    'nav.explore': 'Карта',

    // Hero
    'hero.title': 'Сообщи. Отследи. Реши.',
    'hero.subtitle': 'Единая платформа для сообщений о городских проблемах в Армении. Ваш голос важен — сделайте город лучше.',
    'hero.cta.report': 'Сообщить о проблеме',
    'hero.cta.track': 'Отследить заявку',

    // Stats
    'stats.reported': 'Заявок подано',
    'stats.resolved': 'Проблем решено',
    'stats.avgTime': 'Среднее время ответа',
    'stats.departments': 'Ведомств',
    'stats.hours': 'часов',

    // Categories
    'categories.title': 'О чём хотите сообщить?',
    'categories.subtitle': 'Выберите категорию, которая лучше всего описывает проблему',

    // Report form
    'report.title': 'Сообщить о проблеме',
    'report.step.category': 'Категория',
    'report.step.location': 'Местоположение',
    'report.step.details': 'Детали',
    'report.step.contact': 'Контакт',
    'report.step.confirm': 'Подтверждение',
    'report.location.title': 'Укажите местоположение',
    'report.location.subtitle': 'Нажмите на карту или используйте своё текущее местоположение',
    'report.location.detect': 'Использовать моё местоположение',
    'report.details.title': 'Опишите проблему',
    'report.details.description': 'Описание',
    'report.details.placeholder': 'Пожалуйста, подробно опишите проблему...',
    'report.details.photos': 'Добавить фото (необязательно)',
    'report.details.dragdrop': 'Перетащите или нажмите для загрузки',
    'report.contact.title': 'Контактные данные (необязательно)',
    'report.contact.subtitle': 'Для получения обновлений статуса',
    'report.contact.phone': 'Номер телефона',
    'report.contact.email': 'Электронная почта',
    'report.confirm.title': 'Проверьте вашу заявку',
    'report.confirm.submit': 'Отправить заявку',
    'report.success.title': 'Заявка отправлена!',
    'report.success.tracking': 'Ваш ID отслеживания',
    'report.success.copy': 'Скопировать ID',
    'report.success.message': 'Ваша заявка успешно отправлена. Вы можете отслеживать её статус по ID выше.',
    'report.next': 'Далее',
    'report.back': 'Назад',

    // Track
    'track.title': 'Отследить заявку',
    'track.subtitle': 'Введите ID отслеживания, чтобы проверить статус',
    'track.placeholder': 'напр. CS-2026-A1B2C',
    'track.search': 'Найти',
    'track.notfound': 'Заявка с таким ID не найдена',

    // Status
    'status.submitted': 'Отправлено',
    'status.under_review': 'На рассмотрении',
    'status.in_progress': 'В работе',
    'status.resolved': 'Решено',
    'status.closed': 'Закрыто',

    // Explore
    'explore.title': 'Просмотр заявок на карте',
    'explore.filter.all': 'Все категории',
    'explore.filter.status': 'Статус',
    'explore.issues': 'заявок',

    // Footer
    'footer.tagline': 'Делаем города Армении лучше — одна заявка за раз.',
    'footer.links': 'Быстрые ссылки',
    'footer.contact': 'Контакты',
    'footer.rights': 'Все права защищены.',

    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Что-то пошло не так',
    'common.retry': 'Попробовать снова',

    // Recent
    'recent.title': 'Последние заявки',
    'recent.subtitle': 'Недавно поданные жалобы от граждан',
    'recent.viewAll': 'Посмотреть все на карте',

    // How it works
    'how.title': 'Как это работает',
    'how.step1.title': 'Сообщите',
    'how.step1.desc': 'Выберите категорию, опишите проблему и отметьте место на карте.',
    'how.step2.title': 'Маршрутизация',
    'how.step2.desc': 'Ваша заявка автоматически отправляется в нужное ведомство.',
    'how.step3.title': 'Отслеживайте',
    'how.step3.desc': 'Следите за обновлениями статуса — от подачи до решения.',
    'how.step4.title': 'Решение',
    'how.step4.desc': 'Ведомство устраняет проблему и отмечает её как выполненную.',
  },
} as const;

export function t(key: TranslationKey, locale: Locale): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hy: 'Հայերեն',
  ru: 'Русский',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  hy: '🇦🇲',
  ru: '🇷🇺',
};