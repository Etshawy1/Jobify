<template>
    <v-container>
        <div class="text-center" v-if="loadingState">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
        </div>
        <v-row no-gutters  v-if="!loadingState">            
            <v-flex md8>
                <v-card
                    v-for="item in items"
                    v-bind:key="item"
                    class="mx-auto job-card"
                    elevation="10"
                    outlined
                    hover>
                    <v-container wrap>
                        <v-row no-gutters >
                            <v-flex md10>
                                <v-card-title>{{item.jobTitle}}</v-card-title>
                                <v-card-subtitle>{{item.recruiter.additionalData.name}}</v-card-subtitle>
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
                                        <v-icon color="blue darken-2" @click="$router.push('/editjob/' + job_id)">mdi-pencil</v-icon>
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
                    <v-card-text>
                        {{item.jobDescription}}
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
                            @click="$router.push('/review/' + item._id)">
                            Review Applicants
                        </v-btn>
                    </v-card-actions>
                </v-card>                
            </v-flex>
            <v-spacer/>
            <v-flex md3>
                <v-card
                    class="mx-auto"
                    elevation="2"
                    max-width="350"
                    outlined>
                    <v-card-title>Post a new Job?</v-card-title>
                    <v-card-subtitle>
                        Here you can add a new job based on your full-detailed 
                        specifications and it will</v-card-subtitle>
                    <v-card-actions class="pt-0">
                    <v-btn
                        text
                        color="light-blue darken-4"
                        @click="$router.push('/postjob')">
                        Post a Job
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props: {
        profile_id: String
    },
    data () {
        return {
            job_id: 15,
            loadingState: true,
            errorMessage: "",
            response: {},
            items: []
        }
    },
    async mounted(){
      console.log("on mounted function in my jobs")
      this.loadingState = true;
      this.errorMessage = ""
      try {
          this.response = await this.$store.dispatch("getMyJobs", {
          userToken : localStorage.getItem('userToken'),
          limit : 100,
          offset : 0,
          recruiter_user_id: this.profile_id
        })
        this.items = this.response.items;
        this.loadingState = false;
        console.log(this.response);
      } 
      catch (error) {
        console.log("an error occured")
        this.loadingState = false
        if(error.status === "fail") {
          this.errorMessage = error.msg
        }
        else {
          this.errorMessage = "Please try again later !"
        }
        console.log(error);
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
