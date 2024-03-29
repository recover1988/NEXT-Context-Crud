"use client";
import { useLocalStorage } from "@/hooks/useLocalstorage";
import { createContext, useContext } from "react";
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
    const [tasks, setTasks] = useLocalStorage("tasks", []);

    // Funcion para agregar la nueva tarea al contexto
    const createTask = (title, description) => {
        setTasks([...tasks, { title, description, id: uuid() }]);
    };

    // Funcion para borrar una tarea
    const deleteTask = (id) => {
        setTasks([...tasks.filter((task) => task.id !== id)]);
    };

    // Funcion para actualizar una tarea
    const updateTask = (id, newData) => {
        setTasks([
            ...tasks.map((task) =>
                task.id === id ? { ...task, ...newData } : task
            ),
        ]);
    };

    return (
        <TaskContext.Provider
            value={{ tasks, createTask, deleteTask, updateTask }}
        >
            {children}
        </TaskContext.Provider>
    );
};
