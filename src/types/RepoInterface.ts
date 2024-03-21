import { IConnection } from "./GitHubApi";

interface IRepoInfo {
    name: string,
    id: string,
    descriptionHTML: string,
    primaryLanguage: IRepoLanguage,
    languages: IConnection<IRepoLanguage>,
    repositoryTopics: IConnection<{ topic: { name: string } }>,
}

interface IRepoLanguage {
    name: string,
    color: string
}

interface IRepoRequesResponse {
    repository: IRepoInfo
}

export type { IRepoInfo, IRepoRequesResponse }


