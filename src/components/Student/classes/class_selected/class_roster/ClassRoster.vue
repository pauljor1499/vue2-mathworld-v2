<template>
    <div class="class-roster-content">
        <div class="content-title" style="color: var(--blue-1)">
            <h2>All Students</h2>
            <div>
                {{ class_roster.length + " students" }}
            </div>
        </div>
        <br />
        <br />
        <v-list dense v-for="(item, index) in class_roster" :key="index">
            <v-list-item :key="index">
                <v-list-item-avatar>
                    <v-img :src="item.photo" />
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        <span>
                            {{
                                item.first_name +
                                " " +
                                item.middle_name +
                                " " +
                                item.last_name
                            }}
                        </span>
                    </v-list-item-title>
                </v-list-item-content>
                <v-btn icon @click="sendEmail(item.email)">
                    <v-icon color="primary"> mdi-email-outline </v-icon>
                </v-btn>
            </v-list-item>
            <v-divider class="mt-3" v-if="index < class_roster.length - 1" />
        </v-list>
    </div>
</template>

<script>
import { AllClassesService } from "@/api/Student/classes/ClassesService";

export default {
    data() {
        return {
            class_title: "",
        };
    },

    computed: {
        class_roster() {
            return AllClassesService.prototype.get_class(this.class_title)
                .class_roster;
        },
    },

    methods: {
        sendEmail(email) {
            var url = "https://mail.google.com/mail/?view=cm&fs=1"; //gmail
            var to = email;
            var subject = "";
            var body = "";
            window
                .open(
                    url + "&to=" + to + "&su=" + subject + "&body=" + body,
                    "_blank"
                )
                .focus();
        },
    },

    created() {
        this.class_title = this.$route.params.classTitle;
    },
};
</script>

<style scoped>
span {
    text-transform: uppercase;
}

.class-roster-content {
    width: 100%;
}

.content-title {
    display: flex;
    justify-content: space-between;
}
</style>
