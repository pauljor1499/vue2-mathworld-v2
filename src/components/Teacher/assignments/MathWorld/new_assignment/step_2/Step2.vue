<template>
    <div class="main-content">
        <v-card-title>
            <h3>Questions</h3>
        </v-card-title>
        <br />
        <v-card outlined class="main-card">
            <v-tabs v-model="tab">
                <v-tab>
                    <span> Search Questions </span>
                </v-tab>
                <v-tab>
                    <span>Added Questions</span>
                    <v-badge v-if="selected_questions.length != 0" color="success" inline :content="selected_questions.length" />
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <br />
                    <br />
                    <SearchQuestions
                        :has_error="hasErrors"
                        :pageSize="teacher_questions_data.page_size"
                        :totalPages="teacher_questions_data.number_of_pages"
                        :currentPage="teacher_questions_data.current_page"
                        :totalResults="teacher_questions_data.total_results"
                        @add_question="addQuestion($event)"
                    />
                </v-tab-item>
                <v-tab-item>
                    <br />
                    <br />
                    <AddedQuestions :selected_questions="getSelectedQuestions" @remove_question="removeQuestion($event)" />
                </v-tab-item>
                <br />
            </v-tabs-items>
        </v-card>
        <br />
        <v-card-actions>
            <div class="content-actions">
                <v-btn large width="15%" outlined @click="clickBack()"> Back </v-btn>
                <v-btn large width="15%" color="primary" :disabled="hasErrors" @click="clickNext()"> Next </v-btn>
            </div>
        </v-card-actions>
    </div>
</template>

<script>
import { TeacherQuestionsData } from "@/store/Teacher/TeacherQuestionsData";
import SearchQuestions from "./SearchQuestions.vue";
import AddedQuestions from "./AddedQuestions.vue";

export default {
    components: {
        SearchQuestions,
        AddedQuestions,
    },

    data() {
        return {
            teacher_questions_data: TeacherQuestionsData(),
            selected_questions: [],
            tab: null,
        };
    },

    methods: {
        sortQuestions(questions) {
            questions.sort((a, b) => {
                return a.temp_id - b.temp_id;
            });
            return questions;
        },

        clickNext() {
            this.$emit("checkStep2", this.selected_questions);
        },

        clickBack() {
            this.$emit("clickBack");
        },

        addQuestion(added_questions) {
            this.selected_questions.push(added_questions);
            this.teacher_questions_data.total_results--;
        },

        removeQuestion(item) {
            this.teacher_questions_data.questions.unshift(item);
            this.teacher_questions_data.total_results++;
        },
    },

    computed: {
        hasErrors() {
            if (this.selected_questions == 0) {
                return true;
            } else {
                return false;
            }
        },

        getSelectedQuestions() {
            return this.sortQuestions(this.selected_questions);
        },
    },
};
</script>

<style scoped>
* {
    text-decoration: none;
    text-transform: none;
}

span {
    font-size: 1rem;
}

.v-tabs {
    border-bottom: 1px solid #d4d4d4;
}

.main-card {
    padding: 40px;
}

.content-actions {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>
