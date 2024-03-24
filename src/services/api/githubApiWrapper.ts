import { graphql } from "@octokit/graphql";

/**
** Creates a GraphQL client with authentication headers (graphql from octokit)
*@param {string} token - GitHub token to authenticate requests
*@returns {object} - GraphQL client instance */

const graphqlWithAuth = graphql.defaults({
    // Including GitHub token in authorization header
    headers: {
        authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
});

export default graphqlWithAuth;