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
                    <span>Edit Office Details</span>
                </v-toolbar>
                <v-card-text>
                    <br />
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field
                                v-model="office_details_new.location"
                                :error-messages="locationErrors"
                                :counter="25"
                                label="Location"
                                outlined
                                required
                                flat
                                @input="$v.office_details_new.location.$touch()"
                                @blur="$v.office_details_new.location.$touch()"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="office_details_new.conference_time"
                                :error-messages="timeErrors"
                                :counter="60"
                                label="Conference Details"
                                outlined
                                required
                                flat
                                @input="$v.office_details_new.conference_time.$touch()"
                                @blur="$v.office_details_new.conference_time.$touch()"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="office_details_new.phone_number"
                                :error-messages="phoneErrors"
                                :counter="10"
                                prefix="+1"
                                type="number"
                                hide-spin-buttons
                                min="0"
                                max="9"
                                label="Phone Number"
                                outlined
                                required
                                @input="$v.office_details_new.phone_number.$touch()"
                                @blur="$v.office_details_new.phone_number.$touch()"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-card-actions class="justify-end">
                                <v-btn color="primary" text @click="closeModal()"> Cancel </v-btn>
                                <v-btn color="primary" :disabled="has_errors" @click="updateDetails()"> Update </v-btn>
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
        office_details: Object,
    },

    mixins: [validationMixin],

    validations: {
        office_details_new: {
            location: { required, maxLength: maxLength(25) },
            conference_time: { required, maxLength: maxLength(60) },
            phone_number: { required, maxLength: maxLength(10) },
        },
    },

    data() {
        return {
            dialog: false,
            office_details_old: {
                conference_time: "",
                location: "",
                phone_number: "",
            },
            office_details_new: {
                conference_time: "",
                location: "",
                phone_number: "",
            },
        };
    },

    methods: {
        get_data() {
            if (this.office_details != null) {
                const data = {
                    location: this.office_details.location,
                    conference_time: this.office_details.conference_time,
                    phone_number: this.office_details.phone_number,
                };
                this.office_details_old = JSON.parse(JSON.stringify(data));
                this.office_details_new = JSON.parse(JSON.stringify(data));
            }
        },

        updateDetails() {
            this.$emit("updateOfficeDetails", this.office_details_new);
            this.closeModal();
        },

        closeModal() {
            this.$v.$reset();
            this.dialog = false;
        },
    },

    computed: {
        has_errors() {
            if (this.locationErrors.length != 0 || this.timeErrors.length != 0 || this.phoneErrors.length != 0 || this.no_changes) {
                return true;
            } else {
                return false;
            }
        },

        locationErrors() {
            const errors = [];
            if (!this.$v.office_details_new.location.$dirty) return errors;
            !this.$v.office_details_new.location.required && errors.push("Location name is required");
            !this.$v.office_details_new.location.maxLength && errors.push("Location may not be longer than 25 characters");
            return errors;
        },

        timeErrors() {
            const errors = [];
            if (!this.$v.office_details_new.conference_time.$dirty) return errors;
            !this.$v.office_details_new.conference_time.required && errors.push("Conference time is required");
            !this.$v.office_details_new.conference_time.maxLength && errors.push("Conference time may not be longer than 60 characters");
            return errors;
        },

        phoneErrors() {
            const errors = [];
            if (!this.$v.office_details_new.phone_number.$dirty) return errors;
            !this.$v.office_details_new.phone_number.required && errors.push("Phone number is required");
            !this.$v.office_details_new.phone_number.maxLength && errors.push("Phone number must be 10 digits long");
            if (this.office_details_new.phone_number !== "" && this.office_details_new.phone_number.length !== 10) {
                errors.push("Phone number must be 10 digits long");
            }
            return errors;
        },

        no_changes() {
            if (JSON.stringify(this.office_details_old) === JSON.stringify(this.office_details_new)) {
                return true;
            } else {
                false;
            }
        },
    },
};
</script>

<style scoped>
.v-btn {
    text-transform: none;
}
</style>
