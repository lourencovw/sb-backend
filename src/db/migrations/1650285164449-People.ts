import { people } from "../../../contacts";
import { Person } from "../../people/entities/person.entity";
import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class People1650285164449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "people",
                columns: [
                    {
                        name: "_id",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "picture",
                        type: "varchar",
                    },
                    {
                        name: "birthday",
                        type: "varchar",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "address",
                        type: "varchar",
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                    },
                    {
                        name: "age",
                        type: "varchar",
                    },
                ],
            }),
            true,
        )

        await queryRunner.query('ALTER TABLE `people` ADD FULLTEXT(`birthday`, `name`, `address`, `phone_number`, `age`)')
        await queryRunner.connection
            .createQueryBuilder()
            .insert()
            .into(Person)
            .values(people.map(updateAges))
            .orIgnore(true)
            .execute()

        function updateAges(person) {
            const birth = new Date(person.birthday).getTime()

            const now = new Date().getTime()

            const year = 31556952000

            const age = Math.floor((now - birth) / year).toString()

            return { ...person, age }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("people")
    }

}
