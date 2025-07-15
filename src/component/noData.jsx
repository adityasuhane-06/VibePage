import React from 'react';

const NoDataMessage = ({ message }) => {
    return (
        <div className="w-full p-4 flex flex-col items-center justify-center py-16">
            <img
                src="src/assets/download.png"
                alt="No Data"
                className="w-30 h-30 mb-6 object-contain"
            />
            <p className="text-gray-500 text-lg font-medium text-center">
                {message || "No data found"}
            </p>
            <p className="text-gray-400 text-sm text-center mt-2">
                Try adjusting your search or filters
            </p>
        </div>
    );
};

export default NoDataMessage;