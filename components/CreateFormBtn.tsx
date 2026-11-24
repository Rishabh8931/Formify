"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

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

import { CreateForm } from "@/actions/form";
import { formSchema, FormSchemaType } from "@/schema/form";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateFormBtn = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
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
      });
      setOpen(false);
      router.push(`/builder/${formId}`);
      form.reset();
      console.log("Form ID: ", formId);
    } catch {
      toast.add({
        title: "Error",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            className="group h-[190px] flex cursor-pointer flex-col items-center justify-center gap-4 border border-dashed border-primary/20 hover:border-primary/40 hover:bg-muted/60"
            variant="outline"
          />
        }
      >
        <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
        <p className="text-xl font-bold text-muted-foreground transition-colors group-hover:text-foreground">
          Create new Form
        </p>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to collect responses.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
