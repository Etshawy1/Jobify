<template>
    <v-container>
        <v-row no-gutters>
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
                                <v-card-subtitle>{{item.recruiter}}</v-card-subtitle>
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
                    
                    <c-card-text id="job-date">
                        Posted at {{getJobDate(item.createdAt)}}
                    </c-card-text>

                    <v-card-title class="font-weight-light">
                       119 Applicants for this position
                    </v-card-title>    
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            large
                            width = "120">
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
                <v-container>
                    <h2>More Jobs Posted By this campany</h2>
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
                                text>
                                Details
                            </v-btn>
                        </v-card-actions>
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
                    <v-card-title>About 360 Imaging</v-card-title>
                    <v-card-subtitle>Information Technology Services, Internet/E-commerce</v-card-subtitle>
                    <v-card-text class="text--primary">
                        At Beyond Apps Group (www.beyond-apps-group.com ) we are 
                        using state of the art trends, technologies developing unique, awesome 
                        products with enhanced feature sets. Our major product lines using such 
                        technologies as Image Processing, Machine Learning, VR and AI, Multi Camera 
                        Live Streaming Broadcast and Cyber Security for data backups using advanced 
                        encryption/decryption algorithms. We are product based company.
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
           item: {}
        }
    },
    methods: {
        getJobDate: function(d){
            return d.substring(0, 10);
        }
    },
    async mounted(){
      console.log("on mounted function for job apply")
      this.loadingState = true;
      this.errorMessage = ""
      try {
          this.response = await this.$store.dispatch("getJobDetails", {
          userToken : localStorage.getItem('userToken'),
          id : "60b973c30e222736649bc6e0"
        })
        this.item = this.response;
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
