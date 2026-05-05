import { defineMiddleware } from 'astro:middleware';

// Pages that DO NOT require authentication
const PUBLIC_PATHS = ['/', '/login', '/favicon.svg'];

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;

    // Allow public pages and static assets through
    const isPublic = PUBLIC_PATHS.includes(pathname) || pathname.startsWith('/_') || pathname.includes('.');
    if (isPublic) {
        return next();
    }

    // Check for session cookie
    const sessionCookie = context.cookies.get('sb_admin_session');

    if (!sessionCookie || !sessionCookie.value) {
        // Not authenticated — redirect to login
        return context.redirect('/login', 302);
    }

    try {
        // Validate the cookie value is a proper JSON admin object
        const session = JSON.parse(sessionCookie.value);
        if (!session?.email || !session?.role) {
            throw new Error('Invalid session');
        }
    } catch {
        // Malformed cookie — clear it and redirect
        context.cookies.delete('sb_admin_session', { path: '/' });
        return context.redirect('/login', 302);
    }

    return next();
});
