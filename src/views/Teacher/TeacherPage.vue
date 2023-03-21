<template>
    <div class="main-content">
        <NavBar />
        <router-view />
    </div>
</template>

<script>
import NavBar from "@/components/Teacher/main/NavBar.vue";

export default {
    components: { NavBar },
};
</script>
