<template>
    <div>
        <p class="text-justify" style="margin-top: 5px">
            {{ question_item.question }}
        </p>
        <v-radio-group>
            <v-radio v-for="item2 in question_item.choices" :key="item2" :label="`${item2}`" :value="item2" disabled> </v-radio>
        </v-radio-group>
    </div>
</template>

<script>
export default {
    props: {
        question_item: Object,
    },

    data() {
        return {};
    },
};
</script>
