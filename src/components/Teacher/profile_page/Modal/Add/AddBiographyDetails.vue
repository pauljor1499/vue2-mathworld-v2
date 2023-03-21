<template>
    <div class="main-content">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" fab x-small v-bind="attrs" v-on="on">
                    <v-icon> mdi-plus </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="primary" dark>
                    <span class="text-h6">Add Details</span>
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
                                :error-messages="inputFieldErrors"
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
                                    @click="addBiographyDetails()"
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
        addBiographyDetails() {
            this.$emit("addBiography", this.input_field);
            this.closeModal();
        },

        closeModal() {
            this.input_field = "";
            this.$v.$reset();
            this.dialog = false;
        },
    },

    computed: {
        inputFieldErrors() {
            const errors = [];
            if (!this.$v.input_field.$dirty) return errors;
            !this.$v.input_field.required &&
                errors.push("Details are required.");
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
