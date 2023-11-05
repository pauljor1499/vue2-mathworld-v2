<template>
    <div class="answer-assignment" v-if="get_assignment !== ''">
        <YesNoWarning v-if="dialog.status" @clickNo="dialog.status = false" @clickYes="clickYes()" :dialog_prop="this.dialog" />
        <div class="content-header">
            <div class="header-item">
                <div class="class-title">
                    <span class="item-title"> {{ get_assignment.title }} </span>
                    <span class="item-subtitle">
                        {{ get_assignment.description }}
                    </span>
                </div>
                <div class="class-sched">
                    <div class="class-sched-item">
                        <span> School Year: 2022-2023 </span>
                        <span> Fall </span>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <br />
        <div class="content-body">
            <div class="question-content">
                <v-card>
                    <v-card-title>
                        <div class="question-title">
                            <span>
                                <v-icon dense left color="#FDCF2E"> mdi-star </v-icon>
                                {{ get_assignment.questions[current_question].points + " Points" }}
                            </span>
                            <span style="color: var(--blue-1)">
                                Question <b>{{ current_question + 1 }}</b> of
                                <b>{{ get_assignment.questions.length }}</b>
                            </span>
                            <v-btn color="error" small rounded :outlined="!get_question_flag()" @click="set_flag()">
                                <v-icon dense left> mdi-flag </v-icon>
                                Flag
                            </v-btn>
                        </div>
                    </v-card-title>
                    <v-divider />
                    <v-card-text class="question-body">
                        <div class="question">
                            <span style="color: black">
                                {{ get_assignment.questions[current_question].question }}
                            </span>
                        </div>
                        <br />
                        <br />
                        <div class="choices">
                            <div
                                v-for="(choice, index) in get_assignment.questions[current_question].choices"
                                :key="index"
                                :class="{
                                    'choices-item': true,
                                    'choices-item-red':
                                        (choice.id === get_test_answer() && choice.id !== get_student_answer()) ||
                                        choice.id === get_student_answer() ||
                                        get_student_answer() === '',
                                    'choices-item-green':
                                        (choice.id === get_test_answer() && choice.id === get_student_answer()) || choice.id === get_test_answer(),
                                }"
                            >
                                <div class="item-letter">
                                    {{ choices[index] }}
                                </div>
                                <div class="item-description">
                                    {{ choice.description }}
                                </div>
                            </div>
                        </div>
                        <br />
                    </v-card-text>
                </v-card>
                <br />
                <br />
                <div class="question-actions">
                    <v-btn v-if="current_question != 0" color="primary" outlined width="150" @click="click_previous_question()"> Previous </v-btn>
                    <v-spacer />
                    <v-btn
                        v-if="this.current_question != this.get_assignment.questions.length - 1"
                        color="primary"
                        width="150"
                        @click="click_next_question()"
                    >
                        Next
                    </v-btn>
                </div>
            </div>
            <div class="right-content">
                <v-card>
                    <v-card-subtitle>
                        <span>
                            Total score:
                            <b>{{ get_total_score() + " points" }}</b>
                        </span>
                    </v-card-subtitle>
                </v-card>
                <v-btn color="primary" outlined large>
                    <v-icon left dense> mdi-calculator </v-icon>
                    Calculator
                </v-btn>
                <v-card>
                    <v-card-subtitle class="answered-items-title">
                        <span> Answered Items </span>
                        <span>
                            {{ get_answered_questions() + "/" + get_assignment.questions.length }}
                        </span>
                    </v-card-subtitle>
                    <v-divider />
                    <v-card-text class="question-cards">
                        <v-card
                            hover
                            v-for="(question, index) in get_assignment.questions"
                            :key="index"
                            style="cursor: pointer"
                            @click="jumpQuestion(index)"
                        >
                            <div class="question-card-ribbon" v-if="question.flag === true">
                                {{ index + 1 }}
                                <div class="custom-ribbon"></div>
                            </div>
                            <div
                                class="question-card-correct"
                                v-else-if="question.flag === false && question.answer.student.id === question.answer.test.id"
                            >
                                {{ index + 1 }}
                            </div>
                            <div class="question-card-wrong" v-else>
                                {{ index + 1 }}
                            </div>
                        </v-card>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import { AssignmentService } from "@/api/Student/assignments/AssignmentService.js";
import YesNoWarning from "@/components/Commons/popup_dialogs/YesNoWarning.vue";

