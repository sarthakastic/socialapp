import axios from "axios";

const API = axios.create({
  baseURL: "https://socialapp-ten.vercel.app/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) =>
  axios.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const createPost = (newPost) =>
  API.post("/posts", newPost, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`,
      "X-Custom-Header": "foobar",
    },
  });

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`,
      "X-Custom-Header": "foobar",
    },
  });

export const deletePost = (id) =>
  API.delete(
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
  API.patch(
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

export const comment = (value, id) =>
  API.post(
    `/posts/${id}/commentPost`,
    { value },
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
