<template>
    <div class="requests-content" v-if="teacher_assignment_store.all_assignments">
        <div class="card-content">
            <v-card>
                <v-card-title>
                    <v-col cols="12">
                        <v-text-field v-model="search" label="Search" append-icon="mdi-magnify" outlined dense single-line hide-details />
                    </v-col>
                </v-card-title>
                <br />
                <v-card-text>
                    <v-data-table
                        :headers="headers"
                        :items="teacher_assignment_store.all_assignments"
                        :search="search"
                        hide-default-footer
                        @click:row="rowClicked"
                        style="cursor: pointer"
                    >
                        <template v-slot:[`item.number`]="{ index }">
                            <span> {{ index + 1 }} </span>
                        </template>
                        <!-- <template v-slot:[`item.total_items`]="data">
                            {{ get_total_items(data.item.questions) }}
                        </template>
                        <template v-slot:[`item.submissions`]="data">
                            {{ get_total_submissions(data.item.title) }}
                        </template> -->
                        <template v-slot:[`item.status`]="data">
                            <v-chip color="success" elevation="0" small rounded v-if="data.item.status === 'open'"> OPEN </v-chip>
                            <v-chip color="error" elevation="0" small rounded v-else-if="data.item.status === 'close'"> CLOSED </v-chip>
                            <v-chip color="var(--gray-1)" elevation="0" small rounded v-else-if="data.item.status === 'undeployed'">
                                UNDEPLOYED
                            </v-chip>
                            <v-chip color="primary" elevation="0" small rounded v-else-if="data.item.status === 'Assigned'"> ASSIGNED </v-chip>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { TeacherAssignmentData } from "@/store/Teacher/TeacherAssignmentData";
export default {
    data() {
        return {
            teacher_assignment_store: TeacherAssignmentData(),
            search: "",
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
                    text: "Total items",
                    sortable: false,
                    value: "total_items",
                },
                {
                    text: "Open on",
                    sortable: false,
                    value: "date_start",
                },
                {
                    text: "Close on",
                    sortable: false,
                    value: "date_end",
                },
                {
                    text: "Submissions",
                    sortable: false,
                    value: "submissions",
                },
                { text: "Status", value: "status", sortable: false },
            ],
        };
    },

    methods: {
        rowClicked(row) {
            this.$router.push({
                name: "SelectedAssignment",
                params: {
                    assignment_type: "MW",
                    assignment_code: row.uuid,
                },
            });
        },

        // get_total_items(questions_list) {
        //     var counter = 0;
        //     questions_list.forEach((item) => {
        //         counter++;
        //     });
        //     return counter;
        // },

        // get_total_submissions(assignment_title) {
        //     return AssignmentService.prototype.get_total_submissions(assignment_title);
        // },
    },
};
</script>

<style scoped>
.v-text-field {
    width: 40%;
}

.card-content {
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
