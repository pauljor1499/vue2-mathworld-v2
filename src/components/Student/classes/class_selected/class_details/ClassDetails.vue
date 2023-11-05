<template>
    <div class="class-details-content">
        <div class="content-title">
            <span> {{ class_details.title + " (" + class_details.section + ")" }} </span> <br />
            <span> {{ class_details.code }} </span>
            <h1>{{ class_details.description }}</h1>
        </div>
        <div class="content-details">
            <v-card elevation="4" class="details-teacher">
                <img src="@/assets/blue_round_person.jpg" alt="Student Photo" v-if="class_details.teacher.profile_picture === null" />
                <img :src="class_details.teacher.profile_picture" alt="Teacher photo" v-else />
                <br />
                <h4>{{ class_details.teacher.first_name + " " + class_details.teacher.middle_name + " " + class_details.teacher.last_name }}</h4>
                <span>Teacher</span>
                <br />
                <v-btn color="primary" width="80%"> Message </v-btn>
            </v-card>
            <div class="details-schedule">
                <h3 style="color: var(--blue-1)">Schedules</h3>
                <br />
                <div class="schedule-content">
                    <v-card hover outlined width="100%" v-for="(item, index) in class_details.schedules" :key="index">
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
export default {
    props: {
        class_details: Object,
    },

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
    display: flex;
    column-gap: 3%;
    margin-top: 8%;
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
    height: 8em;
    object-fit: cover;
    border: 1px solid rgb(228, 228, 228);
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
</style>
