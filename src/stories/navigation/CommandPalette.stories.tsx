import type { Meta, StoryObj } from "@storybook/react-vite";

import { useState } from "react";
import {
  HouseIcon,
  GearIcon,
  UserIcon,
  FileTextIcon,
  SignOutIcon,
  CreditCardIcon,
  BellIcon,
  PaletteIcon,
  ShieldIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ChartLineIcon,
  FolderIcon,
  ChatCircleIcon,
  BookmarkIcon,
  PlugsConnectedIcon,
  KeyIcon,
  TrashIcon,
  DownloadIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import {
  CommandPalette,
  createGroup,
  type CommandItem,
} from "@/components/ui/navigation/command-palette";

const meta: Meta<typeof CommandPalette> = {
  title: "navigation/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Command Palette responsivo que abre com Ctrl + F. No desktop aparece no centro e no mobile no topo.",
      },
    },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string) => {
      setSelected(id);
      setOpen(false);
    };

    const groups = [
      createGroup("sugestoes", "Sugestões", [
        {
          id: "agenda",
          label: "Agenda",
          onSelect: () => handleSelect("agenda"),
        },
        {
          id: "emojis",
          label: "Emojis",
          onSelect: () => handleSelect("emojis"),
        },
        {
          id: "calc",
          label: "Calculadora",
          onSelect: () => handleSelect("calc"),
        },
      ]),
      createGroup("configuracoes", "Configurações", [
        {
          id: "perfil",
          label: "Perfil",
          onSelect: () => handleSelect("perfil"),
        },
        {
          id: "cobranca",
          label: "Cobrança",
          onSelect: () => handleSelect("cobranca"),
        },
        { id: "sair", label: "Sair", onSelect: () => handleSelect("sair") },
      ]),
    ];

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Pressione{" "}
            <kbd className="px-2 py-1 rounded bg-muted border border-border">
              Ctrl + F
            </kbd>{" "}
            para abrir.
          </p>
          {selected && (
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium">
              Selecionado: <span className="font-bold">{selected}</span>
            </div>
          )}
        </div>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          placeholder="O que você está procurando?"
          groups={groups}
          shortcut={{ key: "f", ctrl: true }}
        />
      </div>
    );
  },
};

export const FlatItems: Story = {
  name: "Flat Items (sem grupos)",
  parameters: {
    docs: {
      description: {
        story:
          "Passe `items` diretamente — sem nenhum header de grupo. Útil para palettes simples de ações.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string) => {
      setSelected(id);
      setOpen(false);
    };

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="flex flex-col items-center gap-4">
          <ButtonBase onClick={() => setOpen(true)}>Abrir Palette</ButtonBase>
          {selected && (
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary-foreground">
              Selecionado: <span className="font-bold">{selected}</span>
            </div>
          )}
        </div>
        <CommandPalette
          open={open}
          multiSearch
          onOpenChange={setOpen}
          placeholder="Buscar ação…"
          items={[
            {
              id: "home",
              label: "Início",
              description: "Ir para o dashboard principal",
              icon: <HouseIcon />,
              onSelect: () => handleSelect("home"),
            },
            {
              id: "docs",
              label: "Documentação",
              description: "Ver guias e referências da API",
              icon: <FileTextIcon />,
              onSelect: () => handleSelect("docs"),
            },
            {
              id: "settings",
              label: "Configurações",
              description: "Ajustar preferências da conta",
              icon: <GearIcon />,
              onSelect: () => handleSelect("settings"),
            },
            {
              id: "signout",
              label: "Sair",
              description: "Encerrar sessão atual",
              icon: <SignOutIcon />,
              onSelect: () => handleSelect("signout"),
            },
          ]}
        />
      </div>
    );
  },
};

