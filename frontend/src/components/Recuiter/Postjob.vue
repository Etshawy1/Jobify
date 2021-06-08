<template>
    <div v-if="checkLocalStorage()">
        <h2 style="text-align: center; margin: 10px">Posting a new Job</h2>
        <v-form class="form-post" ref="form">
            <v-text-field 
            style="margin: 20px"
            label="Job Title"
            outlined
            v-model="selected_data.jobTitle"
            :rules="ValidationRulesText"
            required
            ></v-text-field>
            <h3 style="margin: 10px; margin-left:15px">Job Details</h3>
            <v-select
            style="margin: 20px"
            :items="exprience_needed_list"
            label="Experience Needed"
            outlined
            v-model="selected_data.experience"
            :rules="ValidationRulesText"
            required
            ></v-select>
            <v-select
            style="margin: 20px"
            :items="career_level_list"
            label="Career Level"
            outlined
            v-model="selected_data.careerLevel"
            :rules="ValidationRulesText"
            required
            ></v-select>
            <v-text-field 
            style="margin: 20px; width:30%"
            label="Salary (LE)"
            type="number"
            outlined
            v-model="selected_data.salary"
            :rules="ValidationRulesNumbers"
            required
            ></v-text-field>
            <v-select
            style="margin: 20px"
            :items="job_category_list"
            v-model="selected_data.field"
            label="Job Field"
            outlined
            :rules="ValidationRulesText"
            required
            ></v-select>
            <v-select
            v-model="e7"
            :items="skills_list"
            label="Skills and Tools"
            multiple
            style="margin: 20px"
            chips
            v-on:change="getSelectedSkills"
            hint="You Can Select multiple skills"
            persistent-hint
            :rules="ValidationRulesSelect"
            required
            ></v-select>
            <v-textarea
            style="margin: 20px; margin-top:30px"
            outlined
            label="Job Description"
            v-model="selected_data.jobDescription"
            :rules="ValidationRulesText"
            required
            ></v-textarea>     
            <div style="margin:40px; text-align:center;">
                <v-btn
                    color="primary"
                    large
                    width = "120"
                    :disabled="addedSuccessfully"
                    @click="submitForm">
                    Post
                </v-btn>
                <v-alert v-if="show_success" style="margin-top: 20px"
                    type="success"
                >Job is posted successfully</v-alert>
            </div>
        </v-form>  
    </div>
</template>

<script>

import {exprience_needed_list, career_level_list, job_category_list} from "../../const.js";
export default {
    data () {
        return {
            exprience_needed_list:[],
            career_level_list:[],
            job_category_list:[],
            skills_list:[],
            ValidationRulesText: [
                v => !!v || 'This field is required'
            ],
            ValidationRulesNumbers: [
                v => v>0 || 'This field is required to be positive'
            ],
            ValidationRulesSelect: [
                v => v.length>0 || 'This field is required'
            ],
            loadingState: true,
            errorMessage: "",
            response: {},
            items: [],
            selected_data: {},
            create_response: {},
            addedSuccessfully: false,
            show_success: false
        }    
    },
   props: {
   }, 
   async mounted() {
     this.exprience_needed_list = exprience_needed_list,
     this.career_level_list = career_level_list,
     this.job_category_list = job_category_list,
    
    console.log("on mounted function in post job page")
      this.loadingState = true;
      this.errorMessage = ""
      try {
          this.response = await this.$store.dispatch("getAllSkills", {
          userToken : localStorage.getItem('userToken'),
          limit : 100,
          offset : 0
        })
        this.items = this.response.items;
        this.loadingState = false;
        console.log(this.response);
        this.skills_list = this.items.map(value => value.name);
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
       async submitForm(){
            if(this.$refs.form.validate()){
                this.addedSuccessfully = true;
                console.log(this.selected_data);
                console.log("valid input");
                this.errorMessage = ""
                try {
                    this.create_response = await this.$store.dispatch("postJob", {
                    userToken : localStorage.getItem('userToken'),
                    form_input: this.selected_data
                    });
                    console.log(this.create_response);
                    this.show_success=true;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    this.$router.push({path: 'home'});
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
            else
                alert("invalid input");
      },
      getSelectedSkills(selected){
          this.selected_data.skills = selected;
      },
        checkLocalStorage: function(){
            console.log("entering check local storage");
            console.log(localStorage.getItem('userToken'));
            if(localStorage.getItem('userToken') == null)
                return false;
            return true;  
        }  
    }
};
</script>

<style>
.form-post{
    margin: 10px; 
    margin-left: auto;
    margin-right: auto;
    max-width: 70%;
}

</style>
