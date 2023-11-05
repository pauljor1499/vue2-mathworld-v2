<template>
    <div>
        <p class="text-justify" style="margin-top: 5px">
            {{ question }}
        </p>
        <v-textarea outlined hide-details disabled />
        <br />
    </div>
</template>

<script>
export default {
    props: {
        question: String,
    },

    data() {
        return {};
    },
};
</script>
