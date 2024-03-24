import { IConnection } from "./GitHubApi"
import { IRepoInfo } from "./RepoInterface"

/*
* IUserInfo: Represents basic user information.
*/

interface IUserInfo {
    name: string, //The user's displayed name.
    url: string, //The URL of the user's profile page.
    avatarUrl: string, //The URL of the user's avatar image.
    login: string, // The user's login username.
    bioHTML: string //The HTML formatted biography of the user.
}

/*
* IUserInfoWithRepositories: Extends IUserInfo with a connection of the user's repositories.
*/
interface IUserInfoWithRepositories extends IUserInfo {
    repositories: IConnection<IRepoInfo> //A paginated connection of the user's repositories.
}

/*
* IUserRequestResponse: Models the response structure for a GraphQL query that fetches user information.
*/
interface IUserRequestResponse {
    user: IUserInfoWithRepositories //The user data object, including repositories.
}

export type { IUserInfo, IUserRequestResponse, IUserInfoWithRepositories }