<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div>
    <h1>Login</h1>
    <p>Mock Login Page</p>
    <Button @click="router.push('/')">Back to Home</Button>
  </div>
</template>
