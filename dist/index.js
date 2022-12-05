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
     * @param hostname - example: catfact.ninja
     * @param path - example: /fact
     * @param options
     * @returns
     */
    async request(hostname, path = "", options) {
        // remove https:// OR http:// from hostname
        if (hostname.startsWith("https://")) {
            hostname = hostname.replace("https://", "");
        }
        else if (hostname.startsWith("http://")) {
            hostname = hostname.replace("http://", "");
        }
        let criteria = {
            hostname: hostname
        };
        if (path) {
            criteria.path = path;
        }
        if (options?.headers) {
            criteria.headers = options.headers;
        }
        if (options?.method) {
            criteria.method = options.method;
        }
        else {
            criteria.method = "GET";
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
