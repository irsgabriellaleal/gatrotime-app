import * as Slot from "@radix-ui/react-slot";

export function SlotComponent() {
  return (
    <Slot.Root>
      <Slot.Trigger>Click me</Slot.Trigger>
      <Slot.Content>Content inside Slot</Slot.Content>
    </Slot.Root>
  );
}