import { ISearchQuery } from "../../types/GitHubApi";
import { IRepoInfo } from "../../types/RepoInterface";
import graphqlWithAuth from "./githubApiWrapper";

class RepoService {
  async queryRepo(query: string, afterCursor?: string) {
    try {
      const { search } = await graphqlWithAuth<ISearchQuery<IRepoInfo>>(`
          query getAllRepos($condition: String!, $first: Int, $lastEndCursor: String) {
            search(
              first: $first
              query: $condition
              type: REPOSITORY
              after: $lastEndCursor
            ) {
              pageInfo {
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
              }
              totalCount: repositoryCount
              nodes {
                ... on Repository {
                  id
                  name
                  descriptionHTML
                  languages(first: 5) {
                    nodes {
                      name
                      color
                    }
                  }
                  primaryLanguage {
                    color
                    name
                  }
                }
              }
            }
          }
          ` , {
        first: 3,
        condition: query,
        lastEndCursor: afterCursor,
      });
      return search;

    } catch (e: any) {
      console.error(e);
      return undefined;
    }
  }

  // async getByRepo(userName: string, repoName: string) {
  //     const repo = await graphqlWithAuth<IRepoRequesResponse>(`
  //     query getRepo($login: String!, $name: String!) {
  //         repository (owner: $login, name: $name){
  //         name
  //         id
  //         descriptionHTML
  //         languages(first: 5) {
  //             nodes {
  //                 name
  //                 color
  //             }
  //         }
  //         primaryLanguage {
  //           name
  //           color
  //         }
  //       }
  //     }
  //     `, {
  //         login: userName,
  //         name: repoName,
  //     });
  //     return repo;
  // }
}

const singleton = new RepoService();

export default singleton;