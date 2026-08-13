import { TSS_SERVER_FUNCTION, createServerFn } from "./_ssr/ssr.mjs";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CM9XArLb.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getMarkdownContent_createServerFn_handler = createServerRpc({
	id: "839c02c1997c2eb923b5fd2d0ed6e38e33a0c8effd5394aa55663aa883500c78",
	name: "getMarkdownContent",
	filename: "src/routes/$slug.tsx"
}, (opts) => getMarkdownContent.__executeServer(opts));
var getMarkdownContent = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getMarkdownContent_createServerFn_handler, async ({ data: slug }) => {
	if (slug.includes("/") || slug.includes("..")) throw new Error("Invalid slug");
	try {
		const filePath = resolve(`public/${slug}.MD`);
		return await readFile(filePath, "utf-8");
	} catch (e) {
		try {
			const filePath = resolve(`public/${slug}.md`);
			return await readFile(filePath, "utf-8");
		} catch (e2) {
			throw new Error("Markdown file not found");
		}
	}
});
//#endregion
export { getMarkdownContent_createServerFn_handler };
