use goscript_engine::*;
use std::io::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct RunResult {
    out: String,
    err: String,
    compile_err: String,
}

#[wasm_bindgen]
impl RunResult {
    pub fn new(out: String, err: String, compile_err: String) -> RunResult {
        RunResult {
            out,
            err,
            compile_err,
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
}

#[wasm_bindgen]
pub fn run_zip_and_string(zip: Vec<u8>, source: &str) -> RunResult {
    let mut cfg = run_zip::Config::default();
    cfg.base_dir = Some("std/");
    let out_buf = WriteBuf::new();
    let err_buf = WriteBuf::new();
    cfg.std_out = Some(Box::new(out_buf.clone()));
    cfg.std_err = Some(Box::new(err_buf.clone()));
    let result = run_zip::run_string(&zip, cfg, source);
    match result {
        Ok(_) => RunResult::new(out_buf.into_string(), err_buf.into_string(), "".to_owned()),
        Err(e) => RunResult::new("".to_owned(), "".to_owned(), format!("{}", e)),
    }
}

#[derive(Clone)]
struct WriteBuf {
    buffer: std::io::Cursor<Vec<u8>>,
}

impl WriteBuf {
    fn new() -> WriteBuf {
        WriteBuf {
            buffer: std::io::Cursor::new(vec![]),
        }
    }

    fn into_string(self) -> String {
        String::from_utf8_lossy(&self.buffer.into_inner()).into_owned()
    }
}

impl Write for WriteBuf {
    fn write(&mut self, buf: &[u8]) -> std::io::Result<usize> {
        self.buffer.write(buf)
    }

    fn flush(&mut self) -> std::io::Result<()> {
        Ok(())
    }
}
