import type { Preview, Decorator } from "@storybook/react-vite";
import { withPerformance } from "storybook-addon-performance";
import "../src/style/global.css";

const THEMES = [
  "light", "dark",
  "light-purple", "light-blue", "light-green",
  "dark-purple", "dark-blue", "dark-green",
] as const;

type Theme = (typeof THEMES)[number];

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.classList.remove(...THEMES, "dark");
  html.classList.add(theme);
  if (theme.startsWith("dark")) html.classList.add("dark");
  html.style.colorScheme = theme.startsWith("dark") ? "dark" : "light";
}

function applyMotion(motion: string) {
  const html = document.documentElement;
  html.dataset.motion = motion;
  const dur = motion === "none" ? "0ms" : motion === "reduced" ? "100ms" : "";
  dur
    ? html.style.setProperty("--transition-duration", dur)
    : html.style.removeProperty("--transition-duration");
}

function applyLocale(locale: string) {
  document.documentElement.lang = locale;
}

const withGlobals: Decorator = (Story, context) => {
  applyTheme((context.globals.theme as Theme) || "light");
  applyMotion(context.globals.motion || "full");
  applyLocale(context.globals.locale || "pt-BR");
  return Story();
};

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Home", "Getting Started", "Design Tokens", "Components", "*"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      hideNoControlsWarning: true,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: { disable: true },
    viewport: {
      viewports: {
        xs:    { name: "XS  375px",  styles: { width: "375px",  height: "667px"  } },
        sm:    { name: "SM  640px",  styles: { width: "640px",  height: "800px"  } },
        md:    { name: "MD  768px",  styles: { width: "768px",  height: "1024px" } },
        lg:    { name: "LG  1024px", styles: { width: "1024px", height: "768px"  } },
        xl:    { name: "XL  1280px", styles: { width: "1280px", height: "900px"  } },
        "2xl": { name: "2XL 1536px", styles: { width: "1536px", height: "960px"  } },
      },
      defaultViewport: "responsive",
    },
    a11y: {
      config: {
        rules: [
          { id: "landmark-one-main",    enabled: false },
          { id: "page-has-heading-one", enabled: false },
          { id: "region",               enabled: false },
        ],
      },
      manual: false,
    },
    docs: {
      toc: { headingSelector: "h1, h2, h3", title: "Conteúdo" },
    },
    layout: "padded",
  },

  globalTypes: {
    theme: {
      name: "Theme",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        dynamicTitle: true,
        showName: true,
        items: [
          { value: "light",        icon: "sun",  title: "Light"        },
          { value: "dark",         icon: "moon", title: "Dark"         },
          { value: "light-purple", icon: "sun",  title: "Light Purple" },
          { value: "light-blue",   icon: "sun",  title: "Light Blue"   },
          { value: "light-green",  icon: "sun",  title: "Light Green"  },
          { value: "dark-purple",  icon: "moon", title: "Dark Purple"  },
          { value: "dark-blue",    icon: "moon", title: "Dark Blue"    },
          { value: "dark-green",   icon: "moon", title: "Dark Green"   },
        ],
      },
    },
  },

  decorators: [withGlobals, withPerformance],
};

export default preview;