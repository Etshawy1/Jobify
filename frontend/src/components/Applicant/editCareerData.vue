<template>
<div>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="formData.valid" @submit.prevent="onSubmit">
      <v-container>
          <!-- Career info -->
        <v-row>
          <div class="text-h4 text-left mb-3 ml-13 mt-3">Career Info</div>
        </v-row>

        <!-- career level radio button -->
        <v-row>
          <v-radio-group v-model="formData.careerLevel" col class="ml-10 mb-3">
            <template v-slot:label> <div>What is your current career level ?</div> </template>
            <v-radio :value=cl.value v-for="cl in careerLevels" :key="cl.value">
              <template v-slot:label>
                <strong>{{ cl.label }}</strong>
              </template>
            </v-radio>
          </v-radio-group>
        </v-row>
        <!-- job title -->
        <v-row>
          <v-radio-group v-model="formData.jobTitle" col class="ml-10 mb-3">
            <template v-slot:label> <div>What Job title are you looking for ?</div> </template>
            <v-radio :value=jt.value v-for="jt in jobTitles" :key="jt.value">
              <template v-slot:label>
                <strong>{{ jt.label }}</strong>
              </template>
            </v-radio>
          </v-radio-group>
        </v-row>

        <v-row>
          <v-radio-group v-model="formData.employmentState" col class="ml-10 mb-3">
            <template v-slot:label> <div>What is your current employment state ?</div> </template>
            <v-radio :value=es.value v-for="es in employmentStates" :key="es.value">
              <template v-slot:label>
                <strong>{{ es.value }}</strong>
              </template>
            </v-radio>
          </v-radio-group>
        </v-row>
        
        <v-row justify="center">
          <v-col cols = "10">
          <!-- alert to show any errors returning from back server -->
            <v-alert 
            id="backerr-alert" 
            v-if="errorMessage"
            dense
            outlined
            type="error">
                {{ errorMessage }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="5">
            <v-btn
              block
              color="blue"
              type="submit"
              large
              class="white--text"
              :disabled="!formData.valid"
              >Save Changes
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        valid: false,
        careerLevel : 'Student',
        jobTitle : 'Internship',
        employmentState : 'I am unemployed and desperate for a job'
      },
      careerLevels : [
            {value: 'Student', label: 'A Student'},
            {value: 'Entry Level', label: 'On Entry Level'},
            {value: 'Experienced', label: 'Experienced in your field'},
            {value: 'Manager', label: 'A Manager'},
            {value: 'Senior Management', label: 'A Senior Manager'}
        ],

        jobTitles : [
            {value: 'Internship' , label: 'An Internship'},
            {value: 'Part Time', label: 'A part time job'},
            {value: 'Freelance/Project', label: 'Freelancing'},
            {value: 'Full Time', label: 'A Full time job'},
            {value: 'Work From Home', label: 'Work From Home'}
        ],

        employmentStates : [
            {value : 'I am unemployed and desperate for a job'},
            {value : 'I am actively looking for new opportunities and jobs'},
            {value : "I am happy where I am but don't mind finding good opportunities"},
            {value : 'I am only interested in very specific opportunities'},
            {value : 'I am not looking for a job'}
        ],
      errorMessage: "",
      loadingState: false,
    };
  },
  methods: {
    async onSubmit() {
      
    },
  },
};
</script>

<style scoped>

</style>
