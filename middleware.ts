import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)",
  "/marketing(.*)",
  "/product(.*)",
  "/products(.*)",
  "/product(.*)",
  "/preview(.*)",
  "/stores(.*)",
  "/store(.*)",
  "/build-a-board(.*)",
  "/email-preferences(.*)",
  "/blog(.*)",
  "/about(.*)",
  "/contact(.*)",
  "/terms(.*)",
  "/privacy(.*)",
  "/api(.*)"
]);

export default clerkMiddleware((auth, request) => { 
  // Public routes are routes that don't require authentication
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
