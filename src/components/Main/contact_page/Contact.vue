<template>
    <div class="contact-content">
        <div class="content-title">
            <h1 style="color: var(--blue-1)">Get in Touch</h1>
            <p></p>
        </div>
        <br />
        <div class="content-body">
            <div class="contact-fields" v-if="!submitted">
                <v-card flat>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="Name"
                                    v-model="contact.name"
                                    @keypress="isLetter($event)"
                                    :error-messages="nameErrors"
                                    :counter="25"
                                    outlined
                                    required
                                    flat
                                    solo
                                    @input="$v.contact.name.$touch()"
                                    @blur="$v.contact.name.$touch()"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="Phone (Optional)"
                                    :error-messages="phoneErrors"
                                    :counter="10"
                                    prefix="+1"
                                    type="number"
                                    hide-spin-buttons
                                    min="0"
                                    max="9"
                                    outlined
                                    @input="$v.contact.phone.$touch()"
                                    @blur="$v.contact.phone.$touch()"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="E-mail"
                                    v-model="contact.email"
                                    :error-messages="emailErrors"
                                    :counter="25"
                                    placeholder="sample@email.com"
                                    outlined
                                    required
                                    flat
                                    solo
                                    @input="$v.contact.email.$touch()"
                                    @blur="$v.contact.email.$touch()"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6"> </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    label="Message"
                                    v-model="contact.message"
                                    @keypress="isLetter($event)"
                                    :error-messages="messageErrors"
                                    :counter="100"
                                    outlined
                                    required
                                    flat
                                    solo
                                    @input="$v.contact.message.$touch()"
                                    @blur="$v.contact.message.$touch()"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-btn color="primary" @click="submit_email()"> Submit </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </div>
            <div class="contact-response" v-else>
                <div>
                    <h1 style="color: var(--blue-1)">Thank you for contacting us!</h1>
                    <p>
                        We have received your email and appreciate you taking the time to get in touch with us. Our team is already on it and will
                        review your message promptly. We strive to provide excellent customer service, and we'll do our best to address your inquiry
                        as soon as possible. If your matter is urgent, please don't hesitate to give us a call at (+88) 872-670-780.
                    </p>
                </div>
            </div>
            <v-card class="contact-details" flat color="var(--blue-2)">
                <v-card-title style="color: var(--blue-1)"> Contact Details </v-card-title>
                <v-card-text class="details-content">
                    <div class="details-item">
                        <div class="item-icon"><v-icon color="var(--blue-1)">mdi-phone-outline</v-icon></div>
                        <div class="item-content">
                            <h3 style="color: var(--blue-1)">Phone</h3>
                            <span>(+88) 872-670-780</span>
                        </div>
                    </div>
                    <div class="details-item">
                        <div class="item-icon"><v-icon color="var(--blue-1)">mdi-email-outline</v-icon></div>
                        <div class="item-content">
                            <h3 style="color: var(--blue-1)">Email</h3>
                            <span>Info@example.com</span>
                        </div>
                    </div>
                    <div class="details-item">
                        <div class="item-icon"><v-icon color="var(--blue-1)">mdi-map-marker-outline</v-icon></div>
                        <div class="item-content">
                            <h3 style="color: var(--blue-1)">Location</h3>
                            <span>Abbot Kinney Blvd. New York,</span> <br />
                            <span>USA-5785</span>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
export default {
    mixins: [validationMixin],

    validations: {
        contact: {
            name: { required, maxLength: maxLength(25) },
            email: { required, email, maxLength: maxLength(25) },
            phone: { maxLength: maxLength(10) },
            message: { required, maxLength: maxLength(100) },
        },
    },

    data() {
        return {
            submitted: false,
            contact: {
                name: "",
                email: "",
                phone: "",
                message: "",
            },
        };
    },

    computed: {
        nameErrors() {
            const errors = [];
            if (!this.$v.contact.name.$dirty) return errors;
            !this.$v.contact.name.maxLength && errors.push("Name may not be longer than 25 characters");
            !this.$v.contact.name.required && errors.push("Name is required");
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

        emailErrors() {
            const errors = [];
            if (!this.$v.contact.email.$dirty) return errors;
            !this.$v.contact.email.required && errors.push("E-mail is required");
            !this.$v.contact.email.maxLength && errors.push("E-mail may not be longer than 25 characters");
            if (this.contact.email.length < 8) {
                errors.push("E-mail must be at least 8 characters long");
            }
            if (this.contact.email.indexOf(" ") !== -1) {
                errors.push("E-mail must not contain spaces");
            }
            !this.$v.contact.email.email && errors.push("Must be valid e-mail");
            return errors;
        },

        messageErrors() {
            const errors = [];
            if (!this.$v.contact.message.$dirty) return errors;
            !this.$v.contact.message.maxLength && errors.push("Message may not be longer than 100 characters");
            !this.$v.contact.message.required && errors.push("Message is required");
            return errors;
        },
    },

    methods: {
        submit_email() {
            this.$v.$touch();
            if (!this.hasErrors()) {
                this.submitted = true;
            }
        },

        hasErrors() {
            if (this.nameErrors.length != 0 || this.phoneErrors.length != 0 || this.emailErrors.length != 0 || this.messageErrors.length != 0) {
                return true;
            }
            return false;
        },

        isLetter(e) {
            let char = String.fromCharCode(e.keyCode);
            if (/^[A-Za-z ]+$/.test(char)) return true;
            else e.preventDefault();
        },
    },
};
</script>

<style scoped>
.contact-content {
    padding: 0 5% 5% 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.content-title {
    width: 75%;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
}

.content-body {
    width: 100%;
    display: flex;
    gap: 4rem;
}

.contact-fields,
.contact-response {
    flex: 2;
}

.contact-response {
    width: 100%;
    padding: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.contact-details {
    flex: 1;
    padding: 1rem;
}

.details-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.details-item {
    display: flex;
    flex-direction: row;
    gap: 5px;
}

@media only screen and (max-width: 800px) {
}

@media only screen and (max-width: 450px) {
    .contact-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
}
</style>
