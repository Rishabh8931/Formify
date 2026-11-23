"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { FormSchemaType, formSchema } from "@/schema/form";


class UserNotFoundError extends Error {}

export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError("User not found");
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;
  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateForm(data: FormSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Invalid form data");
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError("User not found");
  }

  const { name, description } = validation.data;

  const form = await prisma.form.create({
    data: {
      name,
      description,
      userId: user.id,
    },
  }); 

  if (!form) {
    throw new Error("Form creation failed");
  }

  return form.id;
}

export async function GetForms(){
    const user = await currentUser();
    if(!user){
      throw new UserNotFoundError("User not found");
    }

    return await prisma.form.findMany({
      where: {
        userId: user.id,
      },
      orderBy:{
        createdAt: "desc"
      }
    })
}
