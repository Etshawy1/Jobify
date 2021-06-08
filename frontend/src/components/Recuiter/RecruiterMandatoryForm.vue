<template>
<div>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="formData.valid" @submit.prevent="onSubmit">
      <v-container>
        <div class="recruiterTitle text-h2 mb-3">Tell us more about your Company</div>
        <v-row justify="center">
          <v-img
            src="../../assets/companyInfo.png"
            max-width="50%"
            max-height="20%"
          >
          </v-img>
        </v-row>
        <!-- Recruiter info -->
        <v-row>
          <div class="text-h4 text-left mb-2 ml-13">Recruiter info</div>
        </v-row>
        <!-- Company name text field -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Company name"
              dense
              type="text"
              v-model="formData.companyName"
              :rules="[required('Company name')]"
            ></v-text-field>
          </v-col>
          <!-- Address text field -->
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Company Address"
              dense
              type="text"
              v-model="formData.companyAddress"
              :rules="[required('Company Address')]"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- employees-count -->
        <v-row justify="center">
            <v-col cols="10">
                <v-select
                outlined
                dense
                label="Number of Employees"
                v-model="formData.employeesCount"
                :items="employeesCountList"
            ></v-select>
            </v-col>
        </v-row>
        <!-- field -->
        <v-row justify="center">
            <v-col cols="10">
                <v-select
                outlined
                dense
                label="Field"
                v-model="formData.field"
                :items="fieldList"
            ></v-select>
            </v-col>
        </v-row>
        <!-- description text area -->
        <v-row justify="center">
            <v-col cols="10">
                <v-textarea
                label="Please provide a short Description of your company "
                outlined
                v-model="formData.description"
                :rules="[required('Description')]">
                </v-textarea>
            </v-col>
        </v-row>
        <!-- LinkedIN account -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Linked In Profile"
              dense
              type="text"
              v-model="formData.linkedIn"
              :rules="[required('Linked In')]"
            ></v-text-field>
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
        companyName: '',
        companyAddress: '',
        employeesCount : '1-50 Employees',
        field: 'Accounting/Finance',
        linkedIn: '',
        description: ''
      },
        employeesCountList : [
            '1-50 Employees',
            '51-100 Employees',
            '101-300 Employees',
            'more than 301 Employees'
        ],
        fieldList : [
            "Accounting/Finance",
            "Administration",
            "Banking",
            "R&D/Science",
            "Engineering - Construction/Civil/Architecture",
            "Business Development",
            "Creative/Design/Art",
            "Customer Service/Support",
            "Writing/Editorial",
            "Hospitality/Hotels/Food Services",
            "Human Resources",
            "Installation/Maintenance/Repair",
            "IT/Software Development",
            "Legal",
            "Logistics/Supply Chain",
            "Operations/Management",
            "Manufacturing/Production",
            "Marketing/PR/Advertising",
            "Medical/Healthcare",
            "Other",
            "Project/Program Management",
            "Quality",
            "Analyst/Research",
            "Sales/Retail",
            "Media/Journalism/Publishing",
            "Sports and Leisure",
            "Fashion",
            "Pharmaceutical",
            "Tourism/Travel",
            "Purchasing/Procurement",
            "Strategy/Consulting",
            "C-Level Executive/GM/Director",
            "Engineering - Telecom/Technology",
            "Engineering - Mechanical/Electrical",
            "Engineering - Oil & Gas/Energy",
            "Engineering - Other",
            "Education/Teaching",
            "Training/Instructor"
        ],
      errorMessage: "",
      loadingState: false,
      required(propertyType) {
        return (v) =>
          (v && v.length > 0) || `Please enter Your ${propertyType}`;
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
      this.loadingState = true;
      this.errorMessage = ""
      try {
        const payload = {
            userToken : localStorage.getItem('userToken'),
            companyName: this.formData.companyName,
            companyAddress: this.formData.companyAddress,
            employeesCount : this.formData.employeesCount,
            field: this.formData.field,
            linkedIn: this.formData.linkedIn,
            description: this.formData.description
        }
        let response = await this.$store.dispatch("setRecruiterMandatoryData", payload);
        this.loadingState = false;
        this.$router.push('/home')
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
  },
};
</script>

<style scoped>
.recruiterTitle {
  text-align: center;
  font-size: 21px;
  padding-bottom: 10px;
}
</style>
