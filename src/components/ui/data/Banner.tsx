"use client";

import { RocketIcon, XIcon } from "@phosphor-icons/react";
import React, { useState } from "react";
import type { ReactNode, ComponentType } from "react";
import {
  isBannerDismissed,
  dismissBanner,
} from "@/components/ui/data/utils/bannerStore";
import { ButtonBase } from "../form/ButtonBase";

type IconProps = {
  className?: string;
  size?: number | string;
};

type BannerProps = {
  icon?: ReactNode | ComponentType<IconProps>;
  title?: string;
  description?: string;
  actionText?: ReactNode;
  id?: string;
};

export default function Banner({
  icon,
  title = "Boost your experience with @mlw-packages/react-components",
  description = "The new feature is live! Try it out and let us know what you think.",
  actionText,
  id = "default",
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(!isBannerDismissed(id));

  if (!isVisible) return null;

  const IconComponent =
    icon && typeof icon === "function"
      ? (icon as ComponentType<IconProps>)
      : undefined;

  return (
    <div className="bg-muted px-4 py-3 text-foreground w-screen max-w-full border border-border rounded-none shadow-sm md:px-6 md:py-4 rounded-b-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-black/40"
          >
            {IconComponent ? (
              <IconComponent size={18} />
            ) : React.isValidElement(icon) ? (
              icon
            ) : (
              <RocketIcon size={18} />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-black font-bold truncate">{title}</p>
            <p className="text-muted-foreground text-sm text-gray-700 truncate">
              {description}
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-shrink-0">
          {actionText ? (
            <ButtonBase className="text-sm" size="sm">
              {actionText}
            </ButtonBase>
          ) : null}
          <ButtonBase
            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 bg-background"
            onClick={() => {
              dismissBanner(id);
              setIsVisible(false);
            }}
            variant="outline"
          >
            <XIcon
              aria-hidden="true"
              className="opacity-60 transition-opacity group-hover:opacity-100 text-red-500"
              size={16}
            />
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}
