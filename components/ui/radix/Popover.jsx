import * as Popover from "@radix-ui/react-popover";

export function PopoverComponent() {
  return (
    <Popover.Root>
      <Popover.Trigger>Click me</Popover.Trigger>
      <Popover.Content>Content inside Popover</Popover.Content>
    </Popover.Root>
  );
}