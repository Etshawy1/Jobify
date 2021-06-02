<template>
    <v-container>
        <v-row no-gutters>
            <v-flex md8>
                <v-card
                    v-for="n in 3"
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

                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    v-bind="attrs"
                                    icon
                                    v-on="on">
                                    <v-icon color="blue darken-2">mdi-dots-horizontal</v-icon>
                                </v-btn>           
                                </template>
                                <v-list width="150">
                                <v-list-item-group>
                                                                        
                                    <v-list-item row wrap align-center>
                                    <v-flex md6>
                                        <v-icon color="blue darken-2">mdi-pencil</v-icon>
                                    </v-flex>
                                    <v-flex md6>
                                        <span class="spans-menu">Edit</span>
                                    </v-flex>  
                                    </v-list-item>

                                    <v-list-item row wrap align-center>
                                    <v-flex md6>
                                        <v-icon color="red darken-4">mdi-delete</v-icon>
                                    </v-flex>
                                    <v-flex md6>  
                                        <span class="spans-menu">Delete</span>
                                    </v-flex>  
                                    </v-list-item>
                                </v-list-item-group>
                                </v-list>
                            </v-menu>

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
                            @click="$router.push('/review/' + job_id)">
                            Review Applicants
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
            job_id: 15
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
