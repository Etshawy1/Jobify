<template>
<div>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="formData.valid" @submit.prevent="onSubmit">
      <v-container>
        <v-row justify="center" v-if="loadingState">
          <div class="text-center">
              <v-progress-circular
                  indeterminate
                  color="primary"
              ></v-progress-circular>
          </div>
        </v-row>
          <!-- Career info -->
        <v-row>
          <div class="text-h4 text-left mb-3 ml-13 mt-3">Job Categories</div>
        </v-row>
        <v-row>
            <div class="text-h6 ml-13 mb-2">What job categories are you interested in?</div>
        </v-row>
        <v-row justify="center">
            <v-col cols="11">
                <v-combobox
                multiple 
                outlined
                v-model="userJobCategories"
                label="Job Category"
                chips
                clearable
                :items="jobCategories">
                </v-combobox>
            </v-col>
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
        <v-row justify="center">
          <v-col cols = "10">
            <v-alert 
            id="backsuccess-alert" 
            v-if="isSuccessful"
            dense
            outlined
            type="success">
              <div>job Categories were successfully updated </div>
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
      },
      jobCategories: [],
      userJobCategories : [],
      errorMessage: "",
      loadingState: false,
      isSuccessful: false
    };
  },
  async mounted() {
    try {
        this.loadingState = true
        const payload = {
            userToken : localStorage.getItem('userToken'),
            id : this.$route.params.id
        }
        let response = await this.$store.dispatch('getApplicantProfileData', payload);
        this.userJobCategories = response.additionalData.categories;

        response = await this.$store.dispatch('getAvailableJobCategories', payload);
        let returnedJobCategories = response.items;
        for(let i = 0; i < returnedJobCategories.length; i++) {
            this.jobCategories.push(returnedJobCategories[i].name)
        }
        this.loadingState = false
    } catch (error) {
        this.loadingState = false
        console.log(error)
        this.errorMessage = "Can't retrieve user data currently"
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.loadingState = true
        this.isSuccessful = false;
        const payload = {
            userToken : localStorage.getItem('userToken'),
            jobCategories : this.userJobCategories
        };
        let response = await this.$store.dispatch('updateApplicantJobCategories', payload);
        this.isSuccessful = true
        this.loadingState = false
      } 
      catch (error) {
          console.log(error)
          this.loadingState = false
          if(error.status === 'fail') {
              this.errorMessage = error.msg
          }
          else {
              this.errorMessage = "Please try again later !"
          }
      }
    },
  },
};
</script>

<style scoped>

</style>
