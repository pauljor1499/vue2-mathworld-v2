import { defineStore } from "pinia";
import class_api from "@/api/Teacher_API/teacher_class_api";

export const TeacherClassData = defineStore("TeacherClassData", {
    state: () => ({
        all_class: null,
        selected_class: null,
        error: null,
        loading: false,
    }),

    getters: {
        get_accepted_students() {
            if (this.selected_class !== null) {
                var accepted_students = [];
                this.selected_class.students.forEach((student) => {
                    if (student.status == "Accepted") {
                        accepted_students.push(student);
                    }
                });
                return accepted_students;
            }
        },

        get_pending_students() {
            if (this.selected_class !== null) {
                var pending_students = [];
                this.selected_class.students.forEach((student) => {
                    if (student.status == "Pending") {
                        pending_students.push(student);
                    }
                });
                return pending_students;
            }
        },
    },

    actions: {
        async create_class(new_class) {
            try {
                this.loading = true;
                const result = await class_api.prototype.create_new_class(new_class);
                this.get_all_class();
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
                this.all_class = result.data.data;
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

        async update_class(class_uuid, updated_class) {
            try {
                this.loading = true;
                const result = await class_api.prototype.update_class(class_uuid, updated_class);
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

        async delete_class(class_uuid) {
            try {
                this.loading = true;
                const result = await class_api.prototype.delete_class(class_uuid);
                this.get_all_class();
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async accept_student(class_uuid, student_id) {
            try {
                this.loading = true;
                const result = await class_api.prototype.accept_student(class_uuid, student_id);
                this.view_class(class_uuid);
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async reject_student(class_uuid, student_id) {
            try {
                this.loading = true;
                const result = await class_api.prototype.reject_student(class_uuid, student_id);
                this.view_class(class_uuid);
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
