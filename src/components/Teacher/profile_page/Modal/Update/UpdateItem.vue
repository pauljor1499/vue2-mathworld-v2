<template>
    <div class="main-content">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" fab x-small dark v-bind="attrs" v-on="on" @click="dialog = true">
                    <v-icon dense>mdi-pencil</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="primary" dark>
                    <span>Edit Education Details</span>
                </v-toolbar>
                <v-card-text>
                    <br />
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field
                                v-model="new_item.school"
                                label="School"
                                required
                                outlined
                                :error-messages="schoolErrors"
                                @input="$v.new_item.school.$touch()"
                                @blur="$v.new_item.school.$touch()"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Degree (Optional)" outlined v-model="new_item.course"> </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Area of Study (Optional)" outlined v-model="new_item.field"> </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                v-model="new_item.start_year"
                                label="From"
                                :items="['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']"
                                required
                                outlined
                                type="number"
                                :error-messages="start_yearErrors"
                                @input="$v.new_item.start_year.$touch()"
                                @blur="$v.new_item.start_year.$touch()"
                            >
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                v-model="new_item.end_year"
                                label="To (expected year)"
                                :items="['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']"
                                required
                                outlined
                                type="number"
                                :error-messages="end_yearErrors"
                                @input="$v.new_item.end_year.$touch()"
                                @blur="$v.new_item.end_year.$touch()"
                            >
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-card-actions class="justify-end">
                                <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>
                                <v-btn color="success" :disabled="validData" @click="updateEducation()"> Update </v-btn>
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
    props: {
        education: Object,
        item_index: Number,
    },

    mixins: [validationMixin],

    validations: {
        new_item: {
            school: { required },
            course: {},
            field: {},
            start_year: { required },
            end_year: { required },
        },
    },

    data: () => ({
        current_item: {
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
        getAllData() {
            const data = {
                school: this.education.school,
                course: this.education.degree,
                field: this.education.area_of_study,
                start_year: this.education.year_started,
                end_year: this.education.year_ended,
            };
            this.current_item = JSON.parse(JSON.stringify(data));
            this.new_item = JSON.parse(JSON.stringify(data));
        },

        noChanges() {
            if (JSON.stringify(this.new_item) === JSON.stringify(this.current_item)) {
                return true;
            }
            return false;
        },

        checkAllErrors() {
            if (this.schoolErrors.length != 0 || this.start_yearErrors.length != 0 || this.end_yearErrors.length != 0) {
                return true;
            }
            return false;
        },

        updateEducation() {
            const item = {
                index: this.item_index,
                new_data: this.new_item,
            };
            this.$emit("updateEducation", item);
            this.dialog = false;
        },
    },

    computed: {
        validData() {
            if (this.noChanges() || this.checkAllErrors()) {
                return true;
            } else {
                return false;
            }
        },

        schoolErrors() {
            const errors = [];
            if (!this.$v.new_item.school.$dirty) return errors;
            !this.$v.new_item.school.required && errors.push("School is required.");
            return errors;
        },

        start_yearErrors() {
            const errors = [];
            if (!this.$v.new_item.start_year.$dirty) return errors;

            if (this.new_item.start_year && this.new_item.end_year != 0 && this.new_item.start_year == this.new_item.end_year) {
                errors.push("Must be less than to end year.");
                return errors;
            } else if (this.new_item.start_year > this.new_item.end_year) {
                errors.push("Start year is required.");
                return errors;
            }

            !this.$v.new_item.start_year.required && errors.push("Start year is required.");
            return errors;
        },

        end_yearErrors() {
            const errors = [];
            if (!this.$v.new_item.end_year.$dirty) return errors;

            if (this.new_item.start_year && this.new_item.end_year != 0 && this.new_item.start_year == this.new_item.end_year) {
                errors.push("Must be greater than to start year.");
                return errors;
            } else if (this.new_item.start_year > this.new_item.end_year) {
                errors.push("End year is required.");
                return errors;
            }

            !this.$v.new_item.end_year.required && errors.push("End year is required.");
            return errors;
        },
    },

    created() {
        this.getAllData();
    },
};
</script>

<style scoped>
.v-btn {
    text-transform: none;
}
</style>
