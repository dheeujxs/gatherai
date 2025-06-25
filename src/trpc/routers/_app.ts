

import {agenstRouter} from '@/modules/agents/server/procedure'
import {  createTRPCRouter } from '../init';
import { meetingsRouter } from '@/modules/meetings/server/procedures';
export const appRouter = createTRPCRouter({
 agents: agenstRouter,
 meetings: meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;