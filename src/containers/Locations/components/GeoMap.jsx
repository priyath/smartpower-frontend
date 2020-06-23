import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { compose, withProps, withStateHandlers, withHandlers } from 'recompose';
import {
    GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs,
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import Panel from '../../../shared/components/Panel';
import silverMapStyle from './silverMapStyle.json';

import data from './data.json';

const Map = compose(
    withProps({
        // create your api key
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCQXPcmy5m-eemsBHdCK-fS40kF8hbWPJM&v=3.'
            + 'exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div className="map" style={{ height: '700px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
    }),
    withStateHandlers(() => ({
        showInfoWindow: true,
    }),
        {
        setOnMarkerClick: ({ isOpen, infoIndex }) => (index) => ({
            isOpen: infoIndex !== index || !isOpen,
            infoIndex: index
        })
        // handleMouseOver: ({ isOpen }) => () => ({
        //     showInfoWindow: true,
        // }),
        // handleMouseExit: ({ isOpen }) => () => ({
        //     showInfoWindow: false,
        // }),
    }),
    withHandlers(
        {
            onMarkerClick: (props) => index => {
                const { setOnMarkerClick } = props;
                setOnMarkerClick(index);
                props.markerHandler(props.branchList[index]);
            }
        }
    ),
    withScriptjs,
    withGoogleMap,
)(props => (
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 6.839094, lng: 79.885041 }}
        defaultOptions={{ styles: silverMapStyle }}
    >
        <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
            styles={[
                {
                    url: `${process.env.PUBLIC_URL}/img/map_markers/m1.png`,
                    height: 53,
                    width: 53,
                },
                {
                    url: `${process.env.PUBLIC_URL}/img/map_markers/m1.png`,
                    height: 56,
                    width: 56,
                },
                {
                    url: `${process.env.PUBLIC_URL}/img/map_markers/m1.png`,
                    height: 66,
                    width: 66,
                },
                {
                    url: `${process.env.PUBLIC_URL}/img/map_markers/m1.png`,
                    height: 78,
                    width: 78,
                },
                {
                    url: `${process.env.PUBLIC_URL}/img/map_markers/m1.png`,
                    height: 90,
                    width: 90,
                },
            ]}
        >
            {props.branchList.map((branch, index) => {
                return (
                    <Marker
                        idx={index}
                        key={index}
                        position={{ lat: branch.lat, lng: branch.lng }}
                        onClick={()=>{ props.onMarkerClick(index)} }
                        options={{icon: branch.alertCount > 0 ? `${process.env.PUBLIC_URL}/img/map_markers/red-marker.png`
                                : `${process.env.PUBLIC_URL}/img/map_markers/green-marker.png`}}
                    >
                        {props.isOpen && props.infoIndex === index && (
                        <InfoWindow>
                            <h4>{branch.location}</h4>
                        </InfoWindow>
                    )}</Marker>
            )})}
        </MarkerClusterer>
    </GoogleMap>
));

const GeoMap = ({ t, branchList, onMarkerClick }) => {
    return (
    <Panel xs={12} md={12} lg={12} xl={8} title={t('locations.geo_map')}>
        <div dir="ltr">
            <Map
                markers={data.photos}
                markerHandler={onMarkerClick}
                branchList={branchList}
            />
        </div>
    </Panel>
)};

GeoMap.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(GeoMap);
