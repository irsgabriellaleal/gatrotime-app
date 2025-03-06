import * as DropdownMenu from "@radix-ui/react-dropdownmenu";

export function DropdownMenuComponent() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>Click me</DropdownMenu.Trigger>
      <DropdownMenu.Content>Content inside DropdownMenu</DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}