<template>
    <v-card-text class="question-body">
        <div class="question">
            <span style="color: black; font-size: 1.2rem">
                {{ current_question.question }}
            </span>
        </div>
        <br />
        <br />
        <div class="list-title">
            <span> Choices </span>
            <span> Answers </span>
        </div>
        <div class="drag-and-drop">
            <draggable class="list-items" :list="list1" group="my-group">
                <div class="item" v-for="item in list1" :key="item">
                    {{ item }}
                </div>
            </draggable>
            <draggable class="list-items" :list="list2" group="my-group">
                <div class="item" v-for="item in list2" :key="item">
                    {{ item }}
                </div>
            </draggable>
        </div>
        <br />
        <v-card-actions>
            <v-btn text small color="error" @click="removeAnswer()"> Remove answer </v-btn>
        </v-card-actions>
    </v-card-text>
</template>
<script>
import { AnswersService } from "@/api/Student/assignments/AnswersService.js";
import draggable from "vuedraggable";

export default {
    props: {
        current_question: Object,
        question_number: Number,
    },

    components: {
        draggable,
    },

    data() {
        return {
            my_answers: AnswersService.prototype.get_answers(),
            list1: [],
            list2: [],
        };
    },

    watch: {
        list2() {
            if (this.list2.length != 0) {
                this.select_answer();
            } else {
                AnswersService.prototype.remove_answer("drag-and-drop", this.question_number);
            }
        },
    },

    methods: {
        load_data() {
            var current_choices = this.current_question.choices;
            var my_answer = this.my_answers[this.question_number].answer;

            this.list1 = JSON.parse(JSON.stringify(current_choices));
            this.list2 = JSON.parse(JSON.stringify(my_answer));

            for (var i = 0; i < this.list2.length; i++) {
                var index = this.list1.findIndex((answer) => answer == this.list2[i]);
                this.list1.splice(index, 1);
            }
        },

        select_answer() {
            AnswersService.prototype.set_answer("drag-and-drop", this.question_number, this.list2);
        },

        removeAnswer() {
            this.list1 = JSON.parse(JSON.stringify(this.current_question.choices));
            this.list2 = [];
        },
    },

    created() {
        this.load_data();
    },
};
</script>

<style scoped>
.list-title {
    display: flex;
}

.list-title span {
    flex: 1;
}

.drag-and-drop {
    display: flex;
    column-gap: 10px;
}

.list-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    border: 1px solid var(--blue-1);
    background: var(--blue-2);
    padding: 2%;
    color: #fff;
    display: flex;
    flex-direction: column;
}

.item {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    background: var(--blue-1);
}
</style>
