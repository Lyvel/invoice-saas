import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { db } from "./db";
import { getTimeInEpoch } from "./epoch";

/**
 * Hashes a password using bcrypt with a salt round of 12
 * @param password - The plain text password to hash
 * @returns The hashed password string
 */
const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, 12);
};

/**
 * Verifies a password against a hash using bcrypt
 * @param password - The plain text password to verify
 * @param hash - The hashed password to compare against
 * @returns True if the password matches the hash, false otherwise
 */
const verifyPassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
};

/**
 * Creates a new user in the database
 * @param email - The email address of the user
 * @param password - The plain text password for the user
 * @param name - Optional name for the user
 * @throws Error if a user with the email already exists
 * @returns The created user object
 */
export const createUser = async (
    email: string,
    password: string,
    name?: string
) => {
    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = hashPassword(password);

    return await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            createdAt: getTimeInEpoch(),
            updatedAt: getTimeInEpoch(),
        },
    });
};

/**
 * Authenticates a user with email and password
 * @param email - The email address of the user
 * @param password - The plain text password to verify
 * @returns The user object if authentication succeeds, null otherwise
 */
export const authenticateUser = async (email: string, password: string) => {
    const user = await db.user.findUnique({
        where: { email },
    });

    if (!user) {
        return null;
    }

    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
        return null;
    }

    return user;
};

/**
 * Creates a new session for a user
 * @param userId - The ID of the user to create a session for
 * @returns The created session object
 */
export const createSession = async (userId: string) => {
    const sessionToken = generateSessionToken();
    const expires = (+getTimeInEpoch() + 30 * 24 * 60 * 60).toString();

    const session = await db.session.create({
        data: {
            sessionToken,
            userId,
            expires,
            createdAt: getTimeInEpoch(),
            updatedAt: getTimeInEpoch(),
        },
    });

    return session;
};

/**
 * Retrieves a user by their session token
 * @param sessionToken - The session token to look up
 * @returns The user object if a valid session exists, null otherwise
 */
export const getSessionUser = async (sessionToken: string) => {
    const session = await db.session.findUnique({
        where: { sessionToken },
        include: { user: true },
    });

    if (!session) {
        return null;
    }

    if (session.expires < getTimeInEpoch()) {
        await db.session.delete({
            where: { sessionToken },
        });
        return null;
    }

    return session.user;
};

/**
 * Deletes a session from the database
 * @param sessionToken - The session token to delete
 */
export const deleteSession = async (sessionToken: string) => {
    try {
        await db.session.delete({
            where: { sessionToken },
        });
    } catch {}
};

/**
 * Generates a random session token
 * @returns A 64-character hexadecimal string
 */
export const generateSessionToken = (): string => {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
};

/**
 * Sets a session cookie in the browser
 * @param sessionToken - The session token to store in the cookie
 */
export const setSessionCookie = async (sessionToken: string) => {
    const cookieStore = await cookies();
    cookieStore.set("session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
    });
};

/**
 * Retrieves the current user from the session cookie
 * @returns The user object if a valid session exists, null otherwise
 */
export const getSessionFromCookie = async () => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) {
        return null;
    }

    return await getSessionUser(sessionToken);
};

/**
 * Clears the session cookie and deletes the session from the database
 */
export const clearSessionCookie = async () => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (sessionToken) {
        await deleteSession(sessionToken);
    }

    cookieStore.delete("session");
};
