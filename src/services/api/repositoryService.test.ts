import { graphql } from "@octokit/graphql";
import fetchMock from "fetch-mock";
import { describe, expect, it } from "vitest";
import { RepoService } from "./repositoryService";
import { ISearchQuery } from "../../types/GitHubApi";
import { IRepoInfo } from "../../types/RepoInterface";

const emptySearchResult: ISearchQuery<IRepoInfo> = {
    search: {
        nodes: [],
        totalCount: 0,
        pageInfo: {
            endCursor: "",
            startCursor: "",
            hasNextPage: false,
            hasPreviousPage: false
        }
    }
}

const searchResult: ISearchQuery<IRepoInfo> = {
    search: {
        nodes: [
            {
                descriptionHTML: "repo_description",
                id: "id-1",
                languages: {
                    nodes: [{ color: "blue", name: "blue" }],
                    pageInfo: {
                        endCursor: "",
                        startCursor: "",
                        hasNextPage: false,
                        hasPreviousPage: false
                    },
                    totalCount: 1
                },
                name: "repo_1",
                primaryLanguage: { color: "blue", name: "blue" },
                url: "url_to_repo"
            }
        ],
        totalCount: 1,
        pageInfo: {
            endCursor: "",
            startCursor: "",
            hasNextPage: false,
            hasPreviousPage: false
        }
    }
}

describe("Test repository service", () => {
    function getMockedApiClient(result: ISearchQuery<IRepoInfo>) {
        return graphql.defaults({
            request: {
                fetch: fetchMock
                    .sandbox()
                    .post("https://api.github.com/graphql", (_1, _2) => {
                        return { data: result };
                    })
            }
        })
    }

    it("Empty repositories when no match for query", async () => {
        const userService = new RepoService(getMockedApiClient(emptySearchResult));
        const response = await userService.queryRepo("query_with_no_result");
        expect(response?.totalCount).toBe(0);
        expect(response?.nodes).toStrictEqual([])
    })

    it("Found Repositories that match the query", async () => {
        const userService = new RepoService(getMockedApiClient(searchResult));
        const response = await userService.queryRepo("query_with_result");
        expect(response?.totalCount).toBe(1);
        expect(response?.nodes).toStrictEqual(searchResult.search.nodes)
    })
})