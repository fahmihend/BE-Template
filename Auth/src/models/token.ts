import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('token')
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: string;
    
    @Column({ name: 'username'})
    username: string;

    @Column({ name: 'access_token'})
    accessToken: string;

    @Column({ name: 'refresh_token'})
    refreshToken: string;
    
    @Column({ name: 'created_at'})
    createdDate: Date;
    
    @Column({ name: 'modified_at'})
    modifiedDate: Date;
}