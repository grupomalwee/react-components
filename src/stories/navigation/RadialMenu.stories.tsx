import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuItem, RadialMenu } from "@/components/ui/navigation/RadialMenu";
import { TrashIcon, CopyIcon, DownloadIcon, PencilIcon } from "@phosphor-icons/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";

interface ModalFormContentProps {
  item: MenuItem;
  onClose: () => void;
}

const meta: Meta<typeof RadialMenu> = {
  title: "Navigation/RadialMenu",
  component: RadialMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "range", min: 100, max: 500, step: 10 } },
    iconSize: { control: { type: "range", min: 12, max: 48, step: 2 } },
    bandWidth: { control: { type: "range", min: 20, max: 100, step: 5 } },
  },
};

export default meta;
type Story = StoryObj<typeof RadialMenu>;


const CRUD_ITEMS: MenuItem[] = [
  { id: "edit", label: "Editar", icon: PencilIcon },
  { id: "copy", label: "Copiar", icon: CopyIcon },
  { id: "download", label: "Baixar", icon: DownloadIcon },
  { id: "delete", label: "Excluir", icon: TrashIcon, color: "danger" },
];

const ModalFormContent = ({ item, onClose }: ModalFormContentProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  
  const CONFIRMATION_PHRASE = `delete/item-${item.id}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  if (item.label === "Delete") {
    const isMatched = confirmText === CONFIRMATION_PHRASE;

    return (
      <div className="space-y-4">
        <div className="p-4 bg-destructive/10 rounded-lg text-destructive text-sm leading-relaxed">
          <p className="font-bold mb-1 underline">Atenção: Ação Irreversível</p>
          Esta operação excluirá permanentemente o item e todos os dados vinculados.
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Para confirmar, digite <span className="font-mono font-bold text-foreground select-all bg-muted px-1 rounded">{CONFIRMATION_PHRASE}</span> abaixo:
          </label>
          <input 
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-destructive/30 focus:border-destructive transition-all"
            placeholder="Digite a frase de confirmação"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <button 
            type="button"
            onClick={handleSubmit} 
            disabled={!isMatched || isSubmitting}
            className={`w-full px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm
              ${isMatched 
                ? "bg-destructive text-destructive-foreground hover:opacity-90 active:scale-[0.98]" 
                : "bg-muted text-muted-foreground cursor-not-allowed"}`}
          >
            {isSubmitting ? "Processando..." : "Entendo as consequências, excluir item"}
          </button>
          <button 
            type="button"
            onClick={onClose} 
            className="w-full px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors text-muted-foreground"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <label className="text-sm font-medium leading-none">Nome do Item</label>
        <input 
          required
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="Ex: Registro Alpha"
          defaultValue={item.label === "Copy" ? `${item.label} de ${item.id}` : `Item #${item.id}`}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium leading-none">Descrição</label>
        <textarea 
          className="flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="Notas sobre esta operação..."
        />
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">Cancelar</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 shadow-sm">
          {isSubmitting ? "Salvando..." : `Confirmar ${item.label}`}
        </button>
      </div>
    </form>
  );
};

const RadialMenuStandardTemplate = (args: React.ComponentProps<typeof RadialMenu>) => {
  const [selectedItem, setSelectedItem] = React.useState<MenuItem | null>(null);

  return (
    <div className="flex items-center justify-center min-h-[500px] w-full bg-grid-black/[0.02] dark:bg-grid-white/[0.02] relative p-4">
      <RadialMenu 
        {...args} 
        onSelect={(item) => {
          args.onSelect?.(item);
          setSelectedItem(item as MenuItem);
        }} 
      >
        <div className="flex items-center justify-center size-64 bg-background border rounded-2xl shadow-sm text-muted-foreground font-medium select-none cursor-pointer hover:shadow-md transition-all text-center p-4">
          Botão direito ou pressione aqui
        </div>
      </RadialMenu>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-background rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 bg-muted/10">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                Ação: {selectedItem.label}
              </h3>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <XIcon size={20} weight="bold" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <selectedItem.icon size={28} weight="fill" />
                </div>
                <div>
                  <h4 className="font-bold text-xl leading-tight">{selectedItem.label}</h4>
                  <p className="text-xs text-muted-foreground italic">ID de Operação: {selectedItem.id}</p>
                </div>
              </div>

              <ModalFormContent 
                item={selectedItem} 
                onClose={() => setSelectedItem(null)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  render: () => <RadialMenuStandardTemplate menuItems={CRUD_ITEMS} />,
};

export const MobileSimulation: Story = {
  render: () => <RadialMenuStandardTemplate menuItems={CRUD_ITEMS} />,
};

export const Playground: Story = {
  render: () => {
    return <RadialMenuStandardTemplate menuItems={CRUD_ITEMS} />;
  },
};