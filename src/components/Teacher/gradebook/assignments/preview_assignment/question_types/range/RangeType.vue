<template>
    <v-card-text class="question-body">
        <div class="question">
            <span style="color: black; font-size: 1.2rem">
                {{ current_question.question }}
            </span>
        </div>
        <br />
        <br />
        <br />
        <br />
        <v-range-slider v-model="range" :max="max" :min="min" hide-details @change="set_answer()" class="align-center">
            <template v-slot:prepend>
                <v-text-field
                    :value="range[0]"
                    :max="max"
                    :min="min"
                    label="Min"
                    class="mt-0 pt-0"
                    hide-details
                    type="number"
                    outlined
                    @change="$set(range, 0, $event)"
                />
            </template>
            <template v-slot:append>
                <v-text-field
                    :value="range[1]"
                    :max="max"
                    :min="min"
                    label="Max"
                    class="mt-0 pt-0"
                    hide-details
                    type="number"
                    outlined
                    @change="$set(range, 1, $event)"
                />
            </template>
        </v-range-slider>
        <br />
        <br />
        <v-card-actions>
            <v-btn text small color="error" @click="remove_answer()"> Remove Answer </v-btn>
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
            min: 0,
            max: 0,
            range: [0, 0],
        };
    },

    methods: {
        load_data() {
            var answer = this.my_answers[this.question_number].answer;
            this.min = this.current_question.choices.min;
            this.max = this.current_question.choices.max;
            if (answer.length != 0) {
                this.range = JSON.parse(JSON.stringify(answer));
            } else {
                this.range = [this.min, this.max];
            }
        },

        set_answer() {
            AnswersService.prototype.set_answer("range-type", this.question_number, this.range);
        },

        remove_answer() {
            this.range = [this.min, this.max];
            AnswersService.prototype.remove_answer("range-type", this.question_number);
        },
    },

    created() {
        this.load_data();
    },
};
</script>
