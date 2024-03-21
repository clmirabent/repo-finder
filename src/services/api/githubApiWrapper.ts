import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
    headers: {
        authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
});

export default graphqlWithAuth;