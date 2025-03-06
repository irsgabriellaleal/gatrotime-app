import * as Accordion from "@radix-ui/react-accordion";

export function AccordionComponent() {
  return (
    <Accordion.Root>
      <Accordion.Trigger>Click me</Accordion.Trigger>
      <Accordion.Content>Content inside Accordion</Accordion.Content>
    </Accordion.Root>
  );
}