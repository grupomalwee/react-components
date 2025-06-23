import { BadgeBase } from "@/components/ui/BadgeBase";
import { Check } from "phosphor-react";

export function BadgePage() {
  return (
    <section className="max-w-4xl mx-auto p-8 flex flex-col gap-8">
      <div className="flex flex-wrap gap-4">
        <BadgeBase>Badge</BadgeBase>
        <BadgeBase variant="secondary">Secondary</BadgeBase>
        <BadgeBase variant="destructive">Destructive</BadgeBase>
        <BadgeBase variant="outline">Outline</BadgeBase>
      </div>

      <div className="flex flex-wrap gap-4">
        <BadgeBase
          variant="secondary"
          className="flex items-center gap-1 bg-blue-600 text-white dark:bg-blue-700"
          aria-label="Badge Verified"
        >
          <Check className="w-4 h-4" aria-hidden="true" />
          Verified
        </BadgeBase>

        {[8, 99, "20+"].map((count, i) => {
          const variants: ("destructive" | "outline" | undefined)[] = [
            undefined,
            "destructive",
            "outline",
          ];
          return (
            <BadgeBase
              key={i}
              variant={variants[i]}
              className="h-5 min-w-[1.25rem] rounded-full px-2 font-mono tabular-nums flex items-center justify-center"
              aria-label={`Badge com valor ${count}`}
            >
              {count}
            </BadgeBase>
          );
        })}
      </div>

      {/* Documentação do BadgeBase */}
      <div className="my-8">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>{`import { BadgeBase } from "@/components/ui/Badge";
import { Check } from "phosphor-react";`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>{`<BadgeBase variant="secondary" className="flex items-center gap-1">
  <Check className="w-4 h-4" />
  Verified
</BadgeBase>`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
