<template>
    <v-dialog max-width="600" v-model="dialog" persistent>
        <YesNoWarning v-if="dialog4.status" @clickNo="dialog4.status = false" @clickYes="create_new_sched()" :dialog_prop="this.dialog4" />
        <template v-slot:activator="{ on, attrs }">
            <v-btn large color="primary" v-bind="attrs" v-on="on">
                <v-icon left> mdi-plus </v-icon>
                Create New Class
            </v-btn>
        </template>
        <v-card>
            <v-toolbar color="primary" dark>
                <span> New Class</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="close_dialog()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <br />
            <v-card-text>
                <v-alert text dense outlined type="error" v-if="error_message">
                    {{ error }}
                </v-alert>
                <v-row dense>
                    <v-col cols="12">
                        <span> Title* </span>
                        <v-text-field
                            v-model="title"
                            outlined
                            flat
                            solo
                            label="Title"
                            :error-messages="titleErrors"
                            :counter="25"
                            clearable
                            required
                            @input="$v.title.$touch()"
                            @blur="$v.title.$touch()"
                        />
                    </v-col>
                    <v-col cols="12">
                        <span> Description* </span>
                        <v-text-field
                            v-model="description"
                            outlined
                            flat
                            solo
                            label="Description"
                            :error-messages="descriptionErrors"
                            :counter="60"
                            clearable
                            required
                            @input="$v.description.$touch()"
                            @blur="$v.description.$touch()"
                        />
                    </v-col>
                    <v-col cols="12">
                        <span> Section/Period/Block* </span>
                        <v-text-field
                            v-model="section"
                            outlined
                            flat
                            solo
                            label="Section/Period/Block"
                            :error-messages="sectionErrors"
                            :counter="25"
                            clearable
                            required
                            @input="$v.section.$touch()"
                            @blur="$v.section.$touch()"
                        />
                    </v-col>
                    <v-col cols="12">
                        <div class="item-schedules">
                            <v-alert text dense outlined type="warning" v-if="!show_sched && schedules.length == 0">
                                <span class="text-caption"> No schedules added yet. Please add at least one schedule to create your class. </span>
                            </v-alert>
                            <v-card outlined v-for="(item, index) in schedules" :key="index">
                                <v-card-subtitle class="card-content">
                                    <div class="content-schedule">
                                        {{ item.day }}
                                        <div>
                                            <v-icon small> mdi-clock-outline</v-icon>
                                            {{ item.time_start + " - " + item.time_end }}
                                        </div>
                                    </div>
                                    <v-btn icon color="error" outlined x-small @click="remove_sched(index)">
                                        <v-icon> mdi-close </v-icon>
                                    </v-btn>
                                </v-card-subtitle>
                            </v-card>
                        </div>
                        <br />
                        <v-btn color="primary" outlined v-if="!show_sched" @click="show_sched = true">
                            <v-icon> mdi-plus </v-icon>
                            Add Schedule
                        </v-btn>
                        <v-card outlined v-if="show_sched">
                            <v-card-text>
                                <!-- <v-row
                                    v-if="
                                        (!this.isTimeBetween(this.time_start) || !this.isTimeBetween(this.time_end)) &&
                                        this.time_start !== '' &&
                                        this.time_end !== ''
                                    "
                                >
                                    <v-col cols="12">
                                        <v-alert text dense outlined type="warning">
                                            <span class="text-caption"> Office hours are between 7:00 AM to 6:59 PM </span>
                                        </v-alert>
                                    </v-col>
                                </v-row> -->
                                <v-row dense>
                                    <v-col cols="4">
                                        <v-select
                                            v-model="day"
                                            :items="days"
                                            outlined
                                            label="Day"
                                            required
                                            :error-messages="dayErrors"
                                            @input="$v.day.$touch()"
                                            @blur="$v.day.$touch()"
                                        />
                                    </v-col>
                                    <v-col cols="4">
                                        <v-menu v-model="dialog2" bottom offset-y :close-on-content-click="false">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="time_start"
                                                    clearable
                                                    outlined
                                                    label="Time start"
                                                    readonly
                                                    :error-messages="timeStartErrors"
                                                    @input="$v.time_start.$touch()"
                                                    @blur="$v.time_start.$touch()"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <!-- pop-up -->
                                            <v-card class="time-preview">
                                                <v-card-text>
                                                    <h3 style="text-align: center">
                                                        {{ hour + ":" + minute + " " + clock }}
                                                    </h3>
                                                </v-card-text>
                                            </v-card>
                                            <v-card class="custom-time-picker">
                                                <div class="time-picker-content">
                                                    <v-list>
                                                        <v-list-item-group>
                                                            <v-list-item v-for="time in 12" :key="time" dense>
                                                                <span v-if="time < 10" @click="hour = '0' + time">
                                                                    {{ "0" + time }}
                                                                </span>
                                                                <span v-else @click="hour = time">
                                                                    {{ time }}
                                                                </span>
                                                            </v-list-item>
                                                        </v-list-item-group>
                                                    </v-list>
                                                    <v-list>
                                                        <v-list-item-group>
                                                            <v-list-item v-for="time in 60" :key="time" dense>
                                                                <span v-if="time < 10" @click="minute = '0' + time">
                                                                    {{ "0" + time }}
                                                                </span>
                                                                <span v-else-if="time >= 10 && time < 60" @click="minute = time">
                                                                    {{ time }}
                                                                </span>
                                                                <span v-if="time == 60" @click="minute = '00'"> 00 </span>
                                                            </v-list-item>
                                                        </v-list-item-group>
                                                    </v-list>
                                                    <v-list class="time-picker-clock">
                                                        <v-list-item-group>
                                                            <v-list-item dense link @click="clock = 'AM'"> AM </v-list-item>
                                                            <v-list-item dense link @click="clock = 'PM'"> PM </v-list-item>
                                                        </v-list-item-group>
                                                    </v-list>
                                                </div>
                                                <v-card class="time-actions">
                                                    <v-card-text>
                                                        <v-btn color="primary" width="100%" :disabled="checkTimeStart" @click="save_time_start()">
                                                            Save
                                                        </v-btn>
                                                    </v-card-text>
                                                </v-card>
                                            </v-card>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-menu v-model="dialog3" bottom offset-y :close-on-content-click="false">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="time_end"
                                                    clearable
                                                    outlined
                                                    label="Time end"
                                                    readonly
                                                    :error-messages="timeEndErrors"
                                                    @input="$v.time_end.$touch()"
                                                    @blur="$v.time_end.$touch()"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <!-- pop-up -->
                                            <v-card class="time-preview">
                                                <v-card-text>
                                                    <h3 style="text-align: center">
                                                        {{ hour2 + ":" + minute2 + " " + clock2 }}
                                                    </h3>
                                                </v-card-text>
                                            </v-card>
                                            <v-card class="custom-time-picker">
                                                <div class="time-picker-content">
                                                    <v-list>
                                                        <v-list-item-group>
                                                            <v-list-item v-for="time in 12" :key="time" dense>
                                                                <span v-if="time < 10" @click="hour2 = '0' + time">
                                                                    {{ "0" + time }}
                                                                </span>
                                                                <span v-else @click="hour2 = time">
                                                                    {{ time }}
                                                                </span>
                                                            </v-list-item>
                                                        </v-list-item-group>
                                                    </v-list>
                                                    <v-list>
                                                        <v-list-item-group>
                                                            <v-list-item v-for="time in 60" :key="time" dense>
                                                                <span v-if="time < 10" @click="minute2 = '0' + time">
                                                                    {{ "0" + time }}
                                                                </span>
                                                                <span v-else-if="time >= 10 && time < 60" @click="minute2 = time">
                                                                    {{ time }}
                                                                </span>
                                                                <span v-else-if="time == 60" @click="minute2 = '00'"> 00 </span>
                                                            </v-list-item>
                                                        </v-list-item-group>
                                                    </v-list>
                                                    <v-list class="time-picker-clock">
                                                        <v-list-item-group>
                                                            <v-list-item dense link @click="clock2 = 'AM'"> AM </v-list-item>
                                                            <v-list-item dense link @click="clock2 = 'PM'"> PM </v-list-item>
                                                        </v-list-item-group>
                                                    </v-list>
                                                </div>
                                                <v-card class="time-actions">
                                                    <v-card-text>
                                                        <v-btn color="primary" width="100%" :disabled="checkTimeEnd" @click="save_time_end()">
                                                            Save
                                                        </v-btn>
                                                    </v-card-text>
                                                </v-card>
                                            </v-card>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-spacer></v-spacer>
                                    <v-btn color="error" small outlined @click="close_schedule_form()">
                                        <v-icon left small> mdi-close </v-icon>
                                        Cancel
                                    </v-btn>
                                    <v-btn color="success" small outlined @click="add_new_sched()">
                                        <v-icon left small> mdi-check </v-icon>
                                        Add
                                    </v-btn>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <br />
                <v-card-actions class="justify-end">
                    <v-spacer></v-spacer>
                    <v-btn width="100" color="primary" outlined @click="close_dialog()"> Cancel </v-btn>
                    <v-btn width="100" color="primary" @click="create_new_class()"> Create </v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { TeacherClassData } from "@/store/Teacher/TeacherClassData.js";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import YesNoWarning from "@/components/Commons/popup_dialogs/YesNoWarning.vue";

