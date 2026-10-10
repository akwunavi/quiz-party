// Признак «мы внутри оболочки леса на проекторе» — отдельным крошечным файлом, чтобы экраны могли спросить его, не втягивая лес в свой кусок сборки.
import { createContext, useContext } from 'react'
/** Внутри оболочки (игра) — true; в лаборатории каждый экран рисует свой холст, как раньше. */
export const ShellCtx = createContext(false)
export const useInShell = () => useContext(ShellCtx)
