import { Parser } from "binary-parser";

const entityValueParser = new Parser()
  .int32le('entity')
  .int32le('value');

const bestiaryCounterParser = new Parser()
  .int32le("type")
  .int32le("count")
  .choice("body", {
    tag: "type",
    choices: {
      1: new Parser().array("values", {
        type: entityValueParser,
        length: function () {
          return (this as any).count / 4;
        }, // encounters
      }),
      2: new Parser().array("values", {
        type: entityValueParser,
        length: function () {
          return (this as any).count / 4;
        }, // kills
      }),
      3: new Parser().array("values", {
        type: entityValueParser,
        length: function () {
          return (this as any).count / 4;
        }, // hits
      }),
      4: new Parser().array("values", {
        type: entityValueParser,
        length: function () {
          return (this as any).count / 4;
        }, // deaths
      }),
    },
  });

// 3. Chunk Body Parsers
const achievementsParser = new Parser()
  .int32le("count")
  .array("achievements", { type: "uint8", length: "count" });

const countersParser = new Parser()
  .int32le("count")
  .array("counters", { type: "int32le", length: "count" });

const collectiblesParser = new Parser()
  .int32le("count")
  .array("seen_by_id", { type: "uint8", length: "count" });

const challengeCountersParser = new Parser()
  .int32le("count")
  .array("completed_by_id", { type: "uint8", length: "count" });

const cutsceneCountersParser = new Parser()
  .int32le("count")
  .array("count_by_id", { type: "int32le", length: "count" });

const gameSettingsParser = new Parser()
  .int32le("count")
  .array("unk", { type: "int32le", length: "count" });

const specialSeedCountersParser = new Parser()
  .int32le("count")
  .array("count_by_id", { type: "uint8", length: "count" });

const bestiaryCountersParser = new Parser()
  .int32le("count")
  .array("counters", { type: bestiaryCounterParser, length: "count" });

// 4. Generic Chunk Envelope Parser (with switch/choice cases)
const chunkParser = new Parser()
  .int32le("type")
  .int32le("len")
  .choice("body", {
    tag: "type",
    choices: {
      1: achievementsParser,
      2: countersParser,
      3: countersParser, // level_counters
      4: collectiblesParser, // collectibles
      5: collectiblesParser, // minibosses
      6: collectiblesParser, // bosses
      7: challengeCountersParser, // challenge_counters
      8: cutsceneCountersParser, // cutscene_counters
      9: gameSettingsParser, // game_settings
      10: specialSeedCountersParser, // special_seed_counters
      11: bestiaryCountersParser, // bestiary_counters
    },
  });

// 5. Root Save File Parser (Exported)
export const isaacSaveParser = new Parser()
  .endianness("little")
  .string("magic", { length: 16 }) // 'ISAACNGSAVE09R  ' is 16 bytes total
  .int32le("crc")
  .array("chunks", { type: chunkParser, length: 11 });

export function parseIsaacSaveFile(buffer: Buffer) {
  try {
    const parsedData = isaacSaveParser.parse(buffer);

    console.log("Successfully parsed save file!");
    console.log("CRC Checksum:", parsedData.crc);
    console.log("Total chunks loaded:", parsedData.chunks.length);
    console.log(parsedData.chunks[3].body)

    return parsedData;
  } catch (error) {
    console.error("Failed to parse save file:", error);
    throw error;
  }
}
