import { X, Info, Plus, Moon, Sun, Upload, RotateCw, Crop, GripVertical } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/profileui/button"
import { Input } from "@/components/ui/profileui/input"
export const SkillsInputComponent = ({ control, getValues, setValue, handleSubmit, onSubmit, darkmode}) => {
 

    const addSkill = (newSkill) => {
      const skills = getValues('skills');
      if (newSkill && !skills.includes(newSkill)) {
        setValue('skills', [...skills, newSkill]);
        setValue('newSkill', '');
      }
    }
  
    const removeSkill = (skillToRemove) => {
      const skills = getValues('skills');
      setValue('skills', skills.filter(skill => skill !== skillToRemove));
    }
  
    return (
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">Skills</h2>
            <p className="text-sm text-zinc-400">
              Show your top skills — add up to 5 skills you want to be known for. They will also appear in your Skills section.
            </p>
          </div>
          <div className="space-y-2 mb-4">
            <Controller
              name="skills"
              control={control}
              render={({ field: { value } }) => (
                value.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#0D0F11] p-2 rounded">
                    <div className="flex items-center">
                      <GripVertical className="w-4 h-4 mr-2 text-zinc-500" />
                      <span>{skill}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-zinc-500 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            />
          </div>
          {getValues('skills').length < 5 && (
            <div className="flex space-x-2 mb-4">
              <Controller
                name="newSkill"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Add a skill"
                    className="bg-[#0D0F11] border-zinc-700 text-white"
                  />
                )}
              />
              <Button
                type="button"
                onClick={() => addSkill(getValues('newSkill'))}
                variant="outline"
                className="text-blue-400 border-blue-400 hover:bg-blue-400/10">
                <Plus className="w-4 h-4 mr-2" />
                Add skill
              </Button>
            </div>
          )}
          {/* <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Save
          </Button> */}
        </form>
      </div>
    )
  }