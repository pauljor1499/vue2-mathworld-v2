<template>
    <div class="requests-content">
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
        </div>
        <br />
        <br />
        <v-data-table
            :headers="headers"
            :items="assignments"
            :search="search"
            hide-default-footer
            @click:row="rowClicked"
            style="cursor: pointer"
        >
            <template v-slot:[`item.total_items`]="data">
                {{ get_total_items(data.item.questions) }}
            </template>
            <template v-slot:[`item.submissions`]="data">
                {{ get_total_submissions(data.item.title) }}
            </template>
            <template v-slot:[`item.status`]="data">
                <v-chip
                    color="success"
                    elevation="0"
                    small
                    rounded
                    v-if="data.item.status === 'open'"
                >
                    OPEN
                </v-chip>
                <v-chip
                    color="error"
                    elevation="0"
                    small
                    rounded
                    v-else-if="data.item.status === 'close'"
                >
                    CLOSED
                </v-chip>
                <v-chip
                    color="var(--gray-1)"
                    elevation="0"
                    small
                    rounded
                    v-else-if="data.item.status === 'undeployed'"
                >
                    UNDEPLOYED
                </v-chip>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { AssignmentService } from "@/api/Teacher/gradebook/assignments/main/Assignments";
export default {
    data() {
        return {
            search: "",

            headers: [
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
                    value: "date_open",
                },
                {
                    text: "Close on",
                    sortable: false,
                    value: "date_close",
                },
                {
                    text: "Submissions",
                    sortable: false,
                    value: "submissions",
                },
                { text: "Status", value: "status", sortable: false },
            ],
            assignments: AssignmentService.prototype.get_all_assignments(),
        };
    },

    methods: {
        rowClicked(row) {
            this.$router.push({
                name: "SelectedAssignment",
                params: {
                    assignment_code: row.id,
                    assignment_type: row.type,
                },
            });
        },

        get_total_items(questions_list) {
            var counter = 0;
            questions_list.forEach((item) => {
                counter++;
            });
            return counter;
        },

        get_total_submissions(assignment_title) {
            return AssignmentService.prototype.get_total_submissions(
                assignment_title
            );
        },
    },

    beforeCreate() {
        AssignmentService.prototype.get_class(this.$route.params.class_title);
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
