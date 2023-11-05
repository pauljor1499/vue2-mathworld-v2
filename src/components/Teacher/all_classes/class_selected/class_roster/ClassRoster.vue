<template>
    <div>
        <YesNoWarning v-if="dialog.status" @clickNo="dialog.status = false" @clickYes="remove_student()" :dialog_prop="this.dialog" />
        <SuccessSnackbar :text="success_snackbar.message" v-if="success_snackbar.status" @closeSnackbar="success_snackbar.status = false" />
        <div class="content-body">
            <v-card>
                <v-card-text>
                    <v-data-table :headers="headers" :items="class_roster" :items-per-page="5" hide-default-footer>
                        <template v-slot:[`item.number`]="{ index }">
                            <span> {{ index + 1 }} </span>
                        </template>
                        <template v-slot:[`item.contact_number`]="{ item }">
                            <span style="white-space: nowrap"> {{ item.contact_number }} </span>
                        </template>
                        <template v-slot:[`item.email_icon`]="{ item }">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on">
                                        <v-icon color="primary"> mdi-dots-vertical-circle-outline </v-icon>
                                    </v-btn>
                                </template>
                                <v-list dense>
                                    <v-list-item link dense @click="sendEmail(item)">
                                        <span> Send Email </span>
                                    </v-list-item>
                                    <v-list-item link dense @click="show_dialog(item)">
                                        <span> Remove Student </span>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { TeacherClassData } from "@/store/Teacher/TeacherClassData";
import YesNoWarning from "@/components/Commons/popup_dialogs/YesNoWarning.vue";
import SuccessSnackbar from "@/components/Commons/snackbars/Success.vue";

export default {
    props: {
        class_details: Object,
        class_roster: Array,
    },

    components: {
        YesNoWarning,
        SuccessSnackbar,
    },

    data() {
        return {
            teacher_class_store: TeacherClassData(),
            student_uuid: null,

            dialog: {
                status: false,
                title: "Confirm remove student",
                message: "",
            },
            success_snackbar: {
                status: false,
                message: "",
            },
            headers: [
                {
                    text: "#",
                    align: "start",
                    sortable: false,
                    value: "number",
                },
                {
                    text: "Last name",
                    align: "start",
                    sortable: false,
                    value: "last_name",
                },
                {
                    text: "First name",
                    align: "start",
                    sortable: false,
                    value: "first_name",
                },
                {
                    text: "Middle name",
                    align: "start",
                    sortable: false,
                    value: "middle_name",
                },
                {
                    text: "Email",
                    align: "start",
                    sortable: false,
                    value: "email",
                },
                {
                    text: "Actions",
                    align: "start",
                    sortable: false,
                    value: "email_icon",
                },
            ],
        };
    },

    methods: {
        showSuccessMessage(message) {
            this.success_snackbar.status = true;
            this.success_snackbar.message = message;
        },

        sendEmail(student) {
            var url = "https://mail.google.com/mail/?view=cm&fs=1"; //gmail
            var to = student.email;
            var subject = "";
            var body = "";
            window.open(url + "&to=" + to + "&su=" + subject + "&body=" + body, "_blank").focus();
        },

        show_dialog(student) {
            this.student_uuid = student.uuid;
            this.dialog.message = "Do you want to " + student.first_name + " " + student.middle_name + " " + student.last_name + " from your class?";
            this.dialog.status = true;
        },

        async remove_student() {
            var results = await this.teacher_class_store.reject_student(this.class_details.uuid, this.student_uuid);
            if (results == true) {
                this.dialog.status = false;
                this.showSuccessMessage("Student successfully removed from class");
            }
        },
    },
};
</script>

<style scoped>
.content-body {
    padding: 1%;
}
</style>
