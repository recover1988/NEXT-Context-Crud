"use client";
import { useContext } from "react";
import { useTasks } from "../../context/TaskContext";

const page = () => {
    const {tasks} = useTasks();
    console.log(tasks);
    return <div>About page</div>;
};

export default page;
