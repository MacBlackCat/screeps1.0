/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roleMiner');
 * mod.thing == 'a thing'; // true
 */

module.exports.roleMiner = function roleMiner(creep) {
    
    if(!Memory.minersAlive[creep.name]) {
        Memory.minersAlive[creep.name] = {
            hasTrucker: false,
            minersPos: []
        };
    }

    var sID = creep.memory.sourceId; //gets the id of the energy source the miner has claimed
    var source = Game.getObjectById(sID); // uses the id to locate the source
    
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) { //harvest source or moves towards it
        creep.moveTo(source);
    } else { //if harvest == succes, create container under miner and set the memory to his pos
        Game.rooms.sim.createConstructionSite((creep.pos), STRUCTURE_CONTAINER);
        Memory.minersAlive[creep.name].minersPos = creep.pos; // set memory to his pos
    }

};