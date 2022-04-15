import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Person {
    @PrimaryColumn()
    _id: string;

    @Column()
    picture: string;

    @Column()
    birthday: Date;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone_number: string;
}
