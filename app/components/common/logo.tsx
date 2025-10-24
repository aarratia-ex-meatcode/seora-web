import { Text } from "@/components/primitives/text";
import { IconBrain } from "@tabler/icons-react";
import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-1.5">
      <IconBrain />
      <Text as="span" size="2xl" weight="bold">
        seora.ai
      </Text>
    </Link>
  );
}

Logo.displayName = "Logo";

export { Logo };
