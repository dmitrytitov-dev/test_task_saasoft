<script setup lang="ts">
import { ref } from 'vue';

const showPassword = ref(false);
</script>

<template>
  <v-row dense>
    <v-col cols="3">
      <v-text-field
        density="compact"
        variant="outlined"
        :counter="50"
      />
    </v-col>
    <v-col cols="2">
      <v-select
        density="compact"
        variant="outlined"
        :items="['Локальная', 'LDAP']"
      />
    </v-col>
    <v-col cols="3">
      <v-text-field
        density="compact"
        variant="outlined"
        :counter="100"
      />
    </v-col>
    <v-col cols="3">
      <v-text-field
        density="compact"
        variant="outlined"
        :counter="100"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
      />
    </v-col>
    <v-col cols="1" class="d-flex justify-center">
      <v-btn
        density="compact"
        class="mt-1"
        icon="mdi-delete"
        variant="text"
      />
    </v-col>
  </v-row>
</template>
