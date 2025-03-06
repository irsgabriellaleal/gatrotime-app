import * as AspectRatio from "@radix-ui/react-aspectratio";

export function AspectRatioComponent() {
  return (
    <AspectRatio.Root>
      <AspectRatio.Trigger>Click me</AspectRatio.Trigger>
      <AspectRatio.Content>Content inside AspectRatio</AspectRatio.Content>
    </AspectRatio.Root>
  );
}