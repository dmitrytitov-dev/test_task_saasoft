<script setup lang="ts">
defineProps<{ ids: string[] }>();
defineEmits<{ (event: 'delete', value: string): void; }>();
</script>

<template>
  <div>
    <v-row class="mt-6" dense>
      <v-col cols="3">Метки</v-col>
      <v-col cols="2">Тип записи</v-col>
      <v-col cols="3">Логин</v-col>
      <v-col cols="3">Пароль</v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <AccountRow
      v-for="id in ids"
      :key="id"
      :id="id"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>
