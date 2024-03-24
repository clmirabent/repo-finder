import { IConnection } from "./GitHubApi";

/*
* IRepoInfo: Represents information about a repository. 
*/
interface IRepoInfo {
    name: string, //The name of the repository.
    url: string, //The URL of the repository.
    id: string, //The unique identifier of the repository.
    descriptionHTML: string, //The HTML formatted description of the repository.
    primaryLanguage: IRepoLanguage, //The primary programming language of the repository.
    languages: IConnection<IRepoLanguage>, //A paginated connection of the programming languages used in the repository.
}

/*
* IRepoLanguage: Represents a programming language.
*/

interface IRepoLanguage {
    name: string, //The name of the programming language.
    color: string //The color associated with the programming language (for visual representation).
}

/*
*IRepoRequesResponse: Models the response structure for a GraphQL query that fetches repository information.
*/
interface IRepoRequesResponse {
    repository: IRepoInfo // The repository data object.
}

export type { IRepoInfo, IRepoRequesResponse }


