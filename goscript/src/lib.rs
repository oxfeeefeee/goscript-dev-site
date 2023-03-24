use goscript_engine as engine;
use std::borrow::Cow;
use std::io::prelude::*;
use std::io::{Cursor, Result};
use std::path::PathBuf;
use std::sync::{Arc, Mutex};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct RunResult {
    out: String,
    err: String,
    compile_err: String,
    debug: String,
}

#[wasm_bindgen]
impl RunResult {
    pub fn new(out: String, err: String, compile_err: String, debug: String) -> RunResult {
        RunResult {
            out,
            err,
            compile_err,
            debug,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn out(&self) -> String {
        self.out.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn err(&self) -> String {
        self.err.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn compile_err(&self) -> String {
        self.compile_err.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn debug(&self) -> String {
        self.debug.clone()
    }
}

#[wasm_bindgen]
pub fn run_zip_and_string(zip: Vec<u8>, source: &str) -> RunResult {
    let mut cfg = engine::Config::default();
    let out_buf = WriteBuf::new();
    let err_buf = WriteBuf::new();
    cfg.std_out = Some(Box::new(out_buf.clone()));
    cfg.std_err = Some(Box::new(err_buf.clone()));
    let (sr, path) = engine::SourceReader::zip_lib_and_string(
        std::borrow::Cow::Owned(zip),
        PathBuf::from("std/"),
        Cow::Owned(source.to_owned()),
    );
    let result = engine::run(cfg, &sr, &path);
    let debug = "".to_owned();
    match result {
        Ok(_) => RunResult::new(
            out_buf.into_string(),
            err_buf.into_string(),
            "".to_owned(),
            debug,
        ),
        Err(e) => RunResult::new("".to_owned(), "".to_owned(), format!("{}", e), debug),
    }
}

#[derive(Clone)]
struct WriteBuf {
    buffer: Arc<Mutex<Cursor<Vec<u8>>>>,
}

impl WriteBuf {
    fn new() -> WriteBuf {
        WriteBuf {
            buffer: Arc::new(Mutex::new(Cursor::new(vec![]))),
        }
    }

    fn into_string(self) -> String {
        String::from_utf8_lossy(self.buffer.lock().unwrap().get_ref()).into_owned()
    }
}

impl Write for WriteBuf {
    fn write(&mut self, buf: &[u8]) -> Result<usize> {
        log(&format!("write: {}", String::from_utf8_lossy(buf)));
        self.buffer.lock().unwrap().write(buf)
    }

    fn flush(&mut self) -> Result<()> {
        log("flush");
        Ok(())
    }
}

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}
