import { AnnotationList } from "@/components/ui/feedback/annotation-list/AnnotationList";
import { Meta, StoryObj } from "@storybook/react-vite/*";

const meta: Meta<typeof AnnotationList> = {
  title: "Feedback/AnnotationList",
  component: AnnotationList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof AnnotationList>;

export const Default: Story = {
  args: {
    initialAnnotations: [],
  },
};

export const WithAnnotations: Story = {
  args: {
    initialAnnotations: [
      {
        id: "1",
        content:
          "Esta é uma anotação de texto <b>formatada</b> com <i>itálico</i> e <u>sublinhado</u>.",
        createdAt: new Date(),
      },
      {
        id: "2",
        content: "", 
        createdAt: new Date(),
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    initialAnnotations: [],
  },
};
