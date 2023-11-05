<template>
    <div class="my-assignment-content">
        <div class="content-table">
            <div class="content-header">
                <v-col cols="5">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details outlined />
                </v-col>
                <v-spacer></v-spacer>
            </div>
            <br />
            <br />
            <v-alert text dense outlined type="warning" width="50%"> Assignment will be deleted after 90 days </v-alert>
            <v-card>
                <v-card-text>
                    <v-data-table :headers="headers" :items="assignments" :search="search" style="cursor: pointer">
                        <template v-slot:[`item.number`]="{ index }">
                            <span> {{ index + 1 }} </span>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on" large>
                                        <v-icon color="primary"> mdi-dots-vertical-circle-outline </v-icon>
                                    </v-btn>
                                </template>
                                <v-list dense>
                                    <v-list-item link @click="sendEmail(item)">
                                        <span> Restore </span>
                                        <v-list-item-icon>
                                            <v-icon>mdi-file-restore-outline</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item link dense @click="show_dialog(item)">
                                        <span> Delete </span>
                                        <v-list-item-icon>
                                            <v-icon>mdi-delete</v-icon>
                                        </v-list-item-icon>
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
export default {
    data() {
        return {
            search: "",
            dates: ["Fall 2023", "Spring 2023", "Fall 2022", "Spring 2022"],
            headers: [
                {
                    text: "#",
                    sortable: false,
                    value: "number",
                },
                {
                    text: "Title",
                    sortable: false,
                    value: "title",
                },
                {
                    text: "Subject",
                    sortable: false,
                    value: "subject",
                },
                {
                    text: "Items",
                    sortable: false,
                    value: "total_items",
                },
                {
                    text: "Sender",
                    sortable: false,
                    value: "sender",
                },
                {
                    text: "Date",
                    sortable: false,
                    value: "date",
                },
                {
                    text: "Actions",
                    sortable: false,
                    value: "actions",
                },
            ],
            assignments: [
                {
                    title: "Algebra Assignment",
                    total_items: 20,
                    date_open: "January 20, 2023",
                    date_close: "January 21, 2023",
                    submissions: 0,
                    subject: "Algebra",
                    sender: "Jose Rizal",
                    date: "August 20, 2023",
                },
                {
                    title: "Algebra Assignment",
                    total_items: 20,
                    date_open: "August 20, 2023",
                    date_close: "August 21, 2023",
                    submissions: 0,
                    subject: "Calculus",
                    sender: "You",
                    date: "August 20, 2023",
                },
                {
                    title: "Algebra Assignment",
                    total_items: 20,
                    date_open: "September 20, 2023",
                    date_close: "September 21, 2023",
                    submissions: 0,
                    subject: "Trigonometry",
                    sender: "Jose Rizal",
                    date: "August 20, 2023",
                },
                {
                    title: "Algebra Assignment",
                    total_items: 20,
                    date_open: "October 01, 2023",
                    date_close: "October 03, 2023",
                    submissions: 0,
                    subject: "Topology",
                    sender: "Jose Rizal",
                    date: "August 20, 2023",
                },
                {
                    title: "Algebra Assignment",
                    total_items: 20,
                    date_open: "February 20, 2022",
                    date_close: "February 21, 2022",
                    submissions: 0,
                    subject: "Arithmetic",
                    sender: "Jose Rizal",
                    date: "August 20, 2023",
                },
                {
                    title: "Algebra Assignment",
                    total_items: 20,
                    date_open: "September 20, 2022",
                    date_close: "September 21, 2022",
                    submissions: 0,
                    subject: "Geometry",
                    sender: "Jose Rizal",
                    date: "August 20, 2023",
                },
            ],
        };
    },
};
</script>

<style scoped>
.content-header {
    display: flex;
}

.content-table {
    padding: 1%;
}
</style>
