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
