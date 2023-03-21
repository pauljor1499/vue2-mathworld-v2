<template>
    <div class="about-page-content">
        <Section1 />
        <Mission />
        <Vision />
        <Values />
        <Section3 />
        <Section4 />
    </div>
</template>

<script>
import Section1 from "@/components/Main/about_page/Section1.vue";
import Vision from "@/components/Main/about_page/Vision.vue";
import Section3 from "@/components/Main/about_page/Section3.vue";
import Section4 from "@/components/Main/about_page/Section4.vue";
import Mission from "@/components/Main/about_page/Mission.vue";
import Values from "@/components/Main/about_page/Values.vue";

export default {
    components: { Section1, Mission, Vision, Values, Section3, Section4 },
};
</script>

<style scoped>
.about-page-content {
    display: flex;
    flex-direction: column;
    row-gap: 100px;
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

@media only screen and (max-width: 800px) {
}

@media only screen and (max-width: 450px) {
}
</style>
