export const routerList = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue'), // 동적 import
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      requiresAuth : false
    }
  },
  {
    path: '/issue',
    name: 'Issue',
    component: () => import('@/views/Issue.vue'),
    props: true,
    meta: {
      active: false,
      menuTitle: '이슈',
      tabTitle: '이슈관리'
    },
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/Article/Article.vue'),
    meta: {
      active: false,
      menuTitle: '기사'
    },
    children: [
      {
        path: 'write/:id',
        name: 'Write',
        component: () => import('@/views/Article/Write.vue'),
        props: true,
        meta: {
          parent: '/article',
          active: false,
          menuTitle: '기사작성',
        },
      },
      {
        path: 'management',
        name: 'Management',
        component: () => import('@/views/Article/Management.vue'),
        meta: {
          parent: '/article',
          active: false,
          menuTitle: '기사관리'
        }
      },
      {
        path: 'foreign',
        name: 'Foreign',
        component: () => import('@/views/Article/Foreign.vue'),
        meta: {
          parent: '/article',
          active: false,
          menuTitle: '내/외신'
        }
      },
    ],
  },
  {
    path: '/cueSheet',
    name: 'CueSheet',
    component: () => import('@/views/CueSheet.vue'),
    meta: {
      active: false,
      menuTitle: '큐시트'
    }
  },
  {
    path: '/request',
    name: 'Request',
    component: () => import('@/views/Request.vue'),
    meta: {
      active: false,
      menuTitle: '의뢰'
    },
    children: [
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test1.vue'),
        meta: {
          parent: '/request',
          active: false,
          menuTitle: '테스트'
        }
      }
    ],
  },
  {
    path: '/cgTemplate',
    name: 'CGTemplate',
    component: () => import('@/views/CGTemplate.vue'),
    meta: {
      active: false,
      menuTitle: 'CG 템플릿'
    }
  },
]
