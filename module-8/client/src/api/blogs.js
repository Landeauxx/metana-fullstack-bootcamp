import axios from "axios";

export const getBlogs = async () => {
  const response = await axios.get("/api/blogs");
  return response.data.data;
};

export const getBlogById = async (id) => {
  const response = await axios.get(`/api/blogs/${id}`);
  return response.data.data;
};