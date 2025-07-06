<script setup lang="ts">
import { ref } from 'vue';
import { useAccountsStore } from '@/stores/accounts.ts';

const props = defineProps<{ id: string }>();

const accountsStore = useAccountsStore();
const account = accountsStore.items[props.id];

const type = ref(account?.type ?? 'local');
const login = ref(account?.login ?? '');
const password = ref(account?.password ?? '');
const labels = ref(account?.labels?.map(label => label.text).join('; ') ?? '');

const showPassword = ref(false);
</script>

<template>
  <v-row dense>
    <v-col cols="3">
      <v-text-field
        density="compact"
        variant="outlined"
        :counter="50"
        v-model="labels"
      />
    </v-col>
    <v-col cols="2">
      <v-select
        density="compact"
        variant="outlined"
        :items="[
          { label: 'Локальная', value: 'local' },
          { label: 'LDAP', value: 'ldap' }
        ]"
        item-title="label"
        item-value="value"
        v-model="type"
      />
    </v-col>
    <v-col :cols="type === 'local' ? 3 : 6">
      <v-text-field
        density="compact"
        variant="outlined"
        :counter="100"
        v-model="login"
      />
    </v-col>
    <v-col cols="3" v-if="type === 'local'">
      <v-text-field
        density="compact"
        variant="outlined"
        :counter="100"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
        v-if="type === 'local'"
        v-model="password"
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
