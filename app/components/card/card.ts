import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { AddChildFromBuilder, View, Color } from "tns-core-modules/ui/page/page";
import { GestureTypes,  TouchGestureEventData, GestureEventData } from "tns-core-modules/ui/gestures/gestures";

const TRANSPARENT:Color = new Color('transparent');
const STEP1:Color = new Color(25, 0, 0, 0);
const STEP2:Color = new Color(75, 0, 0, 0);

export class Card extends StackLayout implements AddChildFromBuilder {

  protected _innerStack: StackLayout;

  constructor(public readonly isAnimated:boolean = false) {
    super();
    this.className = 'card-outer-container';
    this.backgroundColor = TRANSPARENT;
    this.borderRadius = 5;
    this.marginBottom = {value: 3, unit: 'dip'};
    
    const innerStack = new StackLayout();
    innerStack.className = 'card-inner-container'; 
    innerStack.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    innerStack.borderRadius = 5;
    innerStack.width = {value: .98, unit:'%'};
    innerStack.height = {value: .94, unit:'%'};    

    this._innerStack = innerStack;
    this.addChild(this._innerStack);

    if (this.isAnimated)
      this.on(GestureTypes.touch, this._onTouchAction.bind(this));
    this.on(GestureTypes.tap, (args:GestureEventData) => { console.log('tap'); });
  }

  protected _onTouchAction(args:TouchGestureEventData) {
    const {action} = args;
    const duration = action === 'up' ? 30 : 60,
          curve = 'ease';
    this.animate({
      backgroundColor: action === 'up' ? TRANSPARENT : STEP1,
      duration, curve
    });
    this._innerStack.animate({
      backgroundColor: action === 'up' ? STEP1 : STEP2,
      translate: {x: 0, y: action === 'up' ? 0 : 2},
      duration, curve
    });
  }

  public _addChildFromBuilder(name: string, value: any) {
    if (value instanceof View) {
      this._innerStack.addChild(value);
    }
  }
  
}