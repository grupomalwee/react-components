import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabsBase } from '../components/ui/TabsBase';
import {
  TabsListBase,
  TabsTriggerBase,
  TabsContentBase,
} from '../components/ui/TabsBase';



const meta: Meta<typeof TabsBase> = {
  title: 'Components/TabsBase',
  component: TabsBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TabsBase>;

export const TabsSimples: Story = {
  
  render: () => (
    <div className="mt-5 ml-5 flex gap-5 p-3 rounded-sm">
      <TabsBase>
        <TabsListBase>
          <TabsTriggerBase value="tab1">Visao Geral</TabsTriggerBase>
          <TabsTriggerBase value="tab2">Adulto</TabsTriggerBase>
          <TabsTriggerBase value="tab3">Infantil</TabsTriggerBase>
          <div className="w-96"></div>
        </TabsListBase>
        <TabsContentBase value="tab1">
          <h2>Content for Tab 1</h2>
          <p>This is some content for the first tab.</p>
        </TabsContentBase>
        <TabsContentBase value="tab2">
          <h2>Content for Tab 2</h2>
          <p>This is some content for the second tab.</p>
        </TabsContentBase>
        <TabsContentBase value="tab3">
          <h2>Content for Tab 3</h2>
          <p>This is some content for the third tab.</p>
        </TabsContentBase>
      </TabsBase>
    </div>
  ),
};
