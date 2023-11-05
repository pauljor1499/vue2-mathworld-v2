<template>
    <div>
        <SimpleLoading :show_loading="teacher_questions_data.loading" />
        <YesOrNo v-if="dialog.status" @clickNo="dialog.status = false" @clickYes="clickCancel()" :dialog_prop="this.dialog" />
        <div class="main-content" v-if="teacher_questions_data.questions != null">
            <div class="content-title">
                <span class="class-name">New MathWorld Test</span>
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
                            <MathWorldStep3 :items="teacher_class_data.all_class" @clickBack="clickBack()" @checkStep3="check_step(3, $event)" />
                        </v-stepper-content>
                        <v-stepper-content step="4">
                            <MathWorldStep4 :new_assignment="new_assignment" @clickBack="clickBack()" @checkStep4="check_step(4, $event)" />
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </div>
        </div>
    </div>
</template>

<script>
import { TeacherClassData } from "@/store/Teacher/TeacherClassData";
import { TeacherQuestionsData } from "@/store/Teacher/TeacherQuestionsData";
import { TeacherAssignmentData } from "@/store/Teacher/TeacherAssignmentData";
import YesOrNo from "@/components/Commons/popup_dialogs/YesNoOption.vue";
import MathWorldStep1 from "../new_assignment/step_1/Step1.vue";
import MathWorldStep2 from "../new_assignment/step_2/Step2.vue";
import MathWorldStep3 from "../new_assignment/step_3/Step3.vue";
import MathWorldStep4 from "../new_assignment/step_4/Step4.vue";
import SimpleLoading from "@/components/Commons/loadings/SimpleLoading.vue";

export default {
    components: {
        YesOrNo,
        MathWorldStep1,
        MathWorldStep2,
        MathWorldStep3,
        MathWorldStep4,
        SimpleLoading,
    },

    data() {
        return {
            current_step: 1,

            dialog: {
                status: false,
                title: "Discard Changes",
                message: "Do you want to discard all the operations? Changes you made so far will not be saved.",
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

            new_assignment: {
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

            // class_titles: ["Algebra", "Polynomials", "Calculus"],

            teacher_class_data: TeacherClassData(),

            teacher_assignment_data: TeacherAssignmentData(),

            teacher_questions_data: TeacherQuestionsData(),
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
                        this.new_assignment.title = data.title;
                        this.new_assignment.description = data.description;
                        this.clickNext();
                        break;
                    } catch (err) {
                        console.log(err);
                        break;
                    }
                case 2:
                    try {
                        this.new_assignment.questions = JSON.parse(JSON.stringify(data));
                        this.clickNext();
                        break;
                    } catch (err) {
                        console.log(err);
                        break;
                    }
                case 3:
                    try {
                        this.new_assignment.date_open = formatDate(data.date_start);
                        this.new_assignment.date_close = formatDate(data.date_end);
                        this.new_assignment.assigned_classes = JSON.parse(JSON.stringify(data.assigned_class));
                        this.clickNext();
                        break;
                    } catch (err) {
                        console.log(err);
                        break;
                    }
                case 4:
                    try {
                        this.clickCreate();
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
                name: "Assignments",
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

        async clickCreate() {
            var payload = {
                title: this.new_assignment.title,
                description: this.new_assignment.description,
                date_start: this.new_assignment.date_open,
                date_end: this.new_assignment.date_close,
                total_item_points: this.total_question_points(this.new_assignment.questions),
                class_ids: this.get_class_uuid(this.new_assignment.assigned_classes),
                questions: this.new_assignment.questions,
            };
            var results = await this.teacher_assignment_data.create_assignment(payload);
            if (results) {
                this.$router.push({
                    name: "Assignments",
                    params: {
                        snackbar_item: {
                            type: "success",
                            message: "New assignment created",
                        },
                    },
                });
            }
        },

        get_class_uuid(assigned_classes) {
            var results = [];
            var i = 0;
            for (var i = 0; i < assigned_classes.length; i++) {
                var class_assigned = assigned_classes[i];
                var index = this.teacher_class_data.all_class.findIndex((entry) => entry.title + " (" + entry.section + ")" == class_assigned);
                if (index > -1) {
                    results.push(this.teacher_class_data.all_class[index].uuid);
                }
            }
            return results;
        },

        total_question_points(questions) {
            let total = 0;
            questions.forEach((question) => {
                total += question.metadata.points;
            });
            return total;
        },
    },

    created() {
        this.teacher_class_data.get_all_class();
        this.teacher_questions_data.fetch_mathworld_questions();
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
