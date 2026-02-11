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
        title: "Women's Health Knowledge Compass",
        subtitle:
          "Better understanding, motivation for all generations and age groups of women",
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
        heroSubtitle: "Guidance for every life phase.",
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
      topics: {
        menopause: "Menopause",
        pregnancy: "Pregnancy",
        breastcancer: "Breast Cancer",
        diabet: "Diabetes",
        "heart-disease": "Heart Disease",
        "hormone-overview-and-regulation": "Hormone Overview & Regulation",
        "immune-system-in-women": "Immune System in Women",
        "pain-processing-in-women": "Pain Processing in Women",
        "metabolism-in-women": "Metabolism in Women",
        "disease-risks-in-women": "Disease Risks in Women",
        "menstrual-cycle-and-its-impact": "Menstrual Cycle & Its Impact",
        "cycle-related-fluctuations": "Cycle-Related Fluctuations",
        "life-phases-and-hormonal-transitions":
          "Life Phases & Hormonal Transitions",
        "symptoms-of-imbalance": "Symptoms of Imbalance",
        "hormone-aware-daily-support": "Hormone-Aware Daily Support",
        "immune-strength-and-reactivity": "Immune Strength & Reactivity",
        "hormonal-influence-on-immunity": "Hormonal Influence on Immunity",
        "autoimmune-risk": "Autoimmune Risk",
        "cycle-and-immune-fluctuations": "Cycle & Immune Fluctuations",
        "immune-support-strategies": "Immune Support Strategies",
        "pain-perception-and-sensitivity": "Pain Perception & Sensitivity",
        "hormonal-modulation-of-pain": "Hormonal Modulation of Pain",
        "cycle-related-pain-patterns": "Cycle-Related Pain Patterns",
        "chronic-pain-and-gender-bias": "Chronic Pain & Gender Bias",
        "pain-management-and-self-advocacy": "Pain Management & Self-Advocacy",
        "basal-metabolism-and-energy-use": "Basal Metabolism & Energy Use",
        "hormones-and-metabolic-control": "Hormones & Metabolic Control",
        "cycle-dependent-metabolic-shifts": "Cycle-Dependent Metabolic Shifts",
        "weight-appetite-and-cravings": "Weight, Appetite & Cravings",
        "metabolic-support-and-nutrition": "Metabolic Support & Nutrition",
        "cardiovascular-health": "Cardiovascular Health",
        "autoimmune-and-inflammatory-diseases":
          "Autoimmune & Inflammatory Diseases",
        "mental-health-vulnerabilities": "Mental Health Vulnerabilities",
        "underdiagnosed-conditions": "Underdiagnosed Conditions",
        "prevention-and-early-detection": "Prevention & Early Detection",
        "cycle-phases-overview": "Cycle Phases Overview",
        "energy-mood-and-cognition": "Energy, Mood & Cognition",
        "immune-and-pain-sensitivity": "Immune & Pain Sensitivity",
        "metabolism-and-nutrition-needs": "Metabolism & Nutrition Needs",
        "movement-rest-and-recovery": "Movement, Rest & Recovery",
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
        title: "Kompass für Frauengesundheit",
        subtitle:
          "besseres Bild, Motiv alle Generation und Altersgruppen von Frauen",
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
        heroSubtitle: "Orientierung für jede Lebensphase.",
        sectionExplore: "Entdecken",
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
      topics: {
        menopause: "Menopause",
        pregnancy: "Schwangerschaft",
        breastcancer: "Brustkrebs",
        diabet: "Diabetes",
        "heart-disease": "Herzkrankheit",
        "hormone-overview-and-regulation": "Hormonübersicht und Regulation",
        "immune-system-in-women": "Immunsystem bei Frauen",
        "pain-processing-in-women": "Schmerzverarbeitung bei Frauen",
        "metabolism-in-women": "Stoffwechsel bei Frauen",
        "disease-risks-in-women": "Krankheitsrisiken bei Frauen",
        "menstrual-cycle-and-its-impact":
          "Menstruationszyklus und seine Auswirkungen",
        "cycle-related-fluctuations": "Zyklusbedingte Schwankungen",
        "life-phases-and-hormonal-transitions":
          "Lebensphasen und hormonelle Übergänge",
        "symptoms-of-imbalance": "Symptome eines Ungleichgewichts",
        "hormone-aware-daily-support": "Hormonbewusste Alltagsunterstützung",
        "immune-strength-and-reactivity": "Immunstärke und Reaktivität",
        "hormonal-influence-on-immunity":
          "Hormoneller Einfluss auf die Immunität",
        "autoimmune-risk": "Autoimmunrisiko",
        "cycle-and-immune-fluctuations": "Zyklus und Immunschwankungen",
        "immune-support-strategies": "Strategien zur Immununterstützung",
        "pain-perception-and-sensitivity":
          "Schmerzwahrnehmung und Sensibilität",
        "hormonal-modulation-of-pain": "Hormonelle Modulation von Schmerz",
        "cycle-related-pain-patterns": "Zyklusbedingte Schmerzverläufe",
        "chronic-pain-and-gender-bias": "Chronischer Schmerz und Gender-Bias",
        "pain-management-and-self-advocacy":
          "Schmerzmanagement und Selbstvertretung",
        "basal-metabolism-and-energy-use": "Grundumsatz und Energieverbrauch",
        "hormones-and-metabolic-control": "Hormone und Stoffwechselregulation",
        "cycle-dependent-metabolic-shifts":
          "Zyklusabhängige Stoffwechselverschiebungen",
        "weight-appetite-and-cravings": "Gewicht, Appetit und Heißhunger",
        "metabolic-support-and-nutrition":
          "Stoffwechselunterstützung und Ernährung",
        "cardiovascular-health": "Herz‑Kreislauf‑Gesundheit",
        "autoimmune-and-inflammatory-diseases":
          "Autoimmun- und Entzündungskrankheiten",
        "mental-health-vulnerabilities": "Psychische Verwundbarkeiten",
        "underdiagnosed-conditions": "Unterdiagnostizierte Erkrankungen",
        "prevention-and-early-detection": "Prävention und Früherkennung",
        "cycle-phases-overview": "Überblick über die Zyklusphasen",
        "energy-mood-and-cognition": "Energie, Stimmung und Kognition",
        "immune-and-pain-sensitivity": "Immunsystem und Schmerzempfindlichkeit",
        "metabolism-and-nutrition-needs": "Stoffwechsel- und Ernährungsbedarf",
        "movement-rest-and-recovery": "Bewegung, Ruhe und Regeneration",
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
