"use client";

import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Page = ({ params }) => {
    const { createTask, tasks, updateTask } = useTasks();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateTask(params.id, data);
            toast.success("task updated successfully");
        } else {
            createTask(data.title, data.description);
            toast.success("task create successfully");
        }
        router.push("/");
    });

    useEffect(() => {
        if (params.id) {
            const taskFound = tasks.find((task) => task.id === params.id);
            if (taskFound) {
                setValue("title", taskFound.title);
                setValue("description", taskFound.description);
            }
        }
    }, []);

    return (
        <div className="w-full max-w-xs m-auto mt-10 items-center">
            <form
                className="bg-slate-700 shadow-lg rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={onSubmit}
            >
                <input
                    className="block bg-slate-600 rounded-md px-3 py-2 mb-5 w-full"
                    placeholder="Write a title"
                    {...register("title", { required: true })}
                />
                {errors.title && (
                    <div className="relative bottom-4 text-pink-600 font-medium text-xs ">
                        this field is required
                    </div>
                )}
                <textarea
                    className="block bg-slate-600 rounded-md px-3 py-2 mb-5 w-full"
                    placeholder="Write a description"
                    {...register("description", { required: true })}
                />
                {errors.description && (
                    <span className="relative bottom-4 text-pink-600 font-medium text-xs">
                        this field is required
                    </span>
                )}
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
