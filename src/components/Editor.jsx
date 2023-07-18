import React, {useState} from "react";
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from "draftjs-to-html";
import {convertToRaw, EditorState} from "draft-js";

const Index = ({getContent}) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const handleEditorChange = (state) => {
        setEditorState(state);
        sendContent();
    };
    const sendContent = () => {
        getContent(draftToHtml(convertToRaw(editorState?.getCurrentContent())));
    };
    const [focused, setFocused] = useState(null);
    return (
        <>
            <div className={`border-2 rounded-lg  ${focused ? 'border-indigo-600' : 'border-gray-300'}`}>
                <Editor
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    editorState={editorState}
                    editorClassName={"h-36 rounded-b-3xl pl-3 scrollbar-none"}
                    toolbarClassName={"bg-gray-200  border-gray-300 rounded-lg"}
                    toolbar={{
                        options: [
                            "history",
                            "inline",
                            "textAlign",
                            "blockType",
                            "fontSize",
                            "list",
                        ],
                    }}
                    onEditorStateChange={handleEditorChange}
                />
            </div>

            {/*<textarea value={draftToHtml(convertToRaw(text.getCurrentContent()))}></textarea>*/}
        </>
    );
};

export default Index;