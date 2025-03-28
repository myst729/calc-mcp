import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

export const calcSchema = z.object({
  a: z.number().describe('第一个数字'),
  b: z.number().describe('第二个数字'),
})

export const inputSchema = zodToJsonSchema(calcSchema)

export const calcTools = {
  add: {
    fn: (a, b) => Promise.resolve(a + b),
    description: '计算两个数字的和',
    inputSchema,
    sign: ' + ',
  },
  subtract: {
    fn: (a, b) => Promise.resolve(a - b),
    description: '计算两个数字的差',
    inputSchema,
    sign: ' - ',
  },
  multiply: {
    fn: (a, b) => Promise.resolve(a * b),
    description: '计算两个数字的积',
    inputSchema,
    sign: ' * ',
  },
  divide: {
    fn: (a, b) => Promise.resolve(a / b),
    description: '计算两个数字的商',
    inputSchema,
    sign: ' / ',
  },
  power: {
    fn: (a, b) => Promise.resolve(a ** b),
    description: '计算两个数字的幂',
    inputSchema,
    sign: ' ^ ',
  },
  random: {
    fn: (a, b) => Promise.resolve(Math.floor(Math.random() * (Math.abs(b - a) + 1)) + Math.min(a, b)),
    description: '随机生成两个数字之间的整数',
    inputSchema,
    sign: ' ~ ',
  },
}
