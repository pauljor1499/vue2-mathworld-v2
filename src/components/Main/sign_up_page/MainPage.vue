<template>
    <div class="sign-up-page">
        <v-card class="content-body" width="650" id="signUp">
            <v-card-title class="justify-center">
                <h5>Create New Account</h5>
            </v-card-title>
            <v-row dense>
                <v-col cols="12">
                    <v-alert id="success-message" text outlined type="error" color="deep-orange" v-if="error.status">
                        <span> {{ error.message }} </span>
                    </v-alert>
                </v-col>
                <v-col cols="12">
                    <v-alert
                        id="error-message"
                        text
                        outlined
                        type="success"
                        color="success"
                        v-if="show_success_message"
                        @click:dismissible="this.show_success_message = false"
                    >
                        <v-row dense>
                            <v-col cols="12">
                                <span> Account successfully registered </span>
                            </v-col>
                            <v-col cols="12">
                                <span>
                                    Click
                                    <router-link to="/signin"> here </router-link>
                                    to sign in
                                </span>
                            </v-col>
                        </v-row>
                    </v-alert>
                </v-col>
                <v-col cols="12" sm="6">
                    <span>First name</span>
                    <span style="color: red">*</span>
                    <v-text-field
                        id="input-firstname"
                        v-model="user.first_name"
                        @keypress="isLetter($event)"
                        :error-messages="first_nameErrors"
                        :counter="25"
                        label="First name"
                        outlined
                        required
                        flat
                        solo
                        @input="$v.user.first_name.$touch()"
                        @blur="$v.user.first_name.$touch()"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <span>Middle name</span>
                    <v-text-field
                        id="input-middlename"
                        v-model="user.middle_name"
                        @keypress="isLetter($event)"
                        :error-messages="middle_nameErrors"
                        :counter="25"
                        label="Middle name (Optional)"
                        outlined
                        flat
                        solo
                        @input="$v.user.middle_name.$touch()"
                        @blur="$v.user.middle_name.$touch()"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <span>Last name</span>
                    <span style="color: red">*</span>
                    <v-text-field
                        id="input-lastname"
                        v-model="user.last_name"
                        @keypress="isLetter($event)"
                        :error-messages="last_nameErrors"
                        :counter="25"
                        label="Last name"
                        outlined
                        required
                        flat
                        solo
                        @input="$v.user.last_name.$touch()"
                        @blur="$v.user.last_name.$touch()"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <span>Role</span>
                    <span style="color: red">*</span>
                    <v-select
                        id="input-role"
                        v-model="user.role"
                        :items="items"
                        :error-messages="roleErrors"
                        label="Role"
                        flat
                        outlined
                        solo
                        required
                        @change="$v.user.role.$touch()"
                        @blur="$v.user.role.$touch()"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <span>School</span>
                    <span style="color: red">*</span>
                    <v-text-field
                        id="input-school"
                        v-model="user.school"
                        @keypress="isLetter($event)"
                        :error-messages="schoolErrors"
                        :counter="35"
                        label="School"
                        outlined
                        required
                        flat
                        solo
                        @input="$v.user.school.$touch()"
                        @blur="$v.user.school.$touch()"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <span>Email</span>
                    <span style="color: red">*</span>
                    <v-text-field
                        id="input-email"
                        v-model="user.email"
                        :error-messages="emailErrors"
                        :counter="25"
                        label="Email"
                        placeholder="sample@email.com"
                        outlined
                        required
                        flat
                        solo
                        @input="$v.user.email.$touch()"
                        @blur="$v.user.email.$touch()"
                    />
                </v-col>
                <v-col cols="12">
                    <span>Password</span>
                    <span style="color: red">*</span>
                    <v-text-field
                        id="input-password"
                        v-model="user.password"
                        :error-messages="passwordErrors"
                        :append-icon="show_eye ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show_eye ? 'text' : 'password'"
                        name="input-10-2"
                        label="Password"
                        :counter="25"
                        outlined
                        required
                        flat
                        solo
                        @click:append="show_eye = !show_eye"
                        @input="$v.user.password.$touch()"
                        @blur="$v.user.password.$touch()"
                    />
                </v-col>
                <template v-if="this.user.role === 'Student'">
                    <v-col cols="12">
                        <v-divider></v-divider>
                        <br />
                        <h4>Contact Person</h4>
                        <br />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span>First name</span>
                        <span style="color: red">*</span>
                        <v-text-field
                            id="contact-firstname"
                            v-model="contact.first_name"
                            @keypress="isLetter($event)"
                            :error-messages="contact_first_nameErrors"
                            :counter="25"
                            label="First name"
                            outlined
                            required
                            flat
                            solo
                            @input="$v.contact.first_name.$touch()"
                            @blur="$v.contact.first_name.$touch()"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span>Middle name</span>
                        <v-text-field
                            id="contact-middlename"
                            v-model="contact.middle_name"
                            @keypress="isLetter($event)"
                            :error-messages="contact_middle_nameErrors"
                            :counter="25"
                            label="Middle name (Optional)"
                            outlined
                            flat
                            solo
                            @input="$v.contact.middle_name.$touch()"
                            @blur="$v.contact.middle_name.$touch()"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span>Last name</span>
                        <span style="color: red">*</span>
                        <v-text-field
                            id="contact-lastname"
                            v-model="contact.last_name"
                            @keypress="isLetter($event)"
                            :error-messages="contact_last_nameErrors"
                            :counter="25"
                            label="Last name"
                            outlined
                            required
                            flat
                            solo
                            @input="$v.contact.last_name.$touch()"
                            @blur="$v.contact.last_name.$touch()"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span>Relationship</span>
                        <span style="color: red">*</span>
                        <v-text-field
                            id="contact-relationship"
                            v-model="contact.relationship"
                            @keypress="isLetter($event)"
                            :error-messages="relationshipErrors"
                            :counter="25"
                            label="Relationship"
                            outlined
                            required
                            flat
                            solo
                            @input="$v.contact.relationship.$touch()"
                            @blur="$v.contact.relationship.$touch()"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span>Country</span>
                        <span style="color: red">*</span>
                        <v-autocomplete
                            id="contact-country"
                            v-model="contact.country"
                            @change="getStatesAndCodes()"
                            :items="[`United States`]"
                            :error-messages="countryErrors"
                            label="Country"
                            outlined
                            required
                            flat
                            solo
                            @input="$v.contact.country.$touch()"
                            @blur="$v.contact.country.$touch()"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span>State</span>
                        <span style="color: red">*</span>
                        <v-autocomplete
                            id="contact-state"
                            v-model="contact.state"
                            @change="getCities()"
                            :items="states"
                            :error-messages="stateErrors"
                            label="State"
                            outlined
                            required
                            flat
                            solo
                            @input="$v.contact.state.$touch()"
                            @blur="$v.contact.state.$touch()"
                        >
                            <template v-slot:no-data>
                                <div class="waiting-label">Please wait...</div>
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span>City</span>
                        <span style="color: red">*</span>
                        <v-autocomplete
                            id="contact-city"
                            v-model="contact.city"
                            :items="cities"
                            :error-messages="cityErrors"
                            label="City"
                            outlined
                            required
                            flat
                            solo
                            @input="$v.contact.city.$touch()"
                            @blur="$v.contact.city.$touch()"
                        >
                            <template v-slot:no-data>
                                <div class="waiting-label">Please wait...</div>
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span>Street</span>
                        <span style="color: red">*</span>
                        <v-text-field
                            id="contact-street"
                            v-model="contact.street"
                            :error-messages="streetErrors"
                            :counter="25"
                            label="Street"
                            outlined
                            required
                            flat
                            solo
                            @input="$v.contact.street.$touch()"
                            @blur="$v.contact.street.$touch()"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span>ZIP Code</span>
                        <span style="color: red">*</span>
                        <v-text-field
                            id="contact-zipcode"
                            v-model="contact.zip_code"
                            :error-messages="zip_codeErrors"
                            type="number"
                            hide-spin-buttons
                            min="0"
                            max="9"
                            :counter="9"
                            label="ZIP Code"
                            outlined
                            required
                            flat
                            solo
                            @input="$v.contact.zip_code.$touch()"
                            @blur="$v.contact.zip_code.$touch()"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <br />
                        <v-text-field
                            id="contact-phone"
                            v-model="contact.phone"
                            :error-messages="phoneErrors"
                            :counter="10"
                            :prefix="dial_code"
                            type="number"
                            hide-spin-buttons
                            min="0"
                            max="9"
                            label="Phone Number (Optional)"
                            outlined
                            @input="$v.contact.phone.$touch()"
                            @blur="$v.contact.phone.$touch()"
                        />
                    </v-col>
                </template>
                <v-col cols="12">
                    <br />
                    <span>
                        Asterisk (
                        <span style="color: red">*</span>
                        ) means required
                    </span>
                    <v-btn id="button-create" x-large width="100%" color="primary" dark :loading="loading" @click="submit()">
                        <span>CREATE ACCOUNT</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import { TeacherData } from "@/store/Teacher/TeacherData.js";
