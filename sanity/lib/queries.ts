import { groq } from "next-sanity";

/* Câmpurile comune folosite la listare (carduri) */
const cardFields = `
  _id,
  category,
  "slug": slug.current,
  publishedAt,
  readTime,
  featured,
  coverImage,
  topics,
  titleRo, titleEn,
  subtitleRo, subtitleEn,
  excerptRo, excerptEn
`;

/* Toate articolele, cele mai noi primele */
export const allArticlesQuery = groq`
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc) {
    ${cardFields}
  }
`;

/* Articolul principal (featured); dacă nu există, cel mai nou */
export const featuredArticleQuery = groq`
  *[_type == "article" && defined(slug.current)]
    | order(featured desc, publishedAt desc)[0] {
    ${cardFields}
  }
`;

/* Articolele recente, excluzând unul (ex: featured) */
export const recentArticlesQuery = groq`
  *[_type == "article" && defined(slug.current) && _id != $excludeId]
    | order(publishedAt desc)[0...$limit] {
    ${cardFields}
  }
`;

/* Articole pe categorie */
export const articlesByCategoryQuery = groq`
  *[_type == "article" && category == $category && defined(slug.current)]
    | order(publishedAt desc) {
    ${cardFields}
  }
`;

/* Un singur articol, complet (cu corpul) */
export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    ${cardFields},
    reportUrl,
    caseClient,
    caseTimeline,
    caseServices,
    metrics,
    testimonialAuthor,
    testimonialRo,
    testimonialEn,
    takeawaysRo,
    takeawaysEn,
    bodyRo[]{
      ...,
      _type == "image" => { ..., asset-> }
    },
    bodyEn[]{
      ...,
      _type == "image" => { ..., asset-> }
    }
  }
`;

/* Toate slug-urile (pentru generateStaticParams) */
export const allSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)].slug.current
`;
