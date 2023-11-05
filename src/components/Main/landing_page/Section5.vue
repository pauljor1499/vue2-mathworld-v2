<template>
    <div class="main-content">
        <div class="content-title">
            <h1>Create online classrooms and train your learners easily and effectively.</h1>
            <div>
                <v-btn color="#ffff" dark x-large :to="{ path: 'signin', hash: '#navbar-header' }"> GET STARTED </v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped>
.link {
    text-decoration: none;
    list-style: none;
    text-transform: initial;
}

.v-btn {
    font-weight: bold;
    color: #001632;
}

.main-content {
    background-image: url("https://img.freepik.com/premium-vector/back-school-supplies-background_75047-52.jpg");
    background-color: #003f92;
    background-blend-mode: multiply;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 50px 0px;
}

.content-title {
    width: 50%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin: auto;
    text-align: center;
    color: #ffff;
}

h1 {
    font-size: 2em;
    line-height: normal;
}

@media only screen and (max-width: 800px) {
    .content-title {
        width: 75%;
    }
}

@media only screen and (max-width: 450px) {
    .main-content {
        padding: 10% 5%;
    }

    .content-title {
        width: 100%;
    }

    h1 {
        font-size: 1.3rem;
    }

    .v-btn {
        font-size: 0.8rem;
    }
}
</style>
