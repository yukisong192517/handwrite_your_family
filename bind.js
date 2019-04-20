// 自己实现bind，apply，call函数

// bind函数
// The bind() method creates a new function that, when called, has its this keyword set to the provided value,
// with a given sequence of arguments preceding any provided when the new function is called.
Function.prototype.myBind = function(ctx) {
    if( typeof this !== 'function'){
        throw new TypeError('类型必须为函数')
    }
    const _this = this;
    // bind函数的传参第一个是对象，第二个之后为真正传入函数的参数
    const args = [...arguments].slice(1);
    return function newFn (){
        if(this instanceof newFn){
        //    如果是通过new的方式
            return new _this(...args,...arguments)
        }
        return _this.apply(ctx,args.concat(...arguments))
    }
}
// call 函数
Function.prototype.myCall = function(cxt){
    if(typeof this !== 'function'){
        throw new TypeError('类型必须为函数')
    }
    cxt = cxt || window;
    cxt.fn = this;
    const args = [...arguments].slice(1);
    const result = cxt.fn(...args);
    delete cxt.fn
    return result
}
// apply 函数

Function.prototype.myApply = function(cxt){
    if(typeof this !== 'function'){
        throw new TypeError('类型必须为函数')
    }
    cxt = cxt || window;
    cxt.fn = this;
    let result
    if(arguments[1]){
        result = cxt.fn(...arguments[1])
    }
    else{
        result =cxt.fn()
    }
    delete cxt.fn;
    return result
}
