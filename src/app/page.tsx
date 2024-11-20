import React from "react";
import Navbar from "@/components/NavBar";
import Main from "@/components/Main";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto flex flex-col gap-4 p-4 min-h-[92vh]">
      <Navbar />
      <Main />
    </main>
  );
}
