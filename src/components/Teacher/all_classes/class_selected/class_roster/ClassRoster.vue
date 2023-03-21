<template>
    <v-data-table
        :headers="headers"
        :items="class_roster"
        :items-per-page="5"
        hide-default-footer
    >
        <template v-slot:[`item.number`]="{ index }">
            <span> {{ index + 1 }} </span>
        </template>
        <template v-slot:[`item.email_icon`]="{ item }">
            <v-btn icon @click="sendEmail(item)">
                <v-icon color="primary"> mdi-email-outline </v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
import { AllClassesService } from "@/api/Teacher/all_classes/AllClassesData";

export default {
    data() {
        return {
            get_class: AllClassesService.prototype.get_all_class(),

            headers: [
                {
                    text: "#",
                    align: "start",
                    sortable: false,
                    value: "number",
                },
                {
                    text: "Lastname",
                    align: "start",
                    sortable: false,
                    value: "lastname",
                },
                {
                    text: "Firstname",
                    align: "start",
                    sortable: false,
                    value: "firstname",
                },
                {
                    text: "Middlename",
                    align: "start",
                    sortable: false,
                    value: "middlename",
                },
                {
                    text: "Email",
                    align: "start",
                    sortable: false,
                    value: "email",
                },
                {
                    text: "Contact Number",
                    align: "start",
                    sortable: false,
                    value: "contact_number",
                },
                {
                    text: "",
                    align: "start",
                    sortable: false,
                    value: "email_icon",
                },
            ],
            class_roster: AllClassesService.prototype.get_class_by_title(
                this.$route.params.class_title
            ).students,
        };
    },

    methods: {
        sendEmail(student) {
            var url = "https://mail.google.com/mail/?view=cm&fs=1"; //gmail
            var to = student.email;
            var subject = "";
            var body = "";
            window
                .open(
                    url + "&to=" + to + "&su=" + subject + "&body=" + body,
                    "_blank"
                )
                .focus();
        },
    },
};
</script>
