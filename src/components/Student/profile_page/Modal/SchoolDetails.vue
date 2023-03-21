<template>
    <div class="main-content">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    @click="load_data()"
                    color="primary"
                    fab
                    x-small
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon dense>mdi-pencil</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="primary" dark>
                    <span class="text-h6">Add School Details</span>
                </v-toolbar>
                <v-card-text>
                    <br />
                    <v-row dense>
                        <v-col cols="12">
                            <v-textarea
                                v-model="input_field"
                                flat
                                solo
                                label="Add your details here..."
                                required
                                auto-grow
                                outlined
                                :error-messages="schoolDetailsErrors"
                                @input="$v.input_field.$touch()"
                                @blur="$v.input_field.$touch()"
                            >
                            </v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-card-actions class="justify-end">
                                <v-btn
                                    color="primary"
                                    text
                                    @click="closeModal()"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    :disabled="fieldEmpty"
                                    @click="addSchoolDetails()"
                                >
                                    Save
                                </v-btn>
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
        school_details: String,
    },

    mixins: [validationMixin],

    validations: {
        input_field: { required },
    },

    data() {
        return {
            input_field: "",
            dialog: false,
        };
    },

    methods: {
        load_data() {
            this.input_field = this.school_details;
        },

        addSchoolDetails() {
            this.$emit("addSchoolDetails", this.input_field);
            this.closeModal();
        },

        closeModal() {
            this.input_field = "";
            this.$v.$reset();
            this.dialog = false;
        },
    },

    computed: {
        schoolDetailsErrors() {
            const errors = [];
            if (!this.$v.input_field.$dirty) return errors;
            !this.$v.input_field.required &&
                errors.push("School Details is required");
            return errors;
        },

        fieldEmpty() {
            if (this.input_field == "") {
                return true;
            } else {
                false;
            }
        },
    },
};
</script>

<style scoped>
.main-content {
    position: absolute;
    margin-top: -0.5%;
}

.v-btn {
    text-transform: none;
}
</style>
