import fs from "fs";
import { globby } from "globby";

(async () => {
	const pages = await globby([
		"app/**/*.tsx", // Adjust the extension depending on your setup (.js, .jsx, .ts, .tsx)
		"!app/_*.tsx", // Exclude Next.js specific files like _app.js and _document.js
		"!app/components", // Exclude API routes
		// Add more patterns as needed
	]);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
		.map((page) => {
			const path = page
				.replace("pages", "")
				.replace(".tsx", "")
				.replace(".js", "")
				.replace(".jsx", "")
				.replace(".ts", "")
				.replace("/index", "");
			const route = path === "/index" ? "" : path;

			return `<url>
  <loc>${`https://avandaele.fr/${route}`}</loc>
</url>`;
		})
		.join("\n  ")}
</urlset>`;

	fs.writeFileSync("public/sitemap.xml", sitemap);
})();
