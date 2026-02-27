import AnimatedCircularProgress from "@/components/ui/data/AnimatedCircularProgress";
import { Meta, StoryObj } from "@storybook/react-vite/*";

const meta:Meta<typeof AnimatedCircularProgress> = {
    title: "data/AnimatedCircularProgress",
    component: AnimatedCircularProgress,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: "Animated Circular Progress para mostrar de forma animada a porcentagem.",
            }
        },
        layout: "centered",
    }
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        max: 100,
        min: 0,
        value: 90
    }
}