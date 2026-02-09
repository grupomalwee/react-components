/**
 *
 * Desenvolvidor de Sistemas Junio
 */
import { ThemeProviderBase } from "./components/theme/theme-provider";

import "./style/global.css";

import { SidebarProviderBase } from "./components/ui/navigation/SidebarBase";
import { Toaster } from "./components/ui/feedback/SonnerBase";
// import { AppSidebar } from "./components/sidebar/AppSidebar";
import { ModeToggleBase } from "./components/theme/mode-toggle";
import ThemeColorTest from "./pages/ThemeColorTest";

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
            {/* <AppSidebar /> */}
            <main className="flex-1">
              <ThemeColorTest />
            </main>
          </SidebarProviderBase>

          <div className="fixed top-3 right-5 z-50">
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
      <Toaster />
    </div>
  );
}

export default App;
