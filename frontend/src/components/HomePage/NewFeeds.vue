<template>
    <v-container>
        <v-row no-gutters>
            <v-flex md8>
                <v-card
                    v-for="n in 5"
                    v-bind:key="n"
                    class="mx-auto job-card"
                    elevation="10"
                    outlined
                    hover>
                    <v-container wrap>
                        <v-row no-gutters >
                            <v-flex md10>
                                <v-card-title>Android Developer Full Time</v-card-title>
                                <v-card-subtitle>360 imaging, Dokki</v-card-subtitle>
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex md1>
                                <v-btn 
                                v-bind="attrs"
                                v-on="on"
                                icon
                                id = "company-image">
                                <v-avatar>
                                    <img
                                    src="../../assets/man.png"
                                    alt="John">
                                </v-avatar>
                                </v-btn>
                            </v-flex>
                        </v-row>
                    </v-container>
                    <v-card-text>Entry Level · 1-3 Yrs of Exp · Information Technology (IT) · Computer Science 
                                · Software Development · Software Engineering · Programming · Cross-Platform 
                                · WebGL · iOS · Android · Native Mobile Development
                    </v-card-text>    
                    <v-card-actions>
                        <v-btn
                            color="blue darken-2"
                            text>
                            Share
                        </v-btn>
                        <v-btn
                            color="blue darken-2"
                            text
                            @click="$router.push('/apply/' + id)">
                            Details
                        </v-btn>
                    </v-card-actions>
                </v-card>                
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md3>
                <v-card
                    class="mx-auto"
                    elevation="2"
                    max-width="350"
                    outlined>
                    <v-card-title>Improve Your Profile</v-card-title>
                    <v-card-subtitle v-show="type">So that the employers can be attracted to you</v-card-subtitle>
                    <v-card-subtitle v-show="!type">So that the employees can be attracted to your company</v-card-subtitle>
                    <v-card-actions class="pt-0">
                    <v-btn
                        text
                        color="light-blue darken-4"
                        :to="{
                            path: `editapplicantprofile/${currUserId}`,
                            query: { redirect: this.$route.query.redirect },
                        }"
                        @click="reveal = false">
                        Update Here
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data () {
        return {
            id: 12,
            type: true,
            currUserId: localStorage.getItem('userID')
        }
    }
};
</script>

<style>

#company-image{
    margin-top: 10px;
}
.job-card{
    margin: 10px;
}

</style>
