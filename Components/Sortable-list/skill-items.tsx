import { CloseOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ISkillItemProps {
  deleteSkillHandler: () => void;
  skillName: string;
  id: string;
}

export const SkillItem = ({
  deleteSkillHandler,
  skillName,
  id,
}: ISkillItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex justify-between items-center h-[3.4rem] w-[80%] px-4 rounded-md bg-[#0D2167]"
    >
      <p className=" text-xl">{skillName}</p>
      <button
        onClick={() => {
          deleteSkillHandler();
        }}
      >
        <CloseOutlined style={{ color: "white" }} />
      </button>
    </div>
  );
};
