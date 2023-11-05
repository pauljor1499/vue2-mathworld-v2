<template>
    <div>
        <p class="text-justify" style="margin-top: 5px">
            {{ question_content }}
        </p>
        <v-checkbox v-for="(item, index) in question_options" :key="index" hide-details disabled :label="item.content + ''" :value="item + ''">
        </v-checkbox>
        <br />
    </div>
</template>

<script>
export default {
    props: {
        question_content: String,
        question_options: Array,
    },

    data() {
        return {};
    },
};
</script>
