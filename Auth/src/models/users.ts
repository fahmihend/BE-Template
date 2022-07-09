import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @PrimaryColumn({ name: 'id' })
    id: string;

    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'role'})
    role: string;
}