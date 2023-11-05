<template>
    <div class="my-assignment-content">
        <div class="content-table">
            <div class="content-header">
                <h2>Fall 2023</h2>
                <NewAssignmentButton />
            </div>
            <br />
            <br />
            <v-expansion-panels focusable>
                <v-expansion-panel v-for="(item, index) in classes" :key="index">
                    <v-expansion-panel-header expand-icon="mdi-menu-down"> {{ item }} </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card outlined>
                            <v-card-title>
                                <v-col cols="6">
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" dense single-line hide-details outlined />
                                </v-col>
                            </v-card-title>
                            <v-card-text>
                                <v-data-table
                                    :headers="headers"
                                    :items="assignments"
                                    :search="search"
                                    @click:row="rowClicked"
                                    style="cursor: pointer"
                                >
                                    <template v-slot:[`item.number`]="{ index }">
                                        <span> {{ index + 1 }} </span>
                                    </template>
                                    <template v-slot:[`item.submissions`]="{ item }">
                                        <span style="color: green" v-if="item.submissions == 20">
                                            {{ item.submissions + "/20" }}
                                        </span>
                                        <span style="color: red" v-else>
                                            {{ item.submissions + "/20" }}
                                        </span>
                                    </template>
                                    <template v-slot:[`item.status`]="{ item }">
                                        <v-chip color="primary" small v-if="item.status == 'ASSIGNED'">ASSIGNED</v-chip>
                                        <v-chip color="error" small v-else-if="item.status == 'CLOSED'">CLOSED</v-chip>
                                        <v-chip color="warning" small v-else-if="item.status == 'UNDEPLOYED'">UNDEPLOYED</v-chip>
                                    </template>
                                    <!-- <template v-slot:[`item.actions`]="{}">
                                        <ShareAssignmentButton />
                                    </template> -->
                                    <template v-slot:[`item.actions`]="{ item }">
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on" large>
                                                    <v-icon color="primary"> mdi-dots-vertical-circle-outline </v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list dense>
                                                <ShareAssignmentButton />
                                                <v-list-item link dense @click="showAnalytics()" v-if="item.status !== 'CLOSED'">
                                                    <v-list-item-icon>
                                                        <v-icon dense>mdi-poll</v-icon>
                                                    </v-list-item-icon>
                                                    <span> Show Analytics </span>
                                                </v-list-item>
                                                <v-list-item disabled link dense v-else>
                                                    <v-list-item-icon>
                                                        <v-icon dense>mdi-poll</v-icon>
                                                    </v-list-item-icon>
                                                    <span> Show Analytics </span>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>

<script>
import NewAssignmentButton from "./NewAssignmentButton/NewAssignmentButton.vue";
import ShareAssignmentButton from "./ShareAssignment/ShareAssignment.vue";
export default {
    components: {
        NewAssignmentButton,
        ShareAssignmentButton,
    },

    data() {
        return {
            search: "",
            classes: ["Algebra", "Geometry", "Calculus"],
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
                    text: "Items",
                    sortable: false,
                    value: "total_items",
                },
                {
                    text: "Date open",
                    sortable: true,
                    value: "date_open",
                },
                {
                    text: "Date close",
                    sortable: true,
                    value: "date_close",
                },
                {
                    text: "Submissions",
                    sortable: false,
                    value: "submissions",
                },
                {
                    text: "Status",
                    sortable: false,
                    value: "status",
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
                    date_open: "August 20, 2022",
                    date_close: "August 21, 2022",
                    submissions: 20,
                    status: "CLOSED",
                },
                {
                    title: "Assignment 1",
                    total_items: 20,
                    date_open: "May 20, 2023",
                    date_close: "May 21, 2023",
                    submissions: 17,
                    status: "ASSIGNED",
                },
                {
                    title: "Assignment 2",
                    total_items: 20,
                    date_open: "February 04, 2023",
                    date_close: "February 05, 2023",
                    submissions: 17,
                    status: "UNDEPLOYED",
                },

                {
                    title: "What is Polynomial?",
                    total_items: 20,
                    date_open: "June 20, 2021",
                    date_close: "June 21, 2021",
                    submissions: 15,
                    status: "CLOSED",
                },
                {
                    title: "The Distance of A and B",
                    total_items: 20,
                    date_open: "May 20, 2021",
                    date_close: "May 21, 2021",
                    submissions: 20,
                    status: "CLOSED",
                },
                {
                    title: "Heights",
                    total_items: 20,
                    date_open: "March 20, 2020",
                    date_close: "March 21, 2020",
                    submissions: 20,
                    status: "CLOSED",
                },
            ],
        };
    },

    methods: {
        rowClicked(row) {
            this.$router.push({
                name: "ViewAssignment",
                params: {
                    assignment_type: "MW",
                    //need to change
                    // assignment_code: row.uuid,
                    assignment_code: "9550aec0-e522-4363-8713-42b27646f567",
                },
            });
        },

        showAnalytics() {
            this.$router.push({
                name: "AssignmentAnalytics",
                params: {
                    //need to change
                    assignment_code: "1",
                },
            });
        },
    },
};
</script>

<style scoped>
.content-header {
    display: flex;
    justify-content: space-between;
}

.content-table {
    padding: 1%;
}
</style>
