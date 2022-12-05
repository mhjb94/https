"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Http = void 0;
const https_1 = __importDefault(require("https"));
class Http {
    constructor() { }
    /**
     * https request
     *
     * @param url - example: https://example.com/path?something=true
     * @param options
     * @returns
     */
    async request(url, options) {
        let parseURL = new URL(url);
        let criteria = {
            hostname: parseURL.hostname,
            path: parseURL.pathname,
            hash: parseURL.hash,
            search: parseURL.search,
        };
        if (options?.headers) {
            criteria.headers = options.headers;
        }
        if (options?.method) {
            criteria.method = options.method;
        }
        return new Promise((resolve, reject) => {
            const req = https_1.default.request({ ...criteria }, (res) => {
                let resBuffer = [];
                let data;
                res.on('data', (chunk) => {
                    resBuffer.push(chunk);
                });
                res.on('end', () => {
                    try {
                        data = Buffer.concat(resBuffer);
                        let contentType = res.headers['content-type'];
                        if (contentType) {
                            if (contentType.includes("application/json")) {
                                data = data.toString();
                                data = JSON.parse(data);
                            }
                        }
                        resolve({
                            data,
                            statusCode: res.statusCode,
                            statusMessage: res.statusMessage,
                            headers: res.headers,
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            });
            if (options?.body) {
                req.write(options.body);
            }
            req.on('error', (error) => {
                reject(error.message);
            });
            req.end();
        });
    }
}
exports.Http = Http;
