"use client";

/* Config Sanity Studio — montat la /studio pe site */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  title: "M81 Jurnal",
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
