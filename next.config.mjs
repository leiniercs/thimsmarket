import createNextIntlPlugin from "next-intl/plugin";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://statichunt.com https://statichunt-images.netlify.app;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
   async headers() {
      return [
         {
            source: "/(.*)",
            headers: [
               {
                  key: "Content-Security-Policy",
                  value: cspHeader.replace(/\n/g, "")
               }
            ]
         }
      ];
   }
};

export default withNextIntl(nextConfig);