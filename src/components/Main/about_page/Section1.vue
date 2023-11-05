<template>
    <div class="main-content">
        <div class="banner">
            <span class="banner-title"> ABOUT MATHWORLD </span>
            <span class="banner-details"> We're changing the way people think about learning. </span>
        </div>
    </div>
</template>

<style scoped>
.banner {
    width: 100%;
    padding: 5%;
    background-color: #0091de;
    display: flex;
    flex-direction: column;
    text-align: center;
}

.banner-title {
    color: #ffff;
    font-weight: bold;
    font-size: 1em;
}

.banner-details {
    width: 50%;
    margin: auto;
    color: #ffff;
    font-weight: bold;
    font-size: 2em;
    margin-top: 10px;
    line-height: 1.2;
}

@media only screen and (max-width: 800px) {
}

@media only screen and (max-width: 450px) {
    .banner-details {
        width: 100%;
        font-size: 1.5rem;
    }
}
</style>
