"use client";
import { createContext, useContext } from "react";

// Creando un Contexto
export const TaskContext = createContext();

// Provider por el cual se pasa el contexto a los childrens
export const TaskProvider = ({ children }) => {
    const tasks = [];
    return (
        <TaskContext.Provider value={{tasks}}>{children}</TaskContext.Provider>
    );
};

// Hook personalizado para usar el contexto en los componentes
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must used within a provider");
    return context;
};
