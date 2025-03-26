# Calc MCP

## 本地开发

```sh
npm ci
```

## 测试

1. 通过 SSE 服务

```sh
npm start
npm run inspector
```

浏览器访问 http://localhost:5173/，连接 http://localhost:3001/sse

2. 通过 STDIO

```sh
# 列出可用工具
echo '{"method":"tools/list","params":{},"jsonrpc":"2.0","id":2}' | node .

# 调用工具
echo '{"method":"tools/call","params":{"name":"add","arguments":{"a":2,"b":7}},"jsonrpc":"2.0","id":2}' | node .
```

## 配置 Claude Desktop

编辑 `claude_desktop_config.json`

```json
{
  "mcpServers": {
    "calc-mcp": {
      "command": "node",
      "args": ["/path/to/calc-mcp/"]
    }
  }
}
```
