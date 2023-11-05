<template>
    <div class="main-container">
        <NavBar />
        <router-view />
        <Footer />
    </div>
</template>

<script>
import NavBar from "@/components/Main/NavBar.vue";
import Footer from "@/components/Main/Footer.vue";

export default {
    components: {
        NavBar,
        Footer,
    },
};
</script>
