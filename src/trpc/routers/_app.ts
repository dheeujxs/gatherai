

import {agenstRouter} from '@/modules/agents/server/procedure'
import {  createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
 agents: agenstRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;