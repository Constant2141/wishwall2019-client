import Vue from "vue";
import Router from "vue-router";
import TreeHole from "@/components/treehole";
import MyTreeHole from '@/components/mytreehole';
import treeholeRelease from '@/components/treeholeRelease'
import Welcome from "@/components/Welcome";
import Mine from "@/components/mine";
import WishWall from "@/components/WishWall";
import WishRelease from '@/components/wishRelease'
import Planet from '@/components/planet';
import PlanetRelease from "@/components/PlanetRelease"
import PlanetTopic from "@/components/PlanetTopic";
import PCommentRelease from "@/components/PCommentRelease";
import PlanetComment from "@/components/PlanetComment";
import Mypost from "@/components/myPost";
import Myget from "@/components/myGet";
import Mytopic from "@/components/myTopic";
import Mycomment from "@/components/myComment";
import ofMine from "@/components/ofMine";
import Login from '@/components/Login';
import Test from '@/components/test'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect:'/login'
    },
    {
      path:'/test',
      name:'test',
      component:Test,
      meta: {
        keepAlive: false,
      }
    },
    {
      path: "/treehole",
      name: "treehole",
      component: TreeHole,
      meta: {
        keepAlive: true, //底部栏显示
        title: '树洞',
        trueKeepAlive: false //keepAlive字段不是这么用的吧亲
      }
    },
    {
      path: "/mytreehole",
      name: "mytreehole",
      component: MyTreeHole,
      meta: {
        keepAlive: false, //底部栏显示
        title: '我的树洞'
      }
    },
    {
      path: '/treeholeRelease',
      name: 'treeholeRelease',
      component: treeholeRelease,
      meta: {
        keepAlive: false,  //底部栏不显示
      }
    },
    {
      path: "/welcome",
      name: "welcome",
      component: Welcome,
      meta: {
        keepAlive: false, //底部栏不显示
        title: '许愿墙'
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: {
        keepAlive: true,  //底部栏显示
        trueKeepAlive: false
      }
    },
    {
      path: '/planet',
      name: 'planet',
      component: Planet,
      meta: {
        keepAlive: true , //底部栏显示
        // trueKeepAlive: false  //星球暂不需要，监听事件将会监听路由跳转销毁
      }
    },
    {
      path: '/planetTopic',
      name: 'planetTopic',
      component: PlanetTopic,
      meta: {
        keepAlive: false //底部栏显示
      }
    },
    {
      path: "/planetRelease",
      name: "planetRelease",
      component: PlanetRelease,
      meta: {
        keepAlive: false, //底部栏不显示
        title: '星球',
      }
    },
    {
      path: "/pCommentRelease",
      name: "pCommentRelease",
      component: PCommentRelease,
      meta: {
        keepAlive: false, //底部栏不显示
        title: '星球'
      }
    },
    {
      path: '/wishRelease',
      name: 'wishRelease',
      component: WishRelease,
      meta: {
        keepAlive: false  //底部栏不显示
      }
    },
    {
      path: '/mypost',
      name: 'mypost',
      component: Mypost,
      meta: {
        keepAlive: true  //底部栏显示
      }
    },
    {
      path: '/myget',
      name: 'myget',
      component: Myget,
      meta: {
        keepAlive: true  //底部栏显示
      }
    },
    {
      path: '/mytopic',
      name: 'mytopic',
      component: Mytopic,
      meta: {
        keepAlive: true  //底部栏显示
      }
    },
    {
      path: '/mycomment',
      name: 'mycomment',
      component: Mycomment,
      meta: {
        keepAlive: true  //底部栏显示
      }
    },
    {
      path: '/ofmine',
      name: 'ofmine',
      component: ofMine,
      meta: {
        keepAlive: true  //底部栏显示
      }
    },
    {
      path: '/wishwall',
      name: 'wishwall',
      component: WishWall,
      meta: {
        keepAlive: true,
        title: '许愿墙',
        trueKeepAlive: false
      }
    },
    {
      path: '/PlanetComment',
      name: 'planetcomment',
      component: PlanetComment,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        keepAlive: false
      }
    }
  ]
});


// 服务器炸了
// router.beforeEach((to, from, next) => {
//   if(to.path == '/test'){
//     console.log(to)
//     next()
//   }
//   next({ path: '/test' });
// })


export default router
