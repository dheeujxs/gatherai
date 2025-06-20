import { AgentsViewError, AgentsViews, AgentsViewsLoading } from "@/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {ErrorBoundary} from 'react-error-boundary'
import { Suspense } from "react";
import { AgentsListHeader } from "@/modules/agents/components/list-header";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";



const Page = async() => {
     const session =  await auth.api.getSession({
        headers:await headers(),
      })
    
      if(!session){
        redirect('/sign-in')
      }

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
    return(
        <>
        <AgentsListHeader />
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsViewsLoading />}>
            <ErrorBoundary fallback={<AgentsViewError />}>

     <AgentsViews />
     </ErrorBoundary>
     </Suspense>
     </HydrationBoundary>
     </>
    )
}
 
export default Page;