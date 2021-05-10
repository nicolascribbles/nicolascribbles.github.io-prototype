import http from "../http-common";

class BlogDataHookService {
  getAll() {
    return http.get("/blogs")
  }
  get(id) {
    return http.get(`/blogs/${id}`)
  }
  create(data) {
    return http.post("/blogs", data)
  }
  update(id, data) {
    return http.put(`/blogs/${id}`, data)
  }
  delete(id) {
    return http.delete(`/blogs/${id}`)
  }
  findByTitle(title) {
    return http.get(`/blogs?title=${title}`)
  }
  findAllPublished() {
    return http.get("/blogs/published")
  }
}

export default new BlogDataHookService();