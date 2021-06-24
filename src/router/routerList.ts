export const routerList = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue'), // 동적 import
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'issue',
        name: 'Issue',
        component: () => import('@/views/Issue.vue'),
        props: true,
        meta: {
          active: false,
          title: '이슈'
        },
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/Article/Article.vue'),
        meta: {
          active: false,
          title: '기사'
        },
        children: [
          {
            path: 'write/:id',
            name: 'Write',
            component: () => import('@/views/Article/Write.vue'),
            props: true,
            meta: {
              parent: 'article',
              active: false,
              title: '기사작성',
            },
          },
          {
            path: 'management',
            name: 'Management',
            component: () => import('@/views/Article/Management.vue'),
            meta: {
              parent: 'article',
              active: false,
              title: '기사관리'
            }
          },
          {
            path: 'foreign',
            name: 'Foreign',
            component: () => import('@/views/Article/Foreign.vue'),
            meta: {
              parent: 'article',
              active: false,
              title: '내/외신'
            }
          },
        ],
      },
      {
        path: 'cueSheet',
        name: 'CueSheet',
        component: () => import('@/views/CueSheet.vue'),
        meta: {
          active: false,
          title: '큐시트'
        }
      },
      {
        path: 'request',
        name: 'Request',
        component: () => import('@/views/Request.vue'),
        meta: {
          active: false,
          title: '의뢰'
        },
        children: [
          {
            path: 'test',
            name: 'Test',
            component: () => import('@/views/test1.vue'),
            meta: {
              parent: 'request',
              active: false,
              title: '테스트'
            }
          }
        ],
      },
      {
        path: 'CGTemplate',
        name: 'CGTemplate',
        component: () => import('@/views/CGTemplate.vue'),
        meta: {
          active: false,
          title: 'CG 템플릿'
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      requiresAuth : false
    }
  },
]
