export default function(namespace) {
  const Descriptor = namespace.getElementClass('descriptor');

  class Alps extends Descriptor {
    constructor() {
      super(...arguments);
      this.element = 'alps';
    }
  }

  namespace.register('alps', Alps);
}
