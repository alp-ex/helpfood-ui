interface HTTPCommonPropreties {
    baseUrl: string
    contentType: string
    authorization?: string
}

export class HTTPCommon implements HTTPCommonPropreties {
    baseUrl: string
    contentType: string
    authorization?: string

    constructor({
        baseUrl,
        contentType = '',
        authorization = '',
    }: {
        baseUrl: string
        contentType?: string
        authorization?: string
    }) {
        this.baseUrl = baseUrl
        this.contentType = contentType
        this.authorization = authorization
    }

    async httpFetch<T>(
        path: string,
        { method = 'GET', body = null }: RequestInit = {}
    ): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method,
            headers: {
                ...(this.contentType
                    ? { 'Content-type': this.contentType }
                    : {}),
                ...(this.authorization
                    ? { Authorization: this.authorization }
                    : {}),
            },
            body,
        })

        const responseBody = await response.json()

        return responseBody
    }

    async httpFetchRSS(
        path: string,
        { method = 'GET', body = null }: RequestInit = {}
    ): Promise<string> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method,
            headers: {
                ...(this.contentType
                    ? { 'Content-type': this.contentType }
                    : {}),
                ...(this.authorization
                    ? { Authorization: this.authorization }
                    : {}),
            },
            body,
        })

        const text = await response.text()

        return text
    }

    get<T>(path: string): Promise<T> {
        return this.httpFetch(path)
    }

    getDocument(path: string): Promise<string> {
        return this.httpFetchRSS(path)
    }

    delete<T>(
        path: string,
        { data = null }: { data?: RequestInit['body'] } = {}
    ): Promise<T> {
        return this.httpFetch(path, {
            method: 'DELETE',
            body: data === null ? null : data,
        })
    }

    put<T>(path: string, { data }: { data?: RequestInit['body'] }): Promise<T> {
        return this.httpFetch(path, {
            method: 'PUT',
            body: data,
        })
    }

    post<T>(
        path: string,
        { data }: { data?: RequestInit['body'] }
    ): Promise<T> {
        return this.httpFetch(path, {
            method: 'POST',
            body: data,
        })
    }
}
