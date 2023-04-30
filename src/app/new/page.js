"use client";

import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Page = ({ params }) => {
    const router = useRouter();
    const [task, setTask] = useState({
        title: "",
        description: "",
    });
    const { createTask, tasks, updateTask } = useTasks();

    const handleChange = (e) => {
        setTask((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (params.id) {
            updateTask(params.id, task);
        } else {
            createTask(task.title, task.description);
        }
        router.push("/");
    };

    useEffect(() => {
        if (params.id) {
            const taskFound = tasks.find(
                (task) => task.id.toString() === params.id
            );
            if (taskFound)
                setTask({
                    title: taskFound.title,
                    description: taskFound.description,
                });
        }
    }, []);

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
                    value={task.title}
                    onChange={(e) => handleChange(e)}
                />
                <textarea
                    className="bg-slate-600 rounded-md px-3 py-2 mb-5 w-full"
                    placeholder="Write a description"
                    name="description"
                    value={task.description}
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
