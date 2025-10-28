"use client";

import {
  CarouselBase,
  CarouselContentBase,
  CarouselItemBase,
  CarouselNextBase,
  CarouselPrevious,
} from "@/components/ui/layout/CarouselBase";
import { CardBase, CardContentBase } from "@/components/ui/data/CardBase";

export function CarouselPage() {
  return (
    <div className="p-8 space-y-16">
      <div className="flex flex-col md:flex-row md:space-x-44 space-y-12 md:space-y-0 justify-center">
        <section className="w-full max-w-xs mx-auto md:mx-0">
          <h2 className="mb-2 text-center text-lg font-semibold">
            Carousel Base
          </h2>
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
        </section>

        <section className="w-full max-w-sm mx-auto md:mx-0">
          <h2 className="mb-2 text-center text-lg font-semibold">Carousel</h2>
          <CarouselBase opts={{ align: "start" }} className="w-full max-w-sm">
            <CarouselContentBase>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItemBase
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
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
        </section>

        <section className="w-full max-w-xs mx-auto md:mx-0">
          <h2 className="mb-2 text-center text-lg font-semibold">
            Carousel Vertical
          </h2>
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
        </section>
      </div>

      {/* Documentação */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Bloco de Código para Importação */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4 overflow-x-auto">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm whitespace-pre">
            <code>
              {`import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuLabelBase,
  DropDownMenuSeparatorBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/DropDownMenuBase";`}
            </code>
          </pre>
        </div>

        {/* Bloco de Código para Uso */}
        <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm whitespace-pre">
            <code>
              {`<DropDownMenuBase>
  <DropDownMenuTriggerBase>Open</DropDownMenuTriggerBase>
  <DropDownMenuContentBase>
    <DropDownMenuLabelBase>My Account</DropDownMenuLabelBase>
    <DropDownMenuSeparatorBase />
    <DropDownMenuItemBase>Profile</DropDownMenuItemBase>
    <DropDownMenuItemBase>Billing</DropDownMenuItemBase>
    <DropDownMenuItemBase>Team</DropDownMenuItemBase>
    <DropDownMenuItemBase>Subscription</DropDownMenuItemBase>
  </DropDownMenuContentBase>
</DropDownMenuBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
