"use client";

import * as React from "react";

import {
  NavigationMenuBase,
  NavigationMenuContentBase,
  NavigationMenuItemBase,
  NavigationMenuLinkBase,
  NavigationMenuListBase,
  NavigationMenuTriggerBase,
  navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenuBase";
import { Check, Circle } from "phosphor-react";

const components = [
  {
    title: "Alert Dialog",
    href: "/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/hovercard",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/scrollarea",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuPage() {
  return (
    <div className="p-8">
      <NavigationMenuBase viewport={false}>
        <NavigationMenuListBase>
          <NavigationMenuItemBase>
            <NavigationMenuTriggerBase>Home</NavigationMenuTriggerBase>
            <NavigationMenuContentBase>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLinkBase asChild>
                    <a
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                      href="#"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Beautifully designed components built with Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLinkBase>
                </li>
                <ListItem href="#" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="#" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="#" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContentBase>
          </NavigationMenuItemBase>

          {/* Components */}
          <NavigationMenuItemBase>
            <NavigationMenuTriggerBase>Components</NavigationMenuTriggerBase>
            <NavigationMenuContentBase>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContentBase>
          </NavigationMenuItemBase>

          {/* Docs */}
          <NavigationMenuItemBase>
            <NavigationMenuLinkBase
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <a href="#">Docs</a>
            </NavigationMenuLinkBase>
          </NavigationMenuItemBase>

          {/* List */}
          <NavigationMenuItemBase>
            <NavigationMenuTriggerBase>List</NavigationMenuTriggerBase>
            <NavigationMenuContentBase>
              <ul className="grid w-[300px] gap-4">
                <li>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">
                      <div className="font-medium">Components</div>
                      <div className="text-muted-foreground">
                        Browse all components in the library.
                      </div>
                    </a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">
                      <div className="font-medium">Documentation</div>
                      <div className="text-muted-foreground">
                        Learn how to use the library.
                      </div>
                    </a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">
                      <div className="font-medium">Blog</div>
                      <div className="text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </a>
                  </NavigationMenuLinkBase>
                </li>
              </ul>
            </NavigationMenuContentBase>
          </NavigationMenuItemBase>

          {/* Simple */}
          <NavigationMenuItemBase>
            <NavigationMenuTriggerBase>Simple</NavigationMenuTriggerBase>
            <NavigationMenuContentBase>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">Components</a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">Documentation</a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">Blocks</a>
                  </NavigationMenuLinkBase>
                </li>
              </ul>
            </NavigationMenuContentBase>
          </NavigationMenuItemBase>

          {/* With Icon */}
          <NavigationMenuItemBase>
            <NavigationMenuTriggerBase>With Icon</NavigationMenuTriggerBase>
            <NavigationMenuContentBase>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLinkBase asChild>
                    <a href="#" className="flex items-center gap-2">
                      <Circle />
                      Backlog
                    </a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#" className="flex items-center gap-2">
                      <Circle />
                      To Do
                    </a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#" className="flex items-center gap-2">
                      <Check />
                      Done
                    </a>
                  </NavigationMenuLinkBase>
                </li>
              </ul>
            </NavigationMenuContentBase>
          </NavigationMenuItemBase>
        </NavigationMenuListBase>
      </NavigationMenuBase>

      <div className="my-8">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
              {`"use client";

import * as React from "react";

import {
  NavigationMenuBase,
  NavigationMenuContentBase,
  NavigationMenuItemBase,
  NavigationMenuLinkBase,
  NavigationMenuListBase,
  NavigationMenuTriggerBase,
  navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenuBase";
import { Check, Circle } from "phosphor-react";
`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
              {`<NavigationMenuBase viewport={false}>
        <NavigationMenuListBase>
          <NavigationMenuItemBase>
            <NavigationMenuTriggerBase>Home</NavigationMenuTriggerBase>
            <NavigationMenuContentBase>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLinkBase asChild>
                    <a
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                      href="#"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Beautifully designed components built with Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLinkBase>
                </li>
                <ListItem href="#" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="#" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="#" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContentBase>
          </NavigationMenuItemBase>

          {/* Components */}
          <NavigationMenuItemBase>
            <NavigationMenuTriggerBase>Components</NavigationMenuTriggerBase>
            <NavigationMenuContentBase>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContentBase>
          </NavigationMenuItemBase>

          {/* Docs */}
          <NavigationMenuItemBase>
            <NavigationMenuLinkBase
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <a href="#">Docs</a>
            </NavigationMenuLinkBase>
          </NavigationMenuItemBase>

          {/* List */}
          <NavigationMenuItemBase>
            <NavigationMenuTriggerBase>List</NavigationMenuTriggerBase>
            <NavigationMenuContentBase>
              <ul className="grid w-[300px] gap-4">
                <li>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">
                      <div className="font-medium">Components</div>
                      <div className="text-muted-foreground">
                        Browse all components in the library.
                      </div>
                    </a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">
                      <div className="font-medium">Documentation</div>
                      <div className="text-muted-foreground">
                        Learn how to use the library.
                      </div>
                    </a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">
                      <div className="font-medium">Blog</div>
                      <div className="text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </a>
                  </NavigationMenuLinkBase>
                </li>
              </ul>
            </NavigationMenuContentBase>
          </NavigationMenuItemBase>

          {/* Simple */}
          <NavigationMenuItemBase>
            <NavigationMenuTriggerBase>Simple</NavigationMenuTriggerBase>
            <NavigationMenuContentBase>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">Components</a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">Documentation</a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#">Blocks</a>
                  </NavigationMenuLinkBase>
                </li>
              </ul>
            </NavigationMenuContentBase>
          </NavigationMenuItemBase>

          {/* With Icon */}
          <NavigationMenuItemBase>
            <NavigationMenuTriggerBase>With Icon</NavigationMenuTriggerBase>
            <NavigationMenuContentBase>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLinkBase asChild>
                    <a href="#" className="flex items-center gap-2">
                      <Circle />
                      Backlog
                    </a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#" className="flex items-center gap-2">
                      <Circle />
                      To Do
                    </a>
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase asChild>
                    <a href="#" className="flex items-center gap-2">
                      <Check />
                      Done
                    </a>
                  </NavigationMenuLinkBase>
                </li>
              </ul>
            </NavigationMenuContentBase>
          </NavigationMenuItemBase>
        </NavigationMenuListBase>F
      </NavigationMenuBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLinkBase asChild>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLinkBase>
    </li>
  );
}
