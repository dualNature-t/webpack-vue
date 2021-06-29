import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/index',
		component: index
	},
	{
		path: '/about',
		component: () => import("../views/about.vue")
	}
]

export default new VueRouter({
	// mode: 'history',
	routes
})