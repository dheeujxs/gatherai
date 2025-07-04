import { inferRouterOutputs } from "@trpc/server";


import type {AppRouter} from '@/trpc/routers/_app'


export type MeetingGetMany = inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"];
export type MeetingGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];
export enum MeetingStatus {
    Upcoming='upcoming',
    Active="active",
    Completed='completed',
    Processing="processing",
    Canceled="canceled",
}

export type StreamTransciptItem={
    speaker_id:string,
    type:string;
    text:string;
    start_ts:number;
    stop_ts:number;
}