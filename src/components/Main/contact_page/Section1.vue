<template>
    <div class="main-content">
        <div class="banner">
            <span class="banner-title"> CONTACT US </span>
            <span class="banner-details">
                Reach out to our dedicated team for any inquiries, collaborations, or feedback – we value your input and look forward to hearing from
                you
            </span>
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
    font-size: 1.5em;
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
