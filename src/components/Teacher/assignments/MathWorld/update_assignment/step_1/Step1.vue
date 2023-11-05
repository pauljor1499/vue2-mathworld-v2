<template>
    <div class="main-content">
        <YesOrNo v-if="dialog.status" @clickNo="dialog.status = false" @clickYes="clickCancel()" :dialog_prop="this.dialog" />
        <v-card-title>
            <h3>Title and Description</h3>
        </v-card-title>
        <br />
        <v-card outlined class="content-stepper">
            <v-col cols="12" sm="6">
                <div class="content-item">
                    <span>Title*</span>
                    <v-text-field
                        v-model="new_data.title"
                        outlined
                        required
                        solo
                        flat
                        label="Title"
                        :error-messages="titleErrors"
                        :counter="25"
                        @input="$v.new_data.title.$touch()"
                        @blur="$v.new_data.title.$touch()"
                    />
                </div>
                <div class="content-item">
                    <span>Description*</span>
                    <v-textarea
                        v-model="new_data.description"
                        outlined
                        required
                        solo
                        flat
                        label="Description"
                        :error-messages="descriptionErrors"
                        :counter="50"
                        @input="$v.new_data.description.$touch()"
                        @blur="$v.new_data.description.$touch()"
                    />
                </div>
            </v-col>
        </v-card>
        <br />
        <v-card-actions>
            <div class="content-actions">
                <v-btn large width="15%" outlined @click="dialog.status = true"> Cancel </v-btn>
                <v-btn large width="15%" color="primary" :disabled="checkErrors" @click="clickNext()"> Next </v-btn>
            </div>
        </v-card-actions>
    </div>
</template>

<script>
import { TeacherAssignmentData } from "@/store/Teacher/TeacherAssignmentData";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import YesOrNo from "@/components/Commons/popup_dialogs/YesNoOption.vue";

export default {
    components: {
        YesOrNo,
    },

    mixins: [validationMixin],

    validations: {
        new_data: {
            title: { required, maxLength: maxLength(25) },
            description: { required, maxLength: maxLength(50) },
        },
    },

    data() {
        return {
            teacher_assignment_data: TeacherAssignmentData(),

            new_data: {
                title: "",
                description: "",
            },

            dialog: {
                status: false,
                title: "Cancel Changes",
                message: "Do you want to cancel all the operations? Changes you made so far will not be saved.",
            },
        };
    },

    methods: {
        clickNext() {
            this.$emit("checkStep1", this.new_data);
        },

        clickCancel() {
            this.$emit("clickCancel");
        },

        hasErrors() {
            this.$v.$touch();
            if (this.titleErrors.length != 0 || this.descriptionErrors.length != 0) {
                return true;
            } else {
                return false;
            }
        },
    },

    computed: {
        checkErrors() {
            if (this.titleErrors.length != 0 || this.descriptionErrors.length != 0) {
                return true;
            } else {
                return false;
            }
        },

        titleErrors() {
            const errors = [];
            if (!this.$v.new_data.title.$dirty) return errors;
            !this.$v.new_data.title.required && errors.push("Title is required");
            !this.$v.new_data.title.maxLength && errors.push("Title must be at most 25 characters long");
            return errors;
        },

        descriptionErrors() {
            const errors = [];
            if (!this.$v.new_data.description.$dirty) return errors;
            !this.$v.new_data.description.required && errors.push("Description is required");
            !this.$v.new_data.description.maxLength && errors.push("Description must be at most 25 characters long");
            return errors;
        },
    },

    created() {
        this.new_data.title = this.teacher_assignment_data.selected_assignment.title;
        this.new_data.description = this.teacher_assignment_data.selected_assignment.description;
    },
};
</script>

<style scoped>
.content-stepper {
    padding: 20px;
}

.content-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.content-actions {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>
