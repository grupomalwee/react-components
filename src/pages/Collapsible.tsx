import * as React from "react"
import { 
  CollapsibleBase, 
  CollapsibleContentBase, 
  CollapsibleTriggerBase 
} from "@/components/ui/CollapsibleBase"
import { ButtonBase } from "@/components/ui/ButtonBase"
import { GearIcon, StarIcon, QuestionIcon, CodeIcon, GitBranchIcon } from "@phosphor-icons/react"

export function CollapsiblePage() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isOpenAdvanced, setIsOpenAdvanced] = React.useState(false)

  return (
    <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
      <h2 className="font-bold text-2xl">Collapsible</h2>

      {/* Exemplo Básico */}
      <div className="flex flex-wrap gap-4">
        <CollapsibleBase open={isOpen} onOpenChange={setIsOpen} className="w-[350px] border rounded-lg">
          <CollapsibleTriggerBase 
            className="flex items-center justify-between w-full p-4"
            leftIcon={<GitBranchIcon />}
          >
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
      </div>

      <h2 className="font-bold text-2xl mt-6">Exemplo Avançado</h2>
      <div className="flex-wrap">
        <CollapsibleBase 
          open={isOpenAdvanced} 
          onOpenChange={setIsOpenAdvanced} 
          className="w-[450px] border rounded-lg"
        >
          <CollapsibleTriggerBase 
            className="flex items-center justify-between w-full p-4"
            leftIcon={<GearIcon />}
          >
            Configurações Avançadas
          </CollapsibleTriggerBase>
          
          <CollapsibleContentBase>
            <div className="p-4 pt-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">API Key</label>
                  <input className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="sk-..." />
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
      </div>

      <h2 className="font-bold text-2xl mt-6">FAQ - Múltiplos Collapsibles</h2>
      <div className="w-[500px] space-y-2">
        {[
          {
            question: "O que é o Collapsible?",
            answer: "O Collapsible é um componente que permite mostrar e esconder conteúdo de forma animada.",
            icon: <QuestionIcon />
          },
          {
            question: "Como usar o Collapsible?",
            answer: "Você pode usar o Collapsible importando os componentes CollapsibleBase, CollapsibleTriggerBase e CollapsibleContentBase.",
            icon: <CodeIcon />
          },
          {
            question: "É possível customizar as animações?",
            answer: "Sim, as animações podem ser customizadas através de classes CSS ou modificando o Tailwind config.",
            icon: <StarIcon />
          }
        ].map((item, index) => (
          <CollapsibleFAQItem 
            key={index}
            question={item.question}
            answer={item.answer}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h4 className="text-lg font-bold mb-2">Como usar:</h4>
          <pre className="text-sm">
{`import { 
  CollapsibleBase, 
  CollapsibleContentBase, 
  CollapsibleTriggerBase 
} from "@/components/ui/CollapsibleBase";

<CollapsibleBase>
  <CollapsibleTriggerBase leftIcon={<Icon />}>
    Título do collapsible
  </CollapsibleTriggerBase>
  <CollapsibleContentBase>
    <div>Conteúdo que será expandido</div>
  </CollapsibleContentBase>
</CollapsibleBase>`}
          </pre>
        </div>
      </div>
    </div>
  )
}

function CollapsibleFAQItem({ 
  question, 
  answer, 
  icon 
}: { 
  question: string; 
  answer: string; 
  icon?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <CollapsibleBase open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg">
      <CollapsibleTriggerBase 
        className="flex items-center justify-between w-full p-4"
        leftIcon={icon}
      >
        {question}
      </CollapsibleTriggerBase>
      <CollapsibleContentBase>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          {answer}
        </div>
      </CollapsibleContentBase>
    </CollapsibleBase>
  )
}
