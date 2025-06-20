import { CommandResposiveDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dispatch, SetStateAction } from "react";

interface Props {
    open:boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;

}

export const  DashboardCommand  = ({open , setOpen}:Props) => {
    return (
        <CommandResposiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput 
            placeholder="Fina a meeting or agent"

            
            />
            <CommandList>
                <CommandItem>
                    Test
                </CommandItem>
            </CommandList>
        </CommandResposiveDialog>
    )
}