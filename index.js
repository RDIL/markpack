const {Command, Option, runExit} = require("clipanion")
const {build} = require("esbuild")

class Markpack extends Command {
  file = Option.String({
    description: "The input file name",
  })

  outFile = Option.String("-o,--out-file", "bookmarklet.js", {
    description: "The output file name",
  })

  noMinify = Option.Boolean("-n,--no-minify", false, {
    description: "If minification should be skipped or not. By default, minification is enabled.",
  })

  static usage = Command.Usage({
    category: "Main",
    description: "Build a bookmarklet",
    details: `
      The built bookmarklet will appear at the specified output location (defaulting to 'bookmarklet.js').
    `,
    examples: [[
      "Basic usage",
      "$0 input.js",
    ], [
      "Custom output file name",
      "$0 --out-file hello_world.js",
    ], [
      "With custom output file name (shorthand)",
      "$0 -o hello_world.js",
    ], [
      "Without minifying the output",
      "$0 --no-minify",
    ]],
  })

  async execute() {
    await build({
      entryPoints: [this.file],
      outfile: this.outFile,
      minify: !this.noMinify,
      target: "chrome65",
      bundle: true,
      format: "iife",
      banner: {
        js: "javascript:",
      },
    })
  }
}

runExit(Markpack)
