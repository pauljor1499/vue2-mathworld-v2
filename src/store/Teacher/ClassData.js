import { defineStore } from "pinia";
import class_api from "@/api/Teacher_API/class_api";

export const ClassData = defineStore("ClassData", {
    state: () => ({
        all_class: null,
        error: null,
        loading: false,
    }),

    getters: {},

    actions: {
        async create_new_class(new_class) {
            try {
                this.loading = true;
                const result = await class_api.prototype.create_new_class(
                    new_class
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
