<template>
    <div class="table-data">
        <v-card>
            <v-card-title>
                Students
                <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="body-table">
                <v-data-table style="flex: 1; overflow: hidden" :headers="student_headers" :items="students" hide-default-footer>
                    <template v-slot:[`item.number`]="{ index }">
                        {{ index + 1 }}
                    </template>
                </v-data-table>
                <v-data-table style="flex: 1.1; overflow: hidden" :headers="answers_headers" :items="student_answers" hide-default-footer>
                    <template v-slot:[`item.number`]="{ index }">
                        {{ index + 1 }}
                    </template>
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item, index) in items" :key="index">
                                <td v-for="(item2, index2) in item" :key="index2">
                                    <span style="color: green" v-if="check_answer(item2, index2)">
                                        {{ item2 }}
                                    </span>
                                    <span style="color: red" v-else>
                                        {{ item2 }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { AssignmentDataService } from "@/api/Teacher/gradebook/assignments/assignment_data/AssignmentData";

export default {
    data() {
        return {
            student_headers: [
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
                    text: "Total Correct Answers",
                    align: "start",
                    sortable: false,
                    value: "correct_answers",
                },
            ],
            students: [],
            answers_headers: [],
            student_answers: [],
            correct_answers: [],
        };
    },

    methods: {
        check_answer(answer, index) {
            if (this.correct_answers[index - 1] == answer) {
                return true;
            }
            return false;
        },
    },

    created() {
        this.students = JSON.parse(JSON.stringify(AssignmentDataService.prototype.get_students(this.$route.params.assignment_code)));
        this.answers_headers = JSON.parse(JSON.stringify(AssignmentDataService.prototype.get_answers_headers(this.$route.params.assignment_code)));
        this.student_answers = JSON.parse(JSON.stringify(AssignmentDataService.prototype.get_student_answers(this.$route.params.assignment_code)));
        this.correct_answers = JSON.parse(JSON.stringify(AssignmentDataService.prototype.get_correct_answers(this.$route.params.assignment_code)));
    },
};
</script>

<style scoped>
.body-table {
    display: flex;
    white-space: nowrap;
}
</style>
