<template>
    <div class="main-page-container">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
    </div>
</template>

<script>
import Section1 from "@/components/Main/landing_page/Section1.vue";
import Section2 from "@/components/Main/landing_page/Section2.vue";
import Section3 from "@/components/Main/landing_page/Section3.vue";
import Section4 from "@/components/Main/landing_page/Section4.vue";
import Section5 from "@/components/Main/landing_page/Section5.vue";

export default {
    components: {
        Section1,
        Section2,
        Section3,
        Section4,
        Section5,
    },
};
</script>

<style scoped>
.main-page-container {
    animation: transitionIn 0.75s;
}

@keyframes transitionIn {
    from {
        opacity: 0;
        transform: translateY(-150px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
