<template>
    <div class="main-content">
        <SuccessSnackbar
            :text="success_snackbar.message"
            v-if="success_snackbar.status"
            @closeSnackbar="success_snackbar.status = false"
        />
        <div class="text-center">
            <v-dialog
                v-if="store.loading ? (dialog = true) : ''"
                persistent
                v-model="dialog"
                width="250"
            >
                <v-card>
                    <v-card-title></v-card-title>
                    <v-card-text class="justify-center">
                        <v-progress-circular indeterminate color="primary" />
                        <span class="text-h7"> Please wait... </span>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
        <body v-if="store.current_user != null">
            <div class="content-title">
                <h2>My Profile</h2>
            </div>
            <div class="content-body">
                <div class="left-section">
                    <div class="student-section">
                        <div class="student-actions">
                            <v-fab-transition>
                                <AddNewPhoto
                                    @clickUploadPhoto="uploadPhoto($event)"
                                    v-show="edit_mode"
                                />
                            </v-fab-transition>
                        </div>
                        <div class="student-image">
                            <img
                                src="@/assets/default_image.png"
                                alt="Student Photo"
                                v-if="
                                    store.current_user.credentials.photo == null
                                "
                            />
                            <img
                                src="@/assets/default_image.png"
                                alt="No Photo"
                                v-else-if="
                                    store.current_user.credentials.photo == ''
                                "
                            />
                            <img
                                :src="store.current_user.credentials.photo"
                                alt="No Photo"
                                v-else
                            />
                        </div>
                    </div>
                </div>
                <div class="right-section">
                    <div class="student-credentials">
                        <div class="credentials-header">
                            <div class="student-name">
                                {{
                                    store.current_user.credentials.name
                                        .first_name +
                                    " " +
                                    store.current_user.credentials.name
                                        .middle_name +
                                    " " +
                                    store.current_user.credentials.name
                                        .last_name
                                }}
                            </div>
                            <div>
                                {{
                                    store.current_user.credentials.account.email
                                }}
                            </div>
                            <div>
                                {{ store.current_user.role }}
                            </div>
                        </div>
                        <div>
                            <v-btn
                                outlined
                                color="primary"
                                @click="edit_mode = !edit_mode"
                                v-show="!edit_mode"
                                id="edit-profile"
                            >
                                Edit Profile
                            </v-btn>
                            <v-btn
                                outlined
                                color="error"
                                @click="edit_mode = !edit_mode"
                                v-show="edit_mode"
                            >
                                Exit Edit Mode
                            </v-btn>
                        </div>
                    </div>
                    <div class="student-section">
                        <div class="section-header">
                            <div class="header-title">School</div>
                            <div v-if="edit_mode">
                                <UpdateSchoolDetails
                                    @addSchoolDetails="addSchoolDetails($event)"
                                    :school_details="
                                        store.current_user.credentials.school
                                    "
                                />
                            </div>
                        </div>
                        <v-card outlined class="section-body">
                            <v-card-text>
                                <p
                                    v-if="
                                        store.current_user.credentials.school !=
                                        null
                                    "
                                >
                                    {{ store.current_user.credentials.school }}
                                </p>
                                <p v-else>
                                    <i>No School Details</i>
                                </p>
                            </v-card-text>
                        </v-card>
                    </div>
                    <div class="student-section">
                        <div class="section-header">
                            <div class="header-title">Contact Person</div>
                            <div v-show="edit_mode">
                                <UpdateContactPerson
                                    @updateContactPerson="
                                        updateContactPerson($event)
                                    "
                                    :contact_person="
                                        store.current_user.credentials
                                            .contact_person
                                    "
                                />
                            </div>
                        </div>
                        <v-card outlined class="section-body">
                            <v-card-text>
                                <span>
                                    {{
                                        store.current_user.credentials
                                            .contact_person.first_name +
                                        " " +
                                        store.current_user.credentials
                                            .contact_person.middle_name +
                                        " " +
                                        store.current_user.credentials
                                            .contact_person.last_name
                                    }}
                                </span>
                                <br />
                                <span>
                                    {{
                                        store.current_user.credentials
                                            .contact_person.relationship
                                    }}
                                </span>
                                <span>
                                    <br />
                                    {{
                                        store.current_user.credentials
                                            .contact_person.street +
                                        ", " +
                                        store.current_user.credentials
                                            .contact_person.city +
                                        ", " +
                                        store.current_user.credentials
                                            .contact_person.state +
                                        ", " +
                                        store.current_user.credentials
                                            .contact_person.country
                                    }}
                                </span>
                                <span
                                    v-if="
                                        store.current_user.credentials
                                            .contact_person.phone != ''
                                    "
                                >
                                    <br />
                                    {{
                                        store.current_user.credentials
                                            .contact_person.phone
                                    }}
                                </span>
                                <span>
                                    <br />
                                    {{
                                        store.current_user.credentials
                                            .contact_person.zip_code
                                    }}
                                </span>
                                <br />
                            </v-card-text>
                        </v-card>
                    </div>
                    <div class="student-section">
                        <div class="section-header">
                            <div class="header-title">Account Settings</div>
                        </div>
                        <div class="section-body">
                            <UpdateAccount
                                @updateAccount="updateAccount($event)"
                                :account_email="
                                    store.current_user.credentials.account.email
                                "
                                :account_password="
                                    store.current_user.credentials.account
                                        .password
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </div>
</template>

