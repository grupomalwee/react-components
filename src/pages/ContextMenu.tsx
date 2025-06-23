import {
  ContextMenuBase,
  ContextMenuCheckboxItemBase,
  ContextMenuContentBase,
  ContextMenuItemBase,
  ContextMenuLabelBase,
  ContextMenuRadioGroupBase,
  ContextMenuRadioItemBase,
  ContextMenuSeparatorBase,
  ContextMenuShortcutBase,
  ContextMenuSubBase,
  ContextMenuSubContentBase,
  ContextMenuSubTriggerBase,
  ContextMenuTriggerBase,
} from "@/components/ui/ContextMenuBase";

export function ContextMenuPage() {
  return (
    <div className="p-8">
      <ContextMenuBase>
        <ContextMenuTriggerBase className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here
        </ContextMenuTriggerBase>
        <ContextMenuContentBase className="w-52">
          <ContextMenuItemBase inset>
            Back
            <ContextMenuShortcutBase>⌘[</ContextMenuShortcutBase>
          </ContextMenuItemBase>
          <ContextMenuItemBase inset disabled>
            Forward
            <ContextMenuShortcutBase>⌘]</ContextMenuShortcutBase>
          </ContextMenuItemBase>
          <ContextMenuItemBase inset>
            Reload
            <ContextMenuShortcutBase>⌘R</ContextMenuShortcutBase>
          </ContextMenuItemBase>
          <ContextMenuSubBase>
            <ContextMenuSubTriggerBase inset>
              More Tools
            </ContextMenuSubTriggerBase>
            <ContextMenuSubContentBase className="w-44">
              <ContextMenuItemBase>Save Page...</ContextMenuItemBase>
              <ContextMenuItemBase>Create Shortcut...</ContextMenuItemBase>
              <ContextMenuItemBase>Name Window...</ContextMenuItemBase>
              <ContextMenuSeparatorBase />
              <ContextMenuItemBase>Developer Tools</ContextMenuItemBase>
              <ContextMenuSeparatorBase />
              <ContextMenuItemBase variant="destructive">
                Delete
              </ContextMenuItemBase>
            </ContextMenuSubContentBase>
          </ContextMenuSubBase>
          <ContextMenuSeparatorBase />
          <ContextMenuCheckboxItemBase checked>
            Show Bookmarks
          </ContextMenuCheckboxItemBase>
          <ContextMenuCheckboxItemBase>
            Show Full URLs
          </ContextMenuCheckboxItemBase>
          <ContextMenuSeparatorBase />
          <ContextMenuRadioGroupBase value="pedro">
            <ContextMenuLabelBase inset>People</ContextMenuLabelBase>
            <ContextMenuRadioItemBase value="pedro">
              Pedro Duarte
            </ContextMenuRadioItemBase>
            <ContextMenuRadioItemBase value="colm">
              Colm Tuite
            </ContextMenuRadioItemBase>
          </ContextMenuRadioGroupBase>
        </ContextMenuContentBase>
      </ContextMenuBase>

      <div className="my-8">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
              {`import {
  ContextMenuBase,
  ContextMenuCheckboxItemBase,
  ContextMenuContentBase,
  ContextMenuItemBase,
  ContextMenuLabelBase,
  ContextMenuRadioGroupBase,
  ContextMenuRadioItemBase,
  ContextMenuSeparatorBase,
  ContextMenuShortcutBase,
  ContextMenuSubBase,
  ContextMenuSubContentBase,
  ContextMenuSubTriggerBase,
  ContextMenuTriggerBase,
} from "@/components/ui/ContextMenuBase";
`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
              {` <ContextMenuBase>
        <ContextMenuTriggerBase className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here
        </ContextMenuTriggerBase>
        <ContextMenuContentBase className="w-52">
          <ContextMenuItemBase inset>
            Back
            <ContextMenuShortcutBase>⌘[</ContextMenuShortcutBase>
          </ContextMenuItemBase>
          <ContextMenuItemBase inset disabled>
            Forward
            <ContextMenuShortcutBase>⌘]</ContextMenuShortcutBase>
          </ContextMenuItemBase>
          <ContextMenuItemBase inset>
            Reload
            <ContextMenuShortcutBase>⌘R</ContextMenuShortcutBase>
          </ContextMenuItemBase>
          <ContextMenuSubBase>
            <ContextMenuSubTriggerBase inset>
              More Tools
            </ContextMenuSubTriggerBase>
            <ContextMenuSubContentBase className="w-44">
              <ContextMenuItemBase>Save Page...</ContextMenuItemBase>
              <ContextMenuItemBase>Create Shortcut...</ContextMenuItemBase>
              <ContextMenuItemBase>Name Window...</ContextMenuItemBase>
              <ContextMenuSeparatorBase />
              <ContextMenuItemBase>Developer Tools</ContextMenuItemBase>
              <ContextMenuSeparatorBase />
              <ContextMenuItemBase variant="destructive">
                Delete
              </ContextMenuItemBase>
            </ContextMenuSubContentBase>
          </ContextMenuSubBase>
          <ContextMenuSeparatorBase />
          <ContextMenuCheckboxItemBase checked>
            Show Bookmarks
          </ContextMenuCheckboxItemBase>
          <ContextMenuCheckboxItemBase>
            Show Full URLs
          </ContextMenuCheckboxItemBase>
          <ContextMenuSeparatorBase />
          <ContextMenuRadioGroupBase value="pedro">
            <ContextMenuLabelBase inset>People</ContextMenuLabelBase>
            <ContextMenuRadioItemBase value="pedro">
              Pedro Duarte
            </ContextMenuRadioItemBase>
            <ContextMenuRadioItemBase value="colm">
              Colm Tuite
            </ContextMenuRadioItemBase>
          </ContextMenuRadioGroupBase>
        </ContextMenuContentBase>
      </ContextMenuBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
