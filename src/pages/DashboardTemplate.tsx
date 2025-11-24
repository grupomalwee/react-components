import React, { useMemo } from "react";
import {
  NavigationMenuBase,
  NavigationMenuListBase,
  NavigationMenuItemBase,
  NavigationMenuContentBase,
  NavigationMenuTriggerBase,
  NavigationMenuLinkBase,
  NavigationMenuIndicatorBase,
} from "@/components/ui/navigation/NavigationMenuBase";
import {
  SearchButton,
  FilterButton,
  NotificationButton,
  AddButton,
} from "@/components/ui/form/SmallButtons";
import { Badge } from "@/components/ui/data/Badge";
import { ModeToggleBase } from "@/components/mode-toggle";
import {
  AvatarBase,
  AvatarFallbackBase,
  AvatarImageBase,
} from "@/components/ui/data/AvatarBase";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import {
  CardBase,
  CardHeaderBase,
  CardTitleBase,
  CardContentBase,
  CardFooterBase,
  CardDescriptionBase,
} from "@/components/ui/data/CardBase";
import Chart from "@/components/charts/Chart";
import {
  TableBase,
  TableHeaderBase,
  TableBodyBase,
  TableFooterBase,
  TableHeadBase,
  TableRowBase,
  TableCellBase,
  TableCaptionBase,
} from "@/components/ui/layout/TableBase";

