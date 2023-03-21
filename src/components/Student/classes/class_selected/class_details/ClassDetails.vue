<template>
    <div class="class-details-content">
        <div class="content-title">
            <span> {{ get_class.title + " | " + get_class.section }} </span>
            <h1>{{ get_class.description }}</h1>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div class="content-details">
            <div class="details-teacher">
                <img
                    :src="get_class.class_details.teacher.photo"
                    alt="teacher photo"
                />
                <br />
                <h4>{{ class_details.teacher.name }}</h4>
                <span>Teacher</span>
            </div>
            <div class="details-schedule">
                <h3>Schedules</h3>
                <br />
                <div class="schedule-content">
                    <v-card
                        outlined
                        width="100%"
                        v-for="(item, index) in schedules"
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
import { AllClassesService } from "@/api/Student/classes/ClassesService";

export default {
    data() {
        return {
            class_title: "",
            schedules: [
                {
                    day: "Monday",
                    time: {
                        start: "8:00 AM",
                        end: "9:00 AM",
                    },
                },
                {
                    day: "Wednesday",
                    time: {
                        start: "8:00 AM",
                        end: "9:00 AM",
                    },
                },
                {
                    day: "Friday",
                    time: {
                        start: "8:00 AM",
                        end: "9:00 AM",
                    },
                },
            ],
        };
    },

    computed: {
        class_details() {
            return AllClassesService.prototype.get_class(this.class_title)
                .class_details;
        },

        get_class() {
            return AllClassesService.prototype.get_class(this.class_title);
        },
    },

    created() {
        this.class_title = this.$route.params.classTitle;
    },
};
</script>
<style scoped>
.class-details-content {
    width: 100%;
    margin-bottom: 10%;
}

.content-title span {
    font-size: 1.2em;
}

.content-details {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
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
