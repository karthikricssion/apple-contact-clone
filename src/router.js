import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EditOrCreateRecord from './views/Edit.create.record.vue'
import ViewRecord from './views/View.record.vue'

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

export default router