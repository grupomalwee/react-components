import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import {
  CardBase,
  CardContentBase,
  CardHeaderBase,
  CardTitleBase,
} from "@/components/ui/data/CardBase";
import { BadgeBase } from "@/components/ui/data/BadgeBase";
import Chart from "@/components/charts/Chart";
import {
  BellIcon,
  UserIcon,
  TrendUpIcon,
  UsersIcon,
  CurrencyDollarIcon,
  PackageIcon,
  CalendarIcon,
  DownloadIcon,
} from "@phosphor-icons/react";

const meta: Meta = {
  title: "Documentação/Templates",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Templates de páginas completas prontos para usar. Copie o código e cole direto no seu projeto - funciona sem modificações.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<unknown>;

export const Dashboard: Story = {
  parameters: {
    docs: {
      source: {
        code: `import {
  ButtonBase,
  CardBase,
  CardHeaderBase,
  CardContentBase,
  CardTitleBase,
  BadgeBase,
  TooltipBase,
  TooltipContentBase,
  TooltipTriggerBase,
  TooltipProviderBase,
} from "@mlw-packages/react-components";
import { Chart } from "@mlw-packages/react-components";
import {
  BellIcon,
  UserIcon,
  TrendUpIcon,
  UsersIcon,
  CurrencyDollarIcon,
  PackageIcon,
  CalendarIcon,
  DownloadIcon,
} from "@phosphor-icons/react";

export default function DashboardPage() {
  const salesData = [
    { month: "Jan", revenue: 45000, orders: 23000, customers: 1800 },
    { month: "Feb", revenue: 52000, orders: 20080, customers: 220 },
    { month: "Mar", revenue: 48000, orders: 25000, customers: 2000 },
    { month: "Apr", revenue: 61000, orders: 30020, customers: 290 },
    { month: "May", revenue: 72000, orders: 38000, customers: 3400 },
    { month: "Jun", revenue: 68000, orders: 35000, customers: 31000 },
  ];

  const productPerformance = [
    { category: "Electronics", sales: 85000, profit: 28000, units: 1240 },
    { category: "Clothing", sales: 62000, profit: 21000, units: 2100 },
    { category: "Home & Garden", sales: 48000, profit: 15000, units: 980 },
    { category: "Sports", sales: 39000, profit: 12000, units: 750 },
    { category: "Books", sales: 28000, profit: 9000, units: 1850 },
    { category: "Toys", sales: 34000, profit: 11000, units: 1320 },
  ];

  const trafficData = [
    { source: "Direct", visitors: 12500, conversions: 420, bounce: 32 },
    { source: "Organic", visitors: 18200, conversions: 680, bounce: 28 },
    { source: "Social", visitors: 9800, conversions: 280, bounce: 45 },
    { source: "Referral", visitors: 6400, conversions: 190, bounce: 38 },
    { source: "Email", visitors: 5200, conversions: 310, bounce: 22 },
    { source: "Paid", visitors: 8900, conversions: 520, bounce: 35 },
  ];

  const customerSegments = [
    { segment: "VIP", count: 245, revenue: 124000, avgOrder: 506 },
    { segment: "Regular", count: 892, revenue: 168000, avgOrder: 188 },
    { segment: "New", count: 403, revenue: 54000, avgOrder: 134 },
  ];

  const timeSeriesData = [
    { day: "Mon", views: 3200, clicks: 890, purchases: 145 },
    { day: "Tue", views: 3800, clicks: 1020, purchases: 168 },
    { day: "Wed", views: 3600, clicks: 980, purchases: 152 },
    { day: "Thu", views: 4200, clicks: 1180, purchases: 195 },
    { day: "Fri", views: 5100, clicks: 1450, purchases: 238 },
    { day: "Sat", views: 4800, clicks: 1320, purchases: 212 },
    { day: "Sun", views: 3900, clicks: 1050, purchases: 172 },
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "R$ 346.000",
      change: "+12.5%",
      trend: "up",
      icon: CurrencyDollarIcon,
      description: "vs last 6 months",
    },
    {
      title: "Total Orders",
      value: "1.810",
      change: "+8.2%",
      trend: "up",
      icon: PackageIcon,
      description: "vs last 6 months",
    },
    {
      title: "New Customers",
      value: "1.540",
      change: "+15.3%",
      trend: "up",
      icon: UsersIcon,
      description: "vs last 6 months",
    },
    {
      title: "Growth Rate",
      value: "23.1%",
      change: "+4.1%",
      trend: "up",
      icon: TrendUpIcon,
      description: "month over month",
    },
  ];

  const additionalStats = [
    {
      title: "Avg. Order Value",
      value: "R$ 191",
      change: "+5.8%",
      description: "per transaction",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.4%",
      description: "from visitors",
    },
    {
      title: "Total Products",
      value: "8.240",
      change: "+120",
      description: "in catalog",
    },
    {
      title: "Return Rate",
      value: "2.1%",
      change: "-0.3%",
      description: "decreased",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendUpIcon
                  size={20}
                  className="text-primary-foreground"
                  weight="bold"
                />
              </div>
              <h1 className="text-xl font-bold">Analytics Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <CalendarIcon size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium">Last 6 months</span>
            </div>
            <ButtonBase variant="outline" size="sm">
              <DownloadIcon size={16} className="mr-2" />
              Export
            </ButtonBase>
            <div className="relative">
              <ButtonBase variant="ghost" size="sm" className="relative">
                <span className="relative inline-flex items-center">
                  <BellIcon />
                  <BadgeBase status="destructive" />
                </span>
              </ButtonBase>
            </div>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <UserIcon size={16} className="text-primary" />
              </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back! 👋
            </h2>
            <p className="text-muted-foreground text-lg">
              Here's what's happening with your business today.
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <CardBase key={stat.title} className="relative overflow-hidden">
                <CardHeaderBase className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitleBase className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitleBase>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon size={20} className="text-primary" />
                  </div>
                </CardHeaderBase>
                <CardContentBase>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 font-medium">
                        {stat.change}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        {stat.description}
                      </span>
                    </div>
                  </div>
                </CardContentBase>
                <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-primary/5 to-transparent rounded-bl-3xl"></div>
              </CardBase>
            ))}
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
            {additionalStats.map((stat) => (
              <CardBase
                key={stat.title}
                className="bg-linear-to-br from-background to-muted/20"
              >
                <CardContentBase className="pt-6">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </CardContentBase>
              </CardBase>
            ))}
          </div>

          <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
            <CardBase className="lg:col-span-2">
              <CardContentBase>
                <div className="h-[400px] w-full mt-4">
                  <Chart
                    data={salesData}
                    xAxis="month"
                    series={{ bar: ["revenue", "customers"], area: ["orders"] }}
                    labelMap={{ revenue: "Revenue (R$)", orders: "Orders" }}
                    showGrid={true}
                    showLegend={false}
                    enableDraggableTooltips
                    enableHighlights
                    enablePeriodsDropdown
                    enableShowOnly
                    showTooltipTotal
                    showTooltip
                    title="Revenue & Orders Overview"
                  />
                </div>
              </CardContentBase>
            </CardBase>
          </div>

          <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
            <CardBase>
              <CardContentBase>
                <div className="h-[350px] w-full mt-4">
                  <Chart
                    data={productPerformance}
                    xAxis="category"
                    series={{ bar: ["sales", "profit"] }}
                    labelMap={{
                      sales: "Sales (R$)",
                      profit: "Profit (R$)",
                      category: "Category",
                    }}
                    showGrid={true}
                    enableDraggableTooltips
                    enableHighlights
                    enableShowOnly
                    showTooltipTotal
                    showTooltip
                    title="Product Performance by Category"
                  />
                </div>
              </CardContentBase>
            </CardBase>

            <CardBase>
              <CardContentBase>
                <div className="h-[350px] w-full mt-4">
                  <Chart
                    data={trafficData}
                    xAxis="source"
                    series={{ area: ["visitors"], bar: ["conversions"] }}
                    labelMap={{
                      visitors: "Visitors",
                      conversions: "Conversions",
                      source: "Traffic Source",
                    }}
                    showGrid={true}
                    enableDraggableTooltips
                    enableHighlights
                    enableShowOnly
                    showTooltipTotal
                    showTooltip
                    title="Traffic Sources & Conversions"
                  />
                </div>
              </CardContentBase>
            </CardBase>
          </div>

          <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
            <CardBase>
              <CardContentBase>
                <div className="h-[350px] w-full mt-4">
                  <Chart
                    data={timeSeriesData}
                    xAxis="day"
                    series={{ area: ["views"], bar: ["clicks", "purchases"] }}
                    labelMap={{
                      views: "Page Views",
                      clicks: "Clicks",
                      purchases: "Purchases",
                      day: "Day of Week",
                    }}
                    showGrid={true}
                    enableDraggableTooltips
                    enableHighlights
                    enableShowOnly
                    showTooltipTotal
                    showTooltip
                    title="Weekly Activity Breakdown"
                  />
                </div>
              </CardContentBase>
            </CardBase>

            <CardBase>
              <CardContentBase>
                <div className="h-[350px] w-full mt-4">
                  <Chart
                    data={customerSegments}
                    xAxis="segment"
                    series={{ bar: ["revenue", "count"] }}
                    labelMap={{
                      revenue: "Revenue (R$)",
                      count: "Customers",
                      segment: "Customer Segment",
                    }}
                    showGrid={true}
                    enableDraggableTooltips
                    enableHighlights
                    enableShowOnly
                    showTooltipTotal
                    showTooltip
                    title="Customer Segments Analysis"
                  />
                </div>
              </CardContentBase>
            </CardBase>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <CardBase>
              <CardHeaderBase>
                <CardTitleBase>Quick Actions</CardTitleBase>
              </CardHeaderBase>
              <CardContentBase className="space-y-3">
                <ButtonBase className="w-full justify-start" variant="ghost">
                  <PackageIcon size={16} className="mr-2" />
                  View All Orders
                ButtonBase,
                CardBase,
                CardHeaderBase,
                CardContentBase,
                CardTitleBase,
                BadgeBase,
            </CardBase>

            <CardBase>
              <CardHeaderBase>
                <CardTitleBase>Recent Activity</CardTitleBase>
              </CardHeaderBase>
              <CardContentBase className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">New order received</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Payment processed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Customer registered</span>
                </div>
              </CardContentBase>
            </CardBase>

            <CardBase>
              <CardHeaderBase>
                <CardTitleBase>Performance</CardTitleBase>
              </CardHeaderBase>
              <CardContentBase className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Conversion Rate
                  </span>
                  <span className="font-medium">3.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Avg. Order Value
                  </span>
                  <span className="font-medium">R$ 191</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Customer LTV
                  </span>
                  <span className="font-medium">R$ 847</span>
                </div>
              </CardContentBase>
            </CardBase>
          </div>
        </div>
      </main>
    </div>
  );
}`,
      },
    },
  },
  render: () => {
    const salesData = [
      { month: "Jan", revenue: 45000, orders: 23000, customers: 1800 },
      { month: "Feb", revenue: 52000, orders: 20080, customers: 220 },
      { month: "Mar", revenue: 48000, orders: 25000, customers: 2000 },
      { month: "Apr", revenue: 61000, orders: 30020, customers: 290 },
      { month: "May", revenue: 72000, orders: 38000, customers: 3400 },
      { month: "Jun", revenue: 68000, orders: 35000, customers: 31000 },
    ];

    const productPerformance = [
      { category: "Electronics", sales: 85000, profit: 28000, units: 1240 },
      { category: "Clothing", sales: 62000, profit: 21000, units: 2100 },
      { category: "Home & Garden", sales: 48000, profit: 15000, units: 980 },
      { category: "Sports", sales: 39000, profit: 12000, units: 750 },
      { category: "Books", sales: 28000, profit: 9000, units: 1850 },
      { category: "Toys", sales: 34000, profit: 11000, units: 1320 },
    ];

    const trafficData = [
      { source: "Direct", visitors: 12500, conversions: 420, bounce: 32 },
      { source: "Organic", visitors: 18200, conversions: 680, bounce: 28 },
      { source: "Social", visitors: 9800, conversions: 280, bounce: 45 },
      { source: "Referral", visitors: 6400, conversions: 190, bounce: 38 },
      { source: "Email", visitors: 5200, conversions: 310, bounce: 22 },
      { source: "Paid", visitors: 8900, conversions: 520, bounce: 35 },
    ];

    const customerSegments = [
      { segment: "VIP", count: 245, revenue: 124000, avgOrder: 506 },
      { segment: "Regular", count: 892, revenue: 168000, avgOrder: 188 },
      { segment: "New", count: 403, revenue: 54000, avgOrder: 134 },
    ];

    const timeSeriesData = [
      { day: "Mon", views: 3200, clicks: 890, purchases: 145 },
      { day: "Tue", views: 3800, clicks: 1020, purchases: 168 },
      { day: "Wed", views: 3600, clicks: 980, purchases: 152 },
      { day: "Thu", views: 4200, clicks: 1180, purchases: 195 },
      { day: "Fri", views: 5100, clicks: 1450, purchases: 238 },
      { day: "Sat", views: 4800, clicks: 1320, purchases: 212 },
      { day: "Sun", views: 3900, clicks: 1050, purchases: 172 },
    ];

    const stats = [
      {
        title: "Total Revenue",
        value: "R$ 346.000",
        change: "+12.5%",
        trend: "up",
        icon: CurrencyDollarIcon,
        description: "vs last 6 months",
      },
      {
        title: "Total Orders",
        value: "1.810",
        change: "+8.2%",
        trend: "up",
        icon: PackageIcon,
        description: "vs last 6 months",
      },
      {
        title: "New Customers",
        value: "1.540",
        change: "+15.3%",
        trend: "up",
        icon: UsersIcon,
        description: "vs last 6 months",
      },
      {
        title: "Growth Rate",
        value: "23.1%",
        change: "+4.1%",
        trend: "up",
        icon: TrendUpIcon,
        description: "month over month",
      },
    ];

    const additionalStats = [
      {
        title: "Avg. Order Value",
        value: "R$ 191",
        change: "+5.8%",
        description: "per transaction",
      },
      {
        title: "Conversion Rate",
        value: "3.24%",
        change: "+0.4%",
        description: "from visitors",
      },
      {
        title: "Total Products",
        value: "8.240",
        change: "+120",
        description: "in catalog",
      },
      {
        title: "Return Rate",
        value: "2.1%",
        change: "-0.3%",
        description: "decreased",
      },
    ];

    return (
      <div className="min-h-screen w-full bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
          <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <TrendUpIcon
                    size={20}
                    className="text-primary-foreground"
                    weight="bold"
                  />
                </div>
                <h1 className="text-xl font-bold">Analytics Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <CalendarIcon size={20} className="text-muted-foreground" />
                <span className="text-sm font-medium">Last 6 months</span>
              </div>
              <ButtonBase variant="outline" size="sm">
                <DownloadIcon size={16} className="mr-2" />
                Export
              </ButtonBase>
              <div className="relative">
                <ButtonBase variant="ghost" size="sm" className="relative">
                  <span className="relative inline-flex items-center">
                    <BellIcon />
                    <BadgeBase status="destructive" />
                  </span>
                </ButtonBase>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <UserIcon size={16} className="text-primary" />
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back! 👋
              </h2>
              <p className="text-muted-foreground text-lg">
                Here's what's happening with your business today.
              </p>
            </div>

            <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <CardBase key={stat.title} className="relative overflow-hidden">
                  <CardHeaderBase className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitleBase className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitleBase>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <stat.icon size={20} className="text-primary" />
                    </div>
                  </CardHeaderBase>
                  <CardContentBase>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="flex items-center text-sm">
                        <span className="text-green-600 font-medium">
                          {stat.change}
                        </span>
                        <span className="text-muted-foreground ml-2">
                          {stat.description}
                        </span>
                      </div>
                    </div>
                  </CardContentBase>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-primary/5 to-transparent rounded-bl-3xl"></div>
                </CardBase>
              ))}
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
              {additionalStats.map((stat) => (
                <CardBase
                  key={stat.title}
                  className="bg-linear-to-br from-background to-muted/20"
                >
                  <CardContentBase className="pt-6">
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {stat.title}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <span
                          className={`text-xs font-medium ${
                            stat.change.startsWith("+")
                              ? "text-green-600"
                              : stat.change.startsWith("-")
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                  </CardContentBase>
                </CardBase>
              ))}
            </div>

            <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
              <CardBase className="lg:col-span-2 ">
                <CardContentBase>
                  <div className=" mt-4">
                    <Chart
                      data={salesData}
                      xAxis="month"
                      series={{
                        bar: ["revenue", "customers"],
                        area: ["orders"],
                      }}
                      labelMap={{ revenue: "Revenue (R$)", orders: "Orders" }}
                      showGrid={true}
                      showLegend={false}
                      enableDraggableTooltips
                      enableHighlights
                      enablePeriodsDropdown
                      enableShowOnly
                      showTooltipTotal
                      showTooltip
                      title="Revenue & Orders Overview"
                    />
                  </div>
                </CardContentBase>
              </CardBase>
            </div>

            <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
              <CardBase>
                <CardContentBase>
                  <div className=" w-full mt-4">
                    <Chart
                      data={productPerformance}
                      xAxis="category"
                      series={{ bar: ["sales", "profit"] }}
                      labelMap={{
                        sales: "Sales (R$)",
                        profit: "Profit (R$)",
                        category: "Category",
                      }}
                      showGrid={true}
                      enableDraggableTooltips
                      enableHighlights
                      enableShowOnly
                      showTooltipTotal
                      showTooltip
                      title="Product Performance by Category"
                    />
                  </div>
                </CardContentBase>
              </CardBase>

              <CardBase>
                <CardContentBase>
                  <div className=" w-full mt-4">
                    <Chart
                      data={trafficData}
                      xAxis="source"
                      series={{ area: ["visitors"], bar: ["conversions"] }}
                      labelMap={{
                        visitors: "Visitors",
                        conversions: "Conversions",
                        source: "Traffic Source",
                      }}
                      showGrid={true}
                      enableDraggableTooltips
                      enableHighlights
                      enableShowOnly
                      showTooltipTotal
                      showTooltip
                      title="Traffic Sources & Conversions"
                    />
                  </div>
                </CardContentBase>
              </CardBase>
            </div>

            <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
              <CardBase>
                <CardContentBase>
                  <div className="w-full mt-4">
                    <Chart
                      data={timeSeriesData}
                      xAxis="day"
                      series={{ area: ["views"], bar: ["clicks", "purchases"] }}
                      labelMap={{
                        views: "Page Views",
                        clicks: "Clicks",
                        purchases: "Purchases",
                        day: "Day of Week",
                      }}
                      showGrid={true}
                      enableDraggableTooltips
                      enableHighlights
                      enableShowOnly
                      showTooltipTotal
                      showTooltip
                      title="Weekly Activity Breakdown"
                    />
                  </div>
                </CardContentBase>
              </CardBase>

              <CardBase>
                <CardContentBase>
                  <div className="w-full mt-4">
                    <Chart
                      data={customerSegments}
                      xAxis="segment"
                      series={{ bar: ["revenue", "count"] }}
                      labelMap={{
                        revenue: "Revenue (R$)",
                        count: "Customers",
                        segment: "Customer Segment",
                      }}
                      showGrid={true}
                      enableDraggableTooltips
                      enableHighlights
                      enableShowOnly
                      showTooltipTotal
                      showTooltip
                      title="Customer Segments Analysis"
                    />
                  </div>
                </CardContentBase>
              </CardBase>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              <CardBase>
                <CardHeaderBase>
                  <CardTitleBase>Quick Actions</CardTitleBase>
                </CardHeaderBase>
                <CardContentBase className="space-y-3">
                  <ButtonBase className="w-full justify-start" variant="ghost">
                    <PackageIcon size={16} className="mr-2" />
                    View All Orders
                  </ButtonBase>
                  <ButtonBase className="w-full justify-start" variant="ghost">
                    <UsersIcon size={16} className="mr-2" />
                    Customer Management
                  </ButtonBase>
                  <ButtonBase className="w-full justify-start" variant="ghost">
                    <TrendUpIcon size={16} className="mr-2" />
                    Analytics Report
                  </ButtonBase>
                </CardContentBase>
              </CardBase>

              <CardBase>
                <CardHeaderBase>
                  <CardTitleBase>Recent Activity</CardTitleBase>
                </CardHeaderBase>
                <CardContentBase className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New order received</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Payment processed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Customer registered</span>
                  </div>
                </CardContentBase>
              </CardBase>

              <CardBase>
                <CardHeaderBase>
                  <CardTitleBase>Performance</CardTitleBase>
                </CardHeaderBase>
                <CardContentBase className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Conversion Rate
                    </span>
                    <span className="font-medium">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Avg. Order Value
                    </span>
                    <span className="font-medium">R$ 191</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Customer LTV
                    </span>
                    <span className="font-medium">R$ 847</span>
                  </div>
                </CardContentBase>
              </CardBase>
            </div>
          </div>
        </main>
      </div>
    );
  },
};
