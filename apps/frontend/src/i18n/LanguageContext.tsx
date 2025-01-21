import { createContext, useContext, useState, ReactNode } from "react";
import { messages as enMessages } from "./en-US";
import { messages as wookieMessages } from "./wrr-WR";

interface LanguageContextType {
  isWookiee: boolean;
  toggleLanguage: () => void;
  currentMessages: Record<string, string>;
  currentLocale: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [isWookiee, setIsWookiee] = useState(false);

  const toggleLanguage = () => {
    setIsWookiee(!isWookiee);
  };

  const value = {
    isWookiee,
    toggleLanguage,
    currentMessages: isWookiee ? wookieMessages : enMessages,
    currentLocale: isWookiee ? "wrr-WR" : "en",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
