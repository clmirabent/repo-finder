import { IRepoInfo } from "../../types/RepoInterface";
import InfinityScrollComponent from "./InfinityScrollComponent";
import type { Meta, StoryObj } from "@storybook/react";

function createElement(repositoryName: string, id: string): IRepoInfo {
    return {
        descriptionHTML: "Example description",
        id: id,
        languages: {
            nodes: [
                {
                    color: "lightblue",
                    name: "TypeScript"
                }
            ],
            pageInfo: {
                endCursor: "",
                hasNextPage: false,
                startCursor: "",
                hasPreviousPage: false
            },
            totalCount: 1
        },
        name: repositoryName,
        primaryLanguage: {
            color: "lightblue",
            name: "TypeScript"
        },
        url: "/"
    }
}

const repositories = [
    createElement("Repo 1", "1"),
    createElement("Repo 2", "2"),
    createElement("Repo 3", "3"),
];

const meta: Meta<typeof InfinityScrollComponent> = {
    component: InfinityScrollComponent,
    title: "Infinity Scroll",
    tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<typeof InfinityScrollComponent>;

//👇 Throws a type error it the args don't match the component props
export const Default: Story = {};

export const WithElements: Story = {
    args: {
        repositories: repositories,
        connectionInfo: {
            totalCount: 3,
            pageInfo: {
                startCursor: "",
                endCursor: "",
                hasNextPage: false,
                hasPreviousPage: true
            },
            nodes: repositories
        }
    }
}

