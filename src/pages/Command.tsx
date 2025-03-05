import {
  CommandBase,
  // CommandDialogBase,
  CommandEmptyBase,
  CommandGroupBase,
  CommandInputBase,
  CommandItemBase,
  CommandListBase,
  CommandSeparatorBase,
  // CommandShortcutBase,
} from "@/components/ui/CommandBase";

export const CommandPage = () => {
  return (
    <>
      {/* Command Component */}
      <div className="mt-5 ml-5 flex gap-5 p-3 rounded-sm">
        <CommandBase>
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
        </CommandBase>
      </div>

      {/* Linha separadora e Título de Documentação */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Bloco de Código para Importação */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import {
  CommandBase,
  CommandDialogBase,
  CommandEmptyBase,
  CommandGroupBase,
  CommandInputBase,
  CommandItemBase,
  CommandListBase,
  CommandSeparatorBase,
  CommandShortcutBase,
} from "@/components/ui/CommandBase";`}
            </code>
          </pre>
        </div>

        {/* Bloco de Código para Uso */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<CommandBase>
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
</CommandBase>`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
};
