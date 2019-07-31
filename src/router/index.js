import Vue from 'vue'
import Router from 'vue-router'
import TreeHole from '@/components/treehole'
import WishRelease from '@/components/wishRelease'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'treehole',
      component: TreeHole      
    },{
      path: '/treehole',
      name: 'treehole',
      component: TreeHole
    },
    {
      path: '/wishRelease',
      name: 'wishRelease',
      component: WishRelease
    }
  ]
})
