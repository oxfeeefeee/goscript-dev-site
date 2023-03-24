/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} zip
* @param {string} source
* @returns {RunResult}
*/
export function run_zip_and_string(zip: Uint8Array, source: string): RunResult;
/**
*/
export class RunResult {
  free(): void;
/**
* @param {string} out
* @param {string} err
* @param {string} compile_err
* @param {string} debug
* @returns {RunResult}
*/
  static new(out: string, err: string, compile_err: string, debug: string): RunResult;
/**
*/
  readonly compile_err: string;
/**
*/
  readonly debug: string;
/**
*/
  readonly err: string;
/**
*/
  readonly out: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_runresult_free: (a: number) => void;
  readonly runresult_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly runresult_out: (a: number, b: number) => void;
  readonly runresult_err: (a: number, b: number) => void;
  readonly runresult_compile_err: (a: number, b: number) => void;
  readonly runresult_debug: (a: number, b: number) => void;
  readonly run_zip_and_string: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
