import { GraphqlResponseError } from "@octokit/graphql";
import { IUserRequestResponse } from "../../types/UserInteface";
import graphqlWithAuth from "./githubApiWrapper";

/*
 *UserService: Handles interactions with the GitHub GraphQL API for user data.
 */
class UserService {
  /**
   * Fetches user information by username using the GitHub GraphQL API.
   * @param {string} name - The username of the user to retrieve information for.
   * @returns {Promise<IUser | undefined>} The user data object, or undefined if an error occurs or user not found.
   */
  async getByName(name: string) {
    try {
      // Execute the GraphQL query with authentication and username parameter:
      const { user } = await graphqlWithAuth<IUserRequestResponse>(`
      query getUserByName($name: String!) {
        user(login: $name) {
          url
          avatarUrl
          name
          login
          bioHTML
        }
      }`, {
        name: name
      });
      return user; // Return the parsed user data from the GraphQL response

    } catch (e: any) {
      if (e instanceof GraphqlResponseError) { // Log specific GraphQL errors
        console.error(e.data); // Log other errors
        return undefined; // Return undefined for other errors
      }
    }
  }
}

// Create a singleton instance of the service for easy access
const singleton = new UserService();

export default singleton;