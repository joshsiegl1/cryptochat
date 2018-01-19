import PropTypes from 'prop-types'; 
import React from 'react'; 

const propTypes = { 

}

const Router = ({router, routes}) => { 
    const { path } = router.route; 
    if (path in routes) { 
        const Component = routes[path]; 
        return <Component />
    }

    return null; 
}; 

Router.propTypes = propTypes; 

export default Router; 