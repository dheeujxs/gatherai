import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meetings-form";
import { useRouter } from "next/navigation";



interface NewMeetingDilogProps{
    open:boolean;
    onOpenChange : (open:boolean) => void;
}

export const NewMeetingDialog=({open, onOpenChange}:NewMeetingDilogProps) => {
    const router = useRouter()
    return (
        <ResponsiveDialog title="New Meeting" descrption="Create a new Meeting" open={open} onOpenChange={onOpenChange}>
      <MeetingForm 
      onSuccess={(id) => {
        onOpenChange(false)
        router.push(`/meetings/${id}`)
      }}
      onCancel={() => onOpenChange(false)}
      />


        </ResponsiveDialog>
    )
}