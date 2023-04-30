"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    const router = useRouter();
    return (
        <header className="bg-slate-700 text-green-50 flex items-center justify-between flex-wrap p-5">
            <div className="w-fit rounded px-5 font-mono uppercase hover:bg-slate-500">
                <Link href="/">
                    <h1>TaskApp</h1>
                </Link>
            </div>
            <div className="w-fit rounded px-5 font-mono  hover:bg-slate-500">
                <button onClick={() => router.push("/new")}>Add Task</button>
            </div>
        </header>
    );
};

export default Navbar;
