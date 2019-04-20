// 通过proxy实现动态绑定
// new Proxy(target, handler); 传入两个参数，一个是tg,一个是处理的对象
//handler get 函数包括三个参数，tg,property,receiver.这个会在获取操作的时候调用。
// The static Reflect.get() method works like getting a property from an object (target[propertyKey]) as a function.
// receiver 函数是有关this的绑定。

const onWatch = (obj,setCb,getCb) => {
  let handler = {
      get(tg,property,receiver){
          // 如果需要实现vue的双向绑定，需要在这里收集依赖
          getCb(tg,property);
          return Reflect.get(tg,property,receiver)
      },
      set(tg,property,value,receriver){
          //   // 如果需要实现vue的双向绑定，需要在这里派发更新
          setCb(value,property);
          return Reflect.set(tg,property,value,receriver)
      }
  }
  return new Proxy(obj,handler);
};
let obj = {a:1};
let p = onWatch(
    obj,
    (v,property) => {
        console.log(`监听到属性${property}改变为${v}`)
    },
    (target,property) => {
        console.log(property,target[property])
    }
);

p.a = 2;
