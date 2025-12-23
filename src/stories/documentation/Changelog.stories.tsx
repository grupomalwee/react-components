import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import changelogData from "@/stories/changelog/changelog-data";
import Changelog from "@/components/ui/Changelog";

const meta: Meta = {
  title: "Changelog",
  tags: ["!autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Changelog data={changelogData} />,
};
