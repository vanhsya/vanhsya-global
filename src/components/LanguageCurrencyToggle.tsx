'use client';

import { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' }
];

interface LanguageCurrencyToggleProps {
  onLanguageChange?: (language: string) => void;
  onCurrencyChange?: (currency: string) => void;
  className?: string;
}

export default function LanguageCurrencyToggle({
  onLanguageChange,
  onCurrencyChange,
  className = ''
}: LanguageCurrencyToggleProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [currentCurrency, setCurrency] = useState<Currency>(currencies[0]);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    const savedCurrency = localStorage.getItem('preferred-currency');

    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        queueMicrotask(() => setCurrentLanguage(language));
      }
    }

    if (savedCurrency) {
      const currency = currencies.find(curr => curr.code === savedCurrency);
      if (currency) {
        queueMicrotask(() => setCurrency(currency));
      }
    }
  }, []);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    setIsLanguageOpen(false);
    localStorage.setItem('preferred-language', language.code);
    onLanguageChange?.(language.code);

    // Here you would typically trigger your i18n system
    // console.log('Language changed to:', language.code);
  };

  const handleCurrencyChange = (currency: Currency) => {
    setCurrency(currency);
    setIsCurrencyOpen(false);
    localStorage.setItem('preferred-currency', currency.code);
    onCurrencyChange?.(currency.code);

    // Here you would typically update your pricing display
    // console.log('Currency changed to:', currency.code);
  };

  const closeAllDropdowns = () => {
    setIsLanguageOpen(false);
    setIsCurrencyOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => closeAllDropdowns();
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLanguageOpen(!isLanguageOpen);
            setIsCurrencyOpen(false);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
          title="Select Language"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{currentLanguage.flag} {currentLanguage.code.toUpperCase()}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isLanguageOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                    currentLanguage.code === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div>
                    <div className="font-medium">{language.name}</div>
                    <div className="text-xs text-gray-500 uppercase">{language.code}</div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Currency Selector */}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsCurrencyOpen(!isCurrencyOpen);
            setIsLanguageOpen(false);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
          title="Select Currency"
        >
          <span className="text-sm font-medium">{currentCurrency.symbol} {currentCurrency.code}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isCurrencyOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencyChange(currency)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                    currentCurrency.code === currency.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg font-bold">{currency.symbol}</span>
                  <div>
                    <div className="font-medium">{currency.code}</div>
                    <div className="text-xs text-gray-500">{currency.name}</div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Currency conversion hook (placeholder - would connect to real API)
export function useCurrency() {
  const [currency, setCurrency] = useState('USD');
  const rates: Record<string, number> = {
    USD: 1,
    CAD: 1.35,
    EUR: 0.85,
    GBP: 0.73,
    AUD: 1.45,
    INR: 83.12
  };

  const convertPrice = (price: number, fromCurrency = 'USD') => {
    const usdPrice = price / rates[fromCurrency];
    return usdPrice * rates[currency];
  };

  const formatPrice = (price: number, fromCurrency = 'USD') => {
    const convertedPrice = convertPrice(price, fromCurrency);
    const currencyObj = currencies.find(c => c.code === currency);
    const symbol = currencyObj?.symbol || '$';
    
    return `${symbol}${convertedPrice.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  return {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    rates
  };
}

// Language context hook (placeholder - would connect to i18n system)
export function useLanguage() {
  const [language, setLanguage] = useState('en');
  
  const t = (key: string, defaultValue?: string) => {
    // In a real implementation, this would look up translations
    // For now, return the default value or key
    return defaultValue || key;
  };

  return {
    language,
    setLanguage,
    t
  };
}
