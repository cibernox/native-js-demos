import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';

export default class CounterComponent extends Component {
  @tracked count = 0;

  @action
  increment() {
    this.count += 1;
  }

  @action
  decrement() {
    this.count -= 1;
  }

  <template>
    <text>before vstack</text>
    <vstack>
      <text>Ember.js Counter Demo</text>
      <hstack>
        {{!-- <button {{on "click" this.decrement}}>Decrement</button> --}}
        <text>{{this.count}}</text>
        {{!-- <button {{on "click" this.increment}}>Increment</button> --}}
      </hstack>
      <text>Ember.js Counter Demo after</text>
    </vstack>
  </template>
}
