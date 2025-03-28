import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { calcSchema, calcTools } from './calc.js'

export const createServer = () => {
  const server = new Server(
    { name: 'calc-mcp', version: '0.1.0', description: '一个用于执行简单数学运算的工具集' },
    { capabilities: { tools: {} } }
  )

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: Object.entries(calcTools).map(([key, value]) => ({
      name: key,
      description: value.description,
      inputSchema: value.inputSchema,
    })),
  }))

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params
    if (name in calcTools) {
      const validArgs = calcSchema.parse(args)
      const result = await calcTools[name].fn(...Object.values(validArgs))
      return {
        content: [
          {
            type: 'text',
            text: `${Object.values(validArgs).join(calcTools[name].sign)} = ${result}`,
          },
        ],
      }
    }
    throw new Error(`Unknown tool: ${name}`)
  })

  const cleanup = async () => Promise.resolve()
  return { server, cleanup }
}
