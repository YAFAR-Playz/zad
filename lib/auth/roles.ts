export type Role =
  | 'owner'
  | 'admin'
  | 'supervisor'
  | 'head'
  | 'assistant'
  | 'student'
  | 'parent'
  | 'hr'
  | 'finance';

export const roleRedirects: Record<Role, string> = {
  owner: '/admin',
  admin: '/admin',
  supervisor: '/supervisor',
  head: '/head',
  assistant: '/assistant',
  student: '/student',
  parent: '/parent',
  hr: '/hr',
  finance: '/finance',
};
