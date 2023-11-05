<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data: () => ({
        //
    }),
};
</script>

<style>
/* ::-webkit-scrollbar {
    overflow-y: auto;
} */

:root {
    --red-1: #ffcdcd;
    --red-2: #ff2d2d;
    --red-3: #ff0000;
    --green-1: #b3ffc8;
    --green-2: #3b9353;
    --green-3: #00a558;
    --blue-1: #0091de;
    --blue-2: #ecf8ff;
    --blue-3: #afdefa;
    --white-1: #ffffff;
    --gray-1: #eeeeee;
    --gray-2: #727272;
    --gray-3: #c4c4c4;
    --black-1: #000000;
}

#app {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    text-transform: none;
    list-style: none;

    font-family: "Poppins", sans-serif;
    /* font-family: "Lato", sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--white-1);
}
</style>
