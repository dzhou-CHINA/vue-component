/* eslint-disable */
import * as ol from 'ol/proj';
import proj4 from 'proj4';

export default {
	methods: {
		//定义坐标系
		initProjTransforms() {
			// 1001苏州独立
			proj4.defs(
				'EPSG:1001',
				'+proj=tmerc +ellps=krass +lon_0=120.583333333333333333 +lat_0=0 +x_0=50805.0 +y_0=-3421129.0  +towgs84=-148.309,-218.731,-86.562,-1.49779,4.016604,-3.591758,6.44782521 +no_defs',
			);
			let projection1001 = new ol.Projection({
				code: 'EPSG:1001',
				units: 'm',
				axisOrientation: 'neu',
				global: false,
			});
			// WGS84
			proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
			let projection4326 = new ol.Projection({
				code: 'EPSG:4326',
				units: 'm',
				axisOrientation: 'neu',
				global: false,
			});
			proj4.defs(
				'EPSG:4528',
				'+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=40500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
			);
			let projection4528 = new ol.Projection({
				code: 'EPSG:4528',
				units: 'm',
				axisOrientation: 'neu',
				global: false,
			});
			// 苏州2000
			proj4.defs(
				'EPSG:1002',
				//"+proj=tmerc +ellps=krass +lon_0=120.7833333333333 +lat_0=0 +x_0=350000.0 +y_0=-2800000.0  +towgs84=-148.309,-218.731,-86.562,-1.49779,4.016604,-3.591758,6.44782521 +no_defs"
				'PROJCS["CGCS2000_3_degree_Gauss_Kruger_zone_40",GEOGCS["GCS_China Geodetic Coordinate System 2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137,298.257222101]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",120.7833333333333],PARAMETER["scale_factor",1],PARAMETER["false_easting",350000],PARAMETER["false_northing",-2800000.0],UNIT["Meter",1]]',
			);
			let projection1002 = new ol.Projection({
				code: 'EPSG:1002',
				units: 'm',
				axisOrientation: 'neu',
				global: false,
			});
			// 4490
			proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs +type=crs")
			let projection4490 = new ol.Projection({
				code: 'EPSG:4490',
				units: 'm',
				axisOrientation: 'neu',
				global: false,
			});

			ol.addProjection(projection1001);
			ol.addProjection(projection4528);
			ol.addProjection(projection1002);
			ol.addProjection(projection4326);
			ol.addProjection(projection4490);
			ol.addCoordinateTransforms(
				'EPSG:4326',
				'EPSG:1002',
				function (coordinate) {
					return proj4('EPSG:4326', 'EPSG:1002', coordinate);
				},
				function (coordinate) {
					return proj4('EPSG:1002', 'EPSG:4326', coordinate);
				},
			);
			ol.addCoordinateTransforms(
				'EPSG:1001',
				'EPSG:4528',
				function (coordinate) {
					return proj4('EPSG:1001', 'EPSG:4528', coordinate);
				},
				function (coordinate) {
					return proj4('EPSG:4528', 'EPSG:1001', coordinate);
				},
			);
			ol.addCoordinateTransforms(
				'EPSG:1002',
				'EPSG:1001',
				function (coordinate) {
					return proj4('EPSG:1002', 'EPSG:1001', coordinate);
				},
				function (coordinate) {
					return proj4('EPSG:1001', 'EPSG:1002', coordinate);
				},
			);
			ol.addCoordinateTransforms(
				'EPSG:1001',
				'EPSG:4490',
				function (coordinate) {
					return proj4('EPSG:1001', 'EPSG:4490', coordinate);
				},
				function (coordinate) {
					return proj4('EPSG:4490', 'EPSG:1001', coordinate);
				},
			);
		},
	}
};