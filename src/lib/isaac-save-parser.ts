import { Parser } from "binary-parser";
import { Buffer } from "buffer";

const entityValueParser = new Parser().int32le("entity").int32le("value");

const bestiaryCounterParser = new Parser()
  .int32le("type")
  .int32le("count")
  .array("values", {
    type: entityValueParser,
    length: function (this: any) {
      return Math.floor(this.count / 4);
    },
  });

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
  .uint32le("count")
  .array("counters", { type: bestiaryCounterParser, length: "count" });

const chunkParser = new Parser()
  .int32le("type")
  .int32le("len")
  .choice("body", {
    tag: "type",
    choices: {
      1: achievementsParser,
      2: countersParser,
      3: countersParser,
      4: collectiblesParser,
      5: collectiblesParser,
      6: collectiblesParser,
      7: challengeCountersParser,
      8: cutsceneCountersParser,
      9: gameSettingsParser,
      10: specialSeedCountersParser,
      11: bestiaryCountersParser,
    },
    defaultChoice: new Parser(),
  });

export const isaacSaveParser = new Parser()
  .endianness("little")
  .buffer("magic", { length: 16 })
  .int32le("crc")
  .array("chunks", { type: chunkParser, length: 11 });

export function parseIsaacSaveFile(buffer: Buffer) {
  const parsedData = isaacSaveParser.parse(buffer);
  return parsedData;
}
