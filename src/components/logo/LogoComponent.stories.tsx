import LogoComponent from "./LogoComponent";
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof LogoComponent> = {
    component: LogoComponent,
    title: "App logo",
    tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof LogoComponent>;

//👇 Throws a type error it the args don't match the component props
export const Default: Story = {};