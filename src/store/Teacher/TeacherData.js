import { defineStore } from "pinia";
import teacher_API from "@/api/Teacher_API/teacher_api";

export const TeacherData = defineStore("TeacherData", {
    state: () => ({
        user: {
            role: "NoRole",
            credentials: {
                photo: "",
                name: {
                    first_name: "Default",
                    middle_name: "",
                    last_name: "User",
                },
                account: {
                    email: "noroleuser@gmail.com",
                    password: "Sample123!",
                },
                school: "University of MathWorld",
                office: {
                    location: "",
                    free_time: "",
                    phone_number: "",
                },
                background: {
                    biography: "",
                    education: [],
                },
            },
        },
        error: null,
        loading: false,
    }),

    getters: {
        get_user() {
            return this.user;
        },
    },

    actions: {
        async register_teacher(teacher) {
            try {
                this.loading = true;
                const result = await teacher_API.prototype.register_teacher(
                    teacher
                );
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async login_teacher(teacher) {
            try {
                this.loading = true;
                const result = await teacher_API.prototype.login_teacher(
                    teacher
                );
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },
    },
});
