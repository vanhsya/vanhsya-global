// Utility functions for VANHSYA platform

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const calculateProcessingTime = (serviceType: string): string => {
  const processingTimes: Record<string, string> = {
    'tourist': '7-14 business days',
    'work': '4-8 weeks',
    'study': '6-12 weeks',
    'business': '2-4 weeks',
    'family': '8-16 weeks',
    'permanent': '12-24 months',
  };
  
  return processingTimes[serviceType] || 'Contact us for details';
};

export const getSuccessRateColor = (rate: number): string => {
  if (rate >= 95) return 'text-green-600';
  if (rate >= 85) return 'text-yellow-600';
  return 'text-red-600';
};

export const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const getCountryFlag = (countryCode: string): string => {
  const flags: Record<string, string> = {
    'CA': '🇨🇦',
    'US': '🇺🇸',
    'UK': '🇬🇧',
    'AU': '🇦🇺',
    'DE': '🇩🇪',
    'NZ': '🇳🇿',
    'FR': '🇫🇷',
    'IT': '🇮🇹',
    'ES': '🇪🇸',
    'NL': '🇳🇱',
  };
  
  return flags[countryCode] || '🌍';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'in-review': 'bg-blue-100 text-blue-800',
    'documents-required': 'bg-orange-100 text-orange-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-gray-100 text-gray-800',
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};
