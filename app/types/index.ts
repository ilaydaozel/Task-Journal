
interface IProgram {
  id?: string;
  ranking: number | null;
  name: string;
  universityName: string | null;
  programLink: string | null; 
  courseContent: string | null;
  requirements: string | null;
  language: string | null;
  applicationDeadline: string | null;
  additionalNotes: string | null;
  applicationStatus: string | null;
}

interface INavLink {
  title: string;
  path: string;
}