import { loadYamlData, parseYamlData } from "./data-loading/loading"
import { seedUsers } from "./data-processing/seed-data";
import { UserDTO } from "./types/yaml-types";

const yamlSeedDataPath = "../../seed-data.yml"


const seed = async () => {
    const yamlData = await loadYamlData(yamlSeedDataPath);

    if (yamlData.isErr) {
        console.log(`Failed to obtain data from ${yamlSeedDataPath}`);
        return;
    }

    const parsedYamlData = parseYamlData(yamlData.value);

    if (parsedYamlData.isErr) {
        console.log(`Could not parse obtained user data: ${parsedYamlData.error}`);
        return;
    }

    const users: UserDTO[] = parsedYamlData.value.users;

    const seededUsers = await seedUsers(users);

    if (seededUsers.isErr) {
        console.log(`User seeding failed: ${seededUsers.error.message}`);
        return;
    }

    console.log(`Seeding of users has been completed.`);
}


seed().catch((e) => { 
    throw e;
});
