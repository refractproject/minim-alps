# Minim ALPS

[![Build Status](https://travis-ci.org/refractproject/minim-alps.svg?branch=master)](https://travis-ci.org/refractproject/minim-alps)

This library provides an interface to the Refract ALPS. It extends upon the base types as defined in [Minim](https://github.com/refractproject/minim).

## Install

```sh
npm install minim-alps
```

## Usage Example

```js
import minim from 'minim';
import alpsNamespace from 'minim-alps';

const namespace = minim
  .namespace()
  .use(alpsNamespace);

// Convert from Compact Refract
// Converted from http://tools.ietf.org/html/draft-amundsen-richardson-foster-alps-01
let compactRefract = [
  'alps', {}, {version: '1.0'}, [
    ['doc', {}, {format: 'text'}, 'A contact list.'],
    ['descriptor', {id:'collection'}, {type: 'safe', rt: 'contact'}, [
      ['doc', {}, {}, 'A simple link/form for getting a list of contacts.'],
      ['descriptor', {id: 'nameSearch'}, {type: 'semantic'}, [
        ['doc', {}, {}, 'Input for a search form.']
      ]]
    ]],
    ['descriptor', {id:'contact'}, {type: 'semantic'}, [
      ['descriptor', {id: 'item'}, {type: 'safe'}, [
        ['doc', {}, {}, 'A link to an individual contact.'],
        ['descriptor', {id:'fullName'}, {type: 'semantic'}, []],
        ['descriptor', {id:'email'}, {type: 'semantic'}, []],
        ['descriptor', {id:'phone'}, {type: 'semantic'}, []]
      ]]
    ]]
  ]
];

let alpsDoc = namespace.fromCompactRefract(compactRefract);

// Initialize elements directly
const Alps = namespace.getElementClass('alps');
const alps = new Alps();

// Set version
alps.attributes.set('version', '1.0');

const doc = alps.addDoc();
doc.attributes.set('type', 'text');
doc.set('A contact list.');

const collection = alps.addDescriptor();
collection.id = 'collection';
collection.attributes.set({type: 'safe', rt: 'contact'});

const collectionDoc = collection.addDoc();
doc.set('A simple link/form for getting a list of contacts.');

const nameSearch = collection.addDescriptor();
nameSearch.attributes.set('type', 'semantic');
```

## Element Reference

### Alps (Descriptor)
Indicates the root of the ALPS document.

### Descriptor ([ArrayElement](https://github.com/refractproject/minim#arrayelement))
A `descriptor` element defines the semantics of specific data elements or state transitions that MAY exist in an associated representation.

### Doc ([StringElement](https://github.com/refractproject/minim#stringelement))
A text field that contains free-form, usually human-readable, text.
