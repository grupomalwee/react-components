import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CarouselBase,
  CarouselContentBase,
  CarouselItemBase,
  CarouselNextBase,
  CarouselPrevious,
} from "../components/ui/CarouselBase";
import { CardBase, CardContentBase } from "../components/ui/CardBase";

const meta: Meta<typeof CarouselBase> = {
  title: "layout/Carousel",
  component: CarouselBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Carousel para navegação de imagens ou cards, horizontal, vertical e responsivo.",
      },
      source: {
        code: `import React from 'react';
import { CarouselBase, CarouselContentBase, CarouselItemBase, CarouselPrevious, CarouselNextBase } from '@mlw-packages/react-components';
import { CardBase, CardContentBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <CarouselBase className="w-full max-w-xs">
      <CarouselContentBase>
        <CarouselItemBase>
          <CardBase>
            <CardContentBase className="p-6">Item</CardContentBase>
          </CardBase>
        </CarouselItemBase>
      </CarouselContentBase>
      <CarouselPrevious />
      <CarouselNextBase />
    </CarouselBase>
  );
}
`,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CarouselBase>;

export const Horizontal: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CarouselBase, CarouselContentBase, CarouselItemBase, CarouselPrevious, CarouselNextBase } from '@mlw-packages/react-components';
import { CardBase, CardContentBase } from '@mlw-packages/react-components';

export default function Horizontal() {
  return (
    <CarouselBase className="w-full max-w-xs">
      <CarouselContentBase>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItemBase key={index}>
            <CardBase>
              <CardContentBase className="p-6">Item {index + 1}</CardContentBase>
            </CardBase>
          </CarouselItemBase>
        ))}
      </CarouselContentBase>
      <CarouselPrevious />
      <CarouselNextBase />
    </CarouselBase>
  );
}
`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <CarouselBase className="w-full max-w-xs">
        <CarouselContentBase>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItemBase key={index}>
              <CardBase>
                <CardContentBase className="flex aspect-square items-center justify-center p-6">
                  <img
                    src="/pwa-512x512.png"
                    alt={`Imagem ${index + 1}`}
                    className="rounded-xl object-cover w-40 h-40"
                  />
                </CardContentBase>
              </CardBase>
            </CarouselItemBase>
          ))}
        </CarouselContentBase>
        <CarouselPrevious />
        <CarouselNextBase />
      </CarouselBase>
    </div>
  ),
};

export const Responsivo: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CarouselBase, CarouselContentBase, CarouselItemBase, CarouselPrevious, CarouselNextBase } from '@mlw-packages/react-components';
import { CardBase, CardContentBase } from '@mlw-packages/react-components';

export default function Responsivo() {
  return (
    <CarouselBase opts={{ align: 'start' }} className="w-full max-w-sm">
      <CarouselContentBase>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItemBase key={index} className="md:basis-1/2 lg:basis-1/3">
            <CardBase>
              <CardContentBase className="p-6">Item {index + 1}</CardContentBase>
            </CardBase>
          </CarouselItemBase>
        ))}
      </CarouselContentBase>
      <CarouselPrevious />
      <CarouselNextBase />
    </CarouselBase>
  );
}
`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <CarouselBase opts={{ align: "start" }} className="w-full max-w-sm">
        <CarouselContentBase>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItemBase key={index} className="md:basis-1/2 lg:basis-1/3">
              <CardBase>
                <CardContentBase className="flex aspect-square items-center justify-center p-6">
                  <img
                    src="/pwa-512x512.png"
                    alt={`Imagem ${index + 1}`}
                    className="rounded-xl object-cover"
                  />
                </CardContentBase>
              </CardBase>
            </CarouselItemBase>
          ))}
        </CarouselContentBase>
        <CarouselPrevious />
        <CarouselNextBase />
      </CarouselBase>
    </div>
  ),
};

export const Vertical: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CarouselBase, CarouselContentBase, CarouselItemBase, CarouselPrevious, CarouselNextBase } from '@mlw-packages/react-components';
import { CardBase, CardContentBase } from '@mlw-packages/react-components';

export default function Vertical() {
  return (
    <CarouselBase opts={{ align: 'start' }} orientation="vertical" className="w-full max-w-xs mt-20">
      <CarouselContentBase className="-mt-1 h-[220px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItemBase key={index} className="pt-1 md:basis-1/2">
            <CardBase>
              <CardContentBase className="p-6">Item {index + 1}</CardContentBase>
            </CardBase>
          </CarouselItemBase>
        ))}
      </CarouselContentBase>
      <CarouselPrevious />
      <CarouselNextBase />
    </CarouselBase>
  );
}
`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <CarouselBase
        opts={{ align: "start" }}
        orientation="vertical"
        className="w-full max-w-xs mt-20"
      >
        <CarouselContentBase className="-mt-1 h-[220px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItemBase key={index} className="pt-1 md:basis-1/2">
              <CardBase>
                <CardContentBase className="flex aspect-square items-center justify-center p-6">
                  <img
                    src="/pwa-512x512.png"
                    alt={`Imagem ${index + 1}`}
                    className="rounded-xl object-cover w-40 h-40"
                  />
                </CardContentBase>
              </CardBase>
            </CarouselItemBase>
          ))}
        </CarouselContentBase>
        <CarouselPrevious />
        <CarouselNextBase />
      </CarouselBase>
    </div>
  ),
};
