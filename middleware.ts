import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};

export default withAuth(function middleware(req) {
  return;
});
