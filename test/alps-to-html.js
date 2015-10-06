/*
 * Tests for converting ALPS to HTML
 */

import {expect} from 'chai';

import minim from 'minim';
import alpsNamespace from '../src/alps';
import {alpsToHtml} from '../src/alps';

const namespace = minim
  .namespace()
  .use(alpsNamespace);

describe('ALPS namespace', () => {
  describe('ALPS element', () => {
    let alps;

    before(() => {
      alps = namespace.fromCompactRefract([
        'alps', {}, {version: '1.0'}, [
          ['doc', {}, {format: 'text'}, 'A contact list.'],
          ['descriptor', {id: 'collection'}, {type: 'safe', rt: 'contact'}, [
            ['doc', {}, {}, 'A simple link/form for getting a list of contacts.'],
            ['descriptor', {id: 'nameSearch'}, {type: 'semantic'}, [
              ['doc', {}, {}, 'Input for a search form.'],
            ]],
          ]],
          ['descriptor', {id: 'contact'}, {type: 'semantic'}, [
            ['descriptor', {id: 'item'}, {type: 'safe'}, [
              ['doc', {}, {}, 'A link to an individual contact.'],
              ['descriptor', {id: 'fullName'}, {type: 'semantic'}, []],
              ['descriptor', {id: 'email'}, {type: 'semantic'}, []],
              ['descriptor', {id: 'phone'}, {type: 'semantic'}, []],
            ]],
          ]],
        ],
      ]);
    });

    // Simple checks to ensure the content is being rendered
    it('should render correctly', () => {
      const alpsHtml = alpsToHtml(alps);
      expect(alpsHtml).to.include('A contact list.');
      expect(alpsHtml).to.include('id="collection"');
      expect(alpsHtml).to.include('A simple link/form for getting a list of contacts.');
      expect(alpsHtml).to.include('<dt class="attribute-key">type</dt><dd class="attribute-value">safe</dd>');
    });
  });
});