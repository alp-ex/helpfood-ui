interface HTTPCommonPropreties {
    baseUrl: string
    contentType: string
}

export class HTTPCommon implements HTTPCommonPropreties {
    baseUrl: string
    contentType: string

    constructor({ baseUrl }) {
        this.baseUrl = baseUrl
    }

    httpFetch(
        path,
        {
            method = 'GET',
            headers = { 'Content-Type': 'application/json' },
            body = null,
        } = {}
    ) {
        return fetch(`${this.baseUrl}${path}`, {
            method,
            headers,
            body,
        }).then((response) => response.json())
    }

    get(path) {
        return this.httpFetch(path)
    }

    delete(path) {
        return this.httpFetch(path, { method: 'DELETE' })
    }

    put(path, { data }) {
        return this.httpFetch(path, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    post(path, { data }) {
        return this.httpFetch(path, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
}
