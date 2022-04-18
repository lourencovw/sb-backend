import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('people')
export class Person {   

    @PrimaryColumn()
    _id: string;

    @Column("varchar")
    picture: string;

    @Column("varchar")
    birthday: string;

    @Column("varchar")
    name: string;

    @Column("varchar")
    address: string;

    @Column("varchar")
    phone_number: string;

    @Column("varchar")
    age: string;
}