export const WithIconsAndDescriptions: Story = {
  name: "Com Ícones e Descrições",
  parameters: {
    docs: {
      description: {
        story: "Itens com ícone, label em cima e descrição embaixo.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    const groups = [
      createGroup("navegacao", "Navegação", [
        {
          id: "dashboard",
          label: "Dashboard",
          description: "Visão geral da sua conta",
          icon: <ChartLineIcon />,
          onSelect: () => setOpen(false),
        },
        {
          id: "calendar",
          label: "Calendário",
          description: "Seus eventos e compromissos",
          icon: <CalendarIcon />,
          onSelect: () => setOpen(false),
        },
        {
          id: "files",
          label: "Arquivos",
          description: "Documentos e uploads",
          icon: <FolderIcon />,
          onSelect: () => setOpen(false),
        },
        {
          id: "messages",
          label: "Mensagens",
          description: "Chat com sua equipe",
          icon: <ChatCircleIcon />,
          onSelect: () => setOpen(false),
        },
      ]),
      createGroup("conta", "Conta", [
        {
          id: "profile",
          label: "Perfil",
          description: "Editar informações pessoais",
          icon: <UserIcon />,
          onSelect: () => setOpen(false),
        },
        {
          id: "billing",
          label: "Cobrança",
          description: "Planos e faturas",
          icon: <CreditCardIcon />,
          onSelect: () => setOpen(false),
        },
        {
          id: "notifications",
          label: "Notificações",
          description: "Preferências de alertas",
          icon: <BellIcon />,
          onSelect: () => setOpen(false),
        },
      ]),
    ];

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <ButtonBase onClick={() => setOpen(true)}>Abrir Palette</ButtonBase>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          placeholder="Buscar página ou ação…"
          groups={groups}
          shortcut={{ key: "k", ctrl: true }}
        />
      </div>
    );
  },
};

export const WithKeyboardShortcuts: Story = {
  name: "Com Atalhos de Teclado",
  parameters: {
    docs: {
      description: {
        story: "Itens exibem seus atalhos de teclado no lado direito.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    const groups = [
      createGroup("acoes", "Ações Rápidas", [
        {
          id: "new-file",
          label: "Novo arquivo",
          description: "Criar um documento em branco",
          icon: <FileTextIcon />,
          shortcut: ["⌘", "N"],
          onSelect: () => setOpen(false),
        },
        {
          id: "search",
          label: "Busca global",
          description: "Pesquisar em todo o workspace",
          icon: <MagnifyingGlassIcon />,
          shortcut: ["⌘", "F"],
          onSelect: () => setOpen(false),
        },
        {
          id: "bookmark",
          label: "Favoritar",
          description: "Adicionar à lista de favoritos",
          icon: <BookmarkIcon />,
          shortcut: ["⌘", "D"],
          onSelect: () => setOpen(false),
        },
        {
          id: "export",
          label: "Exportar",
          description: "Baixar como PDF ou CSV",
          icon: <DownloadIcon />,
          shortcut: ["⌘", "E"],
          onSelect: () => setOpen(false),
        },
        {
          id: "open-link",
          label: "Abrir link externo",
          description: "Navegar para URL",
          icon: <ArrowSquareOutIcon />,
          shortcut: ["⌘", "⇧", "O"],
          onSelect: () => setOpen(false),
        },
      ]),
    ];

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <ButtonBase onClick={() => setOpen(true)}>Abrir Palette</ButtonBase>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          placeholder="Digite um comando…"
          groups={groups}
        />
      </div>
    );
  },
};

export const WithBadges: Story = {
  name: "Com Badges",
  parameters: {
    docs: {
      description: {
        story: "Itens com badges coloridos para indicar status ou categoria.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    const groups = [
      createGroup("integrações", "Integrações", [
        {
          id: "slack",
          label: "Slack",
          description: "Conectar workspace do Slack",
          icon: <PlugsConnectedIcon />,
          badge: "Ativo",
          badgeVariant: "success" as const,
          onSelect: () => setOpen(false),
        },
        {
          id: "github",
          label: "GitHub",
          description: "Sincronizar repositórios",
          icon: <PlugsConnectedIcon />,
          badge: "Beta",
          badgeVariant: "warning" as const,
          onSelect: () => setOpen(false),
        },
        {
          id: "stripe",
          label: "Stripe",
          description: "Processar pagamentos",
          icon: <CreditCardIcon />,
          badge: "Novo",
          badgeVariant: "primary" as const,
          onSelect: () => setOpen(false),
        },
        {
          id: "legacy-api",
          label: "API Legada",
          description: "Integração descontinuada",
          icon: <KeyIcon />,
          badge: "Deprecated",
          badgeVariant: "danger" as const,
          onSelect: () => setOpen(false),
        },
      ]),
    ];

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <ButtonBase onClick={() => setOpen(true)}>Abrir Palette</ButtonBase>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          placeholder="Buscar integração…"
          groups={groups}
        />
      </div>
    );
  },
};