export default function DashboardTemplate() {
  const chartColors = useMemo(
    () => ({
      primary: ["#2273e1", "#55af7d"],
      revenue: ["#8e68ff"],
      engagement: ["#55af7d"],
    }),
    []
  );

  const activityData = useMemo(
    () => [
      { dia: "Seg", valor: 120, receita: 3000 },
      { dia: "Ter", valor: 200, receita: 4200 },
      { dia: "Qua", valor: 150, receita: 3800 },
      { dia: "Qui", valor: 220, receita: 4600 },
      { dia: "Sex", valor: 180, receita: 4100 },
      { dia: "Sáb", valor: 240, receita: 5200 },
      { dia: "Dom", valor: 190, receita: 4000 },
      { dia: "Seg2", valor: 210, receita: 4500 },
    ],
    []
  );

  const monthlyRevenueData = useMemo(
    () => [
      { mes: "Jun", receita: 32000 },
      { mes: "Jul", receita: 35000 },
      { mes: "Aug", receita: 38000 },
      { mes: "Sep", receita: 41000 },
      { mes: "Oct", receita: 43000 },
      { mes: "Nov", receita: 42560 },
      { mes: "Dec", receita: 44000 },
    ],
    []
  );

  const engagementData = useMemo(
    () => [
      { periodo: "W1", eng: 4.2 },
      { periodo: "W2", eng: 4.6 },
      { periodo: "W3", eng: 4.8 },
      { periodo: "W4", eng: 5.0 },
      { periodo: "W5", eng: 4.9 },
      { periodo: "W6", eng: 5.2 },
      { periodo: "W7", eng: 5.3 },
      { periodo: "W8", eng: 5.1 },
    ],
    []
  );

  const defaultLabelMaps = useMemo(
    () => ({
      activity: { valor: "Atividade", receita: "Receita (R$)" },
      revenue: { receita: "Receita (R$)" },
      engagement: { eng: "Minutos" },
    }),
    []
  );

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    {
      label: "Components",
      children: [
        { label: "Buttons", href: "/components/button" },
        { label: "Forms", href: "/components/form" },
        { label: "Tables", href: "/components/table" },
      ],
    },
    {
      label: "Docs",
      children: [
        { label: "Getting Started", href: "/docs/getting-started" },
        { label: "API", href: "/docs/api" },
      ],
    },
    { label: "Reports", href: "/reports" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-sm border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-3">
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold">Malwee UI</div>
            <nav className="hidden md:block">
              <NavigationMenuBase>
                <NavigationMenuListBase>
                  {navItems.map((item) => (
                    <NavigationMenuItemBase key={item.label}>
                      {item.children ? (
                        <>
                          <NavigationMenuTriggerBase>
                            {item.label}
                          </NavigationMenuTriggerBase>
                          <NavigationMenuContentBase>
                            <div className="p-2 min-w-[200px]">
                              {item.children.map((child) => (
                                <NavigationMenuLinkBase
                                  key={child.label}
                                  href={child.href}
                                >
                                  {child.label}
                                </NavigationMenuLinkBase>
                              ))}
                            </div>
                          </NavigationMenuContentBase>
                        </>
                      ) : item.href ? (
                        <NavigationMenuLinkBase href={item.href}>
                          {item.label}
                        </NavigationMenuLinkBase>
                      ) : (
                        <NavigationMenuTriggerBase>
                          {item.label}
                        </NavigationMenuTriggerBase>
                      )}
                    </NavigationMenuItemBase>
                  ))}
                </NavigationMenuListBase>
                <NavigationMenuIndicatorBase />
              </NavigationMenuBase>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <SearchButton />
              <FilterButton />
              <AddButton />
            </div>
            <NotificationButton />
            <div className="hidden sm:flex items-center gap-2">
              <ModeToggleBase
                themes={["light", "light-purple", "dark", "dark-blue"]}
              />
              <Badge color="blue">PRO</Badge>
            </div>
            <ButtonBase variant="ghost" size="icon">
              <AvatarBase>
                <AvatarImageBase src="https://github.com/grupomalwee.png" />
                <AvatarFallbackBase>GM</AvatarFallbackBase>
              </AvatarBase>
            </ButtonBase>
          </div>
        </div>
      </header>

      <main className="p-6">
        <section className="grid gap-4 md:grid-cols-3 mb-6">
          <CardBase className="p-4">
            <CardHeaderBase>
              <CardTitleBase>Usuários</CardTitleBase>
              <CardDescriptionBase>Ativos nas últimas 24h</CardDescriptionBase>
            </CardHeaderBase>
            <CardContentBase>
              <div className="text-3xl font-bold">1.248</div>
            </CardContentBase>
            <CardFooterBase />
          </CardBase>

          <CardBase className="p-4">
            <CardHeaderBase>
              <CardTitleBase>Receita</CardTitleBase>
              <CardDescriptionBase>Mês atual</CardDescriptionBase>
            </CardHeaderBase>
            <CardContentBase>
              <div className="text-3xl font-bold">R$ 42.560</div>
            </CardContentBase>
            <CardFooterBase />
          </CardBase>

          <CardBase className="p-4">
            <CardHeaderBase>
              <CardTitleBase>Conversões</CardTitleBase>
              <CardDescriptionBase>Taxa média</CardDescriptionBase>
            </CardHeaderBase>
            <CardContentBase>
              <div className="text-3xl font-bold">4.6%</div>
            </CardContentBase>
            <CardFooterBase />
          </CardBase>
        </section>

        <section className="mb-6">
          <CardBase className="p-4">
            <CardContentBase>
              <div className=" w-full">
                <Chart
                  data={activityData}
                  xAxis="dia"
                  series={{ line: ["valor"], area: ["receita"] }}
                  labelMap={defaultLabelMaps.activity}
                  title="Atividade x Receita (últimas semanas)"
                  formatBR={true}
                  showTooltipTotal={true}
                  colors={chartColors.primary}
                  height={400}
                  enableDraggableTooltips={true}
                  maxTooltips={6}
                  enableHighlights
                />
              </div>
            </CardContentBase>
          </CardBase>
        </section>

        <section className="grid gap-6 md:grid-cols-2 mb-6">
          <CardBase className="p-4">
            <CardContentBase>
              <Chart
                data={monthlyRevenueData}
                xAxis="mes"
                series={{ area: ["receita"] }}
                labelMap={defaultLabelMaps.revenue}
                title="Receita"
                formatBR={true}
                colors={chartColors.revenue}
                height={320}

                showTooltipTotal={true}
                enableDraggableTooltips={true}
                maxTooltips={4}
              />
            </CardContentBase>
          </CardBase>

          <CardBase className="p-4">
            <CardContentBase>
              <Chart
                data={engagementData}
                xAxis="periodo"
                series={{ line: ["eng"] }}
                labelMap={defaultLabelMaps.engagement}
                title="Engajamento"
                colors={chartColors.engagement}
                height={320}

                showLabels={false}
                enableDraggableTooltips={true}
              />
            </CardContentBase>
          </CardBase>
        </section>

        <section className="mb-6">
          <CardBase className="p-4">
            <CardHeaderBase>
              <CardTitleBase>Últimos registros</CardTitleBase>
              <CardDescriptionBase>
                Últimas entradas no sistema
              </CardDescriptionBase>
            </CardHeaderBase>
            <CardContentBase>
              <div className="overflow-auto">
                <TableBase>
                  <TableCaptionBase>Últimos registros</TableCaptionBase>
                  <TableHeaderBase>
                    <TableRowBase>
                      <TableHeadBase>Usuário</TableHeadBase>
                      <TableHeadBase>Evento</TableHeadBase>
                      <TableHeadBase>Data</TableHeadBase>
                    </TableRowBase>
                  </TableHeaderBase>
                  <TableBodyBase>
                    <TableRowBase>
                      <TableCellBase>João Silva</TableCellBase>
                      <TableCellBase>Login</TableCellBase>
                      <TableCellBase>21/11/2025</TableCellBase>
                    </TableRowBase>
                    <TableRowBase>
                      <TableCellBase>Maria Souza</TableCellBase>
                      <TableCellBase>Upload de arquivo</TableCellBase>
                      <TableCellBase>21/11/2025</TableCellBase>
                    </TableRowBase>
                    <TableRowBase>
                      <TableCellBase>Carlos Lima</TableCellBase>
                      <TableCellBase>Atualizou perfil</TableCellBase>
                      <TableCellBase>20/11/2025</TableCellBase>
                    </TableRowBase>
                  </TableBodyBase>
                  <TableFooterBase>
                    <TableRowBase>
                      <TableCellBase colSpan={3}>
                        Mostrando 3 registros
                      </TableCellBase>
                    </TableRowBase>
                  </TableFooterBase>
                </TableBase>
              </div>
            </CardContentBase>
          </CardBase>
        </section>

        <section className="mb-6">
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <CardBase className="p-4">
              <CardHeaderBase>
                <CardTitleBase>Novos Assinantes</CardTitleBase>
                <CardDescriptionBase>Últimos 7 dias</CardDescriptionBase>
              </CardHeaderBase>
              <CardContentBase>
                <div className="text-3xl font-bold">320</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Crescimento de 12% vs semana anterior
                </div>
              </CardContentBase>
            </CardBase>

            <CardBase className="p-4">
              <CardHeaderBase>
                <CardTitleBase>Tickets Abertos</CardTitleBase>
                <CardDescriptionBase>Suporte</CardDescriptionBase>
              </CardHeaderBase>
              <CardContentBase>
                <div className="text-3xl font-bold">18</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Tempo médio de resposta: 1h 24m
                </div>
              </CardContentBase>
            </CardBase>

            <CardBase className="p-4">
              <CardHeaderBase>
                <CardTitleBase>Churn</CardTitleBase>
                <CardDescriptionBase>Taxa mensal</CardDescriptionBase>
              </CardHeaderBase>
              <CardContentBase>
                <div className="text-3xl font-bold">1.9%</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Meta: manter abaixo de 2.5%
                </div>
              </CardContentBase>
            </CardBase>

            <CardBase className="p-4">
              <CardHeaderBase>
                <CardTitleBase>NPS</CardTitleBase>
                <CardDescriptionBase>Último mês</CardDescriptionBase>
              </CardHeaderBase>
              <CardContentBase>
                <div className="text-3xl font-bold">57</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Avaliação média dos usuários
                </div>
              </CardContentBase>
            </CardBase>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <CardBase className="p-4">
              <CardHeaderBase>
                <CardTitleBase>Atividade recente</CardTitleBase>
                <CardDescriptionBase>Últimos 20 eventos</CardDescriptionBase>
              </CardHeaderBase>
              <CardContentBase>
                <div className="overflow-auto max-h-56">
                  <ul className="divide-y divide-border">
                    <li className="py-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">João Silva fez login</div>
                        <div className="text-xs text-muted-foreground">10m</div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          Upload de arquivo por Maria Souza
                        </div>
                        <div className="text-xs text-muted-foreground">30m</div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          Carlos Lima atualizou o perfil
                        </div>
                        <div className="text-xs text-muted-foreground">2h</div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          Nova assinatura: Empresa X
                        </div>
                        <div className="text-xs text-muted-foreground">4h</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContentBase>
            </CardBase>

            <CardBase className="p-4">
              <CardHeaderBase>
                <CardTitleBase>Ações rápidas</CardTitleBase>
                <CardDescriptionBase>Atalhos úteis</CardDescriptionBase>
              </CardHeaderBase>
              <CardContentBase>
                <div className="flex flex-col gap-2">
                  <ButtonBase variant="secondary">Criar relatório</ButtonBase>
                  <ButtonBase variant="ghost">Exportar CSV</ButtonBase>
                  <ButtonBase variant="outline">Configurar alertas</ButtonBase>
                </div>
              </CardContentBase>
            </CardBase>
          </div>
        </section>
      </main>
    </div>
  );
}
