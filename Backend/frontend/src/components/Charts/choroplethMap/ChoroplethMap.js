import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import * as d3 from 'd3';
import 'leaflet/dist/leaflet.css';
//import * as L from "leaflet";

const ChoroplethMap = ({data})=>{
       // 지도 만들기 (default view : 한강)
    //  useEffect(() => {
        // 값에 따른 색
        const getColor = (value) => {
          return value > 40 ? '#800026' :
                 value > 30 ? '#BD0026' :
                 value > 20  ? '#E31A1C' :
                 value > 10 ? '#FC4E2A' :
                              '#FFEDA0';
        };
    
        // GEOJSON layer 스타일 설정
        const style = (feature) => {
          const value= feature.properties.CTPRVN_CD;
          return {
            fillColor: getColor(value),
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.9
          };
        };

        //state(지역) layer에 listener 추가
        const onEachFeature = (feature, layer) => {
            // 지역별 값에대한 설명을 pop up
            layer.bindPopup(`Region: ${feature.properties.CTP_KOR_NM}<br>Value: ${feature.properties.CTPRVN_CD}`);
        };

     
        
        //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
       // L.geoJSON(data, {style,onEachFeature}).addTo(map);
 //   }, [data]);
   
 
    return (
        
            <MapContainer center={[35.8754 , 128.5823]}style={{height:'350px'}} zoom={6} scrollWheelZoom={false}>      
                <TileLayer style={styles.customTileLayer} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
                <GeoJSON data={data} style={style} onEachFeature={onEachFeature} />               
            </MapContainer>
        
   
    );
}
//
export default ChoroplethMap;
const styles = {
  customTileLayer : {
    /* Add your custom styles here */
    /* For example: */
    border: '5px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  }
}
