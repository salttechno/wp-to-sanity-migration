import {
  convertHtmlToBlocks,
  convertExcerptToBlocks,
} from "./html-to-blocks.js";

/**
 * Transform WordPress post to Sanity document
 */
export function transformPost(wpPost, imageAssetMap = new Map()) {
  // Get the featured image asset ID from the map
  const featuredMediaId = wpPost._embedded?.["wp:featuredmedia"]?.[0]?.id;
  const assetId = featuredMediaId ? imageAssetMap.get(featuredMediaId) : null;

  // Convert HTML to Portable Text blocks
  const bodyBlocks = convertHtmlToBlocks(wpPost.content?.rendered || "");
  const excerptBlocks = convertExcerptToBlocks(wpPost.excerpt?.rendered || "");

  return {
    _type: "post",
    _id: `wp-post-${wpPost.id}`,
    title: wpPost.title.rendered,
    slug: {
      _type: "slug",
      current: wpPost.slug,
    },
    publishedAt: wpPost.date,
    excerpt: excerptBlocks,
    body: bodyBlocks,
    // Note: Author references removed as authors are not being migrated
    categories:
      wpPost.categories?.map((catId) => ({
        _type: "reference",
        _ref: `wp-category-${catId}`,
        _key: `cat-${catId}`,
      })) || [],
    tags:
      wpPost.tags?.map((tagId) => ({
        _type: "reference",
        _ref: `wp-tag-${tagId}`,
        _key: `tag-${tagId}`,
      })) || [],
    featuredImage: assetId
      ? {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: assetId,
          },
        }
      : undefined,
  };
}

/**
 * Transform WordPress category to Sanity document
 */
export function transformCategory(wpCategory) {
  return {
    _type: "category",
    _id: `wp-category-${wpCategory.id}`,
    title: wpCategory.name,
    slug: {
      _type: "slug",
      current: wpCategory.slug,
    },
    description: wpCategory.description || "",
  };
}

/**
 * Transform WordPress tag to Sanity document
 */
export function transformTag(wpTag) {
  return {
    _type: "tag",
    _id: `wp-tag-${wpTag.id}`,
    title: wpTag.name,
    slug: {
      _type: "slug",
      current: wpTag.slug,
    },
    description: wpTag.description || "",
  };
}

export function transformCaseStudyCategory(wpCategory) {
  return {
    _type: "caseStudyCategory",
    _id: `wp-case-study-category-${wpCategory.id}`,
    title: wpCategory.name,
    slug: {
      _type: "slug",
      current: wpCategory.slug,
    },
  };
}

export function transformCaseStudy(wpPost, imageAssetMap = new Map()) {
  // Get the featured image asset ID from the map
  const featuredMediaId = wpPost._embedded?.["wp:featuredmedia"]?.[0]?.id;
  const assetId = featuredMediaId ? imageAssetMap.get(featuredMediaId) : null;

  // Convert HTML to Portable Text blocks
  const bodyBlocks = convertHtmlToBlocks(wpPost.content?.rendered || "");

  return {
    _type: "caseStudy",
    _id: `wp-case-study-${wpPost.id}`,
    title: wpPost.title.rendered,
    slug: {
      _type: "slug",
      current: wpPost.slug,
    },
    publishedAt: wpPost.date,
    body: bodyBlocks,
    categories:
      wpPost.case_studies_category?.map((catId) => ({
        _type: "reference",
        _ref: `wp-case-study-category-${catId}`,
        _key: `cat-${catId}`,
      })) || [],
    featuredImage: assetId
      ? {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: assetId,
          },
        }
      : undefined,
  };
}
