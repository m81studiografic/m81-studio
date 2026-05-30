import { type SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { blockContent } from "./blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, blockContent],
};
