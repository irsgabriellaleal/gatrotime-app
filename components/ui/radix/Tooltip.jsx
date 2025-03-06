import * as Tooltip from "@radix-ui/react-tooltip";

export function TooltipComponent() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>Click me</Tooltip.Trigger>
      <Tooltip.Content>Content inside Tooltip</Tooltip.Content>
    </Tooltip.Root>
  );
}