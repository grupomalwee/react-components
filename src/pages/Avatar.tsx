import {
  AvatarBase,
  AvatarFallbackBase,
  AvatarImageBase,
} from "@/components/ui/AvatarBase";

export const AvatarPage = () => {
  return (
    <div className="mt-5 ml-5 flex flex-col gap-10 p-4 rounded-sm">

      <section>
        <h3 className="text-lg font-semibold mb-2">Avatar padrão</h3>
        <AvatarBase>
          <AvatarImageBase src="https://github.com/grupomalwee.png" />
          <AvatarFallbackBase>CN</AvatarFallbackBase>
        </AvatarBase>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Avatar com borda</h3>
        <AvatarBase className="ring-2 ring-primary">
          <AvatarImageBase src="https://github.com/grupomalwee.png" />
          <AvatarFallbackBase>CN</AvatarFallbackBase>
        </AvatarBase>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Avatar em escala de cinza</h3>
        <AvatarBase className="grayscale">
          <AvatarImageBase src="https://github.com/grupomalwee.png" />
          <AvatarFallbackBase>CN</AvatarFallbackBase>
        </AvatarBase>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Avatares agrupados</h3>
        <div className="flex -space-x-3">
          <AvatarBase className="ring-2 ring-background">
            <AvatarImageBase src="https://github.com/grupomalwee.png" />
            <AvatarFallbackBase>CN</AvatarFallbackBase>
          </AvatarBase>
          <AvatarBase className="ring-2 ring-background">
            <AvatarImageBase src="https://github.com/grupomalwee.png" />
            <AvatarFallbackBase>LR</AvatarFallbackBase>
          </AvatarBase>
          <AvatarBase className="ring-2 ring-background">
            <AvatarImageBase src="https://github.com/grupomalwee.png" />
            <AvatarFallbackBase>ER</AvatarFallbackBase>
          </AvatarBase>
        </div>
      </section>

      {/* Documentação */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Bloco de Código para Importação */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
{`import {
  AvatarBase,
  AvatarFallbackBase,
  AvatarImageBase,
} from "@/components/ui/AvatarBase";`}
            </code>
          </pre>
        </div>

        {/* Bloco de Código para Uso */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
{`<AvatarBase>
  <AvatarImageBase src="https://github.com/shadcn.png" />
  <AvatarFallbackBase>CN</AvatarFallbackBase>
</AvatarBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
