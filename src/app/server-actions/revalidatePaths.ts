"use server";
import { PagesEnum } from "@/enum/Pages";
import { revalidatePath } from "next/cache";

export async function revalidateDashboard() {
  revalidatePath(PagesEnum.DASHBOARD);
}
