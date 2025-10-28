import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    // Ordena as stories no sidebar do Storybook
    // Coloca 'Home' como a primeira entrada e mantém o restante com '*'
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
};

export default preview;
