<template>
    <div>
        <p class="text-justify" style="margin-top: 5px">
            {{ question_item.question }}
        </p>
        <v-range-slider v-model="range" disabled :max="max" :min="min" hide-details class="align-center">
            <template v-slot:prepend>
                <v-text-field
                    dense
                    disabled
                    :value="range[0]"
                    :max="max"
                    :min="min"
                    label="Min"
                    class="mt-0 pt-0"
                    hide-details
                    type="number"
                    outlined
                    @change="$set(range, 0, $event)"
                />
            </template>
            <template v-slot:append>
                <v-text-field
                    dense
                    disabled
                    :value="range[1]"
                    :max="max"
                    :min="min"
                    label="Max"
                    class="mt-0 pt-0"
                    hide-details
                    type="number"
                    outlined
                    @change="$set(range, 1, $event)"
                />
            </template>
        </v-range-slider>
        <br />
    </div>
</template>

<script>
export default {
    props: {
        question_item: Object,
    },

    data() {
        return {
            min: 0,
            max: 10,
            range: [2, 4],
        };
    },
};
</script>
