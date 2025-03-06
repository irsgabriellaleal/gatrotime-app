import * as Toggle from "@radix-ui/react-toggle";

export function ToggleComponent() {
  return (
    <Toggle.Root>
      <Toggle.Trigger>Click me</Toggle.Trigger>
      <Toggle.Content>Content inside Toggle</Toggle.Content>
    </Toggle.Root>
  );
}