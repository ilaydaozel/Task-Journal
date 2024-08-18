import prisma from "@/app/lib/prismadb";

export default async function getAllTags(): Promise<ITag[]> {
  try {
      const tags = await prisma.tag.findMany({
          include: {
              tasks: true,
          },
      });
      return tags as unknown as ITag[];
  } catch (error: any) {
      throw new Error(error.message || error);
  }
}