import { BeforeInsert, Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity('people')
export class Person {   

    @PrimaryColumn()
    _id: string;

    @Column()
    picture: string;

    @Index({ fulltext: true })
    @Column("varchar")
    birthday: string;

    @Index({ fulltext: true })
    @Column("varchar")
    name: string;

    @Index({ fulltext: true })
    @Column("varchar")
    address: string;

    @Index({ fulltext: true })
    @Column("varchar")
    phone_number: string;

    @Index({ fulltext: true })
    @Column("varchar")
    age: string;
}
