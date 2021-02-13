import { HTTPCommon } from '~/utils/http-common'

const httpRequests = new HTTPCommon({
    baseUrl:
        'https://cors-anywhere.herokuapp.com/https://www.fooddive.com/feeds/news/',
    contentType: 'application/rss+xml',
})

export const getFoodDiveNews = async (): Promise<string> =>
    await httpRequests.getDocument('')
