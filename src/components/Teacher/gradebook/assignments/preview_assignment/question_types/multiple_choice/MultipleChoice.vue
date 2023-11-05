<template>
    <v-card-text class="question-body">
        <div class="question">
            <span style="color: black; font-size: 1.2rem">
                {{ current_question.question }}
            </span>
        </div>
        <br />
        <br />
        <div class="choices">
            <div
                v-for="(choice, index) in current_question.choices"
                :key="index"
                :class="{
                    'choices-item': choice_hover !== index,
                    'choices-item-hover': choice_hover === index || choice === my_answers[question_number].answer.description,
                }"
                @mouseover="hoverAnswer(index)"
                @mouseleave="unhoverAnswer()"
                @click="select_answer(choices[index], choice)"
            >
                <div class="item-letter">
                    {{ choices[index] }}
                </div>
                <div class="item-description">
                    {{ choice }}
                </div>
            </div>
        </div>
        <br />
        <v-card-actions>
            <v-btn text small color="error" @click="removeAnswer()"> Remove answer </v-btn>
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
            choice_hover: null,
            choices: ["A", "B", "C", "D"],
            my_answers: AnswersService.prototype.get_answers(),
        };
    },

    methods: {
        select_answer(letter, description) {
            var answer = {
                letter: letter,
                description: description,
            };
            this.removeAnswer();
            AnswersService.prototype.set_answer("multiple-choice", this.question_number, answer);
            this.hoverAnswer();
        },

        removeAnswer() {
            AnswersService.prototype.remove_answer("multiple-choice", this.question_number);
            this.hoverAnswer();
        },

        hoverAnswer(index) {
            this.choice_hover = index;
        },

        unhoverAnswer() {
            this.choice_hover = "";
        },
    },
};
</script>

<style scoped>
.choices {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.choices-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 0.5rem;
    column-gap: 20px;
    border: 1px solid var(--gray-3);
}

.choices-item .item-letter {
    width: 10px;
    height: 10px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--gray-3);
    border-radius: 50%;
}

.choices-item-hover {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 0.5rem;
    column-gap: 20px;
    color: var(--blue-1);
    background-color: var(--blue-2);
    border: 1px solid var(--blue-1);
    cursor: pointer;
}

.choices-item-hover .item-letter {
    width: 10px;
    height: 10px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: var(--blue-1);
    border: 1px solid var(--blue-1);
    border-radius: 50%;
}
</style>
