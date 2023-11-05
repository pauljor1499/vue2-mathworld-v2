<template>
    <div>
        <SimpleLoading :show_loading="teacher_store.loading" />
        <SuccessSnackbar :text="success_snackbar.message" v-if="success_snackbar.status" @closeSnackbar="success_snackbar.status = false" />
        <div class="profile-page">
            <body v-if="teacher_store.user != null">
                <div class="content-title">
                    <h2>My Profile</h2>
                </div>
                <div class="content-body">
                    <div class="left-section">
                        <div class="teacher-section">
                            <div class="teacher-actions">
                                <v-fab-transition>
                                    <AddNewPhoto
                                        @uploadProfilePhoto="uploadProfilePhoto($event)"
                                        @removeProfilePhoto="removeProfilePhoto()"
                                        v-show="edit_mode"
                                    />
                                </v-fab-transition>
                            </div>
                            <div class="teacher-image">
                                <img src="@/assets/default_image.png" alt="Teacher Photo" v-if="teacher_store.user.profile_picture === null" />
                                <img :src="teacher_store.user.profile_picture" alt="No Photo" v-else />
                            </div>
                        </div>
                    </div>
                    <div class="right-section">
                        <div class="teacher-credentials">
                            <div class="credentials-header">
                                <div class="teacher-name">
                                    <div>
                                        {{
                                            teacher_store.user.first_name + " " + teacher_store.user.middle_name + " " + teacher_store.user.last_name
                                        }}
                                    </div>
                                    <div>
                                        <UpdateTeacherName
                                            v-show="edit_mode"
                                            :teacher_name="teacher_store.user"
                                            @updateTeacherName="updateTeacherName($event)"
                                        />
                                    </div>
                                </div>
                                <div>
                                    {{ teacher_store.user.email }}
                                </div>
                                <div>
                                    {{ teacher_store.user.role.charAt(0).toUpperCase() + teacher_store.user.role.slice(1) }}
                                </div>
                                <div>
                                    {{ teacher_store.user.school }}
                                </div>
                            </div>
                            <v-btn outlined color="primary" @click="edit_mode = !edit_mode" v-show="!edit_mode" id="edit-profile">
                                Edit Profile
                            </v-btn>
                            <v-btn outlined color="error" @click="edit_mode = !edit_mode" v-show="edit_mode">Exit Edit Mode</v-btn>
                        </div>
                        <div class="teacher-office">
                            <div class="office-title">
                                <div>Office Details</div>
                                <UpdateOfficeDetails
                                    :office_details="teacher_store.user.office_details"
                                    v-show="edit_mode"
                                    @updateOfficeDetails="updateOfficeDetails($event)"
                                />
                            </div>
                            <div class="office-body">
                                <div class="office-location">
                                    <div class="label">Location</div>
                                    <div class="text" v-if="teacher_store.user.office_details != null">
                                        {{ teacher_store.user.office_details.location }}
                                    </div>
                                    <div v-else>---</div>
                                </div>
                                <div class="office-time">
                                    <div class="label">Conference Time</div>
                                    <div class="text" v-if="teacher_store.user.office_details != null">
                                        {{ teacher_store.user.office_details.conference_time }}
                                    </div>
                                    <div v-else>---</div>
                                </div>
                                <div class="office-phone-number">
                                    <div class="label">Phone number</div>
                                    <div class="text" v-if="teacher_store.user.office_details != null">
                                        {{ "+1" + teacher_store.user.office_details.phone_number }}
                                    </div>
                                    <div v-else>---</div>
                                </div>
                            </div>
                        </div>
                        <div class="teacher-biography">
                            <div class="section-header">
                                <div class="biography-title">Biography</div>
                                <div>
                                    <UpdateBiography
                                        v-show="edit_mode"
                                        :biography_details="teacher_store.user.bio_description"
                                        @updateBiography="updateBiography($event)"
                                    />
                                </div>
                            </div>
                            <div class="biography-body">
                                <v-card outlined>
                                    <v-card-text>
                                        <div v-if="!teacher_store.user.bio_description == '' || !teacher_store.user.bio_description == null">
                                            {{ teacher_store.user.bio_description }}
                                        </div>
                                        <div v-else>
                                            <i>No Biography Details</i>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </div>
                        <div class="teacher-education">
                            <div class="section-header">
                                <div class="education-title">Education</div>
                                <AddNewItem v-show="edit_mode" @addEducation="addEducation($event)" />
                            </div>
                            <div class="education-body">
                                <v-card outlined v-for="(item, index) in teacher_store.user.education" :key="index">
                                    <v-card-text class="education-item">
                                        <div class="education-content">
                                            <div class="item-school">
                                                {{ item.school }}
                                            </div>
                                            <div class="item-course">
                                                {{ item.area_of_study }}
                                            </div>
                                            <div class="item-level">
                                                {{ item.degree }}
                                            </div>
                                            <div class="item-year">{{ item.year_started }}-{{ item.year_ended }}</div>
                                        </div>
                                        <div class="education-options">
                                            <RemoveItem
                                                v-if="edit_mode"
                                                :item_index="index"
                                                :education="item"
                                                @removeEducation="removeEducation($event)"
                                            />
                                            <UpdateItem
                                                v-if="edit_mode"
                                                :item_index="index"
                                                :education="item"
                                                @updateEducation="updateEducation($event)"
                                            />
                                        </div>
                                    </v-card-text>
                                </v-card>
                                <v-card outlined v-if="teacher_store.user.education.length == 0">
                                    <v-card-text>
                                        <span>
                                            <i>No Education Details</i>
                                        </span>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </div>
                        <div class="teacher-biography">
                            <div class="section-header">
                                <div class="biography-title">Account Settings</div>
                            </div>
                            <div class="biography-body">
                                <UpdateAccount @updateAccount="updateAccount($event)" :account_email="teacher_store.user.email" />
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    </div>
</template>

