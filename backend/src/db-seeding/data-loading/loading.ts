import { Result } from "@badrap/result";
import { readFile, readFileSync } from "fs";
import YAML from "yaml";

import type YamlParsedDTO from "../types/yaml-types";


export const loadYamlData = async (filePath: string): Promise<Result<string>> => {
    try {
        readFile(filePath, "utf-8", (err, yamlData) => {
            if (err) {
                return Result.err();
            }

            return Result.ok(yamlData);
        });
    
    } catch (e) {
        console.log(`Data loading from ${filePath} failed with ${e}`);
    }

    return Result.err();
}


export const parseYamlData = (yamlData: string): Result<YamlParsedDTO> => {
    try {
        const parsedYamlData = YAML.parse(yamlData);
        const typedYamlData = parsedYamlData as YamlParsedDTO;

        return Result.ok(typedYamlData);

    } catch (e) {
        console.log(`Parsing failed with ${e}`);
    }

    return Result.err();
}
