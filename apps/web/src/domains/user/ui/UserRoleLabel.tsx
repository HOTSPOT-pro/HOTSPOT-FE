import { cn } from "@hotspot/ui/lib";
import type { UserRole } from "../model/types";

interface UserRoleLabelProps {
  role: UserRole;
}

const OWNER_STYLE = "border-blue-500 bg-blue-500 text-white";
const PARENT_STYLE = "border-pink-500 bg-pink-500 text-white";
const CHILD_STYLE = "border-green-500 bg-green-500 text-white";

export const UserRoleLabel = ({ role }: UserRoleLabelProps) => {
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
        "inline-flex items-center font-body-body6 p-3 rounded-4 leading-none border",
        role === "OWNER" && OWNER_STYLE,
        role === "PARENT" && PARENT_STYLE,
        role === "CHILD" && CHILD_STYLE,
      )}
    >
      {roleName()}
    </span>
  );
};
