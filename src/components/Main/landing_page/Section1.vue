<template>
    <div class="main-content">
        <div class="message">
            <h1>UNLOCK THE POWER OF YOUR FULL POTENCIAL.</h1>
            <p>You'll definitely find the right solution for your math journey.</p>
            <v-btn color="#00C136" dark x-large to="/register"> JOIN NOW </v-btn>
        </div>
        <div class="image">
            <img src="@/assets/landing_page/section_1/banner.jpg" alt="" />
        </div>
    </div>
</template>

<style scoped>
.link {
    text-decoration: none;
    list-style: none;
    text-transform: initial;
}

.main-content {
    width: 100%;
    display: flex;
    background-color: #0091de;
}

.message {
    flex: 1;
    width: 100%;
    padding: 10% 5% 20% 5%;
}

.message h1 {
    font-family: "Anton", sans-serif;
    line-height: 1;
    font-size: 3.2em;
    color: #ffff;
}

.message p {
    margin-top: 20px;
    font-size: 1.5em;
    color: #ffff;
}

.message .v-btn {
    margin-top: 50px;
    width: 40%;
    font-weight: bold;
    border: 1px solid #ffff;
}

.image {
    flex: 1;
    max-width: 100%;
    max-height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}

.image img {
    width: 75%;
    height: 75%;
    object-fit: cover;
    border-radius: 25% 0% 0% 0%;
    box-shadow: -25px 20px 0px 0px #ffff;
}

@media only screen and (max-width: 800px) {
    .message h1 {
        font-size: 2rem;
    }

    .message p {
        font-size: 1.2rem;
    }
}

@media only screen and (max-width: 450px) {
    .message h1 {
        font-size: 1.2rem;
    }

    .message p {
        font-size: 0.8rem;
    }

    .image img {
        width: 85%;
        height: 75%;
        object-fit: cover;
        border-radius: 25% 0% 0% 0%;
        box-shadow: -10px 10px 0px 0px #ffff;
    }

    .v-btn {
        font-size: 0.8rem;
    }
}
</style>
