import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Check localStorage or default to Indonesian
        const saved = localStorage.getItem('language');
        if (saved && (saved === 'id' || saved === 'en')) {
            return saved;
        }
        return 'id'; // Default to Indonesian
    });

    useEffect(() => {
        // Save language preference to localStorage
        localStorage.setItem('language', language);
        // Also set html lang attribute for accessibility
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'id' ? 'en' : 'id');
    };

    const t = (key, params = {}) => {
        // Support nested key access like 'hero.title' or 'nav.home'
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to Indonesian if key not found
                let fallback = translations.id;
                for (const fk of keys) {
                    if (fallback && typeof fallback === 'object' && fk in fallback) {
                        fallback = fallback[fk];
                    } else {
                        return key; // Return key if not found
                    }
                }
                value = fallback;
                break;
            }
        }

        if (typeof value !== 'string') {
            return key; // Return key if value is not a string
        }

        // Replace placeholders with params
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
            return params[paramKey] !== undefined ? params[paramKey] : match;
        });
    };

    const value = {
        language,
        setLanguage,
        toggleLanguage,
        t,
        translations: translations[language],
        isIndonesian: language === 'id',
        isEnglish: language === 'en',
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;

