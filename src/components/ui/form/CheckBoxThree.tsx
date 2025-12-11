"use client";

import type React from "react";
import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TreeNode {
  id: string;
  label: string;
  defaultChecked?: boolean;
  children?: TreeNode[];
}

function useCheckboxTree(initialTree: TreeNode) {
  const initialCheckedNodes = useMemo(() => {
    const checkedSet = new Set<string>();
    const initializeCheckedNodes = (node: TreeNode) => {
      if (node.defaultChecked) {
        checkedSet.add(node.id);
      }
      node.children?.forEach(initializeCheckedNodes);
    };
    initializeCheckedNodes(initialTree);
    return checkedSet;
  }, [initialTree]);

  const [checkedNodes, setCheckedNodes] =
    useState<Set<string>>(initialCheckedNodes);

  const isChecked = useCallback(
    (node: TreeNode): boolean | "indeterminate" => {
      if (!node.children) {
        return checkedNodes.has(node.id);
      }

      const childrenChecked = node.children.map((child) => isChecked(child));
      if (childrenChecked.every((status) => status === true)) {
        return true;
      }
      if (
        childrenChecked.some(
          (status) => status === true || status === "indeterminate",
        )
      ) {
        return "indeterminate";
      }
      return false;
    },
    [checkedNodes],
  );

  const handleCheck = useCallback(
    (node: TreeNode) => {
      const newCheckedNodes = new Set(checkedNodes);

      const toggleNode = (n: TreeNode, check: boolean) => {
        if (check) {
          newCheckedNodes.add(n.id);
        } else {
          newCheckedNodes.delete(n.id);
        }
        for (const child of n.children ?? []) {
          toggleNode(child, check);
        }
      };

      const currentStatus = isChecked(node);
      const newCheck = currentStatus !== true;

      toggleNode(node, newCheck);
      setCheckedNodes(newCheckedNodes);
    },
    [checkedNodes, isChecked],
  );

  return { handleCheck, isChecked };
}

interface CheckboxTreeProps {
  tree: TreeNode;
  renderNode: (props: {
    node: TreeNode;
    isChecked: boolean | "indeterminate";
    onCheckedChange: () => void;
    children: React.ReactNode;
  }) => React.ReactNode;
}

export function CheckboxTree({ tree, renderNode }: CheckboxTreeProps) {
  const { isChecked, handleCheck } = useCheckboxTree(tree);

  // Default renderer when user doesn't provide a custom `renderNode`.
  const DefaultNode = ({
    node,
    isChecked: status,
    onCheckedChange,
    children,
  }: {
    node: TreeNode;
    isChecked: boolean | "indeterminate";
    onCheckedChange: () => void;
    children: React.ReactNode;
  }) => {
    const [open, setOpen] = useState<boolean>(() => !!node.children && status !== false);
    const checkboxRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = status === "indeterminate";
      }
      // auto-open when node becomes checked/indeterminate
      if (node.children) {
        setOpen(status !== false);
      }
    }, [status, node.children]);

    return (
      <div className="pl-1">
        <div className="flex items-center gap-2">
          {node.children ? (
            <button
              aria-label={open ? "Fechar" : "Abrir"}
              onClick={() => setOpen((v) => !v)}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <motion.span
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 0.18 }}
                className="inline-block text-slate-500"
              >
                ▶
              </motion.span>
            </button>
          ) : (
            <div className="w-6 h-6" />
          )}

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="relative">
              <input
                ref={checkboxRef}
                type="checkbox"
                checked={status === true}
                onChange={onCheckedChange}
                className="appearance-none w-5 h-5 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center bg-white dark:bg-slate-900 checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
              />
              <motion.span
                initial={false}
                animate={{ scale: status === true ? 1 : 0.8, opacity: status === true ? 1 : 0 }}
                transition={{ duration: 0.14 }}
                className="pointer-events-none absolute left-0 top-0 w-5 h-5 flex items-center justify-center text-white"
              >
                {status === true ? (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </motion.span>
            </span>

            <span className="text-sm text-slate-700 dark:text-slate-200">{node.label}</span>
          </label>
        </div>

        <AnimatePresence initial={false}>
          {open && node.children && (
            <motion.div
              key="children"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="ml-6 mt-2 overflow-hidden"
            >
              <div className="flex flex-col gap-1">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderTreeNode = (node: TreeNode): React.ReactNode => {
    const children = node.children?.map(renderTreeNode);

    const nodePayload = {
      children,
      isChecked: isChecked(node),
      node,
      onCheckedChange: () => handleCheck(node),
    };

    if (renderNode) {
      return renderNode(nodePayload);
    }

    return <DefaultNode {...nodePayload} />;
  };

  return renderTreeNode(tree);
}