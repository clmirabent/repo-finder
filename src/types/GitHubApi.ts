interface IConnection<T> {
    nodes: T[],
    totalCount: number,
    pageInfo: IPageInfo
}

interface IPageInfo {
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    endCursor: string,
    startCursor: string,
}

interface ISearchQuery<T> {
    search: IConnection<T>
}

export type { IConnection, IPageInfo, ISearchQuery }