export const WithRecentItems: Story = {
  name: "Com Itens Recentes",
  parameters: {
    docs: {
      description: {
        story:
          "Quando `recentItems` é fornecido, aparece um grupo 'Recentes' automaticamente ao abrir.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [recents, setRecents] = useState<CommandItem[]>([
      {
        id: "relatorio-q4",
        label: "Relatório Q4",
        description: "Acessado há 2 minutos",
        icon: <ChartLineIcon />,
        onSelect: () => setOpen(false),
      },
      {
        id: "reuniao-design",
        label: "Reunião de Design",
        description: "Acessado há 1 hora",
        icon: <CalendarIcon />,
        onSelect: () => setOpen(false),
      },
    ]);

    const groups = [
      createGroup("paginas", "Páginas", [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: <ChartLineIcon />,
          onSelect: () => setOpen(false),
        },
        {
          id: "settings",
          label: "Configurações",
          icon: <GearIcon />,
          onSelect: () => setOpen(false),
        },
        {
          id: "profile",
          label: "Perfil",
          icon: <UserIcon />,
          onSelect: () => setOpen(false),
        },
        {
          id: "files",
          label: "Arquivos",
          icon: <FolderIcon />,
          onSelect: () => setOpen(false),
        },
      ]),
    ];

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <p className="text-xs text-muted-foreground">
          Abra e selecione um item para vê-lo aparecer em Recentes.
        </p>
        <ButtonBase onClick={() => setOpen(true)}>Abrir Palette</ButtonBase>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          placeholder="Buscar…"
          groups={groups}
          recentItems={recents}
          onRecentItemsChange={setRecents}
        />
      </div>
    );
  },
};

export const MixedFlatAndGroups: Story = {
  name: "Flat + Grupos Misturados",
  parameters: {
    docs: {
      description: {
        story:
          "Combine `items` (sem header) com `groups` (com header) no mesmo palette.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <ButtonBase onClick={() => setOpen(true)}>Abrir Palette</ButtonBase>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          placeholder="Buscar…"
          items={[
            {
              id: "novo",
              label: "Nova página",
              description: "Criar em branco",
              icon: <FileTextIcon />,
              shortcut: ["⌘", "N"],
              onSelect: () => setOpen(false),
            },
          ]}
          groups={[
            createGroup("config", "Configurações", [
              {
                id: "aparencia",
                label: "Aparência",
                description: "Tema e cores",
                icon: <PaletteIcon />,
                onSelect: () => setOpen(false),
              },
              {
                id: "seguranca",
                label: "Segurança",
                description: "Senha e autenticação",
                icon: <ShieldIcon />,
                onSelect: () => setOpen(false),
              },
            ]),
            createGroup("perigo", "Zona de Perigo", [
              {
                id: "delete-account",
                label: "Excluir conta",
                description: "Ação permanente e irreversível",
                icon: <TrashIcon />,
                badge: "Irreversível",
                badgeVariant: "danger" as const,
                onSelect: () => setOpen(false),
              },
            ]),
          ]}
        />
      </div>
    );
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string) => {
      setSelected(id);
      setOpen(false);
    };

    const groups = [
      createGroup("recentes", "Recentes", [
        {
          id: "relatorios",
          label: "Relatórios de Vendas",
          description: "Atualizado há 5 minutos",
          icon: <ChartLineIcon />,
          onSelect: () => handleSelect("relatorios"),
        },
        {
          id: "usuarios",
          label: "Lista de Usuários",
          description: "234 usuários ativos",
          icon: <UserIcon />,
          onSelect: () => handleSelect("usuarios"),
        },
      ]),
    ];

    return (
      <div className="h-[400px] w-[320px] border border-dashed border-border flex flex-col items-center justify-center gap-4">
        {selected && (
          <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary-foreground">
            Selecionado: <span className="font-bold">{selected}</span>
          </div>
        )}
        <ButtonBase onClick={() => setOpen(true)}>Abrir Busca</ButtonBase>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          placeholder="Busca mobile..."
          groups={groups}
        />
      </div>
    );
  },
};

