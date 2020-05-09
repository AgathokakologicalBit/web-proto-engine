'use strict';


export class Engine
{
  #modules;
  static #instance;

  constructor()
  {
    this.#modules = [];
  }

  static instance()
  {
    if (undefined === Engine.#instance)
      Engine.#instance = new Engine();

    return Engine.#instance;
  }

  loadModule(module)
  {
    console.log('[Engine] loading module: ' + module.identifier());
    this.#modules.push(module);
    module.load();

    return module;
  }

  findModule(id)
  {
    for (let module of this.#modules)
      if (module.identifier() == id)
        return module;

    return null;
  }

  update()
  {
    for (let module of this.#modules)
      module.update();
  }

  render()
  {
    for (let module of this.#modules)
      module.render();
  }
}
