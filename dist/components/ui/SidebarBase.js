"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import { SeparatorBase } from "@/components/ui/SeparatorBase";
import { SheetBase, SheetContentBase } from "@/components/ui/SheetBase";
import { SkeletonBase } from "@/components/ui/SkeletonBase";
import { SidebarSimple } from "phosphor-react";
import { TooltipBase, TooltipContentBase, TooltipProviderBase, TooltipTriggerBase, } from "@/components/ui/TooltipBase";
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function UseSideBarBase() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("UseSideBarBase must be used within a SidebarProviderBase.");
    }
    return context;
}
const SidebarProviderBase = React.forwardRef(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback((value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
            setOpenProp(openState);
        }
        else {
            _setOpen(openState);
        }
        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }, [setOpenProp, open]);
    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
        return isMobile
            ? setOpenMobile((open) => !open)
            : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);
    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
                (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggleSidebar();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";
    const contextValue = React.useMemo(() => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
    }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);
    return (_jsx(SidebarContext.Provider, { value: contextValue, children: _jsx(TooltipProviderBase, { delayDuration: 0, children: _jsx("div", { style: {
                    "--sidebar-width": SIDEBAR_WIDTH,
                    "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                    ...style,
                }, className: cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className), ref: ref, ...props, children: children }) }) }));
});
SidebarProviderBase.displayName = "SidebarProviderBase";
const SidebarBase = React.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = UseSideBarBase();
    if (collapsible === "none") {
        return (_jsx("div", { className: cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className), ref: ref, ...props, children: children }));
    }
    if (isMobile) {
        return (_jsx(SheetBase, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: _jsx(SheetContentBase, { "data-sidebar": "sidebar", "data-mobile": "true", className: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden", style: {
                    "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                }, side: side, children: _jsx("div", { className: "flex h-full w-full flex-col", children: children }) }) }));
    }
    return (_jsxs("div", { ref: ref, className: "group peer hidden text-sidebar-foreground md:block", "data-state": state, "data-collapsible": state === "collapsed" ? collapsible : "", "data-variant": variant, "data-side": side, children: [_jsx("div", { className: cn("relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset"
                    ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
                    : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]") }), _jsx("div", { className: cn("fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex", side === "left"
                    ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                    : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", 
                // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset"
                    ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
                    : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l", className), ...props, children: _jsx("div", { "data-sidebar": "sidebar", className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow", children: children }) })] }));
});
SidebarBase.displayName = "SidebarBase";
const SidebarTriggerBase = React.forwardRef(({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = UseSideBarBase();
    return (_jsx("div", { children: _jsxs(ButtonBase, { ref: ref, "data-sidebar": "trigger", variant: "ghost", size: "icon", className: cn("h-7 w-7", className), onClick: (event) => {
                onClick?.(event);
                toggleSidebar();
            }, ...props, children: [_jsx("span", { className: "sr-only", children: "Toggle SidebarBase" }), _jsx(SidebarSimple, {})] }) }));
});
SidebarTriggerBase.displayName = "SidebarTriggerBase";
const SidebarRailBase = React.forwardRef(({ className, ...props }, ref) => {
    const { toggleSidebar } = UseSideBarBase();
    return (_jsx("button", { ref: ref, "data-sidebar": "rail", "aria-label": "Toggle SidebarBase", tabIndex: -1, onClick: toggleSidebar, title: "Toggle SidebarBase", className: cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex", "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className), ...props }));
});
SidebarRailBase.displayName = "SidebarRailBase";
const SidebarInsetBase = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("main", { ref: ref, className: cn("relative flex min-h-svh flex-1 flex-col bg-background", "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", className), ...props }));
});
SidebarInsetBase.displayName = "SidebarInsetBase";
const SidebarInputBase = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx(InputBase, { ref: ref, "data-sidebar": "input", className: cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className), ...props }));
});
SidebarInputBase.displayName = "SidebarInputBase";
const SidebarHeaderBase = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, "data-sidebar": "header", className: cn("flex flex-col gap-2 p-2", className), ...props }));
});
SidebarHeaderBase.displayName = "SidebarHeaderBase";
const SidebarFooterBase = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, "data-sidebar": "footer", className: cn("flex flex-col gap-2 p-2", className), ...props }));
});
SidebarFooterBase.displayName = "SidebarFooterBase";
const SidebarSeparatorBase = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx(SeparatorBase, { ref: ref, "data-sidebar": "separator", className: cn("mx-2 w-auto bg-sidebar-border", className), ...props }));
});
SidebarSeparatorBase.displayName = "SidebarSeparatorBase";
const SidebarContentBase = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, "data-sidebar": "content", className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className), ...props }));
});
SidebarContentBase.displayName = "SidebarContentBase";
const SidebarGroupBase = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, "data-sidebar": "group", className: cn("relative flex w-full min-w-0 flex-col p-2", className), ...props }));
});
SidebarGroupBase.displayName = "SidebarGroupBase";
const SidebarGroupLabelBase = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (_jsx(Comp, { ref: ref, "data-sidebar": "group-label", className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className), ...props }));
});
SidebarGroupLabelBase.displayName = "SidebarGroupLabelBase";
const SidebarGroupActionBase = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { ref: ref, "data-sidebar": "group-action", className: cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", 
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden", "group-data-[collapsible=icon]:hidden", className), ...props }));
});
SidebarGroupActionBase.displayName = "SidebarGroupActionBase";
const SidebarGroupContentBase = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, "data-sidebar": "group-content", className: cn("w-full text-sm", className), ...props })));
SidebarGroupContentBase.displayName = "SidebarGroupContentBase";
const SidebarMenuBase = React.forwardRef(({ className, ...props }, ref) => (_jsx("ul", { ref: ref, "data-sidebar": "menu", className: cn("flex w-full min-w-0 flex-col gap-1", className), ...props })));
SidebarMenuBase.displayName = "SidebarMenuBase";
const SidebarMenuItemBase = React.forwardRef(({ className, ...props }, ref) => (_jsx("li", { ref: ref, "data-sidebar": "menu-item", className: cn("group/menu-item relative", className), ...props })));
SidebarMenuItemBase.displayName = "SidebarMenuItemBase";
const sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
    variants: {
        variant: {
            default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
        },
        size: {
            default: "h-8 text-sm",
            sm: "h-7 text-xs",
            lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const SidebarMenuButtonBase = React.forwardRef(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = UseSideBarBase();
    const button = (_jsx(Comp, { ref: ref, "data-sidebar": "menu-button", "data-size": size, "data-active": isActive, className: cn(sidebarMenuButtonVariants({ variant, size }), className), ...props }));
    if (!tooltip) {
        return button;
    }
    if (typeof tooltip === "string") {
        tooltip = {
            children: tooltip,
        };
    }
    return (_jsxs(TooltipBase, { children: [_jsx(TooltipTriggerBase, { asChild: true, children: button }), _jsx(TooltipContentBase, { side: "right", align: "center", hidden: state !== "collapsed" || isMobile, ...tooltip })] }));
});
SidebarMenuButtonBase.displayName = "SidebarMenuButtonBase";
const SidebarMenuActionBase = React.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { ref: ref, "data-sidebar": "menu-action", className: cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", 
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover &&
            "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", className), ...props }));
});
SidebarMenuActionBase.displayName = "SidebarMenuActionBase";
const SidebarMenuBadgeBase = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, "data-sidebar": "menu-badge", className: cn("pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className), ...props })));
SidebarMenuBadgeBase.displayName = "SidebarMenuBadgeBase";
const SidebarMenuSkeletonBase = React.forwardRef(({ className, showIcon = false, ...props }, ref) => {
    // Random width between 50 to 90%.
    const width = React.useMemo(() => {
        return `${Math.floor(Math.random() * 40) + 50}%`;
    }, []);
    return (_jsxs("div", { ref: ref, "data-sidebar": "menu-skeleton", className: cn("flex h-8 items-center gap-2 rounded-md px-2", className), ...props, children: [showIcon && (_jsx(SkeletonBase, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" })), _jsx(SkeletonBase, { className: "h-4 max-w-[--skeleton-width] flex-1", "data-sidebar": "menu-skeleton-text", style: {
                    "--skeleton-width": width,
                } })] }));
});
SidebarMenuSkeletonBase.displayName = "SidebarMenuSkeletonBase";
const SidebarMenuSubBase = React.forwardRef(({ className, ...props }, ref) => (_jsx("ul", { ref: ref, "data-sidebar": "menu-sub", className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className), ...props })));
SidebarMenuSubBase.displayName = "SidebarMenuSubBase";
const SidebarMenuSubItemBase = React.forwardRef(({ ...props }, ref) => _jsx("li", { ref: ref, ...props }));
SidebarMenuSubItemBase.displayName = "SidebarMenuSubItemBase";
const SidebarMenuSubButtonBase = React.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (_jsx(Comp, { ref: ref, "data-sidebar": "menu-sub-button", "data-size": size, "data-active": isActive, className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size === "sm" && "text-xs", size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className), ...props }));
});
SidebarMenuSubButtonBase.displayName = "SidebarMenuSubButtonBase";
export { SidebarBase, SidebarContentBase, SidebarFooterBase, SidebarGroupBase, SidebarGroupActionBase, SidebarGroupContentBase, SidebarGroupLabelBase, SidebarHeaderBase, SidebarInputBase, SidebarInsetBase, SidebarMenuBase, SidebarMenuActionBase, SidebarMenuBadgeBase, SidebarMenuButtonBase, SidebarMenuItemBase, SidebarMenuSkeletonBase, SidebarMenuSubBase, SidebarMenuSubButtonBase, SidebarMenuSubItemBase, SidebarProviderBase, SidebarRailBase, SidebarSeparatorBase, SidebarTriggerBase, UseSideBarBase, };
