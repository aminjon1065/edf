import React, {useEffect, useState} from 'react';
import usePageTitle from "../../hooks/usePageTitle";
import api from "../../services/api";
import ItemFile from "../../components/ItemFile";
import {PUBLIC_APP_URL_DOCUMENTS} from "../../helpers/CONSTANTS";

const Index = () => {
    usePageTitle('Файлы');
    const [files, setFiles] = useState([]);
    useEffect(() => {
        fetchFiles();
    }, []);
    const fetchFiles = () => {
        api.get('get-files').then((response) => {
            setFiles(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    console.log(files);
    return (
        <div>
            <ul role="list"
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {
                    files.map((file) => {
                        return <ItemFile key={file.id} source={`${PUBLIC_APP_URL_DOCUMENTS}${file.user.region}/${file.folder}/${file.name}`} size={file.size} extens={file.extension} title={file.name}/>
                    })
                }
            </ul>
        </div>
    );
};

export default Index;