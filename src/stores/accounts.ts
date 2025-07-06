import { defineStore } from 'pinia';
import predefinedAccounts from '@/data/accounts';
import type { Account } from '@/models/account.ts';

const PERSISTED_KEY = 'accounts_store';

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    items: {} as Record<string, Account>,
  }),
  actions: {
    addOrUpdate(account: Account) {
      this.items[account.id] = account;
    },
    delete(id: string) {
      delete this.items[id];
    },
  },
  persist: {
    key: PERSISTED_KEY,
    beforeHydrate(context) {
      const saved = localStorage.getItem(PERSISTED_KEY);
      if (!saved) {
        context.store.items = predefinedAccounts;
      }
    },
  },
});
