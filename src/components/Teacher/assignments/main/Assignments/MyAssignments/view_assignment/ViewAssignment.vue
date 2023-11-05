<template>
    <div>
        <SimpleLoading :show_loading="teacher_assignment_store.loading" />
        <YesNoWarning v-if="dialog.status" @clickNo="dialog.status = false" @clickYes="deleteAssignment()" :dialog_prop="this.dialog" />
        <div class="main-content" v-if="teacher_assignment_store.selected_assignment != null">
            <Breadcrumbs :items="breadcrumbs" />
            <div class="content-title">
                <span class="class-name">
                    <span v-if="$route.params.assignment_type == 'MW'"> MathWorld Test </span>
                    <span v-else-if="$route.params.assignment_code == 'STAAR'"> STAAR Test </span>
                    <span v-else-if="$route.params.assignment_type == 'CET'"> College Entrance Test </span>
                </span>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="#ffffff" rounded large v-bind="attrs" v-on="on">
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
                                            assignment_type: $route.params.assignment_type,
                                            assignment_code: $route.params.assignment_code,
                                        },
                                    })
                                "
                            >
                                Edit Assignment
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item link>
                            <v-list-item-content @click="dialog.status = true"> Delete Assignment </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <div class="content-body" v-if="teacher_assignment_store.selected_assignment !== null">
                <div class="content-details">
                    <div class="details-to-PDF" ref="toPDF">
                        <div class="content-setup">
                            <h4 v-if="$route.params.assignment_type === 'CET'">College Entrance Test</h4>
                            <h4 v-else-if="$route.params.assignment_type === 'MW'">MathWorld Test</h4>
                            <h4 v-else-if="$route.params.assignment_type === 'STAAR'">STAAR Test</h4>
                            <br />
                            <div class="item-1">
                                <div class="item-header">Title</div>
                                <div class="item-body">{{ teacher_assignment_store.selected_assignment.title }}</div>
                            </div>

                            <div class="item-1">
                                <div class="item-header">Description</div>
                                <div class="item-body">
                                    {{ teacher_assignment_store.selected_assignment.description }}
                                </div>
                            </div>

                            <div class="item-2">
                                <div class="item">
                                    <div class="item-header">Open on</div>
                                    <div class="item-body">
                                        {{ teacher_assignment_store.selected_assignment.date_start }}
                                    </div>
                                </div>

                                <div class="item">
                                    <div class="item-header">Close on</div>
                                    <div class="item-body">
                                        {{ teacher_assignment_store.selected_assignment.date_end }}
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="item-1">
                                <div class="item-header">Assigned to</div>
                                <div class="item-body">
                                    <ul v-for="item in assignment.assigned_classes" :key="item">
                                        <li>
                                            {{ item }}
                                        </li>
                                    </ul>
                                </div>
                            </div> -->
                        </div>

                        {{ "Total added questions: " + teacher_assignment_store.selected_assignment.questions.length }}
                        <div class="content-questions" v-if="teacher_assignment_store.selected_assignment.questions.length != 0">
                            <div v-for="(item, index) in teacher_assignment_store.selected_assignment.questions" :key="index">
                                <div class="question-item">
                                    <div class="item-header">
                                        <!-- <span>{{ "TEKS " + item.metadata.teks_code }}</span> -->
                                    </div>
                                    <div class="item-body">
                                        <v-col cols="12" v-if="item.response_type == 'Open Response Exact'">
                                            <OpenResponse :question="item.question_content" />
                                        </v-col>
                                        <v-col cols="12" v-if="item.response_type == 'Checkbox'">
                                            <Checkbox :question_content="item.question_content" :question_options="item.options" />
                                        </v-col>
                                        <!-- <v-col cols="12" v-if="item.type == 'multiple-choice'">
                                            <MultipleChoice :question_item="item" />
                                        </v-col>
                                        <v-col cols="12" v-if="item.type == 'range-type'">
                                            <RangeType :question_item="item" />
                                        </v-col>
                                        <v-col cols="12" v-if="item.type == 'drag-and-drop'">
                                            <DragDrop :question_item="item" />
                                        </v-col>
                                        <v-col cols="12" v-if="item.type == 'graph-type'">
                                            <GraphType :question_item="item" />
                                        </v-col> -->
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
                    <v-btn color="primary" outlined large @click="saveToPDF()"> <v-icon> mdi-file </v-icon> <span>SAVE TO PDF </span> </v-btn>
                    <!-- <v-btn
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
                    <v-btn v-if="assignment.status == 'undeployed'" color="primary" large @click="deploy_assignment()">
                        <v-icon> mdi-send </v-icon> <span>DEPLOY NOW </span>
                    </v-btn> -->
                    <v-btn
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
                    <v-btn color="primary" large @click="deploy_assignment()"> <v-icon> mdi-content-copy </v-icon> <span>REUSE</span> </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { TeacherAssignmentData } from "@/store/Teacher/TeacherAssignmentData";
