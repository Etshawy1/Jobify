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
                                <v-btn 
                                v-bind="attrs"
                                v-on="on"
                                icon
                                id = "company-image">
                                <v-avatar>
                                    <img
                                    v-bind:src="item.recruiter.imageUrl"
                                    alt="John">
                                </v-avatar>
                                </v-btn>
                            </v-flex>
                        </v-row>
                    </v-container>
                    
                    <c-card-text id="job-date">
                        Posted at {{getJobDate(item.createdAt)}}
                    </c-card-text>

                    <v-card-title class="font-weight-light">
                       {{item.recruiter.additionalData.employeesCount}}
                    </v-card-title>    
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            large
                            width = "120"
                            v-show="checkUserType()"
                            >
                            Apply
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    small
                                    v-bind="attrs"
                                    v-on="on"
                                    color="primary">
                                    <v-icon dark>
                                    mdi-share
                                </v-icon>
                                </v-btn>                        
                            </template>
                            <span>Share</span>
                        </v-tooltip>
                    </v-card-actions>
                </v-card>
                
                <v-card
                    class="mx-auto job-card"
                    elevation="10"
                    outlined>
                    <v-card-title>Job Details</v-card-title>
                    <v-container>
                        <v-row no-gutters>
                            <v-flex md3>
                                <v-card-text class="font-weight-black">Experience Needed:</v-card-text>
                                <v-card-text class="font-weight-black">Career Level:</v-card-text>
                                <v-card-text class="font-weight-black">Salary:</v-card-text>
                                <v-card-text class="font-weight-black">Job Category:</v-card-text>
                            </v-flex>
                            <v-spacer></v-spacer>                            
                            <v-flex md9>
                                <v-card-text>{{item.experience}}</v-card-text>
                                <v-card-text>{{item.careerLevel}}</v-card-text>
                                <v-card-text>{{item.salary}}</v-card-text>
                                <v-card-text>{{item.field}}</v-card-text>
                            </v-flex>
                        </v-row>    
                    </v-container>                   
                </v-card>

                <v-card
                    class="mx-auto job-card"
                    elevation="10"
                    outlined>
                    <v-card-title>Skills and Tools</v-card-title>
                    <div wrap style="margin:10px">
                        <v-btn rounded depressed class="skills-buttons" v-for="n in item.skills" v-bind:key="n">
                            {{n}}
                        </v-btn>
                    </div>                    
                </v-card>
                
                <v-card
                    class="mx-auto job-card"
                    elevation="10"
                    outlined>
                    <v-card-title>Job Description</v-card-title>
                    <v-card-text class="text--primary">
                        {{item.jobDescription}}  
                    </v-card-text>
                </v-card>
                <v-container v-if="suggest_list.length-1">
                    <h2 >More Jobs Posted By this campany</h2>
                    <v-card
                        v-for="item in suggest_list"
                        v-bind:key="item"
                        v-show="checkRepeat(item._id)"
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
                                    <v-btn 
                                    v-bind="attrs"
                                    v-on="on"
                                    icon
                                    id = "company-image">
                                    <v-avatar>
                                        <img
                                        v-bind:src="item.recruiter.imageUrl" 
                                        alt="John">
                                    </v-avatar>
                                    </v-btn>
                                </v-flex>
                            </v-row>
                        </v-container>
                        <v-card-text>
                            {{item.jobDescription}}
                        </v-card-text>    
                        <!--
                        <v-card-actions>
                            <v-btn
                                color="blue darken-2"
                                text>
                                Share
                            </v-btn>
                            <v-btn
                                color="blue darken-2"
                                text
                                @click="$router.push('/apply/' + item._id)">
                                Details
                            </v-btn>
                        </v-card-actions>
                        -->
                    </v-card>                                
                </v-container>
            </v-flex>

            <v-spacer></v-spacer>
            
            <v-flex md3>
                <v-card
                    class="mx-auto"
                    elevation="2"
                    max-width="450"
                    outlined>
                    <v-card-title>More about {{item.recruiter.additionalData.name}}</v-card-title>
                    <v-card-subtitle>Specialized in {{item.field}}</v-card-subtitle>
                    <v-card-text class="text--primary">
                             {{item.recruiter.additionalData.description}}
                    </v-card-text>
                    <v-card-text class="text--primary">
                            Contact Info: 
                    </v-card-text>
                    <v-card-text class="text--primary">
                        <a :href="`mailto:${item.recruiter.email}`">{{item.recruiter.email}}</a>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props: {
        job_id: String
    },    
    data () {
        return {
           loadingState: true,
           errorMessage: "",
           response: {},
           item: {},
           suggest_list: [],
           response2:{}
        }
    },
    methods: {
        getJobDate: function(d){
            return d.substring(0, 10);
        },
        checkUserType: function(){
            if(localStorage.getItem('userType')=="recruiter")
                return false;
            return true;    
        },
        checkRepeat: function(s_id){
            if(s_id == this.job_id)
                return false;
            return true;    
        },
        checkSugestLength: function(){
            if(suggest_list.length == 0)
                return false;
            return true;    
        }
    },
    async mounted(){
      console.log("on mounted function for job apply")
      this.loadingState = true;
      this.errorMessage = ""
      try {
          this.response = await this.$store.dispatch("getJobDetails", {
          userToken : localStorage.getItem('userToken'),
          id : this.job_id
        })
        this.item = this.response;
        console.log(this.response);
        //getSugestions(this.item.recruiter._id);
        console.log("get suggestions function in job apply")
        this.loadingState = true;
        this.errorMessage = ""
        try {
            this.response2 = await this.$store.dispatch("getMyJobs", {
            userToken : localStorage.getItem('userToken'),
            limit : 10,
            offset : 0,
            recruiter_user_id: this.item.recruiter._id
            })
            this.suggest_list = this.response2.items;
            this.loadingState = false;
            console.log(this.response2);
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
        this.loadingState = false;
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
#job-date{
    margin-left: 20px;
}

.headers3{
    margin: 20px;
}

.skills-buttons{
    margin: 5px;
}
</style>
