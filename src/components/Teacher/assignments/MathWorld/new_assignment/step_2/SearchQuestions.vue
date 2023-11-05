<template>
    <div>
        <SuccessSnackbar :text="success_snackbar.message" v-if="success_snackbar.status" @closeSnackbar="success_snackbar.status = false" />
        <v-alert text dense outlined type="error" v-show="has_error"> Please add one or more questions to proceed on next step </v-alert>
        <div class="tab-content">
            <div class="item-filter">
                <br />
                <br />
                <span>Filters</span>
                <div class="item-fields">
                    <br />
                    <v-select v-model="filter.type" :items="question_types" outlined filled label="Response Type" solo flat clearable hide-details />
                    <!-- <v-autocomplete
                        v-model="filter.algebra_term"
                        :items="algebra_terms"
                        outlined
                        filled
                        label="Algrebra Terms"
                        solo
                        flat
                        clearable
                        hide-details
                        disabled
                    /> -->
                    <v-select
                        v-model="filter.difficulty"
                        :items="difficulties"
                        outlined
                        filled
                        label="Level of Difficulty"
                        solo
                        flat
                        clearable
                        hide-details
                    />
                    <v-select
                        v-model="filter.grade_level"
                        :items="grade_level"
                        outlined
                        filled
                        label="Grade Level"
                        solo
                        flat
                        clearable
                        hide-details
                    />
                    <v-select v-model="filter.points" :items="grade_weight" outlined filled label="Weights" solo flat clearable hide-details />
                    <v-select v-model="filter.category" :items="category_options" outlined filled label="Category" solo flat clearable hide-details />
                    <v-text-field v-model="filter.teks" outlined filled label="TEKS" hide-spin-buttons solo flat clearable hide-details />
                    <v-text-field v-model="filter.topic" outlined filled label="Topic" solo flat clearable hide-details />
                    <v-btn width="100%" large outlined color="primary" @click="clearFilter()"> Clear All </v-btn>
                </div>
            </div>
            <div class="item-list">
                <br />
                <div class="list-header">
                    <div class="page-content">
                        <span> Page </span>
                        <v-col cols="4">
                            <v-autocomplete v-model="page" :items="pageNumber" dense outlined filled solo flat hide-details />
                        </v-col>
                        <span> Entries </span>
                        <v-col cols="4">
                            <v-autocomplete v-model="entry" :items="entry_options" dense outlined filled solo flat hide-details />
                        </v-col>
                    </div>
                    <div class="page-content">
                        <span>Total questions ({{ teacher_questions_data.total_results }})</span>
                    </div>
                </div>
                <div style="font-size: 1.3rem">{{ "Results (" + showAllQuestions.length + ")" }}</div>
                <br />
                <div class="question-list">
                    <v-card hover outlined v-for="(item, index) in showAllQuestions" :key="index">
                        <div class="list-content">
                            <v-card-title class="question-title">
                                <span style="font-size: 0.7em">{{ "TEKS " + item.metadata.teks_code }}</span>
                                <div>
                                    <v-icon small color="#FDCF2E"> mdi-star </v-icon>
                                    <span style="font-size: 0.7em">
                                        {{ item.metadata.points + " Points" }}
                                    </span>
                                </div>
                            </v-card-title>
                            <v-divider />
                            <v-card-text>
                                <!-- <v-col cols="12" v-if="item.type == 'multiple-choice'">
                                    <MultipleChoice :question_item="item" />
                                </v-col> -->
                                <v-col cols="12" v-if="item.response_type == 'Open Response Exact'">
                                    <OpenResponse style="font-size: 1.2em; font-weight: bold" :question="item.question_content" />
                                </v-col>
                                <v-col cols="12" v-if="item.response_type == 'Checkbox'">
                                    <Checkbox
                                        style="font-size: 1.2em; font-weight: bold"
                                        :question_content="item.question_content"
                                        :question_options="item.options"
                                    />
                                </v-col>
                                <!-- <v-col cols="12" v-if="item.type == 'range-type'">
                                    <RangeType :question_item="item" />
                                </v-col>
                                <v-col cols="12" v-if="item.type == 'drag-and-drop'">
                                    <DragDrop :question_item="item" />
                                </v-col>
                                <v-col cols="12" v-if="item.type == 'graph-type'">
                                    <GraphType :question_item="item" />
                                </v-col> -->
                                <v-card-actions class="question-actions">
                                    <div class="question-chips">
                                        <v-chip small v-show="item.response_type != ''">
                                            {{ item.response_type }}
                                        </v-chip>
                                        <v-chip small v-show="item.question_type != ''">
                                            {{ item.question_type }}
                                        </v-chip>
                                        <v-chip small v-show="item.metadata.teks_code != ''">
                                            {{ item.metadata.teks_code }}
                                        </v-chip>
                                        <v-chip small v-show="item.grade_level != ''">
                                            {{ "Grade " + item.metadata.grade_level }}
                                        </v-chip>
                                        <v-chip small v-show="item.metadata.category != ''">
                                            {{ item.metadata.category }}
                                        </v-chip>
                                        <v-chip
                                            small
                                            v-show="item.metadata.keywords != ''"
                                            v-for="(item2, index) in item.metadata.keywords"
                                            :key="'a' + index"
                                        >
                                            {{ item2 }}
                                        </v-chip>
                                        <v-chip
                                            small
                                            v-show="item.metadata.student_expectations != ''"
                                            v-for="(item3, index) in item.metadata.student_expectations"
                                            :key="'b' + index"
                                        >
                                            {{ item3 }}
                                        </v-chip>
                                        <v-chip small v-show="item.metadata.subject != ''">
                                            {{ item.metadata.subject }}
                                        </v-chip>
                                        <v-chip small v-show="item.metadata.topic != ''">
                                            {{ "topic " + item.metadata.topic }}
                                        </v-chip>
                                        <v-chip small v-show="item.metadata.difficulty != ''">
                                            {{ item.metadata.difficulty }}
                                        </v-chip>
                                        <!-- <v-chip small v-show="item.algebra_term != ''">
                                            {{ item.algebra_term }}
                                        </v-chip>
                                        <v-chip small v-show="item.unit != ''">
                                            {{ item.unit }}
                                        </v-chip>--->
                                    </div>
                                    <v-btn color="primary" width="120" @click="addQuestion(index, item)"> <v-icon>mdi-plus</v-icon> Add </v-btn>
                                </v-card-actions>
                            </v-card-text>
                        </div>
                    </v-card>
                </div>
            </div>
        </div>
        <div class="tab-content">
            <div class="content-left"></div>
            <div class="content-right">
                <v-container style="width: 75%">
                    <v-pagination v-model="page" :length="this.totalPages" circle></v-pagination>
                </v-container>
            </div>
        </div>
    </div>
