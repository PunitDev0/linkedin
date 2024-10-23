'use client';
import { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { X, Edit3, Camera, Image as ImageIcon, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/profileimage-ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/profileimage-ui/select"
import { useTheme } from 'next-themes'

export function ProfilePhotoEditor({setProfileImage, ProfileImage}) {
  const [previewImage, setPreviewImage] = useState('/placeholder.svg?height=400&width=400')
  const fileInputRef = useRef(null)
  const { setTheme } = useTheme()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      visibility: 'anyone'
    }
  })

  useEffect(() => {
    // Set the theme to dark mode
    setTheme('dark')
  }, [setTheme])

  const onSubmit = (data) => {
    console.log('Form submitted:', data)
    // Here you would typically update the profile photo and its visibility
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDelete = () => {
    setPreviewImage('/placeholder.svg?height=400&width=400')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClose = () => {
    // Here you would typically handle closing the editor
    console.log('Editor closed')
  }

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50 shadow-2xl"></div>
        <div className="relative max-w-[600px] w-full bg-[#1B1F23] text-white border border-gray-700 rounded-lg shadow-lg p-4">
          <Button
            onClick={()=>setProfileImage(!ProfileImage)}
            variant="ghost"
            className="absolute right-2 top-2 text-gray-400 hover:text-white hover:bg-gray-800"
            aria-label="Close">
            <X className="h-6 w-6"  />
          </Button>
          <div className="border-b border-gray-700 p-6">
            <h2 className="text-2xl font-bold">Profile photo</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
            <div className="flex justify-center">
              <div className="relative bg-slate-400">
                <img
                  src={previewImage || '/placeholder.svg?height=400&width=400'}
                  alt="Profile"
                  className="rounded-full w-80 h-80 object-cover" />
                <Controller
                  name="visibility"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger
                        className="w-32 absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1B1F23] text-white border-gray-600">
                        <SelectValue placeholder="Visibility" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1B1F23] text-white border border-gray-700">
                        <SelectItem value="anyone">Anyone</SelectItem>
                        <SelectItem value="connections">Connections</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  )} />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="text-white border-gray-600 hover:bg-gray-800 hover:border-gray-500">
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="text-white border-gray-600 hover:bg-gray-800 hover:border-gray-500">
                <Camera className="mr-2 h-4 w-4" />
                Add photo
              </Button>
              <Button
                type="button"
                variant="outline"
                className="text-white border-gray-600 hover:bg-gray-800 hover:border-gray-500">
                <ImageIcon className="mr-2 h-4 w-4" />
                Frames
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                className="text-white border-gray-600 hover:bg-gray-800 hover:border-gray-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden" />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
  
}