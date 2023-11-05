<template>
    <div class="main-content" v-if="this.teacher_assignment_data.selected_assignment !== null">
        <YesOrNo v-if="dialog.status" @clickNo="dialog.status = false" @clickYes="clickCancel()" :dialog_prop="this.dialog" />
        <div class="content-title">
            <span class="class-name">Edit MathWorld Test</span>
            <v-btn rounded color="#ffff" @click="dialog.status = true"> Discard </v-btn>
        </div>
        <div class="content-body">
            <v-stepper v-model="current_step">
                <v-stepper-header class="body-header">
                    <v-stepper-step
                        v-for="(step, index) in steps"
                        :key="index"
                        :complete="stepComplete(index + 1)"
                        :step="index + 1"
                        :color="stepStatus(index + 1)"
                        :rules="[() => step.valid]"
                    >
                        {{ step.title }}
                    </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items class="body-content">
                    <v-stepper-content step="1">
                        <MathWorldStep1 @clickCancel="clickCancel()" @checkStep1="check_step(1, $event)" />
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <MathWorldStep2 @clickBack="clickBack()" @checkStep2="check_step(2, $event)" />
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <MathWorldStep3 @clickBack="clickBack()" @checkStep3="check_step(3, $event)" />
                    </v-stepper-content>
                    <v-stepper-content step="4">
                        <MathWorldStep4 @clickBack="clickBack()" @checkStep4="check_step(4, $event)" />
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </div>
    </div>
</template>

<script>
import { TeacherAssignmentData } from "@/store/Teacher/TeacherAssignmentData";
import YesOrNo from "@/components/Commons/popup_dialogs/YesNoOption.vue";
import MathWorldStep1 from "../update_assignment/step_1/Step1.vue";
import MathWorldStep2 from "../update_assignment/step_2/Step2.vue";
import MathWorldStep3 from "../update_assignment/step_3/Step3.vue";
import MathWorldStep4 from "../update_assignment/step_4/Step4.vue";

export default {
    components: {
        YesOrNo,
        MathWorldStep1,
        MathWorldStep2,
        MathWorldStep3,
        MathWorldStep4,
    },

    data() {
        return {
            teacher_assignment_data: TeacherAssignmentData(),

            updated_assignment: {
                id: null,
                type: null,
                title: null,
                description: null,
                status: null,
                date_open: null,
                date_close: null,
                questions: [],
                assigned_classes: [],
            },

            steps: [
                {
                    title: "Title and Description",
                    valid: true,
                },
                {
                    title: "Questions",
                    valid: true,
                },
                {
                    title: "Test Settings",
                    valid: true,
                },
                {
                    title: "Preview",
                    valid: true,
                },
            ],

            current_step: 1,

            dialog: {
                status: false,
                title: "Discard Changes",
                message: "Do you want to discard all the operations? Changes you made so far will not be saved.",
            },
        };
    },

    methods: {
        check_step(step, data) {
            function formatDate(date) {
                return new Date(date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                });
            }

            switch (step) {
                case 1:
                    try {
                        this.updated_assignment.title = data.title;
                        this.updated_assignment.description = data.description;
                        this.clickNext();
                        break;
                    } catch (err) {
                        console.log(err);
                        break;
                    }
                case 2:
                    try {
                        this.updated_assignment.questions = JSON.parse(JSON.stringify(data));
                        this.clickNext();
                        break;
                    } catch (err) {
                        console.log(err);
                        break;
                    }
                case 3:
                    try {
                        this.updated_assignment.date_open = formatDate(data.date_start);
                        this.updated_assignment.date_close = formatDate(data.date_end);
                        this.updated_assignment.assigned_classes = JSON.parse(JSON.stringify(data.assigned_class));
                        this.clickNext();
                        break;
                    } catch (err) {
                        console.log(err);
                        break;
                    }
                case 4:
                    try {
                        this.clickUpdate();
                        break;
                    } catch (err) {
                        console.log(err);
                        break;
                    }
                default:
                    console.log("Invalid step number.");
            }
        },

        stepComplete(step) {
            return this.current_step > step;
        },

        stepStatus(step) {
            return this.current_step > step ? "green" : "blue";
        },

        clickCancel() {
            this.$router.push({
                name: "SelectedAssignment",
                params: {
                    assignment_code: this.$route.params.assignment_code,
                    assignment_type: this.$route.params.assignment_type,
                },
            });
        },

        clickBack() {
            if (this.current_step == 1) {
                this.steps[0].valid = true;
            } else if (this.current_step == 2) {
                this.steps[1].valid = true;
            } else if (this.current_step == 3) {
                this.steps[2].valid = true;
            } else if (this.current_step == 4) {
                this.steps[3].valid = true;
            }
            this.current_step--;
        },

        clickNext() {
            if (this.current_step == 1) {
                this.steps[0].valid = true;
            } else if (this.current_step == 2) {
                this.steps[1].valid = true;
            } else if (this.current_step == 3) {
                this.steps[2].valid = true;
            } else if (this.current_step == 4) {
                this.steps[3].valid = true;
            }
            this.current_step++;
        },

        async clickUpdate() {
            var payload = {
                title: "Sample",
                description: "Sample",
                date_start: "Jul 21, 2023, 08:40 PM",
                date_end: "Jul 22, 2023, 08:40 PM",
                total_item_points: 0,
                class_ids: ["3c95c13f-0cc0-4f44-b40b-585ebb24aeb6"],
                questions: [
                    {
                        question_type: "MathWorld",
                        response_type: "Open Response Exact",
                        question_content: "This is a sample question content.",
                        question_img: "https://images.indianexpress.com/2017/06/textbook.jpg",
                        points: 0,
                        options: [
                            {
                                letter: "a",
                                content: "Letter a",
                                image: "https://images.indianexpress.com/2017/06/textbook.jpg",
                                unit: "Teks",
                                is_answer: true,
                                uuid: "3c95c13f-0cc0-4f44-b40b-585ebb24aeb6",
                            },
                        ],
                        uuid: "3c95c13f-0cc0-4f44-b40b-585ebb24aeb6",
                    },
                ],
            };

            var results = await this.teacher_assignment_data.update_assignment(payload);
            if (results) {
                this.$router.push({
                    name: "Assignments",
                    params: {
                        snackbar_item: {
                            type: "success",
                            message: "Assignment updated",
                        },
                    },
                });
            }
        },
    },

    created() {
        this.teacher_assignment_data.get_assignment(this.$route.params.assignment_code);
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
    color: #ffff;
}

.content-body {
    width: 100%;
    height: 100%;
}

.body-header {
    width: 100%;
    padding: 0px 3% 0px 3%;
}

.body-content {
    padding: 2.5%;
}

.content-stepper {
    padding: 20px;
}

.content-actions {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.content-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
