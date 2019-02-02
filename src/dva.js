import { persistEnhancer } from 'dva-model-persist';

export function config () {
  return {
    extraEnhancers: [
      // persistEnhancer()
    ],
  };
}
