"use client";

import { SortableList } from "@/Components/Sortable-list";
import { useState } from "react";

const components = [{ id: 1, component: SortableList }];

export default function Home() {
  const [selectedComponent, setComponent] = useState<number | null>(null);
  return (
    <main className=" ">
      {!selectedComponent && (
        <h1 className=" text-center bg-clip-text text-[6rem] text-transparent font-semibold bg-gradient-to-r to-[#fc00ff] from-[#00dbde]">
          UI Challenges
        </h1>
      )}
      <section className="mx-auto  w-[85%] ">
        {!selectedComponent && (
          <div className="mt-10">
            <button
              onClick={() => setComponent(1)}
              className="px-2 py-8 w-[16rem] border-2 border-white/15 rounded-md transition-all hover:shadow-md hover:shadow-white/50"
            >
              <h3 className="  text-3xl font-sans">Sortable List</h3>
            </button>
          </div>
        )}
        {selectedComponent &&
          components.map((component) => {
            if (component.id == selectedComponent) {
              return <component.component key={component.id} />;
            }
          })}
      </section>
    </main>
  );
}
