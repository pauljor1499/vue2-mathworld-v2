<template>
    <div class="main-content">
        <div class="tab-content">
            <div class="item-filter"></div>
            <div class="item-list">
                <v-card-title> Showing results ({{ selected_questions.length }}) </v-card-title>
                <div class="question-list">
                    <v-card elevation="1" outlined class="question-item" v-for="(item, index) in selected_questions" :key="index">
                        <v-card-title>
                            <div class="question-title">
                                <div class="title-subject">
                                    <span>{{ "Question " + (index + 1) }}</span>
                                </div>
                                <div class="title-points">
                                    <span style="font-size: 0.7em">
                                        {{ item.points + " Points" }}
                                    </span>
                                </div>
                            </div>
                        </v-card-title>
                        <v-divider />
                        <v-col cols="12" v-if="item.type == 'multiple-choice'">
                            <MultipleChoice :question_item="item" />
                        </v-col>
                        <v-col cols="12" v-if="item.type == 'open-response'">
                            <OpenResponse :question_item="item" />
                        </v-col>
                        <v-col cols="12" v-if="item.type == 'checkbox'">
                            <Checkbox :question_item="item" />
                        </v-col>
                        <v-col cols="12" v-if="item.type == 'range-type'">
                            <RangeType :question_item="item" />
                        </v-col>
                        <v-col cols="12" v-if="item.type == 'drag-and-drop'">
                            <DragDrop :question_item="item" />
                        </v-col>
                        <v-col cols="12" v-if="item.type == 'graph-type'">
                            <GraphType :question_item="item" />
                        </v-col>
                        <v-card-actions class="question-actions">
                            <div class="question-chips">
                                <v-chip small v-show="item.type != ''">
                                    {{ item.type }}
                                </v-chip>
                                <v-chip small v-show="item.algebra_term != ''">
                                    {{ item.algebra_term }}
                                </v-chip>
                                <v-chip small v-show="item.unit != ''">
                                    {{ item.unit }}
                                </v-chip>
                                <v-chip small v-show="item.category != ''">
                                    {{ item.category }}
                                </v-chip>
                                <v-chip small v-show="item.difficulty != ''">
                                    {{ item.difficulty }}
                                </v-chip>
                                <v-chip small v-show="item.teks != null" v-for="item2 in item.teks" :key="item2">
                                    {{ item2 }}
                                </v-chip>
                            </div>

                            <v-btn color="red" outlined width="120" @click="removeQuestion(index, item)"> <v-icon>mdi-delete</v-icon> Remove </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MultipleChoice from "@/components/Teacher/assignments/question_types/multiple_choice/MultipleChoice.vue";
import OpenResponse from "@/components/Teacher/assignments/question_types/open_response/OpenResponse.vue";
import Checkbox from "@/components/Teacher/assignments/question_types/checkbox/Checkbox.vue";
import RangeType from "@/components/Teacher/assignments/question_types/range/RangeType.vue";
import DragDrop from "@/components/Teacher/assignments/question_types/drag_and_drop/DragDrop.vue";
import GraphType from "@/components/Teacher/assignments/question_types/graph/Graph.vue";

export default {
    components: {
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

    methods: {
        removeQuestion(index, item) {
            this.selected_questions.splice(index, 1);
            this.$emit("remove_question", item);
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
    height: 650px;
    overflow-y: scroll;

    padding: 10px;
    border: 1px solid #d4d4d4;
    background-color: #fafafa;

    display: flex;
    flex-direction: column;
    row-gap: 15px;
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
    column-gap: 20px;
    justify-content: space-between;
}

.question-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}
</style>
