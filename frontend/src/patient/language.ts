import { useEffect, useState } from 'react'

export type Lang = 'en' | 'tw'

const KEY = 'twen.lang'

/** The language for the patient's texts. Remembered on this phone only; it is a convenience, so storage may fail. */
export function useLanguage(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem(KEY) === 'tw' ? 'tw' : 'en'
    } catch {
      return 'en'
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      // Private mode or blocked storage: the choice just isn't remembered.
    }
  }, [lang])
  return [lang, setLang]
}
