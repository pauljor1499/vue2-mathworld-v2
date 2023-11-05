<template>
    <div class="teacher-name">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" fab x-small v-bind="attrs" v-on="on" @click="get_data()">
                    <v-icon small> mdi-pencil </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="primary" dark>
                    <span>Edit Name</span>
                </v-toolbar>
                <v-card-text>
                    <br />
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field
                                v-model="teacher_new.first_name"
                                @keypress="isLetter($event)"
                                :error-messages="first_nameErrors"
                                :counter="25"
                                label="First name"
                                outlined
                                required
                                flat
                                @input="$v.teacher_new.first_name.$touch()"
                                @blur="$v.teacher_new.first_name.$touch()"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="teacher_new.middle_name"
                                @keypress="isLetter($event)"
                                :error-messages="middle_nameErrors"
                                :counter="25"
                                label="Middle name"
                                outlined
                                required
                                flat
                                @input="$v.teacher_new.middle_name.$touch()"
                                @blur="$v.teacher_new.middle_name.$touch()"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="teacher_new.last_name"
                                @keypress="isLetter($event)"
                                :error-messages="last_nameErrors"
                                :counter="25"
                                label="Last name"
                                outlined
                                required
                                flat
                                @input="$v.teacher_new.last_name.$touch()"
                                @blur="$v.teacher_new.last_name.$touch()"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-card-actions class="justify-end">
                                <v-btn color="primary" text @click="closeModal()"> Cancel </v-btn>
                                <v-btn color="primary" :disabled="no_changes" @click="updateAccount()"> Update </v-btn>
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
import { required, maxLength } from "vuelidate/lib/validators";

export default {
    props: {
        teacher_name: Object,
    },

    mixins: [validationMixin],

    validations: {
        teacher_new: {
            first_name: { required, maxLength: maxLength(25) },
            middle_name: { required, maxLength: maxLength(25) },
            last_name: { required, maxLength: maxLength(25) },
        },
    },

    data() {
        return {
            dialog: false,
            teacher_old: {
                first_name: "",
                middle_name: "",
                last_name: "",
            },
            teacher_new: {
                first_name: "",
                middle_name: "",
                last_name: "",
            },
        };
    },

    methods: {
        get_data() {
            const data = {
                first_name: this.teacher_name.first_name,
                middle_name: this.teacher_name.middle_name,
                last_name: this.teacher_name.last_name,
            };
            this.teacher_old = JSON.parse(JSON.stringify(data));
            this.teacher_new = JSON.parse(JSON.stringify(data));
        },

        updateAccount() {
            this.$emit("updateTeacherName", this.teacher_new);
            this.closeModal();
        },

        closeModal() {
            this.$v.$reset();
            this.dialog = false;
        },

        isLetter(e) {
            let char = String.fromCharCode(e.keyCode);
            if (/^[A-Za-z ]+$/.test(char)) return true;
            else e.preventDefault();
        },
    },

    computed: {
        first_nameErrors() {
            const errors = [];
            if (!this.$v.teacher_new.first_name.$dirty) return errors;
            !this.$v.teacher_new.first_name.maxLength && errors.push("First name may not be longer than 25 characters");
            !this.$v.teacher_new.first_name.required && errors.push("First name is required");
            return errors;
        },

        middle_nameErrors() {
            const errors = [];
            if (!this.$v.teacher_new.middle_name.$dirty) return errors;
            !this.$v.teacher_new.middle_name.maxLength && errors.push("Middle name may not be longer than 25 characters");
            return errors;
        },

        last_nameErrors() {
            const errors = [];
            if (!this.$v.teacher_new.last_name.$dirty) return errors;
            !this.$v.teacher_new.last_name.maxLength && errors.push("Last name may not be longer than 25 characters");
            !this.$v.teacher_new.last_name.required && errors.push("Last name is required");
            return errors;
        },

        no_changes() {
            if (JSON.stringify(this.teacher_old) === JSON.stringify(this.teacher_new)) {
                return true;
            } else {
                if (this.first_nameErrors.length != 0 || this.middle_nameErrors.length != 0 || this.last_nameErrors.length != 0) {
                    return true;
                }
            }
            return false;
        },
    },
};
</script>

<style scoped>
.v-btn {
    text-transform: none;
}
</style>
