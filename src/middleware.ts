export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/product/:path*",
    "/orders/:path*",
    "/product/:path*",
    "/cart/:path*", 
  "/profile/:path*",
   "/checkout/:path*", 
]
};