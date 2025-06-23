import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { agentsInsertSchema } from "../schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AgentGetOne } from "../types";
import { toast } from "sonner";

interface AgentFormProps{
    onSuccess?: () => void;
    onCancel?:()=> void;
    initalValues?:AgentGetOne;
}

export const AgentForm = ({
    onSuccess,
    onCancel,
    initalValues,
}: AgentFormProps) => {

const trpc = useTRPC();

const queryClient = useQueryClient()

const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
            onSuccess:() =>{
                queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                );

                if(initalValues?.id){
                    queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id:initalValues.id}),

                    )
                }
                onSuccess?.();
            },
            onError:(error) =>{
                toast.error(error.message);
            },
    })
)

const form= useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues:{
        name:initalValues?.name?? "",
        instruction:initalValues?.instruction??"",
    }
});
const isEdit = !!initalValues?.id;
const isPending= createAgent.isPending ;

const onSubmit = (values : z.infer<typeof agentsInsertSchema>) =>{
    if(isEdit){
        console.log("TODO: updateAgent");
        
    } else {
        createAgent.mutate(values);
    }
}

return (
    <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <GeneratedAvatar
            seed={form.watch("name")}
            variant="botttsNeutral"
            className="border size-16"
            />
            <FormField
            name="name"
            control={form.control}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="e.g. Math tutor" />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            <FormField
            name="instruction"
            control={form.control}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                        <Textarea {...field} placeholder="You are a helpful math assiatant that can answer question and help with assigment" />

                    </FormControl>
                    <FormMessage />

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
)
}