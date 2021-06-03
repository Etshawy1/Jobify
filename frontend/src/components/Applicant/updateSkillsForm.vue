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
      userSkills: [
          {skillName: 'C', yearOfExperiance: '3-5 years'}
      ],
      availableSkills: ['C', 'java', 'javascript'],
      yearsOfExperiance: ['Less than 1 year', '1-3 years', '3-5 years', '5-7 years'],
      selectedSkill: '',
      selectedExperiance: '',
      errorMessage: "",
      loadingState: false,
      required(propertyType) {
        return (v) =>
          (v && v.length > 0) || `Please enter Your ${propertyType}`;
      },
    };
  },
  methods: {
    async addSkill() {
        this.userSkills.push({
            skillName: this.selectedSkill,
            yearOfExperiance: this.selectedExperiance
        })
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
