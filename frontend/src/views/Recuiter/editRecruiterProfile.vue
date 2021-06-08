<template>
    <div class="recruiterProfile">
        <nav-bar></nav-bar>
        <v-container>
            <v-row justify="center">
                <v-col cols="10">
                    <edit-recruiter-form></edit-recruiter-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import NavBar from '../../components/HomePage/NavBar.vue'
import editRecruiterForm from '../../components/Recuiter/editRecruiterForm.vue'

export default {
    components: {
        editRecruiterForm,
        NavBar
    }
}
</script>

<style scoped>
    .recruiterProfile {
        background-color: rgba(0, 0, 255, 0.6);
        height: 100%
    } 
</style>NavBar