import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CarouselBase,
  CarouselContentBase,
  CarouselItemBase,
  CarouselNextBase,
  CarouselPrevious,
} from '../components/ui/CarouselBase';
import { CardBase, CardContentBase } from '../components/ui/CardBase';

const meta: Meta<typeof CarouselBase> = {
  title: 'Components/Carousel',
  component: CarouselBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CarouselBase>;

export const Horizontal: Story = {
  render: () => (
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
  ),
};

export const Responsivo: Story = {
  render: () => (
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
  ),
};

export const Vertical: Story = {
  render: () => (
    <CarouselBase opts={{ align: "start" }} orientation="vertical" className="w-full max-w-xs mt-20">
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
  ),
};
