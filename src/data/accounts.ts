import type { Account } from '@/models/account.ts';

/// Predefined accounts for demonstration purpose
const predefinedAccounts: Account[] = [
  {
    id: '7a2d2df4-ad91-45a0-bcd1-732b8abfa3ee',
    type: 'local',
    login: 'user1',
    password: 'password1',
    labels: [{ text: 'label1' }, { text: 'label2' }],
  },
  {
    id: '176f1cb1-59b3-411b-88b3-d636d9ccbdbc',
    type: 'local',
    login: 'user2',
    password: 'password2',
    labels: [],
  },
  {
    id: 'a9270446-0843-4eba-bf4d-00d56d706c86',
    type: 'ldap',
    login: 'user3',
    password: null,
    labels: [],
  },
  {
    id: 'e320df86-a838-45fa-8c7a-2f9520148dd6',
    type: 'ldap',
    login: 'user4',
    password: null,
    labels: [],
  },
] as Account[];

const predefinedAccountsMap: Record<string, Account> = Object.fromEntries(
  predefinedAccounts.map(account => [account.id, account]),
);

export default predefinedAccountsMap;
