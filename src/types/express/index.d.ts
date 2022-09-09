import express from 'express';

// declare global {
//   namespace Express {
//     interface Session {
//       userId?: string;
//     }
//   }
// }

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}
