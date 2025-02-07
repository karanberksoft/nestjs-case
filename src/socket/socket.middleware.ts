import { Socket } from 'socket.io';
import * as cookie from 'cookie';
import * as jwt from 'jsonwebtoken';


export const socketJwtMap = new Map<string, string | null>();

export function socketMiddleware(socket: Socket, next: (err?: any) => void) {
  
  const cookies = socket.handshake.headers.cookie;
  let userId: string | null = null;
  
  if (cookies) {
    
    const parsedCookies = cookie.parse(cookies);
    
    const jwtToken = parsedCookies.jwt;
    if (jwtToken) {
      try {
        
        const decoded = jwt.decode(jwtToken);
        
        if (decoded && typeof decoded === 'object' && 'sub' in decoded) {
          userId = decoded['sub'] as string;
        }
      } catch (error) {
        console.error('JWT decode error:', error);
      }
    }
  }
  
  
  const socketId = socket.id;
  socketJwtMap.set(socketId, userId);
  
  console.log(`Socket connected: ${socketId}, User ID from JWT: ${userId}`);
  
  next();
}
