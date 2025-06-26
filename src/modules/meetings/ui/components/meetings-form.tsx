import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { meetingsInsertSchema } from "../../schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeetingGetOne } from "../../types";
import { toast } from "sonner";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { useState } from "react";
import { NewAgentDialog } from "@/modules/agents/components/new-agent-dialog";


interface MeetingFormProps{
    onSuccess?: (id?:string) => void;
    onCancel?:()=> void;
    initalValues?:MeetingGetOne;
}

export const MeetingForm = ({
    onSuccess,
    onCancel,
    initalValues,
}: MeetingFormProps) => {

const trpc = useTRPC();

const queryClient = useQueryClient()
const[openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
const [agentSearch,setAgentSearch] = useState("");

const agents=  useQuery(
    trpc.agents.getMany.queryOptions({
        pageSize:100,
        search: agentSearch,
    })
);

const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
            onSuccess:(data) =>{
                queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );

              
                onSuccess?.(data.id);
            },
            onError:(error) =>{
                toast.error(error.message);
            },
    })
)


const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
            onSuccess:() =>{
                queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );

                if(initalValues?.id){
                    queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({id:initalValues.id}),

                    )
                }
                onSuccess?.();
            },
            onError:(error) =>{
                toast.error(error.message);
            },
    })
)

const form= useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues:{
        name:initalValues?.name?? "",
        agentId:initalValues?.agentId??"",
    }
});
const isEdit = !!initalValues?.id;
const isPending= createMeeting.isPending || updateMeeting.isPending ;

const onSubmit = (values : z.infer<typeof meetingsInsertSchema>) =>{
    if(isEdit){
     updateMeeting.mutate({...values,id:initalValues.id})
        
    } else {
        createMeeting.mutate(values);
    }
}

return (
    <>
    <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog}/>
    <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
           
            <FormField
            name="name"
            control={form.control}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="e.g. Math Consultations" />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
           
            <FormField
            name="agentId"
            control={form.control}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Agent</FormLabel>
                    <FormControl>
                       <CommandSelect 
                       options={(agents.data?.items ?? []).map((agent)=> ({
                        id:agent.id,
                        value:agent.id,
                        children:(
                           <div className="flex items-center gap-x-2">
                                <GeneratedAvatar  
                                seed={agent.name}
                                variant="botttsNeutral"
                                className="border size-6"
                                />  
                                <span>{agent.name}</span>
                           </div>
                        )
                       }))}
                       onSelect={field.onChange}
                       onSearch={setAgentSearch}
                       value={field.value}
                       placeholder="Select an agent"
                       />
                    </FormControl>
                    <FormDescription>
                        Not Found what your&apos; re looking for?{" "}
                        <button
                        className="text-primary hover:underline"
                        type="button"
                        onClick={() => setOpenNewAgentDialog(true)} 
                        >
                            Create new agent
                        </button>
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
            />
           
            <div className="flex justify-between gap-x-2" >
                {onCancel && (
                    <Button variant='ghost' disabled={isPending} type="button" onClick={()=>onCancel()}>
                        Cancel
                    </Button>
                )
                }
                <Button disabled={isPending} type="submit" >
                    {isEdit ? "Update":"Create"}

                </Button>

            </div>
        </form>
    </Form>
    </>
)
}