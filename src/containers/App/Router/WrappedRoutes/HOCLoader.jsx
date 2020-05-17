import React from 'react';

function WithLoading(Component) {
    return function WihLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return (<Component {...props} />);
        return (<div className="loader"><p>Loading..</p></div>);
    }
}
export default WithLoading;
