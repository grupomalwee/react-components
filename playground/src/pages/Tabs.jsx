"use client";

import {
  TabsBase,
  TabsListBase,
  TabsTriggerBase,
  TabsContentBase,
} from "@lib"; // Importando os componentes necessários para as abas

export const TabsPage = () => {
  return (
    <div>
      {/* Exemplo de Tabs */}
      <div className="mt-5 ml-5 flex gap-5 p-3 rounded-sm">
        <TabsBase>
          <TabsListBase>
            <TabsTriggerBase value="tab1">Visão Geral</TabsTriggerBase>
            <TabsTriggerBase value="tab2">Adulto</TabsTriggerBase>
            <TabsTriggerBase value="tab3">Infantil</TabsTriggerBase>
          </TabsListBase>

          <TabsContentBase value="tab1">
            <h2>Conteúdo para a Aba 1</h2>
            <p>Este é o conteúdo da primeira aba.</p>
          </TabsContentBase>
          <TabsContentBase value="tab2">
            <h2>Conteúdo para a Aba 2</h2>
            <p>Este é o conteúdo da segunda aba.</p>
          </TabsContentBase>
          <TabsContentBase value="tab3">
            <h2>Conteúdo para a Aba 3</h2>
            <p>Este é o conteúdo da terceira aba.</p>
          </TabsContentBase>
        </TabsBase>
      </div>

      {/* Seção de Documentação */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Bloco de Código para Importação */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import { TabsBase, TabsListBase, TabsTriggerBase, TabsContentBase } from "@/components/ui/TabsBase";`}
            </code>
          </pre>
        </div>

        {/* Bloco de Código para Uso */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<TabsBase>
  <TabsListBase>
    <TabsTriggerBase value="tab1">Tab 1</TabsTriggerBase>
    <TabsTriggerBase value="tab2">Tab 2</TabsTriggerBase>
    <TabsTriggerBase value="tab3">Tab 3</TabsTriggerBase>
  </TabsListBase>

  <TabsContentBase value="tab1">
    <h2>Conteúdo para a Aba 1</h2>
    <p>Este é o conteúdo da primeira aba.</p>
  </TabsContentBase>
  <TabsContentBase value="tab2">
    <h2>Conteúdo para a Aba 2</h2>
    <p>Este é o conteúdo da segunda aba.</p>
  </TabsContentBase>
  <TabsContentBase value="tab3">
    <h2>Conteúdo para a Aba 3</h2>
    <p>Este é o conteúdo da terceira aba.</p>
  </TabsContentBase>
</TabsBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
