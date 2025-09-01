import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { LoadingBase } from '@/components/ui/LoadingBase';
import { ButtonBase } from '@/components/ui/ButtonBase';

const meta: Meta<typeof LoadingBase> = {
  title: 'forms/Loading',
  component: LoadingBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente para indicar estados de carregamento com spinner animado. Suporte a mensagens, overlay e diferentes tamanhos e variantes.'
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do spinner',
    },
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'success', 'warning'],
      description: 'Variante de cor',
    },
    message: {
      control: 'text',
      description: 'Mensagem a ser exibida',
    },
    overlay: {
      control: 'boolean',
      description: 'Exibir como overlay de tela cheia',
    },
  },
  args: {
    size: 'md',
    variant: 'default',
    overlay: false,
  },
};

export default meta;
type Story = StoryObj<typeof LoadingBase>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div style={{ textAlign: 'center' }}>
        <LoadingBase size="sm" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingBase size="md" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingBase size="lg" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Large</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingBase size="xl" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Extra Large</p>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div style={{ textAlign: 'center' }}>
        <LoadingBase variant="default" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Default</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingBase variant="secondary" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Secondary</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingBase variant="success" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Success</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingBase variant="warning" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Warning</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingBase variant="destructive" />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Destructive</p>
      </div>
    </div>
  ),
};

export const WithMessage: Story = {
  args: {
    message: 'Carregando dados...',
  },
};

export const WithMessages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px 0', alignItems: 'center' }}>
      <LoadingBase message="Carregando dados..." variant="default" />
      <LoadingBase message="Salvando alterações..." variant="success" />
      <LoadingBase message="Atenção: Conexão lenta" variant="warning" />
      <LoadingBase message="Erro na conexão" variant="destructive" />
    </div>
  ),
};

export const InButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <ButtonBase disabled style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LoadingBase size="sm" />
        Salvando...
      </ButtonBase>
      
      <ButtonBase variant="secondary" disabled style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LoadingBase size="sm" variant="secondary" />
        Processando
      </ButtonBase>
      
      <ButtonBase variant="destructive" disabled style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LoadingBase size="sm" variant="destructive" />
        Deletando
      </ButtonBase>
    </div>
  ),
};

export const LoadingOverlay: Story = {
  render: () => {
    const [showOverlay, setShowOverlay] = React.useState(false);
    
    const handleShowOverlay = () => {
      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 3000);
    };

    return (
      <div style={{ position: 'relative', padding: '32px', minHeight: '200px', textAlign: 'center' }}>
        {showOverlay && (
          <LoadingBase 
            overlay 
            message="Processando dados..." 
            size="lg"
          />
        )}
        
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>Loading Overlay</h3>
          <p style={{ marginBottom: '24px', color: '#666', fontSize: '14px' }}>
            Clique no botão para mostrar o overlay por 3 segundos
          </p>
          <ButtonBase onClick={handleShowOverlay}>
            Mostrar Loading Overlay
          </ButtonBase>
        </div>
      </div>
    );
  },
};

export const InCard: Story = {
  render: () => (
    <div style={{ padding: '32px', maxWidth: '400px' }}>
      <div style={{ 
        padding: '48px 32px', 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        textAlign: 'center'
      }}>
        <LoadingBase 
          size="lg" 
          message="Carregando informações do usuário..." 
        />
      </div>
    </div>
  ),
};
