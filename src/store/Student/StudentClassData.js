import { defineStore } from "pinia";
import class_api from "@/api/Student_API/student_class_api";

export const StudentClassData = defineStore("StudentClassData", {
    state: () => ({
        all_class: [],
        selected_class: null,
        error: null,
        loading: false,
    }),

    getters: {},

    actions: {
        async join_class(class_code) {
            try {
                this.loading = true;
                const result = await class_api.prototype.join_class(class_code);
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async get_all_class() {
            try {
                this.loading = true;
                const result = await class_api.prototype.get_all_class();
                this.all_class = result.data.classes;
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async view_class(class_uuid) {
            try {
                this.loading = true;
                const result = await class_api.prototype.view_class(class_uuid);
                this.selected_class = result.data.Class;
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async class_details(class_code) {
            try {
                this.loading = true;
                const result = await class_api.prototype.class_details(class_code);
                this.loading = false;
                this.error = null;
                return result;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },
    },
});
