"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';


interface GlobalContextType {
  globalCode: string; 
  setGlobalCode: (value: string) => void;
}

// Crea el contexto con un valor predeterminado
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Crea un proveedor de contexto
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalCode, setGlobalCode] = useState<string>(''); // Inicializa tu estado global aquí

  return (
    <GlobalContext.Provider value={{ globalCode, setGlobalCode }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
