import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/navigation/DropDownMenuBase";

import {
  BreadcrumbBase,
  BreadcrumbEllipsisBase,
  BreadcrumbItemBase,
  BreadcrumbLinkBase,
  BreadcrumbListBase,
  BreadcrumbPageBase,
  BreadcrumbSeparatorBase,
} from "@/components/ui/navigation/BreadcrumbBase";
import { HouseIcon, BookIcon, PuzzlePieceIcon } from "@phosphor-icons/react";

function handleNavigate(path: string) {
  window.location.href = path;
}

export function BreadcrumbPage() {
  return (
    <section className="max-w-4xl mx-auto p-8 flex flex-col gap-10">
      <BreadcrumbBase>
        <BreadcrumbListBase>
          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/")}
              className="cursor-pointer hover:underline transition-colors"
            >
              Home
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>

          <BreadcrumbSeparatorBase />

          <BreadcrumbItemBase>
            <DropDownMenuBase>
              <DropDownMenuTriggerBase className="flex items-center gap-1 hover:text-primary transition-colors">
                <BreadcrumbEllipsisBase />
                <span className="sr-only">Abrir menu</span>
              </DropDownMenuTriggerBase>
              <DropDownMenuContentBase align="start">
                <DropDownMenuItemBase onClick={() => handleNavigate("#")}>
                  Documentation
                </DropDownMenuItemBase>
                <DropDownMenuItemBase onClick={() => handleNavigate("#")}>
                  Themes
                </DropDownMenuItemBase>
                <DropDownMenuItemBase onClick={() => handleNavigate("#")}>
                  GitHub
                </DropDownMenuItemBase>
              </DropDownMenuContentBase>
            </DropDownMenuBase>
          </BreadcrumbItemBase>

          <BreadcrumbSeparatorBase />

          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/docs/components")}
              className="cursor-pointer hover:underline transition-colors"
            >
              Components
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>

          <BreadcrumbSeparatorBase />

          <BreadcrumbItemBase>
            <BreadcrumbPageBase>Breadcrumb</BreadcrumbPageBase>
          </BreadcrumbItemBase>
        </BreadcrumbListBase>
      </BreadcrumbBase>

      <BreadcrumbBase className="text-sm">
        <BreadcrumbListBase className="gap-1">
          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/")}
              className="cursor-pointer hover:underline transition-colors"
            >
              Home
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>
          <BreadcrumbSeparatorBase className="mx-0.5" />
          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/docs")}
              className="cursor-pointer hover:underline transition-colors"
            >
              Docs
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>
          <BreadcrumbSeparatorBase className="mx-0.5" />
          <BreadcrumbItemBase>
            <BreadcrumbPageBase>Current</BreadcrumbPageBase>
          </BreadcrumbItemBase>
        </BreadcrumbListBase>
      </BreadcrumbBase>

      <BreadcrumbBase>
        <BreadcrumbListBase>
          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/")}
              className="cursor-pointer hover:underline flex items-center gap-1 transition-colors"
            >
              <HouseIcon size={16} /> Home
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>

          <BreadcrumbSeparatorBase />

          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/docs")}
              className="cursor-pointer hover:underline flex items-center gap-1 transition-colors"
            >
              <BookIcon size={16} /> Docs
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>

          <BreadcrumbSeparatorBase />

          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/docs/components")}
              className="cursor-pointer hover:underline flex items-center gap-1 transition-colors"
            >
              <PuzzlePieceIcon size={16} /> Components
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>

          <BreadcrumbSeparatorBase />

          <BreadcrumbItemBase>
            <BreadcrumbPageBase className="flex items-center gap-1">
              <PuzzlePieceIcon size={16} /> Breadcrumb
            </BreadcrumbPageBase>
          </BreadcrumbItemBase>
        </BreadcrumbListBase>
      </BreadcrumbBase>

      <BreadcrumbBase>
        <BreadcrumbListBase className="gap-2">
          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/")}
              className="cursor-pointer hover:underline transition-colors"
            >
              Home
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>

          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/docs")}
              className="cursor-pointer hover:underline transition-colors"
            >
              Docs
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>

          <BreadcrumbItemBase>
            <BreadcrumbPageBase>Breadcrumb</BreadcrumbPageBase>
          </BreadcrumbItemBase>
        </BreadcrumbListBase>
      </BreadcrumbBase>

      <BreadcrumbBase>
        <BreadcrumbListBase>
          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/")}
              className="cursor-pointer relative
                after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full
                after:scale-x-0 after:bg-primary after:transition-transform after:duration-300
                hover:after:scale-x-100"
            >
              Home
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>

          <BreadcrumbSeparatorBase />

          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/docs")}
              className="cursor-pointer relative
                after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full
                after:scale-x-0 after:bg-primary after:transition-transform after:duration-300
                hover:after:scale-x-100"
            >
              Docs
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>

          <BreadcrumbSeparatorBase />

          <BreadcrumbItemBase>
            <BreadcrumbPageBase>Breadcrumb</BreadcrumbPageBase>
          </BreadcrumbItemBase>
        </BreadcrumbListBase>
      </BreadcrumbBase>

      <div className="my-8">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
              {`import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/DropDownMenuBase";

import {
  BreadcrumbBase,
  BreadcrumbEllipsisBase,
  BreadcrumbItemBase,
  BreadcrumbLinkBase,
  BreadcrumbListBase,
  BreadcrumbPageBase,
  BreadcrumbSeparatorBase,
} from "@/components/ui/BreadcrumbBase";`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
              {`<BreadcrumbBase>
        <BreadcrumbListBase>
          <BreadcrumbItemBase>
            <BreadcrumbLinkBase
              onClick={() => handleNavigate("/")}
              className="cursor-pointer hover:underline transition-colors"
            >
              Home
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>

          <BreadcrumbSeparatorBase />

          <BreadcrumbItemBase>
            <DropDownMenuBase>
              <DropDownMenuTriggerBase className="flex items-center gap-1 hover:text-primary transition-colors">
                <BreadcrumbEllipsisBase />
                <span className="sr-only">Abrir menu</span>
              </DropDownMenuTriggerBase>
              <DropDownMenuContentBase align="start">
                <DropDownMenuItemBase onClick={() => handleNavigate("#")}>
                  Documentation
                </DropDownMenuItemBase>
                <DropDownMenuItemBase onClick={() => handleNavigate("#")}>
                  Themes
                </DropDownMenuItemBase>
                <DropDownMenuItemBase onClick={() => handleNavigate("#")}>
                  GitHub
                </DropDownMenuItemBase>
              </DropDownMenuContentBase>
            </DropDownMenuBase>
          </BreadcrumbItemBase>
        </BreadcrumbListBase>
      </BreadcrumbBase>`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
