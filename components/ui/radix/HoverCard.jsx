import * as HoverCard from "@radix-ui/react-hovercard";

export function HoverCardComponent() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>Click me</HoverCard.Trigger>
      <HoverCard.Content>Content inside HoverCard</HoverCard.Content>
    </HoverCard.Root>
  );
}