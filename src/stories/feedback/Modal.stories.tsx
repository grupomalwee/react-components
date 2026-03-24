import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ModalBase,
  ModalTriggerBase,
  ModalContentBase,
  ModalHeaderBase,
  ModalFooterBase,
  ModalTitleBase,
  ModalDescriptionBase,
} from "@/components/ui/feedback/ModalBase";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { InputBase } from "@/components/ui/form/InputBase";
import { 
  MapPinLineIcon, 
  PlusIcon, 
  TrashIcon, 
  WarningIcon,
  ArrowLeftIcon,
  FileCsvIcon,
  DownloadSimpleIcon,
  XCircleIcon,
  CheckCircleIcon
} from "@phosphor-icons/react";

import {
  SelectBase,
  SelectTriggerBase,
  SelectValueBase,
  SelectContentBase,
  SelectItemBase,
} from "@/components/ui/SelectBase";
import { TextAreaBase } from "@/components/ui/form/TextAreaBase";
import LabelBase from "@/components/ui/form/LabelBase";

const meta: Meta<typeof ModalBase> = {
  title: "feedback/Modal",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<Record<string, unknown>>;


export const Default: Story = {
  render: () => (
    <ModalBase>
      <ModalTriggerBase asChild>
        <ButtonBase><PlusIcon size={16} /> Editar item</ButtonBase>
      </ModalTriggerBase>
      <ModalContentBase>
        <ModalHeaderBase>
          <ModalTitleBase>Editar item</ModalTitleBase>
          <ModalDescriptionBase>Use este modal para editar informações do item.</ModalDescriptionBase>
        </ModalHeaderBase>
        <div className="py-4 space-y-3">
          <InputBase type="text" placeholder="Nome" label="Nome" />
          <InputBase
            type="text"
            placeholder="Localização"
            label="Local"
            leftIcon={<MapPinLineIcon size={16} />}
          />
          <SelectBase>
            <SelectTriggerBase><SelectValueBase placeholder="Selecione uma fruta" /></SelectTriggerBase>
            <SelectContentBase>
                <SelectItemBase value="apple">Maçã</SelectItemBase>
                <SelectItemBase value="banana">Banana</SelectItemBase>
            </SelectContentBase>
          </SelectBase>
          <LabelBase>Observações</LabelBase>
          <TextAreaBase placeholder="Outro campo" />
        </div>
        <ModalFooterBase>
          <ButtonBase variant="outline">Cancelar</ButtonBase>
          <ButtonBase>Confirmar</ButtonBase>
        </ModalFooterBase>
      </ModalContentBase>
    </ModalBase>
  ),
};




export const ImportCSV: Story = {
  render: () => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = React.useState<string | null>(null);

    const handleClear = () => {
      setFileName(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
      <ModalBase>
        <ModalTriggerBase asChild>
          <ButtonBase variant="outline">
            <FileCsvIcon size={16} /> Abrir Importador
          </ButtonBase>
        </ModalTriggerBase>

        <ModalContentBase size="md">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".csv" 
            onChange={(e) => setFileName(e.target.files?.[0]?.name || null)} 
          />

          <ModalHeaderBase>
            <ModalTitleBase>Importar CSV</ModalTitleBase>
            <ModalDescriptionBase>
              Carregue sua lista de contatos para processamento.
            </ModalDescriptionBase>
          </ModalHeaderBase>

          <div className="py-2 space-y-4">
            {/* Área de Seleção mais baixa e compacta */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all"
            >
              {!fileName ? (
                <>
                  <div className="bg-slate-50 p-3 rounded-full mb-2">
                    <FileCsvIcon size={28} className="text-slate-400" weight="thin" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium text-center">
                    Clique para buscar o arquivo .csv
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <CheckCircleIcon size={32} className="text-green-500 mb-2" weight="fill" />
                  <p className="text-sm font-bold text-slate-800 uppercase italic">{fileName}</p>
                </div>
              )}
            </div>

           
            <div className="flex justify-center">
               <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-colors">
                  <DownloadSimpleIcon size={14} weight="bold" /> Baixar planilha modelo
               </button>
            </div>
          </div>

          <ModalFooterBase>
            
            <ButtonBase 
              variant="outline" 
              onClick={fileName ? handleClear : undefined}
              className="min-w-[100px]"
            >
              {fileName ? "Limpar" : "Cancelar"}
            </ButtonBase>
            <ButtonBase disabled={!fileName} className="min-w-[120px]">
              Processar
            </ButtonBase>
          </ModalFooterBase>
        </ModalContentBase>
      </ModalBase>
    );
  },
};



export const Scrollable: Story = {
  render: () => (
    <ModalBase>
      <ModalTriggerBase asChild>
        <ButtonBase variant="ghost">Ver Termos de Uso</ButtonBase>
      </ModalTriggerBase>
      
      <ModalContentBase size="md" className="max-h-[85vh] flex flex-col">
        <ModalHeaderBase className="border-b pb-6">
          <ModalTitleBase>Termos e Condições</ModalTitleBase>
          <ModalDescriptionBase>Leia atentamente as regras de uso.</ModalDescriptionBase>
        </ModalHeaderBase>

        
        <div className="flex-1 overflow-y-auto py-6 pr-4 custom-scrollbar">
          <div className="space-y-4 text-sm text-slate-500 leading-relaxed font-medium">
            {Array.from({ length: 12 }).map((_, i) => (
              <p key={i}>
                <span className="font-bold text-slate-900">{i + 1}. Cláusula de Exemplo:</span> Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
        </div>

        
        <ModalFooterBase className="border-t pt-6 flex-row justify-end gap-3">
          <ButtonBase 
            variant="ghost" 
            className="min-w-[20px] text-slate-400  tracking-widest"
          >
            Recusar
          </ButtonBase>
          <ButtonBase 
            className="min-w-[140px] tracking-wider shadow-md"
          >
            Aceitar Termos
          </ButtonBase>
        </ModalFooterBase>
      </ModalContentBase>
    </ModalBase>
  ),
};