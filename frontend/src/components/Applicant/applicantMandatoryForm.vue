<template>
<div>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="formData.valid" @submit.prevent="onSubmit">
      <v-container>
        <div class="loginTitle text-h2 mb-3">Tell us more about yourself</div>
        <v-row justify="center">
          <v-img
            src="../../assets/profile.png"
            max-width="50%"
            max-height="20%"
          >
          </v-img>
        </v-row>
        <!-- Personal info -->
        <v-row>
          <div class="text-h4 text-left mb-2 ml-13">Personal info</div>
        </v-row>
        <!-- first name text field -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="First name"
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
              label="Last name"
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
              label="Phone number"
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
              >Submit
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
        phone: ''
      },
      dateMenu: false,
      errorMessage: "",
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
  methods: {
    async onSubmit() {
      console.log("on submit function")
      this.loadingState = true;
      this.errorMessage = ""
      try {
        let userType = await this.$store.dispatch("setApplicantMandatoryData", {
          userToken : localStorage.getItem('userToken'),
          firstname : this.formData.firstname,
          lastname : this.formData.lastname,
          dateOfBirth : this.formData.dateOfBirth,
          phone : this.formData.phone,
          gender: this.formData.gender
        })
        this.loadingState = false;
        this.$router.push('/home')
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
      }
    },
  },
};
</script>

<style scoped>
.loginTitle {
  text-align: center;
  font-size: 21px;
  padding-bottom: 10px;
}
</style>
