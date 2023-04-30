This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

[http://localhost:3000/api/hello](http://localhost:3000/api/hello) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/hello/route.js`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## File System

En la carpeta `app` se genera la estrutura de la aplicacion mediante carpetas que a su vez necesitan un archivo llamando page.js o .ts para indicar que se trata de una pagina.
Para indicar que se espera informacion dinamica por url usamos una carpeta que en su nombre tenga entre corchetes la info que necesitamos como [id]:

```
/app/edit/[id]/page.js   <--

const Page = ({ params }) => {
  return (
    <div>
      editando
      <h3>{params.id}</h3>
    </div>
  );
};

export default Page;

```

Los componentes o paginas en este caso reciben por `props` en la propiedad `params` la informacion que se envia por la url con su nombre en este caso `id`.

## Context

Para usar el contexto primero necesitamos generar el contexto mediante el `createContext` que se importa de react, luego creamos el provider para compartir el contexto a los children y por ultimo usamos el hook personalizado para poder acceder a la informacion desde los componentes.

```
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
```

Se usa la etiqueta 'use client' para indicar que se genera del lado del cliente y no desde el servidor.

## Listar Tareas

Para crear un listado de tareas pedimos la info desde el contexto y luego usamos un `map` para renderizar las tareas mediante un componente al cual se le pasa por props la info de cada tarea.

```
"use client";
import TaskCard from "@/components/TaskCard";
import { useTasks } from "@/context/TaskContext";
import React from "react";

const Page = () => {
    const { tasks } = useTasks();
    return (
        <div>
            {tasks.map((task) => (
                <TaskCard
                    task={task}
                    key={task.id}
                />
            ))}
        </div>
    );
};

export default Page;
```

Los componentes de la lista deben tener su propia `key` que no debe ser duplicada.

Dentro del componente `TaskCard` podemos usar el `useRouter` pero desde navigation, para poders redirigir a la pagina de la tarea mediante el `router.push`

```
import { useRouter } from "next/navigation";
import React from "react";

const TaskCard = ({ task }) => {
    const router = useRouter();
    return (
        <div
            className="bg-slate-800 text-green-300 text-sm w-80 h-auto m-5 rounded-lg p-5 cursor-pointer"
            onClick={() => router.push(`/edit/${task.id}`)}
        >
            <h1 className="uppercase text-lg font-bold">{task.title}</h1>
            <button className="bg-red-700 text-green-50 p-1 rounded-xl w-20">
                Delete
            </button>
            <p className="first-letter:uppercase text-green-500 font-mono h-20">
                {task.description}
            </p>
        </div>
    );
};

export default TaskCard;
```

## Crear Task

Para crear una tarea necesitamos tener el formulario, este maneja un estado donde se guarda toda la info.
Durante el submit se llama una funcion que agregar la tarea al arreglo creado en el contexto.
De el contexto debemos tener una funcion que simplemente agregar la nueva tarea a la funcion para ello creamos un state que maneje lo cambios. Y lo pasamos en el objeto que se comparte del contexto.

```
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

    // Funcion para agregar la nueva tarea al contexto
    const createTask = (title, description) => {
        setTasks([...tasks, { title, description, id: uuid() }]);
    };
    return (
        <TaskContext.Provider value={{ tasks, createTask }}>
            {children}
        </TaskContext.Provider>
    );
};

```

En el formulario usamos un estado para manejar los cambios mediante un objeto que iniciamos vacio y que luego actualizaremos mediante un set.

```
"use client";

import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
    const router = useRouter();
    const [task, setTask] = useState({});
    const { createTask } = useTasks();

    const handleChange = (e) => {
        setTask((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        createTask(task.title, task.description);
        router.push("/");
    };
    return (
        <div className="w-full max-w-xs m-auto mt-10 items-center">
            <form
                className="bg-slate-700 shadow-lg rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
            >
                <input
                    className="bg-slate-600 rounded-md px-3 py-2 mb-5 w-full"
                    placeholder="Write a title"
                    name="title"
                    onChange={(e) => handleChange(e)}
                />
                <textarea
                    className="bg-slate-600 rounded-md px-3 py-2 mb-5 w-full"
                    placeholder="Write a description"
                    name="description"
                    onChange={handleChange}
                />
                <br />
                <button
                    className="w-full rounded-md uppercase cursor-pointer bg-green-700"
                    type="submit"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default Page;
```
