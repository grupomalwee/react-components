import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BreadcrumbBase,
  BreadcrumbEllipsisBase,
  BreadcrumbItemBase,
  BreadcrumbLinkBase,
  BreadcrumbListBase,
  BreadcrumbPageBase,
  BreadcrumbSeparatorBase,
} from '../components/ui/BreadcrumbBase';
import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuTriggerBase,
} from '../components/ui/DropDownMenuBase';

const meta: Meta<typeof BreadcrumbBase> = {
  title: 'Components/BreadcrumbBase',
  component: BreadcrumbBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BreadcrumbBase>;

export const ComMenu: Story = {
  render: () => (
    <BreadcrumbBase>
      <BreadcrumbListBase>
        <BreadcrumbItemBase>
          <BreadcrumbLinkBase href="#">Home</BreadcrumbLinkBase>
        </BreadcrumbItemBase>
        <BreadcrumbSeparatorBase />
        <BreadcrumbItemBase>
          <DropDownMenuBase>
            <DropDownMenuTriggerBase className="flex items-center gap-1 hover:text-primary transition-colors">
              <BreadcrumbEllipsisBase />
              <span className="sr-only">Abrir menu</span>
            </DropDownMenuTriggerBase>
            <DropDownMenuContentBase align="start">
              <DropDownMenuItemBase>Documentation</DropDownMenuItemBase>
              <DropDownMenuItemBase>Themes</DropDownMenuItemBase>
              <DropDownMenuItemBase>GitHub</DropDownMenuItemBase>
            </DropDownMenuContentBase>
          </DropDownMenuBase>
        </BreadcrumbItemBase>
        <BreadcrumbSeparatorBase />
        <BreadcrumbItemBase>
          <BreadcrumbLinkBase href="#">Components</BreadcrumbLinkBase>
        </BreadcrumbItemBase>
        <BreadcrumbSeparatorBase />
        <BreadcrumbItemBase>
          <BreadcrumbPageBase>Breadcrumb</BreadcrumbPageBase>
        </BreadcrumbItemBase>
      </BreadcrumbListBase>
    </BreadcrumbBase>
  ),
};

export const Simples: Story = {
  render: () => (
    <BreadcrumbBase>
      <BreadcrumbListBase>
        <BreadcrumbItemBase>
          <BreadcrumbLinkBase href="#">Home</BreadcrumbLinkBase>
        </BreadcrumbItemBase>
        <BreadcrumbSeparatorBase />
        <BreadcrumbItemBase>
          <BreadcrumbLinkBase href="#">Docs</BreadcrumbLinkBase>
        </BreadcrumbItemBase>
        <BreadcrumbSeparatorBase />
        <BreadcrumbItemBase>
          <BreadcrumbPageBase>Current</BreadcrumbPageBase>
        </BreadcrumbItemBase>
      </BreadcrumbListBase>
    </BreadcrumbBase>
  ),
};

export const ComIcones: Story = {
  render: () => (
    <BreadcrumbBase>
      <BreadcrumbListBase>
        <BreadcrumbItemBase>
          <BreadcrumbLinkBase href="#" className="flex items-center gap-1">
            {/* Home ícone */}
            <svg width="16" height="16" fill="none"><path d="M2 8L8 2L14 8V14A2 2 0 0 1 12 16H4A2 2 0 0 1 2 14V8Z" stroke="#6366f1" strokeWidth="2"/></svg>
            Home
          </BreadcrumbLinkBase>
        </BreadcrumbItemBase>
        <BreadcrumbSeparatorBase />
        <BreadcrumbItemBase>
          <BreadcrumbLinkBase href="#" className="flex items-center gap-1">
            {/* Book ícone */}
            <svg width="16" height="16" fill="none"><rect x="3" y="2" width="10" height="12" rx="2" stroke="#10b981" strokeWidth="2"/></svg>
            Docs
          </BreadcrumbLinkBase>
        </BreadcrumbItemBase>
        <BreadcrumbSeparatorBase />
        <BreadcrumbItemBase>
          <BreadcrumbLinkBase href="#" className="flex items-center gap-1">
            {/* PuzzlePiece ícone */}
            <svg width="16" height="16" fill="none"><rect x="4" y="4" width="8" height="8" rx="2" stroke="#f59e0b" strokeWidth="2"/></svg>
            Components
          </BreadcrumbLinkBase>
        </BreadcrumbItemBase>
        <BreadcrumbSeparatorBase />
        <BreadcrumbItemBase>
          <BreadcrumbPageBase className="flex items-center gap-1">
            {/* PuzzlePiece ícone */}
            <svg width="16" height="16" fill="none"><rect x="4" y="4" width="8" height="8" rx="2" stroke="#f59e0b" strokeWidth="2"/></svg>
            Breadcrumb
          </BreadcrumbPageBase>
        </BreadcrumbItemBase>
      </BreadcrumbListBase>
    </BreadcrumbBase>
  ),
};
