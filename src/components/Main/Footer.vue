<template>
    <footer>
        <div class="footer-body">
            <div class="content">
                <div class="about">
                    <h3>MATHMATTERS</h3>
                    <p>
                        At MathMatters, we hold the belief that everyone, no matter their age, gender, or race, possesses a natural aptitude for
                        comprehending mathematical concepts. Based on this foundation, we aim to create a setting for learning that recognizes and
                        fosters each person's unique abilities, encouraging them to develop their skills to the fullest extent possible.
                    </p>
                </div>
            </div>

            <div class="content">
                <div class="tests">
                    <h3>TESTS</h3>
                    <router-link :to="{ path: 'about', hash: '#section3' }" class="item"> MathMatters Test </router-link>
                    <router-link :to="{ path: 'about', hash: '#section3' }" class="item"> Scholastic Aptitude Test </router-link>
                    <router-link :to="{ path: 'about', hash: '#section3' }" class="item"> American College Test </router-link>
                    <router-link :to="{ path: 'about', hash: '#section3' }" class="item"> Texas Success Initiative </router-link>
                </div>
            </div>

            <div class="content">
                <div class="pages">
                    <h3>PAGES</h3>
                    <router-link :to="{ path: '/', hash: '#navbar-header' }" class="item"> Home </router-link>
                    <router-link :to="{ path: 'about', hash: '#navbar-header' }" class="item"> About</router-link>
                    <router-link :to="{ path: 'contact', hash: '#navbar-header' }" class="item"> Contact </router-link>
                </div>
            </div>

            <div class="content">
                <div class="socials">
                    <h3>FOLLOW US</h3>
                    <div class="social-links">
                        <router-link :to="{ path: '/', hash: '#navbar-header' }" class="social-item">
                            <v-icon color="white"> mdi-facebook </v-icon>
                        </router-link>
                        <router-link :to="{ path: '/', hash: '#navbar-header' }" class="social-item">
                            <v-icon color="white"> mdi-twitter </v-icon>
                        </router-link>
                        <router-link :to="{ path: '/', hash: '#navbar-header' }" class="social-item">
                            <v-icon color="white"> mdi-instagram </v-icon>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div>&copy; 2023 by MathMatters. All rights reserved.</div>
        </div>
    </footer>
</template>

<style scoped>
* {
    text-decoration: none;
    text-transform: none;
}

footer {
    background-color: #003754;
    background-image: url("@/assets/footer/footer_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
}

footer .footer-body {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 100px;
    padding: 5%;
}

footer .footer-body .content {
    width: 100%;
    color: #ffff;
    text-align: left;
}

footer .footer-body .content h3 {
    margin-bottom: 20px;
    color: #ffff;
}

footer .footer-body .content .about {
    text-align: justify;
    text-justify: inter-word;
}

footer .footer-body .content .about p {
    color: #ffff;
}

.item {
    display: block;
    color: #ffff;
    margin-top: 5px;
}

.item:hover {
    color: #00a6ff;
    opacity: 100%;
}

footer .footer-bottom {
    width: 100%;
    padding: 10px 70px 10px 70px;
    background-color: #002133;
    text-align: center;
}

footer .footer-bottom div {
    padding: 20px;
    color: white;
}

.social-links {
    display: flex;
    justify-content: space-between;
}

.social-links .social-item {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #002a41;
}

.social-links .social-item .v-icon {
    width: 100%;
    height: 100%;
    margin: auto;
}

.social-item:hover {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #137db6;

    display: flex;
    justify-content: center;
    align-items: center;
}

@media only screen and (max-width: 800px) {
    footer .footer-body {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    footer .footer-body .content .about,
    footer .footer-body .content .tests,
    footer .footer-body .content .pages,
    footer .footer-body .content .socials {
        text-align: center;
        text-justify: inter-word;
    }

    .social-links {
        display: flex;
        justify-content: space-evenly;
    }
}

@media only screen and (max-width: 450px) {
    footer .footer-body {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }
}
</style>
