import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Find Daily Wage Work Near You",
      "find_work": "Find Jobs (10km)",
      "hire_worker": "Hire Workers",
      "get_directions": "Get Route to Owner",
      "enter_mobile": "Mobile Number",
      "get_otp": "Get OTP",
      "verify_otp": "Verify & Login",
      "call_owner": "Call Owner"
    }
  },
  te: {
    translation: {
      "welcome": "మీకు దగ్గరలో ఉన్న రోజువారీ కూలీ పనులను కనుగొనండి",
      "find_work": "పనులు వెతకండి (10 కి.మీ చుట్టుపక్కల)",
      "hire_worker": "పనివారిని నియమించుకోండి",
      "get_directions": "యజమాని వద్దకు దారి చూడు",
      "enter_mobile": "ఫోన్ నంబర్",
      "get_otp": "OTP పొందండి",
      "verify_otp": "లాగిన్ అవ్వండి",
      "call_owner": "ఫోన్ చేయండి"
    }
  },
  hi: {
    translation: {
      "welcome": "अपने पास दैनिक मजदूरी का काम खोजें",
      "find_work": "काम खोजें (10 किमी दायरे में)",
      "hire_worker": "मजदूर काम पर रखें",
      "get_directions": "मालिक के स्थान का रास्ता देखें",
      "enter_mobile": "मोबाइल नंबर",
      "get_otp": "OTP प्राप्त करें",
      "verify_otp": "सत्यापित करें और लॉगिन करें",
      "call_owner": "कॉल करें"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "te",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
