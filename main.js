'use strict';

import {Vector2D} from './vec.js';
import {Engine} from './engine.js';

import {RendererModule} from './modules/ui.js';
import {UserApplicationModule} from './user_application.js';


function preload()
{

}


function setup()
{
  //  -----=====       MODULE LOADING      =====----
  let renderer = Engine.instance().loadModule(new RendererModule);
  let user_app = Engine.instance().loadModule(new UserApplicationModule);


  //  -----=====   MODULE INITIALIZATION   =====----
  renderer.init({
    'canvas': 'canvas-holder',
    'size': new Vector2D(640, 480),

    'background_color': '#333',
  });
  user_app.init({});
}


function draw()
{
  Engine.instance().update();
  Engine.instance().render();
}


window.preload = preload;
window.setup = setup;
window.draw = draw;
