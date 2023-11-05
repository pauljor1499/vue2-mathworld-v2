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
            <v-checkbox
                v-model="selected"
                v-for="(item, index) in current_question.choices"
                :key="index"
                hide-details
                :label="item + ''"
                :value="item + ''"
            >
            </v-checkbox>
        </div>
        <br />
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
            my_answers: AnswersService.prototype.get_answers(),
            selected: [],
        };
    },

    watch: {
        selected() {
            if (this.selected.length != 0) {
                this.select_answer();
            } else {
                AnswersService.prototype.remove_answer("checkbox", this.question_number);
            }
        },
    },

    methods: {
        select_answer() {
            AnswersService.prototype.set_answer("checkbox", this.question_number, this.selected);
        },

        removeAnswer() {
            this.selected = [];
        },
    },

    created() {
        var my_answer = this.my_answers[this.question_number].answer;
        this.selected = JSON.parse(JSON.stringify(my_answer));
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