import YesNoWarning from "@/components/Commons/popup_dialogs/YesNoWarning.vue";
import Breadcrumbs from "@/components/Commons/breadcrumbs/Breadcrumbs.vue";
import SimpleLoading from "@/components/Commons/loadings/SimpleLoading.vue";
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
        SimpleLoading,
        MultipleChoice,
        OpenResponse,
        Checkbox,
        RangeType,
        DragDrop,
        GraphType,
    },

    data() {
        return {
            teacher_assignment_store: TeacherAssignmentData(),

            dialog: {
                status: false,
                title: "Delete assignment",
                message: "Do you want to delete this assignment?",
            },

            breadcrumbs: [
                {
                    text: "Assignments",
                    exact: true,
                    disabled: false,
                    path: "/teacher/assignments",
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

    methods: {
        saveToPDF() {
            const html = this.$refs.toPDF;
            html2canvas(html).then((canvas) => {
                const image = { type: "jpeg", quality: 0.98 };
                const margin = [0.5, 0.5];

                var imgWidth = 8.5;
                var pageHeight = 11;

                var innerPageWidth = imgWidth - margin[0] * 2;
                var innerPageHeight = pageHeight - margin[1] * 2;

                // Calculate the number of pages.
                var pxFullHeight = canvas.height;
                var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
                var nPages = Math.ceil(pxFullHeight / pxPageHeight);

                // Define pageHeight separately so it can be trimmed on the final page.
                var pageHeight = innerPageHeight;

                // Create a one-page canvas to split up the full image.
                var pageCanvas = document.createElement("canvas");
                var pageCtx = pageCanvas.getContext("2d");
                pageCanvas.width = canvas.width;
                pageCanvas.height = pxPageHeight;

                // Initialize the PDF.
                var pdf = new jsPDF("p", "in", [8.5, 11]);

                for (var page = 0; page < nPages; page++) {
                    // Trim the final page to reduce file size.
                    if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
                        pageCanvas.height = pxFullHeight % pxPageHeight;
                        pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
                    }

                    // Display the page.
                    var w = pageCanvas.width;
                    var h = pageCanvas.height;
                    pageCtx.fillStyle = "white";
                    pageCtx.fillRect(0, 0, w, h);
                    pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

                    // Add the page to the PDF.
                    if (page > 0) {
                        pdf.addPage();
                    }

                    var imgData = pageCanvas.toDataURL("image/" + image.type, image.quality);
                    pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
                }

                pdf.autoPrint();
                pdf.output("dataurlnewwindow");
                // pdf.save(filename);
            });
        },

        async deleteAssignment() {
            var results = await this.teacher_assignment_store.delete_assignment(this.$route.params.assignment_code);
            if (results == true) {
                this.dialog.status = false;
                this.$router.push({
                    name: "ClassSelected",
                    params: {
                        tab_item: 1,
                        snackbar_item: {
                            type: "success",
                            message: "Assignment successfully deleted",
                        },
                    },
                });
            }
        },
    },

    created() {
        this.teacher_assignment_store.get_assignment(this.$route.params.assignment_code);
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
