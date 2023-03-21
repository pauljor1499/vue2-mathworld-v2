<template>
    <div class="requests-content">
        <SuccessSnackbar
            :text="success_snackbar.message"
            v-if="success_snackbar.status"
            @closeSnackbar="success_snackbar.status = false"
        />
        <ErrorSnackbar
            :text="error_snackbar.message"
            v-if="error_snackbar.status"
            @closeSnackbar="error_snackbar.status = false"
        />
        <br />
        <br />
        <div class="table-top">
            <v-text-field
                v-model="search"
                style="max-width: 40%"
                outlined
                dense
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            />
            <!-- <v-btn color="primary">
                <v-icon left> mdi-plus </v-icon> Add New Student
            </v-btn> -->
        </div>
        <br />
        <br />
        <v-data-table
            :headers="headers"
            :items="pending_students"
            sort-by="lastname"
            :search="search"
            hide-default-footer
        >
            <template v-slot:[`item.number`]="{ index }">
                <span> {{ index + 1 }} </span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                    color="error"
                    small
                    rounded
                    @click="reject_student(item)"
                >
                    Reject
                </v-btn>
                <v-btn
                    color="success"
                    small
                    rounded
                    @click="accept_student(item)"
                >
                    Accept
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { RequestsService } from "@/api/Teacher/gradebook/requests/Requests";
import SuccessSnackbar from "@/components/Teacher/main/snackbars/Success.vue";
import ErrorSnackbar from "@/components/Teacher/main/snackbars/Error.vue";

export default {
    components: {
        SuccessSnackbar,
        ErrorSnackbar,
    },

    data() {
        return {
            search: "",
            pending_students: RequestsService.prototype.get_class(
                this.$route.params.class_title
            ).pending_students,
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
                    text: "Lastname",
                    sortable: false,
                    value: "lastname",
                },
                {
                    text: "Firstname",
                    sortable: false,
                    value: "firstname",
                },
                {
                    text: "Middlename",
                    sortable: false,
                    value: "middlename",
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
        accept_student(student) {
            RequestsService.prototype.accept_student(student);
            this.show_success_message();
        },

        reject_student(student) {
            RequestsService.prototype.reject_student(student);
            this.show_error_message();
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
.v-btn {
    text-transform: none;
}

.table-top {
    display: flex;
    justify-content: space-between;
}
</style>
