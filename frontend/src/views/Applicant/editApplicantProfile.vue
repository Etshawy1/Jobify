<template>
  <div class="editApplicant" v-if="checkLocalStorage()">
      <nav-bar/>
      <v-container>
          <v-row>
              <v-col cols="3">
                <v-card
                elevation="12"
                width="256"
                >
                <v-navigation-drawer
                    floating
                    permanent
                >
                    <v-list
                    dense
                    rounded
                    >
                    <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        :to="item.toUrl"
                    >
                        <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>
                </v-navigation-drawer>
                </v-card>
              </v-col>

              <v-col cols="8">
                  <router-view></router-view>
              </v-col>
          </v-row>
      </v-container>
  </div>
</template>

<script>
import NavBar from "../../components/HomePage/NavBar.vue"

export default {
    name: "editApplicantProfile",
    components: {
        NavBar
    },
    data() {
        return { 
            items: [
                {
                    title: 'Personal inforamtion',
                    icon: 'mdi-account',
                    toUrl: `/editapplicantprofile/${this.$route.params.id}`
                },
                {
                    title: 'Update CV',
                    icon: 'mdi-file-document',
                    toUrl: `/editapplicantprofile/${this.$route.params.id}/updatecv`
                },
                {
                    title: 'Career Interests',
                    icon: 'mdi-cash',
                    toUrl: `/editapplicantprofile/${this.$route.params.id}/careerinterests`
                },
                {
                    title: 'Update Skills',
                    icon: 'mdi-brain',
                    toUrl: `/editapplicantprofile/${this.$route.params.id}/updateskills`
                },
                {
                    title: "Online Presence",
                    icon: 'mdi-account-group',
                    toUrl: `/editapplicantprofile/${this.$route.params.id}/onlinepresence`
                }
            ]
        }
    },
    methods: {
        checkLocalStorage: function(){
            console.log("entering check local storage");
            console.log(localStorage.getItem('userToken'));
            if(localStorage.getItem('userToken') == null)
                return false;
            return true;  
        }
    }

}
</script>

<style scoped>
.editApplicant {
  background-color: rgba(0, 0, 255, 0.6);
  height: 100%
}
</style>