export default {
    components: {
        YesNoWarning,
    },

    data() {
        return {
            class_title: "",
            assignment_title: "",

            current_question: 0,
            current_flag: "",

            choices: ["A", "B", "C", "D"],

            dialog: {
                status: false,
                title: "Answer Assignment",
                message: "",
            },
        };
    },

    computed: {
        get_assignment() {
            return AssignmentService.prototype.get_assignment(this.class_title, this.assignment_title);
        },
    },

    methods: {
        click_next_question() {
            if (this.current_question != this.get_assignment.questions.length - 1) {
                this.current_question++;
            }
        },

        click_previous_question() {
            if (this.current_question != 0) {
                this.current_question--;
            }
        },

        jumpQuestion(question_number) {
            this.current_question = question_number;
        },

        get_answered_questions() {
            var total = 0;
            this.get_assignment.questions.forEach((question) => {
                if (question.answer.student !== "") {
                    total += 1;
                }
            });
            return total;
        },

        get_question_flag() {
            this.current_flag = this.get_assignment.questions[this.current_question].flag;
            return this.current_flag;
        },

        set_flag() {
            this.get_assignment.questions[this.current_question].flag = !this.get_assignment.questions[this.current_question].flag;
            this.current_flag = this.get_assignment.questions[this.current_question].flag;
        },

        get_total_score() {
            var score = 0;
            this.get_assignment.questions.forEach((question) => {
                if (question.answer.student !== "") if (question.answer.student.id === question.answer.test.id) score += question.points;
            });
            return score;
        },

        get_student_answer() {
            var answer = 0;
            if (this.get_assignment.questions[this.current_question].answer.student !== "") {
                answer = this.get_assignment.questions[this.current_question].answer.student.id;
            } else {
                answer = "";
            }
            return answer;
        },

        get_test_answer() {
            return this.get_assignment.questions[this.current_question].answer.test.id;
        },
    },

    created() {
        this.class_title = this.$route.params.classTitle;
        this.assignment_title = this.$route.params.assignmentTitle;
    },
};
</script>

<style scoped>
* {
    text-transform: none;
}

.answer-assignment {
    width: 100%;
}

.content-header {
    width: 100%;
    display: flex;
    padding: 40px 5%;
    background-color: var(--blue-1);
}

.header-item {
    width: 100%;
    display: flex;
}

.class-title {
    flex: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    line-height: 1;
    row-gap: 10px;
}

.item-title {
    font-size: 1.4rem;
    color: var(--white-1);
    flex-wrap: wrap;
}

.item-subtitle {
    color: var(--gray-1);
}

.class-sched-item {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    color: var(--white-1);
}

.content-body {
    width: 100%;
    padding: 0% 5%;
    margin-bottom: 100px;
    display: flex;
    column-gap: 50px;
}

.question-content {
    width: 100%;
}

.question-body {
    padding: 5%;
}

.question-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
}

.question {
    width: 100%;
    font-size: 1rem;
    text-justify: inter-word;
}

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

.choices-item-red {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 0.5rem;
    column-gap: 20px;
    color: red;
    background-color: rgb(255, 239, 239);
    border: 1px solid red;
}

.choices-item-red .item-letter {
    width: 10px;
    height: 10px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: red;
    border: 1px solid red;
    border-radius: 50%;
}

.choices-item-green {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 0.5rem;
    column-gap: 20px;
    color: green;
    background-color: rgb(231, 255, 239);
    border: 1px solid green;
}

.choices-item-green .item-letter {
    width: 10px;
    height: 10px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: green;
    border: 1px solid green;
    border-radius: 50%;
}

.question-actions {
    display: flex;
    justify-content: space-between;
}

.right-content {
    width: 30%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.answered-items-title {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
}

.question-cards {
    max-height: 365px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
    overflow-y: auto;
}

.question-card-wrong {
    width: 100%;
    height: auto;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10%;
    color: red;
    border: 1px solid red;
    background-color: rgb(255, 203, 203);
}

.question-card-correct {
    width: 100%;
    height: auto;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10%;
    color: green;
    border: 1px solid green;
    background-color: rgb(212, 255, 212);
}

.question-card-ribbon {
    width: 100%;
    height: auto;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10%;
    color: red;
    border: 1px solid red;
    position: relative;
    overflow: hidden;
}

.question-card-ribbon .custom-ribbon {
    width: 100%;
    height: 50%;
    top: -8px;
    right: -10px;
    background-color: red;
    transform: rotate(45deg);
    position: absolute;
}
</style>
