<template>
    <div class="main-content">
        <input type="file" accept="image/*" hidden ref="file" @change="change" />
        <v-dialog v-model="dialog" persistent max-width="450px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" fab large dark v-bind="attrs" v-on="on" @click="dialog = true">
                    <v-icon>mdi-camera</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="primary" dark>
                    <span> Edit photo</span>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <br />
                    <br />
                    <v-row dense>
                        <v-col cols="12">
                            <div class="teacher-image">
                                <img :src="this.teacher_photo" alt="Teacher image" v-if="this.teacher_photo != ''" />
                                <img src="@/assets/default_image.png" alt="Teacher image" v-else-if="teacher_store.user.profile_picture === null" />
                                <img :src="teacher_store.user.profile_picture" alt="Teacher image" v-else />
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <br />
                            <br />
                            <v-card-actions class="justify-center">
                                <v-btn color="error" v-show="teacher_store.user.profile_picture !== null" @click="removePhoto()">
                                    Remove Photo
                                </v-btn>
                                <v-btn color="primary" outlined @click="browseImage()" v-if="this.teacher_photo != ''"> Change Photo </v-btn>
                                <v-btn color="primary" outlined @click="browseImage()" v-else> New Photo </v-btn>
                                <v-btn color="primary" :disabled="noChanges" @click="uploadNewPhoto()"> Save Photo </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { TeacherData } from "@/store/Teacher/TeacherData";
import { storeCurrentUser } from "@/store/CurrentUser";

export default {
    data: () => ({
        teacher_store: TeacherData(),
        store: storeCurrentUser(),
        dialog: false,
        teacher_photo: "",
    }),

    methods: {
        uploadNewPhoto() {
            this.$emit("uploadProfilePhoto", this.teacher_photo);
            this.teacher_photo = "";
            this.dialog = false;
        },

        browseImage() {
            this.$refs.file.click();
        },

        change(event) {
            try {
                var reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = (event) => {
                    this.teacher_photo = event.target.result;
                };
            } catch (err) {}
        },

        removePhoto() {
            // this.teacher_photo = "";
            // this.$refs.file.value = "";
            this.$emit("removeProfilePhoto", this.teacher_photo);
            this.teacher_photo = "";
            this.dialog = false;
        },
    },

    computed: {
        noChanges() {
            var photo = this.store.current_user.credentials.photo;
            if (photo == this.teacher_photo) {
                return true;
            } else {
                return false;
            }
        },
    },
};
</script>

<style scoped>
.v-btn {
    text-transform: none;
}

.teacher-image {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
}
</style>
