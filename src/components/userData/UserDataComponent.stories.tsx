import UserDataComponent from "./UserDataComponent";
import type { Meta, StoryObj } from "@storybook/react";
import { IUserInfo } from "../../types/UserInteface";

function withUser(): IUserInfo {
    return {
        url: "/",
        avatarUrl: "https://avatars.githubusercontent.com/u/33609558?v=4",
        name: "Sisy",
        login: "sisysmith",
        bioHTML: "Full Stack Developer"
    }
}

const meta: Meta<typeof UserDataComponent> = {
    component: UserDataComponent,
    title: "User Data Card",
    args: {
        user: withUser()
    },
    tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<typeof UserDataComponent>;

//👇 Throws a type error it the args don't match the component props
export const Default: Story = {};