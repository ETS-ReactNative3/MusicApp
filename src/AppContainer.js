import React, { } from 'react';
import {StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { mapStateToProps } from '../src/common/StoreUtils'
import Router from '../src/router'

const AppContainer = () => {
    return (
        <>
            <StatusBar barStyle="light-content"/>
            <Router/>
        </>
    );
}
export default connect(mapStateToProps)(AppContainer);
