"use client";

import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuLabelBase,
  DropDownMenuSeparatorBase,
  DropDownMenuTriggerBase,
} from "@lib";

export const DropDownMenuPage = () => {
  return (
    <>
      <div className="mt-5 ml-5 flex flex-col gap-5 p-6 rounded-sm">
        <DropDownMenuBase>
          <DropDownMenuTriggerBase>Open</DropDownMenuTriggerBase>
          <DropDownMenuContentBase>
            <DropDownMenuLabelBase>My Account</DropDownMenuLabelBase>
            <DropDownMenuSeparatorBase />
            <DropDownMenuItemBase>Profile</DropDownMenuItemBase>
            <DropDownMenuItemBase>Billing</DropDownMenuItemBase>
            <DropDownMenuItemBase>Team</DropDownMenuItemBase>
            <DropDownMenuItemBase>Subscription</DropDownMenuItemBase>
          </DropDownMenuContentBase>
        </DropDownMenuBase>
      </div>

    
    </>
  );
};
