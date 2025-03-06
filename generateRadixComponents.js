const fs = require("fs");
const path = require("path");

// Lista de componentes do Radix UI que queremos criar
const components = [
  "Accordion",
  "AlertDialog",
  "AspectRatio",
  "Avatar",
  "Checkbox",
  "Collapsible",
  "ContextMenu",
  "Dialog",
  "DropdownMenu",
  "HoverCard",
  "Label",
  "Menubar",
  "NavigationMenu",
  "Popover",
  "Progress",
  "RadioGroup",
  "ScrollArea",
  "Select",
  "Separator",
  "Slider",
  "Slot",
  "Switch",
  "Tabs",
  "Toast",
  "Toggle",
  "ToggleGroup",
  "Tooltip",
];

// Caminho da pasta onde os componentes serão criados
const componentsDir = path.join(__dirname, "components/ui/radix");

// Criar a pasta, caso não exista
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

// Modelo de código para cada componente
const componentTemplate = (
  name
) => `import * as ${name} from "@radix-ui/react-${name.toLowerCase()}";

export function ${name}Component() {
  return (
    <${name}.Root>
      <${name}.Trigger>Click me</${name}.Trigger>
      <${name}.Content>Content inside ${name}</${name}.Content>
    </${name}.Root>
  );
}`;

components.forEach((component) => {
  const filePath = path.join(componentsDir, `${component}.jsx`);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, componentTemplate(component), "utf8");
    console.log(`✅ Componente ${component} criado com sucesso!`);
  } else {
    console.log(`⚠️ Componente ${component} já existe, ignorando...`);
  }
});

console.log("🚀 Todos os componentes foram gerados com sucesso!");
