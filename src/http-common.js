import axios from "axios";

export default axios.create({
  baseURL: "https://api.github.com/users/defunkt/repos",
  headers: {
    "Content-type": "application/json"
  }
});