export default function(namespace) {
  const StringElement = namespace.getElementClass('string');

  class Doc extends StringElement {
    constructor() {
      super(...arguments);
      this.element = 'doc';
    }
  }

  namespace.register('doc', Doc);
}
