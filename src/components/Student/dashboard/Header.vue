<template>
    <div class="main-content">
        <div class="content-item">
            <span class="item-title"> Hi, James! </span>
            <span class="item-subtitle">
                We are here to help you manage your classes.
            </span>
        </div>
        <div class="content-item">
            <span class="item-subtitle"> School Year: 2022-2023 </span>
            <span class="item-subtitle"> Semester: Fall </span>
        </div>
    </div>
</template>

<style scoped>
.main-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 40px 5%;
    background-color: var(--blue-1);
}

.content-item {
    display: flex;
    flex-direction: column;
}

.item-title {
    font-size: 1.5em;
    color: var(--white-1);
}

.item-subtitle {
    color: var(--gray-1);
}
</style>
