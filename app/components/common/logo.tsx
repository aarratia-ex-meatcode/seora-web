import { Block } from "@/components/primitives/block";
import { Text } from "@/components/primitives/text";
import { IconBrain } from "@tabler/icons-react";
import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-1.5">
      <Block
        as="span"
        className="text-primary-foreground bg-primary flex size-10 flex-row items-center justify-center rounded-md"
      >
        <IconBrain className="size-5" />
      </Block>
      <Text as="span" size="2xl" weight="bold">
        seora.ai
      </Text>
    </Link>
  );
}

Logo.displayName = "Logo";

export { Logo };
