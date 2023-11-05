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
                <br />
                <br />
                <v-tab-item>
                    <SearchQuestions :has_error="hasErrors" :all_questions="getReturnedQuestions" @add_question="addQuestion($event)" />
                </v-tab-item>
                <v-tab-item>
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
import SearchQuestions from "./SearchQuestions.vue";
import AddedQuestions from "./AddedQuestions.vue";
import { STAAR_NewAssignment } from "@/api/Teacher/assignments/STAAR/NewAssignment";

export default {
    components: {
        SearchQuestions,
        AddedQuestions,
    },

    data() {
        return {
            get_questions: STAAR_NewAssignment.prototype.getAllQuestions(),
            all_questions: [],
            selected_questions: [],
            tab: null,
        };
    },

    methods: {
        clickNext() {
            if (this.submit()) this.$emit("clickNext");
        },

        clickBack() {
            this.$emit("clickBack");
        },

        addQuestion(added_questions) {
            this.selected_questions.push(added_questions);
        },

        removeQuestion(item) {
            this.all_questions.unshift(item);
        },

        getAllQuestions() {
            for (var i = 0; i < this.get_questions.length; i++) {
                this.all_questions.push(this.get_questions[i]);
            }
        },

        submit() {
            return STAAR_NewAssignment.prototype.submit_Step2(this.selected_questions);
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
            return this.selected_questions;
        },

        getReturnedQuestions() {
            return this.all_questions;
        },
    },

    created() {
        this.getAllQuestions();
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
