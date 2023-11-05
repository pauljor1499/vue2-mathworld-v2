<template>
    <v-card-text class="question-body">
        <div class="question">
            <span style="color: black; font-size: 1.2rem">
                {{ current_question.question }}
            </span>
        </div>
        <br />
        <br />
        <v-textarea v-model="response" @focus="actions = true" label="Enter your answer here.." hide-details="" solo flat outlined> </v-textarea>
        <div class="answer-actions" v-if="actions">
            <div></div>
            <div>
                <v-btn icon @click="cancel_answer()">
                    <v-icon> mdi-close </v-icon>
                </v-btn>
                <v-btn color="primary" small width="100" @click="save_answer()"> Save </v-btn>
            </div>
        </div>
        <br />
        <v-card-actions>
            <v-btn v-if="!actions" text small color="error" @click="removeAnswer()"> Remove Answer </v-btn>
        </v-card-actions>
    </v-card-text>
</template>

<script>
import { AnswersService } from "@/api/Student/assignments/AnswersService.js";
export default {
    props: {
        current_question: Object,
        question_number: Number,
    },

    data() {
        return {
            my_answers: AnswersService.prototype.get_answers(),
            response: "",
            actions: false,
        };
    },

    methods: {
        save_answer() {
            this.actions = false;
            this.select_answer();
        },

        cancel_answer() {
            this.response = this.my_answers[this.question_number].answer;
            this.actions = false;
        },

        select_answer() {
            AnswersService.prototype.set_answer("open-response", this.question_number, this.response);
        },

        removeAnswer() {
            this.response = "";
            AnswersService.prototype.remove_answer("open-response", this.question_number);
        },
    },

    created() {
        this.response = this.my_answers[this.question_number].answer;
    },
};
</script>

<style scoped>
.answer-actions {
    display: flex;
    justify-content: space-between;
}
</style>
