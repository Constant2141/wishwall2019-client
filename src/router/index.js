import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'treehole',
      // component: TreeHole      
    },{
      path: '/treehole',
      name: 'treehole',
      component: resolve => require(['@/components/treehole'],resolve)
    }
  ]
})
