import axios from "axios";
import { Teacher_API } from "../hosts";

const url = Teacher_API.prototype.class_endpoint();
axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token"));

export default class teacher_class_API {
    async create_new_class(new_class) {
        const response = await axios.post(url + "/create", new_class);
        return response;
    }

    async get_all_class() {
        axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(url + "/teacher/fetch/all");
        return response;
    }

    async view_class(class_uuid) {
        const response = await axios.get(url + "/teacher/fetch/" + class_uuid);
        return response;
    }

    async update_class(class_uuid, updated_class) {
        const response = await axios.put(url + "/update/" + class_uuid, updated_class);
        return response;
    }

    async delete_class(class_uuid) {
        const response = await axios.delete(url + "/delete/" + class_uuid);
        return response;
    }

    async accept_student(class_uuid, student_id) {
        const response = await axios.patch(url + "/accept/student/" + class_uuid + "/" + student_id);
        return response;
    }

    async reject_student(class_uuid, student_id) {
        const response = await axios.delete(url + "/remove/student/" + class_uuid + "/" + student_id);
        return response;
    }
}
