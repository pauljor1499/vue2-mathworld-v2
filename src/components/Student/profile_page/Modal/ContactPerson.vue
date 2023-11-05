<template>
    <div class="main-content">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" @click="load_data()" fab x-small dark v-bind="attrs" v-on="on">
                    <v-icon dense>mdi-pencil</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="primary" dark>
                    <span>Contact Person</span>
                </v-toolbar>
                <v-card-text>
                    <br />
                    <v-row dense>
                        <v-col cols="6">
                            <v-text-field
                                id="contact-firstname"
                                v-model="contact.first_name"
                                @keypress="isLetter($event)"
                                :error-messages="contact_first_nameErrors"
                                :counter="25"
                                label="First name*"
                                outlined
                                required
                                @input="$v.contact.first_name.$touch()"
                                @blur="$v.contact.first_name.$touch()"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                id="contact-middlename"
                                v-model="contact.middle_name"
                                @keypress="isLetter($event)"
                                :error-messages="contact_middle_nameErrors"
                                :counter="25"
                                label="Middle name (Optional)"
                                outlined
                                @input="$v.contact.middle_name.$touch()"
                                @blur="$v.contact.middle_name.$touch()"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                id="contact-lastname"
                                v-model="contact.last_name"
                                @keypress="isLetter($event)"
                                :error-messages="contact_last_nameErrors"
                                :counter="25"
                                label="Last name*"
                                outlined
                                required
                                @input="$v.contact.last_name.$touch()"
                                @blur="$v.contact.last_name.$touch()"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                id="contact-relationship"
                                v-model="contact.relationship"
                                @keypress="isLetter($event)"
                                :error-messages="relationshipErrors"
                                :counter="25"
                                label="Relationship*"
                                outlined
                                required
                                @input="$v.contact.relationship.$touch()"
                                @blur="$v.contact.relationship.$touch()"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-autocomplete
                                id="contact-country"
                                v-model="contact.country"
                                @change="getStatesAndCodes()"
                                :items="[`United States`]"
                                :error-messages="countryErrors"
                                label="Country*"
                                outlined
                                required
                                @input="$v.contact.country.$touch()"
                                @blur="$v.contact.country.$touch()"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-autocomplete
                                id="contact-state"
                                v-model="contact.state"
                                @change="getCities()"
                                :items="states"
                                :error-messages="stateErrors"
                                label="State*"
                                outlined
                                required
                                @input="$v.contact.state.$touch()"
                                @blur="$v.contact.state.$touch()"
                            >
                                <template v-slot:no-data>
                                    <div class="waiting-label">Please wait...</div>
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="6">
                            <v-autocomplete
                                id="contact-city"
                                v-model="contact.city"
                                :items="cities"
                                :error-messages="cityErrors"
                                label="City*"
                                outlined
                                required
                                @input="$v.contact.city.$touch()"
                                @blur="$v.contact.city.$touch()"
                            >
                                <template v-slot:no-data>
                                    <div class="waiting-label">Please wait...</div>
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                id="contact-street"
                                v-model="contact.street"
                                :error-messages="streetErrors"
                                :counter="25"
                                label="Street*"
                                outlined
                                required
                                @input="$v.contact.street.$touch()"
                                @blur="$v.contact.street.$touch()"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                id="contact-zipcode"
                                v-model="contact.zip_code"
                                :error-messages="zip_codeErrors"
                                type="number"
                                hide-spin-buttons
                                min="0"
                                max="9"
                                :counter="9"
                                label="ZIP Code*"
                                outlined
                                required
                                @input="$v.contact.zip_code.$touch()"
                                @blur="$v.contact.zip_code.$touch()"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                id="contact-phone"
                                v-model="contact.phone_number"
                                :error-messages="phoneErrors"
                                :counter="10"
                                :prefix="dial_code"
                                type="number"
                                hide-spin-buttons
                                min="0"
                                max="9"
                                label="Phone Number"
                                outlined
                                @input="$v.contact.phone_number.$touch()"
                                @blur="$v.contact.phone_number.$touch()"
                            />
                        </v-col>
                        <!--  -->
                        <v-col cols="12">
                            <v-card-actions class="justify-end">
                                <v-btn color="primary" style="width: 100px" text @click="closeModal()"> Cancel </v-btn>
                                <v-btn color="primary" style="width: 100px" :disabled="false" @click="updateContactPerson()"> Save </v-btn>
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
import axios from "axios";

var BASE_URL = "https://countriesnow.space/api/v0.1/countries/";

export default {
    props: {
        contact_person: Object,
    },

    mixins: [validationMixin],

    validations: {
        contact: {
            first_name: { required, maxLength: maxLength(25) },
            middle_name: { maxLength: maxLength(25) },
            last_name: { required, maxLength: maxLength(25) },
            relationship: { required, maxLength: maxLength(25) },
            phone_number: { maxLength: maxLength(10) },
            country: { required },
            state: { required },
            city: { required },
            street: { required, maxLength: maxLength(25) },
            zip_code: { required, maxLength: maxLength(9) },
        },
    },

    data() {
        return {
            dialog: false,

            contact: {
                first_name: "",
                middle_name: "",
                last_name: "",
                relationship: "",
                phone_number: "",
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
        };
    },

    methods: {
        load_data() {
            this.contact = JSON.parse(JSON.stringify(this.contact_person));
            this.contact.phone_number = this.contact.phone_number.substring(1, 11);
        },

        hasErrors() {
            if (
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
        },

        updateContactPerson() {
            this.$v.$touch();
            if (!this.hasErrors()) {
                this.$emit("updateContactPerson", this.contact);
                this.closeModal();
            }
        },

        closeModal() {
            // this.input_field = "";
            this.$v.$reset();
            this.dialog = false;
        },

        //to only accept letter
        isLetter(e) {
            let char = String.fromCharCode(e.keyCode);
            if (/^[A-Za-z ]+$/.test(char)) return true;
            else e.preventDefault();
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
                    country: this.contact_person.country,
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
                    country: this.contact_person.country,
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
                    country: this.contact_person.country,
                    state: this.contact_person.state,
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

    computed: {
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
            if (!this.$v.contact.phone_number.$dirty) return errors;
            !this.$v.contact.phone_number.maxLength && errors.push("Phone number must be 10 digits long");
            if (this.contact.phone_number !== "" && this.contact.phone_number.length !== 10) {
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
            if (this.contact.zip_code.length == 5 || this.contact.zip_code.length == 9) {
                errors.length = 0;
            } else {
                errors.push("ZIP code must be 5 or 9 characters long");
            }
            !this.$v.contact.zip_code.required && errors.push("ZIP code is required");
            return errors;
        },
    },

    created() {
        this.getStatesAndCodes();
        this.getCities();
    },
};
</script>

<style scoped>
.main-content {
    position: absolute;
    margin-top: -0.5%;
}

.waiting-label {
    padding: 5%;
}

.v-btn {
    text-transform: none;
}
</style>
