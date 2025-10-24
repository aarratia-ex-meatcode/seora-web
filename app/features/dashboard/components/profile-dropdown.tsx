import { Block } from "@/components/primitives/block";
import { Text } from "@/components/primitives/text";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/stores/user";
import type { Icon } from "@tabler/icons-react";
import { IconChevronDown, IconCreditCard, IconLogout, IconNotification, IconUserCircle } from "@tabler/icons-react";
import { Link } from "react-router";

interface ProfileDropdownItem {
  label: string;
  icon: Icon;
  href: string;
}

const PROFILE_DROPDOWN_ITEMS: ProfileDropdownItem[] = [
  {
    label: "Perfil",
    icon: IconUserCircle,
    href: "/dashboard/profile",
  },
  {
    label: "Facturación",
    icon: IconCreditCard,
    href: "/dashboard/billing",
  },
  {
    label: "Notificaciones",
    icon: IconNotification,
    href: "/dashboard/notifications",
  },
];

function ProfileDropdown() {
  const { user } = useUserStore();

  const userName = user?.name || "John Doe";
  const userEmail = user?.email || "john.doe@gmail.com";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="shadow-none">
          <IconUserCircle />
          {userName}
          <IconChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="max-w-92 min-w-64 rounded-md shadow-none"
      >
        <DropdownMenuLabel>
          <Block className="flex flex-col">
            <Text
              as="span"
              variant="default"
              size="sm"
              weight="medium"
              className="truncate"
            >
              {userName}
            </Text>
            <Text as="span" variant="muted" size="xs" className="truncate">
              {userEmail}
            </Text>
          </Block>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {PROFILE_DROPDOWN_ITEMS.map(item => (
          <DropdownMenuItem key={item.label} asChild>
            <Link to={item.href}>
              <item.icon />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/logout">
            <IconLogout />
            Cerrar sesión
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProfileDropdown };

