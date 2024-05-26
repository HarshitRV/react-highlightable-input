import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { extname, relative, resolve } from "path";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { glob } from "glob";

export default defineConfig({
	plugins: [react(), libInjectCss(), dts({ include: ["lib"] })],
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, "lib/main.ts"),
			formats: ["es"],
		},
		rollupOptions: {
			external: ["react", "react/jsx-runtime"],
			input: Object.fromEntries(
				glob
					.sync("lib/**/*.{ts,tsx}", {
						ignore: ["lib/**/*.d.ts"],
					})
					.map((file) => [
						// The name of the entry point
						// lib/nested/foo.ts becomes nested/foo
						relative("lib", file.slice(0, file.length - extname(file).length)),
						// The absolute path to the entry file
						// lib/nested/foo.ts becomes /project/lib/nested/foo.ts
						fileURLToPath(new URL(file, import.meta.url)),
					])
			),
			output: {
				assetFileNames: "assets/[name][extname]",
				entryFileNames: "[name].js",
			},
		},
	},
	css: {
		modules: {
			localsConvention: "camelCaseOnly",
		},
		preprocessorOptions: {
			scss: {
				additionalData: `@import "src/styles/__variables.scss";`,
			},
		},
	},
});
