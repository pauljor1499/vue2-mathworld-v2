<template>
    <div class="main-content">
        <YesNoWarning
            v-if="dialog.status"
            @clickNo="dialog.status = false"
            @clickYes="deleteAssignment()"
            :dialog_prop="this.dialog"
        />
        <Breadcrumbs :items="breadcrumbs" />
        <div class="content-title">
            <span class="class-name">
                <span v-if="assignment.type == 'MW'"> MathWorld Test </span>
                <span v-else-if="assignment.type == 'STAAR'"> STAAR Test </span>
                <span v-else-if="assignment.type == 'CET'">
                    College Entrance Test
                </span>
            </span>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="#ffffff"
                        rounded
                        large
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon left> mdi-cog</v-icon>
                        <span>Settings</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item link>
                        <v-list-item-content
                            @click="
                                $router.push({
                                    name: 'UpdateAssignment',
                                    params: {
                                        assignment_type:
                                            $route.params.assignment_type,
                                        assignment_code:
                                            $route.params.assignment_code,
                                    },
                                })
                            "
                        >
                            Edit Assignment
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-content @click="dialog.status = true">
                            Delete Assignment
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <div class="content-body">
            <div class="content-details">
                <div class="details-to-PDF" ref="toPDF">
                    <div class="content-setup">
                        <h4 v-if="assignment.type === 'CET'">
                            College Entrance Test
                        </h4>
                        <h4 v-else-if="assignment.type === 'MW'">
                            MathWorld Test
                        </h4>
                        <h4 v-else-if="assignment.type === 'STAAR'">
                            STAAR Test
                        </h4>
                        <br />
                        <div class="item-1">
                            <div class="item-header">Title</div>
                            <div class="item-body">{{ assignment.title }}</div>
                        </div>

                        <div class="item-1">
                            <div class="item-header">Description</div>
                            <div class="item-body">
                                {{ assignment.description }}
                            </div>
                        </div>

                        <div class="item-2">
                            <div class="item">
                                <div class="item-header">Open on</div>
                                <div class="item-body">
                                    {{ assignment.date_open }}
                                </div>
                            </div>

                            <div class="item">
                                <div class="item-header">Close on</div>
                                <div class="item-body">
                                    {{ assignment.date_close }}
                                </div>
                            </div>
                        </div>

                        <div class="item-1">
                            <div class="item-header">Assigned to</div>
                            <div class="item-body">
                                <ul
                                    v-for="item in assignment.assigned_classes"
                                    :key="item"
                                >
                                    <li>
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {{
                        "Total added questions: " + assignment.questions.length
                    }}

                    <div
                        class="content-questions"
                        v-if="assignment.questions.length != 0"
                    >
                        <div
                            v-for="(item, index) in assignment.questions"
                            :key="index"
                        >
                            <div class="question-item">
                                <div class="item-header">
                                    {{ "Question " + (index + 1) }}
                                </div>
                                <div class="item-body">
                                    <v-col
                                        cols="12"
                                        v-if="item.type == 'multiple-choice'"
                                    >
                                        <MultipleChoice :question_item="item" />
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        v-if="item.type == 'open-response'"
                                    >
                                        <OpenResponse :question_item="item" />
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        v-if="item.type == 'checkbox'"
                                    >
                                        <Checkbox :question_item="item" />
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        v-if="item.type == 'range-type'"
                                    >
                                        <RangeType :question_item="item" />
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        v-if="item.type == 'drag-and-drop'"
                                    >
                                        <DragDrop :question_item="item" />
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        v-if="item.type == 'graph-type'"
                                    >
                                        <GraphType :question_item="item" />
                                    </v-col>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p><i> No questions added.</i></p>
                    </div>
                </div>
            </div>
            <div class="content-actions">
                <v-btn
                    color="primary"
                    outlined
                    large
                    @click="
                        $router.push({
                            name: 'AssignmentPreview',
                        })
                    "
                >
                    <v-icon> mdi-eye </v-icon> <span> PREVIEW </span>
                </v-btn>
                <v-btn color="primary" outlined large @click="saveToPDF()">
                    <v-icon> mdi-file </v-icon> <span>SAVE TO PDF </span>
                </v-btn>
                <v-btn
                    v-if="assignment.status == 'close'"
                    color="primary"
                    outlined
                    large
                    @click="
                        $router.push({
                            name: 'AssignmentData',
                        })
                    "
                >
                    <v-icon> mdi-chart-bar </v-icon> <span>SHOW DATA </span>
                </v-btn>
                <v-btn
                    v-if="assignment.status == 'undeployed'"
                    color="primary"
                    large
                    @click="deploy_assignment()"
                >
                    <v-icon> mdi-send </v-icon> <span>DEPLOY NOW </span>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { AssignmentService } from "@/api/Teacher/gradebook/assignments/main/Assignments.js";
