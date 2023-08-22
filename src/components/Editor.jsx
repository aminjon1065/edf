import React, {useState} from "react";
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from "draftjs-to-html";
import {convertToRaw, EditorState} from "draft-js";
import api from "../services/api";

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
    const uploadImageCallback = (file) => {
        return new Promise(
            (resolve, reject) => {
                const formData = new FormData();
                formData.append('filename', file);
                api.post('/other-files', formData)
                    .then(response => {
                        // Предполагается, что ваш API возвращает объект,
                        // который содержит URL изображения под ключом 'url'.
                        resolve({ data: { link: response.data.url } });
                    })
                    .catch(error => {
                        // Обработка ошибок, возвращенных вашим API
                        reject(error);
                    });
            }
        );
    };
    return (
        <>
            <div className={`border-2 rounded-lg  ${focused ? 'border-indigo-600' : 'border-gray-300'}`}>
                <Editor
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    editorState={editorState}
                    editorClassName={"h-36 rounded-b-3xl pl-3 scrollbar-none z-10"}
                    toolbarClassName={"bg-gray-200  border-gray-300 rounded-lg"}
                    toolbar={{
                        // history: { inDropdown: true },
                        inline: { inDropdown: true },
                        // list: { inDropdown: true },
                        // textAlign: { inDropdown: true },
                        // blockType: { inDropdown: true },
                        image: {
                            previewImage: true,
                            uploadCallback: uploadImageCallback,
                            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg'
                        },
                        options: [
                            "history",
                            "inline",
                            "textAlign",
                            "blockType",
                            "fontSize",
                            "list",
                            "image"
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