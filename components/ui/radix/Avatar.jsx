import * as Avatar from "@radix-ui/react-avatar";

export function AvatarComponent() {
  return (
    <Avatar.Root>
      <Avatar.Trigger>Click me</Avatar.Trigger>
      <Avatar.Content>Content inside Avatar</Avatar.Content>
    </Avatar.Root>
  );
}