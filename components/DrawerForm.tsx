"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

type DrawerFormProps = {
  children?: ReactNode;
  trigger: ReactNode | ReactNode[] | string;
  title: ReactNode | ReactNode[] | string;
  description: ReactNode | ReactNode[] | string;
  onSubmit?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const DrawerForm: FC<DrawerFormProps> = (props) => {
  // FIXME: Fix the isopen issue
  const [internalIsOpen, setInternalIsOpen] = useState(props.isOpen || false);

  useEffect(() => {
    if (props.isOpen !== undefined) {
      setInternalIsOpen(props.isOpen);
    }
  }, [props.isOpen]);

  const handleOpenChange = (open: boolean) => {
    setInternalIsOpen(open);
    if (props.onOpenChange) {
      props.onOpenChange(open);
    }
  };

  return (
    <Drawer open={internalIsOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger className="fixed bottom-10 left-1/2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 px-5 py-4 rounded-md">
        {props.trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{props.title}</DrawerTitle>
          <DrawerDescription>{props.description}</DrawerDescription>
        </DrawerHeader>
        {props.children}
        <DrawerFooter className="flex flex-row gap-5">
          {props.onSubmit && (
            <Button className="w-full" onClick={props.onSubmit}>
              Submit
            </Button>
          )}
          <DrawerClose className="w-full py-3 bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80">
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerForm;
