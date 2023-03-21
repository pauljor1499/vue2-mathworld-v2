<template>
    <div class="notes-content">
        <div class="content-title">
            <span>Notes</span>
        </div>
        <div class="content-body"></div>
    </div>
</template>

<style scoped>
.notes-content {
    width: 100%;
}

.content-title {
    display: flex;
    flex-direction: column;
    padding: 25px 5% 25px 5%;
    background-color: var(--blue-1);
}

.content-title span {
    font-size: 1.5em;
    color: var(--white-1);
}

.content-body {
    width: 100%;
    padding: 5%;
}
</style>
