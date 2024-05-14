import './index.css'

const LanguageFilterItem = props => {
  const {languageType, selectLanguage, isSelected} = props
  const {language, id} = languageType

  const onclickLanguage = () => {
    console.log('Clicked')
    selectLanguage(id)
  }

  const selectClassName = isSelected ? 'active-btn' : 'normal-btn'
  return (
    <li>
      <button
        className={selectClassName}
        type="button"
        onClick={onclickLanguage}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
