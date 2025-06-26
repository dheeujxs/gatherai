"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () =>{
    const trpc= useTRPC();
    const{data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
    return (
        <div className="overflow-x-scroll">
           TODO: Filters
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
