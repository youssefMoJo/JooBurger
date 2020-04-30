import axios from "axios";

const instanse = axios.create({
  baseURL: "https://jooburger-936ed.firebaseio.com/",
});

export default instanse;
