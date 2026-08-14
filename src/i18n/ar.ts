import type { SiteContent } from "./types";

/**
 * Arabic — written for a Saudi audience, not translated from the English.
 *
 * Register: professional Saudi Arabic. Confident and concise, with restrained
 * conversational touches placed deliberately (`عشان` in Services, `مو` in the
 * principles, `لين` in the process, `وش / ودك` in the contact section) so the
 * voice reads as a Saudi studio speaking to Saudi founders rather than as
 * corporate MSA. The brand is never translated: the wordmark stays Latin and
 * running copy uses `تريبل`.
 *
 * Line arrays are art-directed for Arabic — the breaks are chosen for Arabic
 * word shapes and are intentionally not a mirror of the English breaks.
 */
export const ar: SiteContent = {
  meta: {
    title: "تريبل — استراتيجية، تصميم وتقنية",
    description:
      "تريبل فريق رقمي متعدد التخصصات يجمع بين الاستراتيجية والتصميم والتقنية لبناء منتجات وتجارب رقمية مدروسة.",
  },

  ui: {
    skipToContent: "الانتقال إلى المحتوى",
    brandHome: "تريبل — الرجوع للأعلى",
    menu: "القائمة",
    openMenu: "فتح القائمة",
    close: "إغلاق",
    closeMenu: "إغلاق القائمة",
    siteMenu: "قائمة الموقع",
    primaryNav: "التنقل الرئيسي",
    footerNav: "روابط التذييل",
    howWeWork: "طريقة عملنا",
    backToTop: "الرجوع للأعلى",
    studioTagline: "استوديو رقمي مستقل",
    cursorView: "عرض",
    cursorGo: "اذهب",
  },

  language: {
    label: "EN",
    aria: "التبديل إلى الإنجليزية",
  },

  nav: {
    items: [
      { id: "work", label: "أعمالنا", href: "#work", index: "01" },
      { id: "services", label: "خدماتنا", href: "#services", index: "02" },
      { id: "about", label: "من نحن", href: "#about", index: "03" },
      { id: "process", label: "منهجيتنا", href: "#process", index: "04" },
      { id: "contact", label: "تواصل معنا", href: "#contact", index: "05" },
    ],
    cta: { label: "ابدأ مشروعك", href: "#contact" },
  },

  hero: {
    eyebrow: "استوديو رقمي مستقل",
    meta: "تأسّس 2026 — بورتفوليو",
    lines: {
      wide: [
        "نحوّل الأفكار الجريئة",
        "إلى تجارب رقمية",
        "تصنع [gold]أثرًا.[/gold]",
      ],
      narrow: [
        "نحوّل الأفكار",
        "الجريئة إلى",
        "تجارب رقمية",
        "تصنع [gold]أثرًا.[/gold]",
      ],
    },
    copy: "في تريبل، نجمع بين الاستراتيجية والتصميم والتقنية ضمن فريق واحد، لنصنع منتجات وتجارب رقمية مدروسة من الفكرة إلى التنفيذ.",
    primaryCta: "ابدأ مشروعك",
    secondaryCta: "استكشف أعمالنا",
    stages: [
      { index: "01", label: "نفكّر" },
      { index: "02", label: "نصمّم" },
      { index: "03", label: "نبني" },
    ],
    scrollCue: "مرّر للاستكشاف",
  },

  about: {
    index: "01",
    label: "من نحن",
    heading: ["ثلاث رؤى.", "معيار واحد.", "عمل رقمي استثنائي."],
    body: "نجمع التفكير الاستراتيجي، والتصميم المدروس، والهندسة القوية في فريق واحد، لنحوّل الأفكار الطموحة إلى تجارب رقمية متكاملة.",
  },

  signature: {
    eyebrow: "لماذا تريبل",
    phases: [
      {
        index: "01",
        word: "نفكّر",
        copy: "نفهم التحدي، الهدف، والسياق قبل ما نبدأ.",
      },
      {
        index: "02",
        word: "نصمّم",
        copy: "نحوّل الفكرة إلى تجربة واضحة ومدروسة.",
      },
      {
        index: "03",
        word: "نبني",
        copy: "نحوّل التصميم إلى منتج فعلي بجودة تليق بالفكرة.",
      },
    ],
  },

  work: {
    index: "02",
    label: "أعمال مختارة",
    meta: "بورتفوليو 2026",
    heading: ["أعمال صُممت", "لتصنع أثرًا."],
    body: "نعمل حاليًا على تجهيز عرض مشاريعنا. هذه المساحات مهيأة لعرض المنتجات والمنصات والتجارب التي صنعناها.",
    featured: "مميّز",
    status: "قيد التجهيز",
    projects: [
      {
        id: "project-01",
        index: "01",
        title: "اسم المشروع",
        category: "منتج رقمي",
        year: "2026",
        description: "ستتم إضافة تفاصيل المشروع هنا.",
      },
      {
        id: "project-02",
        index: "02",
        title: "اسم المشروع",
        category: "هوية رقمية",
        year: "2026",
        description: "ستتم إضافة تفاصيل المشروع هنا.",
      },
      {
        id: "project-03",
        index: "03",
        title: "اسم المشروع",
        category: "منصة",
        year: "2026",
        description: "ستتم إضافة تفاصيل المشروع هنا.",
      },
      {
        id: "project-04",
        index: "04",
        title: "اسم المشروع",
        category: "تجربة ويب",
        year: "2026",
        description: "ستتم إضافة تفاصيل المشروع هنا.",
      },
      {
        id: "project-05",
        index: "05",
        title: "اسم المشروع",
        category: "منتج تقني",
        year: "2026",
        description: "ستتم إضافة تفاصيل المشروع هنا.",
      },
    ],
  },

  services: {
    index: "03",
    label: "خدماتنا",
    meta: "ست تخصصات",
    heading: ["من أول فكرة", "إلى المنتج النهائي."],
    body: "نجمع الاستراتيجية والتصميم والتقنية في مسار واحد، عشان تظل الفكرة واضحة من البداية إلى التنفيذ.",
    items: [
      {
        index: "01",
        title: "الاستراتيجية والمنتج",
        capabilities: [
          "استراتيجية المنتج",
          "البحث والتحليل",
          "التوجه الرقمي",
          "هيكلة المنتج",
        ],
      },
      {
        index: "02",
        title: "تجربة وواجهة المستخدم",
        capabilities: [
          "تجربة المستخدم",
          "أنظمة الواجهات",
          "تصميم التفاعل",
          "النماذج الأولية",
        ],
      },
      {
        index: "03",
        title: "تطوير الويب",
        capabilities: [
          "هندسة الواجهات",
          "منصات متجاوبة",
          "تجارب تفاعلية",
          "تحسين الأداء",
        ],
      },
      {
        index: "04",
        title: "تطوير التطبيقات",
        capabilities: [
          "تطبيقات الويب",
          "منصات المنتجات",
          "الأدوات الداخلية",
          "واجهات قابلة للتوسع",
        ],
      },
      {
        index: "05",
        title: "الهوية والعلامة الرقمية",
        capabilities: [
          "التوجه الإبداعي",
          "الهوية البصرية",
          "أنظمة التصميم",
          "الحضور الرقمي",
        ],
      },
      {
        index: "06",
        title: "التقنية الإبداعية",
        capabilities: [
          "الحركة",
          "التفاعل",
          "الواجهات التجريبية",
          "التجارب الرقمية",
        ],
      },
    ],
  },

  philosophy: {
    eyebrow: "مبادئنا",
    principles: [
      {
        index: "01",
        lines: ["الاستراتيجية قبل", "الزخرفة."],
        body: "نفهم المشكلة قبل ما نصمم الواجهة.",
        align: "start",
      },
      {
        index: "02",
        lines: ["التصميم والهندسة", "يكملون بعض."],
        body: "أفضل التجارب الرقمية تظهر لما يتطور التصميم والتنفيذ التقني مع بعض من البداية.",
        align: "end",
      },
      {
        index: "03",
        lines: ["التفاصيل جزء", "من المنتج."],
        body: "الأداء، والحركة، والتجاوب، وجودة التنفيذ مو تفاصيل ثانوية.",
        align: "start",
      },
      {
        index: "04",
        lines: ["نبني للواقع."],
        body: "منتجاتنا لازم تعمل بكفاءة مع مستخدمين حقيقيين، وعلى أجهزة وظروف حقيقية.",
        align: "end",
      },
    ],
  },

  process: {
    index: "04",
    label: "منهجيتنا",
    meta: "خمس مراحل",
    heading: ["تفكير واضح.", "تنفيذ مركز."],
    body: "منهجية تربط أهداف العمل بتجربة المستخدم والتنفيذ التقني من البداية للنهاية.",
    steps: [
      {
        index: "01",
        title: "نكتشف",
        body: "نفهم النشاط، المستخدمين، الأهداف، والتحديات.",
      },
      {
        index: "02",
        title: "نحدد",
        body: "نحوّل المعطيات إلى توجه واضح واستراتيجية قابلة للتنفيذ.",
      },
      {
        index: "03",
        title: "نصمّم",
        body: "نبني التجربة، الواجهة، التفاعلات، والنظام البصري.",
      },
      {
        index: "04",
        title: "نبني",
        body: "نحوّل التجربة إلى منتج فعلي بجودة إنتاجية عالية.",
      },
      {
        index: "05",
        title: "نطوّر",
        body: "نختبر، نحسّن، ونصقل التفاصيل لين توصل التجربة للمستوى المطلوب.",
      },
    ],
  },

  team: {
    index: "05",
    label: "الفريق",
    heading: ["تخصصات مختلفة.", "معيار واحد.", "فريق [gold]تريبل.[/gold]"],
    body: "فريق مركز يجمع تخصصات وخبرات متكاملة في كل مشروع.",
    openSeat: "مقعد متاح",
    members: [
      {
        index: "01",
        initial: "س",
        name: "عضو الفريق 01",
        role: "الاستراتيجية والمنتج",
      },
      {
        index: "02",
        initial: "ت",
        name: "عضو الفريق 02",
        role: "التصميم والتجربة",
      },
      {
        index: "03",
        initial: "ه",
        name: "عضو الفريق 03",
        role: "الهندسة والتقنية",
      },
    ],
  },

  contact: {
    index: "06",
    label: "تواصل معنا",
    meta: "خلّنا نتكلم",
    heading: ["عندك فكرة", "[gold]طموحة؟[/gold]"],
    body: "قل لنا وش تبني، وين وصلت، ووين ودك توصل. [hi]خلّنا نبنيها صح.[/hi]",
    cta: "ابدأ مشروعك",
  },

  footer: {
    tagline: "استراتيجية / تصميم / تقنية",
    body: "استوديو رقمي مستقل، نجهّز أول أعمالنا.",
    navigateLabel: "تنقّل",
    studioLabel: "الاستوديو",
    soon: "قريبًا",
    channels: ["LinkedIn", "GitHub", "Behance", "Instagram"],
    builtBy: "صُنع بواسطة تريبل",
  },
};
