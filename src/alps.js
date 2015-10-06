import jade from 'jade';
import path from 'path';

/*
 * ALPS-specific refract elements.
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

/*
 * Convert an ALPS structure into HTML
 */
export function alpsToHtml(alpsElement) {
  const alpsFile = path.join(__dirname, '..', 'templates', 'alps.jade');
  return jade.renderFile(alpsFile, {
    alps: alpsElement,
  });
}

export default {namespace, alpsToHtml};
