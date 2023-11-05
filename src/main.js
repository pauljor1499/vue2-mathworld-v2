import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";
import VCalendar from "v-calendar";
import { createPinia, PiniaVuePlugin } from "pinia";
import VueApexCharts from "vue-apexcharts";

Vue.use(VCalendar, {
    componentPrefix: "vc", // Use <vc-calendar /> instead of <v-calendar />
    screens: {
        mobile: "640px",
        tablet: "576px",
        laptop: "992px",
        desktop: "1200px",
    },
});

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.use(VueApexCharts);

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    pinia,
    render: (h) => h(App),
}).$mount("#app");
