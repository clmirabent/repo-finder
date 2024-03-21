import { GraphqlResponseError } from "@octokit/graphql";
import { IUserInfoWithRepositories, IUserRequestResponse } from "../../types/UserInteface";
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

  async getAllRepo(userName: string) {
    try {
      const allRepos = await graphqlWithAuth<IUserRequestResponse>(`
      query getAllRepos($login: String!) {
        user(login: $login) {
        repositories(first: 20) {
          nodes {
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
        login: userName
      });
      return allRepos;

    } catch (e: any) {
      console.error(e.data);
      return undefined;
    }
  }
}


const singleton = new UserService();

export default singleton;