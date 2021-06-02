<template>
    <v-container>
        <v-row no-gutters>
            <v-flex md8>
                <v-card
                    v-for="n in 12"
                    v-bind:key="n"
                    class="mx-auto applicant-card"
                    elevation="10"
                    outlined
                    hover>
                    <v-container wrap>
                        <v-row no-gutters>
                            <v-flex md10>
                                <v-card-title>Hossam Alaa</v-card-title>
                                <v-card-subtitle>Android Developer Freelancer</v-card-subtitle>
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex md1>
                                <v-btn 
                                v-bind="attrs"
                                v-on="on"
                                icon
                                id = "applicant-image">
                                <v-avatar>
                                    <img
                                    src="../../assets/man.png"
                                    alt="John">
                                </v-avatar>
                                </v-btn>
                            </v-flex>
                        </v-row>
                    </v-container>
                    <div wrap style="margin:10px">
                        <v-btn rounded depressed class="skills-buttons" v-for="n in 7" v-bind:key="n">
                            Android
                        </v-btn>
                    </div>         
                    <v-card-actions>
                        
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            color="blue darken-2"
                            icon
                            >
                            <v-icon size="29" color="green"> mdi-checkbox-marked-circle</v-icon>
                        </v-btn>
                        </template>
                        <span>In Consideration</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            color="blue darken-2"
                            icon>
                            <v-icon color="red">mdi-block-helper</v-icon>
                        </v-btn>
                        </template>
                        <span>Not Selected</span>
                        </v-tooltip>
                        <v-spacer></v-spacer>
                        <v-btn icon href="https://github.com/" target="_blank">
                            <v-icon color="black">mdi-github</v-icon>
                        </v-btn>
                        <v-btn icon href="https://www.linkedin.com/" target="_blank">
                            <v-icon color="blue darken-2">mdi-linkedin</v-icon>
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
            type: true
        }
    }
};
</script>

<style>
#applicant-image{
    margin-top: 10px;
}
.applicant-card{
    margin: 10px;
}

</style>
