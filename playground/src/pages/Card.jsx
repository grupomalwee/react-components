import React from "react";
import {
  CardBase,
  CardHeaderBase,
  CardTitleBase,
  CardDescriptionBase,
  CardContentBase,
  InputBase,
  SelectBase,
  SelectTriggerBase,
  SelectValueBase,
  SelectContentBase,
  SelectItemBase,
  ButtonBase,
} from "@lib";

export const CardPage = () => {
  return (
    <div className=" flex justify-center items-center min-h-screen bg-gray-100">
      <CardBase className="w-[350px] bg-white shadow-lg rounded-lg py-6">
        <CardHeaderBase className="mb-4">
          <CardTitleBase className="text-xl font-semibold text-gray-800 mx-2">
            Create project
          </CardTitleBase>
          <CardDescriptionBase className="text-sm text-gray-600 mt-1 mx-2">
            Deploy your new project in one-click and select your preferred
            framework.
          </CardDescriptionBase>
        </CardHeaderBase>

        {/* Card Content */}
        <CardContentBase >
          <div className="mb-4 mr-2 ml-2">
            <strong className="font-medium text-gray-700">Name</strong>
            <InputBase
              placeholder="Name of your project"
              className="border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 mr-2 ml-2">
            <strong className="font-medium text-gray-700">Framework</strong>
            <SelectBase className="border border-gray-300 rounded-sm">
              <SelectTriggerBase>
                <SelectValueBase placeholder="Select" />
              </SelectTriggerBase>
              <SelectContentBase>
                <SelectItemBase value="next">Next.js</SelectItemBase>
                <SelectItemBase value="sveltekit">SvelteKit</SelectItemBase>
                <SelectItemBase value="astro">Astro</SelectItemBase>
                <SelectItemBase value="nuxt">Nuxt.js</SelectItemBase>
              </SelectContentBase>
            </SelectBase>
          </div>
        </CardContentBase>

        {/* Card Footer with Buttons */}
        <div className="flex justify-between px-8">
          <ButtonBase variant="outline" className="w-[48%]">
            Cancel
          </ButtonBase>
          <ButtonBase className="w-[48%]">Deploy</ButtonBase>
        </div>
      </CardBase>
    </div>
  );
};
