'use strict';

import {Module} from '../module.js';
import {Vector2D} from '../vec.js';


export class RendererModule extends Module
{
  #canvas;
  #settings;
  #rootWidget;

  identifier() { return 'engine.ui'; }

  setProperty(name, value) { this.#settings[name] = value; }
  property(name) { return this.#settings[name];}

  getRootWidget() { return this.#rootWidget; }
  setRootWidget(widget)
  {
    this.#rootWidget = widget;

    if (this.#rootWidget instanceof Widget)
      this.#rootWidget.requestRedraw();
  }

  load() { }

  init(settings)
  {
    this.#settings = Object.assign({
      'canvas': null,
      'size': new Vector2D(0, 0),

      'background_color': 'white',
    }, settings);

    this.#canvas = createCanvas(this.#settings.size.x(), this.#settings.size.y());
    this.#canvas.parent(this.#settings.canvas);
  }

  update()
  {
    if (!(this.#rootWidget instanceof Widget))
      return;

    this.#rootWidget.update();
  }

  render()
  {
    if (!(this.#rootWidget instanceof Widget))
      return;

    if (!this.#rootWidget.isRedrawRequested()) return;

    console.log('[Renderer] root widget requested redrawing');

    noSmooth();
    setAttributes('antialias', true);
    noStroke();
    fill(this.#settings.background_color);
    rect(0, 0, this.#settings.size.x(), this.#settings.size.y());

    this.#rootWidget.render();
  }
}


export class Widget
{
  parent;
  #settings;
  #children;
  #isRedrawRequested;

  static defaultSettings = {
    'id': null,
  };
  static defaultChildrenSettigns = { };

  constructor(settings)
  {
    this.parent = null;
    this.#settings = Object.assign({ }, Widget.defaultSettings, settings);
    this.#children = [];
  }

  isRedrawRequested() { return this.#isRedrawRequested; }
  requestRedraw() { this.#isRedrawRequested = true; }

  setProperty(name, value)
  {
    let shouldUpdateProperty = (this.#settings[name] === value);
    if (value instanceof Vector2D)
      shouldUpdateProperty = value.eq(this.#settings[name]);

    this.#settings[name] = value;

    if (!shouldUpdateProperty)
      this.requestRedraw();
  }

  setProperties(props)
  {
    for (let name in props)
      if (props.hasOwnProperty(name))
        this.setProperty(name, props[name]);
  }

  property(name)
  {
    return this.#settings[name] || (
      this.parent
        ? this.parent.__proto__.constructor.defaultChildrenSettigns[name]
        : undefined
    );
  }

  children() { return this.#children; }
  addChild(object)
  {
    object.parent = this;
    this.#children.push(object);
  }

  findById(id)
  {
    if (this.property('id') === id)
      return this;

    for (let child of this.children())
    {
      let res = child.findById(id);
      if (null !== res)
        return res;
    }

    return null;
  }

  update()
  {
    for (let child of this.#children)
    {
      child.update();
      this.#isRedrawRequested = this.#isRedrawRequested || child.isRedrawRequested();
    }
  }

  render()
  {
    this.#isRedrawRequested = false;
  }
}

export class Frame extends Widget
{
  static defaultSettings = {};
  static defaultChildrenSettigns = {
    'position': new Vector2D(0, 0),
    'size': new Vector2D(0, 0),
  };

  constructor(settings) { super(Object.assign({ }, Frame.defaultSettings, settings)); }

  update()
  {
    super.update();
  }

  render()
  {
    // console.log('[Renderer:Frame] draw() executed on the following object:\n', this);
    strokeWeight(1);

    if (undefined === this.property('border_color')) noStroke();
    else stroke(this.property('border_color'));

    if (undefined === this.property('background_color')) noFill();
    else fill(this.property('background_color'));

    rect(0, 0, this.property('size').x(), this.property('size').y());

    for (let child of this.children())
    {
      push();
      translate(...(child.property('position') || Vector2D()).asArray());
      child.render();
      pop();
    }

    super.render();
  }
}

export class Shape extends Widget
{
  static defaultSettings = {};

  constructor(settings) { super(Object.assign({}, Shape.defaultSettings, settings)); }

}
