var spawningScript = require('Spawning'); //Remote script/module used for everything about spawning creeps
var memoryCheckScript = require('logMemory');
var creepRolesScript = require('Roles');
//var roleScript = require('.role'); //Remote script/module used for defining roles/jobs (old script spawns only "grunt" creeps)
//

//

//
// Start Main module
module.exports.loop = function () {
    try {
        spawningScript.spawnFunction();
        memoryCheckScript.checkMemory();
        creepRolesScript.creepROLES();
    }
    catch(err) {
        console.log(err);
    }
    // Create clean line in console
    console.log("\n");
}