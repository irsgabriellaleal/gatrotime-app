import * as Menubar from "@radix-ui/react-menubar";

export function MenubarComponent() {
  return (
    <Menubar.Root>
      <Menubar.Trigger>Click me</Menubar.Trigger>
      <Menubar.Content>Content inside Menubar</Menubar.Content>
    </Menubar.Root>
  );
}