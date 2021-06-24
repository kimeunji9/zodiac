<template>
  <div>
    <Dashboard v-if="$router.options.history.location === '/'"></Dashboard>
  </div>
</template>

<script>
import Dashboard from '@/views/Dashboard'

export default {
  name: 'Main',
  components: {
    Dashboard
  },
  data() {
    return {
      reload: true
    }
  },
  methods: {}
}
</script>
