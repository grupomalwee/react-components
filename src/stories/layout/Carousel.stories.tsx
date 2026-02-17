import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import CarouselBase, {
  type CarouselItem,
} from "@/components/ui/layout/CarouselBase";

const sampleItems: CarouselItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1761882835101-02ab45ac0726?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=690",
    title: "MAXX PHAM",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1661980494567-40a5e01b699b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=685",
    title: "BOXIEN BAY",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1761882725885-d3d8bd2032d1?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687",
    title: "AUSIZE MAM",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1761775915848-467e41c1c4db?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=689",
    title: "RECLKTIKA",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1761078980679-e89e25fe279b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687",
    title: "SONYPOO",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1760389005000-bf02bf24f463?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1123",
    title: "DONM FLY",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1761165307495-56bd564d322f?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=663",
    title: "Snowy Mountain Highway",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1756299792672-157811bf1005?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1074",
    title: "FOGGY FOLS",
  },
];

const meta: Meta<typeof CarouselBase> = {
  title: "layout/Carousel",
  component: CarouselBase,
  tags: ["autodocs"],
  args: {
    items: sampleItems,
    height: "400px",
    showControls: true,
    showIndicators: true,
    autoPlay: false,
    autoPlayInterval: 3000,
  },
  argTypes: {
    items: {
      control: { type: "object" },
      description: "Array de items para exibir no carousel",
    },
    width: {
      control: { type: "text" },
      description: "Largura do carousel (ex: 800px, 100%)",
    },
    height: {
      control: { type: "text" },
      description: "Altura do carousel (ex: 400px, 50vh)",
    },
    showControls: {
      control: { type: "boolean" },
      description: "Mostrar botões de navegação anterior/próximo",
    },
    showIndicators: {
      control: { type: "boolean" },
      description: "Mostrar indicadores de progresso (dots)",
    },
    autoPlay: {
      control: { type: "boolean" },
      description: "Ativar reprodução automática",
    },
    autoPlayInterval: {
      control: { type: "number" },
      description: "Intervalo em milissegundos para autoPlay",
    },
    springConfig: {
      control: { type: "object" },
      description: "Configuração de animação do spring (stiffness, damping)",
    },
    className: {
      control: { type: "text" },
    },
    containerClassName: {
      control: { type: "text" },
    },
    imageClassName: {
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Carousel moderno com framer-motion, suportando navegação manual, automática e controles totalmente customizáveis.",
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CarouselBase>;

export const Default: Story = {
  args: {
    items: sampleItems,
    height: "400px",
    showControls: true,
    showIndicators: true,
  },
};

export const AutoPlay: Story = {
  args: {
    items: sampleItems,
    height: "400px",
    showControls: true,
    showIndicators: true,
    autoPlay: true,
    autoPlayInterval: 3000,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel com reprodução automática a cada 3 segundos.",
      },
    },
  },
};

export const NoControls: Story = {
  args: {
    items: sampleItems,
    height: "400px",
    showControls: false,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel sem botões de navegação, apenas indicadores.",
      },
    },
  },
};

export const NoIndicators: Story = {
  args: {
    items: sampleItems,
    height: "400px",
    showControls: true,
    showIndicators: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel sem indicadores de progresso, apenas controles.",
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    items: sampleItems,
    height: "500px",
    showControls: false,
    showIndicators: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel minimalista sem controles ou indicadores.",
      },
    },
  },
};

export const CustomHeight: Story = {
  args: {
    items: sampleItems,
    height: "500px",
    width: "50%",
    showControls: true,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel com altura customizada de 300px.",
      },
    },
  },
};

export const FastAnimation: Story = {
  args: {
    items: sampleItems,
    height: "400px",
    showControls: true,
    showIndicators: true,
    springConfig: {
      stiffness: 600,
      damping: 40,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel com animação mais rápida e responsiva.",
      },
    },
  },
};

export const SlowAnimation: Story = {
  args: {
    items: sampleItems,
    height: "400px",
    showControls: true,
    showIndicators: true,
    springConfig: {
      stiffness: 100,
      damping: 20,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel com animação mais suave e lenta.",
      },
    },
  },
};
