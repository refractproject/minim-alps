/*
 * Tests for converting ALPS to HTML
 */

import {expect} from 'chai';

import {alpsFromXml} from '../src/alps';

describe('ALPS from XML', () => {
  const xmlValue = `<alps version="1.0">
    <doc format="text">A contact list.</doc>

    <descriptor id="collection" type="safe" rt="contact">
      <doc>
        A simple link/form for getting a list of contacts.
      </doc>
      <descriptor id="nameSearch" type="semantic">
        <doc>Input for a search form.</doc>
      </descriptor>
    </descriptor>

    <descriptor id="contact" type="semantic">
      <descriptor id="item" type="safe">
        <doc>A link to an individual contact.</doc>
      </descriptor>
      <descriptor id="fullName" type="semantic" />
      <descriptor id="email" type="semantic" />
      <descriptor id="phone" type="semantic" />
    </descriptor>
  </alps>`;

  const compactRefractValue = [
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
        ]],
        ['descriptor', {id: 'fullName'}, {type: 'semantic'}, []],
        ['descriptor', {id: 'email'}, {type: 'semantic'}, []],
        ['descriptor', {id: 'phone'}, {type: 'semantic'}, []],
      ]],
    ],
  ];

  it('should return the correct results', () => {
    expect(alpsFromXml(xmlValue).toCompactRefract()).to.deep.equal(compactRefractValue);
  });
});
