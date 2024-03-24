import { describe, expect, it } from "vitest";
import { graphql } from "@octokit/graphql";
import fetchMock from "fetch-mock";

import { IUserInfo } from "../../types/UserInteface";

import { UserService } from "./userService";

const testUser: IUserInfo = {
    avatarUrl: "url_to_avatar",
    bioHTML: "bio_info",
    login: "username",
    name: "name",
    url: "url_to_user"
}

describe("Test user service", () => {
    const apiClient = graphql.defaults({
        request: {
            fetch: fetchMock
                .sandbox()
                .post("https://api.github.com/graphql", (_, options) => {
                    const body = JSON.parse(options.body?.toString() ?? "{}")
                    if (body["variables"]["name"] === "username")
                        return { data: { user: testUser } }
                    else
                        return { data: { user: null } }
                })
        }
    });

    it("User found", async () => {
        const userService = new UserService(apiClient);
        const response = await userService.getByName("username");
        expect(response).toStrictEqual(testUser);
    })

    it("User not found", async () => {
        const userService = new UserService(apiClient);
        const response = await userService.getByName("non_existing_username");
        expect(response).toBeNull();
    })
})