<script>
import { storeCurrentUser } from "@/store/CurrentUser";
import { ProfilePageService } from "@/api/Student/profile_page/ProfiilePageData.js";
import SuccessSnackbar from "@/components/Student/main/snackbars/Success.vue";
import AddNewPhoto from "./Modal/AddNewPhoto.vue";
import UpdateSchoolDetails from "./Modal/SchoolDetails.vue";
import UpdateContactPerson from "./Modal/ContactPerson.vue";
import UpdateAccount from "./Modal/AccountSettings.vue";

export default {
    components: {
        SuccessSnackbar,
        AddNewPhoto,
        UpdateSchoolDetails,
        UpdateContactPerson,
        UpdateAccount,
    },

    data: () => ({
        store: storeCurrentUser(),
        edit_mode: false,

        success_snackbar: {
            status: false,
            message: "",
        },
    }),

    methods: {
        uploadPhoto(photo) {
            ProfilePageService.prototype.uploadNewPhoto(photo);
            this.showSuccessMessage("Photo successfully uploaded");
        },

        addSchoolDetails(new_data) {
            ProfilePageService.prototype.update_school_details(new_data);
            this.showSuccessMessage("School details updated");
        },

        updateContactPerson(new_data) {
            ProfilePageService.prototype.update_contact_person(new_data);
            this.showSuccessMessage("Contact person updated");
        },

        updateAccount(new_data) {
            ProfilePageService.prototype.update_password(new_data);
            this.showSuccessMessage("Password updated");
        },

        showSuccessMessage(message) {
            this.success_snackbar.status = true;
            this.success_snackbar.message = message;
        },
    },
};
</script>

<style scoped>
.main-content {
    max-width: 100%;
    max-height: 100%;
}

.v-btn {
    text-transform: none;
}

.content-title {
    display: flex;
    justify-content: space-between;
    padding: 25px 5% 25px 5%;
    background-color: #0091de;
}

.content-title h2 {
    color: #ffff;
}

.content-body {
    display: flex;
    gap: 5%;
    padding: 5% 15% 15% 15%;
}

.left-section {
    flex: 0.6;
}

.student-section {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.student-actions {
    position: absolute;
    margin-left: 10%;
    margin-top: 12%;
}

.student-image {
    width: 220px;
    height: 220px;
}

.student-image img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
}

.right-section {
    flex: 2;
    display: flex;
    flex-direction: column;
    row-gap: 50px;
}

.student-credentials {
    display: flex;
    justify-content: space-between;
}

.student-name {
    font-size: 1.3em;
    font-weight: bold;
}

.section-header {
    display: flex;
    column-gap: 10px;
}

.header-title {
    font-size: 1em;
    font-weight: bold;
}

.section-body {
    width: 100%;
    text-align: justify;
    text-justify: inter-word;
}
</style>
