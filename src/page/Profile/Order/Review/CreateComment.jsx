import React, { useState } from "react";

const CreateComment = ({ comment, setComment }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setComment({ ...comment, files });

    // Tạo URL để xem trước hình ảnh
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const handleContent = (e) => {
    setComment({ ...comment, content: e.target.value });
  };

  return (
    <div>
      <h2>Create Comment</h2>
      <textarea
        className="h-[200px] w-[500px]"
        onChange={handleContent}
        placeholder="Write your comment..."
      />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImage} // Lấy file đã chọn
      />

      {/* Hiển thị ảnh xem trước */}
      <div className="image-preview flex justify-start items-center">
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index}`}
            className="w-[100px] h-[100px] object-cover m-2"
          />
        ))}
      </div>
    </div>
  );
};

export default CreateComment;
