'use strict';


import {Vector2D} from './vec.js';
import {Engine} from './engine.js';
import {Module} from './module.js';
import * as ui from './modules/ui.js';


export class UserApplicationModule extends Module
{
  #mainFrame;

  identifier() { return 'app.main'; }

  load() {}

  init(settings)
  {
    Engine.instance().findModule('engine.ui').setRootWidget(
      this.#mainFrame = new ui.Frame({
        'size': new Vector2D(400, 300),
        'background_color': '#444',
        'border_color': 'wheat',
      })
    );
    this.#mainFrame.addChild(new ui.Frame({
      'id': 'box',

      'size': new Vector2D(128, 128),
      'position': new Vector2D(64, 64),

      'background_color': 'steelblue',
      'border_color': 'lime',
    }))
  }

  update()
  {
    let box = this.#mainFrame.findById('box');
    box.setProperty('position', new Vector2D(mouseX, mouseY));
    // this.#mainFrame.setProperty('size', size.add(new Vector2D(0.25, 0.125)));
  }
}
