<template>
  <div class="editApplicant">
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
                        link
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
                    title: 'Update Salary',
                    icon: 'mdi-cash'
                },
                {
                    title: 'Update Skills',
                    icon: 'mdi-brain',
                    toUrl: `/editapplicantprofile/${this.$route.params.id}/updateskills`
                }
            ]
        }
    },

}
</script>

<style scoped>
.editApplicant {
  background-color: rgba(0, 0, 255, 0.6);
  height: 100%
}
</style>