import { createContext, useContext, useState } from "react";

const FailToggleContext = createContext<{
  fail: boolean;
  setFail: (fail: boolean) => void;
}>({ fail: false, setFail: () => {} });

export const useFailToggleContext = () => {
  const context = useContext(FailToggleContext);

  if (!context) {
    throw new Error(
      "useFailToggleContext must be used within a FailToggleProvider",
    );
  }

  return context;
};

export const FailToggleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fail, setFail] = useState(false);

  return (
    <FailToggleContext.Provider value={{ fail, setFail }}>
      {children}
    </FailToggleContext.Provider>
  );
};
