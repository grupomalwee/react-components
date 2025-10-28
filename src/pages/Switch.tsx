"use client";

import { useState } from "react";
import { SwitchBase } from "@/components/ui/form/SwitchBase";
import {
  MoonIcon,
  SunIcon,
  BellIcon,
  BellSlashIcon,
} from "@phosphor-icons/react";

export const SwitchPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [power, setPower] = useState(false);

  return (
    <div className="p-8 flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <span className="text-sm">Switch Básico</span>
        <SwitchBase />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm">Ativar notificações</span>
        <SwitchBase
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      </div>

      <div className="flex items-center gap-4">
        <SunIcon size={20} />
        <SwitchBase checked={darkMode} onCheckedChange={setDarkMode} />
        <MoonIcon size={20} />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm">Modo Energia</span>
        <SwitchBase checked={power} onCheckedChange={setPower} />
        <span className="text-sm">{power ? "Ligado" : "Desligado"}</span>
      </div>

      <div className="flex items-center gap-4">
        <BellIcon size={20} />
        <SwitchBase
          className="bg-gray-700 data-[state=checked]:bg-green-500"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
        <BellSlashIcon size={20} />
      </div>

      {/* Documentação */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>{`import { SwitchBase } from "@/components/ui/SwitchBase";`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>{`<SwitchBase checked={value} onCheckedChange={setValue} />`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
