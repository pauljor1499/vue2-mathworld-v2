<template>
    <div class="main-content">
        <v-card-title>
            <h3>Preview</h3>
        </v-card-title>
        <br />
        <v-card outlined class="content-body">
            <div class="content-setup">
                <h4>MathWorld Test</h4>
                <br />
                <div class="item-1">
                    <div class="item-header">Title</div>
                    <div class="item-body">
                        {{ new_assignment.title }}
                    </div>
                </div>

                <div class="item-1">
                    <div class="item-header">Description</div>
                    <div class="item-body">
                        {{ new_assignment.description }}
                    </div>
                </div>

                <div class="item-2">
                    <div class="item">
                        <div class="item-header">Open on</div>
                        <div class="item-body">
                            {{ new_assignment.date_open }}
                        </div>
                    </div>

                    <div class="item">
                        <div class="item-header">Close on</div>
                        <div class="item-body">
                            {{ new_assignment.date_close }}
                        </div>
                    </div>
                </div>

                <div class="item-1">
                    <div class="item-header">Assigned to</div>
                    <div class="item-body">
                        <ul v-for="item in new_assignment.assigned_classes" :key="item">
                            <li>{{ item }}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {{ "Total added questions: " + new_assignment.questions.length }}

            <div class="content-questions" v-if="new_assignment.questions.length != 0">
                <div v-for="(item, index) in new_assignment.questions" :key="index">
                    <div class="question-item">
                        <div class="item-header">
                            <span>{{ "Question " + (index + 1) }}</span>
                        </div>
                        <div class="item-body">
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
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p><i> No questions added.</i></p>
            </div>
        </v-card>
        <br />
        <v-card-actions>
            <div class="content-actions">
                <v-btn large width="15%" outlined @click="$emit('clickBack')"> Back </v-btn>
                <v-btn large width="15%" color="primary" @click="clickUpdate()"> Update </v-btn>
            </div>
        </v-card-actions>
    </div>
</template>

<script>
import { MW_EditAssignment } from "@/api/Teacher/assignments/MathWorld/EditAssignment";
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

    data() {
        return {
            new_assignment: MW_EditAssignment.prototype.getEditAssignment(),
        };
    },

    methods: {
        clickUpdate() {
            this.$emit("checkStep4", this.new_assignment);
        },

        // submit() {
        //     return MW_EditAssignment.prototype.submit_Step4();
        // },
    },
};
</script>

<style scoped>
.content-body {
    width: 75%;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 50px;
}

.content-setup {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.item-1 {
    width: 100%;
    border-radius: 0px !important;
}

.item-header {
    padding: 5px 10px 5px 10px;
    background-color: #fafafa;
}

.item-body {
    width: 100%;
    padding: 5px 10px 5px 10px;
    text-align: justify;
    text-justify: inter-word;
    display: flex;
    flex-direction: column;
}

.item-2 {
    width: 100%;
    display: flex;
    column-gap: 10px;
}

.item-2 .item {
    width: 100%;
}

.content-questions {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.question-item {
    padding: 20px;
    border: 1px solid #d3d3d3;
}

.question-item .item-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.content-actions {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>
