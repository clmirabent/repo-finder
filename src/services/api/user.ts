import { GraphqlResponseError } from "@octokit/graphql";
import { IUserRequestResponse } from "../../types/UserInteface";
import graphqlWithAuth from "./githubApiWrapper";

class UserService {
  async getByName(name: string) {
    try {
      const { user } = await graphqlWithAuth<IUserRequestResponse>(`
        query getUserByName($name: String!) {
        user (login: $name) {
          avatarUrl
          name
          login
          bioHTML
        }
      }`, {
        name: name
      });
      return user;

    } catch (e: any) {
      if (e instanceof GraphqlResponseError) {
        console.error(e.data);
        return undefined;
      }
    }
  }
}


const singleton = new UserService();

export default singleton;