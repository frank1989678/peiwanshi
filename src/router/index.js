// @ts-ignore
import Vue from 'vue'
import Router from 'vue-router'

import Apply from '../pages/Apply'
import Step1 from '../pages/Step1.authentication'
import Step2 from '../pages/Step2.study'
import Step3 from '../pages/Step3.exam'
import Step4 from '../pages/Step4.score'
import Step5 from '../pages/Step5.skill'

Vue.use(Router);


export default new Router({
    routes: [{
        path: '/',
        name: 'apply',
        component: Apply,
        meta: {
            title: '申请成为陪练师'
        }
    }, {
        path: '/authentication',
        name: 'step1',
        component: Step1,
        meta: {
            title: '申请成为陪练师'
        }
    }, {
        path: '/study',
        name: 'step2',
        component: Step2,
        meta: {
            title: '申请成为陪练师'
        }
    }, {
        path: '/exam',
        name: 'step3',
        component: Step3,
        meta: {
            title: '申请成为陪练师'
        }
    }, {
        path: '/score',
        name: 'step4',
        component: Step4,
        meta: {
            title: '申请成为陪练师'
        }
    }, {
        path: '/skill',
        name: 'step5',
        component: Step5,
        meta: {
            title: '申请成为陪练师'
        }
    }, {
        path: '*',
        redirect: '/',
        name: 'error',
        meta: {
            title: '重定向'
        }
    }]
})
