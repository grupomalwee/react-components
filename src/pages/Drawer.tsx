"use client"

import * as React from "react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { Minus, Plus } from "phosphor-react"

import { ButtonBase } from "@/components/ui/ButtonBase"
import {
  DrawerBase,
  DrawerTriggerBase,
  DrawerContentBase,
  DrawerHeaderBase,
  DrawerTitleBase,
  DrawerDescriptionBase,
  DrawerFooterBase,
  DrawerCloseBase,
} from "@/components/ui/DrawerBase"

const data = [
  { goal: 400 }, { goal: 300 }, { goal: 200 },
  { goal: 300 }, { goal: 200 }, { goal: 278 },
  { goal: 189 }, { goal: 239 }, { goal: 300 },
  { goal: 200 }, { goal: 278 }, { goal: 189 },
  { goal: 349 },
]

export default function DrawerPage() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal((prev) => Math.max(200, Math.min(400, prev + adjustment)))
  }

  return (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <p className="mb-6 text-1xl font-bold">Drawer com Gráfico</p>

      <DrawerBase>
        <DrawerTriggerBase asChild>
          <ButtonBase variant="outline">Abrir Drawer</ButtonBase>
        </DrawerTriggerBase>

        <DrawerContentBase>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeaderBase>
              <DrawerTitleBase>Meta de Movimento</DrawerTitleBase>
              <DrawerDescriptionBase>
                Ajuste sua meta diária de atividade.
              </DrawerDescriptionBase>
            </DrawerHeaderBase>

            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <ButtonBase
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(-10)}
                  disabled={goal <= 200}
                >
                  <Minus />
                  <span className="sr-only">Diminuir</span>
                </ButtonBase>

                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">{goal}</div>
                  <div className="text-muted-foreground text-[0.70rem] uppercase">
                    Calorias/dia
                  </div>
                </div>

                <ButtonBase
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(10)}
                  disabled={goal >= 400}
                >
                  <Plus />
                  <span className="sr-only">Aumentar</span>
                </ButtonBase>
              </div>

              <div className="mt-3 h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <Bar
                      dataKey="goal"
                      style={{
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <DrawerFooterBase>
              <ButtonBase>Confirmar</ButtonBase>
              <DrawerCloseBase asChild>
                <ButtonBase variant="outline">Cancelar</ButtonBase>
              </DrawerCloseBase>
            </DrawerFooterBase>
          </div>
        </DrawerContentBase>
      </DrawerBase>

      {/* Documentação embutida */}
      <div className="mt-10 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Como importar</h3>
          <pre className="bg-zinc-900 text-zinc-100 text-sm rounded-md p-4 overflow-auto">
<code>{`import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { Minus, Plus } from "phosphor-react"

import { ButtonBase } from "@/components/ui/ButtonBase"
import {
  DrawerBase,
  DrawerTriggerBase,
  DrawerContentBase,
  DrawerHeaderBase,
  DrawerTitleBase,
  DrawerDescriptionBase,
  DrawerFooterBase,
  DrawerCloseBase,
} from "@/components/ui/DrawerBase"`}</code>
          </pre>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Como usar</h3>
          <pre className="bg-zinc-900 text-zinc-100 text-sm rounded-md p-4 overflow-auto">
<code>{`<DrawerBase>
  <DrawerTriggerBase asChild>
    <ButtonBase variant="outline">Abrir Drawer</ButtonBase>
  </DrawerTriggerBase>

  <DrawerContentBase>
    <DrawerHeaderBase>
      <DrawerTitleBase>Meta de Movimento</DrawerTitleBase>
      <DrawerDescriptionBase>
        Ajuste sua meta diária de atividade.
      </DrawerDescriptionBase>
    </DrawerHeaderBase>

    <div className="flex items-center justify-center space-x-2">
      <ButtonBase onClick={() => onClick(-10)} disabled={goal <= 200}>
        <Minus />
      </ButtonBase>

      <div className="text-center">
        <div className="text-7xl font-bold">{goal}</div>
        <div className="text-muted-foreground text-[0.70rem] uppercase">
          Calorias/dia
        </div>
      </div>

      <ButtonBase onClick={() => onClick(10)} disabled={goal >= 400}>
        <Plus />
      </ButtonBase>
    </div>

    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data}>
        <Bar dataKey="goal" fill="hsl(var(--foreground))" />
      </BarChart>
    </ResponsiveContainer>

    <DrawerFooterBase>
      <ButtonBase>Confirmar</ButtonBase>
      <DrawerCloseBase asChild>
        <ButtonBase variant="outline">Cancelar</ButtonBase>
      </DrawerCloseBase>
    </DrawerFooterBase>
  </DrawerContentBase>
</DrawerBase>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
