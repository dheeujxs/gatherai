import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meetings-form";
;
import { MeetingGetOne } from "../../types";



interface UpdateMeetingDilogProps{
    open:boolean;
    onOpenChange : (open:boolean) => void;
    initalValues:MeetingGetOne
}

export const UpdateMeetingDialog=({open, onOpenChange , initalValues}:UpdateMeetingDilogProps) => {

    return (
        <ResponsiveDialog title="Edit Meeting" descrption="Edit the meeting details" open={open} onOpenChange={onOpenChange}>
      <MeetingForm 
      onSuccess={() => {
        onOpenChange(false)

      }}
      onCancel={() => onOpenChange(false)}
      initalValues={initalValues}
      />


        </ResponsiveDialog>
    )
}