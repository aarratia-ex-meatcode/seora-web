import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IconUserCircle } from "@tabler/icons-react";
import { useUserStore } from "~/stores/user";

const PROFILE_DROPDOWN_ITEMS = [
  {
    label: "Perfil",
    icon: IconUserCircle,
    href: "/dashboard/profile",
  },
];

function ProfileDropdown() {
  const { user } = useUserStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <IconUserCircle />
          Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <IconUserCircle />
          Perfil
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProfileDropdown };

