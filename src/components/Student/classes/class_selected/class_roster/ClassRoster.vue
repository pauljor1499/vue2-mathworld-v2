<template>
    <div class="class-roster-content">
        <div class="content-title" style="color: var(--blue-1)">
            <h2>All Students</h2>
            <div v-if="students.length < 2">
                {{ students.length + " student" }}
            </div>
            <div v-else>
                {{ students.length + " students" }}
            </div>
        </div>
        <br />
        <br />
        <v-list dense v-for="(item, index) in students" :key="index">
            <v-list-item :key="index" link>
                <v-list-item-avatar>
                    <img src="@/assets/blue_round_person.jpg" alt="Student Photo" v-if="item.profile_picture === null" />
                    <v-img :src="item.profile_picture" v-else />
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        <span>
                            {{ item.first_name + " " + item.middle_name + " " + item.last_name }}
                        </span>
                    </v-list-item-title>
                </v-list-item-content>
                <v-btn icon @click="sendEmail(item.email)">
                    <v-icon color="primary"> mdi-email-outline </v-icon>
                </v-btn>
            </v-list-item>
            <v-divider class="mt-3" v-if="index < students.length - 1" />
        </v-list>
    </div>
</template>

<script>
export default {
    props: {
        students: Array,
    },

    data() {
        return {};
    },

    methods: {
        sendEmail(email) {
            var url = "https://mail.google.com/mail/?view=cm&fs=1"; //gmail
            var to = email;
            var subject = "";
            var body = "";
            window.open(url + "&to=" + to + "&su=" + subject + "&body=" + body, "_blank").focus();
        },
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
