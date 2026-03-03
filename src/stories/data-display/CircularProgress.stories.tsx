import CircularProgress from "@/components/ui/data/CircularProgress";
import { Meta, StoryObj } from "@storybook/react-vite/*";

const meta: Meta<typeof CircularProgress> = {
    title: "data/CircularProgress",
    component: CircularProgress,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Indicador circular animado com Framer Motion. A cor do traço muda automaticamente de acordo com o valor: **verde** acima do limiar médio, **amarelo** acima do limiar baixo e **vermelho** abaixo dele.",
            },
        },
        layout: "centered",
    },
    argTypes: {
        value: {
            control: { type: "range", min: 0, max: 100, step: 1 },
            description: "Valor atual do progresso.",
        },
        max: {
            control: { type: "number" },
            description: "Valor máximo. Padrão: 100.",
        },
        min: {
            control: { type: "number" },
            description: "Valor mínimo. Padrão: 0.",
        },
        size: {
            control: { type: "select" },
            options: ["sm", "md", "lg", "xl"],
            description: "Tamanho do componente.",
        },
        showValue: {
            control: "boolean",
            description: "Exibir o valor percentual no centro.",
        },
        label: {
            control: "text",
            description: "Texto exibido abaixo do círculo.",
        },
        disableAnimation: {
            control: "boolean",
            description: "Desabilita todas as animações.",
        },
        midThreshold: {
            control: { type: "range", min: 0, max: 100, step: 1 },
            description: "Percentual abaixo do qual o traço fica amarelo (verde → amarelo).",
        },
        lowThreshold: {
            control: { type: "range", min: 0, max: 100, step: 1 },
            description: "Percentual abaixo do qual o traço fica vermelho (amarelo → vermelho).",
        },
        formatValue: {
            control: false,
            description: "Função customizada para formatar o valor exibido.",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 75,
        max: 100,
        min: 0,
        size: "md",
        showValue: true,
        disableAnimation: false,
        midThreshold: 50,
        lowThreshold: 10,
    },
};

export const Alto: Story = {
    args: { value: 90, label: "Desempenho" },
};

export const Medio: Story = {
    args: { value: 35, label: "Progresso" },
};

export const Baixo: Story = {
    args: { value: 6, label: "Bateria" },
};

export const Tamanhos: Story = {
    render: () => (
        <div className="flex items-end gap-6">
            <CircularProgress value={60} size="sm" label="sm" />
            <CircularProgress value={60} size="md" label="md" />
            <CircularProgress value={60} size="lg" label="lg" />
            <CircularProgress value={60} size="xl" label="xl" />
        </div>
    ),
};

export const SemValor: Story = {
    name: "Sem valor central",
    args: { value: 65, showValue: false, label: "Carregando..." },
};

export const SemAnimacao: Story = {
    name: "Sem animação",
    args: { value: 80, disableAnimation: true, label: "Estático" },
};

export const FormatoCustomizado: Story = {
    name: "Formato customizado",
    args: {
        value: 42,
        max: 200,
        formatValue: (pct) => `${pct} pts`,
        label: "Pontuação",
    },
};

export const LimiaresCustomizados: Story = {
    name: "Limiares customizados",
    render: () => (
        <div className="flex items-end gap-6">
            <CircularProgress value={80} midThreshold={90} lowThreshold={70} label="Crit. alto" />
            <CircularProgress value={55} midThreshold={90} lowThreshold={70} label="Atenção" />
            <CircularProgress value={40} midThreshold={90} lowThreshold={70} label="Crítico" />
        </div>
    ),
};

export const GradeCompleta: Story = {
    name: "Grade de valores",
    render: () => (
        <div className="grid grid-cols-5 gap-4 p-4">
            {[0, 5, 10, 25, 50, 60, 75, 85, 95, 100].map((v) => (
                <CircularProgress key={v} value={v} size="sm" label={`${v}`} disableAnimation />
            ))}
        </div>
    ),
};