'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Upload, FolderOpen } from 'lucide-react';
import { Button } from "@/components/ui/bgimageui/button";
import { useDropzone } from 'react-dropzone';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import useFetchUserData from '@/app/Hooks/UserFetchData';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), {
      message: "File must be an image",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size should be less than 5MB`,
    }),
});

export function BackgroundImageEdit({ setbackground, username, refreshData }) {
  const { userData, message, error, loading, fetchUserData } = useFetchUserData();
  const [previewImage, setPreviewImage] = useState(null);
  
  // Fetch user data only once on mount and when username changes
  useEffect(() => {
    if (username) {
      fetchUserData(username);
    }
  }, [username, fetchUserData]);

  // Set preview image if user has a background image
  useEffect(() => {
    if (userData?.backgroundImage) {
      setPreviewImage(userData.backgroundImage);
    }
  }, [userData]);

  const fileInputRef = useRef(null);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  // Handle form submission to upload image
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', data.image);

      const response = await axios.post(`/api/background/${username}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("Profile updated successfully", response.data);
      reset();  // Reset the form state
      setPreviewImage(null);  // Clear preview
      refreshData();  // Refresh the data
    } catch (error) {
      console.error('Upload failed:', error);
      // Show user-friendly error message
      alert('Failed to upload image. Please try again.');
    }
  };

  // Handle file input change for image preview
  const handleImageUpload = (file) => {
    if (file?.type?.startsWith('image/')) {
      setValue('image', file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      handleImageUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: MAX_FILE_SIZE,
  });

  const handleFileInputChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDelete = () => {
    setPreviewImage(null);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';  // Clear file input
    }
  };

  const openFileFolder = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 text-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-zinc-700 sticky top-0 bg-zinc-900 z-10">  
          <h2 className="text-xl font-semibold">Background photo</h2>
          <button className="text-zinc-400 hover:text-white" onClick={() => setbackground(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4" encType="multipart/form-data">
          <div className="mb-4">
            {!previewImage ? (
              <div
                {...getRootProps()}
                className="p-8 border-2 border-dashed border-zinc-700 rounded-lg text-center cursor-pointer hover:border-zinc-500 transition-colors"
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto mb-4 text-zinc-400" />
                {isDragActive ? (
                  <p>Drop the image here ...</p>
                ) : (
                  <p>Drag &apos;n&apos; drop an image here, or click to select an image</p>
                )}
                <p className="text-sm text-zinc-500 mt-2">Max file size: 5MB</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <img
                  src={previewImage}
                  alt="Background"
                  style={{ maxWidth: '100%', maxHeight: '60vh' }}
                />
              </div>
            )}
            {errors.image && (
              <p className="text-red-500 mt-2">{errors.image.message}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              className="text-blue-400 hover:text-blue-300"
              onClick={handleDelete}
              disabled={!previewImage}
            >
              Delete photo
            </Button>
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
                onClick={openFileFolder}
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                {previewImage ? 'Change photo' : 'Upload photo'}
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700"
                disabled={!previewImage}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
