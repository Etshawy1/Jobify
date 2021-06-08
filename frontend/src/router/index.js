import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/UserManagement/SignUp.vue'
import AdminHome from '../views/Admin/AdminHome.vue'
import Skills from '../views/Admin/Skills.vue'
import Login from '../views/UserManagement/Login.vue'
import CompleteProfile from '../views/UserManagement/CompleteProfile.vue'
import JobApply from '../views/JobApply/JobApply.vue'
import MyJobs from '../views/Recuiter/MyJobs.vue'
import ReviewApplicants from '../views/Recuiter/ReviewApplicants.vue'
import PostJob from '../views/Recuiter/PostJob.vue'
import editApplicantProfile from '../views/Applicant/editApplicantProfile.vue'
import editPersonalInfoForm from '../components/Applicant/editPersonalInfoForm.vue'
import updateApplicantCVForm from '../components/Applicant/updateApplicantCVForm.vue'
import updateSkillsForm from '../components/Applicant/updateSkillsForm.vue'
import EditJob from '../views/Recuiter/EditJob.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/adminhome',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/Skills',
    name: 'Skills',
    component: Skills
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/completeprofile',
    name: 'CompleteProfile',
    component: CompleteProfile
  },
  {
    path: '/apply/:id',
    name: 'JobApply',
    component: JobApply
  },
  {
    path: '/jobs/:profile_id',
    name: 'MyJobs',
    component: MyJobs
  },
  {
    path: '/review/:job_id',
    name: 'ReviewApplicants',
    component: ReviewApplicants
  },
  {
    path: '/postjob',
    name: 'PostJob',
    component: PostJob
  },
  {
    path: '/editjob/:job_id',
    name: 'EditJob',
    component: EditJob
  },
  // the applicant edit profile url
  {
    path: '/editapplicantprofile/:id',
    name: 'editApplicantProfile',
    component: editApplicantProfile,
    children: [
      {
        path: '',
        name: 'editPersonalInfoForm',
        component: editPersonalInfoForm
      },
      {
        path: 'updatecv',
        name: 'updatecv',
        component: updateApplicantCVForm
      },
      {
        path: 'updateskills',
        name: 'updateskills',
        component: updateSkillsForm
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
