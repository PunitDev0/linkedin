"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, X, Image, Smile, Trash, Plus } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { toast } from "react-hot-toast";
import { Upload } from "lucide-react"
export function LinkedInPostCreatorComponent({ onTrigger }) {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaSelected, setMediaSelected] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const fileInputRef = useRef(null);
  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      postContent: "",
    },
  });

  useEffect(() => {
    if (mediaFiles.length === 0) {
      setMediaSelected(false);
      setShowFullForm(false);
      setIsSet(false);
    }
  }, [mediaFiles]);

  const handleMediaUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setMediaSelected(true);
      const newMediaFiles = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newMediaFiles.push({
            file,
            preview: reader.result,
            type: file.type.startsWith("image/") ? "image" : "video",
          });
          if (newMediaFiles.length === files.length) {
            setMediaFiles((prevFiles) => [...prevFiles, ...newMediaFiles]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeMedia = (index) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    if (currentMediaIndex >= index && currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  const addEmoji = (emoji) => {
    setValue("postContent", `${watch("postContent")}${emoji.native}`);
    setShowEmojiPicker(false);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("postContent", data.postContent);
      mediaFiles.forEach((media, index) => {
        formData.append(`media${index}`, media.file);
      });

      const response = await axios.post("/api/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Post created successfully!");
        resetForm();
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlusClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    if (onTrigger) {
      handlePlusClick();
    }
  }, [onTrigger]);

  const resetForm = () => {
    reset();
    setMediaFiles([]);
    setMediaSelected(false);
    setShowFullForm(false);
    setIsSet(false);
    setShowEmojiPicker(false);
    setCurrentMediaIndex(0);
  };

  return (
    <div className="fixed inset-0 z-10">
      <div className="flex justify-center absolute items-center min-h-screen w-screen ">
        <Card className="w-full max-w-4xl mx-auto bg-gray-900 text-white shadow-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              {!mediaSelected ? (
                <div className="justify-center m-auto items-center">
                  <div className="mb-6">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Person at desk with computer"
                      className="w-48 h-48"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Select files to begin
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Share images or a single video in your post.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload from computer
                  </Button>
                </div>
              ) : (
                <>
                 
                  {!showFullForm ? (
                    <div className="flex justify-center mt-4">
                      <Button
                        type="button"
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                        onClick={() => setShowFullForm(true)}
                      >
                        Select
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex sticky items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src="/placeholder-user.jpg"
                              alt="Punit Kumar"
                            />
                            <AvatarFallback>PK</AvatarFallback>
                          </Avatar>
                          <div>
                            <h2 className="text-xl font-semibold">
                              Punit Kumar
                            </h2>
                            <p className="text-sm text-gray-400">
                              Post to Anyone
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-800"
                          >
                            <Pencil className="h-6 w-6" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-800"
                            onClick={resetForm}
                          >
                            <X className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Controller
                          name="postContent"
                          control={control}
                          render={({ field }) => (
                            <Textarea
                              {...field}
                              placeholder="Share your thoughts..."
                              className="min-h-[100px] text-lg bg-transparent border-none text-white placeholder-gray-400 resize-none focus:ring-0"
                            />
                          )}
                        />

{mediaFiles.length > 0 && (
                    <div className="flex space-x-4 mb-4">
                      <div className="flex-grow">
                        {mediaFiles[currentMediaIndex].type === "image" ? (
                          <img
                            src={mediaFiles[currentMediaIndex].preview}
                            alt={`Upload ${currentMediaIndex + 1}`}
                            className="w-full h-[400px] object-contain rounded-lg"
                          />
                        ) : (
                          <video
                            src={mediaFiles[currentMediaIndex].preview}
                            className="w-full h-[400px] rounded-lg"
                            controls
                          />
                        )}
                      </div>
                      <div className="w-1/4 flex flex-col space-y-2">
                        <div className="text-sm text-gray-400">
                          {currentMediaIndex + 1} of {mediaFiles.length}
                        </div>
                        <div className="flex-grow overflow-y-auto space-y-2">
                          {mediaFiles.map((media, index) => (
                            <div
                              key={index}
                              className={`relative cursor-pointer ${
                                index === currentMediaIndex
                                  ? "ring-2 ring-blue-500"
                                  : ""
                              }`}
                              onClick={() => setCurrentMediaIndex(index)}
                            >
                              {media.type === "image" ? (
                                <img
                                  src={media.preview}
                                  alt={`Thumbnail ${index + 1}`}
                                  className="w-full h-20 object-cover rounded"
                                />
                              ) : (
                                <video
                                  src={media.preview}
                                  className="w-full h-20 object-cover rounded"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-800"
                            onClick={() => removeMedia(currentMediaIndex)}
                          >
                            <Trash className="h-5 w-5" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-800"
                            onClick={handlePlusClick}
                          >
                            <Plus className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}




                        
                        {showEmojiPicker && (
                          <div className="mt-4">
                            <Picker
                              data={data}
                              onEmojiSelect={addEmoji}
                              theme="dark"
                              set="apple"
                              emojiSize={20}
                              emojiButtonSize={28}
                              maxFrequentRows={4}
                              perLine={8}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <div className="flex space-x-4">
                          <Button
                            type="button"
                            variant="ghost"
                            size="lg"
                            className="hover:bg-gray-800"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          >
                            <Smile className="mr-2 h-5 w-5" />
                            Emoji
                          </Button>
                        </div>
                        {!isSet ? (
                          <Button
                            type="button"
                            size="lg"
                            className="bg-green-600 hover:bg-green-700 text-white px-8"
                            onClick={() => setIsSet(true)}
                          >
                            Set
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Posting..." : "Post"}
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleMediaUpload}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
