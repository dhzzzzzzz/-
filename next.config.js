/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    MEILISEARCH_HOST: process.env.MEILISEARCH_HOST || 'http://meilisearch:7700',
    MEILISEARCH_MASTER_KEY: process.env.MEILISEARCH_MASTER_KEY || 'masterKey',
  },
}

module.exports = nextConfig

