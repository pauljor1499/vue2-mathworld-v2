<template>
    <div>
        <div class="main-content">
            <div class="content-details">
                <div>
                    <h1>Page Not Found</h1>
                    <p>Sorry, the page you are looking for does not exist.</p>
                </div>
                <v-btn
                    outlined
                    color="primary"
                    @click="$router.push('/teacher').catch((err) => err)"
                >
                    Go back to Dashboard</v-btn
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10%;
}

.content-details {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 20px;
    text-align: center;
}
</style>
