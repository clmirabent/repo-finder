import { graphql } from "@octokit/graphql";


import { ISearchQuery } from "../../types/GitHubApi";
import { IRepoInfo } from "../../types/RepoInterface";
import graphqlWithAuth from "./githubApiWrapper";

/*
 * RepoService: Handles interactions with the GitHub GraphQL API for repository data.
 */
class RepoService {
  /**
   * @param apiCLient graphlq client
   */
  constructor(private apiCLient: typeof graphql) {
  }

  /**
  * Queries for repositories based on a search query and optional pagination cursor.
  * @param {string} query - The search query string.
  * @param {string} afterCursor - Optional cursor for pagination (for retrieving subsequent pages).
  * @returns {Promise<ISearchQuery<IRepoInfo> | undefined>} The GraphQL search query response, or undefined if an error occurs.
  */
  async queryRepo(query: string, afterCursor?: string) {
    try {
      // Execute the GraphQL query with authentication and parameters:
      const { search } = await this.apiCLient<ISearchQuery<IRepoInfo>>(`
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
                  url
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
        first: 5, // Number of repositories to fetch per request
        condition: query,
        lastEndCursor: afterCursor,
      });
      return search; // Return the parsed GraphQL response data

    } catch (e: any) {
      console.error(e); // Log any errors
      return undefined; // Return undefined in case of errors
    }
  }
}

// Create a singleton instance of the service for easy access
const singleton = new RepoService(graphqlWithAuth);

export default singleton;
export { RepoService };