<template>
    <div class="class-details-content">
        <SuccessSnackbar
            :text="success_snackbar.message"
            v-if="success_snackbar.status"
            @closeSnackbar="success_snackbar.status = false"
        />
        <div class="content-header">
            <div class="content-title">
                <span> {{ get_class.title + " | " + get_class.section }} </span>
                <h1>{{ get_class.description }}</h1>
            </div>
            <EditClass @showSuccessMessage="showSuccessMessage($event)" />
        </div>
        <br />
        <br />
        <br />
        <br />
        <div class="content-details">
            <div class="details-teacher">
                <img
                    src="@/assets/default_image.png"
                    alt="Teacher Photo"
                    v-if="
                        store.current_user.credentials.photo == null ||
                        store.current_user.credentials.photo == ''
                    "
                />
                <img
                    :src="store.current_user.credentials.photo"
                    alt="No Photo"
                    v-else
                />
                <br />
                <h4>
                    {{
                        store.current_user.credentials.name.first_name +
                        " " +
                        store.current_user.credentials.name.middle_name +
                        " " +
                        store.current_user.credentials.name.last_name
                    }}
                </h4>
                <span> Teacher </span>
            </div>
            <div class="details-schedule">
                <h3>Schedules</h3>
                <br />
                <div class="schedule-content">
                    <v-card
                        outlined
                        width="100%"
                        v-for="(item, index) in get_class.schedules"
                        :key="index"
                    >
                        <v-card-title> {{ item.day }} </v-card-title>
                        <v-card-subtitle>
                            <v-icon small> mdi-clock-outline </v-icon>
                            {{ item.time.start + " - " + item.time.end }}
                        </v-card-subtitle>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { AllClassesService } from "@/api/Teacher/all_classes/AllClassesData";
import EditClass from "@/components/Teacher/all_classes/class_selected/class_details/dialogs/EditClass.vue";
import SuccessSnackbar from "@/components/Teacher/main/snackbars/Success.vue";
import { storeCurrentUser } from "@/store/CurrentUser";

export default {
    components: {
        EditClass,
        SuccessSnackbar,
    },

    data() {
        return {
            get_class: AllClassesService.prototype.get_class_by_title(
                this.$route.params.class_title
            ),
            success_snackbar: {
                status: false,
                message: "",
            },
            store: storeCurrentUser(),
        };
    },

    methods: {
        showSuccessMessage(message) {
            this.success_snackbar.status = true;
            this.success_snackbar.message = message;
        },
    },
};
</script>
<style scoped>
.class-details-content {
    width: 100%;
    margin-bottom: 10%;
}

.content-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.content-title span {
    font-size: 1.2em;
}

.content-details {
    width: 100%;
    display: flex;
    column-gap: 3%;
}

.details-teacher {
    flex: 1;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>
