import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (page) => axios.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) =>
  axios.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const createPost = (newPost) =>
  axios.post("/posts", newPost, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`,
      "X-Custom-Header": "foobar",
    },
  });

export const updatePost = (id, updatedPost) =>
  axios.patch(`/posts/${id}`, updatedPost, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`,
      "X-Custom-Header": "foobar",
    },
  });

export const deletePost = (id) =>
  axios.delete(
    `/posts/${id}`,

    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`,
        "X-Custom-Header": "foobar",
      },
    }
  );

export const likePost = (id) =>
  axios.patch(
    `/posts/${id}/likePost`,
    {},
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`,
        "X-Custom-Header": "foobar",
      },
    }
  );

export const signin = (formData) => API.post("/users/signin", formData);

export const signup = (formData) => API.post("/users/signup", formData);
