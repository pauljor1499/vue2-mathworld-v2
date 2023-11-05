<template>
    <div class="forgot-password-content">
        <v-card width="400">
            <v-card-title>
                <h3>Forgot your password?</h3>
            </v-card-title>
            <v-card-text>
                <p>Please enter the school email you use to login in MathMatters</p>
                <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    :counter="25"
                    outlined
                    placeholder="Email"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                />
                <v-btn width="100%" color="primary" @click="clickReset()">Request Password Reset</v-btn>
                <v-col cols="12">
                    <router-link :to="'/signin'">
                        <span>Back to Sign in</span>
                    </router-link>
                </v-col>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
    mixins: [validationMixin],
    validations: {
        email: { required, email, maxLength: maxLength(25) },
    },

    data() {
        return {
            email: "",
        };
    },

    methods: {
        clickReset() {
            this.$emit("firstStepComplete");
        },
    },

    computed: {
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.required && errors.push("Email is required");
            !this.$v.email.maxLength && errors.push("Email may not be longer than 25 characters");
            if (this.email.length < 8) {
                errors.push("Email must be at least 8 characters long");
            }
            if (this.email.indexOf(" ") !== -1) {
                errors.push("Email must not contain spaces");
            }
            !this.$v.email.email && errors.push("Must be valid e-mail");
            return errors;
        },
    },
};
</script>

<style scoped>
* {
    text-transform: none;
}
</style>
