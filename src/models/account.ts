export type AccountType = 'local' | 'ldap';

export type AccountLabel = {
  text: string;
}

export type Account = {
  id: string;
  type: AccountType;
  login: string;
  password: string;
  labels: AccountLabel[];
}
