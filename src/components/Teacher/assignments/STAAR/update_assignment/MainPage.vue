<template>
    <div class="main-content">
        <YesOrNo v-if="dialog.status" @clickNo="dialog.status = false" @clickYes="clickCancel()" :dialog_prop="this.dialog" />
        <div class="content-title">
            <span class="class-name">Edit STAAR Test</span>
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
                        <MathWorldStep1 @clickCancel="clickCancel()" @clickNext="clickNext()" />
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <MathWorldStep2 @clickBack="clickBack()" @clickNext="clickNext()" />
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <MathWorldStep3 @clickBack="clickBack()" @clickNext="clickNext()" />
                    </v-stepper-content>
                    <v-stepper-content step="4">
                        <MathWorldStep4 @clickBack="clickBack()" @clickUpdate="clickUpdate()" />
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </div>
    </div>
</template>

<script>
import { STAAR_EditAssignment } from "@/api/Teacher/assignments/STAAR/EditAssignment";
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

        clickUpdate() {
            this.$router.push({
                name: "Assignments",
                params: {
                    snackbar_item: {
                        type: "success",
                        message: "Assignment updated",
                    },
                },
            });
        },
    },

    created() {
        STAAR_EditAssignment.prototype.set_assignment(this.$route.params.class_title, this.$route.params.assignment_code);
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
