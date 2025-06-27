"use client"

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state copy";

export const MeetingsView = () =>{
    const trpc= useTRPC();
    const{data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
         <DataTable data={data.items} columns={columns} />
             {data.items.length ===0  &&(
                         <EmptyState
                         title="Create your first meeting"
                         description="Schedule a meeting to connect with others. Eacg meeting ltes you collaborate, share ideas, and interact with participants in real time"
                         />
                     )}
                
        </div>
    )
}

   

export const MeetingsViewsLoading = () => {
    return (
        <LoadingState
        title="Loading Agents"
        description="This may take a few seconds"
        
        />
    )
}

export const MeetingsViewError = () => {
    return (
            <ErrorState
            title="Error Loading Agents"
            description="Something went wrong"
            
            />
    )
}
