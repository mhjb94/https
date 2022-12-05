import https from "https"
import { HttpRequestOptions, Criteria } from "./types/index"

export class Http {

    constructor() { }

    /**
     * @param hostname - example: catfact.ninja
     * @param path - example: /fact
     * @param options
     */
    async httpRequest(
        hostname: string,
        path: string = "",
        options?: HttpRequestOptions
    ): Promise<any> {

        // remove https:// OR http:// from hostname
        if (hostname.startsWith("https://")) {
            hostname = hostname.replace("https://", "")
        } else if (hostname.startsWith("http://")) {
            hostname = hostname.replace("http://", "")
        }

        let criteria: Criteria = {
            hostname: hostname
        }

        if (path) {
            criteria.path = path
        }

        if (options?.headers) {
            criteria.headers = options.headers
        }

        if (options?.method) {
            criteria.method = options.method
        } else {
            criteria.method = "GET"
        }

        return new Promise((resolve, reject) => {

            const req = https.request({ ...criteria }, (res) => {

                let resBuffer: Buffer[]
                let data: JSON | Buffer | string

                res.on('data', (chunk: Buffer) => {
                    resBuffer.push(chunk)
                })

                res.on('end', () => {
                    try {
                        
                        data = Buffer.concat(resBuffer)

                        let contentType = res.headers['content-type']
                        if (contentType) {
                            if (contentType.includes("application/json")) {
                                data = data.toString()
                                data = JSON.parse(data)
                            }
                        }

                        resolve({
                            body: data,
                            statusCode: res.statusCode,
                            statusMessage: res.statusMessage,
                            headers: res.headers,
                        })
                    } catch (error) {
                        reject(error)
                    }
                })
            })

            if (options?.body) {
                req.write(options.body)
            }

            req.on('error', (error) => {
                reject(error.message)
            })

            req.end()
        })
    }

}