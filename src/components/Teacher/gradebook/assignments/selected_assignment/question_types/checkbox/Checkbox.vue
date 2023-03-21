<template>
    <div>
        <p class="text-justify" style="margin-top: 5px">
            {{ question_item.question }}
        </p>
        <v-checkbox
            v-for="item in question_item.choices"
            :key="item"
            hide-details
            disabled
            :label="item + ''"
            :value="item + ''"
        >
        </v-checkbox>
        <br />
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
