import * as ScrollArea from "@radix-ui/react-scrollarea";

export function ScrollAreaComponent() {
  return (
    <ScrollArea.Root>
      <ScrollArea.Trigger>Click me</ScrollArea.Trigger>
      <ScrollArea.Content>Content inside ScrollArea</ScrollArea.Content>
    </ScrollArea.Root>
  );
}