<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useAccountsStore } from '@/stores/accounts.ts';

const accountsStore = useAccountsStore();

const ids = ref(Object.keys(accountsStore.items));

function addAccount() {
  ids.value.push(uuidv4());
}

function deleteAccount(id: string) {
  ids.value = ids.value.filter(item => item !== id);
}
</script>

<template>
  <v-container class="fill-height" max-width="1000">
    <div class="w-100">
      <div class="d-flex">
        <h2>Учётные записи</h2>
        <v-btn
          class="ml-4"
          density="comfortable"
          icon="mdi-plus"
          @click="addAccount"
        />
      </div>
      <div class="mt-6 d-inline-block">
        <v-alert
          type="info"
          color="black"
          variant="outlined"
          text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
        />
      </div>

      <AccountsTable :ids="ids" @delete="deleteAccount" />
    </div>
  </v-container>
</template>
