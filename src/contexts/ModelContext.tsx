import React, { createContext, useContext, useState } from "react";

type ModelType = "llama3" | "qwen2-math";

interface ModelContextType {
  model: ModelType;
  setModel: React.Dispatch<React.SetStateAction<ModelType>>;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const ModelProvider = ({ children }: { children: React.ReactNode }) => {
  const [model, setModel] = useState<ModelType>("llama3");
  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModelContext = () => {
  const context = useContext(ModelContext);
  if (!context) throw new Error("useModelContext deve ser usado dentro de ModelProvider");
  return context;
};
