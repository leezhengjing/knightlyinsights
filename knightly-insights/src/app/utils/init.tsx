import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import PocketBase from "pocketbase";

export async function initPocketBase() {
    const pb = new PocketBase("https://knightly-insights.pockethost.io/");

    const cookieStore = cookies();
    const auth = cookieStore.get("pb_auth");

    pb.authStore.loadFromCookie(`pb_auth=${auth?.value as any}`);
    if (pb.authStore.isValid) {
        return pb;
    } else {
        return null;
    }
}



