import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AlertDialogBase, AlertDialogActionBase, AlertDialogCancelBase, AlertDialogContentBase, AlertDialogDescriptionBase, AlertDialogFooterBase, AlertDialogHeaderBase, AlertDialogTitleBase, AlertDialogTriggerBase, } from "@/components/ui/AlertDialogBase";
export const AlertDialogPage = () => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm", children: [_jsx("div", { className: "flex justify-center", children: _jsxs(AlertDialogBase, { children: [_jsx(AlertDialogTriggerBase, { children: "Open" }), _jsxs(AlertDialogContentBase, { children: [_jsxs(AlertDialogHeaderBase, { children: [_jsx(AlertDialogTitleBase, { children: "Are you absolutely sure?" }), _jsx(AlertDialogDescriptionBase, { children: "This action cannot be undone. This will permanently delete your account and remove your data from our servers." })] }), _jsxs(AlertDialogFooterBase, { children: [_jsx(AlertDialogCancelBase, { children: "Cancel" }), _jsx(AlertDialogActionBase, { children: "Continue" })] })] })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import {
  AlertDialogBase,
  AlertDialogActionBase,
  AlertDialogCancelBase,
  AlertDialogContentBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogTriggerBase,
} from "@/components/ui/AlertDialogBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<AlertDialogBase>
  <AlertDialogTriggerBase>Open</AlertDialogTriggerBase>
  <AlertDialogContentBase>
    <AlertDialogHeaderBase>
      <AlertDialogTitleBase>
        Are you absolutely sure?
      </AlertDialogTitleBase>
      <AlertDialogDescriptionBase>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescriptionBase>
    </AlertDialogHeaderBase>
    <AlertDialogFooterBase>
      <AlertDialogCancelBase>Cancel</AlertDialogCancelBase>
      <AlertDialogActionBase>Continue</AlertDialogActionBase>
    </AlertDialogFooterBase>
  </AlertDialogContentBase>
</AlertDialogBase>` }) })] })] })] }) }));
};
