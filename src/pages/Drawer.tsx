"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

import { ButtonBase } from "@/components/ui/ButtonBase";
import {
  DrawerBase,
  DrawerTriggerBase,
  DrawerContentBase,
  DrawerHeaderBase,
  DrawerTitleBase,
  DrawerDescriptionBase,
  DrawerFooterBase,
  DrawerCloseBase,
} from "@/components/ui/DrawerBase";
import { InputBase } from "@/components/ui/InputBase";

export default function DrawerPage() {
  const [goal, setGoal] = React.useState(350);
  const [data, setData] = React.useState<{ id: number; value: number }[]>([
    { id: 1, value: 350 },
  ]);
  const [isEditing, setIsEditing] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  function onClick(adjustment: number) {
    setGoal((prev) => Math.max(200, Math.min(400, prev + adjustment)));
  }

  function handleAddBar() {
    setData((prev) => [...prev, { id: prev.length + 1, value: goal }]);
  }

  function handleRemoveBar(id: number) {
    setData((prev) => prev.filter((item) => item.id !== id));
  }

  function handleEditConfirm(value: string) {
    const numeric = parseInt(value);
    if (!isNaN(numeric)) {
      setGoal(Math.max(200, Math.min(400, numeric)));
    }
    setIsEditing(false);
  }

  return (
    <>
      <div className="min-h-screen bg-background p-8 text-foreground flex flex-col">
        <h1 className="mb-8 text-2xl font-extrabold tracking-tight">
          Drawer com Gráfico Dinâmico
        </h1>

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
                    className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary/20 focus:ring-2 focus:ring-primary focus:outline-none transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
                        onBlur={(e) => handleEditConfirm(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleEditConfirm((e.target as HTMLInputElement).value);
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
                    className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary/20 focus:ring-2 focus:ring-primary focus:outline-none transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
                        tick={{ fill: "var(--tick-color)" }}
                        axisLine={{ stroke: "var(--tick-color)" }}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[150, 450]}
                        tick={{ fill: "var(--tick-color)" }}
                        axisLine={{ stroke: "var(--tick-color)" }}
                        tickLine={false}
                        width={40}
                      />
                      <Tooltip cursor={{ fill: "transparent" }} content={() => null} />
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--primary))"
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

      {/* -- Documentação -- */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-auto max-h-48">
            <code>
              {`import {
  DrawerBase,
  DrawerTriggerBase,
  DrawerContentBase,
  DrawerHeaderBase,
  DrawerTitleBase,
  DrawerDescriptionBase,
  DrawerFooterBase,
  DrawerCloseBase,
} from "@/components/ui/DrawerBase";;`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-auto max-h-96">
            <code>
              {`<DrawerBase>
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
                    className="h-10 w-10 rounded-full "
                    onClick={() => onClick(-10)}
                    disabled={goal <= 200}
                    aria-label="Diminuir meta"
                  >
                    <Minus size={20} />
                  </ButtonBase>

                  <div className="flex-1 text-center select-none">
                    {isEditing ? (
                      <InputBase
                        ref={inputRef}
                        defaultValue={goal}
                        onBlur={(e) => handleEditConfirm(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleEditConfirm((e.target as HTMLInputElement).value);
                          } else if (e.key === "Escape") {
                            setIsEditing(false);
                          }
                        }}
                        className="text-[28.5px] font-extrabold"
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
                    className="h-10 w-10 rounded-full"
                    onClick={() => onClick(10)}
                    disabled={goal >= 400}
                    aria-label="Aumentar meta"
                  >
                    <Plus size={20} />
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
                        tick={{ fill: "var(--tick-color)" }}
                        axisLine={{ stroke: "var(--tick-color)" }}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[150, 450]}
                        tick={{ fill: "var(--tick-color)" }}
                        axisLine={{ stroke: "var(--tick-color)" }}
                        tickLine={false}
                        width={40}
                      />
                      <Tooltip cursor={{ fill: "transparent" }} content={() => null} />
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--primary))"
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
                  className="flex-1 py-2 text-base font-semibold"
                >
                  Confirmar
                </ButtonBase>
                <DrawerCloseBase asChild>
                  <ButtonBase
                    variant="outline"
                    className="flex-1 py-2 text-base"
                    Cancelar
                  </ButtonBase>
                </DrawerCloseBase>
              </DrawerFooterBase>
            </div>
          </DrawerContentBase>
        </DrawerBase>`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
