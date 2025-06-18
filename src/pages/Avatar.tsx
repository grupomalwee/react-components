import {
  AvatarBase,
  AvatarFallbackBase,
  AvatarImageBase,
} from "@/components/ui/AvatarBase";
import { BadgeBase } from "@/components/ui/BadgeBase";

export const AvatarPage = () => {
  return (
    <div className="mt-5 ml-5 flex flex-col gap-10 p-4 rounded-sm max-w-full">
      <section>
        <h3 className="text-lg font-semibold mb-4">Avatares em fila (row)</h3>

        <div className="flex flex-row gap-8 overflow-x-auto py-4 px-2 rounded-md">
          <div className="flex flex-col items-center gap-2">
            <AvatarBase>
              <AvatarImageBase src="https://github.com/grupomalwee.png" />
              <AvatarFallbackBase>CN</AvatarFallbackBase>
            </AvatarBase>
            <span className="text-sm text-muted-foreground">Padrão</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <AvatarBase className="ring-2 ring-primary">
              <AvatarImageBase src="https://github.com/grupomalwee.png" />
              <AvatarFallbackBase>CN</AvatarFallbackBase>
            </AvatarBase>
            <span className="text-sm text-muted-foreground">Borda</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <AvatarBase className="grayscale">
              <AvatarImageBase src="https://github.com/grupomalwee.png" />
              <AvatarFallbackBase>CN</AvatarFallbackBase>
            </AvatarBase>
            <span className="text-sm text-muted-foreground">Grayscale</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex -space-x-3">
              {["CN", "LR", "ER"].map((initials, i) => (
                <AvatarBase
                  key={i}
                  className="ring-2 ring-background border border-white dark:border-gray-900"
                >
                  <AvatarImageBase src="https://github.com/grupomalwee.png" />
                  <AvatarFallbackBase>{initials}</AvatarFallbackBase>
                </AvatarBase>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Agrupados</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <AvatarBase className="shadow-lg">
              <AvatarImageBase src="https://github.com/grupomalwee.png" />
              <AvatarFallbackBase>SH</AvatarFallbackBase>
            </AvatarBase>
            <span className="text-sm text-muted-foreground">Sombra</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <AvatarBase className="rounded-full">
              <AvatarImageBase src="https://github.com/grupomalwee.png" />
              <AvatarFallbackBase>RF</AvatarFallbackBase>
            </AvatarBase>
            <span className="text-sm text-muted-foreground">Circular</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <AvatarBase className="rounded-md">
              <AvatarImageBase src="https://github.com/grupomalwee.png" />
              <AvatarFallbackBase>RM</AvatarFallbackBase>
            </AvatarBase>
            <span className="text-sm text-muted-foreground">Quadrado</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <AvatarBase>
                <AvatarImageBase src="https://github.com/grupomalwee.png" />
                <AvatarFallbackBase>BD</AvatarFallbackBase>
              </AvatarBase>
              <BadgeBase status="online" aria-label="Online" title="Online" />
            </div>
            <span className="text-sm text-muted-foreground">
              Badge (Online)
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <AvatarBase>
                <AvatarImageBase src="https://github.com/grupomalwee.png" />
                <AvatarFallbackBase>BD</AvatarFallbackBase>
              </AvatarBase>
              <BadgeBase status="offline" aria-label="Online" title="Online" />
            </div>
            <span className="text-sm text-muted-foreground">
              Badge (Offline)
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <AvatarBase>
                <AvatarImageBase src="https://github.com/grupomalwee.png" />
                <AvatarFallbackBase>BD</AvatarFallbackBase>
              </AvatarBase>
              <BadgeBase status="busy" aria-label="Online" title="Online" />
            </div>
            <span className="text-sm text-muted-foreground">Badge (Busy)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <AvatarBase>
                <AvatarImageBase src="https://github.com/grupomalwee.png" />
                <AvatarFallbackBase>BD</AvatarFallbackBase>
              </AvatarBase>
              <BadgeBase status="away" aria-label="Online" title="Online" />
            </div>
            <span className="text-sm text-muted-foreground">Badge (Away)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <AvatarBase className="transition-transform duration-300 hover:scale-110 hover:shadow-xl cursor-pointer">
              <AvatarImageBase src="https://github.com/grupomalwee.png" />
              <AvatarFallbackBase>HE</AvatarFallbackBase>
            </AvatarBase>
            <span className="text-sm text-muted-foreground">Hover Effect</span>
          </div>
        </div>
      </section>

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
} from "@/components/ui/AvatarBase";`}
            </code>
          </pre>
        </div>

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
