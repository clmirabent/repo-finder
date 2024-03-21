import { IRepoRequesResponse } from "../../types/RepoInterface";
import graphqlWithAuth from "./githubApiWrapper";

class RepoService {
    async getByRepo(userName: string, repoName: string) {
        const repo = await graphqlWithAuth<IRepoRequesResponse>(`
        query getRepo($login: String!, $name: String!) {
            repository (owner: $login, name: $name){
            name
            id
            descriptionHTML
            languages(first: 5) {
                nodes {
                    name
                    color
                }
            }
            primaryLanguage {
              name
              color
            }
          }
        }
        `, {
            login: userName,
            name: repoName
        });
        return repo;
    }
}

const singleton = new RepoService();

export default singleton;