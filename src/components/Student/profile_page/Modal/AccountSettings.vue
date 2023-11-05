<template>
    <div class="main-content">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="warning" v-bind="attrs" v-on="on"> Change Password </v-btn>
            </template>
            <v-card>
                <v-toolbar color="primary" dark>
                    <span>Change Password</span>
                </v-toolbar>
                <v-card-text>
                    <br />
                    <v-row dense>
                        <v-col cols="12" v-if="invalid_old_password">
                            <v-alert text dense outlined type="error">
                                <span> Current password is invalid </span>
                            </v-alert>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="account_email" label="E-mail" disabled required outlined> </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                id="input-current-password"
                                v-model="current_password"
                                :append-icon="show_eye1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show_eye1 ? 'text' : 'password'"
                                name="input-10-2"
                                label="Current Password"
                                :counter="25"
                                outlined
                                required
                                @click:append="show_eye1 = !show_eye1"
                                :error-messages="current_passwordErrors"
                                @input="$v.current_password.$touch()"
                                @blur="$v.current_password.$touch()"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                id="input-new-password"
                                v-model="password"
                                :append-icon="show_eye ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show_eye ? 'text' : 'password'"
                                name="input-10-2"
                                label="New Password"
                                :counter="25"
                                outlined
                                required
                                @click:append="show_eye = !show_eye"
                                :error-messages="passwordErrors"
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-card-actions class="justify-end">
                                <v-btn color="primary" text @click="closeModal()"> Cancel </v-btn>
                                <v-btn color="primary" :disabled="fieldEmpty" @click="updateAccount()"> Save </v-btn>
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
        account_email: String,
    },

    mixins: [validationMixin],

    validations: {
        current_password: { required, maxLength: maxLength(25) },
        password: { required, maxLength: maxLength(25) },
    },

    data() {
        return {
            dialog: false,
            current_password: "",
            password: "",
            show_eye1: false,
            show_eye: false,
            invalid_old_password: false,
        };
    },

    methods: {
        updateAccount() {
            const updated_data = {
                old_password: this.current_password,
                new_password: this.password,
            };
            this.$emit("updateAccount", updated_data);
            this.closeModal();
            // this.invalid_old_password = true;
        },

        closeModal() {
            this.current_password = "";
            this.password = "";
            this.invalid_old_password = false;
            this.show_eye = false;
            this.$v.$reset();
            this.dialog = false;
        },
    },

    computed: {
        current_passwordErrors() {
            const errors = [];
            if (!this.$v.current_password.$dirty) return errors;
            !this.$v.current_password.maxLength && errors.push("Current password may not be longer than 25 characters");
            !this.$v.current_password.required && errors.push("Current password is required");
            if (this.current_password.length < 8) {
                errors.push("Current password must be at least 8 characters long");
            }
            if (this.current_password.indexOf(" ") !== -1) {
                errors.push("Current password must not contain spaces");
            }
            if (this.current_password.toLowerCase() === this.current_password) {
                errors.push("Current password must contain at least one uppercase letter");
            }
            if (this.current_password.toUpperCase() === this.current_password) {
                errors.push("Current password must contain at least one lowercase letter");
            }
            if (this.current_password.search(/[0-9]/) === -1) {
                errors.push("Current password must contain at least one number");
            }
            if (this.current_password.search(/[^a-zA-Z0-9]/) === -1) {
                errors.push("Current password must contain at least one special character");
            }
            return errors;
        },

        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.maxLength && errors.push("Password may not be longer than 25 characters");
            !this.$v.password.required && errors.push("Password is required");
            if (this.password.length < 8) {
                errors.push("Password must be at least 8 characters long");
            }
            if (this.password.indexOf(" ") !== -1) {
                errors.push("Password must not contain spaces");
            }
            if (this.password.toLowerCase() === this.password) {
                errors.push("Password must contain at least one uppercase letter");
            }
            if (this.password.toUpperCase() === this.password) {
                errors.push("Password must contain at least one lowercase letter");
            }
            if (this.password.search(/[0-9]/) === -1) {
                errors.push("Password must contain at least one number");
            }
            if (this.password.search(/[^a-zA-Z0-9]/) === -1) {
                errors.push("Password must contain at least one special character");
            }
            return errors;
        },

        fieldEmpty() {
            if (this.password == "" || this.current_password == "") {
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
}

.v-btn {
    text-transform: none;
}
</style>
