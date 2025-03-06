import * as ToggleGroup from "@radix-ui/react-togglegroup";

export function ToggleGroupComponent() {
  return (
    <ToggleGroup.Root>
      <ToggleGroup.Trigger>Click me</ToggleGroup.Trigger>
      <ToggleGroup.Content>Content inside ToggleGroup</ToggleGroup.Content>
    </ToggleGroup.Root>
  );
}