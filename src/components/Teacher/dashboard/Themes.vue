<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn fab icon outlined color="primary" small v-bind="attrs" v-on="on">
                <v-icon> mdi-theme-light-dark </v-icon>
            </v-btn>
        </template>
        <v-list dense>
            <v-list-item link dense>
                <v-btn elevation="0" fab x-small color="black" dense @click="changeBlackTheme()" />
            </v-list-item>
            <v-list-item link dense>
                <v-btn elevation="0" fab x-small color="red" dense @click="changeRedTheme()" />
            </v-list-item>
            <v-list-item link dense>
                <v-btn elevation="0" fab x-small color="yellow" dense @click="changeYellowTheme()" />
            </v-list-item>
            <v-list-item link dense>
                <v-btn elevation="0" fab x-small color="green" dense @click="changeGreenTheme()" />
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
let getRoot = document.querySelector(":root");

export default {
    methods: {
        changeBlackTheme() {
            getRoot.style.setProperty("--blue-1", "black");
        },
        changeRedTheme() {
            getRoot.style.setProperty("--blue-1", "red");
        },
        changeYellowTheme() {
            getRoot.style.setProperty("--blue-1", "yellow");
        },
        changeGreenTheme() {
            getRoot.style.setProperty("--blue-1", "green");
        },
    },
};
</script>
