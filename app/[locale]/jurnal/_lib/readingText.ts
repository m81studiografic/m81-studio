import type { PortableTextBlock } from "@portabletext/types";

/* Transformă corpul Portable Text al articolului într-un text simplu,
   citibil de un motor text-to-speech (browser sau, mai târziu, premium).
   Include: lead, paragrafe, titluri, liste, pull-quote, callout, statement.
   Exclude: imagini (figure) și blocuri de cod. */

interface Span {
  text?: string;
}
interface AnyBlock {
  _type?: string;
  style?: string;
  children?: Span[];
  text?: string;
  label?: string;
  heading?: string;
}

function inline(block: AnyBlock): string {
  return (block.children ?? []).map((c) => c.text ?? "").join("").trim();
}

export function readingText(body?: PortableTextBlock[]): string {
  if (!body) return "";
  const parts: string[] = [];

  for (const raw of body as unknown as AnyBlock[]) {
    switch (raw._type) {
      case "block": {
        const t = inline(raw);
        if (t) parts.push(t);
        break;
      }
      case "pullQuote":
        if (raw.text) parts.push(raw.text);
        break;
      case "callout":
        if (raw.label) parts.push(`${raw.label}.`);
        if (raw.text) parts.push(raw.text);
        break;
      case "statement":
        if (raw.heading) parts.push(`${raw.heading}.`);
        if (raw.text) parts.push(raw.text);
        break;
      /* figure, codeBlock — sărite intenționat */
    }
  }

  return parts.join("\n\n");
}
