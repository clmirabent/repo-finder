import { IConnection } from "./GitHubApi"
import { IRepoInfo } from "./RepoInterface"

interface IUserInfo {
    name: string,
    url: string,
    avatarUrl: string,
    login: string,
    bioHTML: string
}

interface IUserInfoWithRepositories extends IUserInfo {
    repositories: IConnection<IRepoInfo>
}

interface IUserRequestResponse {
    user: IUserInfoWithRepositories
}

export type { IUserInfo, IUserRequestResponse, IUserInfoWithRepositories }