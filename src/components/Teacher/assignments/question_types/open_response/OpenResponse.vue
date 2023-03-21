<template>
    <div>
        <p class="text-justify" style="margin-top: 5px">
            {{ question_item.question }}
        </p>
        <v-textarea outlined hide-details disabled />
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
