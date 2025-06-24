import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../types";


interface UpdateAgentDilogProps{
    open:boolean;
    onOpenChange : (open:boolean) => void;
    initalValues: AgentGetOne;
}

export const UpdateAgentDialog=({open, onOpenChange , initalValues}:UpdateAgentDilogProps) => {
    return (
        <ResponsiveDialog title="Edit Agent" descrption="Edit the agent details" open={open} onOpenChange={onOpenChange}>
           <AgentForm 
       onSuccess={()=> onOpenChange(false)}
       onCancel={()=> onOpenChange(false)}  
       initalValues={initalValues}
        />


        </ResponsiveDialog>
    )
}