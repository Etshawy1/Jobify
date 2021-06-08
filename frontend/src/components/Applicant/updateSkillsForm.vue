<template>
<div>
  <v-sheet color="white" rounded="lg">
    <v-container>
      <div class="formTitle text-h2 mb-3"> Update your skills </div>
      <v-row justify="center">
        <v-img
          src="../../assets/skills.png"
          max-width="30%"
          max-height="20%"
        >
        </v-img>
      </v-row>
      <!-- Add skills -->
      <v-row justify="center">
        <v-col cols="3">
            <v-select
                outlined
                dense
                label="skill"
                v-model="selectedSkill"
                :items = "availableSkills"
            ></v-select>
        </v-col>
        <v-col cols="4">
            <v-select
                outlined
                dense
                label="Years of experience"
                v-model="selectedExperiance"
                :items="yearsOfExperiance"
            ></v-select>
        </v-col>
        <v-col cols="3">
          <v-btn
            block
            color="blue darken-4"
            type="submit"
            dense
            class="white--text"
            @click="addSkill"
            >Add skill
          </v-btn>
        </v-col>
      </v-row>
      <!-- show available skills -->
      <v-row v-for="skill in currUserSkills" :key="skill.skillName" class="mb-2">
          <skill-card :skillName="skill.skillName" :yearsOfExperiance="skill.yearOfExperiance"></skill-card>
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
  </v-sheet>
  </div>
</template>

<script>
import SkillCard from "../General/skillCard.vue"
export default {
  components: {SkillCard},
  data() {
    return {
      userSkills: [],
      availableSkills: [],
      yearsOfExperiance: ['Less than 1 year', '1-3 years', '3-5 years', '5-7 years'],
      selectedSkill: '',
      selectedExperiance: '1-3 years',
      errorMessage: "",
      loadingState: false,
      required(propertyType) {
        return (v) =>
          (v && v.length > 0) || `Please enter Your ${propertyType}`;
      },
    };
  },
  async mounted() {
    try {
      // get the available skills for the user to choose from
      let response = await this.$store.dispatch('getAvailableskills', {
      userToken : localStorage.getItem('userToken')
      })
      for(let i = 0; i < response.items.length; i++) {
        this.availableSkills.push(response.items[i].name)
      }

      // get the alread chosen skills by the user
      const payload = {
        id : this.$route.params.id,
        userToken : localStorage.getItem('userID')
      }
      response = await this.$store.dispatch('getApplicantProfileData', payload)
      let returnedSkills = response.additionalData.skills;
      for(let i = 0; i < returnedSkills.length; i++) {
        this.userSkills.push({skillName : returnedSkills[i].skill, yearOfExperiance : returnedSkills[i].yearsExperiance})
      }
    } catch (error) {
      console.log(error)
    }
    
  },
  methods: {
    async addSkill() {
      let skillToAdd = {
        skillName : this.selectedSkill,
        yearOfExperiance: this.selectedExperiance
      };

      let skillAlreadyIncluded = this.userSkills.some((skill) => {
        return skill.skillName === skillToAdd.skillName && skill.yearOfExperiance === skillToAdd.yearOfExperiance
      })

      if(!skillAlreadyIncluded) {
        try {
          this.errorMessage = ''
          const payload = {
            userToken : localStorage.getItem('userToken'),
            skill : skillToAdd
          }
          let response = await this.$store.dispatch('addSkillToApplicant', payload);
          this.userSkills.push(skillToAdd)
        } catch (error) {
          if(error.status === 'fail') {
            this.errorMessage = error.msg;
          }
          else {
            this.errorMessage = "Please try again later"
          }
        }
        
      }
    },
  },
  computed: {
      currUserSkills() {
          return this.userSkills;
      }
  }
};
</script>

<style scoped>
.formTitle {
  text-align: center;
  font-size: 21px;
  padding-bottom: 10px;
}
</style>
