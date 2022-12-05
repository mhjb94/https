import { OutgoingHttpHeaders } from "http"

export interface HttpRequestOptions {
    method?: "GET" | "POST" |  "PUT" |  "DELETE" | "OPTIONS"
    headers?: OutgoingHttpHeaders
    body?: string
}

export interface Criteria {
    hostname: string
    path?: string
    headers?: OutgoingHttpHeaders
    method?: string
}