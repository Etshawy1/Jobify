<template>
<div>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="formData.valid" @submit.prevent="onSubmit">
      <v-container>
        <div class="formTitle text-h2 mb-3">Edit your personal info</div>
        <v-row justify="center" v-if="loadingState">
          <div class="text-center">
              <v-progress-circular
                  indeterminate
                  color="primary"
              ></v-progress-circular>
          </div>
        </v-row>
        <v-row justify="center">
          <v-avatar rounded="circle">
            <img
              v-bind:src="formData.imageUrl"
            >
          </v-avatar>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-file-input
              @change="uploadImg"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              label="Upload Image"
              outlined
              dense
            ></v-file-input>
          </v-col>
        </v-row>
        <!-- first name text field -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="First Name"
              dense
              type="text"
              v-model="formData.firstname"
              :rules="[required('first name')]"
            ></v-text-field>
          </v-col>
          <!-- last name text field -->
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Last Name"
              dense
              type="text"
              v-model="formData.lastname"
              :rules="[required('last name')]"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- dateOfBirth Picker -->
        <v-row justify="center">
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formData.dateOfBirth"
                  label="Birth date"
                  readonly
                  rounded-md
                  outlined
                  dense
                  :rules="[required('birth date')]"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formData.dateOfBirth"
                @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <!-- phone -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Phone Number"
              dense
              type="text"
              v-model="formData.phone"
              :rules="[required('phone number')]"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- gender -->
        <v-row justify="center" justify-md="center">
          <v-radio-group v-model="formData.gender" row>
            <template v-slot:label> <div>Gender</div> </template>
            <v-radio value="male">
              <template v-slot:label>
                <strong>Male</strong>
              </template>
            </v-radio>
            <v-radio value="female">
              <template v-slot:label>
                <strong>female</strong>
              </template>
            </v-radio>
          </v-radio-group>
        </v-row>

        <!-- alert to show that data is updated successfully -->
        <v-row justify="center">
          <v-col cols = "10">
            <v-alert 
            id="backsuccess-alert" 
            v-if="isSuccessful"
            dense
            outlined
            type="success">
              <div>Information is successfully updated </div>
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
        <!-- form submission button -->
        <v-row justify="center">
          <v-col cols="5">
            <v-btn
              block
              color="blue darken-4"
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
        firstname: '',
        lastname: '',
        dateOfBirth: '1999-12-31',
        gender: 'male',
        phone: '',
        imageUrl: ''
      },
      dateMenu: false,
      errorMessage: "",
      isSuccessful: false,
      loadingState: false,
      required(propertyType) {
        return (v) =>
          (v && v.length > 0) || `Please enter Your ${propertyType}`;
      },
      checkEmail() {
        return (v) =>
          (v && /.+@.+\..+/.test(v)) || "Please enter a valid email address !";
      },
      checkLength(propertyType, minLength) {
        return (v) =>
          (v && v.length >= minLength) ||
          `${propertyType} must be longer than ${minLength} characters`;
      },
    };
  },

  async mounted() {
    try {
      this.loadingState = true;
      const payload = {
        userToken : localStorage.getItem('userToken'),
        id : this.$route.params.id
      }
      let response = await this.$store.dispatch('getApplicantProfileData', payload);
      
      let additionalData = response.additionalData
      this.formData.firstname = additionalData.firstName
      this.formData.lastname = additionalData.lastName
      this.formData.imageUrl = response.imageUrl;
      const dob = new Date(additionalData.dateOfBirth)
      this.formData.dateOfBirth =  `${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`
      this.loadingState = false;

      this.formData.phone = additionalData.phone
      this.formData.gender = additionalData.gender
    } catch (error) {
      console.log(error)
      this.loadingState = false;
      this.errorMessage = "Can't retrieve user data currently"
    }
  },

  methods: {
    async onSubmit() {
      this.loadingState = true;
      this.errorMessage = ""
      this.isSuccessful = false
      try {
        const payload = {
          userToken : localStorage.getItem('userToken'),
          firstname : this.formData.firstname,
          lastname : this.formData.lastname,
          dateOfBirth : this.formData.dateOfBirth,
          phone : this.formData.phone,
          gender: this.formData.gender
        }
        let response = await this.$store.dispatch("setApplicantMandatoryData", payload);
        this.loadingState = false;
        this.isSuccessful = true;
      } 
      catch (error) {
        console.log(error)
        this.loadingState = false
        if(error.status === "fail") {
          this.errorMessage = error.msg
        }
        else {
          this.errorMessage = "Please try again later !"
        }
      }
    },
    async uploadImg(file){
      console.log(file);
      this.loadingState = true;
      this.errorMessage = ""
      try {
        const payload = {
          userToken : localStorage.getItem('userToken'),
          file: file
        }
        let response = await this.$store.dispatch("updateImage", payload);
        this.loadingState = false;
        console.log("returned from imageUrl API");
        console.log(response)
        this.formData.imageUrl = response.image;
        localStorage.setItem('userImageUrl', this.formData.imageUrl)
        console.log(this.formData.imageUrl);
      } 
      catch (error) {
        console.log(error)
        this.loadingState = false
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

<style scoped>
.formTitle {
  text-align: center;
  font-size: 21px;
  padding-bottom: 10px;
}
</style>
