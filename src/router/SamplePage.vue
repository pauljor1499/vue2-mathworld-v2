<template>
    <div class="sample-page">
        <v-card>
            <v-card-text>
                <v-textarea v-model="text" outlined> </v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-select v-model="text_voice" :items="voice_names"></v-select>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="speechText()"> Listen Question </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            speech: new SpeechSynthesisUtterance(),
            text: "Mathematics is an area of knowledge that includes the topics of numbers, formulas and related structures, shapes and the spaces in which they are contained, and quantities and their changes.",
            text_voice: null,
            voice_names: [],
            all_voices: [],
        };
    },

    methods: {
        speechText() {
            window.speechSynthesis.cancel();
            // const selectedVoice = "Google UK English Female";
            const desiredVoice = this.all_voices.find((voice) => voice.name === this.text_voice);
            this.speech.text = this.text;
            this.speech.voice = desiredVoice;
            window.speechSynthesis.speak(this.speech);
        },
    },

    created() {
        window.speechSynthesis.onvoiceschanged = () => {
            this.all_voices = window.speechSynthesis.getVoices();
            this.all_voices.forEach((voice) => {
                this.voice_names.push(voice.name);
            });
        };
    },
};
</script>

<style scoped>
.sample-page {
    padding: 10%;
}
</style>
