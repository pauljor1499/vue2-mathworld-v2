import axios from "axios";
const url = "http://localhost:8000/class";

export default class teacher_API {
    async create_new_class(new_class) {
        const response = await axios.post(url + "/create", new_class);
        return response;
    }
}
