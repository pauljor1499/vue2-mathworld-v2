<template>
    <div class="navbar" id="navbar-header">
        <div class="logo">
            <span> MathMatters </span>
            <v-icon class="hamburger" size="35" @click="drawer = !drawer"> mdi-menu </v-icon>
        </div>
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="text-h6"> MathMatters </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list dense nav>
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
                    <v-list-item dense>
                        <v-list-item-content>
                            <v-btn outlined color="primary" large width="100%" to="signin"> Sign In </v-btn>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item dense>
                        <v-list-item-content>
                            <v-btn color="primary" large width="100%" to="register"> Register </v-btn>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-list>
        </v-navigation-drawer>
        <div class="nav-links">
            <router-link :to="'/'" class="nav-link">
                <span>Home</span>
            </router-link>
            <router-link :to="'/about'" class="nav-link">
                <span>About</span>
            </router-link>
            <router-link :to="'/contact'" class="nav-link">
                <span>Contact</span>
            </router-link>
            <v-btn outlined color="primary" large to="signin"> Sign In </v-btn>
            <v-btn color="primary" large to="register"> Register </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            drawer_items: [
                {
                    title: "Home",
                    icon: "mdi-home",
                    path: "/",
                },
                {
                    title: "About",
                    icon: "mdi-information",
                    path: "/about",
                },
                {
                    title: "Classes",
                    icon: "mdi-bulletin-board",
                    path: "/classes",
                },
            ],
        };
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
    position: relative;
    z-index: 999;
    background-color: white;
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
}

.logo .hamburger {
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

@media only screen and (max-width: 800px) {
    .navbar {
        position: static;
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

    .nav-links {
        display: none;
    }

    .logo span {
        font-size: 1.4rem;
    }

    .logo .hamburger {
        display: block;
    }
}

@media only screen and (max-width: 450px) {
}
</style>
