import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EditOrCreateRecord from './views/Edit.create.record.vue'
import ViewRecord from './views/View.record.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            props: true
        },

        {
            path: '/new',
            name: 'createRecord',
            component: EditOrCreateRecord,
            props: true
        },

        {
            path: '/:id',
            name: 'viewRecord',
            component: ViewRecord,
            props: true
        },

        {
            path: '/:id/edit',
            name: 'editRecord',
            component: EditOrCreateRecord,
            props: true
        },
    ]
})

router.beforeEach((to, from, next) => {
    // if(store.state.records.length == 0 && to.path !== '/' && to.path !== '/new') {
    //     next('/')
    // } else {
    //     // console.log(to)
    //     next()
    // }

    // console.log(to.params, Object.prototype.hasOwnProperty.call(to.params, 'id'))

    // Check if contacts has records, if not 
    // Go to home page, that shows "No Result"
    // if(store.state.records.length == 0 && to.path !== '/' && to.path !== '/new') {
    //     next('/')
    // } else {
    //     if(Object.prototype.hasOwnProperty.call(to.params, 'id')) {
    //         if(to.params.id) {
    //             next(to.path)
    //         }
    //     } else {
    //         // next('/'+store.state.records[0].uid)
    //     }
    // }

    console.log(store)

    next()
})

export default router