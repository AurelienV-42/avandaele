import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('config');

import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
		turbo: {
			resolveAlias: {
				'next-intl/config': './src/',
			},
		},
	},
};

export default withNextIntl(withContentlayer(nextConfig));
