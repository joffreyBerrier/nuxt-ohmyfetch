<template>
  <Tutorial />
</template>

<script>
export default {
  name: 'IndexPage',
  async asynData({ app }) {
    const res = await app.$api.v1.todo.get(1)

    console.log(res)
  },
}
</script>