import YesNoWarning from "@/components/Teacher/main/dialogs/YesNoWarning.vue";
import Breadcrumbs from "@/components/Teacher/main/breadcrumbs/Breadcrumbs.vue";
import MultipleChoice from "./question_types/multiple_choice/MultipleChoice.vue";
import OpenResponse from "./question_types/open_response/OpenResponse.vue";
import Checkbox from "./question_types/checkbox/Checkbox.vue";
import RangeType from "./question_types/range/RangeType.vue";
import DragDrop from "./question_types/drag_and_drop/DragDrop.vue";
import GraphType from "./question_types/graph/Graph.vue";

export default {
    components: {
        YesNoWarning,
        Breadcrumbs,
        MultipleChoice,
        OpenResponse,
        Checkbox,
        RangeType,
        DragDrop,
        GraphType,
    },

    data() {
        return {
            dialog: {
                status: false,
                title: "Delete assignment",
                message: "",
            },

            breadcrumbs: [
                {
                    text: "Gradebook",
                    exact: true,
                    disabled: false,
                    path: "/teacher/gradebook",
                },
                {
                    text: "Class",
                    exact: true,
                    disabled: false,
                    path:
                        "/teacher/gradebook/" + this.$route.params.class_title,
                },
                {
                    text: "Assignment",
                    exact: true,
                    disabled: true,
                    path: "",
                },
            ],
        };
    },

    computed: {
        assignment() {
            return AssignmentService.prototype.get_assignment_by_code(
                this.$route.params.assignment_code
            );
        },
    },

    methods: {
        saveToPDF() {
            const html = this.$refs.toPDF;
            AssignmentService.prototype.printToPDF(html);
        },

        deploy_assignment() {
            var results = AssignmentService.prototype.deploy_assignment(
                this.$route.params.class_title,
                this.$route.params.assignment_code
            );
            if (results) {
                this.$router.push({
                    name: "ClassSelected",
                    params: {
                        class_title: this.$route.params.class_title,
                        tab_item: 1,
                        snackbar_item: {
                            type: "success",
                            message: "Assignment successfully deployed",
                        },
                    },
                });
            }
        },

        deleteAssignment() {
            var results = AssignmentService.prototype.delete_assignment_by_code(
                this.$route.params.assignment_code
            );
            if (results) {
                this.$router.push({
                    name: "ClassSelected",
                    params: {
                        class_title: this.$route.params.class_title,
                        tab_item: 1,
                        snackbar_item: {
                            type: "error",
                            message: "Assignment successfully deleted",
                        },
                    },
                });
            }
        },
    },

    created() {
        this.dialog.message =
            "Do you want to delete '" + this.assignment.title + "'?";
    },

    beforeCreate() {
        AssignmentService.prototype.get_class(this.$route.params.class_title);
    },
};
</script>

<style scoped>
.main-content {
    width: 100%;
}

.v-btn {
    text-transform: none;
}

.content-title {
    display: flex;
    justify-content: space-between;
    padding: 25px 5% 25px 5%;
    background-color: #0091de;
}

.content-title .class-name {
    font-size: 1.5em;
    color: var(--white-1);
}

.content-body {
    width: 100%;
    padding: 5%;
    display: flex;
    gap: 20px;
}

.content-details {
    width: 100%;
    height: 100%;
    flex: 3.5;

    padding: 50px 50px 0px 50px;
    border-radius: 10px;
    border: 1px solid var(--gray-1);
    background-color: var(--white-1);
}

.details-to-PDF {
    width: 100%;
    padding: 0px 0px 50px 0px;
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.content-actions {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
}

.content-actions .v-btn {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.content-setup {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.content-actions {
    flex: 1;
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
</style>
