import { Select } from "antd";
import React, { useCallback, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { SkillItem } from "./skill-items";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arraySwap } from "@/Utils/array-swap";

const skillList = [
  { key: 1, label: "HTML" },
  { key: 2, label: "CSS" },
  { key: 3, label: "Bootstrap" },
  { key: 4, label: "TypeScript" },
  { key: 5, label: "VueJs" },
  { key: 6, label: "Angular" },
  { key: 7, label: "NodeJs" },
  { key: 8, label: "NextJs" },
  { key: 9, label: "ReactJs" },
  { key: 10, label: "JavaScript" },
];

export const SortableList = () => {
  const [selectedSkills, setSkills] = useState<Array<string>>([]);
  const deleteSkillHandler = useCallback(
    (skillIndex: number) => {
      setSkills((prevSkills) =>
        prevSkills.filter((skill) => skill !== selectedSkills[skillIndex])
      );
    },
    [selectedSkills]
  );
  return (
    <div className="mt-4">
      <h1 className=" text-white text-[4.5rem] text-center font-semibold mb-8">
        Select your top 5 tech skills
      </h1>
      <div className=" flex items-center justify-center w-[60%] max-w-[45rem] bg-white h-[32rem] mx-auto rounded-xl">
        <div className="flex w-[85%] h-[80%]  ">
          <DndContext
            onDragEnd={({ active, over }) => {
              if (!over) return;

              //* dragging over a different element
              if (active.id !== over.id) {
                const activeIndex = selectedSkills.findIndex(
                  (skill) => skill === active.id
                );
                const overIndex = selectedSkills.findIndex(
                  (skill) => skill === over?.id
                );
                setSkills(() =>
                  arraySwap({
                    items: selectedSkills,
                    from: activeIndex,
                    to: overIndex,
                  })
                );
              }
            }}
          >
            <SortableContext
              items={selectedSkills}
              strategy={verticalListSortingStrategy}
            >
              <div className=" basis-[76%] flex flex-col gap-4">
                {new Array(5).fill("1").map((_, index) => {
                  const isDisabled = selectedSkills.length !== index;
                  const isThisSkill = selectedSkills.length > index;
                  return (
                    <React.Fragment key={uuidV4()}>
                      {!isThisSkill && (
                        <Select
                          style={{ height: "3.4rem" }}
                          className="w-[80%] "
                          options={skillList
                            .filter(
                              (skill) => !selectedSkills.includes(skill.label)
                            )
                            .map((skill) => ({
                              value: skill.label,
                              label: skill.label,
                            }))}
                          listHeight={140}
                          size="large"
                          placeholder="Add Skill"
                          onChange={(value) => {
                            setSkills((prev) => [...prev, value]);
                          }}
                          disabled={isDisabled}
                        />
                      )}
                      {isThisSkill && (
                        <SkillItem
                          key={selectedSkills[index]}
                          id={selectedSkills[index]}
                          deleteSkillHandler={() => deleteSkillHandler(index)}
                          skillName={`${index + 1}. ${selectedSkills[index]}`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
          <div className=" flex-1">
            <h4 className=" mb-3 text-blue-800 font-semibold">
              Suggested skills
            </h4>
            <div className="flex flex-col items-start gap-2">
              {skillList.slice(0, 7).map((skill) => {
                return (
                  <button
                    onClick={() => {
                      setSkills((prev) => [...prev, skill.label]);
                    }}
                    className="text-blue-700 hover:text-blue-300"
                    key={skill.key}
                  >
                    + {skill.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
