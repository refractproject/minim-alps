/*
 * ALPS-specific refract elements.
 * General structure:
 * + Alps
 *   + Descriptor
 *     + Descriptor
 *     + Doc
 *   + Doc
 */

export function namespace(options) {
  for (const name of ['descriptor', 'alps', 'doc']) {
    require(`./elements/${name}`)(options.base);
  }
}

export default {namespace};
