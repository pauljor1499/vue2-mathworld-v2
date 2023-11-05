import axios from "axios";
import { Student_API } from "../hosts";

const url = Student_API.prototype.class_endpoint();
axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token"));

export default class studnent_class_API {
    async join_class(class_code) {
        const response = await axios.patch(url + "/join/" + class_code);
        return response;
    }

    async get_all_class() {
        axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(url + "/student/fetch/all");
        return response;
    }

    async view_class(class_uuid) {
        const response = await axios.get(url + "/student/fetch/" + class_uuid);
        return response;
    }

    async class_details(class_code) {
        const response = await axios.get(url + "/student/search/" + class_code);
        return response;
    }
}
