import { 
  Column,
  CreateDateColumn,
  Entity, 
  PrimaryColumn, 
  UpdateDateColumn 
} from "typeorm";
import { v4 as uuid } from "uuid";
 
@Entity("tags")
export class Tag {
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
