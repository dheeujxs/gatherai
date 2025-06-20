import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";


interface NewAgentDilogProps{
    open:boolean;
    onOpenChange : (open:boolean) => void;
}

export const NewAgentDialog=({open, onOpenChange}:NewAgentDilogProps) => {
    return (
        <ResponsiveDialog title="New Agent" descrption="Create a new Agent" open={open} onOpenChange={onOpenChange}>
           <AgentForm 
       onSuccess={()=> onOpenChange(false)}
       onCancel={()=> onOpenChange(false)}  
        />


        </ResponsiveDialog>
    )
}