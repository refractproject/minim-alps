export default function(namespace) {
  const ArrayElement = namespace.getElementClass('array');

  class Descriptor extends ArrayElement {
    constructor() {
      super(...arguments);
      this.element = 'descriptor';
    }

    addDoc(callback) {
      const DocClass = namespace.getElementClass('doc');
      const doc = new DocClass();
      this.push(doc);
      return callback(null, doc);
    }

    addDescriptor(callback) {
      const DescriptorClass = namespace.getElementClass('descriptor');
      const descriptor = new DescriptorClass();
      this.push(descriptor);
      return callback(null, descriptor);
    }
  }

  namespace.register('descriptor', Descriptor);
}
