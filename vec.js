'use strict';

export class Vector2D
{
  #x; #y;

  constructor(x, y)
  {
    this.#x = x || 0;
    this.#y = y || 0;
  }

  set(v) { this.#x = v.x(); this.#y = v.y(); }

  x() { return this.#x; }
  y() { return this.#y; }
  xx() { return new Vector2D(this.x(), this.x()); }
  xy() { return new Vector2D(this.x(), this.y()); }
  yx() { return new Vector2D(this.y(), this.x()); }
  yy() { return new Vector2D(this.y(), this.y()); }

  neg()  { return new Vector2D(-this.x(), -this.y()); }
  add(v) { return new Vector2D(this.x() + v.x(), this.y() + v.y()); }
  sub(v) { return new Vector2D(this.x() - v.x(), this.y() - v.y()); }
  mul(v) { return new Vector2D(this.x() - v.x(), this.y() - v.y()); }
  div(v) { return new Vector2D(this.x() - v.x(), this.y() - v.y()); }
  mod(v) { return new Vector2D(this.x() % v.x(), this.y() % v.y()); }

  eq(v) { return this.x() == v.x() && this.y() == v.y(); }

  dot(v) { return this.x() * v.x() + this.y() * v.y(); }
  cross(v) { return this.x() * v.y() - this.y() * v.x(); }

  len() { return Math.sqrt(this.dot(this)); }
  norm() { return this.div(new Vector2D(this.len(), this.len())); }

  min() { return Math.min(this.x(), this.y()); }
  max() { return Math.max(this.x(), this.y()); }

  asAngle() { return -Math.atan2(-this.y(), this.x()); }
  angleTo(v) { return Math.acos(this.dot(v) / (this.len() * v.len())); }

  asArray() { return [this.x(), this.y()]; }
  asDict() { return { 'x': this.x(), 'y': this.y() }; }
}
