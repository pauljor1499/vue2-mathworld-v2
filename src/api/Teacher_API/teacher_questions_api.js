import axios from "axios";
import { Teacher_API } from "../hosts";

const url = Teacher_API.prototype.question_endpoint();
axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token"));

export default class teacher_question_API {
    async fetch_questions(params) {
        let response = {};
        if (params) {
            response = await axios.get(url + "/fetch/all?question_status=Approved" + params);
        } else {
            response = await axios.get(url + "/fetch/all?question_status=Approved&page_num=1&page_size=10");
        }
        return response.data;
    }
}
