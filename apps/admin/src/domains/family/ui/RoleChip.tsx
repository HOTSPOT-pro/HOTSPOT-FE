import { cn } from "@hotspot/ui/lib";
import type { FAMILY_ROLE } from "../model/types";

interface RoleChipProps {
  role: FAMILY_ROLE;
}

const OWNER_STYLE = "border-sky-300 text-sky-600";
const PARENT_STYLE = "border-purple-300 text-purple-600";
const CHILD_STYLE = "border-lime-300 text-lime-600";

export const RoleChip = ({ role }: RoleChipProps) => {
  const roleName = () => {
    switch (role) {
      case "OWNER":
        return "대표";
      case "PARENT":
        return "부모";
      case "CHILD":
        return "자녀";
      default:
        return "알 수 없음";
    }
  };

  return (
    <span
      className={cn(
        "font-body-body6 p-3 border-2 rounded-4",
        role === "OWNER" && OWNER_STYLE,
        role === "PARENT" && PARENT_STYLE,
        role === "CHILD" && CHILD_STYLE,
      )}
    >
      {roleName()}
    </span>
  );
};