<script>
import { TeacherData } from "@/store/Teacher/TeacherData";
import { storeCurrentUser } from "@/store/CurrentUser";
import SimpleLoading from "@/components/Commons/loadings/SimpleLoading.vue";
import SuccessSnackbar from "@/components/Commons/snackbars/Success.vue";
import AddNewPhoto from "./Modal/Add/AddNewPhoto.vue";
import AddNewItem from "./Modal/Add/AddNewItem.vue";
import UpdateItem from "./Modal/Update/UpdateItem.vue";
import RemoveItem from "./Modal/Remove/RemoveItem.vue";
import UpdateBiography from "./Modal/Update/UpdateBiography.vue";
import UpdateAccount from "./Modal/Update/AccountSettings.vue";
import UpdateTeacherName from "./Modal/Update/TeacherName.vue";
import UpdateOfficeDetails from "./Modal/Update/OfficeDetails.vue";

export default {
    components: {
        AddNewPhoto,
        AddNewItem,
        UpdateItem,
        RemoveItem,
        UpdateBiography,
        UpdateAccount,
        UpdateTeacherName,
        UpdateOfficeDetails,
        SuccessSnackbar,
        SimpleLoading,
    },

    data: () => ({
        teacher_store: TeacherData(),
        store: storeCurrentUser(),
        edit_mode: false,
        dialog: false,
        success_snackbar: {
            status: false,
            message: "",
        },
    }),

    methods: {
        async updateTeacherName(new_data) {
            const updated_data = {
                first_name: new_data.first_name,
                middle_name: new_data.middle_name,
                last_name: new_data.last_name,
                bio_description: this.check_bio_details(this.teacher_store.user.bio_description),
                office_details: this.teacher_store.user.office_details,
            };
            const results = await this.teacher_store.update_user_details(updated_data);
            if (results == true) {
                this.teacher_store.get_account_data();
                this.showSuccessMessage("Name successfully updated");
            }
        },

        async updateOfficeDetails(new_data) {
            const updated_data = {
                first_name: this.teacher_store.user.first_name,
                middle_name: this.teacher_store.user.middle_name,
                last_name: this.teacher_store.user.last_name,
                bio_description: this.check_bio_details(this.teacher_store.user.bio_description),
                office_details: new_data,
            };
            const results = await this.teacher_store.update_user_details(updated_data);
            if (results == true) {
                this.teacher_store.get_account_data();
                this.showSuccessMessage("Office details successfully updated");
            }
        },

        async updateBiography(new_data) {
            const updated_data = {
                first_name: this.teacher_store.user.first_name,
                middle_name: this.teacher_store.user.middle_name,
                last_name: this.teacher_store.user.last_name,
                bio_description: new_data,
                office_details: this.teacher_store.user.office_details,
            };
            const results = await this.teacher_store.update_user_details(updated_data);
            if (results == true) {
                this.teacher_store.get_account_data();
                this.showSuccessMessage("Biography successfully updated");
            }
        },

        async addEducation(data) {
            const education_data = {
                school: data.school,
                degree: data.course,
                area_of_study: data.field,
                year_started: data.start_year,
                year_ended: data.end_year,
            };
            const results = await this.teacher_store.add_education(education_data);
            if (results == true) {
                this.showSuccessMessage("Education successfully added");
            }
        },

        async updateEducation(item) {
            const updated_data = {
                uuid: this.teacher_store.user.education[item.index].uuid,
                school: item.new_data.school,
                degree: item.new_data.course,
                area_of_study: item.new_data.field,
                year_started: item.new_data.start_year,
                year_ended: item.new_data.end_year,
            };
            const results = await this.teacher_store.update_education(updated_data);
            if (results == true) {
                this.showSuccessMessage("Education successfully updated");
            }
        },

        async removeEducation(item_index) {
            const uuid = this.teacher_store.user.education[item_index].uuid;
            const results = await this.teacher_store.delete_education(uuid);
            if (results == true) {
                this.showSuccessMessage("Education successfully removed");
            }
        },

        async updateAccount(new_data) {
            const updated_data = {
                password: new_data.old_password,
                new_password: new_data.new_password,
            };
            const results = await this.teacher_store.change_password(updated_data);
            if (results == true) {
                this.showSuccessMessage("Password successfully updated");
            }
        },

        async uploadProfilePhoto(photo) {
            const results = await this.teacher_store.update_profile_photo(photo);
            if (results == true) {
                await this.teacher_store.get_account_data();
                this.showSuccessMessage("Profile photo successfully updated");
            }
        },

        async removeProfilePhoto() {
            const results = await this.teacher_store.remove_profile_photo();
            if (results == true) {
                await this.teacher_store.get_account_data();
                this.showSuccessMessage("Profile photo successfully removed");
            }
        },

        showSuccessMessage(message) {
            this.success_snackbar.status = true;
            this.success_snackbar.message = message;
        },

        check_bio_details(bio_details) {
            if (bio_details === null) {
                return "";
            } else {
                return bio_details;
            }
        },
    },

    created() {
        this.teacher_store.get_account_data();
    },
};
</script>

