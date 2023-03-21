import axios from "axios";
const url = "http://localhost:8000/student";

export default class student_API {
    async register_student(student) {
        const user = await axios.post(url + "/register", student);
        return user;
    }

    async login_student(credentials) {
        // axios.defaults.headers.common["Authorization"] =
        //     "Bearer " + JSON.parse(localStorage.getItem("token"));
        const user = await axios.post(url + "/login", credentials);
        return user;
    }
}
