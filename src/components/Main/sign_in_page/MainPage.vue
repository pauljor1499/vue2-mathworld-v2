<template>
    <div class="sign-in-page" @keydown.enter="onEnterPressed()">
        <v-card width="450" class="content-body" id="signIn">
            <v-card-title class="justify-center">
                <h5 id="form-title">Sign In Account</h5>
            </v-card-title>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12">
                        <v-alert text outlined type="error" color="deep-orange" v-if="error_message.status">
                            <span id="error-message">
                                {{ error_message.message }}
                            </span>
                        </v-alert>
                    </v-col>
                    <v-col cols="12">
                        <v-select
                            id="select-role"
                            v-model="select"
                            :error-messages="selectErrors"
                            :label="get_label"
                            flat
                            outlined
                            solo
                            required
                            @change="$v.select.$touch()"
                            @blur="$v.select.$touch()"
                            :menu-props="{
                                closeOnClick: true,
                                closeOnContentClick: true,
                            }"
                        >
                            <template v-slot:no-data>
                                <v-list>
                                    <v-list-item link>
                                        <v-list-item-content id="role-student" @click="select_role('Student')"> Student </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item link>
                                        <v-list-item-content id="role-teacher" @click="select_role('Teacher')"> Teacher </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </template>
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            id="input-email"
                            v-model="email"
                            :error-messages="emailErrors"
                            label="E-mail"
                            placeholder="sample@email.com"
                            type="email"
                            outlined
                            required
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                        />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            id="input-password"
                            v-model="password"
                            :error-messages="passwordErrors"
                            :append-icon="show_eye ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show_eye ? 'text' : 'password'"
                            name="input-10-2"
                            label="Password"
                            outlined
                            required
                            class="input-group--focused"
                            @click:append="show_eye = !show_eye"
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"
                        />
                    </v-col>
                    <v-col cols="12">
                        <router-link :to="'/support'">
                            <span>Forgot Password?</span>
                        </router-link>
                    </v-col>
                    <br />
                    <br />
                    <v-col cols="12">
                        <v-btn id="button-signin" x-large width="100%" color="primary" dark :loading="loading" @click="submit()">
                            <span>SIGN IN</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import { StudentData } from "@/store/Student/StudentData.js";
import { TeacherData } from "@/store/Teacher/TeacherData.js";
import { TeacherClassData } from "@/store/Teacher/TeacherClassData.js";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
    mixins: [validationMixin],

    validations: {
        select: { required },
        email: { required, email },
        password: { required },
    },

    data: () => ({
        student_store: StudentData(),
        teacher_store: TeacherData(),
        teacher_class_store: TeacherClassData(),

        loading: false,

        select: "",
        email: "",
        password: "",
        items: ["Student", "Teacher"],
        show_eye: false,
        error_message: {
            status: false,
            message: "",
        },
    }),

    computed: {
        get_label() {
            if (this.select == "") {
                return "Sign in as...";
            } else {
                return this.select;
            }
        },

        selectErrors() {
            const errors = [];
            if (!this.$v.select.$dirty) return errors;
            !this.$v.select.required && errors.push("Item is required");
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.email && errors.push("Must be valid e-mail");
            !this.$v.email.required && errors.push("E-mail is required");
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push("Password is required");
            return errors;
        },
    },

    methods: {
        onEnterPressed() {
            this.submit();
        },

        select_role(role) {
            this.select = role;
        },

        hasErrors() {
            if (this.selectErrors.length != 0 || this.emailErrors.length != 0 || this.passwordErrors.length != 0) {
                return true;
            } else {
                return false;
            }
        },

        async submit() {
            this.$v.$touch();
            this.error_message.status = false;
            if (!this.hasErrors()) {
                const credentials = {
                    email: this.email,
                    password: this.password,
                };
                if (this.select == "Teacher") {
                    this.loading = true;
                    const result = await this.teacher_store.login_teacher(credentials);
                    this.loading = this.teacher_store.loading;
                    if (result == true) {
                        this.$router.push({
                            path: "/teacher",
                        });
                    } else {
                        this.error_message.status = true;
                        this.error_message.message = this.teacher_store.error;
                    }
                } else if (this.select == "Student") {
                    this.loading = true;
                    const result = await this.student_store.login_student(credentials);
                    this.loading = this.teacher_store.loading;
                    if (result == true) {
                        this.$router.push({ path: "/student" });
                    } else {
                        this.error_message.status = true;
                        this.error_message.message = this.student_store.error;
                    }
                }
            }
        },
    },
};
</script>
<style scoped>
.sign-in-page {
    width: 100%;
    padding: 10%;
    background-color: #0091de;
}

.content-body {
    width: 100%;
    padding: 2%;
    margin: auto;
}

#signIn {
    animation: transitionIn 0.75s;
}

@keyframes transitionIn {
    from {
        opacity: 0;
        left: -150px;
    }

    to {
        opacity: 1;
        left: 0%;
    }
}

@media only screen and (max-width: 800px) {
}

@media only screen and (max-width: 450px) {
    .sign-in-page {
        padding: 5%;
    }
}
</style>
