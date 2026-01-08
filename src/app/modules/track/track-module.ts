


export interface Track {
  id?:number;
  title :string;
  artist:string;
  description?:string;
  category:string;
  duration:number;
  addedAt:Date;
  file:Blob;

} 