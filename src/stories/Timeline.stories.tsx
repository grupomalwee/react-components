import type { Meta, StoryObj } from "@storybook/react-vite";
import Timeline, { TimelineItem } from "../components/timeline/Timeline";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
};

export default meta;

type Story = StoryObj<typeof Timeline>;

const items: TimelineItem[] = [
  {
    id: 1,
    title: "Projeto iniciado",
    subtitle: "Configuração do repositório",
    description: "Criado repositório e estrutura inicial.",
    date: "2025-10-20",
  },
  {
    id: 2,
    title: "Design aprovado",
    subtitle: "Reunião com stakeholders",
    description: "Mockups aprovados e escopo definido.",
    date: "2025-10-22",
  },
  {
    id: 1,
    title: "Projeto iniciado",
    subtitle: "Configuração do repositório",
    description: "Criado repositório e estrutura inicial.",
    date: "2025-10-20",
  },
  {
    id: 2,
    title: "Design aprovado",
    subtitle: "Reunião com stakeholders",
    description: "Mockups aprovados e escopo definido.",
    date: "2025-10-22",
  },
  {
    id: 1,
    title: "Projeto iniciado",
    subtitle: "Configuração do repositório",
    description: "Criado repositório e estrutura inicial.",
    date: "2025-10-20",
  },
  {
    id: 2,
    title: "Design aprovado",
    subtitle: "Reunião com stakeholders",
    description: "Mockups aprovados e escopo definido.",
    date: "2025-10-22",
  },
  {
    id: 1,
    title: "Projeto iniciado",
    subtitle: "Configuração do repositório",
    description: "Criado repositório e estrutura inicial.",
    date: "2025-10-20",
  },
  {
    id: 2,
    title: "Design aprovado",
    subtitle: "Reunião com stakeholders",
    description: "Mockups aprovados e escopo definido.",
    date: "2025-10-22",
  },
  {
    id: 1,
    title: "Projeto iniciado",
    subtitle: "Configuração do repositório",
    description: "Criado repositório e estrutura inicial.",
    date: "2025-10-20",
  },
  {
    id: 2,
    title: "Design aprovado",
    subtitle: "Reunião com stakeholders",
    description: "Mockups aprovados e escopo definido.",
    date: "2025-10-22",
  },
];

export const Default: Story = {
  args: {
    items,
  },
};