import { StudentData } from "@/store/Student/StudentData.js";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { TeacherService } from "@/api/Teacher_API/teacher_service";
import axios from "axios";

var BASE_URL = "https://countriesnow.space/api/v0.1/countries/";

export default {
    mixins: [validationMixin],

    validations: {
        user: {
            first_name: { required, maxLength: maxLength(25) },
            middle_name: { maxLength: maxLength(25) },
            last_name: { required, maxLength: maxLength(25) },
            role: { required },
            school: { required, maxLength: maxLength(35) },
            email: { required, email, maxLength: maxLength(25) },
            password: { required, maxLength: maxLength(25) },
        },

        contact: {
            first_name: { required, maxLength: maxLength(25) },
            middle_name: { maxLength: maxLength(25) },
            last_name: { required, maxLength: maxLength(25) },
            relationship: { required, maxLength: maxLength(25) },
            phone: { maxLength: maxLength(10) },
            country: { required },
            state: { required },
            city: { required },
            street: { required, maxLength: maxLength(25) },
            zip_code: { required, maxLength: maxLength(9) },
        },
    },

    data: () => ({
        teacher_store: TeacherData(),
        student_store: StudentData(),

        loading: false,

        user: {
            first_name: "",
            middle_name: "",
            last_name: "",
            role: "",
            school: "",
            email: "",
            password: "",
        },

        contact: {
            first_name: "",
            middle_name: "",
            last_name: "",
            relationship: "",
            phone: "",
            country: "",
            state: "",
            city: "",
            street: "",
            zip_code: "",
        },

        countries: [],
        states: [],
        cities: [],
        zip_codes: [],
        dial_code: "",

        items: ["Student", "Teacher"],
        show_eye: false,
        error: {
            status: false,
            message: "",
        },
        show_success_message: false,
    }),

    computed: {
        first_nameErrors() {
            const errors = [];
            if (!this.$v.user.first_name.$dirty) return errors;
            !this.$v.user.first_name.maxLength && errors.push("First name may not be longer than 25 characters");
            !this.$v.user.first_name.required && errors.push("First name is required");
            return errors;
        },

        middle_nameErrors() {
            const errors = [];
            if (!this.$v.user.middle_name.$dirty) return errors;
            !this.$v.user.middle_name.maxLength && errors.push("Middle name may not be longer than 25 characters");
            return errors;
        },

        last_nameErrors() {
            const errors = [];
            if (!this.$v.user.last_name.$dirty) return errors;
            !this.$v.user.last_name.maxLength && errors.push("Last name may not be longer than 25 characters");
            !this.$v.user.last_name.required && errors.push("Last name is required");
            return errors;
        },

        roleErrors() {
            const errors = [];
            if (!this.$v.user.role.$dirty) return errors;
            !this.$v.user.role.required && errors.push("Role is required");
            return errors;
        },

        schoolErrors() {
            const errors = [];
            if (!this.$v.user.school.$dirty) return errors;
            !this.$v.user.school.maxLength && errors.push("School may not be longer than 35 characters");
            !this.$v.user.school.required && errors.push("School is required");
            return errors;
        },

        emailErrors() {
            const errors = [];
            if (!this.$v.user.email.$dirty) return errors;
            !this.$v.user.email.required && errors.push("E-mail is required");
            !this.$v.user.email.maxLength && errors.push("E-mail may not be longer than 25 characters");
            if (this.user.email.length < 8) {
                errors.push("E-mail must be at least 8 characters long");
            }
            if (this.user.email.indexOf(" ") !== -1) {
                errors.push("E-mail must not contain spaces");
            }
            !this.$v.user.email.email && errors.push("Must be valid e-mail");
            return errors;
        },

        passwordErrors() {
            const errors = [];
            if (!this.$v.user.password.$dirty) return errors;
            !this.$v.user.password.maxLength && errors.push("Password may not be longer than 25 characters");
            !this.$v.user.password.required && errors.push("Password is required");
            if (this.user.password.length < 8) {
                errors.push("Password must be at least 8 characters long");
            }
            if (this.user.password.indexOf(" ") !== -1) {
                errors.push("Password must not contain spaces");
            }
            if (this.user.password.toLowerCase() === this.user.password) {
                errors.push("Password must contain at least one uppercase letter");
            }
            if (this.user.password.toUpperCase() === this.user.password) {
                errors.push("Password must contain at least one lowercase letter");
            }
            if (this.user.password.search(/[0-9]/) === -1) {
                errors.push("Password must contain at least one number");
            }
            if (this.user.password.search(/[^a-zA-Z0-9]/) === -1) {
                errors.push("Password must contain at least one special character");
            }
            return errors;
        },

        contact_first_nameErrors() {
            const errors = [];
            if (!this.$v.contact.first_name.$dirty) return errors;
            !this.$v.contact.first_name.maxLength && errors.push("First name may not be longer than 25 characters");
            !this.$v.contact.first_name.required && errors.push("First name is required");
            return errors;
        },

        contact_middle_nameErrors() {
            const errors = [];
            if (!this.$v.contact.middle_name.$dirty) return errors;
            !this.$v.contact.middle_name.maxLength && errors.push("Middle name may not be longer than 25 characters");

            return errors;
        },

        contact_last_nameErrors() {
            const errors = [];
            if (!this.$v.contact.last_name.$dirty) return errors;
            !this.$v.contact.last_name.maxLength && errors.push("Last name may not be longer than 25 characters");
            !this.$v.contact.last_name.required && errors.push("Last name is required");
            return errors;
        },

        relationshipErrors() {
            const errors = [];
            if (!this.$v.contact.relationship.$dirty) return errors;
            !this.$v.contact.relationship.maxLength && errors.push("Relationship may not be longer than 25 characters");
            !this.$v.contact.relationship.required && errors.push("Relationship is required");
            return errors;
        },

        countryErrors() {
            const errors = [];
            if (!this.$v.contact.country.$dirty) return errors;
            !this.$v.contact.country.required && errors.push("Country is required");
            return errors;
        },

        phoneErrors() {
            const errors = [];
            if (!this.$v.contact.phone.$dirty) return errors;
            !this.$v.contact.phone.maxLength && errors.push("Phone number must be 10 digits long");
            if (this.contact.phone !== "" && this.contact.phone.length !== 10) {
                errors.push("Phone number must be 10 digits long");
            }
            return errors;
        },

        stateErrors() {
            const errors = [];
            if (!this.$v.contact.state.$dirty) return errors;
            !this.$v.contact.state.required && errors.push("State is required");
            return errors;
        },

        cityErrors() {
            const errors = [];
            if (!this.$v.contact.city.$dirty) return errors;
            !this.$v.contact.city.required && errors.push("City is required");
            return errors;
        },

        streetErrors() {
            const errors = [];
            if (!this.$v.contact.street.$dirty) return errors;
            !this.$v.contact.street.maxLength && errors.push("Street may not be longer than 25 characters");
            !this.$v.contact.street.required && errors.push("Street is required");
            return errors;
        },

        zip_codeErrors() {
            const errors = [];
            if (!this.$v.contact.zip_code.$dirty) return errors;
            !this.$v.contact.zip_code.required && errors.push("ZIP code is required");
            if (this.contact.zip_code.length == 5 || this.contact.zip_code.length == 9) {
                errors.length = 0;
            } else {
                errors.push("ZIP code must be 5 or 9 characters long");
            }
            return errors;
        },
    },

    methods: {
        hasErrors() {
            if (this.user.role === "Student") {
                if (
                    this.first_nameErrors.length != 0 ||
                    this.middle_nameErrors.length != 0 ||
                    this.last_nameErrors.length != 0 ||
                    this.roleErrors.length != 0 ||
                    this.schoolErrors.length != 0 ||
                    this.emailErrors.length != 0 ||
                    this.passwordErrors.length != 0 ||
                    this.contact_first_nameErrors.length != 0 ||
                    this.contact_middle_nameErrors.length != 0 ||
                    this.contact_last_nameErrors.length != 0 ||
                    this.relationshipErrors.length != 0 ||
                    this.countryErrors.length != 0 ||
                    this.phoneErrors.length != 0 ||
                    this.streetErrors.length != 0 ||
                    this.cityErrors.length != 0 ||
                    this.stateErrors.length != 0 ||
                    this.zip_codeErrors.length != 0
                ) {
                    this.show_success_message = false;
                    return true;
                } else {
                    return false;
                }
            } else {
                if (
                    this.first_nameErrors.length != 0 ||
                    this.middle_nameErrors.length != 0 ||
                    this.last_nameErrors.length != 0 ||
                    this.roleErrors.length != 0 ||
                    this.schoolErrors.length != 0 ||
                    this.emailErrors.length != 0 ||
                    this.passwordErrors.length != 0
                ) {
                    this.show_success_message = false;
                    return true;
                } else {
                    return false;
                }
            }
        },

        async submit() {
            this.$v.$touch();
            this.error.status = false;
            this.show_success_message = false;

            if (!this.hasErrors()) {
                if (this.user.role === "Teacher") {
                    const isVerified = TeacherService.prototype.verify_teacher(this.user);
                    if (isVerified) {
                        const response = await this.register_teacher(this.user);
                        if (response == true) {
                            this.show_success_message = true;
                            this.resetFields();
                        } else {
                            this.error.status = true;
                            this.error.message = this.teacher_store.error;
                        }
                    } else {
                        this.error.status = true;
                        this.error.message = "The provided email is not a client email. Please use your school email instead.";
                    }
                } else if (this.user.role === "Student") {
                    const response = await this.register_student(this.user, this.contact);
                    if (response == true) {
                        this.show_success_message = true;
                        this.resetFields();
                    } else {
                        this.error.status = true;
                        this.error.message = this.student_store.error;
                    }
                }
            }
        },

        async register_student(data, contact) {
            this.loading = true;
            var obj = {
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name,
                role: "student",
                school: data.school,
                email: data.email,
                password: data.password,
                repeat_password: data.password,
                contact_person: {
                    first_name: contact.first_name,
                    middle_name: contact.middle_name,
                    last_name: contact.last_name,
                    relationship: contact.relationship,
                    country: contact.country,
                    state: contact.state,
                    city: contact.city,
                    street: contact.street,
                    zip_code: contact.zip_code,
                    phone_number: contact.phone,
                },
            };
            var result = await this.student_store.register_student(obj);
            this.loading = this.student_store.loading;
            return result;
        },

        async register_teacher(data) {
            this.loading = true;
            var obj = {
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name,
                role: "teacher",
                school: data.school,
                email: data.email,
                password: data.password,
                repeat_password: data.password,
            };
            var result = await this.teacher_store.register_teacher(obj);
            this.loading = this.teacher_store.loading;
            return result;
        },

        resetFields() {
            this.$v.$reset();
            Object.keys(this.user).forEach((key) => (this.user[key] = ""));
            Object.keys(this.contact).forEach((key) => (this.contact[key] = ""));
        },

        //to only accept letter
        isLetter(e) {
            let char = String.fromCharCode(e.keyCode);
            if (/^[A-Za-z ]+$/.test(char)) return true;
            else e.preventDefault();
        },

        getCountries() {
            axios
                .get(BASE_URL + "states")
                .then((response) => {
                    response.data.data.forEach((country) => {
                        this.countries.push(country.name);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        getStatesAndCodes() {
            this.getStates();
            this.getCountryDialCode();
        },

        getStates() {
            this.contact.state = "";
            this.states = [];
            axios
                .post(BASE_URL + "states", {
                    country: this.contact.country,
                })
                .then((response) => {
                    response.data.data.states.forEach((state) => {
                        this.states.push(state.name);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        getCountryDialCode() {
            this.dial_code = "";
            axios
                .post(BASE_URL + "codes", {
                    country: this.contact.country,
                })
                .then((response) => {
                    this.dial_code = response.data.data.dial_code;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        getCities() {
            this.contact.city = "";
            this.cities = [];
            axios
                .post(BASE_URL + "state/cities", {
                    country: this.contact.country,
                    state: this.contact.state,
                })
                .then((response) => {
                    response.data.data.forEach((city) => {
                        this.cities.push(city);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },

    created() {
        this.getCountries();
    },
};
</script>

<style scoped>
* {
    text-transform: none;
    text-decoration: none;
}

.sign-up-page {
    max-width: 100%;
    max-height: 100%;
    padding: 10%;
    background-color: #0091de;
}

.content-body {
    width: 100%;
    padding: 4%;
    margin: auto;
}

.waiting-label {
    padding: 5%;
}

#signUp {
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
    .sign-up-page {
        padding: 5%;
    }
}
</style>
