<template>
    <v-dialog max-width="600" v-model="dialog" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
                <v-icon left> mdi-plus </v-icon>
                Enroll New Class
            </v-btn>
        </template>
        <v-card>
            <v-toolbar color="primary" dark>
                <span class="text-h7"> Enroll New Class</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="close_dialog()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <br />
            <v-card-text>
                <v-alert text dense outlined type="error" v-if="error_message">
                    {{ error }}
                </v-alert>
                <h4>Class code</h4>
                <span>
                    Ask your teacher for the class code, then enter it here.
                </span>
                <br />
                <br />
                <v-row dense>
                    <v-col cols="6">
                        <v-text-field
                            v-model="class_code"
                            outlined
                            label="Class code"
                            :error-messages="classCodeErrors"
                            :counter="9"
                            clearable
                            required
                            @input="$v.class_code.$touch()"
                            @blur="$v.class_code.$touch()"
                        />
                    </v-col>
                </v-row>
                <v-card-actions class="justify-end">
                    <v-btn color="primary" @click="enroll_new_class()">
                        Join
                    </v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { AllClassesService } from "@/api/Student/classes/ClassesService";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
    props: {
        dialog_prop: Object,
    },

    mixins: [validationMixin],

    validations: {
        class_code: { required, maxLength: maxLength(9) },
    },

    data() {
        return {
            dialog: false,
            class_code: "",
            error_message: false,
            error: "",
        };
    },

    methods: {
        enroll_new_class() {
            this.$v.$touch();
            if (this.classCodeErrors.length == 0) {
                var results = AllClassesService.prototype.enroll_new_class(
                    this.class_code
                );
                if (results === true) {
                    this.close_dialog();
                } else {
                    this.error_message = true;
                    this.error = results;
                }
            }
        },

        close_dialog() {
            this.$v.$reset();
            this.error_message = false;
            this.class_code = "";
            this.dialog = false;
        },
    },

    computed: {
        classCodeErrors() {
            const errors = [];
            if (!this.$v.class_code.$dirty) return errors;
            !this.$v.class_code.required &&
                errors.push("Class code is required");
            !this.$v.class_code.maxLength &&
                errors.push("Class code must be at most 7 characters long");
            return errors;
        },
    },
};
</script>

<style scoped>
.v-btn {
    text-transform: initial;
}

.dialog-body {
    color: var(--gray-2);
    font-size: 1.2em;
}
</style>
