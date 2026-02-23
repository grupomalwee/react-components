import type { Preview } from "@storybook/react-vite";
import { withPerformance } from "storybook-addon-performance";
import "../src/style/global.css";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Home", "*"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
          { value: "light-purple", icon: "sun", title: "Light Purple" },
          { value: "light-blue", icon: "moon", title: "Light Blue" },
          { value: "light-green", icon: "sun", title: "Light Green" },
          { value: "dark-purple", icon: "moon", title: "Dark Purple" },
          { value: "dark-blue", icon: "sun", title: "Dark Blue" },
          { value: "dark-green", icon: "moon", title: "Dark Green" },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";

      const html = window.document.documentElement;
      const themes = [
        "light",
        "dark",
        "light-purple",
        "light-blue",
        "light-green",
        "dark-purple",
        "dark-blue",
        "dark-green",
      ];

      html.classList.remove(...themes);
      html.classList.add(theme);

      if (theme.includes("dark")) {
        html.classList.add("dark");
      }

      return Story();
    },
    withPerformance,
  ],
};

export default preview;
