<template>
<div>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="formData.valid" @submit.prevent="onSubmit">
      <v-container>
        <!-- Expected Salary -->
        <v-row>
          <div class="text-h4 text-left mb-3 ml-13 mt-3">Expected Salary</div>
        </v-row>
        <!-- Salary text field -->
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field
              rounded-md
              outlined
              label="Your Expected Salary"
              dense
              type="text"
              v-model="formData.salary"
            ></v-text-field>
          </v-col>
          <!-- form submission button -->
          <v-col cols="3">
            <v-btn
              block
              color="blue"
              type="submit"
              dense
              class="white--text"
              :disabled="!formData.valid"
              >Save Changes
            </v-btn>
          </v-col>
        </v-row>
        <!-- alert to show that updating salary was successful -->
        <v-row justify="center">
          <v-col cols = "10">
            <v-alert 
            id="backsuccess-alert" 
            v-if="isSuccessful === true"
            dense
            outlined
            type="success">
              <div>Salary was successfully updated </div>
            </v-alert>
          </v-col>
        </v-row>
        <!-- alert to show any errors returning from back server -->
        <v-row justify="center">
          <v-col cols = "10">
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
        salary: ''
      },
      isSuccessful: false,
      errorMessage: "",
      loadingState: false,
      checkLength(propertyType, minLength) {
        return (v) =>
          (v && v.length >= minLength) ||
          `${propertyType} must be longer than ${minLength} characters`;
      },
    };
  },
  methods: {
    async onSubmit() {
      this.isSuccessful = false
      this.loadingState = true;
      this.errorMessage = ""
      try {
        const payload = {
            userToken : localStorage.getItem('userToken'),
            salary : this.formData.salary
        }
        this.$store.dispatch('updateSalary', payload)
        this.loadingState = false;
        this.isSuccessful = true;
      } 
      catch (error) {
        this.loadingState = false
        if(error.status === "fail") {
          this.errorMessage = error.msg
        }
        else {
          this.errorMessage = "Please try again later !"
        }
      }
    },
  },
    async mounted() {
        try {
            let response = await this.$store.dispatch('getApplicantProfileData', {
                userToken : localStorage.getItem('userToken'),
                id : this.$route.params.id
            })
            this.formData.salary =  response.additionalData.salary
        }
        catch(error) {
            this.errorMessage = "Error loading saved salary"
        }
    }
};
</script>

<style scoped>
.loginTitle {
  text-align: center;
  font-size: 21px;
  padding-bottom: 10px;
}
</style>
