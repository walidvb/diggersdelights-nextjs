import { createContext, useContext as useContextNative } from 'react'

const fabricateContext = (createValue) => {
  const Context = createContext({})

  const Provider = ({ children, ...props }) => {
    const value = createValue(props)
    return <Context.Provider children={children} value={value} />
  }

  const Consumer = Context.Consumer

  const useContext = () => useContextNative(Context)

  const withContext = Component => props => <Context.Consumer>
    {(contextProps) => <Component {...props} {...contextProps} />}
  </Context.Consumer>

  const withProvider = () => Component => props => <Provider><Component {...props} /></Provider>

  return {
    Provider,
    Context,
    Consumer,
    useContext,
    withContext,
    withProvider,
  }
}
export default fabricateContext