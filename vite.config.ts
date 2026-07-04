import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { extname, relative, resolve } from "path";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { glob } from "glob";

export default defineConfig({
	plugins: [
		react(),
		// React Compiler runs through Babel. `target: "18"` emits code that uses
		// `react-compiler-runtime`, so the optimized output also works on React 18.
		babel({ presets: [reactCompilerPreset({ target: "18" })] }),
		libInjectCss(),
		dts({
			include: ["lib"],
			exclude: ["lib/**/*.test.{ts,tsx}", "lib/**/__tests__/**"],
		}),
	],
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, "lib/main.ts"),
			formats: ["es"],
		},
		rollupOptions: {
			external: [
				"react",
				"react-dom",
				"react/jsx-runtime",
				"react-compiler-runtime",
			],
			input: Object.fromEntries(
				glob
					.sync("lib/**/*.{ts,tsx}", {
						ignore: [
							"lib/**/*.d.ts",
							"lib/**/*.test.{ts,tsx}",
							"lib/**/__tests__/**",
						],
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
	},
});
