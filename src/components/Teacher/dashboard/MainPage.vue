<template>
    <div class="dashboard-content">
        <div class="content-title">
            <span>Dashboard</span>
        </div>
        <div class="content-actions">
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">
                        <Themes />
                    </div>
                </template>
                <span>Change Theme</span>
            </v-tooltip>
        </div>
        <Section1 />
        <Section2 />
        <Section4 />
        <Section3 />
    </div>
</template>

<script>
import Themes from "@/components/Teacher/dashboard/Themes.vue";
import Section1 from "./section_1/Section1.vue";
import Section2 from "./section_2/Section2.vue";
import Section3 from "./section_3/Section3.vue";
import Section4 from "./section_4/Section4.vue";

export default {
    components: {
        Section1,
        Section2,
        Section3,
        Section4,
        Themes,
    },
};
</script>

<style scoped>
.dashboard-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 10%;
}

.content-actions {
    padding: 0 5%;
    display: flex;
}

.content-title {
    display: flex;
    flex-direction: column;
    padding: 25px 5% 25px 5%;
    background-color: var(--blue-1);
}

.content-title span {
    font-size: 1.5em;
    color: var(--white-1);
}
</style>
