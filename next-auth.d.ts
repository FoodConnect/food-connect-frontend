declare module 'next-auth' {
  interface Session {
    jti?: string;
  }
}
