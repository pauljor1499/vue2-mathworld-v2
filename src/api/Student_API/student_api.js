import axios from "axios";
import { Student_API } from "../hosts";

const url = Student_API.prototype.student_endpoint();

export default class student_API {
    async register_student(student) {
        const user = await axios.post(url + "/register", student);
        return user;
    }

    async login_student(credentials) {
        const user = await axios.post(url + "/login", credentials);
        return user;
    }

    async get_account_data() {
        axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token"));
        const user = await axios.get(url + "/fetch/account_data");
        return user;
    }

    async update_profile_photo(photo) {
        const user = await axios.patch(url + "/update/user_profile_picture", photo);
        return user;
    }

    async remove_profile_photo() {
        const user = await axios.delete(url + "/delete/user_profile_picture");
        return user;
    }

    async change_password(updated_data) {
        const user = await axios.patch(url + "/update/user_password", updated_data);
        return user;
    }

    async update_contact_person(updated_data) {
        const user = await axios.put(url + "/update/contact_person", updated_data);
        return user;
    }
}
