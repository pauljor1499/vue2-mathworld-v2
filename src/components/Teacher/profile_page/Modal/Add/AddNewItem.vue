<template>
    <div class="add-new-item">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" fab x-small v-bind="attrs" v-on="on">
                    <v-icon> mdi-plus </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="primary" dark>
                    <span>Add Education Details</span>
                </v-toolbar>
                <v-card-text>
                    <br />
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field
                                v-model="input_item.school"
                                label="School"
                                required
                                outlined
                                :error-messages="schoolErrors"
                                @input="$v.input_item.school.$touch()"
                                @blur="$v.input_item.school.$touch()"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="input_item.course" label="Degree (Optional)" outlined> </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="input_item.field" label="Area of Study (Optional)" outlined> </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                v-model="input_item.start_year"
                                label="From"
                                :items="['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']"
                                required
                                outlined
                                type="number"
                                :error-messages="start_yearErrors"
                                @input="$v.input_item.start_year.$touch()"
                                @blur="$v.input_item.start_year.$touch()"
                            >
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                v-model="input_item.end_year"
                                label="To (or expected year)"
                                :items="['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']"
                                required
                                outlined
                                type="number"
                                :error-messages="end_yearErrors"
                                @input="$v.input_item.end_year.$touch()"
                                @blur="$v.input_item.end_year.$touch()"
                            >
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-card-actions class="justify-end">
                                <v-btn color="primary" text class="button-cancel" @click="resetAllFields()"> Cancel </v-btn>
                                <v-btn color="primary" :disabled="checkAllErrors" @click="addNewEducation()"> Save </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
    mixins: [validationMixin],

    validations: {
        input_item: {
            school: { required },
            course: {},
            field: {},
            start_year: { required },
            end_year: { required },
        },
    },

    data: () => ({
        input_item: {
            school: "",
            course: "",
            field: "",
            start_year: "",
            end_year: "",
        },

        new_item: {
            school: "",
            course: "",
            field: "",
            start_year: "",
            end_year: "",
        },

        dialog: false,
    }),

    methods: {
        addNewEducation() {
            this.new_item.school = this.input_item.school;
            this.new_item.course = this.input_item.course;
            this.new_item.field = this.input_item.field;
            this.new_item.start_year = this.input_item.start_year;
            this.new_item.end_year = this.input_item.end_year;

            this.$emit("addEducation", this.new_item);
            this.resetAllFields();
        },

        resetAllFields() {
            this.$v.$reset();
            this.input_item.school = "";
            this.input_item.course = "";
            this.input_item.field = "";
            this.input_item.start_year = "";
            this.input_item.end_year = "";
            this.dialog = false;
        },
    },

    computed: {
        schoolErrors() {
            const errors = [];
            if (!this.$v.input_item.school.$dirty) return errors;
            !this.$v.input_item.school.required && errors.push("School is required.");
            return errors;
        },

        start_yearErrors() {
            const errors = [];
            if (!this.$v.input_item.start_year.$dirty) return errors;

            if (this.input_item.start_year > this.input_item.end_year || this.input_item.start_year == this.input_item.end_year) {
                errors.push("Must be less than to end year.");
                return errors;
            }

            !this.$v.input_item.start_year.required && errors.push("Start year is required.");
            return errors;
        },

        end_yearErrors() {
            const errors = [];
            if (!this.$v.input_item.end_year.$dirty) return errors;

            if (this.input_item.start_year > this.input_item.end_year || this.input_item.start_year == this.input_item.end_year) {
                errors.push("Must be greater than to start year.");
                return errors;
            }

            !this.$v.input_item.end_year.required && errors.push("End year is required.");
            return errors;
        },

        checkAllErrors() {
            if (
                this.input_item.school == "" ||
                this.input_item.start_year == "" ||
                this.input_item.end_year == "" ||
                this.schoolErrors.length != 0 ||
                this.start_yearErrors.length != 0 ||
                this.end_yearErrors.length != 0
            ) {
                return true;
            } else {
                return false;
            }
        },
    },
};
</script>

<style scoped>
.v-btn {
    text-transform: none;
}
</style>
