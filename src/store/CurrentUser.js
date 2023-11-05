import { defineStore } from "pinia";

export const storeCurrentUser = defineStore("storeCurrentUser", {
    state: () => ({
        current_user: {
            id: 1,
            role: "NoRole",
            credentials: {
                photo: "",
                name: {
                    first_name: "Default",
                    middle_name: "",
                    last_name: "User",
                },
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
    }),

    getters: {},

    actions: {},
});
