"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetOne } from "../types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell:({row}) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar 
          variant="botttsNeutral"
          seed={row.original.name}
          className="size-6"
          
          />

          <span className="font-semibold capitalize">
            {row.original.name}
          </span>

  

        </div>


          <div className="flex items-center gap-x-2">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
              {row.original.instruction}
            </span>

     

        </div>

      </div>
    )
  },

  {
    accessorKey:"neetingCount",
    header:"Meetings",
    cell:({row}) => (
      <Badge variant='outline' className="flex items-center gap-x-2 [%>svg]:size-4">
        <VideoIcon className="text-blue-700" />
     {row.original.meetingsCount} {row.original.meetingsCount === 1 ? "meeting":"meetings"}
      </Badge>

    )

  }
 
]