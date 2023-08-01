/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    STABILITY_API_KEY: process.env.STABILITY_API_KEY,
    AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
    AWS_ACCESS_KEY: process.env.AWS_PERSONAL_SECRET_KEY,
    AWS_REGION_KEY: process.env.AWS_REGION_KEY,
    WEB3_STORAGE_API_KEY: process.env.WEB3_STORAGE_API_KEY,
    STABILITY_MODEL: process.env.STABILITY_MODEL,
    STABILITY_SAMPLE_COUNT: process.env.STABILITY_SAMPLE_COUNT,
    SECRET_KEY: process.env.SECRET_KEY,
    PUBLIC_KEY: process.env.PUBLIC_KEY
  }
}

module.exports = nextConfig
