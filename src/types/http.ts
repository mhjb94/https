import { OutgoingHttpHeaders } from "http"

export interface HttpRequestOptions {
    method?: "GET" | "POST" |  "PUT" |  "DELETE" | "OPTIONS" | "PATCH" | "COPY"
    headers?: OutgoingHttpHeaders
    body?: string
}

export interface Criteria {
    hostname: string
    path?: string
    headers?: OutgoingHttpHeaders
    method?: string
}

export interface HttpRequestResult {
    data: Buffer | string | JSON
    statusCode?: number
    statusMessage?: string
    headers: object
}