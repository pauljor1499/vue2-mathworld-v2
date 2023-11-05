<template>
    <div class="requests-content">
        <SuccessSnackbar :text="success_snackbar.message" v-if="success_snackbar.status" @closeSnackbar="success_snackbar.status = false" />
        <ErrorSnackbar :text="error_snackbar.message" v-if="error_snackbar.status" @closeSnackbar="error_snackbar.status = false" />
        <div class="content-body">
            <v-card>
                <v-card-title>
                    <v-col cols="12">
                        <v-text-field v-model="search" outlined dense append-icon="mdi-magnify" label="Search" single-line hide-details />
                    </v-col>
                </v-card-title>
                <br />
                <v-card-text>
                    <v-data-table :headers="headers" :items="pending_students" sort-by="lastname" :search="search" hide-default-footer>
                        <template v-slot:[`item.number`]="{ index }">
                            <span> {{ index + 1 }} </span>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn color="error" small rounded @click="reject_student(item)"> Reject </v-btn>
                            <v-btn color="success" small rounded @click="accept_student(item)"> Accept </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { TeacherClassData } from "@/store/Teacher/TeacherClassData";
import SuccessSnackbar from "@/components/Commons/snackbars/Success.vue";
import ErrorSnackbar from "@/components/Commons/snackbars/Error.vue";

export default {
    props: {
        pending_students: Array,
    },

    components: {
        SuccessSnackbar,
        ErrorSnackbar,
    },

    data() {
        return {
            teacher_class_store: TeacherClassData(),
            search: "",
            success_snackbar: {
                status: false,
                message: "Student successfully accepted",
            },
            error_snackbar: {
                status: false,
                message: "Student successfully rejected",
            },
            headers: [
                {
                    text: "#",
                    sortable: true,
                    value: "number",
                },
                {
                    text: "Last name",
                    sortable: false,
                    value: "last_name",
                },
                {
                    text: "First name",
                    sortable: false,
                    value: "first_name",
                },
                {
                    text: "Middle name",
                    sortable: false,
                    value: "middle_name",
                },
                {
                    text: "Email",
                    sortable: false,
                    value: "email",
                },
                { text: "Actions", value: "actions", sortable: false },
            ],
        };
    },

    methods: {
        async accept_student(student) {
            const results = await this.teacher_class_store.accept_student(this.teacher_class_store.selected_class.uuid, student.uuid);
            if (results == true) {
                this.show_success_message();
            }
        },

        async reject_student(student) {
            const results = await this.teacher_class_store.reject_student(this.teacher_class_store.selected_class.uuid, student.uuid);
            if (results == true) {
                this.show_error_message();
            }
        },

        show_success_message() {
            this.success_snackbar.status = true;
            this.error_snackbar.status = false;
        },

        show_error_message() {
            this.error_snackbar.status = true;
            this.success_snackbar.status = false;
        },
    },
};
</script>

<style scoped>
.v-text-field {
    width: 40%;
}

.content-body {
    padding: 1%;
}

@media only screen and (max-width: 800px) {
    .v-text-field {
        width: 50%;
    }
}

@media only screen and (max-width: 450px) {
    .v-text-field {
        width: 100%;
    }
}
</style>
