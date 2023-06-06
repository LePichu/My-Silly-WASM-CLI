import { build, BuildResult, PluginBuild } from "esbuild"
import { httpImports } from "esbuild_plugin_http_imports"

const prod = Deno.args.includes("--prod")

await build({
	entryPoints: [
		"my_silly_wasm_cli.ts",
	],
	bundle: true,
	loader: {
		".wasm": "binary",
	},
	format: "esm",
	outfile: "bin/my_silly_wasm_cli_bundle.js",
	plugins: [
		{
			"name": "exit-on-build",
			"setup": (build: PluginBuild) => {
				build.onEnd((result: BuildResult) => {
					Deno.exit(result.errors.length)
				})
			},
		},
        httpImports()
	],
    minify: prod,
    treeShaking: prod
})
