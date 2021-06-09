  
<template>
  <div>
    <br />
    <v-row>
      <h1 style="color: #fff">Dashboard</h1>
    </v-row>
    <br />
    <v-card shaped hover>
      <v-container>
        <v-row no-gutters>
          <v-flex md6 lg6>
            <apexchart
              width="500"
              type="pie"
              :options="chartOptions1"
              :series="postedJobs"
            ></apexchart>
          </v-flex>
          <v-divider vertical></v-divider>

          <v-flex md6 lg6>
            <apexchart
              width="500"
              type="pie"
              :options="chartOptions2"
              :series="chart1"
            ></apexchart>
          </v-flex>
        </v-row>
        <br />
        <v-divider></v-divider>
        <br />
        <v-row>
          <v-flex md6 lg6>
            <apexchart
              width="500"
              type="pie"
              :options="chartOptions3"
              :series="chart2"
            ></apexchart>
          </v-flex>
          <v-divider vertical></v-divider>

          <v-flex md6 lg6>
            <apexchart
              width="500"
              type="pie"
              :options="chartOptions4"
              :series="chart3"
            ></apexchart>
          </v-flex>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      chart1: [0, 0, 0],
      chart2: [0, 0, 0],
      chart3: [0, 0, 0],
      postedJobs: [0, 0, 0],
      rejectedJobs: [0, 0, 0],
      inConsiderationJobs: [0, 0, 0],
      Viewed: [0, 0, 0],
      chartOptions1: {
        chart: {
          width: 380,
          type: "pie",
        },
        colors: ["#107dee", "#39658c", "#45198e"],
        title: {
          text: "Posted Jobs",
          style: {
            fontSize: "19px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        labels: ["Last Weak ", "Last Month", "From Last Year"],
        responsive: [],
      },
      chartOptions2: {
        chart: {
          width: 380,
          type: "pie",
        },
        title: {
          text: "Last Week Applications Status",
          style: {
            fontSize: "19px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },

        colors: ["#107dee", "#39658c", "#45198e"],
        labels: ["Rejected ", "In Consideration", "Viewed"],
        responsive: [],
      },
      chartOptions3: {
        chart: {
          width: 380,
          type: "pie",
        },
        colors: ["#107dee", "#39658c", "#45198e"],
        title: {
          text: "Last Month Applications Status",
          style: {
            fontSize: "19px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        labels: ["Rejected ", "In Consideration", "Viewed"],
        responsive: [],
      },
      chartOptions4: {
        chart: {
          width: 380,
          type: "pie",
        },
        colors: ["#107dee", "#39658c", "#45198e"],
        title: {
          text: "Last Year Applications Status",
          style: {
            fontSize: "19px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        labels: ["Rejected ", "In Consideration", "Viewed"],
        responsive: [],
      },
    };
  },
  watch: {
    options: {
      handler() {
        console.log(this.chartOptions1);
      },
      deep: true,
    },
  },
  methods: {
    async initialize() {
      await this.getPostedJobsFromApi();
      await this.getApplicantJobsFromApi();
      await this.getRejectedJobsFromApi();
      await this.getViewedJobsFromApi();
      this.chart1 = [
        this.rejectedJobs[0],
        this.inConsiderationJobs[0],
        this.Viewed[0],
      ];
      this.chart2 = [
        this.rejectedJobs[1],
        this.inConsiderationJobs[1],
        this.Viewed[1],
      ];
      this.chart3 = [
        this.rejectedJobs[2],
        this.inConsiderationJobs[2],
        this.Viewed[2],
      ];
    },
    async getPostedJobsFromApi() {
      this.errorMessage = "";
      try {
        this.response = await this.$store.dispatch("adminPostedJobs", {
          userToken: localStorage.getItem("userToken"),
        });
        this.postedJobs = [
          this.response.jobsLastWeak,
          this.response.jobsLastMonth,
          this.response.jobsLastYear,
        ];
      } catch (error) {
        console.log("an error occured");
        this.loadingState = false;
        if (error.status === "fail") {
          this.errorMessage = error.msg;
        } else {
          this.errorMessage = "Please try again later !";
        }
        console.log(error);
      }
    },
    async getApplicantJobsFromApi() {
      this.errorMessage = "";
      try {
        this.response = await this.$store.dispatch("adminApplicantsCount", {
          userToken: localStorage.getItem("userToken"),
        });
        this.inConsiderationJobs = [
          this.response.jobsLastWeak,
          this.response.jobsLastMonth,
          this.response.jobsLastYear,
        ];
      } catch (error) {
        console.log("an error occured");
        this.loadingState = false;
        if (error.status === "fail") {
          this.errorMessage = error.msg;
        } else {
          this.errorMessage = "Please try again later !";
        }
        console.log(error);
      }
    },
    async getViewedJobsFromApi() {
      this.errorMessage = "";
      try {
        this.response = await this.$store.dispatch(
          "adminViewedApplicantsCount",
          {
            userToken: localStorage.getItem("userToken"),
          }
        );
        this.Viewed = [
          this.response.jobsLastWeak,
          this.response.jobsLastMonth,
          this.response.jobsLastYear,
        ];
      } catch (error) {
        console.log("an error occured");
        this.loadingState = false;
        if (error.status === "fail") {
          this.errorMessage = error.msg;
        } else {
          this.errorMessage = "Please try again later !";
        }
        console.log(error);
      }
    },
    async getRejectedJobsFromApi() {
      this.errorMessage = "";
      try {
        this.response = await this.$store.dispatch(
          "adminRejectedApplicantsCount",
          {
            userToken: localStorage.getItem("userToken"),
          }
        );
        this.rejectedJobs = [
          this.response.jobsLastWeak,
          this.response.jobsLastMonth,
          this.response.jobsLastYear,
        ];
      } catch (error) {
        console.log("an error occured");
        this.loadingState = false;
        if (error.status === "fail") {
          this.errorMessage = error.msg;
        } else {
          this.errorMessage = "Please try again later !";
        }
        console.log(error);
      }
    },
  },
  created() {
    this.initialize();
  },
};
</script>
