<template>
    <div>
        <p class="text-justify" style="margin-top: 5px">
            {{ question_item.question }}
        </p>
        <div id="calculator" style="width: 100%; height: 400px"></div>
        <br />
    </div>
</template>

<script>
import Desmos from "desmos";
export default {
    props: {
        question_item: Object,
    },

    data() {
        return {
            calculator: null,
            expressions: [],
        };
    },

    methods: {
        load_data() {
            const elt = document.getElementById("calculator");
            this.calculator = Desmos.GraphingCalculator(elt, {
                keypad: false,
                settingsMenu: false,
                expressionsTopbar: false,
                decimalToFraction: false,
                sliders: false,
                lockViewport: true,
                expressions: false,
            });
            this.calculator.updateSettings({
                xAxisArrowMode: Desmos.AxisArrowModes.BOTH,
                yAxisArrowMode: Desmos.AxisArrowModes.BOTH,
            });
        },
    },

    mounted() {
        this.load_data();
    },
};
</script>

<style scoped>
.item {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    background: var(--gray-2);
}
</style>
