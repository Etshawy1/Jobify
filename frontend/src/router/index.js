import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/UserManagement/SignUp.vue";
import Login from "../views/UserManagement/Login.vue";
import CompleteProfile from "../views/UserManagement/CompleteProfile.vue";
import JobApply from "../views/JobApply/JobApply.vue";
import MyJobs from "../views/Recuiter/MyJobs.vue";
import ReviewApplicants from "../views/Recuiter/ReviewApplicants.vue";
import PostJob from "../views/Recuiter/PostJob.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/completeprofile",
    name: "CompleteProfile",
    component: CompleteProfile
  },
  {
    path: "/apply/:id",
    name: "JobApply",
    component: JobApply,
  },{
    path: "/jobs/:profile_id",
    name: "MyJobs",
    component: MyJobs,
  },{
    path: "/review/:job_id",
    name: "ReviewApplicants",
    component: ReviewApplicants,
  },{
    path: "/postjob",
    name: "PostJob",
    component: PostJob,
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
