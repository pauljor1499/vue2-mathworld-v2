<template>
    <div class="about-page-content">
        <Section1 />
        <Subscription />
        <ContactSection />
    </div>
</template>

<script>
import Section1 from "@/components/Main/contact_page/Section1.vue";
import Subscription from "@/components/Main/contact_page/Subscription.vue";
import ContactSection from "@/components/Main/contact_page/Contact.vue";

export default {
    components: { Section1, Subscription, ContactSection },
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
