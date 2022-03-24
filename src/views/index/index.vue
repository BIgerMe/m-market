<template>
  123
</template>

<script>
    import { useUserStore } from '@/store/modules/user'

    export default {
    name: 'index',
    data() {
      return {
          userStore:useUserStore()
      }
    },
  }
</script>
