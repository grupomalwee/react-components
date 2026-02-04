import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { ModeToggleBase } from "@/components/theme/mode-toggle";
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogFooterBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
} from "@/components/ui/feedback/DialogBase";
import { MultiSelect } from "@/components/ui/selects/MultiSelect";
import { useState } from "react";

export default function ThemeColorTest() {
  const colorVariables = [
    { name: "Background", var: "--background", className: "bg-background" },
    { name: "Foreground", var: "--foreground", className: "bg-foreground" },
    { name: "Primary", var: "--primary", className: "bg-primary" },
    {
      name: "Primary Foreground",
      var: "--primary-foreground",
      className: "bg-primary-foreground",
    },
    { name: "Secondary", var: "--secondary", className: "bg-secondary" },
    {
      name: "Secondary Foreground",
      var: "--secondary-foreground",
      className: "bg-secondary-foreground",
    },
    { name: "Accent", var: "--accent", className: "bg-accent" },
    {
      name: "Accent Foreground",
      var: "--accent-foreground",
      className: "bg-accent-foreground",
    },
    { name: "Muted", var: "--muted", className: "bg-muted" },
    {
      name: "Muted Foreground",
      var: "--muted-foreground",
      className: "bg-muted-foreground",
    },
    { name: "Card", var: "--card", className: "bg-card" },
    {
      name: "Card Foreground",
      var: "--card-foreground",
      className: "bg-card-foreground",
    },
    { name: "Popover", var: "--popover", className: "bg-popover" },
    {
      name: "Popover Foreground",
      var: "--popover-foreground",
      className: "bg-popover-foreground",
    },
    { name: "Border", var: "--border", className: "bg-border" },
    { name: "Input", var: "--input", className: "bg-input" },
    { name: "Ring", var: "--ring", className: "bg-ring" },
    { name: "Destructive", var: "--destructive", className: "bg-destructive" },
    {
      name: "Destructive Foreground",
      var: "--destructive-foreground",
      className: "bg-destructive-foreground",
    },
  ];

  const [selected, setSelected] = useState<string[]>([]);

  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
    { label: "Option D", value: "d" },
    { label: "Option E", value: "e" },
  ];
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <p className="mr-2">Aperta -&gt;</p>
          <ModeToggleBase
            themes={[
              "light",
              "dark",
              "system",
              "light-purple",
              "dark-purple",
              "light-blue",
              "dark-blue",
              "light-green",
              "dark-green",
            ]}
            variant="outline"
          />
          <MultiSelect
            items={simpleItems}
            selected={selected}
            onChange={setSelected}
          />
          <DialogBase>
            <DialogTriggerBase asChild>
              <ButtonBase variant="outline">Open Composition</ButtonBase>
            </DialogTriggerBase>
            <DialogContentBase>
              <DialogHeaderBase>
                <DialogTitleBase>Composed Dialog</DialogTitleBase>
                <DialogDescriptionBase>
                  This dialog is built by composing the base primitives
                  manually.
                </DialogDescriptionBase>
              </DialogHeaderBase>
              <div className="py-4">
                <p className="text-sm">
                  You have full control over the layout here.
                </p>
              </div>
              <DialogFooterBase>
                <ButtonBase>Close</ButtonBase>
              </DialogFooterBase>
            </DialogContentBase>
          </DialogBase>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorVariables.map((color) => (
            <div
              key={color.var}
              className="border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`h-32 ${color.className} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
                    <p className="text-foreground text-sm font-mono">
                      {color.var}
                    </p>
                  </div>
                </div>
              </div>

              {/* Color Info */}
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-card-foreground mb-2">
                  {color.name}
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground font-mono">
                    CSS: {color.var}
                  </p>
                  <p className="text-muted-foreground font-mono">
                    Tailwind: {color.className}
                  </p>
                  <p className="text-muted-foreground font-mono text-xs">
                    HSL:{" "}
                    {getComputedStyle(
                      document.documentElement,
                    ).getPropertyValue(color.var)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Example Components Section */}
        <div className="mt-12 space-y-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Component Examples
          </h2>

          {/* Buttons */}
          <div className="border border-border rounded-xl p-6 bg-card">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                Primary
              </button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                Secondary
              </button>
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                Accent
              </button>
              <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                Destructive
              </button>
              <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                Muted
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="border border-border rounded-xl p-6 bg-card">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              Cards & Containers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-card border border-border rounded-lg">
                <h4 className="font-semibold text-card-foreground mb-2">
                  Card
                </h4>
                <p className="text-muted-foreground text-sm">
                  Default card background with foreground text.
                </p>
              </div>
              <div className="p-4 bg-popover border border-border rounded-lg">
                <h4 className="font-semibold text-popover-foreground mb-2">
                  Popover
                </h4>
                <p className="text-muted-foreground text-sm">
                  Popover background with foreground text.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Muted</h4>
                <p className="text-muted-foreground text-sm">
                  Muted background for subtle sections.
                </p>
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="border border-border rounded-xl p-6 bg-card">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              Form Elements
            </h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Input Field
                </label>
                <input
                  type="text"
                  placeholder="Enter text..."
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Text Area
                </label>
                <textarea
                  placeholder="Enter description..."
                  rows={3}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="border border-border rounded-xl p-6 bg-card">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              Typography
            </h3>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-foreground">
                Heading 1 - Foreground
              </h1>
              <h2 className="text-3xl font-bold text-foreground">
                Heading 2 - Foreground
              </h2>
              <h3 className="text-2xl font-semibold text-foreground">
                Heading 3 - Foreground
              </h3>
              <p className="text-foreground">
                Body text using foreground color. Lorem ipsum dolor sit amet.
              </p>
              <p className="text-muted-foreground">
                Muted text for secondary information or descriptions.
              </p>
              <p className="text-primary">Primary colored text for emphasis.</p>
              <p className="text-destructive">
                Destructive text for errors or warnings.
              </p>
            </div>
          </div>

          {/* Badges & Pills */}
          <div className="border border-border rounded-xl p-6 bg-card">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              Badges & Status
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                Primary Badge
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                Secondary Badge
              </span>
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                Accent Badge
              </span>
              <span className="px-3 py-1 bg-destructive text-destructive-foreground rounded-full text-sm font-medium">
                Destructive Badge
              </span>
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium">
                Muted Badge
              </span>
            </div>
          </div>

          {/* Borders & Dividers */}
          <div className="border border-border rounded-xl p-6 bg-card">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              Borders & Dividers
            </h3>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <p className="text-foreground">Element with border color</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-foreground">Content after divider</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border-l-4 border-primary bg-primary/5">
                  <p className="text-sm text-foreground">Primary accent</p>
                </div>
                <div className="p-4 border-l-4 border-destructive bg-destructive/5">
                  <p className="text-sm text-foreground">Error accent</p>
                </div>
                <div className="p-4 border-l-4 border-accent bg-accent/5">
                  <p className="text-sm text-foreground">Info accent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