export const Comprehensive: Story = {
  name: "Exemplo Completo (Dataset Diverso)",
  parameters: {
    docs: {
      description: {
        story:
          "Um exemplo robusto com múltiplos grupos, ícones, descrições, atalhos, badges e busca múltipla habilitada (separe termos por vírgula).",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string) => {
      setSelected(id);
      setOpen(false);
    };

    const groups = [
      createGroup("navegacao", "Navegação", [
        {
          id: "home",
          label: "Dashboard",
          description: "Visão geral do sistema",
          icon: <HouseIcon />,
          shortcut: ["G", "H"],
          onSelect: () => handleSelect("home"),
        },
        {
          id: "reports",
          label: "Relatórios",
          description: "Análise de dados e métricas",
          icon: <ChartLineIcon />,
          shortcut: ["G", "R"],
          onSelect: () => handleSelect("reports"),
        },
        {
          id: "users",
          label: "Usuários",
          description: "Gerenciar permissões e acessos",
          icon: <UserIcon />,
          shortcut: ["G", "U"],
          onSelect: () => handleSelect("users"),
        },
        {
          id: "settings",
          label: "Configurações",
          description: "Preferências globais",
          icon: <GearIcon />,
          shortcut: ["G", "S"],
          onSelect: () => handleSelect("settings"),
        },
      ]),
      createGroup("acoes", "Ações Rápidas", [
        {
          id: "new-user",
          label: "Novo Usuário",
          description: "Convidar colega de equipe",
          icon: <UserIcon weight="bold" />,
          shortcut: ["N", "U"],
          onSelect: () => handleSelect("new-user"),
        },
        {
          id: "upload",
          label: "Enviar Arquivo",
          description: "Upload para o Cloud Storage",
          icon: <DownloadIcon className="rotate-180" />,
          shortcut: ["U", "P"],
          onSelect: () => handleSelect("upload"),
        },
        {
          id: "search-global",
          label: "Busca Global",
          description: "Pesquisar em todo o workspace",
          icon: <MagnifyingGlassIcon />,
          shortcut: ["/"],
          onSelect: () => handleSelect("search-global"),
        },
      ]),
      createGroup("integracoes", "Integrações", [
        {
          id: "slack",
          label: "Slack",
          description: "Conectado agora",
          icon: <PlugsConnectedIcon />,
          badge: "Ativo",
          badgeVariant: "success",
          onSelect: () => handleSelect("slack"),
        },
        {
          id: "github",
          label: "GitHub",
          description: "Sincronização em segundo plano",
          icon: <PlugsConnectedIcon />,
          badge: "Beta",
          badgeVariant: "warning",
          onSelect: () => handleSelect("github"),
        },
        {
          id: "stripe",
          label: "Stripe",
          description: "Processamento de pagamentos",
          icon: <CreditCardIcon />,
          badge: "Novo",
          badgeVariant: "primary",
          onSelect: () => handleSelect("stripe"),
        },
      ]),
      createGroup("sistema", "Sistema", [
        {
          id: "billing",
          label: "Faturamento",
          description: "Planos e assinaturas",
          icon: <CreditCardIcon />,
          onSelect: () => handleSelect("billing"),
        },
        {
          id: "security",
          label: "Segurança",
          description: "Logs e autenticação",
          icon: <ShieldIcon />,
          onSelect: () => handleSelect("security"),
        },
        {
          id: "usage",
          label: "Uso da API",
          description: "Cotas e limites",
          icon: <KeyIcon />,
          onSelect: () => handleSelect("usage"),
        },
      ]),
      createGroup("outros", "Outros", [
        {
          id: "help",
          label: "Ajuda & Suporte",
          description: "Documentação e FAQ",
          icon: <ChatCircleIcon />,
          onSelect: () => handleSelect("help"),
        },
        {
          id: "shortcuts",
          label: "Atalhos de Teclado",
          description: "Ver todos os comandos",
          icon: <FileTextIcon />,
          onSelect: () => handleSelect("shortcuts"),
        },
      ]),
    ];

    const recentItems: CommandItem[] = [
      {
        id: "recent-1",
        label: "Relatório de Vendas Mensal",
        description: "Acessado há 2 minutos",
        icon: <ChartLineIcon />,
        onSelect: () => handleSelect("recent-1"),
      },
      {
        id: "recent-2",
        label: "Configurações de Perfil",
        description: "Acessado há 1 hora",
        icon: <UserIcon />,
        onSelect: () => handleSelect("recent-2"),
      },
    ];

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="flex flex-col items-center gap-4">
          <ButtonBase onClick={() => setOpen(true)}>
            Abrir Palette Completo
          </ButtonBase>
          <p className="text-xs text-muted-foreground text-center max-w-sm">
            Tente buscar por múltiplos termos, ex:{" "}
            <code className="bg-muted px-1 rounded">dashboard, slack</code>
          </p>
          {selected && (
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary-foreground">
              Selecionado: <span className="font-bold">{selected}</span>
            </div>
          )}
        </div>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          placeholder="Busque por páginas, ações ou integrações..."
          groups={groups}
          recentItems={recentItems}
          multiSearch
          shortcut={{ key: "k", ctrl: true }}
        />
      </div>
    );
  },
};
