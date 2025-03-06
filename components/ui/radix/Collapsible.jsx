import * as Collapsible from "@radix-ui/react-collapsible";

export function CollapsibleComponent() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>Click me</Collapsible.Trigger>
      <Collapsible.Content>Content inside Collapsible</Collapsible.Content>
    </Collapsible.Root>
  );
}