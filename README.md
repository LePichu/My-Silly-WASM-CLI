# My Silly WASM CLI
This is an experiment showing how you can use WASM to ship CLIs powered by the `clap-rs` crate. It was documented as a part of my blog post called "Portable CLIs with Rust", which can be found [here](https://lepichudoes.deno.dev/blog/portable-clis-with-rust).

## Building
Please run `deno task build` to build, then do `deno run --allow-env --allow-read ./bin/my_silly_wasm_cli_bundle.js` to run the CLI.

## License
This project, like many of my other projects, is licensed under the MIT License, for more info, please look at [LICENSE](./LICENSE).
