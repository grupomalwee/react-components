import {
  AvatarBase,
  AvatarFallbackBase,
  AvatarImageBase,
} from "@/components/ui/AvatarBase";
import { ButtonBase } from "@/components/ui/ButtonBase";
import {
  HoverCardBase,
  HoverCardContentBase,
  HoverCardTriggerBase,
} from "@/components/ui/HoverCardBase";

export function HoverCardPage() {
  return (
    <div className="p-8">
      <HoverCardBase>
        <HoverCardTriggerBase asChild>
          <ButtonBase variant="link">@mlw-packages</ButtonBase>
        </HoverCardTriggerBase>
        <HoverCardContentBase className="w-80">
          <div className="flex justify-between gap-4">
            <AvatarBase>
              <AvatarImageBase src="https://github.com/grupomalwee.png" />
              <AvatarFallbackBase>VC</AvatarFallbackBase>
            </AvatarBase>

            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@mlw-packages</h4>
              <p className="text-sm">
                The React Components Library by @grupomalwee.
              </p>
              <div className="text-xs text-muted-foreground">2025</div>
            </div>
          </div>
        </HoverCardContentBase>
      </HoverCardBase>

      <div className="my-8">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
              {`import {
  AvatarBase,
  AvatarFallbackBase,
  AvatarImageBase,
} from "@/components/ui/AvatarBase";
import { ButtonBase } from "@/components/ui/ButtonBase";
import {
  HoverCardBase,
  HoverCardContentBase,
  HoverCardTriggerBase,
} from "@/components/ui/HoverCardBase";
`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
              {`<HoverCardBase>
        <HoverCardTriggerBase asChild>
          <ButtonBase variant="link">@mlw-packages</ButtonBase>
        </HoverCardTriggerBase>
        <HoverCardContentBase className="w-80">
          <div className="flex justify-between gap-4">
            <AvatarBase>
              <AvatarImageBase src="https://github.com/grupomalwee.png" />
              <AvatarFallbackBase>VC</AvatarFallbackBase>
            </AvatarBase>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@mlw-packages</h4>
              <p className="text-sm">
                The React Components Library by @grupomalwee.
              </p>
              <div className="text-xs text-muted-foreground">2025</div>
            </div>
          </div>
        </HoverCardContentBase>
      </HoverCardBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
