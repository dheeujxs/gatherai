import { AgentsViewError, AgentsViews, AgentsViewsLoading } from "@/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {ErrorBoundary} from 'react-error-boundary'
import { Suspense } from "react";
import { AgentsListHeader } from "@/modules/agents/components/list-header";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";


interface Props {
  searchParams: Promise<SearchParams>;

}



const Page = async({searchParams}:Props) => {
  const filters = await loadSearchParams(searchParams)
     const session =  await auth.api.getSession({
        headers:await headers(),
      })
    
      if(!session){
        redirect('/sign-in')
      }

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
      ...filters
    }));
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