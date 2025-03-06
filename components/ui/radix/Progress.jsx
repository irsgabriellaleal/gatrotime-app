import * as Progress from "@radix-ui/react-progress";

export function ProgressComponent() {
  return (
    <Progress.Root>
      <Progress.Trigger>Click me</Progress.Trigger>
      <Progress.Content>Content inside Progress</Progress.Content>
    </Progress.Root>
  );
}