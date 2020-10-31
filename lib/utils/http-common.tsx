interface HTTPCommonPropreties {
    baseUrl: string
    contentType: string
}

export class HTTPCommon implements HTTPCommonPropreties {
    baseUrl: string
    contentType: string

    constructor({ baseUrl }: { baseUrl: string }) {
        this.baseUrl = baseUrl
    }

    httpFetch(
        path: string,
        {
            method = 'GET',
            headers = { 'Content-Type': 'application/json' },
            body = null,
        }: {
            method?: string
            headers?: RequestInit['headers']
            body?: RequestInit['body']
        } = {}
    ): Promise<Response> {
        return fetch(`${this.baseUrl}${path}`, {
            method,
            headers,
            body,
        }).then((response) => response.json())
    }

    get(path: string): Promise<Response> {
        return this.httpFetch(path)
    }

    delete(
        path: string,
        { data = null }: { data?: RequestInit['body'] } = {}
    ): Promise<Response> {
        return this.httpFetch(path, {
            method: 'DELETE',
            body: data === null ? null : JSON.stringify(data),
        })
    }

    put(
        path: string,
        { data }: { data?: RequestInit['body'] }
    ): Promise<Response> {
        return this.httpFetch(path, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    post(
        path: string,
        { data }: { data?: RequestInit['body'] }
    ): Promise<Response> {
        return this.httpFetch(path, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
}
