<template>
    <div>
        <YesNoWarning v-if="dialog.status" @clickNo="dialog.status = false" @clickYes="removeQuestion()" :dialog_prop="dialog" />
        <ErrorSnackbar :text="error_snackbar.message" v-if="error_snackbar.status" @closeSnackbar="error_snackbar.status = false" />
        <div class="tab-content">
            <div class="item-filter"></div>
            <div class="item-list">
                <div>Showing results ({{ selected_questions.length }})</div>
                <br />
                <div class="question-list">
                    <v-card hover outlined v-for="(item, index) in selected_questions" :key="index">
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
                                            {{ item.metadata.topic }}
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
                                    <v-btn color="error" width="120" @click="show_warning(index, item)"> <v-icon>mdi-delete</v-icon> Remove </v-btn>
                                </v-card-actions>
                            </v-card-text>
                        </div>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import YesNoWarning from "@/components/Commons/popup_dialogs/YesNoWarning.vue";
import ErrorSnackbar from "@/components/Commons/snackbars/Error.vue";
import MultipleChoice from "@/components/Teacher/assignments/question_types/multiple_choice/MultipleChoice.vue";
import OpenResponse from "@/components/Teacher/assignments/question_types/open_response/OpenResponse.vue";
import Checkbox from "@/components/Teacher/assignments/question_types/checkbox/Checkbox.vue";
import RangeType from "@/components/Teacher/assignments/question_types/range/RangeType.vue";
import DragDrop from "@/components/Teacher/assignments/question_types/drag_and_drop/DragDrop.vue";
import GraphType from "@/components/Teacher/assignments/question_types/graph/Graph.vue";

export default {
    components: {
        ErrorSnackbar,
        YesNoWarning,
        MultipleChoice,
        OpenResponse,
        Checkbox,
        RangeType,
        DragDrop,
        GraphType,
    },

    props: {
        selected_questions: Array,
    },

    data() {
        return {
            error_snackbar: {
                status: false,
                message: "",
            },

            dialog: {
                status: false,
                title: "Confirm remove question",
                message: "Do you want to remove this question?",
            },

            index: null,
            item: null,
        };
    },

    methods: {
        show_error_message(message) {
            this.error_snackbar.status = true;
            this.error_snackbar.message = message;
        },

        show_warning(index, item) {
            this.index = index;
            this.item = item;
            this.dialog.status = true;
        },

        removeQuestion() {
            this.selected_questions.splice(this.index, 1);
            this.$emit("remove_question", this.item);
            this.show_error_message("Question has been removed");
            this.dialog.status = false;
        },
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

.tab-content .item-list {
    flex: 2;

    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.question-list {
    width: 100%;
    min-height: 350px;
    padding: 10px;
    border: 1px solid #d4d4d4;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
}

.list-content {
    border: 1px solid var(--red-3);
}

.question-item {
    padding: 10px;
}

.question-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.question-actions {
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
}

.question-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}
</style>
