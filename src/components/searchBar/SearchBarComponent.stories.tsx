import SearchBarComponent, { SearchBarSize } from "./SearchBarComponent";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SearchBarComponent> = {
    component: SearchBarComponent,
    title: "Search Bar",
    tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<typeof SearchBarComponent>;

//👇 Throws a type error it the args don't match the component props
export const Default: Story = {};

export const Large: Story = {
    args: {
        size: SearchBarSize.lg
    }
}