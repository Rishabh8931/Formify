
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { BsFileEarmarkPlus } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/toast";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { formSchema, FormSchemaType } from "@/schema/form";
import { CreateForm } from "@/actions/form";



const CreateFormBtn = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: FormSchemaType) {
   try {
     const formId = await CreateForm(values);
     toast.add({
      title: "Success",
      description: "Form created successfully.",
      type: "success",
     })
     console.log("Form ID: ", formId);
   } 
   catch {
     toast.add({
      title: "Error",
      description: "Something went wrong. Please try again.",
      type: "error",
     })
  }
  } 

  return (
    <Dialog>
      <DialogTrigger render={<Button className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:bg-primary hover:cursor-pointer border-dashed gap-4 " variant="outline" />}>
      <BsFileEarmarkPlus 
      className="text-muted-foreground h-8 w-8 group-hover:text-primary  "
      />
       <p className = "font-bold text-muted-foreground text-xl group-hover:text-primary"> Create new Form</p>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to collect responses.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter form name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Describe your form"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
              onClick={form.handleSubmit(onSubmit)}
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {form.formState.isSubmitting ? (
                  <ImSpinner2 className="animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormBtn;
