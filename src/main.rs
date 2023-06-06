use clap::Parser;
use colored::Colorize;

pub mod my_syscalls_lib {
	#[link(wasm_import_module = "my_syscalls_lib")]
	extern "C" {
		pub fn custom_call() -> ();
	}
}

/// Simple program to greet a person
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// Name of the person to greet
    #[arg(short, long)]
    name: String,

    /// Number of times to greet
    #[arg(short, long, default_value_t = 1)]
    count: u8,
}

fn main() {
    let args = Args::parse();

    for _ in 0..args.count {
        println!("Hello {}", args.name.green())
    }

    unsafe {
        my_syscalls_lib::custom_call();
    }
}
