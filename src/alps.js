import jade from 'jade';
import path from 'path';
import cheerio from 'cheerio';
import _ from 'lodash';

import minim from 'minim';

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

// TODO: Make into its own library so minim-alps does not need to have minim as dependency
const alpsNamespace = minim
  .namespace()
  .use({namespace});

export function alpsFromXml(xml) {
  const $ = cheerio.load(xml, {xmlMode: true});

  function parseElement(tagName, attributes, item) {
    const ElementClass = alpsNamespace.getElementClass(tagName);
    const element = new ElementClass();

    // Store the id attribute as meta since it's available for Refract
    if (!_.isEmpty(attributes)) {
      if (attributes.id) {
        element.meta.set('id', attributes.id);
      }
      element.attributes.set(_.omit(attributes, 'id'));
    }

    // Children are only parsed for arrays
    const children = item.children();
    if (children.length > 0 && element.primitive() === 'array') {
      for (let i = 0; i <= children.length; i++) {
        const child = $(children[i]);
        if (child[0]) {
          const childElement = parseElement(child[0].name, child.attr(), child);
          element.push(childElement);
        }
      }
    }

    // If it's not an array but a string, we'll store the content
    if (element.primitive() === 'string') {
      element.set(_.trim(item.html()));
    }

    return element;
  }

  const root = $(':root');
  const alpsRefract = parseElement(root[0].tagName, root.attr(), root);

  return alpsRefract;
}

export default {namespace, alpsToHtml, alpsFromXml};
