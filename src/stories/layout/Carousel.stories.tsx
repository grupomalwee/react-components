import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CarouselBase,
  type CarouselItem,
} from "@/components/ui/layout/CarouselBase";

const sampleItems: CarouselItem[] = [
  {
    id: 1,
    url: "/pwa-512x512.png",
    title: "MAXX PHAM",
  },
  {
    id: 2,
    url: "/pwa-512x512.png",
    title: "BOXIEN BAY",
  },
  {
    id: 3,
    url: "/pwa-512x512.png",
    title: "AUSIZE MAM",
  },
  {
    id: 4,
    url: "/pwa-512x512.png",
    title: "RECLKTIKA",
  },
  {
    id: 5,
    url: "/pwa-512x512.png",
    title: "SONYPOO",
  },
  {
    id: 6,
    url: "/pwa-512x512.png",
    title: "DONM FLY",
  },
  {
    id: 7,
    url: "/pwa-512x512.png",
    title: "Snowy Mountain Highway",
  },
  {
    id: 8,
    url: "/pwa-512x512.png",
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
    zoomEffect: {
      control: { type: "radio" },
      options: ["lens", "scale", null],
      description: "Efeito de zoom ao passar o mouse ('lens' ou 'scale')",
    },
    isLoading: {
      control: { type: "boolean" },
      description: "Estado de carregamento (skeleton)",
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
export const LensEffect: Story = {
  args: {
    items: sampleItems,
    height: "400px",
    showControls: true,
    showIndicators: true,
    zoomEffect: "lens",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Carousel com efeito de lupa (lens). Use o scroll do mouse para controlar o nível de zoom.",
      },
    },
  },
};

export const ScaleEffect: Story = {
  args: {
    items: sampleItems,
    height: "400px",
    showControls: true,
    showIndicators: true,
    zoomEffect: "scale",
    download: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Carousel com efeito de zoom (scale). Use o scroll do mouse para controlar o zoom.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    items: [],
    height: "400px",
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Estado de carregamento com skeleton animation.",
      },
    },
  },
};
