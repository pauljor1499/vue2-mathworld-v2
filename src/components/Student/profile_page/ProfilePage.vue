<template>
    <div class="profile-page">
        <SuccessSnackbar :text="success_snackbar.message" v-if="success_snackbar.status" @closeSnackbar="success_snackbar.status = false" />
        <SimpleLoading :show_loading="student_store.loading" />
        <body v-if="student_store.user != null">
            <div class="content-title">
                <h2>My Profile</h2>
            </div>
            <div class="content-body">
                <div class="left-section">
                    <div class="student-section">
                        <div class="student-actions">
                            <v-fab-transition>
                                <AddNewPhoto
                                    @uploadProfilePhoto="uploadProfilePhoto($event)"
                                    @removeProfilePhoto="removeProfilePhoto()"
                                    v-show="edit_mode"
                                />
                            </v-fab-transition>
                        </div>
                        <div class="student-image">
                            <img src="@/assets/default_image.png" alt="Teacher Photo" v-if="student_store.user.profile_picture === null" />
                            <img :src="student_store.user.profile_picture" alt="No Photo" v-else />
                        </div>
                    </div>
                </div>
                <div class="right-section">
                    <div class="student-credentials">
                        <div class="credentials-header">
                            <div class="student-name">
                                {{ student_store.user.first_name + " " + student_store.user.middle_name + " " + student_store.user.last_name }}
                            </div>
                            <div>
                                {{ student_store.user.email }}
                            </div>
                            <div>
                                {{ student_store.user.role.charAt(0).toUpperCase() + student_store.user.role.slice(1) }}
                            </div>
                            <div>
                                {{ student_store.user.school }}
                            </div>
                        </div>
                        <div>
                            <v-btn outlined color="primary" @click="edit_mode = !edit_mode" v-show="!edit_mode" id="edit-profile">
                                Edit Profile
                            </v-btn>
                            <v-btn outlined color="error" @click="edit_mode = !edit_mode" v-show="edit_mode"> Exit Edit Mode </v-btn>
                        </div>
                    </div>
                    <div class="student-section">
                        <div class="section-header">
                            <div class="header-title">Contact Person</div>
                            <div v-show="edit_mode">
                                <UpdateContactPerson
                                    @updateContactPerson="updateContactPerson($event)"
                                    :contact_person="student_store.user.contact_person"
                                />
                            </div>
                        </div>
                        <v-card outlined class="section-body">
                            <v-card-text>
                                <span>
                                    {{
                                        student_store.user.contact_person.first_name +
                                        " " +
                                        student_store.user.contact_person.middle_name +
                                        " " +
                                        student_store.user.contact_person.last_name
                                    }}
                                </span>
                                <br />
                                <span>
                                    {{ student_store.user.contact_person.relationship }}
                                </span>
                                <span>
                                    <br />
                                    {{
                                        student_store.user.contact_person.street +
                                        ", " +
                                        student_store.user.contact_person.city +
                                        ", " +
                                        student_store.user.contact_person.state +
                                        ", " +
                                        student_store.user.contact_person.country +
                                        ", " +
                                        student_store.user.contact_person.zip_code
                                    }}
                                </span>
                                <span v-if="student_store.user.contact_person.phone_number != ''">
                                    <br />
                                    {{ "+" + student_store.user.contact_person.phone_number }}
                                </span>
                            </v-card-text>
                        </v-card>
                    </div>
                    <div class="student-section">
                        <div class="section-header">
                            <div class="header-title">Account Settings</div>
                        </div>
                        <div class="section-body">
                            <UpdateAccount @updateAccount="updateAccount($event)" :account_email="student_store.user.email" />
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </div>
</template>

<script>
import { StudentData } from "@/store/Student/StudentData";
import SimpleLoading from "@/components/Commons/loadings/SimpleLoading.vue";
import { storeCurrentUser } from "@/store/CurrentUser";
import SuccessSnackbar from "@/components/Commons/snackbars/Success.vue";
import AddNewPhoto from "./Modal/AddNewPhoto.vue";
import UpdateContactPerson from "./Modal/ContactPerson.vue";
import UpdateAccount from "./Modal/AccountSettings.vue";

export default {
    components: {
        SuccessSnackbar,
        SimpleLoading,
        AddNewPhoto,
        UpdateContactPerson,
        UpdateAccount,
    },

    data: () => ({
        student_store: StudentData(),
        store: storeCurrentUser(),
        edit_mode: false,

        success_snackbar: {
            status: false,
            message: "",
        },
    }),

    methods: {
        async uploadProfilePhoto(photo) {
            const results = await this.student_store.update_profile_photo(photo);
            if (results == true) {
                await this.student_store.get_account_data();
                this.showSuccessMessage("Profile photo successfully updated");
            }
        },

        async removeProfilePhoto() {
            const results = await this.student_store.remove_profile_photo();
            if (results == true) {
                await this.student_store.get_account_data();
                this.showSuccessMessage("Profile photo successfully removed");
            }
        },

        async updateContactPerson(new_data) {
            const updated_data = {
                first_name: new_data.first_name,
                middle_name: new_data.middle_name,
                last_name: new_data.last_name,
                relationship: new_data.relationship,
                country: new_data.country,
                state: new_data.state,
                city: new_data.city,
                street: new_data.street,
                zip_code: new_data.zip_code,
                phone_number: new_data.phone_number,
            };
            const results = await this.student_store.update_contact_person(updated_data);
            if (results == true) {
                this.student_store.get_account_data();
                this.showSuccessMessage("Office details successfully updated");
            }
        },

        async updateAccount(new_data) {
            const updated_data = {
                password: new_data.old_password,
                new_password: new_data.new_password,
            };
            const results = await this.student_store.change_password(updated_data);
            if (results == true) {
                this.showSuccessMessage("Password successfully updated");
            }
        },

        showSuccessMessage(message) {
            this.success_snackbar.status = true;
            this.success_snackbar.message = message;
        },
    },

    created() {
        this.student_store.get_account_data();
    },
};
</script>

<style scoped>
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

.student-image img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
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
