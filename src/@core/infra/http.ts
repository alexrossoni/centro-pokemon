import axios from "axios";

export const http = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const scheduling = axios.create({
  baseURL: "/api/scheduling",
});
