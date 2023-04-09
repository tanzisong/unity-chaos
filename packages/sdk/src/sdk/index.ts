import { ReactNode } from 'react';
import { injectable } from 'inversify';
import { isFunction } from 'lodash-es';

import { container } from '../base';
import { SDKConstruct } from '../base/sdk';
import { SystemErrorCode } from '../base/error';
import { TYPES } from '../types';

// write react or vue component Singleton container
// provide register and get component interface
// todo vue component register by The environment variable to return different register

@injectable()
class Component {
  private component = new Map<string, ReactNode>();
  constructor() {}
  
  get(name: string) {
    return this.component.get(name);
  }
  
  getAll() {
    return this.component;
  }
  
  set(name: string, component: ReactNode) {
    if (this.get(name)) {
      throw new Error(`${name} has been registered`);
    }
    this.component.set(name, component);
  }
}

function registerComponent(Components: Record<string, ReactNode>) {
  Object.entries(Components).forEach((component) => {
    if (!isFunction(component[1])) {
      throw new Error(`registerComponent error: ${component[0]}is not an react function`);
    }
    SDK.component.set(component[0], component[1]);
  });
  
  return SDK.component.getAll();
}


container.bind<Component>(TYPES.Component).to(Component);
container.bind<SDKConstruct>(TYPES.SDKConstruct).to(SDKConstruct);
container.bind<SystemErrorCode>(TYPES.SystemErrorCode).to(SystemErrorCode);
const SDK = container.get<SDKConstruct>(TYPES.SDKConstruct);

export { SDK, registerComponent, Component };
