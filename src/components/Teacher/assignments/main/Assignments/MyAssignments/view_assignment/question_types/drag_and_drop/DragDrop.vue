<template>
    <div>
        <p class="text-justify" style="margin-top: 5px">
            {{ question_item.question }}
        </p>
        <div class="drag-and-drop">
            <div class="list-items" :list="list1" group="my-group">
                <div class="item" v-for="item in list1" :key="item">
                    {{ item }}
                </div>
            </div>
            <div class="list-items" :list="list2" group="my-group">
                <div class="item" v-for="item in list2" :key="item">
                    {{ item }}
                </div>
            </div>
        </div>
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
            list1: this.question_item.choices,
            list2: [],
        };
    },
};
</script>

<style scoped>
.drag-and-drop {
    display: flex;
    column-gap: 10px;
}

.list-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    border: 1px solid var(--gray-2);
    background: var(--gray-1);
    padding: 2%;
    color: #fff;
    display: flex;
    flex-direction: column;
}

.item {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    background: var(--gray-2);
}
</style>
