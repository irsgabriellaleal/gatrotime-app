import * as Dialog from "@radix-ui/react-dialog";

export function DialogComponent() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Click me</Dialog.Trigger>
      <Dialog.Content>Content inside Dialog</Dialog.Content>
    </Dialog.Root>
  );
}