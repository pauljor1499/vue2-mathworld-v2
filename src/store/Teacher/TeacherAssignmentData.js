import { defineStore } from "pinia";
import teacher_assignment_API from "@/api/Teacher_API/teacher_assignment_api";

export const TeacherAssignmentData = defineStore("TeacherAssignmentData", {
    state: () => ({
        all_assignments: null,
        selected_assignment: null,
        error: null,
        loading: false,
    }),

    getters: {},

    actions: {
        async create_assignment(new_assignment) {
            try {
                this.loading = true;
                const result = await teacher_assignment_API.prototype.create_assignment(new_assignment);
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async get_all_assignments(class_uuid) {
            try {
                this.loading = true;
                const result = await teacher_assignment_API.prototype.get_all_assignments(class_uuid);
                this.all_assignments = result.data.data;
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async get_assignment(assignment_uuid) {
            try {
                this.loading = true;
                const result = await teacher_assignment_API.prototype.get_assignment(assignment_uuid);
                this.selected_assignment = result.data.Assignment;
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async delete_assignment(assignment_uuid) {
            try {
                this.loading = true;
                const result = await teacher_assignment_API.prototype.delete_assignment(assignment_uuid);
                this.loading = false;
                this.error = null;
                return true;
            } catch (error) {
                console.log(error.response.data.detail);
                this.error = error.response.data.detail;
                this.loading = false;
            }
        },

        async update_assignment(assignment_uuid) {
            try {
                this.loading = true;
                const result = await teacher_assignment_API.prototype.update_assignment(assignment_uuid);
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
