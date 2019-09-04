import Vue from "vue";
import Router from "vue-router";
import TreeHole from "@/components/treehole";
import Welcome from "@/components/Welcome";
import Mine from "@/components/mine";
import WishRelease from '@/components/wishRelease'
import Planet from '@/components/planet'

import WishWall from "@/components/WishWall";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/wishwall"
    },
    {
      path: "/treehole",
      name: "treehole",
      component: TreeHole,
      meta: {
        keepAlive: true //底部栏显示
      }
    },
    {
      path: "/welcome",
      name: "welcome",
      component: Welcome,
      meta: {
        keepAlive: false //底部栏不显示
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta:{
        keepAlive:true  //底部栏显示
      }      
    },
    {
      path: '/planet',
      name: 'planet',
      component: Planet,
      meta:{
        keepAlive:true  //底部栏显示
      }      
    },
    {
      path: '/wishRelease',
      name: 'wishRelease',
      component: WishRelease,
      meta:{
        keepAlive:false  //底部栏不显示
      }
    },
    {
      path: '/wishwall',
      name:'wishwall',
      component:WishWall,
      meta:{
        keepAlive:true
      }
    }
  ]
});
