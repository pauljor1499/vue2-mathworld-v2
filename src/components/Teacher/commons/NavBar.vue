<template>
    <div class="navbar" v-if="teacher_store.user !== null">
        <YesNoError
            v-if="dialog.status"
            @clickNo="dialog.status = false"
            @clickYes="clickLogout()"
            :dialog_prop="this.dialog"
        />
        <div class="logo">
            <v-icon class="hamburger" size="35" @click="drawer = !drawer"> mdi-menu </v-icon>
            <span> MathMatters </span>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn fab icon x-small class="nav-avatar1" v-bind="attrs" v-on="on">
                        <v-avatar size="35" v-if="teacher_store.user.profile_picture !== null">
                            <img :src="teacher_store.user.profile_picture" alt="Avatar" />
                        </v-avatar>
                        <v-avatar size="35" color="primary" v-else>
                            <div style="color: white">
                                {{
                                    teacher_store.user.first_name.substring(0, 1) +
                                    teacher_store.user.last_name.substring(0, 1)
                                }}
                            </div>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item
                        class="first-item"
                        link
                        dense
                        @click="$router.push('/teacher/profile').catch((err) => err)"
                    >
                        <div class="first-item-details">
                            <div class="details-email">
                                <span> Sign in as </span>
                            </div>
                            <div class="details-name">
                                <span>
                                    {{
                                        teacher_store.user.first_name +
                                        " " +
                                        teacher_store.user.middle_name +
                                        " " +
                                        teacher_store.user.last_name
                                    }}
                                </span>
                            </div>
                        </div>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item link dense @click="$router.push('/teacher/profile').catch((err) => err)">
                        <span> Profile </span>
                    </v-list-item>
                    <v-list-item link dense>
                        <span> Account Settings </span>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item link dense @click="dialog.status = true">
                        <span> Logout </span>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="text-h6"> MathMatters </v-list-item-title>
                        <v-list-item-subtitle> version 1.0 </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list dense nav active-class="deep-purple--text text--accent-4">
                    <v-list-item
                        v-for="(item, index) in drawer_items"
                        :key="index"
                        link
                        @click="
                            $router
                                .push({
                                    path: item.path,
                                })
                                .catch((error) => '')
                        "
                    >
                        <v-list-item-icon>
                            <v-icon>
                                {{ item.icon }}
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.title }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-list>
        </v-navigation-drawer>
        <div class="nav-links">
            <router-link :to="'/teacher'" class="nav-link">
                <span>Dashboard</span>
            </router-link>
            <router-link :to="'/teacher/all-classes'" class="nav-link">
                <span>All Classes</span>
            </router-link>
            <router-link :to="'/teacher/gradebook'" class="nav-link">
                <span>Gradebook</span>
            </router-link>
            <router-link :to="'/teacher/assignments'" class="nav-link">
                <span>Assignments</span>
            </router-link>
        </div>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab icon class="nav-avatar2" v-bind="attrs" v-on="on">
                    <v-avatar size="35" v-if="teacher_store.user.profile_picture !== null">
                        <img :src="teacher_store.user.profile_picture" alt="Avatar" />
                    </v-avatar>
                    <v-avatar size="35" color="primary" v-else>
                        <div style="color: white">
                            {{
                                teacher_store.user.first_name.substring(0, 1) +
                                teacher_store.user.last_name.substring(0, 1)
                            }}
                        </div>
                    </v-avatar>
                </v-btn>
            </template>
            <v-list dense>
                <v-list-item
                    class="first-item"
                    link
                    dense
                    @click="$router.push('/teacher/profile').catch((err) => err)"
                >
                    <div class="first-item-details">
                        <div class="details-email">
                            <span> Sign in as </span>
                        </div>
                        <div class="details-name">
                            <span>
                                {{
                                    teacher_store.user.first_name +
                                    " " +
                                    teacher_store.user.middle_name +
                                    " " +
                                    teacher_store.user.last_name
                                }}
                            </span>
                        </div>
                    </div>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item link dense @click="$router.push('/teacher/profile').catch((err) => err)">
                    <span> Profile </span>
                </v-list-item>
                <v-list-item link dense>
                    <span> Account Settings </span>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item link dense @click="dialog.status = true">
                    <span> Logout </span>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
import { TeacherData } from "@/store/Teacher/TeacherData";
import { storeCurrentUser } from "@/store/CurrentUser";
import YesNoError from "@/components/Commons/popup_dialogs/YesNoError.vue";

export default {
    components: {
        YesNoError,
    },

    data() {
        return {
            teacher_store: TeacherData(),
            store: storeCurrentUser(),
            name_initials: "",
            dialog: {
                status: false,
                title: "Confirm logout",
                message: "Do you want to logout?",
            },

            drawer: false,
            drawer_items: [
                {
                    title: "Dashboard",
                    icon: "mdi-view-dashboard",
                    path: "/teacher",
                },
                {
                    title: "All Classes",
                    icon: "mdi-bulletin-board",
                    path: "/teacher/all-classes",
                },
                {
                    title: "Gradebook",
                    icon: "mdi-notebook",
                    path: "/teacher/gradebook",
                },
                {
                    title: "Assignments",
                    icon: "mdi-star",
                    path: "/teacher/assignments",
                },
            ],
        };
    },

    methods: {
        clickLogout() {
            localStorage.removeItem("token");
            this.$router.push("/").catch((err) => err);
        },
    },

    created() {
        this.teacher_store.get_account_data();
    },
};
</script>

<style scoped>
* {
    text-decoration: none;
    list-style: none;
    text-transform: initial;
}

.navbar {
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
}

.logo .hamburger,
.logo .nav-avatar1 {
    display: none;
}

.logo span {
    font-size: 1.8rem;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 10px;
}

.nav-link {
    font-size: 1.2em;
    padding: 35px 20px;
    border-bottom: 3px solid white;
    background-color: white;
}

.nav-link span {
    color: black;
}

.nav-link:hover {
    background-color: #ecf8ff;
    border-bottom: 3px solid #0091de;
}

a.router-link-exact-active {
    background-color: #ecf8ff;
    border-bottom: 3px solid #0091de;
}

/* Dropdown menu */
.first-item {
    width: 100%;
    padding: 10px 15px 10px 15px;
}

.first-item .first-item-avatar {
    width: 30px;
    height: 30px;
}

.first-item .first-item-avatar img {
    border-radius: 50%;
    width: 100%;
}

.first-item .first-item-details {
    width: 150px;
}

.first-item-details .details-name {
    line-height: 1;
    font-weight: bold;
}

.first-item-details .details-email {
    opacity: 75%;
}

.nav-avatar1 img,
.nav-avatar2 img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

/* Dropdown menu */
@media only screen and (max-width: 800px) {
    .navbar {
        padding: 0;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
    }

    .logo {
        width: 100%;
        padding: 3%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
    }

    .logo span {
        font-size: 1.4rem;
    }

    .nav-links {
        display: none;
    }

    .logo .hamburger {
        display: block;
    }

    .logo .nav-avatar1 {
        display: block;
        font-size: 10px;
    }

    .nav-avatar2 {
        display: none;
    }
}

@media only screen and (max-width: 450px) {
}
</style>
