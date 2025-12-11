import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { Fragment, useId } from "react";
import { CheckboxTree } from "@/components/ui/form/CheckBoxThree";
import { CheckboxBase } from "@/components/ui/form/CheckBoxBase";
import LabelBase from "@/components/ui/form/LabelBase";

const meta: Meta<typeof CheckboxTree> = {
  title: "forms/CheckboxTree",
  component: CheckboxTree,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Árvore de checkboxes com nós pais e filhos; suporta estados indeterminado e controlado via render prop.",
      },
      source: {
        code: `import React from 'react';
import { CheckboxTree } from '@/components/ui/form/CheckBoxThree';
import { CheckboxBase } from '@/components/ui/form/CheckBoxBase';
import LabelBase from '@/components/ui/form/LabelBase';

export const Default = () => (
  <CheckboxTree
    renderNode={({ node, isChecked, onCheckedChange, children }) => (
      <>
        <div className="flex items-center gap-2">
          <CheckboxBase checked={isChecked} id={node.id} onCheckedChange={onCheckedChange} />
          <LabelBase htmlFor={node.id}>{node.label}</LabelBase>
        </div>
        {children && <div className="ms-6">{children}</div>}
      </>
    )}
    tree={{ id: '1', label: 'Natural Wonders', children: [{ id: '2', label: 'Mountains' }] }}
  />
);
`,
        full: `import "../../style/global.css";
import React, { Fragment, useId } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckboxTree } from "@/components/ui/form/CheckBoxThree";
import { CheckboxBase } from "@/components/ui/form/CheckBoxBase";
import LabelBase from "@/components/ui/form/LabelBase";

interface TreeNode { id: string; label: string; defaultChecked?: boolean; children?: TreeNode[] }

const initialTree: TreeNode = {
  children: [
    { defaultChecked: true, id: "2", label: "Mountains" },
    {
      children: [
        { id: "4", label: "Niagara Falls" },
        { defaultChecked: true, id: "5", label: "Angel Falls" },
      ],
      id: "3",
      label: "Waterfalls",
    },
    { id: "6", label: "Grand Canyon" },
  ],
  id: "1",
  label: "Natural Wonders",
};

const Wrapper: React.FC = () => {
  const id = useId();
  return (
    <div className="space-y-3" data-testid="checkbox-tree-root">
      <CheckboxTree
        renderNode={({ node, isChecked, onCheckedChange, children }) => (
          <Fragment key={id + '-' + node.id}>
            <div className="flex items-center gap-2">
              <CheckboxBase checked={isChecked} id={id + '-' + node.id} onCheckedChange={onCheckedChange} />
              <LabelBase htmlFor={id + '-' + node.id}>{node.label}</LabelBase>
            </div>
            {children && <div className="ms-6 space-y-3">{children}</div>}
          </Fragment>
        )}
        tree={initialTree}
      />
    </div>
  );
};

export const Default = () => <Wrapper />;
`,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxTree>;

interface TreeNode {
  id: string;
  label: string;
  defaultChecked?: boolean;
  children?: TreeNode[];
}

const initialTree: TreeNode = {
  children: [
    { defaultChecked: true, id: "2", label: "Mountains" },
    {
      children: [
        { id: "4", label: "Niagara Falls" },
        { defaultChecked: true, id: "5", label: "Angel Falls" },
      ],
      id: "3",
      label: "Waterfalls",
    },
    { id: "6", label: "Grand Canyon" },
  ],
  id: "1",
  label: "Natural Wonders",
};

const Wrapper: React.FC = () => {
  const id = useId();
  return (
    <div className="space-y-3" data-testid="checkbox-tree-root">
      <CheckboxTree
        renderNode={({ node, isChecked, onCheckedChange, children }) => (
          <Fragment key={`${id}-${node.id}`}>
            <div className="flex items-center gap-2">
              <CheckboxBase
                checked={isChecked}
                id={`${id}-${node.id}`}
                onCheckedChange={onCheckedChange}
              />
              <LabelBase htmlFor={`${id}-${node.id}`}>{node.label}</LabelBase>
            </div>
            {children && <div className="ms-6 space-y-3">{children}</div>}
          </Fragment>
        )}
        tree={initialTree}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <Wrapper />,
};

const indeterminateTree: TreeNode = {
  id: "p1",
  label: "Fruits",
  children: [
    { id: "c1", label: "Apple", defaultChecked: true },
    { id: "c2", label: "Banana" },
  ],
};

export const Indeterminate: Story = {
  render: () => {
    const id = useId();
    return (
      <div className="space-y-3" data-testid="checkbox-tree-indeterminate">
        <CheckboxTree
          renderNode={({ node, isChecked, onCheckedChange, children }) => (
            <Fragment key={`${id}-${node.id}`}>
              <div className="flex items-center gap-2">
                <CheckboxBase
                  checked={isChecked}
                  id={`${id}-${node.id}`}
                  onCheckedChange={onCheckedChange}
                />
                <LabelBase htmlFor={`${id}-${node.id}`}>{node.label}</LabelBase>
              </div>
              {children && <div className="ms-6 space-y-3">{children}</div>}
            </Fragment>
          )}
          tree={indeterminateTree}
        />
      </div>
    );
  },
};

const deepTree: TreeNode = {
  id: "root",
  label: "World",
  children: [
    {
      id: "continents",
      label: "Continents",
      children: [
        { id: "europe", label: "Europe" },
        { id: "asia", label: "Asia", children: [{ id: "jp", label: "Japan" }] },
        { id: "africa", label: "Africa" },
      ],
    },
    { id: "oceans", label: "Oceans" },
  ],
};

export const DeepTree: Story = {
  render: () => {
    const id = useId();
    return (
      <div className="space-y-3" data-testid="checkbox-tree-deep">
        <CheckboxTree
          renderNode={({ node, isChecked, onCheckedChange, children }) => (
            <Fragment key={`${id}-${node.id}`}>
              <div className="flex items-center gap-2">
                <CheckboxBase
                  checked={isChecked}
                  id={`${id}-${node.id}`}
                  onCheckedChange={onCheckedChange}
                />
                <LabelBase htmlFor={`${id}-${node.id}`}>{node.label}</LabelBase>
              </div>
              {children && <div className="ms-6 space-y-3">{children}</div>}
            </Fragment>
          )}
          tree={deepTree}
        />
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => <Wrapper />,
};
