export class FormatText {
  static removeSpecialCharacters = (text: string) =>
    text.replace(/[^\w\sáâéêíóôúãõàèìòùäëïöü]|[\d]/g, '').trim()

  static removeSpacesEmpty = (text: string) => text.trim().replace(/\s+/g, ' ')

  static convertToUpperEachFirstLetter = (text: string) =>
    (text[0].toLocaleUpperCase() + text.slice(1).toLocaleLowerCase()).trim()
}

export const formatName = (fullName: string) => {
  const fullNameWithoutSpacesEmpty = FormatText.removeSpacesEmpty(fullName)

  const arrayFullNameWithoutSpacesEmpty = fullNameWithoutSpacesEmpty.split(' ')

  const fullNameFormated = arrayFullNameWithoutSpacesEmpty
    .map(FormatText.convertToUpperEachFirstLetter)
    .join(' ')

  const fullNameWithoutSpecialCharacters =
    FormatText.removeSpecialCharacters(fullNameFormated)

  return fullNameWithoutSpecialCharacters
}
