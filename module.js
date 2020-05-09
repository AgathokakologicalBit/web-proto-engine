'use strict';


export class Module
{
  identifier() { throw new Error('Identifier is not provided'); }

  load() { }
  init(settings) { }

  update() { }
  render() { }
}
