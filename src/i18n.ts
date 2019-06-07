import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: {
            HOMEPAGE_BUTTON: 'Homepage',
            LOGOUT: 'Logout',
            FOOTER: 'Lecourt ©2019 Created with love by the best developers ever',
            REGISTER: 'Register',
            LOGIN: 'Sign in',
        }
      },
      fr: {
        translations: {
            HOMEPAGE_BUTTON: 'Accueil',
            LOGOUT: 'Déconnexion',
            FOOTER: 'Lecourt ©2019 Créé avec amour par les meilleurs développeurs',
            REGISTER: 'Inscription',
            LOGIN: 'Connexion',
        }
      }
    },
      lng: navigator.language,
    fallbackLng: "fr",

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
