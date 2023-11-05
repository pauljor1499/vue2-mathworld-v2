import axios from "axios";
import { Teacher_API } from "../hosts";

const url = Teacher_API.prototype.assignment_endpoint();
axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token"));

export default class teacher_assignment_API {
    async create_assignment(new_assignment) {
        const response = await axios.post(url + "/create", new_assignment);
        return response;
    }

    async get_all_assignments(class_uuid) {
        const response = await axios.get(url + "/class/" + class_uuid + "/all_assignments");
        return response;
    }

    async get_assignment(assignment_uuid) {
        const response = await axios.get(url + "/specific/" + assignment_uuid);
        return response;
    }

    async delete_assignment(assignment_uuid) {
        const response = await axios.delete(url + "/delete/" + assignment_uuid);
        return response;
    }

    async update_assignment(assignment_uuid) {
        const response = await axios.put(url + "/update/" + assignment_uuid);
        return response;
    }
}
