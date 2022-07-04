<script>
  import { onMount } from "svelte";
  import init, { run_zip_and_string } from "../lib/goscript_playgound";

  let zip, compile_err, err, out;

  let code = `// You can edit this code!
// Click here and start typing.
package main

import "fmt"

func fibonacci(c, quit chan int) {
  x, y := 0, 1
  for {
    select {
    case c <- x:
      x, y = y, x+y
    case <-quit:
      fmt.Println("quit!")
      return
    }
  }
}

func main() {
  c := make(chan int)
  quit := make(chan int)
  go func() {
    for i := 0; i < 12; i++ {
      fmt.Println(<-c)
    }
    quit <- 0
  }()

  fibonacci(c, quit)
}`;

  // only run on client-side
  onMount(async () => {
    await init("/goscript_playgound_bg.wasm");
    const res = await fetch("/std.zip");
    const arrayBuffer = await res.arrayBuffer();
    zip = new Uint8Array(arrayBuffer);
  });

  async function run() {
    ({ compile_err, err, out } = await run_zip_and_string(zip, code));
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1>Playgound</h1>

<textarea bind:value={code} rows="32" cols="80" />

<div>
  <button on:click={run}>Run</button>
</div>

stdout:
<pre>{out}</pre>

stderr:
<pre>{err}</pre>

Compile Error:
<pre>{compile_err}</pre>
