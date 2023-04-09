import { LayoutNode, LowerCaseLetter, SDK, AstNode } from '@chaos/sdk';

type Methods = Exclude<keyof typeof LayoutNodeConfig, 'prototype' | 'getAttributeVerify'>
type MethodsKV = {
  // @ts-ignore
  [P in Methods]: P extends `Main${infer A}${infer B}` ? `${LowerCaseLetter[A]}${B}` : P extends `Block${infer C}${infer D}` ? `${LowerCaseLetter[C]}${D}` : never
}
type Attr = MethodsKV[keyof MethodsKV]
class LayoutNodeConfig {
  static getAttributeVerify(
    node: LayoutNode,
    attr: Attr,
  ) {

  }

  static MainWidth() {}
  static MainHeight() {}
  static BlockCol() {}
  static BlockRow() {}
}

// const LayoutNodeConfig1 = {
//   Main: {
//     attribute: {
//       width: '', // width/height: px | %
//       height: '',
//       overflow: '', // hidden | auto
//     },
//   },
//   Block: {
//     col: '',
//     row: '',
//     overflow: () => {
//       console.info(this);
//       // this.__common.overflow(value)
//     },
//   },
//   __common: {
//     overflow: function (value: string) {},
//   },
// };

function MainChildrenVerify(node: AstNode) {
  // Main节点不可为空
  if (!node.children || node.children.length === 0) {
    throw new Error(SDK.SystemErrorCode.getByName('MainChildrenNotFound'));
  }

  // 第一层子节点只能是Block
  if (!node.children.every((child) => SDK.RenderSDK.isLayoutBlock(child.tag))) {
    throw new Error(SDK.SystemErrorCode.getByName('MainChildrenNotBlock'));
  }

  /**
   * Main
   *  默认100%, 可以自定义设置w&h
   * 配置:
   *  width/height: px | %
   *  overflow: hidden | auto

   * Block
   * 配置:
   *  col/row: 可以缺省, 缺省默认100%, 缺省包括不写或者空字符串; 只能存在[1, 12]闭区间数字, 或者绝对值px, 或者表达式(表达式也要遵守限制)
   *  overflow: hidden | auto, 缺省默认hidden

   * Main和Block区别
   * 1: 语义上的区别
   * 2: 配置上的差别Main的所有属性无法动态计算, Block支持
   * 3: 隔离?样式隔离?上下文隔离?(这块没想好, 功能上的和技术实现上的)
   * */
}
