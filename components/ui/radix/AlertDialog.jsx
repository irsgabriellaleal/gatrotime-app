import * as AlertDialog from "@radix-ui/react-alertdialog";

export function AlertDialogComponent() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>Click me</AlertDialog.Trigger>
      <AlertDialog.Content>Content inside AlertDialog</AlertDialog.Content>
    </AlertDialog.Root>
  );
}