import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface JwtPayload {
   userId: string;
   role: string;
}

/* ---------------- Sign Token Function ---------------- */
export const signToken = (payload: JwtPayload): string => {
   return jwt.sign(payload, JWT_SECRET);
};

/* ---------------- Verify Token Function ---------------- */
export const verifyToken = (token: string): JwtPayload => {
   return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
