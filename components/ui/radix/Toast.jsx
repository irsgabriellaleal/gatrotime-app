import * as Toast from "@radix-ui/react-toast";

export function ToastComponent() {
  return (
    <Toast.Root>
      <Toast.Trigger>Click me</Toast.Trigger>
      <Toast.Content>Content inside Toast</Toast.Content>
    </Toast.Root>
  );
}