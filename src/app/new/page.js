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