export default {
    components: {
        YesNoWarning,
    },

    mixins: [validationMixin],

    validations: {
        title: { required, maxLength: maxLength(25) },
        description: { required, maxLength: maxLength(60) },
        section: { required, maxLength: maxLength(25) },
        day: { required },
        time_start: { required },
        time_end: { required },
    },

    data() {
        return {
            class_store: TeacherClassData(),

            dialog: false,
            dialog2: null,
            dialog3: null,
            error_message: false,
            error: "",
            show_sched: false,

            dialog4: {
                status: false,
                title: "Confirm class time",
                message: "Your chosen class time is not during office hours which is 7:00 am to 6:00 pm. Do you want to continue?",
            },

            title: "",
            description: "",
            section: "",
            schedules: [],

            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

            day: "",
            time_start: "",
            time_end: "",

            hour: "",
            minute: "",
            clock: "",

            hour2: "",
            minute2: "",
            clock2: "",
        };
    },

    watch: {
        time_start() {
            if (this.time_start === null) this.time_start = "";
        },

        time_end() {
            if (this.time_end === null) this.time_end = "";
        },
    },

    methods: {
        create_new_class() {
            this.$v.title.$touch();
            this.$v.description.$touch();
            this.$v.section.$touch();
            if (this.check_errors()) {
                var class_data = {
                    title: this.title,
                    description: this.description,
                    section: this.section,
                    code: "",
                    schedules: this.schedules,
                };
                var results = this.class_store.create_class(class_data);
                if (this.class_store.error == null) {
                    this.error = "";
                    this.error_message = false;
                    this.class_store.get_all_class();
                    this.close_dialog();
                    this.$emit("showSuccessMessage", "Class successfully created");
                } else {
                    this.error = "Invalid class to create. This class already exists.";
                    this.error_message = true;
                }
            }
        },

        check_errors() {
            if (this.titleErrors.length == 0 && this.descriptionErrors.length == 0 && this.sectionErrors.length == 0 && this.schedules.length !== 0) {
                return true;
            }
            return false;
        },

        close_dialog() {
            this.$v.$reset();
            this.error_message = false;
            this.title = "";
            this.description = "";
            this.section = "";
            this.schedules = [];
            this.dialog = false;
        },

        remove_sched(index) {
            this.schedules.splice(index, 1);
        },

        add_new_sched() {
            if (this.check_schedule()) {
                this.dialog4.status = true;
            }
        },

        create_new_sched() {
            this.schedules.push({
                day: this.day,
                time_start: this.time_start,
                time_end: this.time_end,
            });
            this.close_schedule_form();
            this.dialog4.status = false;
        },

        check_schedule() {
            this.$v.day.$touch();
            this.$v.time_start.$touch();
            this.$v.time_end.$touch();
            if (this.dayErrors.length == 0 && this.timeStartErrors.length == 0 && this.timeEndErrors.length == 0) {
                return true;
            }
            return false;
        },

        check_day(day) {
            var result = this.schedules.some((sched) => sched["day"] === day);
            return result;
        },

        save_time_start() {
            var time_sched = this.hour + ":" + this.minute + " " + this.clock;
            this.dialog2 = false;
            this.time_start = time_sched;
            this.hour = "";
            this.minute = "";
            this.clock = "";
        },

        save_time_end() {
            var time_sched = this.hour2 + ":" + this.minute2 + " " + this.clock2;
            this.dialog3 = false;
            this.time_end = time_sched;
            this.hour2 = "";
            this.minute2 = "";
            this.clock2 = "";
        },

        close_schedule_form() {
            this.$v.day.$reset();
            this.$v.time_start.$reset();
            this.$v.time_end.$reset();
            this.show_sched = false;
            this.day = "";
            this.time_start = "";
            this.time_end = "";
        },

        isTimeBetween(timeString) {
            // Split the input time string into hours, minutes, and AM/PM parts
            var timeParts = timeString.match(/^(\d{1,2}):(\d{2})\s?([APap][Mm])$/);
            if (timeParts) {
                // Extract hours, minutes, and AM/PM
                var hours = parseInt(timeParts[1], 10);
                var minutes = parseInt(timeParts[2], 10);
                var period = timeParts[3].toUpperCase();
                // Adjust hours for 24-hour format
                if (period === "PM" && hours < 12) {
                    hours += 12;
                } else if (period === "AM" && hours === 12) {
                    hours = 0;
                }
                // Check if the time is between 7:00 AM and 6:00 PM
                if (hours >= 7 && hours <= 18 && minutes >= 0 && minutes <= 59) {
                    return true;
                } else {
                    return false;
                }
            } else {
                // Invalid input format
                // console.error("Invalid time format");
                return false;
            }
        },

        convertStringToTime(timeString) {
            // Split the input time string into hours, minutes, and AM/PM parts
            var timeParts = timeString.match(/^(\d{1,2}):(\d{2})\s?([APap][Mm])$/);
            if (timeParts) {
                // Extract hours, minutes, and AM/PM
                var hours = parseInt(timeParts[1], 10);
                var minutes = parseInt(timeParts[2], 10);
                var period = timeParts[3].toUpperCase();
                // Adjust hours for 24-hour format
                if (period === "PM" && hours < 12) {
                    hours += 12;
                } else if (period === "AM" && hours === 12) {
                    hours = 0;
                }
                // Create a new Date object and set hours, minutes, and seconds
                var timeObject = new Date();
                timeObject.setHours(hours, minutes, 0, 0);
                return timeObject;
            } else {
                // Invalid input format
                // console.error("Invalid time format");
                return null;
            }
        },
    },

    computed: {
        titleErrors() {
            const errors = [];
            if (!this.$v.title.$dirty) return errors;
            !this.$v.title.required && errors.push("Title is required");
            !this.$v.title.maxLength && errors.push("Title must be at most 25 characters long");
            return errors;
        },
        descriptionErrors() {
            const errors = [];
            if (!this.$v.description.$dirty) return errors;
            !this.$v.description.required && errors.push("Description is required");
            !this.$v.description.maxLength && errors.push("Description must be at most 60 characters long");
            return errors;
        },
        sectionErrors() {
            const errors = [];
            if (!this.$v.section.$dirty) return errors;
            !this.$v.section.required && errors.push("Section is required");
            !this.$v.section.maxLength && errors.push("Section must be at most 25 characters long");
            return errors;
        },
        dayErrors() {
            const errors = [];
            if (!this.$v.day.$dirty) return errors;
            !this.$v.day.required && errors.push("Day is required");
            if (this.check_day(this.day)) {
                errors.push("Day is already exists");
            }
            return errors;
        },
        timeStartErrors() {
            const errors = [];
            if (!this.$v.time_start.$dirty) return errors;
            !this.$v.time_start.required && errors.push("Time start is required");
            if (
                (this.convertStringToTime(this.time_start) > this.convertStringToTime(this.time_end) ||
                    this.convertStringToTime(this.time_start) == this.convertStringToTime(this.time_end)) &&
                this.time_end !== ""
            ) {
                errors.push("Time start must be less than time end");
            }
            return errors;
        },
        timeEndErrors() {
            const errors = [];
            if (!this.$v.time_end.$dirty) return errors;
            !this.$v.time_end.required && errors.push("Time end is required");
            if (
                (this.convertStringToTime(this.time_end) < this.convertStringToTime(this.time_start) ||
                    this.convertStringToTime(this.time_start) == this.convertStringToTime(this.time_end)) &&
                this.time_start !== ""
            ) {
                errors.push("Time end must be greater than time start");
            }
            return errors;
        },
        checkTimeStart() {
            if (this.hour == "" || this.minute == "" || this.clock == "") {
                return true;
            } else {
                return false;
            }
        },
        checkTimeEnd() {
            if (this.hour2 == "" || this.minute2 == "" || this.clock2 == "") {
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
    text-transform: initial;
}

.dialog-body {
    color: var(--gray-2);
    font-size: 1.2em;
}

.item-schedule {
    display: flex;
}

.item-schedules {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.schedule-actions .v-btn {
    width: 100%;
    height: 100%;
}

.card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content-schedule {
    display: flex;
    flex-direction: column;
}

/* time picker */
.custom-time-picker {
    height: 350px;
    display: flex;
    flex-direction: column;
    background-color: white;
}

.time-preview {
    position: sticky;
    top: 0;
    z-index: 999;
}

.time-actions {
    position: sticky;
    bottom: 0;
    z-index: 999;
}

.time-picker-content {
    display: flex;
    background-color: white;
}

.time-picker-clock {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    background-color: white;
}

.theme--light.v-list-item--active:before,
.theme--light.v-list-item--active:hover:before,
.theme--light.v-list-item:focus:before {
    background-color: var(--blue-1);
    opacity: 0;
}
/* time picker */
</style>
