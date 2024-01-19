import PocketBase from 'pocketbase';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const POCKET_BASE_URL = "https://knightly-insights.pockethost.io/";

export class DatabaseClient {
    client: PocketBase;

    constructor() {
        this.client = new PocketBase(POCKET_BASE_URL);
        this.client.autoCancellation(false);
    }

    async authenticate(email: string, password: string) {
        try {
            const result = await this.client.collection("users").authWithPassword(email, password);
            console.log('authenticate result:', result);
            if (!result?.token) {
                throw new Error("Invalid email or password");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Invalid email or password");
        }
    }

    async authenticateAdmin(email: string, password: string) {
        try {
            const result = await this.client.admins.authWithPassword(email, password);
            console.log('Authenticate admin result:', result);
            if (!result?.token) {
                throw new Error("Invalid email or password");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Invalid admin email or password");
        }
    }

    async authenticateOAuth2(provider: string) {
        try {
            const result = await this.client.collection('users').authWithOAuth2({ provider: provider });
            console.log('Authenticate with OAuth2 result:', result);
            if (!result?.token) {
                throw new Error("Invalid OAuth2");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Invalid Oauth2");
        }
    }

    async register(email: string, password: string) {
        try {
            const result = await this.client.collection("users").create({
                email,
                password,
                passwordConfirm: password,
            });

            return result;
        } catch (err) {

        }
    }

    async isAuthenticated(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.isValid || false
    }

    async getUser(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.model;
    }
}

export const db = new DatabaseClient();

export default db;