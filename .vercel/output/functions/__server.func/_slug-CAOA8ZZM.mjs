import { require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { Route } from "./_ssr/router-CezMUvCR.mjs";
import { Markdown } from "./_libs/react-markdown+[...].mjs";
import { remarkGfm } from "./_libs/remark-gfm.mjs";
import { rehypeHighlight } from "./_libs/rehype-highlight.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CAOA8ZZM.js
var import_jsx_runtime = require_jsx_runtime();
function MarkdownPage() {
	const markdown = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "markdown-body p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeHighlight],
			components: { a: ({ node, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "text-blue-500 hover:underline",
				target: "_blank",
				...props
			}) },
			children: markdown
		})
	});
}
//#endregion
export { MarkdownPage as component };
