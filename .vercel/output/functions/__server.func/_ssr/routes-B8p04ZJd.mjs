import { Link, require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B8p04ZJd.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 max-w-2xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-blue-600 text-3xl font-bold mb-6",
			children: "Markdown Documents"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-4",
			children: [
				{
					title: "6 Section GSAP",
					slug: "6-SECTION-GSAP"
				},
				{
					title: "Dot Notation",
					slug: "DOT-NOTATION"
				},
				{
					title: "GSAP",
					slug: "GSAP"
				}
			].map((md) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/$slug",
				params: { slug: md.slug },
				className: "block p-4 border rounded-lg transition-colors shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold text-blue-600",
					children: md.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-gray-500 mt-1",
					children: [
						"Read the ",
						md.title,
						" documentation →"
					]
				})]
			}) }, md.slug))
		})]
	});
}
//#endregion
export { Home as component };
