  
<template>
  <div class="div">
    <h1>Chart</h1>
    <div class="pie-chart" :style="pieStyle"></div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      pieStyle: {},
    };
  },
  computed: {},
  methods: {
    async initialize() {
      const style = await this.getRejectedJobsFromApi();
      console.log(style);
      this.pieStyle = style;
    },
    async getPostedJobsFromApi() {
      this.errorMessage = "";
      try {
        this.response = await this.$store.dispatch("adminPostedJobs", {
          userToken: localStorage.getItem("userToken"),
        });
        console.log(this.response);
        this.pieData = [
          { color: "#0B6487", value: this.response.jobsLastWeak },
          { color: "#9D1F37", value: this.response.jobsLastMonth },
          { color: "#F6931C", value: this.response.jobsLastYear },
        ];
        let total =
          this.response.jobsLastWeak +
          this.response.jobsLastMonth +
          this.response.jobsLastYear;
        let sum = 0;
        let styles = this.pieData.map(
          (piePart) =>
            `${piePart.color} 0 ${(sum += piePart.value / total) * 100}%`
        );
        return { background: "conic-gradient(" + styles.join(",") + ")" };
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
        console.log(this.response);
        this.pieData = [
          { color: "#0B6487", value: this.response.jobsLastWeak },
          { color: "#9D1F37", value: this.response.jobsLastMonth },
          { color: "#F6931C", value: this.response.jobsLastYear },
        ];
        let total =
          this.response.jobsLastWeak +
          this.response.jobsLastMonth +
          this.response.jobsLastYear;
        let sum = 0;
        let styles = this.pieData.map(
          (piePart) =>
            `${piePart.color} 0 ${(sum += piePart.value / total) * 100}%`
        );
        return { background: "conic-gradient(" + styles.join(",") + ")" };
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
        console.log(this.response);
        this.pieData = [
          { color: "#0B6487", value: this.response.jobsLastWeak },
          { color: "#9D1F37", value: this.response.jobsLastMonth },
          { color: "#F6931C", value: this.response.jobsLastYear },
        ];
        let total =
          this.response.jobsLastWeak +
          this.response.jobsLastMonth +
          this.response.jobsLastYear;
        let sum = 0;
        let styles = this.pieData.map(
          (piePart) =>
            `${piePart.color} 0 ${(sum += piePart.value / total) * 100}%`
        );
        return { background: "conic-gradient(" + styles.join(",") + ")" };
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

<style lang="scss" scoped>
.pie-chart {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 2px solid #fefefe;
  animation: show 1s ease-in-out;
}
@keyframes show {
  0% {
    transform: scale(0) rotate(720deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>