import { Button } from "@/components/ui/button";

interface Props{
    page:number;
    totalPages: number;
    onPageChange:(page:number) =>void;
}

export const DataPagintation = ({
    page,
    totalPages,
    onPageChange,
}:Props ) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex-1 text-sm text-muted-foreground">
                Page {page} of{totalPages || 1}
            </div>
            <div className="flex items-center justify-end space-x-2 px-4">
                <Button
                disabled={page===1}
                variant={'outline'}
                size={'sm'}
                onClick={() =>onPageChange(Math.max(1,page-1))}
                >
                    Previous
                </Button>
                <Button 
                variant={'outline'}
                size={'sm'}
                disabled={page === totalPages || totalPages ===0}
                onClick={() =>onPageChange(Math.min(totalPages,page +1))}>
                    Next
                </Button>
            </div>

        </div>
    )
}

