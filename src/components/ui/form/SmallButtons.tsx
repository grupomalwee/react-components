"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { ButtonBase } from "./ButtonBase";
import {
  PencilSimpleIcon,
  FloppyDiskIcon,
  PlusIcon,
  XIcon,
  DownloadSimpleIcon,
  UploadSimpleIcon,
  CopyIcon,
  ArrowClockwiseIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  GearIcon,
  BellIcon,
  DotsThreeIcon,
  CheckIcon,
  FunnelIcon,
  HeartIcon,
  StarIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
  LockOpenIcon,
  ArrowsLeftRightIcon,
} from "@phosphor-icons/react";

interface QuickButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  testid?: string;
  className?: string;
  iconSize?: number;
  iconColor?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const EditButton = React.forwardRef<HTMLButtonElement, QuickButtonProps>(
  (
    {
      disabled,
      onClick,
      testid = "button-edit",
      className,
      iconSize = 18,
      iconColor,
      variant = "default",
      size = "icon",
      ...props
    },
    ref
  ) => (
    <ButtonBase
      ref={ref}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      testid={testid}
      className={cn(
        "transition-all duration-200 ease-in-out group",
        "hover:scale-105",
        "active:scale-95",
        "disabled:hover:scale-100",
        className
      )}
      {...props}
    >
      <PencilSimpleIcon
        size={iconSize}
        color={iconColor}
        className="transition-transform duration-200 group-hover:-rotate-12"
      />
    </ButtonBase>
  )
);
EditButton.displayName = "EditButton";
export const ChangeButton = React.forwardRef<
  HTMLButtonElement,
  QuickButtonProps
>(
  (
    {
      disabled,
      onClick,
      testid = "button-edit",
      className,
      iconSize = 18,
      iconColor,
      variant = "default",
      size = "icon",
      ...props
    },
    ref
  ) => (
    <ButtonBase
      ref={ref}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      testid={testid}
      className={cn(
        "transition-all duration-200 ease-in-out group",
        "hover:scale-105",
        "active:scale-95",
        "disabled:hover:scale-100",
        className
      )}
      {...props}
    >
      <ArrowsLeftRightIcon
        size={iconSize}
        color={iconColor}
        className="transition-transform duration-200 group-hover:-rotate-180"
      />
    </ButtonBase>
  )
);
ChangeButton.displayName = "ChangeButton";

export const SaveButton = React.forwardRef<HTMLButtonElement, QuickButtonProps>(
  (
    {
      disabled,
      onClick,
      testid = "button-save",
      className,
      iconSize = 18,
      iconColor,
      variant = "default",
      size = "icon",
      ...props
    },
    ref
  ) => (
    <ButtonBase
      ref={ref}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      testid={testid}
      className={cn(
        "transition-all duration-200 ease-in-out group",
        "hover:scale-105",
        "active:scale-95",
        "disabled:hover:scale-100",
        className
      )}
      {...props}
    >
      <FloppyDiskIcon
        size={iconSize}
        color={iconColor}
        className="transition-transform duration-200 group-hover:scale-110"
      />
    </ButtonBase>
  )
);
SaveButton.displayName = "SaveButton";

export const AddButton = React.forwardRef<HTMLButtonElement, QuickButtonProps>(
  (
    {
      disabled,
      onClick,
      testid = "button-add",
      className,
      iconSize = 18,
      iconColor,
      variant = "default",
      size = "icon",
      ...props
    },
    ref
  ) => (
    <ButtonBase
      ref={ref}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      testid={testid}
      className={cn(
        "transition-all duration-200 ease-in-out",
        "hover:scale-105",
        "active:scale-95",
        "disabled:hover:scale-100",
        className
      )}
      {...props}
    >
      <PlusIcon
        size={iconSize}
        color={iconColor}
        className="transition-transform duration-300"
      />
    </ButtonBase>
  )
);
AddButton.displayName = "AddButton";

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  QuickButtonProps
>(
  (
    {
      disabled,
      onClick,
      testid = "button-close",
      className,
      iconSize = 18,
      iconColor,
      variant = "ghost",
      size = "icon",
      ...props
    },
    ref
  ) => (
    <ButtonBase
      ref={ref}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      testid={testid}
      className={cn(
        "transition-all duration-200 ease-in-out",
        "hover:scale-110 hover:rotate-90 hover:bg-destructive/10",
        "active:scale-95 active:rotate-0",
        "disabled:hover:scale-100 disabled:hover:rotate-0",
        className
      )}
      {...props}
    >
      <XIcon
        size={iconSize}
        color={iconColor}
        className="transition-transform duration-300"
      />
    </ButtonBase>
  )
);
CloseButton.displayName = "CloseButton";

