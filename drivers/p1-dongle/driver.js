'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// // http://www.cd-jackson.com/index.php/zwave/zwave-device-database/zwave-device-list/devicesummary/340

module.exports = new ZwaveDriver(path.basename(__dirname), {
debug: true,
	capabilities: {
		measure_power: {
				command_class: 'COMMAND_CLASS_METER',
				command_get: 'METER_GET',
				command_get_parser: function () {
					return {
						Properties1: {
							'Rate Type': 1,
						},
					};
				},
				command_report: 'METER_REPORT',
				command_report_parser: report => {
					if (report.hasOwnProperty('Properties2')
					&& report.Properties2.hasOwnProperty('Scale bits 10')
					&& report.Properties2['Scale bits 10'] === 2) {
						return report['Meter Value (Parsed)'];
					} return null;
				},
		},

		meter_power: {
			command_class: 'COMMAND_CLASS_METER',
			command_get: 'METER_GET',
			command_get_parser: function () {
				return {
					Properties1: {
						Scale: 0,
					},
				};
			},
			command_report: 'METER_REPORT',
			command_report_parser: report => {
				if (report.hasOwnProperty('Properties2')
				&& report.Properties2.hasOwnProperty('Scale bits 10')
				&& report.Properties2['Scale bits 10'] === 0) {
					return report['Meter Value (Parsed)'];
				} return null;
			},
		},

		meter_gas: {
			command_class: 'COMMAND_CLASS_METER',
			//command_get: 'METER_GET',
			command_get_parser: function () {
				return {
					Properties1: {
						Scale: 0,
					},
				};
			},
			command_report: 'METER_REPORT',
			command_report_parser: report => {
				if (report.hasOwnProperty('Properties2')
				&& report.Properties2.hasOwnProperty('Scale bits 10')
				&& report.Properties2['Scale bits 10'] === 0) {
				return report['Meter Value (Parsed)'];
				} return null;
			},
		},
	},

	settings: {
	}
});
