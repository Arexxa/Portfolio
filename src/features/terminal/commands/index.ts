import { contentCommands } from '@/features/terminal/commands/content'
import { systemCommands } from '@/features/terminal/commands/system'
import { suggest } from '@/features/terminal/suggest'
import type { Command, CommandContext, TerminalOutput } from '@/features/terminal/types'

const help: Command = {
  name: 'help',
  usage: 'help',
  summary: 'List commands',
  run: () => [
    { kind: 'table', rows: COMMANDS.map((command) => [command.usage, command.summary] as const) },
    { kind: 'text', text: 'Tab completes, Up/Down browses history.', tone: 'muted' },
  ],
}

/** CUSTOMIZE: add a command by appending to contentCommands or systemCommands. */
export const COMMANDS: readonly Command[] = [help, ...contentCommands, ...systemCommands]
export const COMMAND_NAMES = COMMANDS.map((command) => command.name)

const byName = new Map(COMMANDS.map((command) => [command.name, command]))

export function findCommand(name: string): Command | undefined {
  return byName.get(name)
}

/** Execute a parsed command; unknown names produce an error with a suggestion. */
export function runCommand(name: string, args: string[], ctx: CommandContext): TerminalOutput[] {
  const command = findCommand(name)
  if (command) return command.run(args, ctx)
  const hint = suggest(name, COMMAND_NAMES)
  return [
    { kind: 'text', text: `command not found: ${name}`, tone: 'error' },
    {
      kind: 'text',
      text: hint
        ? `did you mean \`${hint}\`? type \`help\` for all commands.`
        : 'type `help` for all commands.',
      tone: 'muted',
    },
  ]
}