<style scoped>
.profile-page {
    width: 100%;
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
    padding: 5%;
    margin-bottom: 10%;
}

.left-section {
    flex: 0.6;
}

.teacher-section {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.teacher-actions {
    position: absolute;
    margin-left: 10%;
    margin-top: 12%;
}

.teacher-image img {
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

.teacher-credentials {
    display: flex;
    justify-content: space-between;
}

.teacher-name {
    display: flex;
    gap: 10px;
    font-size: 1.3em;
    font-weight: bold;
}

.office-title {
    display: flex;
    gap: 1%;
    font-size: 1em;
    font-weight: bold;
}

.office-body {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    padding: 20px 0px;
    border-top: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
}

.office-body .text {
    font-weight: bold;
}

.office-location {
    width: 100%;
    padding: 0 5%;
    border-right: 1px solid #e2e2e2;
}

.office-time {
    width: 100%;
    padding: 0 5%;
}

.office-phone-number {
    width: 100%;
    padding: 0 5%;
    border-left: 1px solid #c4c4c4;
}

.section-header {
    display: flex;
    column-gap: 10px;
}

.biography-title {
    font-size: 1em;
    font-weight: bold;
}

.biography-actions {
    display: flex;
    gap: 20px;
}

.biography-body {
    width: 100%;
    height: auto;
    margin-top: 10px;
    text-align: justify;
    text-justify: inter-word;
}

.education-header {
    display: flex;
    justify-content: space-between;
}

.education-title {
    font-size: 1em;
    font-weight: bold;
}

.education-item {
    display: flex;
    justify-content: space-between;
}

.education-options {
    display: flex;
    align-items: center;
    gap: 10px;
}

.education-body {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}
</style>
