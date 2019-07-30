import Vue from 'vue'
import Router from 'vue-router'
import TreeHole from '@/components/treehole'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
    },{
      path: '/treehole',
      name: 'treehole',
      component: TreeHole
    }
  ]
})
