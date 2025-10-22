import "../style/global.css";
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DrawerBase,
  DrawerTriggerBase,
  DrawerContentBase,
  DrawerHeaderBase,
  DrawerTitleBase,
  DrawerDescriptionBase,
  DrawerFooterBase,
  DrawerCloseBase,
} from "../components/ui/DrawerBase";
import { InputBase } from "../components/ui/InputBase";
import { ButtonBase } from "../components/ui/ButtonBase";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

const meta: Meta<typeof DrawerBase> = {
  title: "overlays/Drawer",
  component: DrawerBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Drawer para navegação lateral, formulários e gráficos. Personalizável e interativo.",
      },
      source: {
        code: `import React, { useState, useRef } from 'react';\nimport { DrawerBase, DrawerTriggerBase, DrawerContentBase, DrawerHeaderBase, DrawerTitleBase, DrawerDescriptionBase, DrawerFooterBase, DrawerCloseBase, InputBase, ButtonBase } from '@mlw-packages/react-components';\nimport { MinusIcon, PlusIcon } from '@phosphor-icons/react';\nimport { BarChart, ResponsiveContainer, XAxis, YAxis, Bar } from 'recharts';\n\nexport default function Example() {\n  const [goal, setGoal] = useState(350);\n  const [data, setData] = useState([{ id: 1, value: 350 }]);\n  return (\n    <DrawerBase>\n      <DrawerTriggerBase asChild>\n        <ButtonBase variant='outline'>Abrir Drawer</ButtonBase>\n      </DrawerTriggerBase>\n      <DrawerContentBase>\n        <DrawerHeaderBase>\n          <DrawerTitleBase>Meta de Movimento</DrawerTitleBase>\n          <DrawerDescriptionBase>Ajuste sua meta diária e visualize o gráfico.</DrawerDescriptionBase>\n        </DrawerHeaderBase>\n        <InputBase defaultValue={goal} readOnly />\n        <DrawerFooterBase>\n          <DrawerCloseBase asChild>\n            <ButtonBase variant='outline'>Cancelar</ButtonBase>\n          </DrawerCloseBase>\n          <ButtonBase onClick={() => setData(prev => [...prev, { id: prev.length + 1, value: goal }])}>Confirmar</ButtonBase>\n        </DrawerFooterBase>\n      </DrawerContentBase>\n    </DrawerBase>\n  );\n}`,
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
type Story = StoryObj<typeof DrawerBase>;

export const WithGoalControls: Story = {
  render: () => {
    // Simula estado local para meta, edição e dados do gráfico
    const [goal, setGoal] = React.useState(350);
    const [isEditing, setIsEditing] = React.useState(false);
    const [data, setData] = React.useState([{ id: 1, value: 350 }]);
    const inputRef = React.useRef(null);

    function onClick(adjustment: number) {
      setGoal((prev) => Math.max(200, Math.min(400, prev + adjustment)));
    }
    function handleEditConfirm(value: string) {
      const numeric = parseInt(value);
      if (!isNaN(numeric)) {
        setGoal(Math.max(200, Math.min(400, numeric)));
      }
      setIsEditing(false);
    }
    function handleAddBar() {
      setData((prev) => [...prev, { id: prev.length + 1, value: goal }]);
    }
    function handleRemoveBar(id: number) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <div className=" bg-background p-8 text-foreground flex flex-col">
          <DrawerBase>
            <DrawerTriggerBase asChild>
              <ButtonBase variant="outline">Abrir Drawer</ButtonBase>
            </DrawerTriggerBase>
            <DrawerContentBase className="fixed z-50 bg-background p-6">
              <div className="mx-auto max-w-lg w-full">
                <DrawerHeaderBase>
                  <DrawerTitleBase className="text-xl font-semibold">
                    Meta de Movimento
                  </DrawerTitleBase>
                  <DrawerDescriptionBase className="text-s">
                    Ajuste sua meta diária e adicione/remova barras no gráfico.
                  </DrawerDescriptionBase>
                </DrawerHeaderBase>
                <div className="p-4 pb-0 space-y-6">
                  <div className="flex items-center justify-center gap-4">
                    <ButtonBase
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full flex items-center justify-center"
                      onClick={() => onClick(-10)}
                      disabled={goal <= 200}
                      aria-label="Diminuir meta"
                    >
                      <MinusIcon size={20} />
                    </ButtonBase>
                    <div className="flex-1 text-center select-none">
                      {isEditing ? (
                        <InputBase
                          ref={inputRef}
                          defaultValue={goal}
                          onBlur={(e) =>
                            handleEditConfirm(
                              (e.target as HTMLInputElement).value
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleEditConfirm(
                                (e.target as HTMLInputElement).value
                              );
                            } else if (e.key === "Escape") {
                              setIsEditing(false);
                            }
                          }}
                          className="text-[28.5px] font-extrabold leading-none tracking-tight text-primary dark:text-primary-light bg-transparent border-none focus:outline-none text-center w-full"
                          min={200}
                          max={400}
                          autoFocus
                        />
                      ) : (
                        <p
                          className="text-6xl font-extrabold leading-none tracking-tight text-primary dark:text-primary-light cursor-pointer"
                          onClick={() => setIsEditing(true)}
                          title="Clique para editar"
                        >
                          {goal}
                        </p>
                      )}
                      <p className="text-xs uppercase font-medium text-muted-foreground tracking-wider mt-1">
                        Calorias/dia
                      </p>
                    </div>
                    <ButtonBase
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full flex items-center justify-center"
                      onClick={() => onClick(10)}
                      disabled={goal >= 400}
                      aria-label="Aumentar meta"
                    >
                      <PlusIcon size={20} />
                    </ButtonBase>
                  </div>
                  <div className="mt-3 h-56 w-full max-w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis
                          dataKey="id"
                          tick={{ fill: "var(--tick-color, #888)" }}
                          axisLine={{ stroke: "var(--tick-color, #888)" }}
                          tickLine={false}
                        />
                        <YAxis
                          domain={[150, 450]}
                          tick={{ fill: "var(--tick-color, #888)" }}
                          axisLine={{ stroke: "var(--tick-color, #888)" }}
                          tickLine={false}
                          width={40}
                        />
                        <RechartsTooltip
                          cursor={{ fill: "transparent" }}
                          content={() => null}
                        />
                        <Bar
                          dataKey="value"
                          fill="hsl(var(--primary, 220 90% 56%))"
                          radius={[6, 6, 0, 0]}
                          cursor="pointer"
                          onClick={(e) => handleRemoveBar(e.id)}
                          activeBar={{ fill: "#ef4444" }}
                          style={{ transition: "fill 0.3s ease" }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-muted-foreground text-center select-none">
                    Clique na barra para remover.
                  </p>
                </div>
                <DrawerFooterBase className="flex justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <ButtonBase
                    onClick={handleAddBar}
                    className="flex-1 py-2 text-base font-semibold rounded-md bg-primary hover:bg-primary-dark transition focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    Confirmar
                  </ButtonBase>
                  <DrawerCloseBase asChild>
                    <ButtonBase
                      variant="outline"
                      className="flex-1 py-2 text-base font-semibold rounded-md border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-primary focus:outline-none transition"
                    >
                      Cancelar
                    </ButtonBase>
                  </DrawerCloseBase>
                </DrawerFooterBase>
              </div>
            </DrawerContentBase>
          </DrawerBase>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { DrawerBase, DrawerTriggerBase, DrawerContentBase, DrawerHeaderBase, DrawerTitleBase, DrawerDescriptionBase, DrawerFooterBase, DrawerCloseBase, InputBase, ButtonBase } from '@mlw-packages/react-components';\nimport { MinusIcon, PlusIcon } from '@phosphor-icons/react';\nimport { BarChart, ResponsiveContainer, XAxis, YAxis, Bar } from 'recharts';\n\nexport default function WithGoalControls() {\n  const [goal, setGoal] = useState(350);\n  const [data, setData] = useState([{ id: 1, value: 350 }]);\n  return (\n    <DrawerBase>\n      <DrawerTriggerBase asChild>\n        <ButtonBase variant='outline'>Abrir Drawer</ButtonBase>\n      </DrawerTriggerBase>\n      <DrawerContentBase>\n        <DrawerHeaderBase>\n          <DrawerTitleBase>Meta de Movimento</DrawerTitleBase>\n          <DrawerDescriptionBase>Ajuste sua meta diária e adicione barras ao gráfico.</DrawerDescriptionBase>\n        </DrawerHeaderBase>\n        <InputBase defaultValue={goal} />\n        <DrawerFooterBase>\n          <DrawerCloseBase asChild>\n            <ButtonBase variant='outline'>Cancelar</ButtonBase>\n          </DrawerCloseBase>\n          <ButtonBase onClick={() => setData(prev => [...prev, { id: prev.length + 1, value: goal }])}>Confirmar</ButtonBase>\n        </DrawerFooterBase>\n      </DrawerContentBase>\n    </DrawerBase>\n  );\n}`,
      },
    },
  },
};
