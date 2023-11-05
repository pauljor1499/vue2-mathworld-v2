<template>
    <div class="answer-assignment" v-if="get_assignment !== ''">
        <YesNoOption v-if="yes_no_option.status" @clickNo="yes_no_option.status = false" @clickYes="clickYes()" :dialog_prop="this.yes_no_option" />
        <YesNoWarning
            v-if="yes_no_warning.status"
            @clickNo="yes_no_warning.status = false"
            @clickYes="clickYes()"
            :dialog_prop="this.yes_no_warning"
        />
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
                                {{ get_assignment.questions[current_question].points + " Points " }}
                            </span>
                            <span style="color: var(--blue-1)">
                                Question <b>{{ current_question + 1 }}</b> of
                                {{ get_assignment.questions.length }}
                            </span>
                            <v-btn color="error" small rounded :outlined="!get_question_flag()" @click="set_flag()">
                                <v-icon dense left> mdi-flag </v-icon>
                                Flag
                            </v-btn>
                        </div>
                    </v-card-title>
                    <v-divider />
                    <MultipleChoice
                        v-if="get_assignment.questions[current_question].type == 'multiple-choice'"
                        :current_question="get_assignment.questions[current_question]"
                        :question_number="current_question"
                    />
                    <OpenResponse
                        v-if="get_assignment.questions[current_question].type == 'open-response'"
                        :current_question="get_assignment.questions[current_question]"
                        :question_number="current_question"
                    />
                    <Checkbox
                        v-if="get_assignment.questions[current_question].type == 'checkbox'"
                        :current_question="get_assignment.questions[current_question]"
                        :question_number="current_question"
                    />
                    <DragDrop
                        v-if="get_assignment.questions[current_question].type == 'drag-and-drop'"
                        :current_question="get_assignment.questions[current_question]"
                        :question_number="current_question"
                    />
                    <RangeType
                        v-if="get_assignment.questions[current_question].type == 'range-type'"
                        :current_question="get_assignment.questions[current_question]"
                        :question_number="current_question"
                    />
                    <GraphType
                        v-if="get_assignment.questions[current_question].type == 'graph-type'"
                        :current_question="get_assignment.questions[current_question]"
                        :question_number="current_question"
                    />
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
                <v-btn color="primary" outlined large>
                    <v-icon left dense> mdi-calculator </v-icon>
                    Calculator
                </v-btn>
                <v-card>
                    <v-card-subtitle class="answered-items-title">
                        <span> Answers </span>
                        <span>
                            {{ get_total_answers + "/" + get_assignment.questions.length }}
                        </span>
                    </v-card-subtitle>
                    <v-divider />
                    <v-card-text class="question-cards">
                        <v-card
                            flat
                            v-for="(question, index) in get_assignment.questions"
                            :key="index"
                            style="cursor: pointer"
                            @click="jumpQuestion(index)"
                        >
                            <div
                                :class="{
                                    'question-card-gray': question.flag === false && my_answers[index].status == false,
                                    'question-card-ribbon': question.flag === true,
                                    'question-card-blue': question.flag === false && my_answers[index].status == true,
                                    'question-card-hover': index == item_hover || index == current_question,
                                }"
                                @mouseover="hoverAnswer(index)"
                                @mouseleave="unhoverAnswer()"
                            >
                                <div class="card-number">
                                    <div class="number-label">
                                        {{ index + 1 }}
                                    </div>
                                    <v-divider vertical />
                                </div>
                                <div class="card-answer">
                                    <v-tooltip bottom max-width="400">
                                        <template v-slot:activator="{ on, attrs }">
                                            <span v-if="my_answers[index].type == 'multiple-choice'">
                                                {{ filter_answer(my_answers[index].answer.letter) }}
                                            </span>
                                            <span
                                                v-bind="attrs"
                                                v-on="my_answers[index].answer.length > 20 ? on : ''"
                                                v-if="my_answers[index].type == 'open-response'"
                                            >
                                                {{ filter_answer(my_answers[index].answer) }}
                                            </span>
                                            <span
                                                v-bind="attrs"
                                                v-on="my_answers[index].answer.toString().length > 20 ? on : ''"
                                                v-if="my_answers[index].type == 'checkbox'"
                                            >
                                                {{ filter_answer(my_answers[index].answer.join(", ")) }}
                                            </span>
                                            <span
                                                v-bind="attrs"
                                                v-on="my_answers[index].answer.toString().length > 20 ? on : ''"
                                                v-if="my_answers[index].type == 'drag-and-drop'"
                                            >
                                                {{ filter_answer(my_answers[index].answer.join(", ")) }}
                                            </span>
                                            <span
                                                v-bind="attrs"
                                                v-on="my_answers[index].answer.toString().length > 20 ? on : ''"
                                                v-if="my_answers[index].type == 'range-type'"
                                            >
                                                {{ filter_answer(my_answers[index].answer.join(", ")) }}
                                            </span>
                                            <span
                                                v-bind="attrs"
                                                v-on="my_answers[index].answer.toString().length > 20 ? on : ''"
                                                v-if="my_answers[index].type == 'graph-type'"
                                            >
                                                {{ filter_answer(my_answers[index].answer.join(", ")) }}
                                            </span>
                                        </template>
                                        <span v-if="my_answers[index].type == 'open-response'">
                                            {{ my_answers[index].answer }}
                                        </span>
                                        <span v-if="my_answers[index].type == 'checkbox'">
                                            {{ my_answers[index].answer.join(", ") }}
                                        </span>
                                        <span v-if="my_answers[index].type == 'drag-and-drop'">
                                            {{ my_answers[index].answer.join(", ") }}
                                        </span>
                                        <span v-if="my_answers[index].type == 'graph-type'">
                                            {{ my_answers[index].answer.join(", ") }}
                                        </span>
                                    </v-tooltip>
                                </div>
                                <div class="custom-ribbon">
                                    <v-icon x-small color="error" v-if="question.flag === true"> mdi-circle </v-icon>
                                </div>
                            </div>
                        </v-card>
                    </v-card-text>
                    <v-divider />
                    <v-card-actions>
                        <v-btn
                            :color="get_total_answers == get_assignment.questions.length ? 'primary' : 'error'"
                            width="100%"
                            @click="clickSubmit()"
                        >
                            Submit Answers
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import { AnswersService } from "@/api/Student/assignments/AnswersService";
import { AssignmentService } from "@/api/Student/assignments/AssignmentService.js";
import YesNoOption from "@/components/Commons/popup_dialogs/YesNoOption.vue";
import YesNoWarning from "@/components/Commons/popup_dialogs/YesNoWarning.vue";
import MultipleChoice from "./question_types/multiple_choice/MultipleChoice.vue";
import OpenResponse from "./question_types/open_response/OpenResponse.vue";
import Checkbox from "./question_types/checkbox/Checkbox.vue";
import DragDrop from "./question_types/drag_and_drop/DragDrop.vue";
import RangeType from "./question_types/range/RangeType.vue";
import GraphType from "./question_types/graph/Graph.vue";

