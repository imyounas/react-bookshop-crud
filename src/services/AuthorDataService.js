import http from "./AxiosService";

class AuthorDataService {
    getAll() {
        return http.get("/authors");
    }

    getlookup() {
        return http.get("/authors/lookup");
    }

    get(id) {
        return http.get(`/author/${id}`);
    }

    create(data) {
        return http.post("/author", data);
    }

    update(id, data) {
        return http.put(`/author/${id}`, data);
    }

    delete(id) {
        return http.delete(`/author/${id}`);
    }

    findByTitle(title) {
        return http.get(`/author?name=${title}`);
    }
}

export default new AuthorDataService();