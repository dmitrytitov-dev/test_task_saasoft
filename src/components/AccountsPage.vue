<script setup lang="ts">

</script>

<template>
  <v-container class="fill-height" max-width="1000">
    <div class="w-100">
      <div class="d-flex">
        <h2>Учётные записи</h2>
        <v-btn
          class="ml-4"
          density="comfortable"
          icon="mdi-plus" />
      </div>
      <div class="mt-6 d-inline-block">
        <v-alert
          type="info"
          color="black"
          variant="outlined"
          text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
        />
      </div>

      <AccountsTable />
    </div>
  </v-container>
</template>
