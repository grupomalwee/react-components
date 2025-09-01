import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Gear, Question, User, Star } from '@phosphor-icons/react';
import { 
  CollapsibleBase, 
  CollapsibleContentBase, 
  CollapsibleTriggerBase 
} from '@/components/ui/CollapsibleBase';
import { ButtonBase } from '@/components/ui/ButtonBase';

const meta: Meta<typeof CollapsibleBase> = {
  title: 'forms/Collapsible',
  component: CollapsibleBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente interativo que permite mostrar e esconder conteúdo de forma animada. Ideal para FAQs, configurações e navegação.'
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f6f6f6' },
        { name: 'dark', value: '#222' }
      ]
    },
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controla se o collapsible está aberto ou fechado',
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Callback chamado quando o estado de abertura muda',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Estado inicial de abertura do collapsible',
    },
  },
  args: {
    defaultOpen: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.defaultOpen || false);
    
    return (
      <CollapsibleBase 
        {...args} 
        open={args.open !== undefined ? args.open : isOpen} 
        onOpenChange={setIsOpen}
        className="w-[350px] border rounded-lg"
      >
        <CollapsibleTriggerBase>
          @peduarte starred 3 repositories
        </CollapsibleTriggerBase>
        
        <div className="px-4 pb-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm bg-muted/30">
            @radix-ui/primitives
          </div>
        </div>
        
        <CollapsibleContentBase>
          <div className="space-y-2 px-4 pb-4">
            <div className="rounded-md border px-4 py-3 font-mono text-sm bg-muted/30">
              @radix-ui/colors
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm bg-muted/30">
              @stitches/react
            </div>
          </div>
        </CollapsibleContentBase>
      </CollapsibleBase>
    );
  },
};

export const WithLeftIcon: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.defaultOpen || false);
    
    return (
      <div style={{ display: 'flex', gap: 12, flexDirection: 'column', width: '400px' }}>
        <CollapsibleBase 
          open={isOpen} 
          onOpenChange={setIsOpen}
          className="border rounded-lg"
        >
          <CollapsibleTriggerBase leftIcon={<User />}>
            Perfil do Usuário
          </CollapsibleTriggerBase>
          <CollapsibleContentBase>
            <div className="px-4 pb-4 space-y-2">
              <p className="text-sm text-muted-foreground">Nome: João Silva</p>
              <p className="text-sm text-muted-foreground">Email: joao@exemplo.com</p>
              <p className="text-sm text-muted-foreground">Cargo: Desenvolvedor</p>
            </div>
          </CollapsibleContentBase>
        </CollapsibleBase>
      </div>
    );
  },
};

export const FAQ: Story = {
  render: () => {
    const faqItems = [
      {
        question: "O que é o Collapsible?",
        answer: "O Collapsible é um componente que permite mostrar e esconder conteúdo de forma animada.",
        icon: <Question />
      },
      {
        question: "Como usar o Collapsible?",
        answer: "Você pode usar o Collapsible importando os componentes CollapsibleBase, CollapsibleTriggerBase e CollapsibleContentBase.",
        icon: <Gear />
      },
      {
        question: "É possível customizar as animações?",
        answer: "Sim, as animações podem ser customizadas através de classes CSS ou modificando o Tailwind config.",
        icon: <Star />
      }
    ];

    return (
      <div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {faqItems.map((item, index) => (
          <CollapsibleFAQItem 
            key={index}
            question={item.question}
            answer={item.answer}
            icon={item.icon}
          />
        ))}
      </div>
    );
  },
};

export const RichContent: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.defaultOpen || false);
    
    return (
      <CollapsibleBase 
        {...args}
        open={args.open !== undefined ? args.open : isOpen} 
        onOpenChange={setIsOpen}
        className="w-[450px] border rounded-lg"
      >
        <CollapsibleTriggerBase leftIcon={<Gear />}>
          Configurações Avançadas
        </CollapsibleTriggerBase>
        
        <CollapsibleContentBase>
          <div className="p-4 pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">API Key</label>
                <input 
                  className="w-full mt-1 px-3 py-2 border rounded-md" 
                  placeholder="sk-..." 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Environment</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md">
                  <option>Development</option>
                  <option>Production</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea 
                className="w-full mt-1 px-3 py-2 border rounded-md" 
                rows={3}
                placeholder="Descrição das configurações..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <ButtonBase variant="outline" size="sm">
                Cancelar
              </ButtonBase>
              <ButtonBase size="sm">
                Salvar
              </ButtonBase>
            </div>
          </div>
        </CollapsibleContentBase>
      </CollapsibleBase>
    );
  },
};

function CollapsibleFAQItem({ 
  question, 
  answer, 
  icon 
}: { 
  question: string; 
  answer: string; 
  icon: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <CollapsibleBase open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg">
      <CollapsibleTriggerBase leftIcon={icon}>
        {question}
      </CollapsibleTriggerBase>
      <CollapsibleContentBase>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          {answer}
        </div>
      </CollapsibleContentBase>
    </CollapsibleBase>
  );
}
