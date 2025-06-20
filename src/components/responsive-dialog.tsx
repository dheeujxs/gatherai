'use client'
import { useIsMobile } from "@/hooks/use-mobile";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerDescription,
    DrawerTitle,

} from "@/components/ui/drawer"


import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"


interface ResponsiveDialogProps{
    title: string;
    descrption:string;
    children:React.ReactNode;
    open: boolean;
    onOpenChange:(open:boolean) => void;

}

export const ResponsiveDialog=({
    title,
    children,
    descrption,
    open,
    onOpenChange
}:ResponsiveDialogProps)=>{
    const isMoblie = useIsMobile();

    if(isMoblie){
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            {title}
                        </DrawerTitle>
                        <DrawerDescription>
                            {descrption}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        {children}

                    </div>
                </DrawerContent>


            </Drawer>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {descrption}
                 </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>

        </Dialog>
    )

}