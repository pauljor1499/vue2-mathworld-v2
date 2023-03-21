<template>
    <div class="main-dashboard">
        <Header />
        <Section1 />
        <Schedules />
        <Assignments />
        <Grades />
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/Student/dashboard/Header.vue";
import Section1 from "@/components/Student/dashboard/Section1.vue";
import Schedules from "@/components/Student/dashboard/Schedules.vue";
import Assignments from "@/components/Student/dashboard/Assignments.vue";
import Grades from "@/components/Student/dashboard/Grades.vue";
import Footer from "@/components/Student/dashboard/Footer.vue";

export default {
    components: {
        Header,
        Section1,
        Schedules,
        Assignments,
        Grades,
        Footer,
    },
};
</script>

<style scoped>
.main-dashboard {
    display: flex;
    flex-direction: column;
    row-gap: 50px;
}
</style>
