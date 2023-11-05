<template>
    <div class="main-content">
        <YesOrNo v-if="dialog.status" @clickNo="dialog.status = false" @clickYes="clickCancel()" :dialog_prop="this.dialog" />
        <div class="content-title">
            <span class="class-name">New STAAR Test</span>
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
                        <STAARStep1 @clickCancel="clickCancel()" @clickNext="clickNext()" />
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <STAARStep2 @clickBack="clickBack()" @clickNext="clickNext()" />
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <STAARStep3 @clickBack="clickBack()" @clickNext="clickNext()" />
                    </v-stepper-content>
                    <v-stepper-content step="4">
                        <STAARStep4 @clickBack="clickBack()" @clickCreate="clickCreate()" />
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </div>
    </div>
</template>

<script>
import YesOrNo from "@/components/Commons/popup_dialogs/YesNoOption.vue";
import STAARStep1 from "../new_assignment/step_1/Step1.vue";
import STAARStep2 from "../new_assignment/step_2/Step2.vue";
import STAARStep3 from "../new_assignment/step_3/Step3.vue";
import STAARStep4 from "../new_assignment/step_4/Step4.vue";

export default {
    components: {
        YesOrNo,
        STAARStep1,
        STAARStep2,
        STAARStep3,
        STAARStep4,
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

        clickCreate() {
            this.$router.push({
                name: "Assignments",
                params: {
                    snackbar_item: {
                        type: "success",
                        message: "New assignment created",
                    },
                },
            });
        },
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
