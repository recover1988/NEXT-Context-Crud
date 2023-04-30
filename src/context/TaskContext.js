"use client";
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

// Creando un Contexto
export const TaskContext = createContext();

// Hook personalizado para usar el contexto en los componentes
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must used within a provider");
    return context;
};

// Provider por el cual se pasa el contexto a los childrens
export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
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
    ]);

    const createTask = (title, description) => {
        setTasks([...tasks, { title, description, id: uuid() }]);
    };
    return (
        <TaskContext.Provider value={{ tasks, createTask }}>
            {children}
        </TaskContext.Provider>
    );
};
