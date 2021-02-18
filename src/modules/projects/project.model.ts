import { HashTag } from "src/entities/hashtags.entity";
import { Image } from "src/entities/image.entity";
import { User } from "src/entities/user.entity";

export class ProjectModel{
    constructor(
        public title : string,
        public tagline: string, 
        public description : string, 
        public image : Image[], 
        public website : string , 
        public github :string, 
        public youtube : string, 
        public users : User[], 
        public tags : HashTag[]    
    ){}
}