import * as Label from "@radix-ui/react-label";

export function LabelComponent() {
  return (
    <Label.Root>
      <Label.Trigger>Click me</Label.Trigger>
      <Label.Content>Content inside Label</Label.Content>
    </Label.Root>
  );
}