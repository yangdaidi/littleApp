/* ------------------------------------------------------------------------------------------------------------
 * tool扩展: 封装class类的实现
 * @version  1.0
 * @author   hzyangyang2015
 * ----------------------------------------------------------------------------------------------------------*/

/**********************************require VS import(ES6标准，未来趋势)******************************************
*
*   require        1. 导出方式: module.exports = obj
*   (运行时)        2. 模块内部可以包含多个类和方法，可以用obj对象赋值，也可以逐个分开赋值，如：module.exports.a = a ...
*                  3. 实际导出module.exports引用, 外层使用模块内部类和模块 通过obj.a调用
*                  4. 可以直接导出类 module.exports = className，外层使用需要new进行实例化
*                  5. 外部引用可以放置任意地方
*
*   import         1. 导出方式:
*   (编译时）                   Statement                        Local name        Export name
*                              export {v};                      'v'               'v'
*                              export {v as x};                 'v'               'x'
*                              export let v = 123;              'v'               'v'
*                              export function f() {}           'f'               'f'
*                              export default function f(){}    'f'               'default'
*                              export default function () {}    '*default*'       'default'
*                              export default 123;              '*default*'       'default' 
*                  2. 模块内部可以包含多个类和方法，导出：export { v1 , v2}
*                  3. 模块外部引用采用es6解构，必须同名：import {v1} from ...
*                                                    import {v2} from ...
*                                                    import {v1,v2} from ...
*                                                    import {v2,v1} from ...
*                  4. 根据解构原理，外部直接拿到的已经是v1等对象，而不是整个模块饮用，所以可以直接使用v1 ...
*                  5. 直接export v1，import会解构失败（参考es6解构：http://es6.ruanyifeng.com/#docs/destructuring）
*                  6. 外部引用必须放在开头
*                  7. 推荐使用import，毕竟是标准
*
*   ps            (小程序中：支持require 和 import，但不支持node_modules）
*
*************************************************************************************************************/

/***************************************(module.exports 使用一)************************************************
*
*   模块内部        1. class className { methods(){} ... }         //declare class
*                  2. module.exports = className                  //exports class
*
*   模块外部        1. var moduleClass = require(module.exports)   //require module
*                  2. var moduleInstance = new moduleClass()      //Instance class
*                  3. moduleInstance.methods()                    //use
*
/***************************************(module.exports 使用2)************************************************
*
*   模块内部        1. class className1 { methods(){} ... } ...
*                  2. moduleInstance1 = new className1() moduleInstance2 = new className2() ...
*                  3. module.exports.moduleInstance1 = moduleInstance1
*                     module.exports.moduleInstance2 = moduleInstance2
*                  or
*                  3. module.exports = {moduleInstance1:moduleInstance1,moduleInstance2:moduleInstance2,...}
*
*   模块外部        1. var moduleOutput = require(module.exports)
*                  2. moduleOutput.moduleInstance1.methods() ...
*
*************************************************************************************************************/
var _CONSTAND = {
    'failTest' : 'failTest',
    'photoPrint' : 'xty-activity-photoPrint',
}
class toolClass {
    constructor() {}

    getConstant(_key) {
        return _CONSTAND[_key];
    }
}
let tool = new toolClass()

// class tool2Class {
//     constructor() {}
// }
// let tool2 = new tool2Class()

// function tool3(_key) {
//   return _CONSTAND[_key];
// }

// export { toolClass }        // import {toolClass} from "../../utils/tool.js" var tInstance = new toolClass
export { tool }             // import {tool} from "../../utils/tool.js"
// export default tool         // import tool from "../../utils/tool.js"

// module.exports = toolClass     // var tClass = require("../../utils/tool.js") var tInstance = new tClass()
// module.exports.tool = tool     // var tInstance = require("../../utils/tool.js") var tool = tInstance.tool
// module.exports.tool2 = tool2   // var tInstance = require("../../utils/tool.js") var tool = tInstance.tool
// module.exports = {             // var tInstance = require("../../utils/tool.js") var tool = tInstance.tool
//   tool : tool,
//   tool2 : tool2,
//   tool3 : tool3,
//   ...
// }