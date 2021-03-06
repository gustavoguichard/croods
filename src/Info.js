import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import setOrFetchInfo from './setOrFetchInfo'
import renderIfPresent from './renderIfPresent'
import renderInfoLoading from './renderInfoLoading'

class Info extends Component {
  constructor(props) {
    super(props)
    setOrFetchInfo(props)
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props
    const { id: oldId } = prevProps

    if (id.toString() !== oldId.toString()) {
      setOrFetchInfo(this.props)
    }
  }

  render() {
    const { render, info, infoError, renderError } = this.props

    return (
      renderIfPresent(renderError, infoError) ||
      renderInfoLoading(this.props) ||
      render(info, this.props)
    )
  }
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Info),
)
