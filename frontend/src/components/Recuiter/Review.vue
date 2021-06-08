<template>
    <v-container>
        <div class="text-center" v-if="loadingState">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
        </div>
        <v-row no-gutters v-if="!loadingState">
            <v-flex md8>
                <v-card
                    v-for="item in items"
                    v-bind:key="item"
                    class="mx-auto applicant-card"
                    elevation="10"
                    outlined
                    hover>
                    <v-container wrap>
                        <v-row no-gutters>
                            <v-flex md10>
                                <v-card-title>
                                    {{item.applicant.additionalData.firstName}} {{item.applicant.additionalData.lastName}}
                                </v-card-title>
                                <v-card-subtitle>{{item.applicant.additionalData.currentJob}}</v-card-subtitle>
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
                                    v-bind:src="item.applicant.imageUrl" 
                                    alt="John">
                                </v-avatar>
                                </v-btn>
                            </v-flex>
                        </v-row>
                    </v-container>
                    <div wrap style="margin:10px">
                        <v-btn rounded depressed class="skills-buttons" v-for="skill_item in item.applicant.additionalData.skills" v-bind:key="skill_item">
                            {{skill_item.skill}}
                        </v-btn>
                    </div> 
                    <v-card-text>
                        <strong>What Makes You Different?</strong><br> {{item.questionsAnswers[0]}}
                    </v-card-text>
                    <v-card-text>
                        <strong>Why We Should Hire You?</strong><br> {{item.questionsAnswers[1]}}
                    </v-card-text>
  
                    <v-card-actions>
                        <v-tooltip bottom v-if="item.status == 'applied'">
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                v-on:click="editStatus('In Consideration', item)"
                                v-bind="attrs"
                                v-on="on"
                                color="blue darken-2"
                                icon>
                                <v-icon size="29" color="green"> mdi-checkbox-marked-circle</v-icon>
                            </v-btn>
                            </template>
                            <span>In Consideration</span>
                        </v-tooltip>

                        <v-tooltip bottom v-if="item.status == 'applied'">
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                v-on:click="editStatus('Not Selected', item)"
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
                        <v-btn icon :href="item.applicant.additionalData.onlinePresence.gitHub" target="_blank">
                            <v-icon color="black">mdi-github</v-icon>
                        </v-btn>
                        <v-btn icon :href="item.applicant.additionalData.onlinePresence.linkedIn" target="_blank">
                            <v-icon color="blue darken-2">mdi-linkedin</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <div v-if="item.status == 'In Consideration'" style="margin:20px">
                        <v-icon color="green">mdi-checkbox-marked-circle</v-icon>
                        <span style="margin-left:10px; color:green">In Consideration</span>
                    </div>
                    <div v-if="item.status == 'Not Selected'" style="margin:20px">
                        <v-icon color="red">mdi-account-off</v-icon>
                        <span style="margin-left:10px; color:red">Not Selected</span>
                    </div>
                </v-card>                
            </v-flex>
        </v-row>
    </v-container>
</template>
<script>

export default {
    data () {
        return {
            loadingState: true,
            errorMessage: "",
            response: {},
            items: [],
            status_update:{}
        }
    },
    props:{
        job_id: String
    },
    async mounted(){
        console.log("on mounted in review applicants")
        this.loadingState = true;
        this.errorMessage = ""
        try {
            this.response = await this.$store.dispatch("getApplications", {
                userToken : localStorage.getItem('userToken'),
                job: this.job_id
            })
            this.items = this.response.items;
            console.log("returned from get applicants successfuly");
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
    },
    methods: {
        async editStatus(status_new, item){
            console.log("entering edit status function");
            this.errorMessage = ""
            try {
                this.status_update = await this.$store.dispatch("updateStatus", {
                    userToken : localStorage.getItem('userToken'),
                    app_id: item._id,
                    status: status_new
                });
                console.log(this.status_update);
                item.status = status_new;
            } 
            catch (error) {
                console.log("an error occured")
                if(error.status === "fail") {
                    this.errorMessage = error.msg
                }
                else {
                    this.errorMessage = "Please try again later !"
                }
            }

        }
    },
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
