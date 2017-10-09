# PolyfillA

一个轻量级的`polyfill`加载器。

用户可以配置需要的 `polyfill` ，当浏览器需要 TA 的时候，则会去加载该（或多个） `polyfill` ，当加载完毕，则会给出回调。


## API

### Polyfilla.config( name, [config])

- `{String | Object} name` 新增/修改 “一个” 或者“许多” `polyfill`
- `{Object} [config]` 配置
    - `{String} url` `polyfill` 的获取地址
    - `{function} condition` 触发下载 `polyfill` 的条件
- 用法
```js

    // 批量配置
    Polyfilla.config(
        {
            promise: {
                url: 'https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.min.js',
                condition() {
                    return window.Promise
                }
            },
            fetch  : {
                url: 'https://cdn.bootcss.com/fetch/2.0.3/fetch.min.js',
                condition() {
                    return window.fetch
                }
            }
        }
    )
    
    // 或单独配置
    Polyfilla.config(
        'fetch',
        {
            url: 'https://cdn.bootcss.com/fetch/2.0.3/fetch.min.js',
            condition() {
                return window.fetch
            }
        }
    )

```

### Polyfilla( polyfills, [cb] )

- `{Array<String>} polyfills` 所有需要的 `polyfill`
- `{Function} [cb]` 所有需要的 `polyfill` 加载完毕后运行的回调

- 用法：

```js

    Polyfilla(
        [
            'fetch',
            'promise'
        ],
        () => console.log( window.fetch, window.Promise )
    )

```

