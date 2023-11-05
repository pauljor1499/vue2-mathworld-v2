import { defineStore } from "pinia";
import student_API from "@/api/Student_API/student_api";

export const StudentData = defineStore("StudentData", {
    state: () => ({
        user: null,
        error: null,
        loading: false,
    }),

    getters: {
        get_user() {
            this.get_account_data();
            return this.user;
        },
    },

    actions: {
        async register_student(student) {
            try {
                this.loading = true;
                const result = await student_API.prototype.register_student(student);
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
                const result = await student_API.prototype.login_student(student);
                localStorage.setItem("token", JSON.stringify(result.data.access_token));
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async get_account_data() {
            try {
                this.loading = true;
                const result = await student_API.prototype.get_account_data();
                this.user = result.data.data;
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async update_profile_photo(photo) {
            try {
                if (photo != "") {
                    const image = await this.getBlobFromUrl(photo);
                    var fd = new FormData();
                    fd.append("profile_picture", image, "profile_picture.jpg");
                    this.loading = true;
                    const result = await student_API.prototype.update_profile_photo(fd);
                    this.loading = false;
                    this.error = null;
                    return true;
                } else {
                    console.log("Failed");
                    return false;
                }
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        getBlobFromUrl(myImageUrl) {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open("GET", myImageUrl, true);
                request.responseType = "blob";
                request.onload = () => {
                    resolve(request.response);
                };
                request.onerror = reject;
                request.send();
            });
        },

        async remove_profile_photo() {
            try {
                this.loading = true;
                const result = await student_API.prototype.remove_profile_photo();
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async change_password(updated_data) {
            try {
                this.loading = true;
                const result = await student_API.prototype.change_password(updated_data);
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async update_contact_person(updated_details) {
            try {
                this.loading = true;
                const result = await student_API.prototype.update_contact_person(updated_details);
                this.get_account_data();
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