export default {
    components: {
        YesNoOption,
        YesNoWarning,
        MultipleChoice,
        OpenResponse,
        Checkbox,
        DragDrop,
        RangeType,
        GraphType,
    },

    data() {
        return {
            class_title: "",
            assignment_title: "",

            current_question: 0,
            current_flag: "",

            get_assignment: AssignmentService.prototype.get_assignment(this.class_title, this.assignment_title),

            my_answers: {},

            item_hover: null,

            yes_no_option: {
                status: false,
                title: "Submit Answers",
                message: "",
            },

            yes_no_warning: {
                status: false,
                title: "Submit Answers",
                message: "",
            },
        };
    },

    computed: {
        get_total_answers() {
            var total_answers = 0;
            Object.keys(this.my_answers).forEach((key) => {
                if (this.my_answers[key].status == true) {
                    total_answers++;
                }
            });
            return total_answers;
        },
    },

    methods: {
        clickSubmit() {
            this.show_dialog();
        },

        show_dialog() {
            if (this.get_total_answers !== this.get_assignment.questions.length) {
                this.yes_no_warning.status = true;
                var total_no_answers = this.get_assignment.questions.length - this.get_total_answers;

                if (total_no_answers > 1) {
                    this.yes_no_warning.message = "There are " + total_no_answers + " unanswered questions, do you want to submit all answers?";
                } else {
                    this.yes_no_warning.message = "There is " + total_no_answers + " unanswered question, do you want to submit all answers?";
                }
            } else {
                this.yes_no_option.status = true;
                this.yes_no_option.message = "Do you want to submit all answers?";
            }
        },

        clickYes() {
            this.yes_no_option.status = false;
            this.yes_no_warning.status = false;
            this.$router.push({
                name: "StudentClassSelected",
                params: {
                    classTitle: this.class_title,
                },
            });
        },

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

        get_question_flag() {
            this.current_flag = this.get_assignment.questions[this.current_question].flag;
            return this.current_flag;
        },

        set_flag() {
            this.get_assignment.questions[this.current_question].flag = !this.get_assignment.questions[this.current_question].flag;
            this.current_flag = this.get_assignment.questions[this.current_question].flag;
        },

        check_question_answer(index) {
            var answer = false;
            Object.keys(this.my_answers).forEach((key) => {
                if (key == index) {
                    answer = true;
                }
            });
            return answer;
        },

        filter_answer(answer) {
            if (answer !== undefined) {
                if (answer.length > 25) {
                    var result = answer.substring(0, 20);
                    return result + "...";
                }
                return answer;
            } else {
                return "";
            }
        },

        answer_list_model() {
            var answer_list = {};
            var questions = this.get_assignment.questions;
            for (var i = 0; i < questions.length; i++) {
                if (questions[i].type == "multiple-choice") {
                    answer_list[i] = {
                        type: "multiple-choice",
                        status: false,
                        answer: {
                            letter: "",
                            description: "",
                        },
                    };
                } else if (questions[i].type == "open-response") {
                    answer_list[i] = {
                        type: "open-response",
                        status: false,
                        answer: "",
                    };
                } else if (questions[i].type == "checkbox") {
                    answer_list[i] = {
                        type: "checkbox",
                        status: false,
                        answer: [],
                    };
                } else if (questions[i].type == "drag-and-drop") {
                    answer_list[i] = {
                        type: "drag-and-drop",
                        status: false,
                        answer: [],
                    };
                } else if (questions[i].type == "range-type") {
                    answer_list[i] = {
                        type: "range-type",
                        status: false,
                        answer: [],
                    };
                } else if (questions[i].type == "graph-type") {
                    answer_list[i] = {
                        type: "graph-type",
                        status: false,
                        answer: [],
                    };
                }
            }
            this.my_answers = JSON.parse(JSON.stringify(answer_list));
            AnswersService.prototype.set_answers(this.my_answers);
        },

        hoverAnswer(index) {
            this.item_hover = index;
        },

        unhoverAnswer() {
            this.item_hover = null;
        },
    },

    created() {
        this.class_title = this.$route.params.classTitle;
        this.assignment_title = this.$route.params.assignmentTitle;
        this.answer_list_model();
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
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    overflow: auto;
    /* overflow-y: auto; */
}

.card-number {
    display: flex;
    padding: 0 10px;
    column-gap: 10px;
}

.number-label {
    margin: auto;
    opacity: 50%;
}

.question-card-gray {
    width: 100%;
    padding: 5px;
    font-size: 0.8rem;
    display: flex;
    border-radius: 10%;
    border: 1px solid var(--gray-3);
}

.question-card-blue {
    width: 100%;
    padding: 5px;
    font-size: 0.8rem;
    display: flex;
    border-radius: 10%;
    color: black;
    border: 1px solid var(--gray-3);
    /* border: 1px solid var(--blue-1); */
    /* background-color: var(--blue-2); */
}

.question-card-ribbon {
    width: 100%;
    padding: 5px;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--gray-3);
}

.custom-ribbon {
    padding: 0 5px;
}

.card-answer {
    width: 100%;
    font-size: 0.8rem;
    text-align: start;
}

.question-card-hover {
    width: 100%;
    padding: 5px;
    font-size: 0.8rem;
    display: flex;
    border-radius: 10%;
    color: var(--blue-1);
    border: 1px solid var(--blue-1);
    background-color: var(--blue-2);
}
</style>
