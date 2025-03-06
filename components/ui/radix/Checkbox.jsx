import * as Checkbox from "@radix-ui/react-checkbox";

export function CheckboxComponent() {
  return (
    <Checkbox.Root>
      <Checkbox.Trigger>Click me</Checkbox.Trigger>
      <Checkbox.Content>Content inside Checkbox</Checkbox.Content>
    </Checkbox.Root>
  );
}