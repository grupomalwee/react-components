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
    fernando: {
      control: { type: "color" },
      description: "Cor customizada para os controles e indicadores",
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
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

const items = [
  { id: 1, url: "/img1.png", title: "Item 1" },
  { id: 2, url: "/img2.png", title: "Item 2" },
  { id: 3, url: "/img3.png", title: "Item 3" },
];

export default function Default() {
  return (
    <CarouselBase
      items={items}
      showControls={true}
      showIndicators={true}
      height="400px"
    />
  );
}
`,
      },
    },
  },
};

export const AutoPlay: Story = {
  args: {
    items: sampleItems,

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
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

const items = [ ... ];

export default function AutoPlay() {
  return (
    <CarouselBase
      items={items}
      autoPlay={true}
      autoPlayInterval={3000}
      height="400px"
    />
  );
}
`,
      },
    },
  },
};

export const NoControls: Story = {
  args: {
    items: sampleItems,

    showControls: false,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel sem botões de navegação, apenas indicadores.",
      },
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

const items = [ ... ];

export default function NoControls() {
  return (
    <CarouselBase
      items={items}
      showControls={false}
      showIndicators={true}
      height="400px"
    />
  );
}
`,
      },
    },
  },
};

export const NoIndicators: Story = {
  args: {
    items: sampleItems,

    showControls: true,
    showIndicators: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel sem indicadores de progresso, apenas controles.",
      },
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

const items = [ ... ];

export default function NoIndicators() {
  return (
    <CarouselBase
      items={items}
      showControls={true}
      showIndicators={false}
      height="400px"
    />
  );
}
`,
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
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

const items = [ ... ];

export default function Minimal() {
  return (
    <CarouselBase
      items={items}
      showControls={false}
      showIndicators={false}
      height="400px"
    />
  );
}
`,
      },
    },
  },
};

export const CustomHeight: Story = {
  args: {
    items: sampleItems,
    width: "50%",
    showControls: true,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel com altura customizada de 300px.",
      },
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

const items = [ ... ];

export default function CustomHeight() {
  return (
    <CarouselBase
      items={items}
      height="500px"
      width="50%"
    />
  );
}
`,
      },
    },
  },
};

export const FastAnimation: Story = {
  args: {
    items: sampleItems,

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
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

const items = [ ... ];

export default function FastAnimation() {
  return (
    <CarouselBase
      items={items}
      springConfig={{ stiffness: 600, damping: 40 }}
      height="400px"
    />
  );
}
`,
      },
    },
  },
};

export const SlowAnimation: Story = {
  args: {
    items: sampleItems,

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
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

const items = [ ... ];

export default function SlowAnimation() {
  return (
    <CarouselBase
      items={items}
      springConfig={{ stiffness: 100, damping: 20 }}
      height="400px"
    />
  );
}
`,
      },
    },
  },
};
export const LensEffect: Story = {
  args: {
    items: sampleItems,

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
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

const items = [ ... ];

export default function LensEffect() {
  return (
    <CarouselBase
      items={items}
      zoomEffect="lens"
      height="400px"
    />
  );
}
`,
      },
    },
  },
};

export const ScaleEffect: Story = {
  args: {
    items: sampleItems,

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
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

const items = [ ... ];

export default function ScaleEffect() {
  return (
    <CarouselBase
      items={items}
      zoomEffect="scale"
      download={true}
      height="400px"
    />
  );
}
`,
      },
    },
  },
};

export const Loading: Story = {
  args: {
    items: [],

    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Estado de carregamento com skeleton animation.",
      },
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

export default function Loading() {
  return (
    <CarouselBase
      items={[]}
      isLoading={true}
      height="400px"
    />
  );
}
`,
      },
    },
  },
};

export const ComPropFernando: Story = {
  args: {
    items: sampleItems,
    showControls: true,
    showIndicators: true,
    fernando: "#8b5cf6", // Um tom de roxo (Violet 500)
  },
  parameters: {
    docs: {
      description: {
        story:
          "Carousel utilizando a prop 'fernando' para customizar a cor dos controles e indicadores.",
      },
      source: {
        code: `import React from 'react';
import { CarouselBase } from '@mlw-packages/react-components';

const items = [ ... ];

export default function ComPropFernando() {
  return (
    <CarouselBase
      items={items}
      showControls={true}
      showIndicators={true}
      fernando="#8b5cf6"
      height="400px"
    />
  );
}
`,
      },
    },
  },
};
