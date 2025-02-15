
/**
 * Generates a URL-friendly slug from a given string.
 * @param text - The input string to be converted to a slug.
 * @returns The generated slug.
 */
export const generateSlug = (str: string): string => {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/(\s+-\s+)|(-\s+)|(\s+-)|\s+/g, "-");
  }