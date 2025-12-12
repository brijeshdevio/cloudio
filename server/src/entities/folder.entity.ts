import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('folders')
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.folders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Folder, (folder) => folder.children, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent?: Folder;

  @OneToMany(() => Folder, (folder) => folder.parent)
  children: Folder[];

  @Column({ name: 'is_trashed', type: 'boolean', default: false })
  isTrashed: boolean;

  @Column({ name: 'trashed_at', type: 'timestamp', nullable: true })
  trashed_at: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
