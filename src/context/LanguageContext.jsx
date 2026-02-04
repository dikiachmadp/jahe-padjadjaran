import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const { i18n, t } = useTranslation();

    const language = i18n.language || 'id';
    const isIndonesian = language === 'id';
    const isEnglish = language === 'en';

    const toggleLanguage = () => {
        const newLang = isIndonesian ? 'en' : 'id';
        i18n.changeLanguage(newLang);
    };

    const setLanguage = (lang) => {
        if (lang === 'id' || lang === 'en') {
            i18n.changeLanguage(lang);
        }
    };

    const value = {
        language,
        setLanguage,
        toggleLanguage,
        t,
        translations: i18n.getDataByLanguage(language)?.translation || {},
        isIndonesian,
        isEnglish,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;

