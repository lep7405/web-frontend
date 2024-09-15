import React, { useState } from 'react'

const Description = ({des}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 300; // Số lượng ký tự hiển thị ban đầu
    console.log(des)
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    // Cắt ngắn nội dung nếu nó quá dài và chưa được mở rộng
    const descriptionPreview = des?.slice(0, MAX_LENGTH);

    return (
        <div className="bg-white border-2 border-gray-200 p-5 w-2/3">
            <div
                dangerouslySetInnerHTML={{ __html: isExpanded ? des: descriptionPreview }}
            />
            {des?.length > MAX_LENGTH && (
                <button
                    onClick={toggleExpansion}
                    className="text-blue-500 underline mt-2"
                >
                    {isExpanded ? 'See less' : 'See more'}
                </button>
            )}
        </div>
    );
}

export default Description