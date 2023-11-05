<template>
    <div class="class-details-content">
        <DeleteClass v-if="dialog.status" @clickNo="dialog.status = false" @clickYes="deleteClass()" :dialog_prop="this.dialog" />
        <SuccessSnackbar :text="success_snackbar.message" v-if="success_snackbar.status" @closeSnackbar="success_snackbar.status = false" />
        <div class="content-header">
            <div class="content-title">
                <h2>{{ get_class.description }}</h2>
                <span> {{ get_class.title + " (" + get_class.section + ")" }} </span> <br />
                <span> {{ get_class.code }}</span>
            </div>
            <div class="header-actions">
                <!-- <DeleteClass :get_class="this.get_class" @clickClassDelete="clickClassDelete()" /> -->
                <v-btn outlined color="error" @click="clickClassDelete()">
                    <v-icon left> mdi-clipboard-edit-outline </v-icon>
                    Delete Class
                </v-btn>
                <EditClass :get_class="this.get_class" @clickClassUpdate="clickClassUpdate($event)" />
            </div>
        </div>
        <div class="content-details">
            <v-card elevation="4" class="details-teacher">
                <img src="@/assets/default_image.png" alt="Teacher Photo" v-if="get_teacher.profile_picture === null" />
                <img :src="get_teacher.profile_picture" alt="No Photo" v-else />
                <br />
                <h4>
                    {{ get_teacher.first_name + " " + get_teacher.middle_name + " " + get_teacher.last_name }}
                </h4>
                <span>
                    {{ get_teacher.email }}
                </span>
                <span> Teacher </span>
                <br />
                <v-btn color="primary" width="80%"> Message </v-btn>
            </v-card>
            <div class="details-schedule">
                <h3 style="color: var(--blue-1)">Schedules</h3>
                <br />
                <div class="schedule-content">
                    <v-card hover outlined width="100%" v-for="(item, index) in get_class.schedules" :key="index">
                        <div class="content-item">
                            <div class="item-number">
                                <div class="number-content">
                                    {{ index + 1 }}
                                </div>
                            </div>
                            <div class="item-details">
                                <v-card-title> {{ item.day }} </v-card-title>
                                <v-card-subtitle>
                                    <v-icon small> mdi-clock-outline </v-icon>
                                    {{ item.time_start + " - " + item.time_end }}
                                </v-card-subtitle>
                            </div>
                        </div>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditClass from "@/components/Teacher/all_classes/class_selected/class_details/dialogs/EditClass.vue";
import DeleteClass from "@/components/Commons/popup_dialogs/YesNoError.vue";
import SuccessSnackbar from "@/components/Commons/snackbars/Success.vue";
import { TeacherClassData } from "@/store/Teacher/TeacherClassData";
import { storeCurrentUser } from "@/store/CurrentUser";

export default {
    components: {
        EditClass,
        DeleteClass,
        SuccessSnackbar,
    },

    props: {
        get_class: Object,
        get_teacher: Object,
    },

    data() {
        return {
            class_store: TeacherClassData(),
            dialog: {
                status: false,
                title: "Confirm delete",
                message: "Do you want to delete this class?",
            },
            success_snackbar: {
                status: false,
                message: "",
            },
            store: storeCurrentUser(),
        };
    },

    methods: {
        clickClassDelete() {
            this.dialog.status = true;
        },

        deleteClass() {
            const results = this.class_store.delete_class(this.get_class.uuid);
            if (results) {
                this.$router.push({
                    name: "TeacherAllClassesMain",
                    params: {
                        public_snackbar: {
                            status: true,
                            message: "Class successfully deleted",
                        },
                    },
                });
            }
        },

        clickClassUpdate() {
            this.showSuccessMessage("Class successfully updated");
        },

        showSuccessMessage(message) {
            this.success_snackbar.status = true;
            this.success_snackbar.message = message;
        },
    },
};
</script>

<style scoped>
* {
    text-transform: none;
}

.class-details-content {
    width: 100%;
    margin-bottom: 10%;
}

.content-header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.header-actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.content-title span {
    font-size: 1.2em;
}

.content-details {
    display: flex;
    column-gap: 3%;
    margin-top: 5%;
    padding: 1%;
}

.details-teacher {
    flex: 1;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    padding: 5% 0;
}

.details-teacher img {
    width: 8em;
    border-radius: 5%;
}

.details-schedule {
    flex: 3;
    display: flex;
    flex-direction: column;
}

.schedule-content {
    width: 75%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.content-item {
    display: flex;
    align-items: center;
    border: 1px solid var(--blue-1);
}

.item-number {
    padding: 0.5rem;
}

.number-content {
    padding: 1.5rem;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    background-color: var(--blue-1);
}

@media only screen and (max-width: 800px) {
}

@media only screen and (max-width: 450px) {
    .content-header {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .content-title span {
        font-size: 1rem;
    }

    .content-title h1 {
        font-size: 1.4rem;
    }

    .content-details {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}
</style>
