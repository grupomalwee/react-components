import DebouncedInput from "@/components/ui/form/DebounceInput";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export const DebounceInputPage = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="mt-5 ml-5 flex flex-col gap-8 p-3 rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Busca com debounce (500ms)
            </label>
            <DebouncedInput
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Digite para buscar..."
              rightIcon={<MagnifyingGlassIcon size={16} />}
            />
            <p className="text-xs text-muted-foreground">{searchValue}</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Documentação</h3>

          <div className="bg-gray-800 text-white p-4 rounded-md">
            <h5 className="font-medium mb-2">Como importar:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
              <code>
                {`import DebouncedInput from "@/components/ui/DebounceInput";`}
              </code>
            </pre>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded-md">
            <h5 className="font-medium mb-2">Propriedades:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
              <code>
                {`interface DebouncedInputProps {
  value: string;              // Valor controlado
  onChange: (value: string) => void; // Callback onChange
  debounce?: number;          // Delay em ms (padrão: 500)
  rightIcon?: React.ReactNode; // Ícone à direita
  // + todas as props do InputBase
}`}
              </code>
            </pre>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded-md">
            <h5 className="font-medium mb-2">Exemplo de uso:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
              <code>
                {`const [search, setSearch] = useState("");

<DebouncedInput
  value={search}
  onChange={setSearch}
  debounce={300}
  placeholder="Buscar..."
  rightIcon={<SearchIcon />}
/>

// O onChange só é chamado após 300ms
// sem digitar, evitando chamadas excessivas`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};
