import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../style/global.css";
import { useDrag } from "@/hooks/use-drag";
import SystemTooltip, {
  SystemData,
} from "@/components/ui/charts/components/tooltips/SystemTooltip";

const meta: Meta<typeof SystemTooltip> = {
  title: "charts/System Tooltip",
  component: SystemTooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SystemTooltip>;

export const Default: Story = {
  render: (args) => {
    const { handleMouseDown, getPosition } = useDrag();

    const sampleData: SystemData = {
      name: "ERP Central",
      description: "Sistema principal de gestão de recursos",
      connections: [
        { id: "1", name: "Serviço de Notas", type: "entrada" },
        { id: "2", name: "Gateway de Pagamento", type: "entrada" },
        { id: "3", name: "Logística API", type: "saida" },
        { id: "4", name: "CRM Pro", type: "saida" },
        { id: "5", name: "BI Analytics", type: "saida" },
      ],
    };

    return (
      <div
        style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}
      >
        <SystemTooltip
          {...args}
          id="tooltip-teste"
          data={sampleData}
          position={getPosition("tooltip-teste") || { top: 150, left: 150 }}
          onMouseDown={handleMouseDown}
          onClose={() => console.log("Tooltip fechado")}
        />
      </div>
    );
  },
};

export const Empty: Story = {
  render: (args) => {
    const { handleMouseDown, getPosition } = useDrag();

    const emptyData: SystemData = {
      name: "Sistema Isolado",
      description: "Sem conexões ativas no momento",
      connections: [],
    };

    return (
      <div
        style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}
      >
        <SystemTooltip
          {...args}
          id="tooltip-empty"
          data={emptyData}
          position={getPosition("tooltip-empty") || { top: 150, left: 150 }}
          onMouseDown={handleMouseDown}
          onClose={() => console.log("Tooltip fechado")}
        />
      </div>
    );
  },
};
