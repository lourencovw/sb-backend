import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Person } from "./person.entity";
import { people } from "../../../contacts";

export default class InitialDatabaseSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query('ALTER TABLE `people` ADD FULLTEXT(`birthday`, `name`, `address`, `phone_number`, `age`)')
        await connection
            .createQueryBuilder()
            .insert()
            .into(Person)
            .values(people.map(this.updateAges))
            .execute()
    }

    public updateAges(person) {
        const birth = new Date(person.birthday).getTime()

        const now = new Date().getTime()

        const year = 31556952000

        const age = Math.floor((now - birth) / year).toString()

        return {...person, age}
    }
}