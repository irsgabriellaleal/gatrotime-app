import * as Tabs from "@radix-ui/react-tabs";

export function TabsComponent() {
  return (
    <Tabs.Root>
      <Tabs.Trigger>Click me</Tabs.Trigger>
      <Tabs.Content>Content inside Tabs</Tabs.Content>
    </Tabs.Root>
  );
}