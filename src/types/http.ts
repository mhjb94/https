import { OutgoingHttpHeaders } from "http"

export interface HttpRequestOptions {
    method?: "GET" | "POST" |  "PUT" |  "DELETE" | "OPTIONS" | "PATCH" | "COPY"
    headers?: OutgoingHttpHeaders
    body?: string
}

export interface Criteria {
    headers?: OutgoingHttpHeaders
    method?: string

    hash: string
    host: string
    href: string
    hostname: string
    origin: string
    username: string
    password: string
    pathname: string
    port: string
    protocol: string
    search: string
}

export interface HttpRequestResult {
    data: Buffer | string | JSON
    statusCode?: number
    statusMessage?: string
    headers: object
}