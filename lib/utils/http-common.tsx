interface HTTPCommonPropreties {
    baseUrl: string
    contentType: string
}

export class HTTPCommon implements HTTPCommonPropreties {
    baseUrl: string
    contentType: string

    constructor({
        baseUrl,
        contentType = 'application/json',
    }: {
        baseUrl: string
        contentType?: string
    }) {
        this.baseUrl = baseUrl
        this.contentType = contentType
    }

    async httpFetch<T>(
        path: string,
        {
            method = 'GET',
            headers = { 'Content-Type': this.contentType },
            body = null,
        }: {
            method?: string
            headers?: RequestInit['headers']
            body?: RequestInit['body']
        } = {}
    ): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method,
            headers,
            body,
        })
        const responseBody = response.json()

        return responseBody
    }

    get<T>(path: string): Promise<T> {
        return this.httpFetch(path)
    }

    delete<T>(
        path: string,
        { data = null }: { data?: RequestInit['body'] } = {}
    ): Promise<T> {
        return this.httpFetch(path, {
            method: 'DELETE',
            body: data === null ? null : JSON.stringify(data),
        })
    }

    put<T>(path: string, { data }: { data?: RequestInit['body'] }): Promise<T> {
        return this.httpFetch(path, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    post<T>(
        path: string,
        { data }: { data?: RequestInit['body'] }
    ): Promise<T> {
        return this.httpFetch(path, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
}