export const DownloadButton: React.FC<QuickButtonProps> = ({
  disabled,
  onClick,
  testid = "button-download",
  ...props
}) => (
  <ButtonBase
    variant="outline"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-105",
      "active:scale-95",
      "disabled:hover:scale-100"
    )}
    {...props}
  >
    <DownloadSimpleIcon
      size={18}
      className="transition-transform duration-300 group-hover:translate-y-0.5"
    />
  </ButtonBase>
);

export const UploadButton: React.FC<QuickButtonProps> = ({
  disabled,
  onClick,
  testid = "button-upload",
  ...props
}) => (
  <ButtonBase
    variant="outline"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-105",
      "active:scale-95",
      "disabled:hover:scale-100"
    )}
    {...props}
  >
    <UploadSimpleIcon
      size={18}
      className="transition-transform duration-300 group-hover:-translate-y-0.5"
    />
  </ButtonBase>
);

export const CopyButton: React.FC<QuickButtonProps> = ({
  disabled,
  onClick,
  testid = "button-copy",
  ...props
}) => (
  <ButtonBase
    variant="ghost"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-105",
      "active:scale-90",
      "disabled:hover:scale-100"
    )}
    {...props}
  >
    <CopyIcon
      size={18}
      className="transition-transform duration-200 group-hover:scale-110"
    />
  </ButtonBase>
);

export const RefreshButton: React.FC<QuickButtonProps> = ({
  disabled,
  onClick,
  testid = "button-refresh",
  ...props
}) => (
  <ButtonBase
    variant="ghost"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-105",
      "active:scale-95",
      "disabled:hover:scale-100"
    )}
    {...props}
  >
    <ArrowClockwiseIcon
      size={18}
      className="transition-transform duration-500 group-hover:rotate-180"
    />
  </ButtonBase>
);

export const SearchButton: React.FC<QuickButtonProps> = ({
  disabled,
  onClick,
  testid = "button-search",
  ...props
}) => (
  <ButtonBase
    variant="outline"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-105",
      "active:scale-95",
      "disabled:hover:scale-100"
    )}
    {...props}
  >
    <MagnifyingGlassIcon
      size={18}
      className="transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-12"
    />
  </ButtonBase>
);

export const BackButton: React.FC<QuickButtonProps> = ({
  disabled,
  onClick,
  testid = "button-back",
  ...props
}) => (
  <ButtonBase
    variant="ghost"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-105",
      "active:scale-95",
      "disabled:hover:scale-100"
    )}
    {...props}
  >
    <ArrowLeftIcon
      size={18}
      className="transition-transform duration-300 group-hover:-translate-x-1"
    />
  </ButtonBase>
);

export const SettingsButton: React.FC<QuickButtonProps> = ({
  disabled,
  onClick,
  testid = "button-settings",
  ...props
}) => (
  <ButtonBase
    variant="ghost"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-105",
      "active:scale-95",
      "disabled:hover:scale-100"
    )}
    {...props}
  >
    <GearIcon
      size={18}
      className="transition-transform duration-500 group-hover:rotate-90"
    />
  </ButtonBase>
);

export const NotificationButton: React.FC<QuickButtonProps> = ({
  disabled,
  onClick,
  testid = "button-notification",
  ...props
}) => (
  <ButtonBase
    variant="ghost"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-105",
      "active:scale-95",
      "disabled:hover:scale-100"
    )}
    {...props}
  >
    <BellIcon
      size={18}
      className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12"
    />
  </ButtonBase>
);

export const MoreButton: React.FC<QuickButtonProps> = ({
  disabled,
  onClick,
  testid = "button-more",
  ...props
}) => (
  <ButtonBase
    variant="ghost"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-105",
      "active:scale-95",
      "disabled:hover:scale-100"
    )}
    {...props}
  >
    <DotsThreeIcon
      size={18}
      className="transition-transform duration-200 group-hover:scale-110"
    />
  </ButtonBase>
);

export const CheckButton: React.FC<QuickButtonProps> = ({
  disabled,
  onClick,
  testid = "button-check",
  ...props
}) => (
  <ButtonBase
    variant="default"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-110",
      "active:scale-95",
      "disabled:hover:scale-100"
    )}
    {...props}
  >
    <CheckIcon
      size={18}
      className="transition-transform duration-200 group-hover:scale-110"
    />
  </ButtonBase>
);

