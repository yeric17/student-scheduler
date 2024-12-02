export type StandartResponse<T> = {
    value:T
    isSuccess:boolean
    error?:ErrorResponse
}

export type ErrorResponse = {
    code:string
    message:string
    errorType:number
}