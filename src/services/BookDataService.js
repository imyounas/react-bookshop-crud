import http from "./AxiosService";

class BookDataDataService {
    getAll() {
        return http.get("/books");
    }

    get(id) {
        return http.get(`/book/${id}`);
    }

    create(data) {
        return http.post("/book", data);
    }

    update(id, data) {
        return http.put(`/book/${id}`, data);
    }

}

export default new BookDataDataService();