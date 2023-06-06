// @ts-ignore "As Deno does not like dealing with non JS(X) files, a simple ignore lint rule is enough for our case."
import bin from "./target/wasm32-wasi/release/my_silly_wasm_cli.wasm"
import Context from "https://deno.land/std@0.190.0/wasi/snapshot_preview1.ts"

const env = Object.create(Deno.env.toObject())
env["CLICOLOR_FORCE"] = Deno.noColor ? "0" : "1"

const context = new Context({
	args: ["My Silly WASM CLI", ...Deno.args],
	env: {
		...env
	},
})

const instance = await WebAssembly.instantiate(
	bin,
	{
		"wasi_snapshot_preview1": context.exports,
		"my_syscalls_lib": {
			"custom_call": () => {
				console.log("Hello from custom call!")
				return 0
			}
		}
	},
)

context.start(instance.instance)
