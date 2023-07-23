import React from 'react';

const PDFViewer = ({isOpen, onClose, fileUrl}) => {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-1/2 p-6 rounded shadow">
                    <img src={fileUrl} alt="File Viewer" className="w-full h-80"/>
                    <button
                        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
};

export default PDFViewer;