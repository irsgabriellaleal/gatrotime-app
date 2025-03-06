import * as Switch from "@radix-ui/react-switch";

export function SwitchComponent() {
  return (
    <Switch.Root>
      <Switch.Trigger>Click me</Switch.Trigger>
      <Switch.Content>Content inside Switch</Switch.Content>
    </Switch.Root>
  );
}