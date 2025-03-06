import * as ContextMenu from "@radix-ui/react-contextmenu";

export function ContextMenuComponent() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>Click me</ContextMenu.Trigger>
      <ContextMenu.Content>Content inside ContextMenu</ContextMenu.Content>
    </ContextMenu.Root>
  );
}