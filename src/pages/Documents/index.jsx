import React, {useEffect, useState} from 'react';
import api from "../../services/api";
import usePageTitle from "../../hooks/usePageTitle";
import ItemDocument from "../../components/ItemDocument";

const Index = () => {
    usePageTitle('Документы');
    const [documents, setDocuments] = useState([])

    useEffect(() => {
        fetchDocuments();
    }, []);
    const fetchDocuments = () => {
        api.get('get-documents').then((response) => {
            setDocuments(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    console.log(documents)
    return (
        <div>
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {documents.map((document) => {
                    return <ItemDocument key={document.id} document={document} />
                })}
            </ul>
        </div>
    );
};

export default Index;