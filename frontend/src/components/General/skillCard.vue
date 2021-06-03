<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="10">
                <v-sheet color="white" rounded elevation="3">
                    <v-row justify="center">
                        <v-col cols="6">
                            <div class="text-h6">{{skillName}}</div>
                        </v-col>
                        <v-col cols="4">
                            <v-rating 
                                readonly
                                v-model="rateSkill"
                                small
                                color="yellow"
                            ></v-rating>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props:['skillName', 'yearsOfExperiance'],
    computed: {
        rateSkill() {
            if(this.yearsOfExperiance === 'Less than 1 year') {
                return 1.5
            }
            else if(this.yearsOfExperiance === '1-3 years') {
                return 3
            }
            else if(this.yearsOfExperiance === '3-5 years') {
                return 4
            }
            else {
                return 5
            }
        }
    }
}
</script>

<style>

</style>