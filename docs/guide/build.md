# 构建发布

组件库使用 webpack 构建 UMD 产物。

```bash
npm run lib
```

构建后输出：

| 文件 | 说明 |
| --- | --- |
| `lib/cpy-ui.min.js` | UMD JavaScript 产物 |
| `lib/cpy-ui.min.css` | 组件样式 |

`webpack/build.config.js` 将 `vue`、`ant-design-vue`、`moment` 配为外部依赖，业务项目需要自行安装这些 peer dependencies。

## 发布前检查

```bash
npm run test:unit:all
npm run lib
npm run docs:build
```
