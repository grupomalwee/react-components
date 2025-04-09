import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonBase } from "../components/ui/ButtonBase"; // Importando o Button do ShadCN
import { Toaster, toast } from "sonner"; // Importando o Toaster e toast do Sonner
export default function RootLayout() {
    // Função que dispara a notificação
    const handleClick = () => {
        toast.success("Você clicou no botão e ativou o Sonner!");
    };
    return (_jsxs("html", { lang: "en", children: [_jsx("head", {}), _jsxs("body", { children: [_jsxs("main", { children: [_jsx("h1", { children: "Documento de Notifica\u00E7\u00E3o com Sonner" }), _jsx(ButtonBase, { onClick: handleClick, children: "Clique para ativar a notifica\u00E7\u00E3o" })] }), _jsx(Toaster, {}), " "] })] }));
}
