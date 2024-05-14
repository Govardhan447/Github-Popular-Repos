import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    languagesDetails: languageFiltersData,
    chooseLanguage: 'ALL',
    isLoading: true,
    repositoryList: '',
    urlNotResponse: false,
  }

  componentDidMount() {
    this.getRepositaryListDetails()
  }

  updateRepositoryList = repositoryData => {
    const upadateList = repositoryData.map(item => ({
      name: item.name,
      id: item.id,
      issuesCount: item.issues_count,
      forksCount: item.forks_count,
      startsCount: item.stars_count,
      avatarUrl: item.avatar_url,
    }))
    this.setState({repositoryList: upadateList})
  }

  getRepositaryListDetails = async () => {
    this.setState({isLoading: true})
    const {chooseLanguage} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${chooseLanguage}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const repositoryData = data.popular_repos
    console.log(repositoryData)
    if (response.ok === true) {
      this.updateRepositoryList(repositoryData)
      this.setState({isLoading: false})
    } else {
      this.setState({urlNotResponse: true, isLoading: false})
    }
  }

  selectLanguage = id => {
    const {languagesDetails} = this.state
    const updateLanguage = languagesDetails.filter(item => item.id === id)
    console.log(updateLanguage)
    this.setState({chooseLanguage: updateLanguage[0].id})
    this.getRepositaryListDetails()
  }

  getLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getRepositaryList = () => {
    const {repositoryList, urlNotResponse} = this.state

    return urlNotResponse ? (
      this.getFailureStatus()
    ) : (
      <ul className="respositary-container">
        {repositoryList.map(item => (
          <RepositoryItem repositoryItemDetails={item} key={item.id} />
        ))}
      </ul>
    )
  }

  getFailureStatus = () => (
    <>
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure"
      />
      <h1 className="error-heading">Something Went Wrong</h1>
    </>
  )

  render() {
    const {languagesDetails, chooseLanguage} = this.state
    const {isLoading} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        <ul className="language-btn-container">
          {languagesDetails.map(eachItem => (
            <LanguageFilterItem
              languageType={eachItem}
              key={eachItem.id}
              selectLanguage={this.selectLanguage}
              isSelected={eachItem.id === chooseLanguage}
            />
          ))}
        </ul>
        <ul className="respositary-container">
          {isLoading ? this.getLoading() : this.getRepositaryList()}
        </ul>
      </div>
    )
  }
}

export default GithubPopularRepos
