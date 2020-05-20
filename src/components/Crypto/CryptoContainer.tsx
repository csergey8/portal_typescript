import React from 'react';
import { CryptoTable } from './CryptoTable'
import { connect } from 'react-redux'
import { CryptoRate, AppState, CryptoHistoryRate } from '../../redux/types'
import { RootReducerType } from '../../redux/store'
import { getCryptoPrice } from '../../redux'

type PropsTypes = MapStatePropsType & MapDispatchPropsType

const CryptoContainer: React.FC<PropsTypes>= (props) => {
  React.useEffect(() => {
    props.getCryptoPrice();
  }, [])
  return (
    <div>
      <CryptoTable items={props.cryptoRates} chartRates={props.chartRates}/>
    </div>
  );
};



type MapStatePropsType = {
  cryptoRates: Array<CryptoRate> | null
  chartRates: Array<CryptoHistoryRate>  | null
}

type MapDispatchPropsType = {
  getCryptoPrice: () => void
}

const mapStateToProps = (state: RootReducerType): MapStatePropsType => ({
  cryptoRates: state.cryptoReducer.cryptoRates,
  chartRates: state.cryptoReducer.cryptoHistoryRates
})


const ReduxCryptoContainer = connect<MapStatePropsType, MapDispatchPropsType, any, AppState>(mapStateToProps, { getCryptoPrice })(CryptoContainer)

export { ReduxCryptoContainer as CryptoContainer };