import React, { useRef, useState } from 'react';
import { getEmbedded } from '../lib/embedded';
import { runGo } from '../lib/runGo';
import Editor from "@monaco-editor/react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'


export default function Playground({ embedded, code, codeIds }) {
    const editorRef = useRef(null);
    const [message, setMessage] = useState('');

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;

        if (typeof code === "undefined") {
            let codeId = embedded;
            if (typeof codeId === "undefined") {
                codeId = "fibonacci.go"
            }
            loadEmbedded(codeId)
        } else {
            editorRef.current?.setValue(code)
        }
    }

    async function handleRunClick() {
        const code = editorRef.current?.getValue();
        let result = await runGo(code);
        let re = result.out + result.err + result.compile_err
        setMessage(re);
    }

    function loadEmbedded(id) {
        const codeData = getEmbedded()[id];
        editorRef.current?.setValue(codeData)
    }

    async function handleLoadClick(e) {
        loadEmbedded(e.target.value)
    }

    async function handleLoadSelect(key, e) {
        loadEmbedded(key);
    }

    return (
        <>
            <p></p>
            <ButtonGroup>
                <Button size="sm" variant="primary" onClick={handleRunClick}>RUN</Button>
                <Button size="sm" onClick={handleLoadClick} value="template.go" > CLEAR </Button>
                <Button size="sm" onClick={handleLoadClick} value="fibonacci.go" > fibonacci.go </Button>
                <Button size="sm" onClick={handleLoadClick} value="unicode.go" > unicode.go </Button>
                <Button size="sm" onClick={handleLoadClick} value="list.go" > list.go </Button>
                <Button size="sm" onClick={handleLoadClick} value="closure.go" > closure.go </Button>
                <Button size="sm" onClick={handleLoadClick} value="leetcode5.go" > leetcode5.go </Button>
                <DropdownButton size="sm" title="LOAD MORE ... ">
                    {codeIds.map(({ params }) => (
                        <Dropdown.Item href={`/go/${params.id}`} key={params.id}>
                            {params.id}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </ButtonGroup>
            <p></p>
            <p style={{
                fontSize: "0.9rem",
                lineHeight: "1.3",
                fontStyle: "italic",
            }} >Tip: Click RUN to run the code in your browser. The code is editable!</p>
            <Editor
                height="40vh" // By default, it fully fits with its parent
                //theme={theme}
                language={"go"}
                //options={editor_options}
                //value={codeData.codeContent}
                //editorDidMount={handleEditorDidMount}
                onMount={handleEditorDidMount}
                loading={"Loading..."}
            />
            <p></p>
            <textarea readOnly rows="10" cols="103" value={message}>
            </textarea>
        </ >
    );
}