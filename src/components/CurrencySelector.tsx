'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, DollarSign } from 'lucide-react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  rate: number; // Rate relative to USD
}

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rate: 0.85 },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', rate: 0.73 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', rate: 1.35 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', rate: 1.45 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', rate: 1.35 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', rate: 3.67 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', rate: 83.12 }
];

interface CurrencyContextType {
  selectedCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (usdPrice: number) => number;
  formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);

  useEffect(() => {
    const saved = localStorage.getItem('vanhsya-currency');
    if (saved) {
      const currency = currencies.find(c => c.code === saved);
      if (currency) queueMicrotask(() => setSelectedCurrency(currency));
    }
  }, []);

  const setCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('vanhsya-currency', currency.code);
  };

  const convertPrice = (usdPrice: number) => {
    return usdPrice * selectedCurrency.rate;
  };

  const formatPrice = (usdPrice: number) => {
    const converted = convertPrice(usdPrice);
    return `${selectedCurrency.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

interface CurrencySelectorProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'icon-only';
}

export default function CurrencySelector({ className = '', variant = 'default' }: CurrencySelectorProps) {
  const { selectedCurrency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  if (variant === 'icon-only') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
          title="Change Currency"
        >
          <DollarSign className="w-4 h-4" />
        </button>

        <AnimatePresence>
          {isOpen && (
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
                  onClick={() => {
                    setCurrency(currency);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                    selectedCurrency.code === currency.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{currency.flag}</span>
                  <div>
                    <div className="font-medium">{currency.symbol} {currency.code}</div>
                    <div className="text-xs text-gray-500">{currency.name}</div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`relative inline-block ${className}`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          <span>{selectedCurrency.flag}</span>
          <span>{selectedCurrency.code}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[180px] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => {
                    setCurrency(currency);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm ${
                    selectedCurrency.code === currency.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span>{currency.flag}</span>
                  <span>{currency.code}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
      >
        <span className="text-lg">{selectedCurrency.flag}</span>
        <div className="text-left">
          <div className="text-sm font-medium">{selectedCurrency.symbol} {selectedCurrency.code}</div>
          <div className="text-xs text-white/70">{selectedCurrency.name}</div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[250px] z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  setCurrency(currency);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                  selectedCurrency.code === currency.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{currency.flag}</span>
                <div>
                  <div className="font-medium">{currency.symbol} {currency.code}</div>
                  <div className="text-xs text-gray-500">{currency.name}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
