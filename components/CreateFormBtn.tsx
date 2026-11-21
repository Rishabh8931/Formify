"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
FormField,
FormItem,
Form  

} from "./ui/form"


const CreateFormBtn = () => {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Create new form</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>Create a new form</DialogDescription>
        </DialogHeader>

     
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormBtn;
