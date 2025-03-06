import * as RadioGroup from "@radix-ui/react-radiogroup";

export function RadioGroupComponent() {
  return (
    <RadioGroup.Root>
      <RadioGroup.Trigger>Click me</RadioGroup.Trigger>
      <RadioGroup.Content>Content inside RadioGroup</RadioGroup.Content>
    </RadioGroup.Root>
  );
}