interface FilterButtonProps extends QuickButtonProps {
  active?: boolean;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  disabled,
  onClick,
  testid = "button-filter",
  active = false,
  className,
  iconSize = 18,
  iconColor,
  variant,
  size = "icon",
  ...props
}) => (
  <ButtonBase
    variant={variant || (active ? "default" : "outline")}
    size={size}
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out",
      "hover:scale-105",
      "active:scale-95",
      "disabled:hover:scale-100",
      className
    )}
    {...props}
  >
    <FunnelIcon
      size={iconSize}
      color={iconColor}
      weight={active ? "fill" : "regular"}
      className="transition-all duration-200"
    />
  </ButtonBase>
);

interface LikeButtonProps extends QuickButtonProps {
  isLiked?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  disabled,
  onClick,
  testid = "button-like",
  isLiked = false,
  className,
  iconSize = 18,
  iconColor,
  variant = "ghost",
  size = "icon",
  ...props
}) => (
  <ButtonBase
    variant={variant}
    size={size}
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-110",
      "active:scale-95",
      "disabled:hover:scale-100",
      !iconColor &&
        (isLiked
          ? "text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
          : "hover:text-red-500 dark:hover:text-red-400"),
      className
    )}
    {...props}
  >
    <HeartIcon
      size={iconSize}
      color={iconColor}
      weight={isLiked ? "fill" : "regular"}
      className="transition-all duration-300 group-hover:scale-110"
    />
  </ButtonBase>
);

interface FavoriteButtonProps extends QuickButtonProps {
  isFavorite?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  disabled,
  onClick,
  testid = "button-favorite",
  isFavorite = false,
  className,
  iconSize = 18,
  iconColor,
  variant = "ghost",
  size = "icon",
  ...props
}) => (
  <ButtonBase
    variant={variant}
    size={size}
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-110",
      "active:scale-95",
      "disabled:hover:scale-100",
      !iconColor &&
        (isFavorite
          ? "text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300"
          : "hover:text-yellow-500 dark:hover:text-yellow-400"),
      className
    )}
    {...props}
  >
    <StarIcon
      size={iconSize}
      color={iconColor}
      weight={isFavorite ? "fill" : "regular"}
      className="transition-all duration-300 group-hover:rotate-12"
    />
  </ButtonBase>
);

interface VisibilityButtonProps extends QuickButtonProps {
  isVisible?: boolean;
}

export const VisibilityButton: React.FC<VisibilityButtonProps> = ({
  disabled,
  onClick,
  testid = "button-visibility",
  isVisible = true,
  className,
  iconSize = 18,
  iconColor,
  variant = "ghost",
  size = "icon",
  ...props
}) => (
  <ButtonBase
    variant={variant}
    size={size}
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out",
      "hover:scale-105",
      "active:scale-95",
      "disabled:hover:scale-100",
      className
    )}
    {...props}
  >
    {isVisible ? (
      <EyeIcon
        size={iconSize}
        color={iconColor}
        className="transition-opacity duration-200"
      />
    ) : (
      <EyeSlashIcon
        size={iconSize}
        color={iconColor}
        className="transition-opacity duration-200"
      />
    )}
  </ButtonBase>
);

export const ViewButton: React.FC<QuickButtonProps> = (props) => (
  <VisibilityButton isVisible={true} testid="button-view" {...props} />
);

export const HideButton: React.FC<QuickButtonProps> = (props) => (
  <VisibilityButton isVisible={false} testid="button-hide" {...props} />
);

interface LockButtonProps extends QuickButtonProps {
  isLocked?: boolean;
}

export const LockButton: React.FC<LockButtonProps> = ({
  disabled,
  onClick,
  testid = "button-lock",
  isLocked = true,
  className,
  iconSize = 18,
  iconColor,
  variant = "ghost",
  size = "icon",
  ...props
}) => (
  <ButtonBase
    variant={variant}
    size={size}
    onClick={onClick}
    disabled={disabled}
    testid={testid}
    className={cn(
      "transition-all duration-200 ease-in-out group",
      "hover:scale-105",
      "active:scale-95",
      "disabled:hover:scale-100",
      !iconColor &&
        (isLocked
          ? "text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
          : "text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300"),
      className
    )}
    {...props}
  >
    {isLocked ? (
      <LockIcon
        size={iconSize}
        color={iconColor}
        className="transition-all duration-200 group-hover:scale-110"
      />
    ) : (
      <LockOpenIcon
        size={iconSize}
        color={iconColor}
        className="transition-all duration-200 group-hover:scale-110"
      />
    )}
  </ButtonBase>
);

export const UnlockButton: React.FC<QuickButtonProps> = (props) => (
  <LockButton isLocked={false} testid="button-unlock" {...props} />
);
