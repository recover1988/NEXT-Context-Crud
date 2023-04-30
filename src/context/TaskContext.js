"use client";
import { createContext, useContext } from "react";

// Creando un Contexto
export const TaskContext = createContext();

// Provider por el cual se pasa el contexto a los childrens
export const TaskProvider = ({ children }) => {
    const tasks = [
        {
            id: 1,
            title: "my first task",
            description: "some task",
        },
        {
            id: 2,
            title: "my second task",
            description: "some task",
        },
        {
            id: 3,
            title: "my third task",
            description: "some task",
        },
    ];
    return (
        <TaskContext.Provider value={{ tasks }}>
            {children}
        </TaskContext.Provider>
    );
};

// Hook personalizado para usar el contexto en los componentes
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must used within a provider");
    return context;
};
