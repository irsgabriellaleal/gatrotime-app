import * as Separator from "@radix-ui/react-separator";

export function SeparatorComponent() {
  return (
    <Separator.Root>
      <Separator.Trigger>Click me</Separator.Trigger>
      <Separator.Content>Content inside Separator</Separator.Content>
    </Separator.Root>
  );
}