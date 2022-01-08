import path from 'path'
import findUp from 'find-up'

export type PackageManager = 'pnpm' | 'yarn' | 'npm'

const LOCKS: Record<string, PackageManager> = {
  'pnpm-lock.yaml': 'pnpm',
  'yarn.lock': 'yarn',
  'package-lock.json': 'npm',
}

// process.cwd()是 返回当前工作目录。如：调用node命令执行脚本时的目录。
export async function detectPackageManager(cwd = process.cwd()) {
  // 通过findUp 获取当前目录lock文件
  const result = await findUp(Object.keys(LOCKS), { cwd })
  const agent = (result ? LOCKS[path.basename(result)] : null)
  return agent
}
