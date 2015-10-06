/*
 * Tests for ALPS description namespace elements
 */

import {expect} from 'chai';

import minim from 'minim';
import alpsNamespace from '../src/alps';

const namespace = minim.namespace().use(alpsNamespace);

const Alps = namespace.getElementClass('alps');
const Descriptor = namespace.getElementClass('descriptor');

describe('ALPS namespace', () => {
  context('loading structures', () => {
    let alps;

    before(() => {
      alps = namespace.fromCompactRefract([
        'alps', {}, {version: '1.0'}, [
          ['doc', {}, {type: 'text'}, 'A contact list.',
          ['descriptor', {id: 'collection'}, {type: 'safe', rt: 'contact'}, []],
        ]],
      ]);
    });

    it('should have element name alps', () => {
      expect(alps.element).to.equal('alps');
    });

    it('should have the correct version', () => {
      expect(alps.attributes.getValue('version')).to.equal('1.0');
    });
  });

  // Alps element extends Descriptor element
  // They may need to be decoupled in the future
  const alpsClasses = [
    {
      name: 'alps',
      ElementClass: Alps,
    },
    {
      name: 'descriptor',
      ElementClass: Descriptor,
    },
  ];

  alpsClasses.forEach(({name, ElementClass}) => {
    context(`${name} element`, () => {
      context('#addDoc', () => {
        let element;

        before(() => {
          element = new ElementClass();
          const doc = element.addDoc();
          doc.set('This is a doc.');
        });

        it('should have the correct number of doc elements', () => {
          const docs = element.filter(item => item.element === 'doc');
          expect(docs).to.have.length(1);
        });
      });

      context('#addDescriptor', () => {
        let element;

        before(() => {
          element = new ElementClass();
          element.addDescriptor();
        });

        it('should have the correct number of descriptor elements', () => {
          const descriptors = element.filter(item => item.element === 'descriptor');
          expect(descriptors).to.have.length(1);
        });
      });
    });
  });
});
