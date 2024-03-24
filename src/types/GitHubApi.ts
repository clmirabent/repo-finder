/**
 ** IConnection: Represents a paginated connection of data items.
 * @template T The type of data items in the connection.*/

interface IConnection<T> {
    nodes: T[], //An array of the data items in the current page.
    totalCount: number, // The total count of data items in the entire connection.
    pageInfo: IPageInfo //Pagination information for navigating through the connection.
}

/**
 ** IPageInfo: Contains pagination information for a connection. 
 */
interface IPageInfo {
    hasNextPage: boolean, //Indicates whether there is a next page of results available.
    hasPreviousPage: boolean, // Indicates whether there is a previous page of results available.
    endCursor: string, //A cursor for the next page of results (if available).
    startCursor: string, //A cursor for the previous page of results (if available).
}

/**
 ** ISearchQuery: Represents the result of a search query, containing a connection of data items.
 */
interface ISearchQuery<T> {
    search: IConnection<T> //The connection of search results.
}

export type { IConnection, IPageInfo, ISearchQuery }