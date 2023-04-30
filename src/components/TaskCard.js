import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import React from "react";

const TaskCard = ({ task }) => {
    const router = useRouter();
    const { deleteTask } = useTasks();
    return (
        <div
            className="bg-slate-800 text-green-300 text-sm w-80 h-auto m-5 rounded-lg p-5 cursor-pointer"
            onClick={() => router.push(`/edit/${task.id}`)}
        >
            <h1 className="uppercase text-lg font-bold">{task.title}</h1>
            <button
                type="button"
                className="bg-red-700 text-green-50 p-1 rounded-xl w-20"
                onClick={(e) => {
                    e.stopPropagation();
                    const accept = window.confirm("Are you sure?");
                    if (accept) deleteTask(task.id);
                }}
            >
                Delete
            </button>
            <p className="first-letter:uppercase text-green-500 font-mono h-20">
                {task.description}
            </p>
        </div>
    );
};

export default TaskCard;
