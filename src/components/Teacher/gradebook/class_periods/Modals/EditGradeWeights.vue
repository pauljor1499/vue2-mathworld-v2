<template>
    <div class="main-content">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn depressed small v-bind="attrs" v-on="on" class="accept-action" @click="getCurrentData()"> Edit </v-btn>
            </template>
            <v-card>
                <v-toolbar color="primary" dark>
                    <span class="text-h6">Edit Grade Weights</span>
                </v-toolbar>
                <v-card-text>
                    <br />
                    <v-row dense>
                        <v-col cols="12">
                            <v-alert text outlined type="error" color="deep-orange" v-if="checkTotalGradeWeights > 100">
                                <span> Total grade weights must not exceed to 100%. </span>
                            </v-alert>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="new_item.tests"
                                type="number"
                                label="Tests (%)"
                                required
                                outlined
                                :error-messages="testsErrors"
                                @input="$v.new_item.tests.$touch()"
                                @blur="$v.new_item.tests.$touch()"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="new_item.quizzes"
                                type="number"
                                label="Quizzes (%)"
                                required
                                outlined
                                :error-messages="quizzesErrors"
                                @input="$v.new_item.quizzes.$touch()"
                                @blur="$v.new_item.quizzes.$touch()"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="new_item.homeworks"
                                type="number"
                                label="Homeworks (%)"
                                required
                                outlined
                                :error-messages="homeworksErrors"
                                @input="$v.new_item.homeworks.$touch()"
                                @blur="$v.new_item.homeworks.$touch()"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="new_item.projects"
                                type="number"
                                label="Projects (%)"
                                required
                                outlined
                                :error-messages="projectsErrors"
                                @input="$v.new_item.projects.$touch()"
                                @blur="$v.new_item.projects.$touch()"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="new_item.finals"
                                type="number"
                                label="Finals (%)"
                                required
                                outlined
                                :error-messages="finalsErrors"
                                @input="$v.new_item.finals.$touch()"
                                @blur="$v.new_item.finals.$touch()"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <span
                                :class="{
                                    'error-total': checkTotalGradeWeights > 100,
                                }"
                            >
                                Total: {{ checkTotalGradeWeights + "%" }}
                            </span>
                        </v-col>
                        <v-col cols="12">
                            <br />
                            <v-card-actions class="justify-end">
                                <v-btn color="primary" text @click="resetAllFields()"> Cancel </v-btn>
                                <v-btn color="success" :disabled="validData" @click="updateGradeWeights()"> Update </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { ClassPeriodsService } from "@/api/Teacher/gradebook/class_periods/ClassPeriodsService";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
    mixins: [validationMixin],

    validations: {
        new_item: {
            tests: { required },
            quizzes: { required },
            homeworks: { required },
            projects: { required },
            finals: { required },
        },
    },

    props: {
        grade_weights: Array,
    },

    data: () => ({
        current_item: {
            tests: "",
            quizzes: "",
            homeworks: "",
            projects: "",
            finals: "",
        },

        new_item: {
            tests: "",
            quizzes: "",
            homeworks: "",
            projects: "",
            finals: "",
        },

        dialog: false,
    }),

    methods: {
        getGradeWeightsData() {
            const all_data = {
                tests: this.grade_weights[0].weights.toString(),
                quizzes: this.grade_weights[1].weights.toString(),
                homeworks: this.grade_weights[2].weights.toString(),
                projects: this.grade_weights[3].weights.toString(),
                finals: this.grade_weights[4].weights.toString(),
            };
            return all_data;
        },

        getCurrentData() {
            this.current_item = this.getGradeWeightsData();
            this.new_item = this.getGradeWeightsData();
        },

        updateGradeWeights() {
            ClassPeriodsService.prototype.updateGradeWeights(
                parseInt(this.new_item.tests),
                parseInt(this.new_item.quizzes),
                parseInt(this.new_item.homeworks),
                parseInt(this.new_item.projects),
                parseInt(this.new_item.finals)
            );
            this.resetAllFields();
        },

        resetAllFields() {
            const reset_item = {
                tests: "",
                quizzes: "",
                homeworks: "",
                projects: "",
                finals: "",
            };
            this.new_item = reset_item;
            this.dialog = false;
        },

        noChanges() {
            if (JSON.stringify(this.new_item) === JSON.stringify(this.current_item)) {
                return true;
            } else {
                return false;
            }
        },

        checkAllErrors() {
            if (
                this.testsErrors.length != 0 ||
                this.quizzesErrors.length != 0 ||
                this.homeworksErrors.length != 0 ||
                this.projectsErrors.length != 0 ||
                this.finalsErrors.length != 0 ||
                this.checkTotalGradeWeights > 100
            ) {
                return true;
            } else {
                return false;
            }
        },

        checkInput(input) {
            if (input != "") {
                const num = parseInt(input);
                return num;
            }
            return 0;
        },
    },

    computed: {
        checkTotalGradeWeights() {
            let total =
                this.checkInput(this.new_item.tests) +
                this.checkInput(this.new_item.quizzes) +
                this.checkInput(this.new_item.homeworks) +
                this.checkInput(this.new_item.projects) +
                this.checkInput(this.new_item.finals);
            return total;
        },

        validData() {
            if (this.noChanges() || this.checkAllErrors()) {
                return true;
            } else {
                return false;
            }
        },

        testsErrors() {
            const errors = [];
            if (parseInt(this.new_item.tests) < 0 || this.new_item.tests === "-0") {
                this.new_item.tests = 0;
            }

            if (!this.$v.new_item.tests.$dirty) return errors;

            !this.$v.new_item.tests.required && errors.push("Tests is required.");
            return errors;
        },

        quizzesErrors() {
            const errors = [];
            if (parseInt(this.new_item.quizzes) < 0 || this.new_item.quizzes === "-0") {
                this.new_item.quizzes = 0;
            }

            if (!this.$v.new_item.quizzes.$dirty) return errors;

            !this.$v.new_item.quizzes.required && errors.push("Quizzes is required.");
            return errors;
        },

        homeworksErrors() {
            const errors = [];
            if (parseInt(this.new_item.homeworks) < 0 || this.new_item.homeworks === "-0") {
                this.new_item.homeworks = 0;
            }

            if (!this.$v.new_item.homeworks.$dirty) return errors;

            !this.$v.new_item.homeworks.required && errors.push("Homeworks is required.");
            return errors;
        },

        projectsErrors() {
            const errors = [];
            if (parseInt(this.new_item.projects) < 0 || this.new_item.projects === "-0") {
                this.new_item.projects = 0;
            }

            if (!this.$v.new_item.projects.$dirty) return errors;

            !this.$v.new_item.projects.required && errors.push("Projects is required.");
            return errors;
        },

        finalsErrors() {
            const errors = [];
            if (parseInt(this.new_item.finals) < 0 || this.new_item.finals === "-0") {
                this.new_item.finals = 0;
            }

            if (!this.$v.new_item.finals.$dirty) return errors;

            !this.$v.new_item.finals.required && errors.push("Finals is required.");
            return errors;
        },
    },
};
</script>

<style scoped>
.v-btn {
    text-transform: none;
}

.error-total {
    color: red;
}
</style>
