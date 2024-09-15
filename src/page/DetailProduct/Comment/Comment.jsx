import React from "react";

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <div>
      Comment
      {comment?.map((item, index) => {
        return (
          <div key={index} className="bg-gray-300 mb-2 p-5">
            <div>
              <p>{item.userEmail} </p>
              <p>{item.commentTime}</p>
            </div>
            <p>{item.content}</p>
            <div className="flex justify-start items-center gap-x-5">
              {item.contextImage.map((item1, index) => {
                return (
                  <div key={index}>
                    <img src={item1} alt="" className="w-[150px] h-[150px]" />
                  </div>
                );
              })}
            </div>
           
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
