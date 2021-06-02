<template>
    <div>
        <h2 style="text-align: center; margin: 10px">Posting a new Job</h2>
        <v-form class="form-post" ref="form">
            <v-text-field 
            style="margin: 20px"
            label="Job Title"
            outlined
            :rules="ValidationRulesText"
            required
            ></v-text-field>
            <h3 style="margin: 10px; margin-left:15px">Job Details</h3>
            <v-select
            style="margin: 20px"
            :items="exprience_needed_list"
            label="Experience Needed"
            outlined
            :rules="ValidationRulesText"
            required
            ></v-select>
            <v-select
            style="margin: 20px"
            :items="career_level_list"
            label="Career Level"
            outlined
            :rules="ValidationRulesText"
            required
            ></v-select>
            <v-text-field 
            style="margin: 20px; width:30%"
            label="Salary (LE)"
            type="number"
            outlined
            :rules="ValidationRulesNumbers"
            required
            ></v-text-field>
            <v-select
            style="margin: 20px"
            :items="job_category_list"
            label="Job Category"
            outlined
            :rules="ValidationRulesText"
            required
            ></v-select>
            <v-select
            v-model="e7"
            :items="job_category_list"
            label="Skills and Tools"
            multiple
            style="margin: 20px"
            chips
            hint="You Can Select multiple skills"
            persistent-hint
            :rules="ValidationRulesSelect"
            required
            ></v-select>
            <v-textarea
            style="margin: 20px; margin-top:30px"
            outlined
            label="Job Description"
            :rules="ValidationRulesText"
            required
            ></v-textarea>     
            <v-textarea
            style="margin: 20px;"
            outlined
            label="Job Requirements"
            :rules="ValidationRulesText"
            required
            ></v-textarea>          
            <div style="margin:40px; text-align:center;">
                <v-btn
                    color="primary"
                    large
                    width = "120"
                    @click="submitForm">
                    Update
                </v-btn>
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
            ValidationRulesText: [
                v => !!v || 'This field is required'
            ],
            ValidationRulesNumbers: [
                v => v>0 || 'This field is required to be positive'
            ],
            ValidationRulesSelect: [
                v => v.length>0 || 'This field is required'
            ]
        }    
    },
   mounted() {
     this.exprience_needed_list = exprience_needed_list,
     this.career_level_list = career_level_list,
     this.job_category_list = job_category_list
   },
   methods: {
       submitForm(){
            if(this.$refs.form.validate()){
                 console.log("valid");
            } 
            else
                alert("invalid input");
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
