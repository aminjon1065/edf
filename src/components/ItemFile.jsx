import {FaFilePdf, FaFileWord, FaDownload, FaEye} from 'react-icons/fa';
import {useState} from "react";
import FileModal from "./FileViewer";

export default function ItemFile({source, title, size, extens}) {
    const [modalOpen, setModalOpen] = useState(false);
    const handleFileClick = () => {
        setModalOpen(true);
    };

    let FileIcon;
    if (['jpg', 'png'].includes(extens.toLowerCase())) {
        FileIcon = <img src={source} alt="Img" className="object-cover pointer-events-none group-hover:opacity-75"/>;
    } else if (['pdf'].includes(extens.toLowerCase())) {
        FileIcon =
            <FaFilePdf className="object-cover pointer-events-none group-hover:opacity-75 w-full h-52 text-red-800"/>;
    } else if (['doc', 'docx'].includes(extens.toLowerCase())) {
        FileIcon =
            <FaFileWord className="object-cover pointer-events-none group-hover:opacity-75 w-full h-52 text-blue-800"/>;
    }

    return (
        <li className="relative">
            <FileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} fileUrl={source} extension={extens}/>
            <div
                className="group block w-full aspect-w-10 aspect-h-7 max-h-52 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                {FileIcon}
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-2 opacity-0 group-hover:opacity-100">
                    <button
                        className="focus:outline-none bg-black text-white rounded-full p-2 hover:bg-indigo-600"
                    >
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            download={title}
                            href={source}
                        >
                            <FaDownload/>

                        </a>
                    </button>
                    <button className="focus:outline-none bg-black text-white rounded-full p-2 hover:bg-indigo-600"
                            onClick={handleFileClick}>
                        <FaEye/>
                    </button>
                </div>
            </div>
            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{title}</p>
            <p className="block text-sm font-medium text-gray-500 pointer-events-none">{size}</p>
        </li>
    );
}
