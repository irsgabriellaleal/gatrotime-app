import * as Select from "@radix-ui/react-select";

export function SelectComponent() {
  return (
    <Select.Root>
      <Select.Trigger>Click me</Select.Trigger>
      <Select.Content>Content inside Select</Select.Content>
    </Select.Root>
  );
}