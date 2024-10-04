'use client'
import { useState } from "react";

export default function Feed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  
  // Open and close modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log("Post Content:", postContent);
    console.log("Post Image:", postImage);
    toggleModal();
    setPostContent("");
    setPostImage(null);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setPostImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="p-4">
      <button onClick={toggleModal} className="p-2 bg-blue-500 text-white rounded-full">
        ➕ Post
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Create Post</h2>
              <button onClick={toggleModal} className="text-white">✖️</button>
            </div>
            <form onSubmit={handlePostSubmit} className="mt-4 space-y-4">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-3 bg-gray-800 rounded border border-gray-700"
                rows="4"
              ></textarea>
              <div className="flex items-center justify-between">
                <label htmlFor="image-upload" className="flex items-center space-x-2 cursor-pointer text-blue-400">
                  📷 <span>Add Photo</span>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              {postImage && (
                <div className="relative mt-4">
                  <img src={postImage} alt="Selected" className="w-full h-40 object-cover rounded" />
                  <button
                    onClick={() => setPostImage(null)}
                    className="absolute top-2 right-2 bg-gray-800 rounded-full p-1 text-white"
                  >
                    ✖️
                  </button>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
