import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      common: {
        explore: "Explore",
        readMore: "Read more →",
        browseLifePhases: "Browse life phases",
        loading: "Loading…",
      },
      landing: {
        title: "FG Kompass",
        subtitle: "A gentle guide through every stage of women’s health.",
        cta: "Explore Life Phases",
      },
      tabs: {
        home: "Home",
        lifePhase: "Life Phase",
        contact: "Contact",
        about: "About Us",
      },
      home: {
        heroTitle: "Strong women",
        heroSubtitle: "Calm guidance for every life phase.",
        sectionExplore: "Explore",
        sectionLifePhase: "For your life phase",
        sectionMore: "More on this topic",
        sectionFeatured: "Featured Articles",
        phaseDefault: "Your current phase",
        phaseFamily: "Family & Relationships",
        phaseText: "Curated articles and tools for your current stage of life.",
        exploreCards: {
          menopause: "Menopause",
          pregnancy: "Pregnancy",
          breastCancer: "Breast Cancer",
          diabetes: "Diabetes",
          heartDisease: "Heart Disease",
        },
      },
      lifePhase: {
        title: "Life Phases",
        subtitle: "Choose a phase to explore curated guidance.",
        empty: "No articles yet",
        youth: "Youth",
        family: "Family & Relationships",
        midlife: "Midlife",
        older: "Older Adult Wellness",
      },
      contact: {
        title: "Contact Us",
        subtitle: "We’re here to listen and help.",
        name: "Name",
        email: "Email",
        message: "Message",
        namePlaceholder: "Your name",
        emailPlaceholder: "your@email.com",
        messagePlaceholder: "Write your message...",
        send: "Send message",
      },
      about: {
        title: "Women’s Health Knowledge Compass",
        subtitle:
          "Clear, trustworthy health knowledge tailored to every life phase — designed to empower women to make informed decisions.",
        missionTitle: "Our Mission",
        missionText:
          "We provide reliable, science-based health information that reflects the real physiology, experiences, and needs of women across all life phases.",
        whyTitle: "Why We Exist",
        whyText:
          "Women are often under-represented in medical research and healthcare systems. This platform closes that gap with structured, accessible knowledge.",
        valuesTitle: "Our Values",
        values1: "Evidence-based and medically responsible",
        values2: "Inclusive of all life phases",
        values3: "Clear, calm, and respectful communication",
        ctaText: "Have questions or feedback?",
        ctaLink: "Contact us",
      },
      article: {
        readTime: "{{minutes}} min read",
      },
    },
  },
  de: {
    translation: {
      common: {
        explore: "Entdecken",
        readMore: "Weiterlesen →",
        browseLifePhases: "Lebensphasen ansehen",
        loading: "Wird geladen…",
      },
      landing: {
        title: "FG Kompass",
        subtitle:
          "Ein sanfter Leitfaden durch jede Phase der Frauengesundheit.",
        cta: "Lebensphasen entdecken",
      },
      tabs: {
        home: "Start",
        lifePhase: "Lebensphase",
        contact: "Kontakt",
        about: "Über uns",
      },
      home: {
        heroTitle: "Starke Frauen",
        heroSubtitle: "Ruhige Orientierung für jede Lebensphase.",
        sectionExplore: "Themen",
        sectionLifePhase: "Für deine Lebensphase",
        sectionMore: "Mehr zu diesem Thema",
        sectionFeatured: "Empfohlene Artikel",
        phaseDefault: "Deine aktuelle Phase",
        phaseFamily: "Familie & Beziehungen",
        phaseText:
          "Kuratierten Artikel und Tools für deine aktuelle Lebensphase.",
        exploreCards: {
          menopause: "Menopause",
          pregnancy: "Schwangerschaft",
          breastCancer: "Brustkrebs",
          diabetes: "Diabetes",
          heartDisease: "Herzkrankheiten",
        },
      },
      lifePhase: {
        title: "Lebensphasen",
        subtitle: "Wähle eine Phase für kuratierte Inhalte.",
        empty: "Noch keine Artikel",
        youth: "Jugend",
        family: "Familie & Beziehungen",
        midlife: "Mitte des Lebens",
        older: "Gesundes Altern",
      },
      contact: {
        title: "Kontakt",
        subtitle: "Wir sind für dich da.",
        name: "Name",
        email: "E-Mail",
        message: "Nachricht",
        namePlaceholder: "Dein Name",
        emailPlaceholder: "dein@email.com",
        messagePlaceholder: "Schreibe deine Nachricht...",
        send: "Nachricht senden",
      },
      about: {
        title: "Kompass für Frauengesundheit",
        subtitle:
          "Klare, verlässliche Gesundheitsinformationen für jede Lebensphase — damit Frauen informierte Entscheidungen treffen können.",
        missionTitle: "Unsere Mission",
        missionText:
          "Wir bieten verlässliche, wissenschaftlich fundierte Informationen, die die reale Physiologie, Erfahrungen und Bedürfnisse von Frauen in allen Lebensphasen berücksichtigen.",
        whyTitle: "Warum wir existieren",
        whyText:
          "Frauen sind in Forschung und Gesundheitsversorgung oft unterrepräsentiert. Diese Plattform schließt die Lücke mit strukturiertem, zugänglichem Wissen.",
        valuesTitle: "Unsere Werte",
        values1: "Evidenzbasiert und medizinisch verantwortungsvoll",
        values2: "Inklusiv für alle Lebensphasen",
        values3: "Klar, ruhig und respektvoll",
        ctaText: "Fragen oder Feedback?",
        ctaLink: "Kontakt aufnehmen",
      },
      article: {
        readTime: "{{minutes}} Min. Lesezeit",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
