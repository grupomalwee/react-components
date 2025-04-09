import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CommandBase, 
// CommandDialogBase,
CommandEmptyBase, CommandGroupBase, CommandInputBase, CommandItemBase, CommandListBase, CommandSeparatorBase,
// CommandShortcutBase,
 } from "@/components/ui/CommandBase";
export const CommandPage = () => {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "mt-5 ml-5 flex gap-5 p-3 rounded-sm", children: _jsxs(CommandBase, { children: [_jsx(CommandInputBase, { placeholder: "Type a command or search..." }), _jsxs(CommandListBase, { children: [_jsx(CommandEmptyBase, { children: "No results found." }), _jsxs(CommandGroupBase, { heading: "Suggestions", children: [_jsx(CommandItemBase, { children: "Calendar" }), _jsx(CommandItemBase, { children: "Search Emoji" }), _jsx(CommandItemBase, { children: "Calculator" })] }), _jsx(CommandSeparatorBase, {}), _jsxs(CommandGroupBase, { heading: "Settings", children: [_jsx(CommandItemBase, { children: "Profile" }), _jsx(CommandItemBase, { children: "Billing" }), _jsx(CommandItemBase, { children: "Settings" })] })] })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import {
  CommandBase,
  CommandDialogBase,
  CommandEmptyBase,
  CommandGroupBase,
  CommandInputBase,
  CommandItemBase,
  CommandListBase,
  CommandSeparatorBase,
  CommandShortcutBase,
} from "@/components/ui/CommandBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<CommandBase>
  <CommandInputBase placeholder="Type a command or search..." />
  <CommandListBase>
    <CommandEmptyBase>No results found.</CommandEmptyBase>
    <CommandGroupBase heading="Suggestions">
      <CommandItemBase>Calendar</CommandItemBase>
      <CommandItemBase>Search Emoji</CommandItemBase>
      <CommandItemBase>Calculator</CommandItemBase>
    </CommandGroupBase>
    <CommandSeparatorBase />
    <CommandGroupBase heading="Settings">
      <CommandItemBase>Profile</CommandItemBase>
      <CommandItemBase>Billing</CommandItemBase>
      <CommandItemBase>Settings</CommandItemBase>
    </CommandGroupBase>
  </CommandListBase>
</CommandBase>` }) })] })] })] }));
};
