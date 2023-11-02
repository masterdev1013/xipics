/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "serve-model-sd-outputs.s3.amazonaws.com",
				port: "",
				pathname: "/**"
			}
		],
		domains: ["melodyxpot-s3bucket.s3.amazonaws.com"]
	},
	experimental: {
		esmExternals: "loose",
		serverComponentsExternalPackages: ["mongoose"]
	},
	webpack(config) {
		config.experiments = {
			topLevelAwait: true,
			layers: true
		};
		return config;
	}
};

module.exports = nextConfig;
