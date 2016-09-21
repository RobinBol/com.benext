"use strict";

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.cd-jackson.com/index.php/zwave/zwave-device-database/zwave-device-list/devicesummary/340

module.exports = new ZwaveDriver(path.basename(__dirname), {
debug: true,
	capabilities: {
		'measure_power': {
				'command_class': 'COMMAND_CLASS_METER',
                    'command_report': 'METER_REPORT',
                    'command_report_parser': function (report) {
                        return report['Meter Value (Parsed)'];
                    }
                },

		'meter_power': {
			'command_class': 'COMMAND_CLASS_METER',
                    'command_report': 'METER_REPORT',
                    'command_report_parser': function (report) {
                        return report['Meter Value (Parsed)'];
                    }
			},
		'meter_gas': {
			'command_class': 'COMMAND_CLASS_METER',
                    'command_report': 'METER_REPORT',
                    'command_report_parser': function (report) {
                        return report['Meter Value (Parsed)'];
                    }
			}
	},
	settings: {
	}
});
