import { build } from "velite";
import createNextIntlPlugin from "next-intl/plugin";

const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
	process.env.VELITE_STARTED = "1";
	await build({ watch: isDev, clean: !isDev });
}

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withNextIntl(nextConfig);
