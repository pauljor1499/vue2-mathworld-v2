import { defineStore } from "pinia";
import student_API from "@/api/Student_API/student_api";

export const StudentData = defineStore("StudentData", {
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
                contact_person: {
                    first_name: "Olivia",
                    middle_name: "Ava",
                    last_name: "Petterson",
                    relationship: "Mother",
                    phone: "",
                    country: "United States",
                    state: "Massachusetts",
                    city: "Framingham",
                    street: "2849 Stadium Drive",
                    zip_code: "01702",
                },
            },
        },
        error: null,
        loading: false,
    }),

    getters: {
        getUser() {
            return this.user;
        },
    },

    actions: {
        async register_student(student) {
            try {
                this.loading = true;
                const result = await student_API.prototype.register_student(
                    student
                );
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async login_student(student) {
            try {
                this.loading = true;
                const result = await student_API.prototype.login_student(
                    student
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
