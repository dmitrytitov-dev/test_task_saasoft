<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useAccountsStore } from '@/stores/accounts.ts';

const LABELS_MAX_LENGTH = 50;
const LOGIN_MAX_LENGTH = 100;
const PASSWORD_MAX_LENGTH = 100;

const props = defineProps<{ id: string }>();

const accountsStore = useAccountsStore();

function getAccountFromStore() {
  const {
    type = 'local',
    login = '',
    password = '',
    labels: labelsArray = [],
  } = accountsStore.items[props.id] ?? {};
  const labels = labelsArray.map(label => label.text).join('; ');
  return { type, login, password, labels };
}

const account = reactive(getAccountFromStore());
const isLocal = computed(() => account.type === 'local');

const showPassword = ref(false);

watch(() => account.type, updateAccount);

function updateAccount() {
  const { type, login, password, labels } = account;
  if (!login || login.length > LOGIN_MAX_LENGTH) return;
  if (isLocal.value) {
    if (!password || password.length > PASSWORD_MAX_LENGTH) return;
  }
  if (labels.length > LABELS_MAX_LENGTH) return;
  const labelsArray = labels
    .split(';')
    .map(label => ({ text: label.trim() }));
  const accountStore = {
    id: props.id,
    type,
    login,
    password,
    labels: labelsArray,
  };
  accountsStore.addOrUpdate(accountStore);
}
</script>

<template>
  <v-row dense>
    <v-col cols="3">
      <v-text-field
        density="compact"
        variant="outlined"
        :counter="LABELS_MAX_LENGTH"
        :rules="[v => v.length <= LABELS_MAX_LENGTH || 'Labels are too long']"
        v-model="account.labels"
        @blur="updateAccount"
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
        v-model="account.type"
      />
    </v-col>
    <v-col :cols="isLocal ? 3 : 6">
      <v-text-field
        density="compact"
        variant="outlined"
        :counter="LOGIN_MAX_LENGTH"
        :rules="[
          v => !!v || 'Login is required',
          v => v.length <= LOGIN_MAX_LENGTH || 'Login is too long',
        ]"
        required
        v-model="account.login"
        @blur="updateAccount"
      />
    </v-col>
    <v-col cols="3" v-if="isLocal">
      <v-text-field
        density="compact"
        variant="outlined"
        :counter="PASSWORD_MAX_LENGTH"
        :rules="[
          v => !!v || 'Password is required',
          v => v.length <= PASSWORD_MAX_LENGTH || 'Password is too long',
        ]"
        required
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
        v-if="isLocal"
        v-model="account.password"
        @blur="updateAccount"
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
