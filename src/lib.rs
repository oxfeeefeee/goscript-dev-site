use goscript_engine::*;
use std::cell::RefCell;
use std::io::prelude::*;
use std::io::{Cursor, Result};
use std::rc::Rc;
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
    let mut cfg = run_zip::Config::default();
    cfg.base_dir = Some("std/");
    let out_buf = WriteBuf::new();
    let err_buf = WriteBuf::new();
    cfg.std_out = Some(Box::new(out_buf.clone()));
    cfg.std_err = Some(Box::new(err_buf.clone()));
    let debug = "".to_owned();
    let result = run_zip::run_string(&zip, cfg, source);
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
    buffer: Rc<RefCell<Cursor<Vec<u8>>>>,
}

impl WriteBuf {
    fn new() -> WriteBuf {
        WriteBuf {
            buffer: Rc::new(RefCell::new(Cursor::new(vec![]))),
        }
    }

    fn into_string(self) -> String {
        String::from_utf8_lossy(self.buffer.borrow().get_ref()).into_owned()
    }
}

impl Write for WriteBuf {
    fn write(&mut self, buf: &[u8]) -> Result<usize> {
        self.buffer.borrow_mut().write(buf)
    }

    fn flush(&mut self) -> Result<()> {
        Ok(())
    }
}
