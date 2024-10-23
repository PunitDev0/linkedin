'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Post-ui/avatar"
import { Button } from "@/components/ui/Post-ui/button"
import { Card, CardContent } from "@/components/ui/Post-ui/card"
import { Textarea } from "@/components/ui/Post-ui/textarea"
import { X, Smile, Trash, Plus, Upload, Moon, Sun } from 'lucide-react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { toast } from 'react-hot-toast'
import { useDarkMode } from '@/app/context/Context'
export function LinkedInPost({ onTrigger = false, setopenPost }) {
  const [mediaFiles, setMediaFiles] = useState([])
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mediaSelected, setMediaSelected] = useState(false)
  const [showFullForm, setShowFullForm] = useState(false)
  const fileInputRef = useRef(null)
  const { darkMode } = useDarkMode();

  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      postContent: "",
    },
  })

  useEffect(() => {
    if (mediaFiles.length === 0) {
      setMediaSelected(false)
      setShowFullForm(false)
    }
  }, [mediaFiles])

  useEffect(() => {
    if (onTrigger) {
      handlePlusClick()
    }
  }, [onTrigger])



  const handleMediaUpload = (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setMediaSelected(true)
      const newMediaFiles = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newMediaFiles.push({
            file,
            preview: reader.result,
            type: file.type.startsWith('image/') ? 'image' : 'video',
          })
          if (newMediaFiles.length === files.length) {
            setMediaFiles((prevFiles) => [...prevFiles, ...newMediaFiles])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeMedia = (index) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    if (currentMediaIndex >= index && currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1)
    }
  }

  const addEmoji = (emoji) => {
    setValue('postContent', `${watch('postContent')}${emoji.native}`)
    setShowEmojiPicker(false)
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('postContent', data.postContent)
      mediaFiles.forEach((media, index) => {
        formData.append(`media${index}`, media.file)
      })

      console.log(data.postContent);
      
      const response = await axios.post('/api/create-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        toast.success('Post created successfully!')
        resetForm()
      } else {
        throw new Error('Failed to create post')
      }
    } catch (error) {
      toast.error('Failed to create post. Please try again.')
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePlusClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const resetForm = () => {
    setopenPost(false)
    reset()
    setMediaFiles([])
    setMediaSelected(false)
    setShowFullForm(false)
    setShowEmojiPicker(false)
    setCurrentMediaIndex(0)
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    (<div
      className={`fixed inset-0 z-10 `}>
      <div
        className="flex justify-center absolute items-center min-h-screen w-screen">
        <Card
          className={`w-full max-w-4xl mx-auto shadow-2xl ${darkMode ? 'bg-[#1B1F23] text-white' : 'bg-white text-[#1B1F23]'}`}>
          <CardContent className="p-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-h-[80vh] overflow-y-auto">
              <div
                className={`sticky top-0 z-10 pb-4 mb-4 ${darkMode ? 'bg-[#1B1F23]' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder-user.jpg" alt="Punit Kumar" />
                      <AvatarFallback>PK</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-semibold">Punit Kumar</h2>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Post to Anyone</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`hover:${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
                      onClick={resetForm}
                      aria-label="Close post creator">
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
              {!mediaSelected ? (
                <div className="justify-center items-center text-center">
                  <div className="mb-6">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Person at desk with computer"
                      className="w-48 h-48 mx-auto" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Select files to begin</h2>
                  <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Share images or a single video in your post.</p>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center mx-auto"
                    onClick={handleUploadClick}>
                    <Upload className="mr-2 h-5 w-5" />
                    Upload from computer
                  </Button>
                </div>
              ) : (
                <>
                  {!showFullForm ? (
                    <div className="space-y-4 pb-16">
                      {mediaFiles.length > 0 && (
                        <div className="mb-6">
                          <div className="flex-grow">
                            {mediaFiles[currentMediaIndex].type === 'image' ? (
                              <img
                                src={mediaFiles[currentMediaIndex].preview}
                                alt={`Upload ${currentMediaIndex + 1}`}
                                className="w-full h-[400px] object-contain rounded-lg" />
                            ) : (
                              <video
                                src={mediaFiles[currentMediaIndex].preview}
                                className="w-full h-[400px] rounded-lg"
                                controls />
                            )}
                          </div>
                          <div className="flex mt-4 space-x-2 overflow-x-auto">
                            {mediaFiles.map((media, index) => (
                              <div
                                key={index}
                                className={`relative cursor-pointer flex-shrink-0 ${
                                  index === currentMediaIndex ? 'ring-2 ring-blue-500' : ''
                                }`}
                                onClick={() => setCurrentMediaIndex(index)}>
                                {media.type === 'image' ? (
                                  <img
                                    src={media.preview}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded" />
                                ) : (
                                  <video src={media.preview} className="w-20 h-20 object-cover rounded" />
                                )}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className={`absolute top-0 right-0 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeMedia(index);
                                  }}>
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className={`w-20 h-20 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center`}
                              onClick={handlePlusClick}>
                              <Plus className="h-6 w-6" />
                            </Button>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-center">
                        <Button
                          type="button"
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                          onClick={() => setShowFullForm(true)}>
                          Select
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 pb-16">
                        <Controller
                          name="postContent"
                          control={control}
                          render={({ field }) => (
                            <Textarea
                              {...field}
                              placeholder="Share your thoughts..."
                              className={`min-h-[100px] text-lg bg-transparent border-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-[#1B1F23] placeholder-gray-600'} resize-none focus:ring-0`} />
                          )} />
                        {showEmojiPicker && (
                          <div className="mt-4 absolute z-10">
                            <Picker
                              data={data}
                              onEmojiSelect={addEmoji}
                              theme={darkMode ? "dark" : "light"}
                              set="apple"
                              emojiSize={20}
                              emojiButtonSize={28}
                              maxFrequentRows={4}
                              perLine={8} />
                          </div>
                        )}
                      </div>
                      {mediaFiles.length > 0 && (
                        <div className="mt-6">
                          <div className="flex-grow">
                            {mediaFiles[currentMediaIndex].type === 'image' ? (
                              <img
                                src={mediaFiles[currentMediaIndex].preview}
                                alt={`Upload ${currentMediaIndex + 1}`}
                                className="w-full h-[200px] object-contain rounded-lg" />
                            ) : (
                              <video
                                src={mediaFiles[currentMediaIndex].preview}
                                className="w-full h-[200px] rounded-lg"
                                controls />
                            )}
                          </div>
                          <div className="flex mt-4 space-x-2 overflow-x-auto">
                            {mediaFiles.map((media, index) => (
                              <div
                                key={index}
                                className={`relative cursor-pointer flex-shrink-0 ${
                                  index === currentMediaIndex ? 'ring-2 ring-blue-500' : ''
                                }`}
                                onClick={() => setCurrentMediaIndex(index)}>
                                {media.type === 'image' ? (
                                  <img
                                    src={media.preview}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-16 h-16 object-cover rounded" />
                                ) : (
                                  <video src={media.preview} className="w-16 h-16 object-cover rounded" />
                                )}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className={`absolute top-0 right-0 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeMedia(index);
                                  }}>
                                  <Trash className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className={`w-16 h-16 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center`}
                              onClick={handlePlusClick}>
                              <Plus className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      )}
                      <div
                        className={`sticky bottom-0 pt-4  border-t ${darkMode ? 'bg-[#1B1F23] border-gray-800' : 'bg-white border-gray-200'}`}>
                        <div className="flex justify-between items-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="lg"
                            className={`hover:${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            <Smile className="mr-2 h-5 w-5" />
                            Emoji
                          </Button>
                          <Button
                            type="submit"
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                            disabled={isSubmitting}>
                            {isSubmitting ? 'Posting...' : 'Post'}
                          </Button>
                        </div>
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
                onChange={handleMediaUpload} />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>)
  );
}