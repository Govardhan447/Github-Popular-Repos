import './index.css'

const RepositoryItem = props => {
  const {repositoryItemDetails} = props
  const {name, id, issuesCount, forksCount} = repositoryItemDetails
  const {startsCount, avatarUrl} = repositoryItemDetails
  return (
    <li className="listItem-container" key={id}>
      <img className="avatar" src={avatarUrl} alt={name} />
      <h1 className="name-heading">{name}</h1>
      <div className="values-container">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{startsCount} stars</p>
      </div>
      <div className="values-container">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="values-container">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
