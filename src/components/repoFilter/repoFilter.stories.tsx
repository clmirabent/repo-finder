import RepoFilterComponent from "./RepoFilterComponent";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RepoFilterComponent> = {
    component: RepoFilterComponent,
    title: "Languages Filter",
    args: {
        onQueryChanged: () => { }
    },
    tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<typeof RepoFilterComponent>;

//👇 Throws a type error it the args don't match the component props
export const Default: Story = {};

export const WithLanguages: Story = {
    args: {
        availableLanguages: ["Typescript", "C#", "Python"]
    }
}



