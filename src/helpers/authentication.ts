import * as express from "express";

export async function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "api-key") {
        let token: any;
        if (request.headers["api-key"]) {
            token = request.headers["api-key"];
        } else {
            return Promise.reject(new Error("No api key provided"));
        }

        if (token === process.env.API_KEY) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error("Invalid api key provided"));
        }
    }
    return Promise.reject(new Error("No api key provided"));
}