</template>

<script>
import { TeacherQuestionsData } from "@/store/Teacher/TeacherQuestionsData";
import SuccessSnackbar from "@/components/Commons/snackbars/Success.vue";
import MultipleChoice from "@/components/Teacher/assignments/question_types/multiple_choice/MultipleChoice.vue";
import OpenResponse from "@/components/Teacher/assignments/question_types/open_response/OpenResponse.vue";
import Checkbox from "@/components/Teacher/assignments/question_types/checkbox/Checkbox.vue";
import RangeType from "@/components/Teacher/assignments/question_types/range/RangeType.vue";
import DragDrop from "@/components/Teacher/assignments/question_types/drag_and_drop/DragDrop.vue";
import GraphType from "@/components/Teacher/assignments/question_types/graph/Graph.vue";

export default {
    components: {
        MultipleChoice,
        SuccessSnackbar,
        OpenResponse,
        Checkbox,
        RangeType,
        DragDrop,
        GraphType,
    },

    props: {
        has_error: Boolean,
        pageSize: Number,
        totalPages: Number,
        currentPage: Number,
        totalResults: Number,
    },

    data() {
        return {
            teacher_questions_data: TeacherQuestionsData(),

            success_snackbar: {
                status: false,
                message: "",
            },

            filter: {
                type: null,
                algebra_term: null,
                points: null,
                category: null,
                difficulty: null,
                teks: null,
                grade_level: null,
                topic: null,
            },

            //pagination
            page: 1,
            listCount: 0,
            historyList: [], //final result

            entry: 10,

            grade_level: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            entry_options: [1, 3, 5, 10, 15, 20],
            grade_weight: [1, 2, 3],
            category_options: [1, 2, 3, 4, 5],
            difficulties: ["Easy", "Average", "Hard", "Advance"],
            teks: ["TEKS 1", "TEKS 2", "TEKS 3"],
            question_types: ["Multiple Choice", "Open Response Exact", "Range Open Response", "Checkbox" /*"Random Items", "Random Answers"*/],
            algebra_terms: ["Monomial", "Polynomial", "Binomial", "Trinomial", "Multinomial"],
        };
    },

    computed: {
        all_questions() {
            return this.teacher_questions_data.questions;
        },

        pageNumber() {
            var results = [];
            for (let index = 1; index <= this.totalPages; index++) {
                results.push(index);
            }
            return results;
        },

        showAllQuestions() {
            return this.historyList;
        },
    },

    watch: {
        //If textfield is empty, set to null
        "filter.type"() {
            if (this.filter.type == "" || this.filter.type == null) {
                this.filter.type = null;
                this.teacher_questions_data.response_type = "";
            } else {
                this.teacher_questions_data.response_type = "&response_type=" + this.filter.type;
            }
            this.teacher_questions_data.fetch_mathworld_questions();
        },
        "filter.difficulty"() {
            if (this.filter.difficulty == "" || this.filter.difficulty == null) {
                this.filter.difficulty = null;
                this.teacher_questions_data.difficulty = "";
            } else {
                this.teacher_questions_data.difficulty = "&difficulty=" + this.filter.difficulty;
            }
            this.teacher_questions_data.fetch_mathworld_questions();
        },
        "filter.category"() {
            if (this.filter.category == "" || this.filter.category == null) {
                this.filter.category = null;
                this.teacher_questions_data.category = "";
            } else {
                this.teacher_questions_data.category = "&category=" + this.filter.category;
            }
            this.teacher_questions_data.fetch_mathworld_questions();
        },
        "filter.teks"() {
            if (this.filter.teks == "" || this.filter.teks == null) {
                this.filter.teks = null;
                this.teacher_questions_data.teks_code = "";
                this.teacher_questions_data.fetch_mathworld_questions();
            } else {
                this.teacher_questions_data.teks_code = "&teks_code=" + this.filter.teks;
                this.teacher_questions_data.fetch_mathworld_questions();
            }
        },
        "filter.topic"() {
            if (this.filter.topic == "" || this.filter.topic == null) {
                this.filter.topic = null;
                this.teacher_questions_data.topic = "";
                this.teacher_questions_data.fetch_mathworld_questions();
            } else {
                this.teacher_questions_data.topic = "&topic=" + this.filter.topic;
                this.teacher_questions_data.fetch_mathworld_questions();
            }
        },

        all_questions() {
            this.initPage();
        },

        page(pageIndex) {
            if (pageIndex != null || pageIndex != "") {
                this.page = pageIndex;
                this.teacher_questions_data.current_page = this.page;
                this.teacher_questions_data.fetch_mathworld_questions();
            }
        },

        entry(pageIndex) {
            if (pageIndex != null) {
                this.teacher_questions_data.current_page = this.page;
                this.teacher_questions_data.page_size = pageIndex;
                this.teacher_questions_data.fetch_mathworld_questions();
                this.initPage();
            }
        },
    },

    methods: {
        showSuccessMessage(message) {
            this.success_snackbar.status = true;
            this.success_snackbar.message = message;
        },

        clearFilter() {
            Object.keys(this.filter).forEach((key) => {
                this.filter[key] = null;
            });
        },

        addQuestion(index, item) {
            this.all_questions.splice(index, 1);
            this.$emit("add_question", item);
            this.showSuccessMessage("Question has been added");
        },

        //Update page array data
        initPage() {
            this.listCount = this.all_questions.length;
            if (this.listCount < this.pageSize) {
                this.historyList = this.all_questions;
            } else {
                this.historyList = this.all_questions.slice(0, this.pageSize);
            }
        },
    },

    created() {
        this.initPage();
    },
};
</script>

<style scoped>
span {
    font-size: 1rem;
}

.tab-content {
    display: flex;
    gap: 50px;
}

.tab-content .item-filter {
    flex: 1;
}

.item-fields {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
}

.tab-content .item-list {
    flex: 2;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.question-list {
    width: 100%;
    padding: 10px;
    border: 1px solid #d4d4d4;
    background-color: #fafafa;

    display: flex;
    flex-direction: column;
    row-gap: 15px;
}

.list-content {
    border: 1px solid var(--blue-1);
}

.question-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.question-actions {
    display: flex;
    column-gap: 20px;
    justify-content: space-between;
}

.question-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.v-combobox {
    padding: 10px;
}

.content-left {
    flex: 1;
}

.content-right {
    flex: 2;
}

.page-content {
    display: flex;
    align-items: center;
    white-space: nowrap;
}

.list-header {
    display: flex;
    justify-content: space-between;
}
</style>
