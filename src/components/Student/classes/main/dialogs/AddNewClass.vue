<template>
    <div>
        <SuccessSnackbar :text="success_snackbar.message" v-if="success_snackbar.status" @closeSnackbar="success_snackbar.status = false" />
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
                    <div class="class-code-form" v-if="class_code_status">
                        <h4>Class code</h4>
                        <span> Ask your teacher for the class code, then enter it here. </span>
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
                    </div>
                    <div class="class-details-form" v-else>
                        <div class="class-title">
                            <h4>{{ class_details.code }}</h4>
                            <h4>{{ class_details.title + "(" + class_details.section + ")" }}</h4>
                            <span> {{ class_details.description }} </span>
                        </div>
                        <br />
                        <div class="body-content">
                            <div class="content-teacher">
                                <img src="@/assets/blue_round_person.jpg" alt="Teacher Photo" v-if="class_details.teacher.profile_picture === null" />
                                <img :src="class_details.teacher.profile_picture" alt="Teacher Photo" v-else />
                                <br />
                                <div class="teacher-name">
                                    <h4>
                                        {{
                                            class_details.teacher.first_name +
                                            " " +
                                            class_details.teacher.middle_name +
                                            " " +
                                            class_details.teacher.last_name
                                        }}
                                    </h4>
                                    <span>Teacher</span>
                                </div>
                            </div>
                            <div class="content-schedules">
                                <h4>Schedules</h4>
                                <v-card outlined width="100%" class="schedule-items" v-for="(item, index) in class_details.schedules" :key="index">
                                    <v-card-subtitle>
                                        <h4>{{ item.day }}</h4>
                                        <v-icon small> mdi-clock-outline </v-icon>
                                        {{ item.time_start + " - " + item.time_end }}
                                    </v-card-subtitle>
                                </v-card>
                            </div>
                        </div>
                    </div>
                    <v-card-actions class="justify-end">
                        <v-btn color="primary" @click="search_class()" v-if="class_code_status"> Search Class</v-btn>
                        <v-btn color="primary" @click="enroll_new_class()" v-else> Enroll Class </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { StudentClassData } from "@/store/Student/StudentClassData";
import SuccessSnackbar from "@/components/Commons/snackbars/Success.vue";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
    props: {
        dialog_prop: Object,
    },

    components: {
        SuccessSnackbar,
    },

    mixins: [validationMixin],

    validations: {
        class_code: { required, maxLength: maxLength(9) },
    },

    data() {
        return {
            student_class: StudentClassData(),
            success_snackbar: {
                status: false,
                message: "",
            },
            dialog: false,
            class_code: "",
            error_message: false,
            error: "",
            class_code_status: true,
            class_details: null,
        };
    },

    methods: {
        async enroll_new_class() {
            this.$v.$touch();
            if (this.classCodeErrors.length == 0) {
                const results = await this.student_class.join_class(this.class_code);
                if (results === true) {
                    this.showSuccessMessage("Successfully requested");
                    this.close_dialog();
                } else {
                    this.error_message = true;
                    this.error = this.student_class.error;
                }
            }
        },

        async search_class() {
            this.$v.$touch();
            if (this.classCodeErrors.length == 0) {
                const results = await this.student_class.class_details(this.class_code);
                if (results.statusText === "OK") {
                    this.class_code_status = false;
                    this.class_details = JSON.parse(JSON.stringify(results.data.Class));
                } else {
                    this.error_message = true;
                    this.error = this.student_class.error;
                }
            }
        },

        showSuccessMessage(message) {
            this.success_snackbar.status = true;
            this.success_snackbar.message = message;
        },

        close_dialog() {
            this.$v.$reset();
            this.error_message = false;
            this.class_code = "";
            this.class_code_status = true;
            this.dialog = false;
        },
    },

    computed: {
        classCodeErrors() {
            const errors = [];
            if (!this.$v.class_code.$dirty) return errors;
            !this.$v.class_code.required && errors.push("Class code is required");
            !this.$v.class_code.maxLength && errors.push("Class code must be at most 7 characters long");
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

.body-content {
    width: 100%;
    display: flex;
    gap: 1em;
}

.content-teacher {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.teacher-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
}

.content-teacher img {
    border: 1px solid rgb(228, 228, 228);
    object-fit: cover;
    width: 8em;
    height: 8em;
    border-radius: 5%;
}

.content-schedules {
    flex: 2.5;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.schedule-items {
    display: flex;
    flex-direction: column;
}
</style>
