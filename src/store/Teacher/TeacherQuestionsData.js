import { defineStore } from "pinia";
import teacher_questions_API from "@/api/Teacher_API/teacher_questions_api.js";

export const TeacherQuestionsData = defineStore("TeacherQuestionsData", {
    state: () => ({
        questions: null,
        current_page: 1,
        page_size: 10,
        number_of_pages: 0,
        total_results: 0,

        question_type: "", //&question_type=MathWorld&question_type=STAAR
        response_type: "", //&response_type=Range Open Response
        // student_expectations: "",
        // subject: "",
        topic: "",
        teks_code: "",
        category: "",
        // keywords: "",
        difficulty: "",
        // points: "",

        error: null,
        loading: false,
    }),

    getters: {},

    actions: {
        async fetch_mathworld_questions() {
            try {
                // var question_type = "&question_type=MathWorld";
                // var question_status = "&question_status=Approved";
                // var page_number = `&page_num=${this.current_page}`;
                // var page_size = `&page_size=${this.page_size}`;
                // var response_type = "";
                // var params = question_type + question_status + page_number + page_size + response_type;

                var question_type = `${this.question_type}`;
                var response_type = `${this.response_type}`;
                var student_expectations = "";
                var subject = "";
                var topic = `${this.topic}`;
                var teks_code = `${this.teks_code}`;
                var category = `${this.category}`;
                var keywords = "";
                var difficulty = `${this.difficulty}`;
                var points = "";
                var page_number = `&page_num=${this.current_page}`;
                var page_size = `&page_size=${this.page_size}`;

                var params =
                    question_type +
                    response_type +
                    student_expectations +
                    subject +
                    topic +
                    teks_code +
                    category +
                    keywords +
                    difficulty +
                    points +
                    page_number +
                    page_size;

                // var params = "";

                this.loading = true;
                const results = await teacher_questions_API.prototype.fetch_questions(params);
                console.log(results.data);
                this.questions = results.data;
                // this.page_size = results.count;
                this.number_of_pages = results.no_of_pages;
                this.current_page = results.page;
                this.total_results = results.total;
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async fetch_all_questions() {
            try {
                var params = "";
                this.loading = true;
                const results = await teacher_questions_API.prototype.fetch_questions(params);
                this.questions = results.data;
                this.page_size = results.count;
                this.number_of_pages = results.no_of_pages;
                this.current_page = results.page;
                this.total_results = results.total;
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },
    },
});
