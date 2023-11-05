<template>
    <div class="main-content">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" fab x-small dark v-bind="attrs" v-on="on" @click="getCurrentData()">
                    <v-icon small>mdi-pencil</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="primary" dark>
                    <span>Edit Biography Details</span>
                </v-toolbar>
                <v-card-text>
                    <br />
                    <v-row dense>
                        <v-col cols="12">
                            <v-textarea
                                v-model="new_data"
                                required
                                auto-grow
                                outlined
                                :error-messages="inputFieldErrors"
                                @input="$v.new_data.$touch()"
                                @blur="$v.new_data.$touch()"
                            >
                            </v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-card-actions class="justify-end">
                                <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>
                                <v-btn color="primary" :disabled="noChanges" @click="updateBiography()"> Update </v-btn>
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
        new_data: { required },
    },

    props: {
        biography_details: String,
    },

    data: () => ({
        current_data: "",
        new_data: "",
        dialog: false,
    }),

    computed: {
        inputFieldErrors() {
            const errors = [];
            if (!this.$v.new_data.$dirty) return errors;
            // !this.$v.new_data.required && errors.push("Details are required.");
            return errors;
        },

        noChanges() {
            if (this.new_data === this.current_data) {
                return true;
            } else {
                return false;
            }
        },
    },

    methods: {
        getCurrentData() {
            this.current_data = this.biography_details;
            this.new_data = this.biography_details;
        },

        updateBiography() {
            this.$emit("updateBiography", this.new_data);
            this.dialog = false;
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
