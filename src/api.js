import {API_KEY} from "@/config.js";

export class Api {
    __base_url = `https://www.omdbapi.com/?apikey=${API_KEY}&`;

    async getSearchResponse(search = '') {
        const response = await fetch(this.__base_url + `s=${encodeURIComponent(search)}`)
        return await response.json();
    }

    async getById(id) {
        const response = await fetch(this.__base_url + `i=${encodeURIComponent(id)}`)
        return await response.json()
    }

    async getByTitle(title) {
        const response = await fetch(this.__base_url + `t=${encodeURIComponent(title)}`)
        return await response.json()
    }
}

const api = new Api()
export default api
