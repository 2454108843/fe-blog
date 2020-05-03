class MyWebpackPlugin {
  constructor(options) {}

  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
      // compilation.chunks存放了代码块列表
      compilation.chunks.forEach(chunk => {
        // chunk包含多个模块，通过chunk.modulesIterable可以遍历模块列表
        for (const module of chunk.modulesIterable) {
          // module包含多个依赖，通过module.dependencies进行遍历
          module.dependencies.forEach(dependency => {
            // console.log(dependency);
          });
        }
      });
      // 修改或添加资源
      compilation.assets['new-file.js'] = {
        source() {
          return 'var a=1';
        },
        size() {
          return this.source().length;
        }
      };
      callback(); // 4. 通过compiler对象可以注册对应的事件，全部的钩子都可以使用
      // 注册一个编译完成的钩子， 一般需要将插件名作为事件名即可
      compiler.hooks.done.tap('HelloWordPlugin', (stats) => {
        console.log('整个webpack打包结束了');
      })


    });
  }
}

module.exports = MyWebpackPlugin;