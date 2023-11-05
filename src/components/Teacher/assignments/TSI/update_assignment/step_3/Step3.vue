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
                    v-model="new_data.range"
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
                                        @input="$v.new_data.range.start.$touch()"
                                        @blur="$v.new_data.range.start.$touch()"
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
                                        @input="$v.new_data.range.end.$touch()"
                                        @blur="$v.new_data.range.end.$touch()"
                                    />
                                </v-col>
                            </v-row>
                        </div>
                    </template>
                    <template v-slot:footer>
                        <v-divider />
                        <div class="date-picker-footer">
                            <v-btn text @click="new_data.range = null"> Clear </v-btn>
                        </div>
                    </template>
                </vc-date-picker>
                <!-- Date Picker -->

                <div class="content-item">
                    <span>Assign to*</span>
                    <v-autocomplete
                        v-model="new_data.assigned_class"
                        :items="items"
                        chips
                        outlined
                        clearable
                        label="Select a class"
                        multiple
                        flat
                        solo
                        :error-messages="assignedClassErrors"
                        @input="$v.new_data.assigned_class.$touch()"
                        @blur="$v.new_data.assigned_class.$touch()"
                    >
                        <template v-slot:selection="{ attrs, item, select, selected }">
                            <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="remove(item)">
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
                <v-btn large width="15%" outlined @click="clickBack()"> Back </v-btn>
                <v-btn large width="15%" color="primary" :disabled="hasErrors" @click="clickNext()"> Next </v-btn>
            </div>
        </v-card-actions>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { TSI_EditAssignment } from "@/api/Teacher/assignments/TSI/EditAssignment";

export default {
    mixins: [validationMixin],

    validations: {
        new_data: {
            range: {
                start: { required },
                end: { required },
            },
            assigned_class: { required },
        },
    },

    data() {
        return {
            edit_assignment: TSI_EditAssignment.prototype.getEditAssignment(),
            new_data: {
                range: {
                    start: null,
                    end: null,
                },
                assigned_class: [],
            },
            masks: {
                input: "YYYY-MM-DD h:mm A",
            },
            items: TSI_EditAssignment.prototype.get_all_classes(),
        };
    },

    methods: {
        clearDate() {
            this.$v.new_data.range.$touch();
            this.new_data.range = null;
        },

        clickNext() {
            if (this.submit()) this.$emit("clickNext");
        },

        clickBack() {
            this.$emit("clickBack");
        },

        remove(item) {
            this.new_data.assigned_class.splice(this.new_data.assigned_class.indexOf(item), 1);
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
            if (this.new_data.range != null) {
                if (
                    this.formatDate(this.new_data.range.start) < this.formatDate(today) &&
                    this.formatDate(this.new_data.range.end) < this.formatDate(today)
                ) {
                    return "Date is unavailable";
                }
            }
            this.$v.new_data.range.$touch();
            return null;
        },

        getCurrentData() {
            this.new_data.range.start = this.edit_assignment.date_open;
            this.new_data.range.end = this.edit_assignment.date_close;

            for (var i = 0; i < this.edit_assignment.assigned_classes.length; i++) {
                this.new_data.assigned_class.push(this.edit_assignment.assigned_classes[i]);
            }
        },

        submit() {
            return TSI_EditAssignment.prototype.submit_Step3(
                this.formatDate(this.new_data.range.start),
                this.formatDate(this.new_data.range.end),
                this.new_data.assigned_class
            );
        },
    },

    computed: {
        hasErrors() {
            if (
                this.new_data.range == null ||
                this.startDateErrors.length != 0 ||
                this.endDateErrors != 0 ||
                this.new_data.assigned_class.length == 0
            ) {
                return true;
            } else {
                return false;
            }
        },

        startDateErrors() {
            const errors = [];
            if (!this.$v.new_data.range.start.$dirty) return errors;
            !this.$v.new_data.range.start.required && errors.push("Start date is required");
            if (this.validateDate() != null) errors.push(this.validateDate());
            return errors;
        },

        endDateErrors() {
            const errors = [];
            if (!this.$v.new_data.range.end.$dirty) return errors;
            !this.$v.new_data.range.end.required && errors.push("End date is required");
            if (this.validateDate() != null) errors.push(this.validateDate());
            return errors;
        },

        assignedClassErrors() {
            const errors = [];
            if (!this.$v.new_data.assigned_class.$dirty) return errors;
            !this.$v.new_data.assigned_class.required && errors.push("Assigning a class is required");
            return errors;
        },
    },

    created() {
        this.getCurrentData();
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
