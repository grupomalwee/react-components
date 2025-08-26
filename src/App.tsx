import { ThemeProviderBase } from "@/components/theme-provider";

import "./style/global.css";

// Components

import { ModeToggleBase } from "./components/mode-toggle";

import { SidebarProviderBase } from "@/components/ui/SidebarBase";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";

function App() {
  return (
    <div>
      {/*
    Temas disponíveis com a paleta de cores Malwee:
    - "light": Tema claro padrão
    - "light-purple": Tema claro com tonalidade roxa
    - "light-green": Tema claro com tonalidade verde
    - "light-blue": Tema claro com tonalidade azul
    - "dark": Tema escuro padrão
    - "dark-purple": Tema escuro com tonalidade roxa
    - "dark-green": Tema escuro com tonalidade verde
    - "dark-blue": Tema escuro com tonalidade azul
    - "system": Tema baseado na preferência do sistema (claro ou escuro)
  */}
      <ThemeProviderBase defaultTheme="light-purple" storageKey="app-ui-theme">
        <div className="flex">
          <SidebarProviderBase>
            <AppSidebar />
            <main></main>
          </SidebarProviderBase>

          <div className="mt-3 mr-5  inline-block rounded-md h-10">
            <ModeToggleBase
              themes={[
                "light",
                "light-purple",
                "light-blue",
                "light-green",
                "dark",
                "dark-blue",
                "dark-purple",
                "dark-green",
              ]}
            />
          </div>
        </div>
      </ThemeProviderBase>
    </div>
  );
}

export default App;
