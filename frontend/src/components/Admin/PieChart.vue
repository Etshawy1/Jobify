  
<template>
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
      <v-flex md6 lg6>
        <apexchart
          width="500"
          type="pie"
          :options="chartOptions2"
          :series="rejectedJobs"
        ></apexchart>
      </v-flex>
    </v-row>
    <v-row>
      <v-flex md6 lg6>
        <apexchart
          width="500"
          type="pie"
          :options="chartOptions3"
          :series="inConsiderationJobs"
        ></apexchart>
      </v-flex>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => {
    return {
      postedJobs: [0, 0, 0],
      rejectedJobs: [0, 0, 0],
      inConsiderationJobs: [0, 0, 0],
      chartOptions1: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [
          "Posted Jobs From Last Weak ",
          "Posted Jobs From Last Month",
          "Posted Jobs From Last Year",
        ],
        responsive: [],
      },
      chartOptions2: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [
          "Rejected Applicant From Last Weak ",
          "Rejected Applicant From Last Month",
          "Rejected Applicant From Last Year",
        ],
        responsive: [],
      },
      chartOptions3: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [
          "In Consideration Applicant From Last Weak ",
          "In Consideration Applicant From Last Month",
          "In Consideration Applicant From Last Year",
        ],
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