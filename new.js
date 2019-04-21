// new 的实现原理
// 1. 新生成了一个对象 2. 链接到原型
// 3. 绑定 this
// 4. 返回新对象

function myNew(){
    let obj = {};
    let Con = [...arguments].shift();
    obj.__proto__ = Con.prototype;
    let res = Con.apply(obj,[...arguments].slice(1));
    return res instanceof Object ? res : obj
}
