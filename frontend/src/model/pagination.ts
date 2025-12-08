export interface Pagination{
    total:number,
    page:number,
    limit:number,
    totalPage:number,
    hasNextPage:boolean,
    hasPrevPage:boolean,
    sort?:string
}