<template>
    <div class="main-content">
        <v-card-title>
            <h3>Test Settings</h3>
        </v-card-title>
        <br />
        <v-card outlined class="content-stepper">
            <v-col cols="12" sm="6">
                <span>Date</span>
                <br />
                <br />
                <vc-date-picker
                    v-model="range"
                    mode="dateTime"
                    :columns="2"
                    :masks="masks"
                    is-range
                    :available-dates="{ start: new Date(), end: null }"
                >
                    <template v-slot="{ inputValue, togglePopover }">
                        <div class="date-time">
                            <v-row dense>
                                <v-col cols="12" lg="6">
                                    <v-text-field
                                        :value="inputValue.start"
                                        label="Start"
                                        outlined
                                        readonly
                                        clearable
                                        @click:clear="clearDate()"
                                        @click="togglePopover()"
                                        :error-messages="startDateErrors"
                                        @input="$v.range.start.$touch()"
                                        @blur="$v.range.start.$touch()"
                                    />
                                </v-col>
                                <v-col cols="12" lg="6">
                                    <v-text-field
                                        :value="inputValue.end"
                                        label="End"
                                        outlined
                                        readonly
                                        clearable
                                        @click:clear="clearDate()"
                                        @click="togglePopover()"
                                        :error-messages="endDateErrors"
                                        @input="$v.range.end.$touch()"
                                        @blur="$v.range.end.$touch()"
                                    />
                                </v-col>
                            </v-row>
                        </div>
                    </template>
                    <template v-slot:footer>
                        <v-divider />
                        <div class="date-picker-footer">
                            <v-btn text @click="range = null"> Clear </v-btn>
                        </div>
                    </template>
                </vc-date-picker>
                <!-- Date Picker -->

                <div class="content-item">
                    <span>Assign to*</span>
                    <v-autocomplete
                        v-model="assigned_class"
                        :items="items"
                        chips
                        outlined
                        clearable
                        label="Select a class"
                        multiple
                        flat
                        solo
                        :error-messages="assignedClassErrors"
                        @input="$v.assigned_class.$touch()"
                        @blur="$v.assigned_class.$touch()"
                    >
                        <template
                            v-slot:selection="{ attrs, item, select, selected }"
                        >
                            <v-chip
                                v-bind="attrs"
                                :input-value="selected"
                                close
                                @click="select"
                                @click:close="remove(item)"
                            >
                                {{ item }}
                            </v-chip>
                        </template>
                    </v-autocomplete>
                </div>
            </v-col>
        </v-card>
        <br />
        <v-card-actions>
            <div class="content-actions">
                <v-btn large width="15%" outlined @click="clickBack()">
                    Back
                </v-btn>
                <v-btn
                    large
                    width="15%"
                    color="primary"
                    :disabled="hasErrors"
                    @click="clickNext()"
                >
                    Next
                </v-btn>
            </div>
        </v-card-actions>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { STAAR_NewAssignment } from "@/api/Teacher/assignments/STAAR/NewAssignment";

export default {
    mixins: [validationMixin],

    validations: {
        range: {
            start: { required },
            end: { required },
        },

        assigned_class: { required },
    },

    data() {
        return {
            range: {
                start: "",
                end: "",
            },
            masks: {
                input: "YYYY-MM-DD h:mm A",
            },
            assigned_class: [],
            items: STAAR_NewAssignment.prototype.get_all_classes(),
        };
    },

    methods: {
        clearDate() {
            this.$v.range.$touch();
            this.range = null;
        },

        clickNext() {
            if (this.submit()) this.$emit("clickNext");
        },

        clickBack() {
            this.$emit("clickBack");
        },

        remove(item) {
            this.assigned_class.splice(this.assigned_class.indexOf(item), 1);
        },

        formatDate(date) {
            return new Date(date).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
        },

        validateDate() {
            let today = new Date();
            if (this.range != null) {
                if (
                    this.formatDate(this.range.start) <
                        this.formatDate(today) &&
                    this.formatDate(this.range.end) < this.formatDate(today)
                ) {
                    return "Date is unavailable";
                }
            }
            this.$v.range.$touch();
            return null;
        },

        submit() {
            return STAAR_NewAssignment.prototype.submit_Step3(
                this.formatDate(this.range.start),
                this.formatDate(this.range.end),
                this.assigned_class
            );
        },
    },

    computed: {
        hasErrors() {
            if (
                this.range == null ||
                this.startDateErrors.length != 0 ||
                this.endDateErrors != 0 ||
                this.assigned_class.length == 0
            ) {
                return true;
            } else {
                return false;
            }
        },

        startDateErrors() {
            const errors = [];
            if (!this.$v.range.start.$dirty) return errors;
            !this.$v.range.start.required &&
                errors.push("Start date is required");
            if (this.validateDate() != null) errors.push(this.validateDate());
            return errors;
        },

        endDateErrors() {
            const errors = [];
            if (!this.$v.range.end.$dirty) return errors;
            !this.$v.range.end.required && errors.push("End date is required");
            if (this.validateDate() != null) errors.push(this.validateDate());
            return errors;
        },

        assignedClassErrors() {
            const errors = [];
            if (!this.$v.assigned_class.$dirty) return errors;
            !this.$v.assigned_class.required &&
                errors.push("Assigning a class is required");
            return errors;
        },
    },
};
</script>

<style scoped>
.main-content {
    margin-bottom: 300px;
}

.content-stepper {
    padding: 20px;
}

.date-picker-footer {
    width: 100%;
    display: flex;
    justify-content: right;
}

.content-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.item {
    display: flex;
    justify-content: space-between;
}

.content-actions {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>
