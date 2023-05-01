"use client";
import TaskCard from "@/components/TaskCard";
import { useTasks } from "@/context/TaskContext";
import React from "react";

const Page = () => {
    const { tasks } = useTasks();
    return (
        <div className="w-full max-w-xs m-auto mt-5 items-center">
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
