/*
 * Pagination helpers.
 */

import { HalLinks } from "./hal.js";

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;

export type PaginationParams = {
  page?: number | undefined;
  limit?: number | undefined;
};

export type Paginated<T> = {
  items: T[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  links?: HalLinks;
};

export function buildPaginated<T>(
  items: T[],
  count: number,
  links?: HalLinks,
): Paginated<T> {
  const { page, limit } = parsePaginationFromLinks(links);
  const resolvedPage = page ?? DEFAULT_PAGE;
  const resolvedLimit = limit ?? DEFAULT_LIMIT;
  const totalPages = Math.ceil(count / Math.max(resolvedLimit, 1));

  const nextLink = links?.["next"];
  const hasNext = typeof nextLink !== "undefined"
    ? nextLink !== null
    : resolvedPage < totalPages;

  const previousLink = links?.["previous"];
  const hasPrevious = typeof previousLink !== "undefined"
    ? previousLink !== null
    : resolvedPage > DEFAULT_PAGE;

  const base: Paginated<T> = {
    items,
    count,
    page: resolvedPage,
    limit: resolvedLimit,
    totalPages,
    hasNext,
    hasPrevious,
  };

  if (links) {
    return { ...base, links };
  }

  return base;
}

export function applyPaginationParams<T>(
  response: Paginated<T>,
  params?: PaginationParams,
): Paginated<T> {
  if (!params?.page && !params?.limit) {
    return response;
  }

  const page = params?.page ?? response.page;
  const limit = params?.limit ?? response.limit;
  const totalPages = Math.ceil(response.count / Math.max(limit, 1));
  const hasPrevious = page > DEFAULT_PAGE;
  const hasNext = page < totalPages;

  return {
    ...response,
    page,
    limit,
    totalPages,
    hasNext,
    hasPrevious,
  };
}

function parsePaginationFromLinks(links?: HalLinks): {
  page?: number;
  limit?: number;
} {
  const candidates = [
    getLinkHref(links, "self"),
    getLinkHref(links, "first"),
    getLinkHref(links, "next"),
    getLinkHref(links, "last"),
  ];

  for (const href of candidates) {
    if (!href) continue;
    const parsed = parsePageLimitFromHref(href);
    if (parsed.page || parsed.limit) {
      return parsed;
    }
  }

  return {};
}

function parsePageLimitFromHref(href: string): {
  page?: number;
  limit?: number;
} {
  const queryIndex = href.indexOf("?");
  if (queryIndex === -1) {
    return {};
  }

  const query = href.slice(queryIndex + 1).split("#")[0];
  const searchParams = new URLSearchParams(query);
  const pageRaw = searchParams.get("page");
  const limitRaw = searchParams.get("limit");

  const page = pageRaw ? Number(pageRaw) : undefined;
  const limit = limitRaw ? Number(limitRaw) : undefined;

  const out: { page?: number; limit?: number } = {};
  if (Number.isFinite(page)) {
    out.page = page as number;
  }
  if (Number.isFinite(limit)) {
    out.limit = limit as number;
  }

  return out;
}

function getLinkHref(
  links: HalLinks | undefined,
  rel: string,
): string | undefined {
  if (!links) return;
  const link = links[rel];
  if (!link || typeof link !== "object") return;
  if (!("href" in link)) return;
  return typeof link.href === "string" ? link.href : undefined;
}
