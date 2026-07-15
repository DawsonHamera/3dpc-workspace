import React, { createContext, useContext, useState } from "react";

type OneSignalContextType = {
  oneSignalReady: boolean;
  setOneSignalReady: React.Dispatch<React.SetStateAction<boolean>>;
};

export const OneSignalContext = createContext<OneSignalContextType>({
  oneSignalReady: false,
  setOneSignalReady: () => {},
});

export const useOneSignalReady = () => useContext(OneSignalContext);

export const OneSignalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [oneSignalReady, setOneSignalReady] = useState(false);
  return (
    <OneSignalContext.Provider value={{ oneSignalReady, setOneSignalReady }}>
      {children}
    </OneSignalContext.Provider>
  );
};
