import { useContext } from "react"
import { I18nContext } from "@/i18n/I18nProvider"

export function useTranslation() {

  const { dictionary } = useContext(I18nContext)

  function t(path) {

    return path
      .split(".")
      .reduce((obj, key) => obj?.[key], dictionary)

  }

  return { t }
}