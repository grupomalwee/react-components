import { Leaderboard } from "@/components/ui/LeaderBoard";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Leaderboard> = {
  title: "feedback/LeaderBoard",
  component: Leaderboard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    order: {
      control: "radio",
      options: ["asc", "desc"],
      description: "Ordem da classificação",
    },
    legend: {
      control: "object",
      description: "Legenda da classificação",
    },
    title: {
      control: "text",
      description: "Título da classificação",
    },
    className: {
      control: "text",
      description: "Classe do leaderboard",
    },
    isLoading: {
      control: "boolean",
      description: "Estado de carregamento do leaderboard",
    },
    items: {
      control: "object",
      description: "Items do leaderboard",
    },
  },
  args: {
    order: "desc",
    title: "Classificação",
    legend: ["Participante", "Pontuação"],
    items: [
      { name: "Ana", value: 92 },
      { name: "Bruno", value: 81 },
      { name: "Carla", value: 74 },
      { name: "Daniel", value: 68 },
      { name: "Eduardo", value: 55 },
      { name: "Fernanda", value: 44 },
      { name: "Gabriela", value: 33 },
      { name: "Heitor", value: 28 },
      { name: "Isabela", value: 22 },
      { name: "João", value: 18 },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Leaderboard>;

export const Default: Story = {};

export const AscendingOrder: Story = {
  args: {
    order: "asc",
  },
};

export const DescendingOrder: Story = {
  args: {
    order: "desc",
  },
};

export const CustomTitle: Story = {
  args: {
    title: "Top Players",
  },
};
export const CustomLegend: Story = {
  args: {
    legend: ["Nome", "Nota"],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const StringValues: Story = {
  args: {
    title: "Notas de Turma",
    legend: ["Aluno", "Nota"],
    items: [
      { name: "Pedro", value: "A+" },
      { name: "Maria", value: "A" },
      { name: "Lucas", value: "B+" },
      { name: "Sofia", value: "B" },
      { name: "Miguel", value: "C+" },
      { name: "Julia", value: "C" },
      { name: "Gabriel", value: "D" },
    ],
  },
};

export const MixedValues: Story = {
  args: {
    title: "Ranking Misto",
    legend: ["Participante", "Resultado"],
    items: [
      { name: "Campeão", value: 100 },
      { name: "Vice", value: 95 },
      { name: "Terceiro", value: "Excelente" },
      { name: "Quarto", value: 85 },
      { name: "Quinto", value: "Bom" },
      { name: "Sexto", value: 70 },
      { name: "Sétimo", value: "Regular" },
      { name: "Oitavo", value: 50 },
    ],
  },
};

export const BestValues: Story = {
  args: {
    title: "Ranking Melhor",
    legend: ["Participante", "Resultado"],
    items: [
      { name: "Campeão", value: 100 },
      { name: "Vice", value: 95 },
      { name: "Terceiro", value: "Excelente" },
      { name: "Quarto", value: 85 },
      { name: "Quinto", value: "Bom" },
      { name: "Sexto", value: 70 },
      { name: "Sétimo", value: "Regular" },
      { name: "Oitavo", value: 50 },
    ],
    best: true,
  },
};

export const BadValues: Story = {
  args: {
    title: "Ranking Pior",
    legend: ["Participante", "Resultado"],
    items: [
      { name: "Campeão", value: 100 },
      { name: "Vice", value: 95 },
      { name: "Terceiro", value: "Excelente" },
      { name: "Quarto", value: 85 },
      { name: "Quinto", value: "Bom" },
      { name: "Sexto", value: 70 },
      { name: "Sétimo", value: "Regular" },
      { name: "Oitavo", value: 50 },
    ],
  },
};

