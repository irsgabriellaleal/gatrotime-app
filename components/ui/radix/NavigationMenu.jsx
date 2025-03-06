import * as NavigationMenu from "@radix-ui/react-navigationmenu";

export function NavigationMenuComponent() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.Trigger>Click me</NavigationMenu.Trigger>
      <NavigationMenu.Content>Content inside NavigationMenu</NavigationMenu.Content>
    </NavigationMenu.Root>
  );
}