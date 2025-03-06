import * as Slider from "@radix-ui/react-slider";

export function SliderComponent() {
  return (
    <Slider.Root>
      <Slider.Trigger>Click me</Slider.Trigger>
      <Slider.Content>Content inside Slider</Slider.Content>
    </Slider.Root>
  );
}