"use strict";
const fs = require('fs');
/**
 * Load environment file and setup namespace
 */
function setupNamespace() {
    const directory = process.cwd();
    try {
        fs.mkdirSync(`${directory}/node_modules`);
    }
    catch (e) { }
    try {
        fs.unlinkSync(`${directory}/node_modules/app`);
    }
    catch (e) {
        if (e.code !== 'ENOENT') {
            throw e;
        }
    }
    try {
        fs.symlinkSync('../dist', `${directory}/node_modules/app`);
    }
    catch (e) {
        if (e.code !== 'ENOENT' && e.code !== 'EEXIST') {
            throw e;
        }
    }
}
exports = {
    setupNamespace,
};

//# sourceMappingURL=namespace.js.map
