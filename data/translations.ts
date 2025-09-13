export const supportedLanguages = [
    { code: 'en-US', name: 'English' },
    { code: 'hi-IN', name: 'हिन्दी' },
    { code: 'bn-IN', name: 'বাংলা' },
    { code: 'te-IN', name: 'తెలుగు' },
    { code: 'mr-IN', name: 'मराठी' },
    { code: 'ta-IN', name: 'தமிழ்' },
    { code: 'ur-IN', name: 'اردو' },
    { code: 'gu-IN', name: 'ગુજરાતી' },
    { code: 'kn-IN', name: 'ಕನ್ನಡ' },
    { code: 'or-IN', name: 'ଓଡ଼ିଆ' },
    { code: 'ml-IN', name: 'മലയാളം' },
    { code: 'pa-IN', name: 'ਪੰਜਾਬੀ' },
    { code: 'as-IN', name: 'অসমীয়া' },
    { code: 'mai-IN', name: 'मैथिली' },
    { code: 'sat-IN', name: 'ᱥᱟᱱᱛᱟᱲᱤ' },
];

type TranslationDict = {
    [langCode: string]: string;
};

type Translations = {
    [key: string]: TranslationDict;
};

// Add sample translations for demonstration
export const translations: Translations = {
    // Welcome Page
    'welcome_user': { 'en-US': 'Welcome, {name}!', 'hi-IN': 'स्वागत है, {name}!', 'te-IN': 'స్వాగతం, {name}!' },
    'what_today': { 'en-US': 'What would you like to do today?', 'hi-IN': 'आज आप क्या करना चाहेंगे?', 'te-IN': 'ఈరోజు మీరు ఏమి చేయాలనుకుంటున్నారు?' },
    'health_forecast': { 'en-US': 'HealthCast', 'hi-IN': 'हेल्थकास्ट', 'te-IN': 'హెల్త్‌కాస్ట్' },
    'health_forecast_desc': { 'en-US': 'Your daily health forecast', 'hi-IN': 'आपका दैनिक स्वास्थ्य पूर्वानुमान', 'te-IN': 'మీ రోజువారీ ఆరోగ్య సూచన' },
    'area_scan': { 'en-US': 'Area Scan', 'hi-IN': 'क्षेत्र स्कैन', 'te-IN': 'ఏరియా స్కాన్' },
    'area_scan_desc': { 'en-US': 'Analyze surroundings for risks', 'hi-IN': 'जोखिमों के लिए परिवेश का विश्लेषण करें', 'te-IN': 'ప్రమాదాల కోసం పరిసరాలను విశ్లేషించండి' },
    'symptom_checker': { 'en-US': 'Symptom Checker', 'hi-IN': 'लक्षण परीक्षक', 'te-IN': 'లక్షణాల తనిఖీ' },
    'symptom_checker_desc': { 'en-US': 'Get AI-driven insights', 'hi-IN': 'एआई-संचालित अंतर्दृष्टि प्राप्त करें', 'te-IN': 'AI-ఆధారిత అంతర్దృష్టులను పొందండి' },
    'script_reader': { 'en-US': 'Script Reader', 'hi-IN': 'स्क्रिप्ट रीडर', 'te-IN': 'స్క్రిప్ట్ రీడర్' },
    'script_reader_desc': { 'en-US': 'Interpret prescriptions easily', 'hi-IN': 'नुस्खे की आसानी से व्याख्या करें', 'te-IN': 'ప్రిస్క్రిప్షన్‌లను సులభంగా అర్థం చేసుకోండి' },
    'water_log': { 'en-US': 'Water Log', 'hi-IN': 'पानी का लॉग', 'te-IN': 'వాటర్ లాగ్' },
    'water_log_desc': { 'en-US': 'Track your daily intake', 'hi-IN': 'अपने दैनिक सेवन को ट्रैक करें', 'te-IN': 'మీ రోజువారీ వినియోగాన్ని ట్రాక్ చేయండి' },
    'mind_check': { 'en-US': 'Mind Check', 'hi-IN': 'माइंड चेक', 'te-IN': 'మైండ్ చెక్' },
    'mind_check_desc': { 'en-US': 'Reflect on your well-being', 'hi-IN': 'अपनी भलाई पर चिंतन करें', 'te-IN': 'మీ శ్రేయస్సును ప్రతిబింబించండి' },
    
    // Sidebar
    'dashboard': { 'en-US': 'Dashboard', 'hi-IN': 'डैशबोर्ड', 'te-IN': 'డాష్‌బోర్డ్' },
    'activity_history': { 'en-US': 'Activity History', 'hi-IN': 'गतिविधि इतिहास', 'te-IN': 'కార్యాచరణ చరిత్ర' },
    'my_profile': { 'en-US': 'My Profile', 'hi-IN': 'मेरी प्रोफाइल', 'te-IN': 'నా ప్రొఫైల్' },
    'admin_dashboard': { 'en-US': 'Admin Dashboard', 'hi-IN': 'एडमिन डैशबोर्ड', 'te-IN': 'అడ్మిన్ డాష్‌బోర్డ్' },
    'feedback_review': { 'en-US': 'Feedback & Review', 'hi-IN': 'प्रतिक्रिया और समीक्षा', 'te-IN': 'అభిప్రాయం & సమీక్ష' },
    'logout': { 'en-US': 'Logout', 'hi-IN': 'लॉग आउट', 'te-IN': 'లాగ్ అవుట్' },
    'language': { 'en-US': 'Language', 'hi-IN': 'भाषा', 'te-IN': 'భాష' },
    
    // Homepage
    'about': { 'en-US': 'About', 'hi-IN': 'हमारे बारे में', 'te-IN': 'మా గురించి' },
    'contact': { 'en-US': 'Contact', 'hi-IN': 'संपर्क', 'te-IN': 'సంప్రదించండి' },
    'login': { 'en-US': 'Login', 'hi-IN': 'लॉग इन करें', 'te-IN': 'లాగిన్' },
    'explore_globe': { 'en-US': 'Explore the Globe', 'hi-IN': 'ग्लोब का अन्वेषण करें', 'te-IN': 'గ్లోబ్‌ను అన్వేషించండి' },
    'get_started': { 'en-US': 'Get Started', 'hi-IN': 'शुरू करें', 'te-IN': 'ప్రారంభించండి' },
    'homepage_subtitle': {'en-US': 'Explore the globe, uncover hidden environmental risks, and protect communities with AI-powered health insights.', 'hi-IN': 'ग्लोब का अन्वेषण करें, छिपे हुए पर्यावरणीय जोखिमों को उजागर करें, और एआई-संचालित स्वास्थ्य अंतर्दृष्टि के साथ समुदायों की रक्षा करें।', 'te-IN': 'గ్లోబ్‌ను అన్వేషించండి, దాచిన పర్యావరణ ప్రమాదాలను వెలికితీయండి మరియు AI-ఆధారిత ఆరోగ్య అంతర్దృష్టులతో సంఘాలను రక్షించండి.'},
};
