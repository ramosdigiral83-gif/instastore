import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SettingsContextType = {
  storeName: string;
  setStoreName: (name: string) => void;
  storeLogo: string;
  setStoreLogo: (url: string) => void;
  whatsappNumber: string;
  setWhatsappNumber: (number: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [storeName, setStoreName] = useState<string>(() => {
    return localStorage.getItem('app-store-name') || 'TechStore';
  });
  const [storeLogo, setStoreLogo] = useState<string>(() => {
    return localStorage.getItem('app-store-logo') || '';
  });
  const [whatsappNumber, setWhatsappNumber] = useState<string>(() => {
    return localStorage.getItem('app-whatsapp-number') || '';
  });

  useEffect(() => {
    localStorage.setItem('app-store-name', storeName);
  }, [storeName]);

  useEffect(() => {
    localStorage.setItem('app-store-logo', storeLogo);
  }, [storeLogo]);

  useEffect(() => {
    localStorage.setItem('app-whatsapp-number', whatsappNumber);
  }, [whatsappNumber]);

  return (
    <SettingsContext.Provider value={{ storeName, setStoreName, storeLogo, setStoreLogo, whatsappNumber, setWhatsappNumber }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
