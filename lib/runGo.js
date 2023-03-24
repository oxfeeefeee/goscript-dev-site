import init, { run_zip_and_string } from "/goscript/pkg/goscript_playground.js";

let std_zip;

async function initGoscript() {
	await init();
	const res = await fetch('/std.zip');
	const arrayBuffer = await res.arrayBuffer();
	return new Uint8Array(arrayBuffer);
}


export async function runGo(code) {
	if (typeof std_zip === 'undefined') {
		std_zip = await initGoscript();
	}
	return await run_zip_and_string(std_zip, code)
}