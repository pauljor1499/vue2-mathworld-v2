import { defineStore } from "pinia";
import teacher_API from "@/api/Teacher_API/teacher_api";

export const TeacherData = defineStore("TeacherData", {
    state: () => ({
        user: null,
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
                const result = await teacher_API.prototype.register_teacher(teacher);
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async login_teacher(teacher) {
            try {
                this.loading = true;
                const result = await teacher_API.prototype.login_teacher(teacher);
                localStorage.setItem("token", JSON.stringify(result.data.access_token));
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async get_account_data() {
            try {
                this.loading = true;
                const result = await teacher_API.prototype.get_account_data();
                this.user = result.data.data;
                this.user.education = this.sort_alphabetically(this.user.education);
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async update_user_details(updated_details) {
            try {
                this.loading = true;
                const result = await teacher_API.prototype.update_user_details(updated_details);
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

        async change_password(updated_data) {
            try {
                this.loading = true;
                const result = await teacher_API.prototype.change_password(updated_data);
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error);
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
                    const result = await teacher_API.prototype.update_profile_photo(fd);
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

        async remove_profile_photo() {
            try {
                this.loading = true;
                const result = await teacher_API.prototype.remove_profile_photo();
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async add_education(data) {
            try {
                this.loading = true;
                const result = await teacher_API.prototype.add_education(data);
                this.get_account_data();
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async update_education(data) {
            try {
                this.loading = true;
                const result = await teacher_API.prototype.update_education(data);
                this.user.education = [];
                this.get_account_data();
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async delete_education(uuid) {
            try {
                this.loading = true;
                const result = await teacher_API.prototype.delete_education(uuid);
                this.user.education = [];
                this.get_account_data();
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        sort_alphabetically(array) {
            return array.sort((a, b) => {
                if (a.school < b.school) {
                    return -1;
                } else if (a.school > b.school) {
                    return 1;
                } else {
                    return 0;
                }
            });
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
    },
});
